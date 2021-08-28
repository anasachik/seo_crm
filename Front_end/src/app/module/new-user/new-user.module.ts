import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class NewUserModule { 

  id: number;
  Full_Name: string;
  Company_Name: string;
  Company_Url: string;
  Phone: string;
  Email: string;

  // constructor();
}
