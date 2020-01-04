import { Component, OnInit } from '@angular/core';
import { NavController,  PopoverController, ModalController} from '@ionic/angular';
import {PositionComponent} from '../maposition/position.component';
import {HistoriquesComponent} from '../historiques/historiques.component';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  openMenu: Boolean = false;

  constructor(public navCtrl: NavController, public popoverCtrl :PopoverController,
              public modalCtrl : ModalController) { }

  ngOnInit() {
  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }



  async virement () {
    const modal = await this.modalCtrl.create({
      component: PositionComponent
    });
    return await modal.present();
  }

  async histories(){
    const modal = await this.modalCtrl.create({
      component : HistoriquesComponent,
      animated : true,
    });
    return await modal.present();

  }

}
