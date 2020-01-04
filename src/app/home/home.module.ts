import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { HomePage } from './home.page';
import {TestComponent} from '../menu/test.component';
import {MatCardModule, MatMenuModule, MatTabsModule, MatToolbarModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        MaterialModule,
        ReactiveFormsModule,
        MatCardModule,
        MatToolbarModule,
        MatTabsModule,
        MatMenuModule,
    ],
    declarations: [HomePage, TestComponent]
})
export class HomePageModule {}
