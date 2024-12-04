import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BuildingComponent } from './building/building.component';
import { PartsComponent } from './parts/parts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrebuiltComponent } from './prebuilt/prebuilt.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddPrebuildComponent } from './add-prebuild/add-prebuild.component';
import { PaymentComponent } from './payment/payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddpartComponent } from './addpart/addpart.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'build', component: BuildingComponent },
  { path: 'parts', component: PartsComponent },
  { path: 'prebuilt', component: PrebuiltComponent },
  { path: 'addpc', component: AddPrebuildComponent },
  { path: 'addpart', component: AddpartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
