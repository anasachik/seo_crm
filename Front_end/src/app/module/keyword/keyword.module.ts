import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class KeywordModule {

  Id_Update: number;
  Date_Update: Date;
  Number_Search: number;
  Google_Position: number;
  Impression: number;
  Clicks: number;
  Id_Keyword: number;
  Name_keyword: string;
  Source_Data: string;

  constructor(@Inject(Number) Id_Update: number,@Inject(Date)  Date_Update: Date,
  @Inject(Number) Number_Search: number,@Inject(Number) Google_Position: number,@Inject(Number) Impression: number,
   @Inject(Number) Clicks: number,@Inject(Number) Id_Keyword: number,@Inject(String) Name_keyword: string,@Inject(String) Source_Data: string) {
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
