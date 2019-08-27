import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from '../shared/alert/alert.component';

@NgModule({
  declarations: [AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }])
  ]
})
export class AuthModule {

}
