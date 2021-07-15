import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormReactiveComponent } from './components/form-reactive/form-reactive.component';

import { MaterialModule } from './modules/material/material.module';

import { HttpService } from './services/http.service';
import { ExcelService } from './services/excel.service';
import { Html5Component } from './components/html5/html5.component';
import { DialogOpenTwoComponent } from './components/form-reactive/dialog-open/dialog-open-two.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { PersonasComponent } from './components/personas/personas.component';
import { EditarComponent } from './components/personas/editar/editar.component';
import { AgregarComponent } from './components/personas/agregar/agregar.component';
import { EliminarComponent } from './components/personas/eliminar/eliminar.component';

import { RecaptchaModule } from "ng-recaptcha";
import { RegistrarComponent } from './components/registrar/registrar.component';
import { RestaurarComponent } from './components/login/restaurar/restaurar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    DashboardComponent,
    TestComponentComponent,
    FormReactiveComponent,
    Html5Component,
    DialogOpenTwoComponent,
    LoginComponent,
    ErrorComponent,
    PersonasComponent,
    EditarComponent,
    AgregarComponent,
    EliminarComponent,
    RegistrarComponent,
    RestaurarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    RecaptchaModule
  ],
  providers: [HttpService, ExcelService, LoginComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
