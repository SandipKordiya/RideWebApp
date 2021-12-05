import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AgmCoreModule } from '@agm/core';         // @agm/core
import { AgmDirectionModule } from 'agm-direction';  // agm-direction
import { BsDropdownModule, CollapseModule, ButtonsModule, BsDatepickerModule, TimepickerModule, ModalModule  } from 'ngx-bootstrap';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthService } from './_services/auth.service';
import { EmailLoginComponent } from './email-login/email-login.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { ListDriverComponent } from './list-driver/list-driver.component';
import { DriverService } from './_services/driver.service';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListBookingsComponent } from './list-bookings/list-bookings.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { BookingsService } from './_services/bookings.service';
import { EditBookingResolver } from './_resolver/edit-booking.resolver';
import { UpcommingBookingComponent } from './upcomming-booking/upcomming-booking.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UsersService } from './_services/users.service';
import { AddTaxiComponent } from './add-taxi/add-taxi.component';
import { TaxiService } from './_services/taxi.service';
import { ListTaxiComponent } from './list-taxi/list-taxi.component';

const firebaseConfig = {
  apiKey: 'AIzaSyCGhzxFSD3B5OWVTw24sfehPWig23oDSyE',
  authDomain: 'rideapp-62184.firebaseapp.com',
  databaseURL: 'https://rideapp-62184.firebaseio.com',
  projectId: 'rideapp-62184',
  storageBucket: 'rideapp-62184.appspot.com',
  messagingSenderId: '969670312814'
};

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      SignupComponent,
      ProfileComponent,
      EmailLoginComponent,
      AddDriverComponent,
      ListDriverComponent,
      NavComponent,
      SidebarComponent,
      DashboardComponent,
      ListBookingsComponent,
      ViewBookingComponent,
      UpcommingBookingComponent,
      ListUsersComponent,
      AddTaxiComponent,
      ListTaxiComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      AngularFirestoreModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      BsDropdownModule.forRoot(),
      CollapseModule.forRoot(),
      AgmCoreModule.forRoot({ // @agm/core
         apiKey: 'AIzaSyBiWRrZ7Ri4-lVrlIbGTm5VUr3J2nS3IL8'
       }),
       AgmDirectionModule,     // agm-direction
       MomentModule
   ],
   providers: [
      AuthService,
      DriverService,
      BookingsService,
      UsersService,
      EditBookingResolver,
      TaxiService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
