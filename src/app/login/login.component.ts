import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthentificationService } from '../authentification.service';
import {Router} from '@angular/router';
import { Token } from '../modelResponseUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = new User();
  constructor(private authentificationService: AuthentificationService, private route:Router) { }

  ngOnInit(): void {
    if(this.authentificationService.isUserLoggedIn() == true)
    {
      this.route.navigate(['/home'])
    }
  }

  userLogin(){
    this.authentificationService.login(this.user).subscribe((data) =>{
      this.user.token = data.response
        this.authentificationService.saveToLocalStorage(this.user)
        this.route.navigate(['/home']);

    }, error =>{
      console.error(error);
      alert("sorry please enter correct mail and password");
    })
  }

}
