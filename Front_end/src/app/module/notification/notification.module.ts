import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class NotificationModule { 

  Name_Task: string;
  Checked: boolean;

	constructor(@Inject(String) Name_Task: string, @Inject(Boolean) Checked: boolean) {
		this.Name_Task = Name_Task;
		this.Checked = Checked;
	}

}
