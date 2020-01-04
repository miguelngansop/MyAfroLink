import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdressesPage } from './adresses.page';
import {_MatMenuDirectivesModule, MatMenuModule, MatTabsModule} from '@angular/material';
import {GoogleMapsComponent} from '../google-maps/google-maps.component';

const routes: Routes = [
  {
    path: '',
    component: AdressesPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MatTabsModule,
        _MatMenuDirectivesModule,
        MatMenuModule
    ],
    declarations: [AdressesPage, GoogleMapsComponent]
})
export class AdressesPageModule {}
