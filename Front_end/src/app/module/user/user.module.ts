import { NgModule, Injectable, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';


// @Injectable({ providedIn: 'root' })
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class UserModule { 
  id: number;
  Full_Name: string;
  Company_Name: string;
  Company_Url: string;
  Phone: string;
  Email: string;

  // constructor();

  constructor(@Inject(Number) id:number, @Inject(String) Full_Name: string, @Inject(String) Company_Name: string,@Inject(String)  Company_Url: string, @Inject(String)  Phone: string,@Inject(String)  Email: string){
    this.id = id;
    this.Full_Name = Full_Name;
    this.Company_Name = Company_Name;
    this.Company_Url = Company_Url;
    this.Phone = Phone;
    this.Email = Email;

  }
  
}
