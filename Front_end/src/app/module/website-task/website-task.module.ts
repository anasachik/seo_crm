import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class WebsiteTaskModule {
  id_task: number;
  Name_Task: string;
  Type_Task: string;
  Checked: boolean;
  Start: Date;
  End: Date



  constructor(@Inject(Number) id_task: number,@Inject(String) Name_Task: string,@Inject(String) Type_Task: string,
    @Inject(Boolean) Checked: boolean, @Inject(Date)  Start: Date, @Inject(Date) End: Date) {
		this.id_task = id_task;
		this.Name_Task = Name_Task;
		this.Type_Task = Type_Task;
		this.Checked = Checked;
		this.Start = Start;
		this.End = End;
	}


}
