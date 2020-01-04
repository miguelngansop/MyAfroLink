import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from "rxjs/operators";

import {GeolocationPosition, Plugins} from '@capacitor/core';
const {Geolocation} = Plugins;
@Component({
  selector: 'app-payer',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {
  details : boolean = false;
  lat: number;
  lng: number;
  address: string;
  listpositions = [];
  public position : GeolocationPosition;
  titreDetails ='Detaiils';

  positions : Observable<Position[]>;

  positionsCollectionRef : AngularFirestoreCollection<Position>;

  constructor(
              public loadingCtrl: LoadingController,
              private http: HttpClient,
              private modal : ModalController,
              public toastController: ToastController,
              public toastCtrl : ToastController,
              public  fAuth : AngularFireAuth,
              public fstore : AngularFirestore,) {

    this.positionsCollectionRef = this.fstore.collection('positions');
    this.positions = this.positionsCollectionRef.valueChanges();
  }

  ngOnInit() {
    this.getCurrentPosition();

  }

  async getCurrentPosition(){
    Geolocation.getCurrentPosition().then((e: GeolocationPosition)=>{
      console.log(e);
      this.position = e;
      // enregistrons cette positions
      this.positionsCollectionRef.add({time: new Date().toLocaleTimeString(),datetime: new Date(), date : new Date().toLocaleDateString(), code: this.getCode(e), user: this.fAuth.auth.currentUser.email}).then((data : any)=>{
        console.log('resultat :', data);
      });
      this.lat = e.coords.latitude;
        this.lng = e.coords.longitude;

        this.getAddress(this.lat, this.lng).subscribe(decodedAddress => {
            this.address = decodedAddress;
            console.log(this.address);
        });

    }, err => {
      console.log('erreur', err)
    })


  }

  getCode(position: GeolocationPosition){
    /* aucune adresse ne peux avoir une valeur de latitude >= 100 donc tiens au max sur de valeurs entiere. nous
       prevoyons deux chiffres apres la virgule pour plus de precison. ca fait 8 chiffres pour latitude et longitude
       nous ne pouvons pas ajouter d'information supplementaire comme la vitesse et autre vu que nous n'avons que 10
       caracteres. pour les virgules nous allons remplacer la premiere par L pour let et l'autre par D pour dire
       Develop.
       Let'us develop (Ld)
       arrondissement de 2 chiffres apres la virgule sur la latitude
     */
   let code = (Math.round(position.coords.latitude*100)/100).toString().replace('.', 'L');
    code = code + (Math.round(position.coords.longitude*100)/100).toString().replace('.', 'D')
    let taille : number = code.length;
    while (taille<10){ // nous completons par des zeros, pour atteindre 10 caracteres au cas ou
      code = code + '0';
      taille = taille + 1;
    }
    return code;
  }
  detail(){
    this.details = !this.details;
    this.titreDetails = this.details ? 'Masquer' : 'Details';
  }

  // This function makes an http call to google api to decode the cordinates

   getAddress(lat: number, lan: number) {
    return this.http
        .get<any>(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&key=${
                environment.googleMapsAPIKey
                }`
        )
        .pipe(
            map(geoData => {
              if (!geoData || !geoData.results || geoData.results === 0) {
                return null;
              }else {
                  console.log(geoData)
                  return geoData.results[0].formatted_address;
              }
            })
        );
  }

  // function to display the toast with location and dismiss button

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.address,

      position: "middle",
      buttons: [
        {
          icon: "close-circle",
          role: "cancel"
        }
      ]
    });
    toast.present();
  }

  // click function to display a toast message with the address

  onMarkerClick() {
    this.presentToast();
  }

    closeModal(){
      this.modal.dismiss()
    }
}
export class Position {
  date : string;
  time : string;
  code : string;
  user: string;
  datetime: Date;

}
