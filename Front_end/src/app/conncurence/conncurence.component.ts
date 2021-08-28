import { Component, OnInit } from '@angular/core';
import { AllUserInfoModule } from 'app/module/all-user-info/all-user-info.module';
import { UserModule } from 'app/module/user/user.module';
import { ImportantElementModuleCModule } from 'app/module/important-element-module-c/important-element-module-c.module';
import { SharedServicesService } from 'app/services/shared-services.service';
import { ActivatedRoute } from '@angular/router';
import { ImportantElementModule } from 'app/module/important-element/important-element.module';
import { NewConcurenceModule } from 'app/module/new-concurence/new-concurence.module';
import { AllConcurrenceDataModule } from 'app/module/all-concurrence-data/all-concurrence-data.module';

declare var $: any;

@Component({
  selector: 'app-conncurence',
  templateUrl: './conncurence.component.html',
  styleUrls: ['./conncurence.component.css']
})
export class ConncurenceComponent implements OnInit {

  public allUserInfoModule = new AllUserInfoModule();

  public newConcurrence = new NewConcurenceModule();
  public newImportantInformation = new ImportantElementModule();

  public allConcurrences = new Array<AllConcurrenceDataModule>();

  id: string
  public messageProgress = '';
  public idConToDelete = '';
  constructor(
    private sharedServices: SharedServicesService,
    private _Activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUserAllInfo()
    this.getConcurrenceAllInfo()

    // this.compareRows(document.getElementById('#TableConcurrence'))
    // this.ok()
  }
  // will call services that show u user info
  getUserAllInfo() {
    this._Activatedroute.paramMap.subscribe(params => {
      var result = [];
      this.id = params.get('id');
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
          for (let index = 0; index < result.length; index++) {
            // console.log("data" + index + "=", result[index]);
            this.allUserInfoModule.infoUser.push(
              new ImportantElementModuleCModule(
                result[index].Date_Update,
                result[index].Framework,
                result[index].Domain_Age,
                result[index].Servers,
                result[index].CDN,
                result[index].Hierarchy,
                result[index].Click_Depth,
                result[index].Internal_Link,
                result[index].Number_Page,
                result[index].Page_Load_Speed,
                result[index].Avg_Word_Per_Page,
                result[index].Avg_Internal_Link,
                result[index].Avg_HTag,
                result[index].Domain_Authority,
                result[index].Avg_External_Link,
                result[index].Number_Referring_Domains,
                result[index].Number_Ip,
                result[index].Number_Backlinks,
                result[index].Publishing_Rate,
              )
            )
          }
        });
      console.log(this.allUserInfoModule);
    });
  }
  //will call services that will show all concurrence info
  getConcurrenceAllInfo() {
    this._Activatedroute.paramMap.subscribe(params => {
      var result = [];
      this.sharedServices.getConcurrenceAllInfo(params.get('id')).then(
        data => {
          result = result.concat(data);

          for (let index = 0; index < result.length; index++) {
            // const element = result[index];
            this.allConcurrences.push(
              new AllConcurrenceDataModule(
                result[index].Company_Name,
                result[index].Company_Url,
                result[index].CDN,
                result[index].Domain_Age,
                result[index].Framework,
                result[index].Hierarchy,
                result[index].Servers,
                result[index].Date_Update,
                result[index].Id_Competitor,
                result[index].Id_User,
                result[index].Avg_External_Link,
                result[index].Avg_HTag,
                result[index].Avg_Internal_Link,
                result[index].Avg_Word_Per_Page,
                result[index].Click_Depth,
                result[index].Domain_Authority,
                result[index].Id_Important_Element,
                result[index].Internal_Link,
                result[index].Number_Backlinks,
                result[index].Number_Ip,
                result[index].Number_Page,
                result[index].Number_Referring_Domains,
                result[index].Page_Load_Speed,
                result[index].Publishing_Rate,
              )
            );
          }

        });
      console.log(this.allConcurrences);
    });
  }
  // will call services that create a new concurrence
  createNewConcurrence() {
    this.messageProgress = 'progress';
    this.sharedServices.createNewConcurrence(this.id, this.newConcurrence, this.newImportantInformation).then(
      data => {
        if (data == 'Concurrence was being add !') {
          // this.showNotification('top','center','success', data )

          this.messageProgress = 'done';
          $('#newConcurrence').modal('hide');
          this.newConcurrence = new NewConcurenceModule();
          this.newImportantInformation = new ImportantElementModule();
          this.getUserAllInfo();
          this.allConcurrences = new Array<AllConcurrenceDataModule>();
          this.getConcurrenceAllInfo();
          this.sharedServices.showNotification('top', 'center', 'success', data)
        } else {
          this.messageProgress = 'err';
          this.sharedServices.showNotification('top', 'center', 'danger', data)
        }
      }
    )
  }

  // will delete concurrent
  deleteCompetitor(){
    if(this.idConToDelete != ''){
      this.sharedServices.deleteCompetitor(this.idConToDelete).then(
        data =>{
          if (data == 'all info compititor wase being deleted !'){
            this.allConcurrences = new Array<AllConcurrenceDataModule>();
            this.getConcurrenceAllInfo();
            this.idConToDelete = '';
            $('#deleteModal').modal('hide');
            this.sharedServices.showNotification('top', 'center', 'warning', data)
          }
        } 
      )
    }
  }
  setIdCompetitor(Id_Competitor){
    this.idConToDelete = Id_Competitor;
    console.log(this.idConToDelete);

  }


  // will compare value but should be updated later
  compareValue(value, type): string {
    var color = '';
    switch (type) {
      case 'Avg_External_Link':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value > this.allConcurrences[i].Avg_External_Link && value >= this.allUserInfoModule.infoUser[0].Avg_External_Link) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Avg_External_Link ) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
      case 'Avg_HTag':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value > this.allConcurrences[i].Avg_HTag && value >= this.allUserInfoModule.infoUser[0].Avg_HTag) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Avg_HTag ) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
      case 'Avg_Internal_Link':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value > this.allConcurrences[i].Avg_Internal_Link && value >= this.allUserInfoModule.infoUser[0].Avg_Internal_Link) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Avg_Internal_Link ) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
      case 'Avg_Word_Per_Page':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value > this.allConcurrences[i].Avg_Word_Per_Page && value >= this.allUserInfoModule.infoUser[0].Avg_Word_Per_Page) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Avg_Word_Per_Page ) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
      case 'Click_Depth':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value < this.allConcurrences[i].Click_Depth && value <= this.allUserInfoModule.infoUser[0].Click_Depth) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Click_Depth ) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
      case 'Domain_Authority':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value > this.allConcurrences[i].Domain_Authority && value >= this.allUserInfoModule.infoUser[0].Domain_Authority) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Domain_Authority) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
      case 'Internal_Link':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value > this.allConcurrences[i].Internal_Link && value >= this.allUserInfoModule.infoUser[0].Internal_Link) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Internal_Link ) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
      case 'Number_Backlinks':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value > this.allConcurrences[i].Number_Backlinks && value >= this.allUserInfoModule.infoUser[0].Number_Backlinks) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Number_Backlinks ) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
      case 'Number_Ip':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value > this.allConcurrences[i].Number_Ip && value >= this.allUserInfoModule.infoUser[0].Number_Ip) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Number_Ip ) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
      case 'Number_Page':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value > this.allConcurrences[i].Number_Page && value >= this.allUserInfoModule.infoUser[0].Number_Page) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Number_Page ) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
      case 'Number_Referring_Domains':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value > this.allConcurrences[i].Number_Referring_Domains && value >= this.allUserInfoModule.infoUser[0].Number_Referring_Domains) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Number_Referring_Domains ) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
      case 'Page_Load_Speed':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value < this.allConcurrences[i].Page_Load_Speed && value <= this.allUserInfoModule.infoUser[0].Page_Load_Speed) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Page_Load_Speed ) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
      case 'Publishing_Rate':
        for (var i = 0; i < this.allConcurrences.length; i++) {
          if (value > this.allConcurrences[i].Page_Load_Speed && value >= this.allUserInfoModule.infoUser[0].Publishing_Rate) {
            color = 'green-compare'
          } else if (value == this.allConcurrences[i].Page_Load_Speed ) {
            color = ''
          }
          else {
            color = 'red-compare'
            break
          }
        }
        break;
    }
    return color;
  }

  //will verify if the input pop up are empty
  objectIsEmpty(): boolean {
    var valuesUser = Object.keys(this.newConcurrence).map(e => this.newConcurrence[e]);
    var valuesUserInfo = Object.keys(this.newImportantInformation).map(e => this.newImportantInformation[e]);

    if ((valuesUser.length > 1) && (valuesUserInfo.length > 16)) {
      return true;
    };
    return false;
  }
}
