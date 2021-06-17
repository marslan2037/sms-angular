import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/local-pages/login/login.component';
import { SignupComponent } from './components/local-pages/signup/signup.component';

import { ApiService } from './services/api-service';
import { AuthService } from './services/auth-service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxSpinnerModule,
        ToastrModule.forRoot()
    ],
    providers: [ApiService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
