import { Component, OnInit } from '@angular/core';


declare const $: any;
import { HttpClient } from '@angular/common/http';
import { UserModule } from 'app/module/user/user.module';
import { SharedServicesService } from 'app/services/shared-services.service';
import { Subscription } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // menuItems: any[];
  public subscription: Subscription;
  constructor(
    private sharedServices: SharedServicesService,
    private httpClient: HttpClient) { }

  // call server host //
  public host: string = "http://localhost:3000";
  // variable of new user // 
  public Users = Array<UserModule>();

  public messageSql = ''

  ngOnInit() {

    this.sharedServices.getUserInfo();
    this.handleSubscriptions();

  }
  downloadSqlFile(){
    this.messageSql = "err"
    this.sharedServices.downloadSQL().then(
      blob => {
        if(blob == "file download error"){
          this.sharedServices.showNotification('top', 'center', 'danger', blob)
          this.messageSql = ''
        }else{
          saveAs(blob, "ExportSql-"+this.formatDate(new Date())+".sql")
          this.messageSql = ''
        }
      }
    )
  }
  public handleSubscriptions() {
    this.subscription = this.sharedServices.load_data_user.subscribe(
      dataUser => {
        if((Object.keys(dataUser).map(e => dataUser[e]).length) > 4){
          this.add(this.Users,dataUser);
          // this.Users.push(dataUser);
        }
      }
    )
  }
  add(arr:Array<UserModule>, user) {
    const found = arr.some(el => el.id === user.id);
    if (!found) arr.push(user);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
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


}