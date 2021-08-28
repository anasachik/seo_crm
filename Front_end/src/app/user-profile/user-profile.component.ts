import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedServicesService } from 'app/services/shared-services.service';
import { AllUserInfoModule } from 'app/module/all-user-info/all-user-info.module';
import { UserModule } from 'app/module/user/user.module';
import { ImportantElementModuleCModule } from 'app/module/important-element-module-c/important-element-module-c.module';
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  public allUserInfoModule = new AllUserInfoModule();

  id: string

  constructor(
    private sharedServices: SharedServicesService,
    private _Activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUserAllInfo()
  }
  getUserAllInfo(){
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      var result = [];
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
  updateUserInfo(){
    this.sharedServices.updateUserInfo(this.allUserInfoModule.user).then(
      data =>{
        if(data == 'Data Updated !'){
          this.sharedServices.showNotification('top','center','success', data )
          this.getUserAllInfo();
          this.sharedServices.getUserInfo();
        }else{
          this.sharedServices.showNotification('top','center','danger', data )
        }
      }
    )
  }
  // is use it to update user important element
  updateUserImportantElement(){
    this.sharedServices.updateUserImportantElement(this.allUserInfoModule.user.id, this.allUserInfoModule.infoUser[0]).then(
      data =>{
        if(data == 'Data Important Element Updated !'){
          this.sharedServices.showNotification('top','center','success', data)
          // this.getUserAllInfo();
          this.sharedServices.getUserInfo();
        }else{
          this.sharedServices.showNotification('top','center','danger', data )
        }
      }
    )
  }
 
}
