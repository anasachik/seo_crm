import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

constructor(private http: HttpClient,
    private _router: Router) { }

public loginUrl = 'http://localhost:3000/api/login';

loginUser(user) {
return this.http.post<any>(this.loginUrl, user)
}

logoutUser() {
localStorage.removeItem('token')
this._router.navigate(['/login'])
}

getToken() {
return localStorage.getItem('token')
}

loggedIn() {
return !!localStorage.getItem('token')    
}
}
