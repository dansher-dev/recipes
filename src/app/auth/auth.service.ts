import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

function RequestData(email: string, password: string, returnSecureToken: boolean): void {
  this.email = email;
  this.password = password;
  this.returnSecureToken = returnSecureToken;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDah95pau2q5x4wrk97pTG27znCGZGDzdM',
      new RequestData(email, password, true)
    ).pipe(catchError(this.handleErr), tap(respData => {
      this.HandleAuth(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
    }));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      authToken: string;
      authTokenExpDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
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

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDah95pau2q5x4wrk97pTG27znCGZGDzdM',
      new RequestData(email, password, true)
    ).pipe(catchError(this.handleErr), tap(respData => {
      this.HandleAuth(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
    }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoLogout(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }

  private HandleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleErr(errorRes: HttpErrorResponse) {
    let error = 'An unexpected error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(error);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        error = 'Email already used';
        break;
      case 'OPERATION_NOT_ALLOWED':
        error = 'Sign up is disabled';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        error = 'We have blocked all requests from this device due to unusual activity. ' +
          'Try again laterWe have blocked all requests from this device due to unusual activity. ' +
          'Try again later';
        break;
      case 'EMAIL_NOT_FOUND':
        error = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        error = 'The password is invalid or the user does not have a password';
        break;
      case 'USER_DISABLED':
        error = 'The user account has been disabled by an administratorThe user account has been disabled by an administrator';
        break;
    }
    return  throwError(error);
  }
}
