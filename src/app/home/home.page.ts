import {Component, OnInit} from '@angular/core';
import {AlertController, MenuController, ModalController, NavController, ToastController, PopoverController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestoreCollection, AngularFirestore} from 'angularfire2/firestore';
import {GeolocationPosition, Plugins} from '@capacitor/core';
import {NewAdressComponent} from '../new-adress/new-adress.component';
import {Observable} from 'rxjs';
const {Geolocation} = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  hid : boolean = false;
  ionite: any;
  position : GeolocationPosition;
  positions: Observable<any[]>;
  positionsCollectionRef : AngularFirestoreCollection;

  constructor(
      public navCtrl: NavController,
      public menuCtrl: MenuController,
      public alertCtrl: AlertController,
      public modalCtrl: ModalController,
      public toastCtrl: ToastController,
      private route : ActivatedRoute,
      private fAuth : AngularFireAuth,
      private fstore: AngularFirestore,
  ) {
    console.log(this.fAuth.auth.currentUser);
    this.positionsCollectionRef = this.fstore.collection('positions');
    this.positions = this.positionsCollectionRef.valueChanges();
  }

  close(){
    this.hid = !this.hid
  }

  ngOnInit(): void {
    this.getCurrentPosition();

  }

  getCode (position : GeolocationPosition ) {
    let code = (Math.round(position.coords.latitude*100)/100).toString().replace('.', 'L');
    code = code + (Math.round(position.coords.longitude*100)/100).toString().replace('.', 'D')
    let taille : number = code.length;
    while (taille<10){ // nous completons par des zeros, pour atteindre 10 caracteres au cas ou
      code = code + '0';
      taille = taille + 1;
    }
    return code;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  async getCurrentPosition(){
    Geolocation.getCurrentPosition().then((e: GeolocationPosition)=>{
      console.log(e);
      this.position = e;
    });
  }


  async newAdresse () {
    const modal = await this.modalCtrl.create({
      component: NewAdressComponent,
      componentProps: {
        position: this.position,
        code: this.getCode(this.position)
      }
    });
    return await modal.present();
  }

  //faire le fitrage pour la recherche


}
