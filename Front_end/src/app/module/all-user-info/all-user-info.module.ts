import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from '../user/user.module';
import { ImportantElementModuleCModule } from '../important-element-module-c/important-element-module-c.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AllUserInfoModule {
  
  user: UserModule;
  infoUser: ImportantElementModuleCModule[];

}
