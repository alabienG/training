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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastContainerModule, ToastrModule} from 'ngx-toastr';
import {OffreComponent} from './components/admin/offre/offre.component';
import {OffreService} from './services/offre.service';
import {ModuleComponent} from './components/admin/module/module.component';
import {ModuleService} from './services/module.service';
import {CoursComponent} from './components/admin/cours/cours.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {CourService} from './services/cour.service';
import {RegisterComponent} from './components/auth/register/register.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {DetailCoursComponent} from './components/pages/detail-cours/detail-cours.component';
import { CardService } from './services/card.service';
import { AbonnementService } from './services/abonnement.service';
import { ClientService } from './services/client.service';

import { InjectionToken, FactoryProvider } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('window');

const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: () => window
};

export const WINDOW_PROVIDERS = [
    windowProvider
]

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'adminLogin', component: AdminLoginComponent},

  // {path: '', component: HomeComponent},
  {
    path: 'adminAccueil', component: AccueilComponent, children: [
      {path: 'client', component: ClientComponent},
      {path: 'offre', component: OffreComponent},
      {path: 'module', component: ModuleComponent},
      {path: 'cours', component: CoursComponent},
    ]
  },

  {
    path: '', component: HomeComponent, children: [
      {path: '', component: InitalComponent},
      {path: 'buy/:idOffre', component: BuyComponent},
      {path: 'offers', component: OffersComponent},
      {path: 'offers/:etat', component: OffersComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'modules', component: ModuleVideoComponent},
      {path: 'detailsModule/:id', component: DetailsModuleComponent},
      {path: 'detailCours/:id', component: DetailCoursComponent}
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
    OffreComponent,
    ModuleComponent,
    CoursComponent,
    RegisterComponent,
    DetailCoursComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,

    }),
    ToastContainerModule,
    RouterModule.forRoot(routes, {useHash: true}),
    NgbModule,
    NgxPaginationModule,
    AngularFileUploaderModule
  ],
  providers: [WINDOW_PROVIDERS, LoginService, OffreService, ModuleService, CourService, CardService, AbonnementService, ClientService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
