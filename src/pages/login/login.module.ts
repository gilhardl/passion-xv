import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { BasicAuthComponent } from './basic-auth.component';

@NgModule({
  declarations: [
    LoginPage,
    BasicAuthComponent
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  entryComponents: [
    BasicAuthComponent
  ]
})
export class LoginPageModule {}
