import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class NewWebsiteTaskModule {
  
  id_task: number;
  Name_Task: string;
  Type_Task: string;
  Checked: boolean;
  End: Date

}
