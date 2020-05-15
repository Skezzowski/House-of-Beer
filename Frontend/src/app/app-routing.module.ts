import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BeersComponent } from './beers/beers.component';
import { BeerDetailsComponent } from './beers/beer-details/beer-details.component';
import { BreweriesComponent } from './breweries/breweries.component';
import { BreweryDetailsComponent } from './breweries/brewery-details/brewery-details.component';


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{
		path: 'beers', component: BeersComponent, children: [
			{ path: ':id', component: BeerDetailsComponent }]
	},
	{
		path: 'breweries', component: BreweriesComponent, children: [
			{ path: ':id', component: BreweryDetailsComponent }]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
