import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  constructor(private authentificationService: AuthentificationService, private route:Router) { }

  ngOnInit(): void {
  }

  usersignUp(){
    this.authentificationService.signUp(this.user.userName,this.user.password).subscribe(
      (data)=> {
        this.route.navigate(["/login"])
      },
      (error) => {
        alert("RETRY LATER!")
      }
    );

  }

}
