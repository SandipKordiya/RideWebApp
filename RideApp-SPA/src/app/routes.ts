import {Routes, RouterModule} from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ListDriverComponent } from './list-driver/list-driver.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListBookingsComponent } from './list-bookings/list-bookings.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { EditBookingResolver } from './_resolver/edit-booking.resolver';
import { UpcommingBookingComponent } from './upcomming-booking/upcomming-booking.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddTaxiComponent } from './add-taxi/add-taxi.component';
import { ListTaxiComponent } from './list-taxi/list-taxi.component';
export const appRoutes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'users', component: ListUsersComponent},
    {path: 'drivers', component: ListDriverComponent},
    {path: 'drivers/add', component: AddDriverComponent},
    {path: 'bookings', component: ListBookingsComponent},
    {path: 'upcomming', component: UpcommingBookingComponent},
    {path: 'booking/view/:id', component: ViewBookingComponent, resolve: {data : EditBookingResolver} },
    {path: 'taxi/add', component: AddTaxiComponent},
    {path: 'taxi', component: ListTaxiComponent},
];
