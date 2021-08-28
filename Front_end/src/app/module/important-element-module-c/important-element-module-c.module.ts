import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ImportantElementModuleCModule {
  
  Date_Update: Date;
  Framework: string;
  Domain_Age: string;
  Servers: string;
  CDN: string;
  Hierarchy: string;
  Click_Depth: number;
  Internal_Link: number;
  Number_Page: number;
  Page_Load_Speed: number;
  Avg_Word_Per_Page: number;
  Avg_Internal_Link: number;
  Avg_HTag: number;
  Domain_Authority: number;
  Avg_External_Link: number;
  Number_Referring_Domains: number;
  Number_Ip: number;
  Number_Backlinks: number;
  Publishing_Rate: number;
  
  constructor(@Inject(Date) Date_Update: Date, @Inject(String)  Framework: string, @Inject(String) Domain_Age: string, @Inject(String) Servers: string , @Inject(String) CDN: string, @Inject(String) Hierarchy: string,
  @Inject(Number) Click_Depth: number, @Inject(Number) Internal_Link: number, @Inject(Number) Number_Page: number,
  @Inject(Number) Page_Load_Speed: number, @Inject(Number) Avg_Word_Per_Page: number,@Inject(Number) Avg_Internal_Link: number,@Inject(Number) Avg_HTag, @Inject(Number) Domain_Authority: number,
  @Inject(Number) Avg_External_Link: number,@Inject(Number) Number_Referring_Domains: number,@Inject(Number) Number_Ip: number,
  @Inject(Number) Number_Backlinks: number,@Inject(Number) Publishing_Rate: number){
      
      this.Date_Update = Date_Update;
      this.Framework = Framework;
      this.Domain_Age= Domain_Age;
      this.Servers= Servers;
      this.CDN= CDN;
      this.Hierarchy= Hierarchy;
      this.Click_Depth= Click_Depth;
      this.Internal_Link= Internal_Link;
      this.Number_Page= Number_Page;
      this.Page_Load_Speed= Page_Load_Speed;
      this.Avg_Word_Per_Page= Avg_Word_Per_Page;
      this.Avg_Internal_Link= Avg_Internal_Link;
      this.Avg_HTag= Avg_HTag;
      this.Domain_Authority= Domain_Authority;
      this.Avg_External_Link= Avg_External_Link;
      this.Number_Referring_Domains= Number_Referring_Domains;
      this.Number_Ip= Number_Ip;
      this.Number_Backlinks= Number_Backlinks;
      this.Publishing_Rate= Publishing_Rate;

    }
 }
