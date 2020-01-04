import { Component, OnInit } from '@angular/core';
import {ModalController, LoadingController, ToastController, NavController, NavParams} from '@ionic/angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Position} from '../maposition/position.component';
import {MatSnackBar} from '@angular/material/snack-bar';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;




@Component({
  selector: 'app-new-adress',
  templateUrl: './new-adress.component.html',
  styleUrls: ['./new-adress.component.scss'],
})
export class NewAdressComponent implements OnInit {
  locationName:string = '';
  public base64Image: string;
  listofImages: Array<string> = [];
  locationPicture: string;
  code: string;
  position: any;
  positions: Observable<PositionWithName[]>;
  positionsCollectionRef : AngularFirestoreCollection<PositionWithName>;

  constructor(private modalCtrl: ModalController,
              public fstore: AngularFirestore,
              public navParams: NavParams,
              public loading: LoadingController,
              private _snackBar: MatSnackBar,
              public fAuth: AngularFireAuth) {
    this.positionsCollectionRef = this.fstore.collection('positions');
    this.positions = this.positionsCollectionRef.valueChanges();

  }

  ngOnInit() {
  // recuperation du parametre et initialisation du code position et de la position
  this.position = this.navParams.get('position').coords;
  console.log('la position :', this.position);
  this.code = this.navParams.get('code');
  }


  closeModal() {
    this.modalCtrl.dismiss();
  }
  async takePicture(): Promise<void> {
    // prise de photo depuis la camera
    try {
      const profilePicture = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      this.base64Image = 'data:image/jpeg;base64,' + profilePicture.base64String;
      this.listofImages.push(this.base64Image);
      this.locationPicture = profilePicture.base64String;
    } catch (error) {
      console.error(error);
    }
  }

  addAdresse(adressename: string): void {

    // presentons le loading pour assurer le user
    this.presentLoadingWithOptions();

    /*
     nous ne pouvons pas ajouter une adresse ayant le meme nom ou le meme code pour le meme utilisateur.
     nous allons verifier si le nom ou le code adresse existe deja.
     si c'est la cas on affiche une boite de dialogue pour signaler l'echec.
     et si cela n'existe pas, alors on cree et on affiche une boite de dialogue success.
    */

    this.positions.subscribe((list: Array<any>) => {
      console.log('liste des positions: ', list.filter((e: any) => {
            return e.user == this.fAuth.auth.currentUser.email;
          })
      );

    }, err => {
      console.log('erreur lors du chargement des positions');
    })

    this.positionsCollectionRef.add(
        {
          name: adressename,
          time: new Date().toLocaleTimeString(),
          datetime: new Date(),
          date : new Date().toLocaleTimeString(),
          user: this.fAuth.auth.currentUser.email,
          code: this.code,
          photos: ['url'],
          position: { lat: this.position.latitude, log: this.position.longitude} // position et non la liste des positions (positions)
        }
        ).then((result: any) => {
          console.log('sucess: ', result);
          //initialisation du nom du lieu et de la photo
          this.locationName = '';
          this.base64Image ='';
          this.locationPicture = '';
          this.openSnackBar('Ajouté avec succès', 'OK');
          //sucess arretons le loading
          this.loading.dismiss();
      this.positions.subscribe((list: any) => {
        console.log('liste des positions apres: ', list);

      }, err => {
        console.log('erreur lors du chargement des positions');
      })

    }).catch((err: any) => {
      //arretons le loading et affichons un message d'erreur avrc un toast
      this.loading.dismiss();
      this.openSnackBar('Echec! veuillez essayer plutard', 'OK');
      console.log('erreur :', err);
    })
}

  async presentLoadingWithOptions() {
    const loading = await this.loading.create({
      spinner: 'circular',
      duration: 5000,
      message: 'Patientez svp...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  // angular mat component, equivalent du toast
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}

export class PositionWithName {
  date : string;
  time : string;
  code : string;
  user: string;
  datetime: Date;
  name: string;
  photos: Array<string>;
  position: {
    log: string;
    lat: string;
  };
}
