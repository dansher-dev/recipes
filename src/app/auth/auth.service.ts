import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

import { AuthResponseData, RequestData, UserData, Errors } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private tokenExpTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  public signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDah95pau2q5x4wrk97pTG27znCGZGDzdM',
      new RequestData(email, password, true)
    ).pipe(catchError(this.handleErr), tap(respData => {
      this.HandleAuth(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
    }));
  }

  public autoLogin(): void {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData.authToken, new Date(userData.authTokenExpDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData.authTokenExpDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  public login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDah95pau2q5x4wrk97pTG27znCGZGDzdM',
      new RequestData(email, password, true)
    ).pipe(catchError(this.handleErr), tap(respData => {
      this.HandleAuth(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
    }));
  }

  public logout(): void {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  public autoLogout(expDuration: number): void {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }

  private HandleAuth(email: string, userId: string, token: string, expiresIn: number): void {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleErr(errorRes: HttpErrorResponse): Observable<never> {
    let error = 'An unexpected error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(error);
    }
    error = Errors[errorRes.error.error.message];
    return  throwError(error);
  }
}
