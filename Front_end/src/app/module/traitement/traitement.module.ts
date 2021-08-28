import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TraitementModule { 
  
   Date_Traitement: Date;
   Name_BackLink: string;
   Url_BackLink: string;
   Type_BackLink: string;

  constructor(@Inject(Date) Date_Traitement: Date,
    @Inject(String)  Name_BackLink: string,
    @Inject(String)  Url_BackLink: string, @Inject(String) Type_BackLink: string) {
		this.Date_Traitement = Date_Traitement;
		this.Name_BackLink = Name_BackLink;
		this.Url_BackLink = Url_BackLink;
		this.Type_BackLink = Type_BackLink;
	}
  

}
