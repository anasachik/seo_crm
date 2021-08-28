import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { KeywordModule } from 'app/module/keyword/keyword.module';
import { ActivatedRoute } from '@angular/router';
import { SharedServicesService } from 'app/services/shared-services.service';
import { NewKeywordModule } from 'app/module/new-keyword/new-keyword.module';
import {Location} from '@angular/common';
import { NewKeyTaskModule } from 'app/module/new-key-task/new-key-task.module';
import { KeyTaskModule } from 'app/module/key-task/key-task.module';
import { BacklinkModule } from 'app/module/backlink/backlink.module';
import { TraitementModule } from 'app/module/traitement/traitement.module';
import { type } from 'jquery';
import { NewTraitementModule } from 'app/module/new-traitement/new-traitement.module';
declare var $: any;

@Component({
  selector: 'app-keyword-statistic',
  templateUrl: './keyword-statistic.component.html',
  styleUrls: ['./keyword-statistic.component.css']
})
export class KeywordStatisticComponent implements OnInit {

  allinfoKeyWord: Array<KeywordModule> = [];
  id: string;
  idKey: string;
  p: number = 1;
  
  public updateKeyWord = new NewKeywordModule();
  public newKeyWordTask = new NewKeyTaskModule();
  public allKeyWordTask = new Array<KeyTaskModule>();
  public backlinksCats = new Array<string>();
  public allBacklinks = new Array<BacklinkModule>();
  public nameBacklinkCat = '';
  public BacklinkId = '';
  public newTraitement = new NewTraitementModule();

  public alltraitement = new Array<TraitementModule>();
  public traitementCat = new Array<string>();

