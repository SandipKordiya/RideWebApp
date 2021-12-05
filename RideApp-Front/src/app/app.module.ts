import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule, BsDatepickerModule, TimepickerModule   } from 'ngx-bootstrap';


import { appRouter } from './routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SearchformComponent } from './searchform/searchform.component';
import { FareEstimateComponent } from './fare-estimate/fare-estimate.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_services/auth.guard';
import { UserService } from './_services/user.service';
import { ContactComponent } from './contact/contact.component';
import { FareEstimateService } from './_services/fare-estimate.service';
import { NavComponent } from './riders/nav/nav.component';
import { DashboardComponent } from './riders/dashboard/dashboard.component';
import { ProfileComponent } from './riders/profile/profile.component';
import { SidebarComponent } from './riders/sidebar/sidebar.component';


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
      HomeComponent,
      HeaderComponent,
      SearchformComponent,
      FareEstimateComponent,
      FooterComponent,
      AboutComponent,
      RegisterComponent,
      LoginComponent,
      ContactComponent,
      NavComponent,
      DashboardComponent,
      ProfileComponent,
      SidebarComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      RouterModule.forRoot(appRouter),
      GooglePlaceModule,
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyBsrEC0duO7f2xqb7xfWAVKb8V7BFRijRs'
      }),
      AgmDirectionModule,
      AngularFirestoreModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      NgxSpinnerModule,
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TimepickerModule.forRoot()
  ],
  providers: [
     AuthService,
     UserService,
     AuthGuard,
     FareEstimateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
