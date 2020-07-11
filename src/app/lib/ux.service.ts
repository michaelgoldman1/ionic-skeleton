import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UxService {

  private appName = 'Skeleton';
  isCordova = false;
  ready = (async () => {
    this.platform.ready().then(source => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.isCordova = source === 'cordova';
    });
  })();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public titleSvc: Title
  ) { }

  setTitle(page: string) {
    if (!page) {
      this.titleSvc.setTitle(this.appName);
      return;
    }
    let pageName = page.trim();
    if (!pageName) {
      this.titleSvc.setTitle(this.appName);
      return;
    }
    this.titleSvc.setTitle(pageName[0].toUpperCase() + pageName.slice(1).split('/')[0] + ' - ' + this.appName);
  }
}