  constructor(
    private _location: Location,
    private _Activatedroute: ActivatedRoute,
    private sharedServices: SharedServicesService,
  ) { }

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
      this.idKey = params.get('idKey');
      this.getKeywordsAllInfo();
      this.getKeywordTask();
      this.getTraitementKeyword();
    });
    this.getBacklink();
    

  }
  // will get all info of keyword 
  getKeywordsAllInfo() {
    var array = [];
    this.sharedServices.getKeywordsAllInfo(this.idKey , 10).then(
      data => {
        var labelsString:Array<string> = []
        var labelsNumber:Array<number> = []

        array = array.concat(data);
        for (let index = 0; index < array.length; index++) {
          labelsString.push(
            this.formatDate(array[index].Date_Update)
          )
          labelsNumber.push(
            array[index].Number_Search
          )
          this.allinfoKeyWord.push(
            new KeywordModule(
              array[index].Id_Update,
              array[index].Date_Update,
              array[index].Number_Search,
              array[index].Google_Position,
              array[index].Impression,
              array[index].Clicks,
              array[index].Id_Keyword,
              array[index].Name_Keyword,
              array[index].Source_Data,
            )
          );
          if(index == 0){
            this.updateKeyWord = new KeywordModule(
              array[index].Id_Update,
              array[index].Date_Update,
              array[index].Number_Search,
              array[index].Google_Position,
              array[index].Impression,
              array[index].Clicks,
              array[index].Id_Keyword,
              array[index].Name_Keyword,
              array[index].Source_Data,
            )
          }
        }
        array.sort(
          function(a,b){
            return b.Number_Search-a.Number_Search
          }
        )
        // console.log(this.allinfoKeyWord)
        /* ----------==========     Status keyWord Chart initialization For Documentation    ==========---------- */

        const datastatusWebSite: any = {
          labels: labelsString.reverse(),
          series: [
            labelsNumber.reverse()
          ]
        };

        const optionsstatusWebSite: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: Math.min(...labelsNumber),
          high: Math.max(...labelsNumber), // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 20, right: 0, bottom: 0, left: 20 },
        }

        var statusWebSite = new Chartist.Line('#statusWebSite', datastatusWebSite, optionsstatusWebSite);

        this.startAnimationForLineChart(statusWebSite);
        this.sharedServices.getallNotification()
      }
    );
  }

  // will update keyword 
  updateKeyword(){
    this.sharedServices.updateKeyword(this.updateKeyWord).then(
      data => {
        // console.log(data)
        this.allinfoKeyWord = [];
        this.updateKeyWord = new NewKeywordModule();
        this.sharedServices.showNotification('top', 'center', 'success', data)
        this.getKeywordsAllInfo();
      }
    )
  }

  // will create new keyword task 
  addKeywordTask(){
    this.sharedServices.addKeywordTask(this.idKey , this.newKeyWordTask).then(
      data =>{
        this.newKeyWordTask = new NewKeyTaskModule();
        this.allKeyWordTask = new Array<KeyTaskModule>();
        this.getKeywordTask()
        $('#newKeyWordTaskModal').modal('hide');
        this.sharedServices.showNotification('top', 'center', 'success', data)
      }
    )
  }

  // get all keyword task 
  getKeywordTask(){
    var array = [];
    this.sharedServices.getKeywordTask(this.idKey).then(
      data => {
        array = array.concat(data);
        for (let i = 0; i < array.length; i++) {
          this.allKeyWordTask.push(
            new KeyTaskModule(
              array[i].Id_KewordTask,
              array[i].Name_Task,
              array[i].Checked,
              array[i].Date_Ajoute,
              array[i].Date_Expiration,
            )
          );
        }
        this.sharedServices.getallNotification()
      }
    )
  }
  
  // update task keyword check
  updateTaskKeyWord(keyTask){
    this.sharedServices.updateTaskKeyWord(keyTask).then(
      data =>{
        if (data == 'task was being updated !'){
          this.allKeyWordTask = new Array<KeyTaskModule>();
          this.getKeywordTask();
          this.sharedServices.showNotification('top', 'center', 'warning', data)
        }
      } 
    )
  }

  // delete keyword task
  deleteKeywordTask(keyTaskId){
    this.sharedServices.deleteKeywordTask(keyTaskId).then(
      data =>{
        if (data == 'keyword task was being deleted !'){
          this.allKeyWordTask = new Array<KeyTaskModule>();
          this.getKeywordTask();
          this.sharedServices.showNotification('top', 'center', 'danger', data)
          this.sharedServices.getallNotification()
        }
      } 
    )
  }

  // get backlink 
  getBacklink(){
    var array = [];
    this.sharedServices.getBacklink().then(
      data => {
        array = array.concat(data);
          for (let i = 0; i < array.length; i++) {
            if(!this.backlinksCats.includes(array[i].Type_BackLink)){
              this.backlinksCats.push(array[i].Type_BackLink)
            }
            this.allBacklinks.push(
              new BacklinkModule(
                array[i].Id_BackLink,
                array[i].Name_BackLink,
                array[i].Url_BackLink,
                array[i].Type_BackLink
              )
            )
          }
      }
    )
  }

  // set backlink categorie choosing
  setBacklinkCat(nameBacklinkCat){
    if(nameBacklinkCat == 'Choose Category'){
      this.nameBacklinkCat = '';
    }else{
      this.nameBacklinkCat = nameBacklinkCat;
    }
    
    // console.log(this.nameBacklinkCat)
  }
  setBacklinkChoosing(id){
    if(id == 'Choose Backlink'){
      this.BacklinkId = '';
    }else{
      this.BacklinkId = id;
    }
  }

  // add traitement keyword
  addTraitementKeyword(){
    this.sharedServices.addTraitementKeyword(this.idKey , this.BacklinkId ).then(
      data => {
        this.BacklinkId ='';
        $('#backlinkModal').modal('hide');
        this.alltraitement = new Array<TraitementModule>();
        this.traitementCat = new Array<string>();
        this.getTraitementKeyword()
        this.sharedServices.showNotification('top', 'center', 'success', data)
      })
  }

  // get traitement
  getTraitementKeyword(){
    var array = [];
    this.sharedServices.getTraitementKeyword(this.idKey).then(
      data =>{
        array = array.concat(data);
          for (let i = 0; i < array.length; i++) {
            if(!this.traitementCat.includes(array[i].Type_BackLink)){
              this.traitementCat.push(array[i].Type_BackLink)
            }
            this.alltraitement.push(
              new TraitementModule(
                array[i].Date_Traitement,
                array[i].Name_BackLink,
                array[i].Url_BackLink,
                array[i].Type_BackLink,
              )
            )
          }
        console.log(this.traitementCat)
      }
    )
  }

  // set typebacklink into new backlink
  setBacklinkType(Type_BackLink){
    this.newTraitement.Type_BackLink = Type_BackLink
  }

  // create new backlink
  createNewBacklink(){
    this.sharedServices.createNewBacklink(this.idKey, this.newTraitement).then(
      data => {
        this.newTraitement = new NewTraitementModule();
        this.alltraitement = new Array<TraitementModule>();
        this.traitementCat = new Array<string>();
        $('#backlinkModal').modal('hide');
        this.getTraitementKeyword();
        this.sharedServices.showNotification('top', 'center', 'success', data)
      })
  }

  // filter select box
  filterItemsOfType(type){
    return this.allBacklinks.filter(x => x.Type_BackLink == type);
  }
  filterItemsOfTypetraitement(type){
    return this.alltraitement.filter(x => x.Type_BackLink == type);
  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        // d.getHours+d.getMinutes+d.getSeconds
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [day, month ,year].join('-');
  }
  formatDateTime(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        min = ''+ d.getMinutes(),
        sec = ''+d.getSeconds()
        // d.getHours+d.getMinutes+d.getSeconds
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (min.length < 2)
        min = '0' +min;
    if(sec.length < 2)
        sec = '0' +sec;
  
    return [ day, month, year].join('-')+"  "+ [hour, min, sec].join(':');
  }
  checkIfChange(){
    return this.shallowEqual(this.allinfoKeyWord[0] , this.updateKeyWord)
  }
  shallowEqual(object1, object2) {
    if(object1 && object2){
      var keys1 = Object.keys(object1);
      var keys2 = Object.keys(object2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (let key of keys1) {
        if (object1[key] !== object2[key]) {
          return false;
        }
      }
      return true;
    }
  }
  onClickBack() {
    this._location.back();
  }
  keywordTaskempty(){
    var newKeyWord = Object.keys(this.newKeyWordTask).map(e => this.newKeyWordTask[e]);
    // console.log(newKeyWord.length)
    if (newKeyWord.length > 1) {
      var empty = 0;
      for (let i = 0; i < newKeyWord.length; i++) {
        // console.log(newKeyWord.length)
        if(newKeyWord[i] || newKeyWord[i] == 0){
          empty++
        }
      }
      if(empty > 1){
        return true;
      }
    };
    return false;
  }
  removeSpace(string){
    return string.replace(/\s/g, '').replace(/[^a-zA-Z ]/g, "")
  }
  objectIsEmpty(): boolean {
    var valuestask = Object.keys(this.newTraitement).map(e => this.newTraitement[e]);
    if (valuestask.length > 1) {
      var empty = 0;
      for (let i = 0; i < valuestask.length; i++) {
        if(valuestask[i]){
          empty++
        }
      }
      if(empty == 3){
        return true;
      }
    };
    return false;
  }
}
