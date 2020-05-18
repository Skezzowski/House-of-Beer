import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BeersComponent } from './beers/beers.component';
import { BeerDetailsComponent } from './beers/beer-details/beer-details.component';
import { BreweriesComponent } from './breweries/breweries.component';
import { BreweryDetailsComponent } from './breweries/brewery-details/brewery-details.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { BrewsComponent } from './brews/brews.component';
import { ActiveBrewComponent } from './active-brew/active-brew.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{
		path: 'beers', component: BeersComponent, children: [
			{ path: ':beerId', component: BeerDetailsComponent }]
	},
	{
		path: 'breweries', component: BreweriesComponent, children: [
			{ path: ':breweryId', component: BreweryDetailsComponent }]
	},
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
	{ path: 'brews', component: BrewsComponent, canActivate: [AuthGuardService] },
	{
		path: 'brew', component: ActiveBrewComponent, canActivate: [AuthGuardService]
	},
	{ path: 'unauthorized', component: UnauthorizedComponent },
	{ path: '**', component: ErrorComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
