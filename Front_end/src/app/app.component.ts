import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
// import { marker as TRANSLATE_ME } from "@biesbjerg/ngx-translate-extract-marker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // constructor(
  //   public translate: TranslateService,
  // ) {
  //   translate.addLangs(['en', 'fr'])
  //   translate.setDefaultLang('en')
  //   const browserLang = translate.getBrowserLang();
  //   translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  // }
  // constructor(
  //   public translate: TranslateService
  // ) {
  //   translate.addLangs(['en', 'fr']);
  //   translate.setDefaultLang('fr');
  // }
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
  // constructor(private translate: TranslateService) {
  //   translate.setDefaultLang('en');
  // }
  // ngOnInit(): void {
    // this.translate.addLangs(['en', 'fr'])
    // this.translate.setDefaultLang('en')
    // const browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  // }
  // constructor(
  //   translate: TranslateService,
  // ) {
  //   translate.setDefaultLang('en');
  //   translate.use('fr');
  // }
  
}
