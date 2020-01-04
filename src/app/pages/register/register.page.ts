import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public user : Users = new Users();

  constructor(public navCtrl: NavController,
              public fAuth: AngularFireAuth,
              public fstore : AngularFirestore,
              public  toastCtrl: ToastController,
              ){
  }

  ngOnInit() {}
    async register(credentials : Users) {
      try {
        this.user.email = credentials.email;
        this.user.password = credentials.password;

        var r = await this.fAuth.auth.createUserWithEmailAndPassword(
              this.user.email,
              this.user.password
          );

          if (r) {
            this.presentToast('Successfully registered!')
            this.navCtrl.navigateRoot('login');
          }

      } catch (err) {
        console.error(err);
        this.presentToast(err.message)
      }
    }

  signin(){
    this.navCtrl.navigateRoot('login');
  }

  async presentToast( message : string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


}

export class Users {
  email: string;
  password: string;
  phone: string;
}



