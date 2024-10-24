import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    let userStorage: any = document.defaultView?.localStorage?.getItem('user');
    this.userSubject = new BehaviorSubject<any>(userStorage);
    this.user = this.userSubject.asObservable();
  }

  // @ts-ignore
  public get userValue(): any {
    const userJson = this.document.defaultView?.localStorage?.getItem('user');
    let value = {};
    try {
      value = JSON.parse(userJson || '{}');
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
    return value;
    return JSON.parse(
      this.document.defaultView?.localStorage?.getItem('user') ?? ''
    );
  }

  login(username: string, password: string): any {
    if (username === 'admin' && password === 'admin') {
      this.userSubject.next({
        username: username,
        password: password,
      });
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: username,
          password: password,
        })
      );
      this.userSubject.next({
        username: username,
        token: '123456789',
      });
      return {
        username: username,
        token: '123456789',
      };
    } else {
      return false;
    }
  }
  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
