import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthService} from './auth.service';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {PositionComponent} from './maposition/position.component';

import {FormsModule} from '@angular/forms';
import {HistoriquesComponent} from './historiques/historiques.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AgmCoreModule } from '@agm/core';
import {environment} from '../environments/environment';
import {GoogleMapsComponent} from './google-maps/google-maps.component';
import {NewAdressComponent} from './new-adress/new-adress.component';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';




var CREDENTIALS = {
  apiKey: "AIzaSyDMgXpXNVN07IkAK3WXe5cOOsmK22vtOdE",
  authDomain: "myafrolink-7a88d.firebaseapp.com",
  databaseURL: "https://myafrolink-7a88d.firebaseio.com",
  projectId: "myafrolink-7a88d",
  storageBucket: "myafrolink-7a88d.appspot.com",
  messagingSenderId: "878165069243",
  appId: "1:878165069243:web:77f780a0637b826d28489e",
  measurementId: "G-1SHS120EJC"
};

export function tokenGetter() {
  return localStorage.getItem('jwt_token');
}

@NgModule({
  declarations: [AppComponent, PositionComponent, HistoriquesComponent, NewAdressComponent],
  entryComponents: [PositionComponent, HistoriquesComponent, NewAdressComponent],
    imports: [BrowserModule,
        BrowserAnimationsModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        FormsModule,
        AngularFireModule.initializeApp(CREDENTIALS),
        AngularFireAuthModule,
        HttpClientModule
        ,
        AgmCoreModule.forRoot({
            apiKey: environment.googleMapsAPIKey
        }),
        IonicModule.forRoot(), AppRoutingModule, MatIconModule, MatButtonModule, MatToolbarModule],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
