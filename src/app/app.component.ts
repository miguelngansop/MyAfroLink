import {Component, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from 'angularfire2/auth';


export interface Pages {
  title: string;
  url: any;
  direct?: string;
  icon?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})




export class AppComponent implements OnInit{
  public appPages: Array<Pages>;
  email: string;
  ngOnInit() {

  setTimeout( ()=>{
    console.log("je suis en cours de demarage");
      }
      ,500
  )
    console.log('email',this.fAuth.auth.currentUser);
 // this.email =this.fAuth.auth.currentUser.email;

  }
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl : NavController,
    public fAuth: AngularFireAuth,

  ) {
    this.appPages = [
      {
        title: 'Accueil',
        url: '/home',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Mes adresses',
        url: '/adresses',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Mes partages',
        url: '/home',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'A propos',
        url: '/apropos',
        direct: 'forward',
        icon: 'information-circle-outline'
      },

      /*  {
         title: 'App Settings',
         url: '/settings',
         direct: 'forward',
         icon: 'cog'
       } */
    ];


    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout(){
    this.fAuth.auth.signOut().then(()=>{
      this.navCtrl.navigateRoot('login');
    })

  }
}

