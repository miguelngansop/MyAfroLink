import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Position} from '../maposition/position.component';


@Component({
  selector: 'app-historiques',
  templateUrl: './historiques.component.html',
  styleUrls: ['./historiques.component.scss'],
})
export class HistoriquesComponent implements OnInit {

  positions : Observable<Position[]>;

  positionsCollectionRef : AngularFirestoreCollection<Position>;
  listpositions = [];

  constructor( private modalCtrl: ModalController,
               public fstore : AngularFirestore,
               public  auth: AngularFireAuth,
              ) {

    this.positionsCollectionRef = this.fstore.collection('positions');
    this.positions = this.positionsCollectionRef.valueChanges();
  }

  ngOnInit() {
   let  aux = []
    this.positionsCollectionRef.get().subscribe((e:any)=>{
      console.clear();
      e.forEach((item: any)=>{
        console.log(item.data())
        let position = new Position();
        position = item.data()
        if( position.user == this.auth.auth.currentUser.email ) {
          aux.push(position)
        }
      })
      this.listpositions = aux;
      this.listpositions = this.listpositions.sort((a: Position, b: Position) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      });
      console.log('liste des positions', aux);

    })
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }






}
