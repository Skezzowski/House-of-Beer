import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BeersComponent } from './beers/beers.component';
import { BeerDetailsComponent } from './beers/beer-details/beer-details.component';
import { BeerItemComponent } from './beers/beer-item/beer-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    BeersComponent,
    BeerDetailsComponent,
    BeerItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
