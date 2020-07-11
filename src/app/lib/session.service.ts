import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UxService } from './ux.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  authBtnLabel = 'Sign In';
  authBtnFn = this.promptSignIn;

  private _isSignedIn$ = new BehaviorSubject(false);
  isSignedIn$ = this._isSignedIn$.asObservable();
  private _user$ = new BehaviorSubject(null);
  user$ = this._user$.asObservable();

  ready = (async () => {
    await this.ux.ready;
    const authedUser = await this.getAuthedUser();
    if (authedUser && 'userId' in authedUser && authedUser.userId && typeof authedUser.userId === 'string') {
      // this._user$.next(await this.api.getUser(authedUser.userId));
      this.authBtnLabel = 'Sign Out';
      this.authBtnFn = this.signOut;
    } else {
      // this._user$.next(await this.api.getGuestUser());
      this.authBtnLabel = 'Sign In';
      this.authBtnFn = this.promptSignIn;
    }
  })();

  constructor(
    private ux: UxService
  ) { }

  async promptSignIn() {
    // IMPLEMENT
  }

  async signOut() {
    // IMPLEMENT
  }

  private async getAuthedUser() {
    // IMPLEMENT
    this._isSignedIn$.next(true);
    return {
      userId: '0',
      username: 'email@domain.com'
    };
  }
}
