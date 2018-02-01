import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './firebase.credentials';

// SERVICES GLOBAUX
import { GlobalVarService } from '../services/global-var/global-var.service';
import { ToastService } from '../services/toast/toast.service';

import { PeopleService } from '../services/people/people.service';

// MODULES DE PAGES
import { TabsModule } from '../pages/tabs/tabs.module';
import { LoginPageModule } from '../pages/login/login.module';
import { GettingStartedPageModule } from '../pages/getting-started/getting-started.module'
import { SchedulePageModule } from '../pages/schedule/schedule.module';
import { TeamPageModule } from '../pages/team/team.module';
import { TeamPlayerPageModule } from '../pages/team-player/team-player.module';
import { SupporterPageModule } from '../pages/supporter/supporter.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    GettingStartedPageModule,
    LoginPageModule,
    TabsModule,
    SchedulePageModule,
    TeamPageModule,
    TeamPlayerPageModule,
    SupporterPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalVarService,
    ToastService,
    PeopleService
  ]
})
export class AppModule { }
