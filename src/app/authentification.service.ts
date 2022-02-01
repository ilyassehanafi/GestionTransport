import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import {Token} from './modelResponseUser';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private baseUrl = "http://localhost:8093/authenticate";
  constructor(private httpClient:HttpClient) { }

  saveToLocalStorage(user : User) {
      localStorage.setItem("username", user.userName)
      localStorage.setItem("jwt", user.token)
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    localStorage.removeItem('username')
  }
  login(user: User):Observable<Token>{
    const userRequest = {
      "userName":user.userName,
      "password":user.password
    }
    const headers = { 'Content-Type': 'application/json',
                      'responseType': 'text'};
    return this.httpClient.post<Token>('http://127.0.0.1:8093/authenticate', userRequest,{headers});
  }
}
