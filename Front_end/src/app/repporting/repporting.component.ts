import { Component, OnInit } from '@angular/core';
import { ImportantElementModuleCModule } from 'app/module/important-element-module-c/important-element-module-c.module';
import { UserModule } from 'app/module/user/user.module';
import { AllUserInfoModule } from 'app/module/all-user-info/all-user-info.module';
import { ActivatedRoute } from '@angular/router';
import { SharedServicesService } from 'app/services/shared-services.service';
import { KeywordDashboardModule } from 'app/module/keyword-dashboard/keyword-dashboard.module';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-repporting',
  templateUrl: './repporting.component.html',
  styleUrls: ['./repporting.component.css']
})
export class RepportingComponent implements OnInit {

  public allUserInfoModule = new AllUserInfoModule();
  id: any;
  public TopKeyWord = 0;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private sharedServices: SharedServicesService,
  ) { }
  allKeyWords: Array<KeywordDashboardModule> = [];
  ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getUserAllInfo();
      this.getAllLastKeyword(true);
    });
  }
  captureScreen(){  
    var data = document.getElementById('contentPdf');  //Id of the table
    var date = Date();
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 210;     
      let imgHeight = canvas.height * imgWidth / canvas.width;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF(); // A4 size page of PDF  
      let position = 10;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight+5)  
      autoTable(pdf,
      {theme : 'grid',
      headStyles:{ halign: 'center',textColor: [255,255,255], fillColor: [156,39,176] },
      head:[['ID', 'Name', 'Country']],
      columns: [
        { header: 'KeyWords', dataKey: 'KeyWords' },
        { header: 'Search Number', dataKey: 'Search_Number' },
        { header: 'Google Pos.', dataKey: 'Google_Pos' },
        { header: 'Impression', dataKey: 'Impression' },
        { header: 'Clicks', dataKey: 'Clicks' },
      ],
      styles: {
          halign: 'center'
      },
      columnStyles: { 0: { halign: 'left'} },
      html: '#tablePdf' ,startY: imgHeight+10})
      pdf.save('rapport-'+this.allUserInfoModule.user.Full_Name+'-'+this.formatDate(date)+'.pdf'); // Generated PDF   
    });  
  }  
  // will get the user info 
  getUserAllInfo() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      var result = [];
      this.sharedServices.getUserAllInfo(params.get('id')).then(
        data => {
          result = result.concat(data);
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
            for (let i = 0; i < result.length; i++) {
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
            }
      console.log(this.allUserInfoModule);
          
          })
    });
  }
  getAllLastKeyword(ascending) {
    var array = [];
    this.allKeyWords = [];


    this.sharedServices.getAllLastKeyword(this.id).then(
      data => {
        var google_Position = [];
        var number_Search = [];
        var Impression = [];
        var Clicks = [];
        array = array.concat(data);
        array.sort(
          this.sorting(ascending)
        )
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
  
}
