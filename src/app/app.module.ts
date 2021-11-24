import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/pages/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BuyComponent} from './components/pages/buy/buy.component';
import {OffersComponent} from './components/pages/offers/offers.component';
import {ContactComponent} from './components/pages/contact/contact.component';
import {ModuleVideoComponent} from './components/pages/module-video/module-video.component';
import {DetailsModuleComponent} from './components/pages/details-module/details-module.component';
import {LoginComponent} from './components/auth/login/login.component';
import {InitalComponent} from './components/pages/inital/inital.component';
import {LoginService} from './services/login.service';
import {AdminLoginComponent} from './components/auth/admin-login/admin-login.component';
import {AccueilComponent} from './components/admin/accueil/accueil.component';
import {ClientComponent} from './components/admin/client/client.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'adminLogin', component: AdminLoginComponent},
  {
    path: 'adminAccueil', component: AccueilComponent, children: [
      {path: 'client', component: ClientComponent},
    ]
  },
  {
    path: 'training', component: HomeComponent, children: [
      {path: '', component: InitalComponent},
      {path: 'buy', component: BuyComponent},
      {path: 'offers', component: OffersComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'modules', component: ModuleVideoComponent},
      {path: 'detailsModule/:id', component: DetailsModuleComponent},
    ]
  },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuyComponent,
    OffersComponent,
    ContactComponent,
    ModuleVideoComponent,
    DetailsModuleComponent,
    LoginComponent,
    InitalComponent,
    AdminLoginComponent,
    AccueilComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
    NgbModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
