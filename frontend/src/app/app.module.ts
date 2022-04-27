import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PlantsGroupComponent } from './Components/plants-group/plants-group.component';
import { PlantSelectedComponent } from './Components/plant-selected/plant-selected.component';
import { DatePipe } from '@angular/common';
import { GeneralComponent } from './Components/general/general.component';
import { ProfileComponent } from './Components/profile/profile.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PlantsGroupComponent,
    PlantSelectedComponent,
    GeneralComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
