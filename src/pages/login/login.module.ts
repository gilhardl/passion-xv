import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { LoginPage } from './login';
import { ToastProvider } from '../../providers/toast/toast.provider';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  entryComponents: [ ]
})
export class LoginPageModule {}
