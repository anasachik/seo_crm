import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
// import * as html2pdf from 'html2pdf.js';
// import * as jspdf from 'jspdf';  
// import { jsPDF } from "jspdf";
// import html2canvas from 'html2canvas'; 
import { ActivatedRoute } from '@angular/router';
import { AllUserInfoModule } from 'app/module/all-user-info/all-user-info.module';
import { SharedServicesService } from 'app/services/shared-services.service';
import { ImportantElementModuleCModule } from 'app/module/important-element-module-c/important-element-module-c.module';
import { UserModule } from 'app/module/user/user.module';
import { NewWebsiteTaskModule } from 'app/module/new-website-task/new-website-task.module';
import { WebsiteTaskModule } from 'app/module/website-task/website-task.module';
import { KeywordModule } from 'app/module/keyword/keyword.module';
import { NewKeywordModule } from 'app/module/new-keyword/new-keyword.module';
import { KeywordDashboardModule } from 'app/module/keyword-dashboard/keyword-dashboard.module';
// import { promise } from 'protractor';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  id: any;
  fileInput: any;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private sharedServices: SharedServicesService,
  ) { }

  public allUserInfoModule = new AllUserInfoModule();
  public newTask = new NewWebsiteTaskModule();
  public allTasks = new Array<WebsiteTaskModule>();

  allKeyWords: Array<KeywordDashboardModule> = [];

  p: number = 1;
  term: string;
  messageProgress: string;
  fileXls: File;

  typeTask: Array<string> = [];
  order: boolean = true
  public newKeyWord = new NewKeywordModule();
  public TopKeyWord = 0;
  
  removeSpace(value){
	  if (!value) {
            return '';
        }

        return value.replace(/\s/g, "");
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getUserAllInfo();
      this.getWebsiteTask();
      this.getAllLastKeyword(this.order);
    });
  }

  // will get the user info 
  getUserAllInfo() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      var result = [];
      var labelsDate = [];
      var labelsValue = [];
      this.sharedServices.getUserAllInfo(params.get('id')).then(
        data => {
          result = result.concat(data);
          // console.log(result[0].Id_User)
          if (result.length > 0) {
            this.allUserInfoModule.user = new UserModule(
              result[0].Id_User,
              result[0].Full_Name,
              result[0].Company_Name,
              result[0].Company_Url,
              result[0].Phone,
              result[0].Email,
            )
          }
          this.allUserInfoModule.infoUser = new Array<ImportantElementModuleCModule>();
          var promise = new Promise((resolve, reject) => {
            for (let i = 0; i < result.length; i++) {
              // console.log("data" + i + "=", result[i]);
              this.allUserInfoModule.infoUser.push(
                new ImportantElementModuleCModule(
                  result[i].Date_Update,
                  result[i].Framework,
                  result[i].Domain_Age,
                  result[i].Servers,
                  result[i].CDN,
                  result[i].Hierarchy,
                  result[i].Click_Depth,
                  result[i].Internal_Link,
                  result[i].Number_Page,
                  result[i].Page_Load_Speed,
                  result[i].Avg_Word_Per_Page,
                  result[i].Avg_Internal_Link,
                  result[i].Avg_HTag,
                  result[i].Domain_Authority,
                  result[i].Avg_External_Link,
                  result[i].Number_Referring_Domains,
                  result[i].Number_Ip,
                  result[i].Number_Backlinks,
                  result[i].Publishing_Rate,
                )
              )
              this.add(labelsDate, this.formatDateTime(result[i].Date_Update))
              labelsValue.push((result[i].Number_Backlinks / result[i].Number_Ip) * 0.4 + result[i].Number_Page * 0.4 + result[i].Domain_Authority * 0.2)
              if( i+1 == result.length){
                resolve('boucle end')
              }
            }
          });
          promise.then(
            data => {
              /* ----------==========     Status Website Chart initialization For Documentation    ==========---------- */
              const datastatusWebSite: any = {
                labels: labelsDate.reverse(),
                series: [
                  labelsValue.reverse(),
                ]
              };

              const optionsstatusWebSite: any = {
                lineSmooth: Chartist.Interpolation.cardinal({
                  tension: 0
                }),
                low: Math.min(...labelsValue),
                high: Math.max(...labelsValue), // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: { top: 20, right: 0, bottom: 0, left: 20 },
              }

              var statusWebSite = new Chartist.Line('#statusWebSite', datastatusWebSite, optionsstatusWebSite);
              this.startAnimationForLineChart(statusWebSite);
            }
          )
        });
      // console.log(labelsDate,labelsValue)

      // console.log(this.allUserInfoModule);
    });
  }

  // will create new task
  createNewTask() {
    this.sharedServices.createNewTask(this.id, this.newTask).then(
      data => {
        // console.log(data);
        if (data == 'task was being added') {
          this.getUserAllInfo();
          this.newTask = new NewWebsiteTaskModule();
          this.allTasks = new Array<WebsiteTaskModule>();
          this.getWebsiteTask();
          $('#newTaskModal').modal('hide');
          this.sharedServices.showNotification('top', 'center', 'success', data)
        } else {
          this.sharedServices.showNotification('top', 'center', 'danger', data)
        }

      }
    )
  }

  // will get u all task 
  getWebsiteTask() {
    var result = [];
    this.sharedServices.getWebsiteTask(this.id).then(
      data => {
        result = result.concat(data)
        for (let i = 0; i < result.length; i++) {
          // var Type_Task = result[i].Type_Task;
          this.allTasks.push(
            new WebsiteTaskModule(
              result[i].Id_Task,
              result[i].Name_Task,
              result[i].Type_Task,
              result[i].Checked,
              result[i].Date_Ajoute,
              result[i].Date_Expiration
            )
          )
          var checkIfExsist = true;
          for (let j = 0; j < this.typeTask.length; j++) {
            if (this.typeTask[j] == result[i].Type_Task) {
              this.typeTask[j] = result[i].Type_Task
              checkIfExsist = false;
            }
          }
          if (checkIfExsist) {
            this.typeTask.push(result[i].Type_Task);
          }
        }
        this.sharedServices.getallNotification()
      });
  }

  // will delete task
  deleteTask(taskId) {
    this.sharedServices.deleteTask(taskId).then(
      data => {
        if (data == 'task was being deleted !') {
          this.allTasks = new Array<WebsiteTaskModule>();
          this.typeTask = new Array<string>();
          this.getWebsiteTask();
          this.sharedServices.showNotification('top', 'center', 'warning', data)
        }
      }
    )
  }

  // will update task
  updateTask(task) {
    this.sharedServices.updateTask(task).then(
      data => {
        if (data == 'task was being updated !') {
          this.allTasks = new Array<WebsiteTaskModule>();
          this.getWebsiteTask();
          // this.sharedServices.getNotificationWebsiteTask();
          this.sharedServices.showNotification('top', 'center', 'warning', data)
        }
      }
    )
  }

  // will give you keyWords information
  getAllLastKeyword(ascending) {
    var array = [];
    this.allKeyWords = [];


    this.sharedServices.getAllLastKeyword(this.id).then(
      data => {
        var google_Position = [];
        var number_Search = [];
        var Impression = [];
        var Clicks = [];
        //     var labelsString: Array<string> = [];
        // var labelsNumber_Search: Array<number> = [];
        // var labelsGoogle_Position: Array<number> = [];
        // var labelsClicks: Array<number> = [];
        array = array.concat(data);
        array.sort(
          this.sorting(ascending)
        )
		this.TopKeyWord= 0
        // var promise = new Promise((resolve, reject) => {
		
        for (let i = 0; i < array.length; i++) {
			
          if (array[i].Google_Position < 10) {
            this.TopKeyWord++
          }
		 
          this.sharedServices.getKeywordsAllInfo(array[i].Id_Keyword, 10).then(
            data => {
              var array2 = [];
              google_Position = [];
              number_Search = [];
              Impression = [];
              Clicks = [];
              array2 = array2.concat(data);
              var endBoucle = 0
              for (let j = 0; j < array2.length; j++) {
                google_Position.push(array2[j].Google_Position);
                number_Search.push(array2[j].Number_Search);
                Impression.push(array2[j].Impression);
                Clicks.push(array2[j].Clicks);
              }

              this.allKeyWords.push(
                new KeywordDashboardModule(
                  array[i].Id_Update,
                  array[i].Date_Update,
                  number_Search,
                  google_Position,
                  Impression,
                  Clicks,
                  array[i].Id_Keyword,
                  array[i].Name_keyword,
                  array[i].Source_Data,
                )
              );

            }
          );

        }

      }
    );
  }

  // upload keyWordFile
  uploadKeyWord() {
    this.messageProgress = 'progress'
    this.sharedServices.uploadKeyWord(this.id, this.fileXls).then(
      data => {
        // console.log(data)
        if (data == 'insert keyword update' || data == 'insert keyword') {
          this.messageProgress = 'done'
          $('#uploadKeyWordModal').modal('hide');
          // this.allKeyWords.splice(0, this.allKeyWords.length);
          this.sharedServices.showNotification('top', 'center', 'success', data);
          this.getAllLastKeyword(this.order);
        } else {
          this.messageProgress = 'err'
          $('#uploadKeyWordModal').modal('hide');
          this.sharedServices.showNotification('top', 'center', 'warning', data);
        }
      }
    )
  }

  // delete keyWord
  deleteKeyWord(keyId) {
    this.sharedServices.deleteKeyWord(keyId).then(
      data => {
        this.sharedServices.showNotification('top', 'center', 'danger', data)
        this.getAllLastKeyword(this.order);
      }
    )
  }

  // add keyword Manually
  addKeyWordManually() {
    this.sharedServices.addKeyWordManually(this.id, this.newKeyWord).then(
      data => {
        this.newKeyWord = new NewKeywordModule();
        $('#newKeyWordModal').modal('hide');
        this.sharedServices.showNotification('top', 'center', 'success', data)
        this.getAllLastKeyword(this.order);
      }
    )
  }

  setOrder(value: boolean) {
    if (value) {
      this.order = !value
      // console.log(this.order)
      this.getAllLastKeyword(this.order);
    } else {
      this.order = !value
      this.getAllLastKeyword(this.order);
    }

  }
  handleFileInput(event) {
    let fileList: FileList = event.target.files
    // console.log(fileList);
    if (fileList.length > 0) {
      this.fileXls = fileList[0];
    }
  }
  //get you number of task realise / task not realize
  getTaskRealise(): string {
    var taskRealise = 0
    var taskNotRealize = 0
    for (let i = 0; i < this.allTasks.length; i++) {
      const element = this.allTasks[i];
      if (this.allTasks[i].Checked) {
        taskRealise++
        taskNotRealize++
      } else {
        taskNotRealize++
      }

    }
    return taskRealise + '/' + taskNotRealize;
  }
  //will set type of task
  setTypeValue(type) {
    this.newTask.Type_Task = type;
  }
  // will formate the number to get value with 'k' 
  kFormatter(num) {
    var mul;
    if (Math.abs(num) > 999) {
      mul = Math.sign(num) * ((Math.abs(num) / 1000));
      return mul.toFixed(0) + 'k';
    }
    mul = Math.sign(num) * Math.abs(num);
    return mul.toFixed(0);
  }
  // will formate the number to get value with 's'
  sFormatter(num) {
    var mul;
    mul = Math.sign(num) * Math.abs(num);
    return mul.toFixed(2) + 's';
  }
  // will format date
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('-');
  }
  formatDateTime(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      min = '' + d.getMinutes(),
      sec = '' + d.getSeconds()
    // d.getHours+d.getMinutes+d.getSeconds

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    if (min.length < 2)
      min = '0' + min;
    if (sec.length < 2)
      sec = '0' + sec;

    return [day, month, year].join('-') + "  " + [hour, min, sec].join(':');
  }
  //will verify if the input pop up are empty
  objectIsEmpty(): boolean {
    var valuestask = Object.keys(this.newTask).map(e => this.newTask[e]);
    if (valuestask.length > 1) {
      var empty = 0;
      for (let i = 0; i < valuestask.length; i++) {
        if (valuestask[i]) {
          empty++
        }

      }
      if (empty >= 2) {
        return true;
      }
    };
    return false;
  }
  fileIsEmpty() {
    if (this.fileXls) {
      return true
    }
    return false
  }
  keywordempty() {
    var newKeyWord = Object.keys(this.newKeyWord).map(e => this.newKeyWord[e]);
    // console.log(newKeyWord.length)
    if (newKeyWord.length > 1) {
      var empty = 0;
      for (let i = 0; i < newKeyWord.length; i++) {
        // console.log(newKeyWord.length)
        if (newKeyWord[i] || newKeyWord[i] == 0) {
          empty++
        }
      }
      if (empty == 5) {
        return true;
      }
    };
    return false;
  }

  sorting(ascending) {

    return function (a, b) {
      // equal items sort equally
      if (a.Google_Position === b.Google_Position) {
        return 0;
      }
      // nulls sort after anything else
      else if (a.Google_Position === null) {
        if (ascending)
          return 1;
        else
          return -1;
      }
      else if (b.Google_Position === null) {
        if (ascending)
          return -1;
        else
          return 1;
      }
      // otherwise, if we're ascending, lowest sorts first
      else if (ascending) {
        return a.Google_Position < b.Google_Position ? -1 : 1;
      }
      // if descending, highest sorts first
      else if (!ascending) {
        return a.Google_Position < b.Google_Position ? 1 : -1;
      }

    };

  }
  add(arr: Array<string>, notif) {
    const found = arr.some(el => el === notif);
    if (!found && notif) {
      arr.push(notif);
    }
  }
  // allArray(arr1: Array<number>, arr2: Array<number>, arr3: Array<number>) {
  //   return new Promise((resolve, reject) => {
  //     var allArray = []
  //     console.log(arr1,arr2,arr3)
  //     // labelsGoogle_Position, labelsClicks, labelsNumber_Search
  //     var sum1 = 0
  //     var sum2 = 0
  //     var sum3 = 0
  //     for (let i = 0; i < arr1.length; i++) {
  //       sum1 += arr1[i];
  //       arr1[i]=sum1
  //     }
  //     for (let i = 0; i < arr2.length; i++) {
  //       sum2 += arr2[i];
  //       arr2[i]=sum2
  //     }
  //     for (let i = 0; i < arr3.length; i++) {
  //       sum3 += arr3[i];
  //       arr3[i]=sum3
  //     }
  //     var promise = new Promise((resolve, reject) => {
  //       var sum1 = 0
  //       var sum2 = 0
  //       var sum3 = 0
  //       for (let i = 0; i < arr1.length; i++) {
  //         sum1 += arr1[i];
  //         arr1[i]=sum1;
  //         sum2 += arr2[i];
  //         arr2[i]=sum2;
  //         sum3 += arr3[i];
  //         arr3[i]=sum3;
  //         if(i+1 == arr1.length){
  //           resolve([arr1,arr2,arr3])
  //         }
  //       }
  //     })
  //     promise.then(
  //       ([a, b, c]) =>{
  //         console.log(a,b,c)
  //       }
  //     )
  //     console.log(arr1,arr2,arr3)
  //     for (let i = 0; i < arr1.length; i++) {
  //       allArray.push(arr1[i] * 0.3 + arr2[i] * 0.3 + arr3[i] * 0.3)
  //     }
  //     resolve(allArray.reverse())
  //   });
  // }
}
