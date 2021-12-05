import { ProfileComponent } from './riders/profile/profile.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FareEstimateComponent } from './fare-estimate/fare-estimate.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './_services/auth.guard';

export const appRouter: Routes = [
     { path: '', component: HomeComponent},
     { path: 'homeredirect', redirectTo: '/home' },
     { path: 'home', component: HomeComponent},
     { path: 'fare-estimate', component: FareEstimateComponent},
     { path: 'register', component: RegisterComponent},
     { path: 'login', component: LoginComponent},
     { path: 'about', component: AboutComponent},
     { path: 'contact', component: ContactComponent},
     {
         path: '',
         runGuardsAndResolvers: 'always',
         canActivate: [AuthGuard],
         children: [
          { path: 'profile', component: ProfileComponent}
         ]
     },
     { path: '', redirectTo: 'home', pathMatch: 'full'},
     { path: '**', redirectTo: 'home' }
];
