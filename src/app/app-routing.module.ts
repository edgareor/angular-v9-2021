import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { FormReactiveComponent } from './components/form-reactive/form-reactive.component';
import { Html5Component } from './components/html5/html5.component';
import { GuardGuard } from './guards/guard.guard';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { PersonasComponent } from './components/personas/personas.component';

const routes: Routes = [
  {
    path: 'personas',
    component: PersonasComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'test',
    component: TestComponentComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'html5',
    component: Html5Component,
    canActivate: [GuardGuard]
  },
  {
    path: 'form',
    component: FormReactiveComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'heroes/:id',
    component: HeroDetailComponent,
    canActivate: [GuardGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
