import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guard/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  IsLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.IsLoggedIn = loggedIn;
    });
  }

  logout(): void {
    this.authService.logout(); 
  }
}
