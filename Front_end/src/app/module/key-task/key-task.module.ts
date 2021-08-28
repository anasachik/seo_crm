import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class KeyTaskModule { 
  Id_KewordTask : number;
  Name_Task: string;
  Checked: boolean;
  Start: Date;
  End: Date;

  constructor(@Inject(Number) Id_KewordTask: number,@Inject(String) Name_Task: string,
  @Inject(Boolean)  Checked: boolean,@Inject(Date) Start: Date,@Inject(Date) End: Date) {
		this.Id_KewordTask = Id_KewordTask;
		this.Name_Task = Name_Task;
		this.Checked = Checked;
		this.Start = Start;
		this.End = End;
	}

}
