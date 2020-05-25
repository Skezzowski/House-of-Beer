import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	constructor(private router: Router, private userService: UserService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.userService.isLoggedIn()
			.pipe(
				map(loggedIn => {
					if (loggedIn)
						return true;
					else {
						this.router.navigate(['/unauthorized']);
						return false;
					}
				}
				));
	}
}
