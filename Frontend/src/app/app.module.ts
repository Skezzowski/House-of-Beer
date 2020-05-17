import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BeersComponent } from './beers/beers.component';
import { BeerDetailsComponent } from './beers/beer-details/beer-details.component';
import { BeerItemComponent } from './beers/beer-item/beer-item.component';
import { BreweriesComponent } from './breweries/breweries.component';
import { BreweryDetailsComponent } from './breweries/brewery-details/brewery-details.component';
import { BreweryItemComponent } from './breweries/brewery-item/brewery-item.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { BrewsComponent } from './brews/brews.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		LoginComponent,
		RegisterComponent,
		BeersComponent,
		BeerDetailsComponent,
		BeerItemComponent,
		BreweriesComponent,
		BreweryDetailsComponent,
		BreweryItemComponent,
		ErrorComponent,
		HomeComponent,
		ProfileComponent,
		UnauthorizedComponent,
		BrewsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
