import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkInitialLoginState());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private checkInitialLoginState(): boolean {
    return localStorage.getItem('LoggedIn') === 'true';
  }

  login(): void {
    localStorage.setItem('LoggedIn', 'true');
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('User');
    localStorage.setItem('LoggedIn', 'false');
    this.isLoggedInSubject.next(false);
  }
}
