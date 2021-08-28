import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModule } from 'app/module/user/user.module';
import { ImportantElementModule } from 'app/module/important-element/important-element.module';
import { NewConcurenceModule } from 'app/module/new-concurence/new-concurence.module';
import { NewWebsiteTaskModule } from 'app/module/new-website-task/new-website-task.module';
import { Body } from '@angular/http/src/body';
import { NotificationModule } from 'app/module/notification/notification.module';
import { TranslateService } from '@ngx-translate/core';
// import { resolve } from 'dns';
// import { readSync } from 'fs';
declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class SharedServicesService {
  public host: string = "http://localhost:3000";

  private data_user = new BehaviorSubject<any>(new Array<UserModule>());
  load_data_user = this.data_user.asObservable();

  public information = [];

  private notification = new ReplaySubject<NotificationModule>(1);
  notification_load = this.notification.asObservable();

  // private data_info_user = new BehaviorSubject<any>( new Array);
  // load_data_all_user = this.data_info_user.asObservable();


  constructor(private httpClient: HttpClient,
    //  private translateService: TranslateService
    ) { }

  // will return all user info it's use it into the sidebar of the application 

  getUserInfo() {
    this.httpClient.get<any>(this.host + "/api/Users").subscribe(
      data => {
        data.users.forEach((element, _index) => {

          let userTempo = new UserModule(
            element.Id_User,
            element.Full_Name,
            element.Company_Name,
            element.Company_Url,
            element.Phone,
            element.Email
          );

          this.data_user.next(userTempo);

        });
      }
    );
  }

  //will give all user info and the last two important element

  getUserAllInfo(idUser) {
    // return a new promise, which you resolve once you get the data
    var inforamtion = [];
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(this.host + "/api/UsersWithElement?userId=" + idUser + "").subscribe(
        data => {
          inforamtion = inforamtion.concat(data.users);
          resolve(inforamtion);
        });
    });
  }

  //will update user information

  updateUserInfo(user: UserModule) {
    // return a new promise, which you resolve once you get the data
    let body = {
      user: user,
    }
    return new Promise((resolve, reject) => {
      this.httpClient.post<any>(this.host + "/api/UpdateUserInfo", body).subscribe(
        data => {
          // inforamtion = inforamtion.concat(data.users);
          resolve(data.message);
        });
    });
  }

  //will update important element of ur client

  updateUserImportantElement(userId, importantElement: ImportantElementModule) {
    // return a new promise, which you resolve once you get the data
    let body = {
      userId: userId,
      importantElement: importantElement
    }
    return new Promise((resolve, reject) => {
      this.httpClient.post<any>(this.host + "/api/UpdateUserImportantElement", body).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  //will update user information

  createNewConcurrence(userId, concurrence: NewConcurenceModule, importantElement: ImportantElementModule) {
    // return a new promise, which you resolve once you get the data
    let body = {
      userId: userId,
      concurrence: concurrence,
      importantElement: importantElement
    }
    return new Promise((resolve, reject) => {
      this.httpClient.post<any>(this.host + "/api/CreateNewConcurrence", body).subscribe(
        data => {
          // inforamtion = inforamtion.concat(data.users);
          resolve(data.message);
        });
    });
  }

  //will give all concurrence info and the last two important element

  getConcurrenceAllInfo(idUser) {
    // return a new promise, which you resolve once you get the data
    var inforamtion = [];
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(this.host + "/api/CompetitorsInfo?userId=" + idUser).subscribe(
        data => {
          inforamtion = inforamtion.concat(data.concurrence);
          console.log(inforamtion);
          resolve(inforamtion);
        });
    });
  }

  //delete info compititore
  deleteCompetitor(idCompetitor) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete<any>(this.host + "/api/DeleteCompetitor?competitorId=" + idCompetitor).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  // will create new task 
  createNewTask(userId, newTask: NewWebsiteTaskModule) {
    return new Promise((resolve, reject) => {
      let body = {
        userId: userId,
        newTask: newTask
      }
      this.httpClient.post<any>(this.host + '/api/CreateNewTask', body).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  // will get all task 
  getWebsiteTask(userId) {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(this.host + '/api/UsersTask?userId=' + userId).subscribe(
        data => {
          resolve(data.taskUser);
        });
    });
  }

  // will delete task
  deleteTask(taskId) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete<any>(this.host + "/api/DeleteTask?taskId=" + taskId).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  // will update task 
  updateTask(Task) {
    return new Promise((resolve, reject) => {
      let body = {
        task: Task,
      }
      this.httpClient.post<any>(this.host + '/api/CheckTask', body).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  // will fet all keyword for a specifique users
  getAllLastKeyword(userId) {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(this.host + '/api/getKeywords?userId=' + userId).subscribe(
        data => {
          resolve(data.keywords);
        });
    });
  }

  // upload file of keyword
  uploadKeyWord(userId, file) {
    return new Promise((resolve, reject) => {
      let formData: FormData = new FormData();
      formData.append("uploadfile", file, file.name);
      this.httpClient.post<any>(this.host + '/api/uploadXlsFile?userId=' + userId, formData).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  // delete Keyword
  deleteKeyWord(keyId) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete<any>(this.host + '/api/deletKeyword?keyId=' + keyId).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  // add keyWord manually
  addKeyWordManually(userId, keyWord) {
    return new Promise((resolve, reject) => {
      let body = {
        keyword: keyWord,
      }
      this.httpClient.post<any>(this.host + '/api/addKeyword?userId=' + userId, body).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  // get all info of single keyword
  getKeywordsAllInfo(keyId, limit) {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(this.host + '/api/getKeywordsAllInfo?keyId=' + keyId + '&limit=' + limit).subscribe(
        data => {
          resolve(data.keywords);
        });
    });
  }

  // update keyword manually
  updateKeyword(keyWord) {
    return new Promise((resolve, reject) => {
      let body = {
        keyword: keyWord,
      }
      this.httpClient.post<any>(this.host + '/api/updateKeyword', body).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  // add keyword task 
  addKeywordTask(keyId, keyTask) {
    return new Promise((resolve, reject) => {
      let body = {
        keyTask: keyTask,
      }
      this.httpClient.post<any>(this.host + '/api/addKeywordTask?keyId=' + keyId, body).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  // get all keyword task info 
  getKeywordTask(keyId) {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(this.host + '/api/getKeywordTask?keyId=' + keyId).subscribe(
        data => {
          resolve(data.keywordTask);
        });
    });
  }

  // update keyword task
  updateTaskKeyWord(keyTask) {
    return new Promise((resolve, reject) => {
      let body = {
        keyTask: keyTask,
      }
      this.httpClient.post<any>(this.host + '/api/CheckTaskKeyWord', body).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  // will delete keyword task
  deleteKeywordTask(keyTaskId) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete<any>(this.host + "/api/deletKeywordTask?keyTaskId=" + keyTaskId).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  //getbacklink existing
  getBacklink() {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(this.host + '/api/getBacklink').subscribe(
        data => {
          resolve(data.backlink);
        });
    });
  }

  // add traitement keyword
  addTraitementKeyword(keywordId, BackLinkId) {
    return new Promise((resolve, reject) => {
      let body = {
        keywordId: keywordId,
        BackLinkId: BackLinkId
      }
      this.httpClient.post<any>(this.host + '/api/addTraitementKeyword', body).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  // get traitement keyword
  getTraitementKeyword(keywordId) {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(this.host + '/api/getTraitementKeyword?keywordId=' + keywordId).subscribe(
        data => {
          resolve(data.traitement);
        });
    });
  }

  // add new backlin and traitement
  createNewBacklink(keywordId, backlink) {
    return new Promise((resolve, reject) => {
      let body = {
        keywordId: keywordId,
        backlink: backlink
      }
      this.httpClient.post<any>(this.host + '/api/createNewBacklink', body).subscribe(
        data => {
          resolve(data.message);
        });
    });
  }

  // get all Notification keyTask 
  getNotificationKeyTask() {
    var array = []
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(this.host + '/api/getNotificationKeyTask').subscribe(
        data => {
          resolve(data.NotifcationKeyTask);
        });
    });
  }

  // get all Notification websiteTask
  getNotificationWebsiteTask() {
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(this.host + '/api/getNotificationWebsiteTask').subscribe(
        data => {
          resolve(data.NotificationWebsiteTask);
        });
    });
  }
  getallNotification() {
    var array = []
    this.getNotificationKeyTask().then(
      data => {
        array = array.concat(data)
        for (let i = 0; i < array.length; i++) {
          this.notification.next(
            new NotificationModule(
              array[i].Name_Task,
              array[i].Checked
            )
          )
        }
      }
    )
    var array1 = []
    this.getNotificationWebsiteTask().then(
      data => {
        array1 = array1.concat(data)
        for (let i = 0; i < array1.length; i++) {
          this.notification.next(
            new NotificationModule(
              array1[i].Name_Task,
              array1[i].Checked
            ))
        }
      }
    )
  }

  downloadSQL(){
    let headers = new HttpHeaders({
      "Authorization": "Bearer " + localStorage.getItem('token'), // Auth header
      //No other headers needed
    });
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(this.host + '/api/getDataBase', { headers, responseType: 'blob' as 'json' }).subscribe(
        data => {
            resolve(data);
        });
    });
  }

  // it's use it to manage notification 
  showNotification(from, align, type, message) {
    $.notify({
      icon: "notifications",
      message: message

    }, {
      type: type,
      timer: 600,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        // '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}
