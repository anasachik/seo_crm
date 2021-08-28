import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'app/services/auth-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedServicesService } from 'app/services/shared-services.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginUserData = {}
  loginForm: FormGroup;
  public messageErr=''
  constructor(private _auth: AuthServiceService,
              private formBuilder: FormBuilder,
              private _router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }
  get f() { return this.loginForm.controls; }
  loginUser () {
    let body =  {
      email: this.f.username.value,
      password: this.f.password.value
    }
    this._auth.loginUser(body)
    .subscribe(
      res => {
        if(res.message === "login successfully"){
          localStorage.setItem('token', res.token)
          this._router.navigate(['/admin'])
        }else{
          this.messageErr = res.message 
        }
        
      },
      err => console.log(err)
    ) 
  }
}
