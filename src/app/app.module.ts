import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MyApp } from './app.component';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './firebase.credentials';

// SERVICES GLOBAUX
import { GlobalVarProvider } from '../providers/global-var/global-var.provider';
import { UtilsProvider } from '../providers/utils/utils.provider';
import { ToastProvider } from '../providers/toast/toast.provider';

import { PeopleProvider } from '../providers/people/people.provider';
import { TeamProvider } from '../providers/team/team.provider';
import { SquadProvider } from '../providers/squad/squad.provider';
import { StadiumProvider } from '../providers/stadium/stadium.provider';

// PIPES
import { PipesModule } from '../pipes/pipes.module';

// COMPOSANTS
import { ComponentsModule } from '../components/components.module'

// MODULES DE PAGES
import { LoginPageModule } from '../pages/login/login.module';
import { GettingStartedPageModule } from '../pages/getting-started/getting-started.module';
import { AddTeamPageModule } from '../pages/add-team/add-team.module';
import { AddSquadPageModule } from '../pages/add-squad/add-squad.module';
import { TabsModule } from '../pages/tabs/tabs.module';
import { SchedulePageModule } from '../pages/schedule/schedule.module';
import { SquadPageModule } from '../pages/squad/squad.module';
import { SquadPlayerPageModule } from '../pages/squad-player/squad-player.module';
import { SupporterPageModule } from '../pages/supporter/supporter.module';
import { EnumToStringPipe } from '../pipes/enum-to-string/enum-to-string';
import { AngularFirestoreModule } from 'angularfire2/firestore';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false, preloadModules: true }),  // scrollAssits & autoFocusAssis for Keyboard push up - preloadModules for lazy-loading
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,  // A supprimer
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,

    PipesModule.forRoot(),
    ComponentsModule,

    LoginPageModule,
    GettingStartedPageModule,
    AddTeamPageModule,
    AddSquadPageModule,
    TabsModule,
    SchedulePageModule,
    SquadPageModule,
    SquadPlayerPageModule,
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
    EnumToStringPipe,
    GlobalVarProvider,
    UtilsProvider,
    ToastProvider,
    PeopleProvider,
    TeamProvider,
    SquadProvider,
    StadiumProvider
  ]
})
export class AppModule { }
