import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController, Platform } from '@ionic/angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

export class User {
  email:string;
  password:string;
}



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  mode: number;
  pushes: any = [];
  user : User = new  User();

  constructor(
      public navCtrl: NavController,
      public menuCtrl: MenuController,
      public toastCtrl: ToastController,
      public alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      private formBuilder: FormBuilder,
      public plt: Platform,
      public  fAuth : AngularFireAuth,
      public  route : Router,
  ) {
  }


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });

  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }


  signup() {
    this.navCtrl.navigateRoot(['register']);
  }



  async handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Login failed';
    } else {
      message = `Unexpected error: ${error.statusText}`;
    }

    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

async  login(credentials){
    try {

      let result = await this.fAuth.auth.signInWithEmailAndPassword(credentials.username.replace(' ', ''), credentials.password);
      if(result){
        console.log("Sucess authentication :", result);
        this.route.navigate(['/home']);
      }

    }
    catch (e) {
      console.log('error :', e)
      if(e.message.includes('The email address is badly formatted')){
        this.presentToast('Cette adresse email est mal formatée');
      }else if(e.message.includes('The password is invalid or the user does not have a password.')){
        this.presentToast('Ce mot de passe n\'est pas valide');
      }else if(e.message.includes('There is no user record corresponding to this identifier')){
        this.presentToast('Ce compte n\'existe pas.');
      }else if(e.message.includes('A network error')){
        this.presentToast('Désole,  problème de connexion internet. vérifiez votre réseau et essayez à nouveau');
      }
    }
  }

  async presentToast( message : string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


}

