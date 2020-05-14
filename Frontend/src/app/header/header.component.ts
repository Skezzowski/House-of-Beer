import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private userService: UserService, private router: Router) { }

  logout(){
    if(this.userService.logout()){
      this.router.navigate(['/']);
    };
  }

  isLoggedIn(){
    return this.userService.isLoggedIn();
  }

}
