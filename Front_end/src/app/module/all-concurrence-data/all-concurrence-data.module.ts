import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AllConcurrenceDataModule {

   Company_Name: string;
   Company_Url: string;
   CDN: string;
   Domain_Age: string;
   Framework: string;
   Hierarchy: string;
   Servers: string;
   Date_Update: Date;

   Id_Competitor: number;
   Id_User: number;

   Avg_External_Link: number;
   Avg_HTag: number;
   Avg_Internal_Link: number;
   Avg_Word_Per_Page: number;
   Click_Depth: number;
   Domain_Authority: number;
   Id_Important_Element: number;
   Internal_Link: number;
   Number_Backlinks: number;
   Number_Ip: number;
   Number_Page: number;
   Number_Referring_Domains: number;
   Page_Load_Speed: number;
   Publishing_Rate: number;


  constructor(@Inject(String) Company_Name: string,@Inject(String) Company_Url: string,@Inject(String) CDN: string,@Inject(String) Domain_Age: string,
  @Inject(String) Framework: string, @Inject(String) Hierarchy: string, @Inject(String) Servers: string,
  @Inject(Date) Date_Update: Date,@Inject(Number) Id_Competitor: number,@Inject(Number) Id_User: number,@Inject(Number) Avg_External_Link: number,
  @Inject(Number) Avg_HTag: number,@Inject(Number) Avg_Internal_Link: number,@Inject(Number) Avg_Word_Per_Page: number,
  @Inject(Number) Click_Depth: number,@Inject(Number) Domain_Authority: number,@Inject(Number) Id_Important_Element: number,
  @Inject(Number) Internal_Link: number,@Inject(Number) Number_Backlinks: number,@Inject(Number) Number_Ip: number,@Inject(Number) Number_Page: number,
  @Inject(Number) Number_Referring_Domains: number,@Inject(Number) Page_Load_Speed: number,@Inject(Number) Publishing_Rate: number) {
		this.Company_Name = Company_Name;
		this.Company_Url = Company_Url;
		this.CDN = CDN;
		this.Domain_Age = Domain_Age;
		this.Framework = Framework;
		this.Hierarchy = Hierarchy;
		this.Servers = Servers;
		this.Date_Update = Date_Update;
		this.Id_Competitor = Id_Competitor;
		this.Id_User = Id_User;
		this.Avg_External_Link = Avg_External_Link;
		this.Avg_HTag = Avg_HTag;
		this.Avg_Internal_Link = Avg_Internal_Link;
		this.Avg_Word_Per_Page = Avg_Word_Per_Page;
		this.Click_Depth = Click_Depth;
		this.Domain_Authority = Domain_Authority;
		this.Id_Important_Element = Id_Important_Element;
		this.Internal_Link = Internal_Link;
		this.Number_Backlinks = Number_Backlinks;
		this.Number_Ip = Number_Ip;
		this.Number_Page = Number_Page;
		this.Number_Referring_Domains = Number_Referring_Domains;
		this.Page_Load_Speed = Page_Load_Speed;
		this.Publishing_Rate = Publishing_Rate;
	}


}
