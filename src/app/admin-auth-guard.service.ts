import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    // MOVED TO AUTH.SERVICE.TS
    // return this.auth.user$.pipe(
    //   switchMap(user => this.userService.get(user.uid).valueChanges()),
    return this.auth.appUser$.pipe(
      map(appUser => appUser.isAdmin)
    );
  }
}
