import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.user
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.isAuth = !!user;
        if (this.isAuth) {
          this.dataStorage.fetchRecipes().subscribe();
        }
      });
  }

  public onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
