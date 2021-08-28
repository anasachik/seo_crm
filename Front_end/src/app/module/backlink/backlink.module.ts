import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BacklinkModule { 
  
   Id_BackLink: number;
   Name_BackLink: string;
   Url_BackLink: string;
   Type_BackLink: string


  constructor(@Inject(Number) Id_BackLink: number,@Inject(String)  Name_BackLink: string,
  @Inject(String)  Url_BackLink: string ,@Inject(String)  Type_BackLink:string) {
		this.Id_BackLink = Id_BackLink;
		this.Name_BackLink = Name_BackLink;
    this.Url_BackLink = Url_BackLink;
    this.Type_BackLink = Type_BackLink;
	}

}
