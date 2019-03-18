import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { TranslateService, ConfigModule, ConfigService } from './_services';

import { TranslatePipe } from './_pipes';

import { HomeComponent } from './_components/home';
import { AdminComponent } from './_components/admin';
import { LoginComponent } from './_components/login';
import { LanguagesComponent } from './_components/languages';
import { RegisterComponent } from './_components/register';

export function setupTranslateFactory(
    service: TranslateService): Function {
    return () => service.use('ru');
}

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        LoginComponent,
        TranslatePipe,
        LanguagesComponent,
        RegisterComponent],
    providers: [
        ConfigService,
        ConfigModule.init(),
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: APP_INITIALIZER, useFactory: setupTranslateFactory, deps: [TranslateService], multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }