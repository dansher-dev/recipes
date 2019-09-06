import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.models';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email: string = form.value.email;
    const password: string = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = !this.isLoading;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(respData => {
      this.isLoading = !this.isLoading;
      this.error = null;
      this.router.navigate(['/recipes']);
    }, errorMess => {
      this.error = errorMess;
      this.isLoading = !this.isLoading;
    });
    form.reset();
  }

  public onHandleError(): void {
    this.error = null;
  }

}
