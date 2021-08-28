import { Component, OnInit, ElementRef } from '@angular/core';
// import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { SharedServicesService } from 'app/services/shared-services.service';
import { AuthServiceService } from 'app/services/auth-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    public notificationKeywordTask = new Array<string>();
    public notificationWebsiteTask = new Array<string>();

    public allNotification = new Array<string>();

    // constructor(
    //     location: Location,
    //     private _auth: AuthServiceService,
    //     private sharedServices: SharedServicesService,
    //     private element: ElementRef,
    //     private router: Router) {
    //     this.location = location;
    //     this.sidebarVisible = false;
    // }
    public localeEvent ;
    constructor(
        location: Location,
        private _auth: AuthServiceService,
        private sharedServices: SharedServicesService,
        private element: ElementRef,
        private router: Router,
        public translate: TranslateService) {
        translate.addLangs(['en', 'fr']);
        translate.setDefaultLang('en');
    
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        this.localeEvent = translate.getBrowserLang()
        this.location = location;
        this.sidebarVisible = false;
      }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        //   this.getNotificationKeyTask()
        //   this.getNotificationWebsiteTask()
        this.sharedServices.getallNotification()
        this.sharedServices.notification_load.subscribe(
            notification => {
                if (!notification.Checked) {
                    this.add(this.allNotification, notification.Name_Task);
                }else{
                    this.remove(this.allNotification, notification.Name_Task);
                }
                // console.log(this.allNotification)
            }
        )
    }
    changeLocale(locale: string){
        this.translate.use(locale);
        this.localeEvent = locale ;
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    add(arr: Array<string>, notif) {
        const found = arr.some(el => el === notif);
        if (!found && notif) {
            arr.push(notif);
        } 
    }
    remove(arr: Array<string>, notif) {
        const found = arr.some(el => el === notif);
        if (found && notif) {
            arr.splice(arr.indexOf(notif), 1)
        }
    }
    loggedIn(){
        return !!this._auth.loggedIn()
    }
    logoutUser()
    {
        this._auth.logoutUser()
    }
}
