import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Alles';
  public isLogin = true;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private route: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.route.events.subscribe(event => {

      if (event instanceof NavigationEnd ) {
        this.isLogin = event.url === '/login' || event.url === '/'? true : false;
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
