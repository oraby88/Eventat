import { Routes } from '@angular/router';
import { QrReadingComponent } from './components/qr-reading/qr-reading.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { QrScanComponent } from './components/qr-scan/qr-scan.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path:'home', component: HomeComponent, canActivate:[authGuard]},
  {path:'newEvent', component: NewEventComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'qrPage', component: QrReadingComponent},
  {path:'profile', component: ProfileComponent},
  {path:'qr-sacn/:id', component: QrScanComponent},
  {path:'', redirectTo:'login', pathMatch:'full'},
];
