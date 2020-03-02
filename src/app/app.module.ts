import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientsComponent } from './clients/clients.component';
import {ClientService} from './clients/client.service';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormComponent } from './clients/form.component';
import { FormsModule} from '@angular/forms';
import { LoginComponent } from './users/login.component';
import {AuthGuard} from './users/guards/auth.guard';
import {RoleGuard} from './users/guards/role.guard';
import {TokenInterceptor} from './users/interceptors/token.interceptor';
import {AuthInterceptor} from './users/interceptors/auth.interceptor';
import { UsersComponent } from './users/users.component';
import {UserFormComponent} from './users/form/user.form.component';


const routes: Routes = [
  {path: '', redirectTo: '/directivas', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'users/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientsComponent,
    FormComponent,
    LoginComponent,
    UsersComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    ClientService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],

     bootstrap: [AppComponent]
})
export class AppModule { }
