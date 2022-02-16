import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public loginForm !: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private auth: AuthentificationService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user') != null) {
      this.router.navigateByUrl('/dashboard')
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  submit() {
    this.auth.signin(this.loginForm)
  }
}