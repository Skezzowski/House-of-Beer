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
		BreweryItemComponent
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
