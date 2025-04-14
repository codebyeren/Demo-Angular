import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<string>('');

  constructor() {
    // Kiểm tra trạng thái ban đầu
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedIn.next(true);
      this.currentUser.next(JSON.parse(user).username);
    }
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get currentUsername(): Observable<string> {
    return this.currentUser.asObservable();
  }

  login(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn.next(true);
    this.currentUser.next(user.username);
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.currentUser.next('');
  }
}