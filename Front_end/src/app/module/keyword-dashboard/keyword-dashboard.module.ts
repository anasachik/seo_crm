import { NgModule, Injectable, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class KeywordDashboardModule { 
  Id_Update: number;
  Date_Update: Date;
  Number_Search: Array<number>;
  Google_Position: Array<number>;
  Impression: Array<number>;
  Clicks: Array<number>;
  Id_Keyword: number;
  Name_keyword: string;
  Source_Data: string;

  constructor(@Inject(String) Id_Update: number,@Inject(Date) Date_Update: Date,
  @Inject(Array) Number_Search: Array<number>,@Inject(Array)  Google_Position: Array<number>,@Inject(Array)  Impression: Array<number>,@Inject(Array)  Clicks: Array<number>,
  @Inject(Number)  Id_Keyword: number,@Inject(String)  Name_keyword: string,@Inject(String)  Source_Data: string) {
		this.Id_Update = Id_Update;
		this.Date_Update = Date_Update;
		this.Number_Search = Number_Search;
		this.Google_Position = Google_Position;
		this.Impression = Impression;
		this.Clicks = Clicks;
		this.Id_Keyword = Id_Keyword;
		this.Name_keyword = Name_keyword;
		this.Source_Data = Source_Data;
	}
}
