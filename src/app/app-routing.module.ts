import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/local-pages/login/login.component';
import { SignupComponent } from './components/local-pages/signup/signup.component';

import { AuthService } from './services/auth-service';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'add-user', component: SignupComponent },
    { path: 'home', loadChildren: () => import('./components/auth/pages/home/home.module').then(m => m.HomeModule), canActivate: [AuthService] },
    { path: '**', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
