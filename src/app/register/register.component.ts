import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/UserService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router : Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], 
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  onSubmit() {
      if (this.registerForm.valid) {
        this.userService.createUser(this.registerForm.value).subscribe(
          (response)=>{
            console.log('Register success',response);
            this.router.navigate(['/login']);
          },
          (error)=>{
            console.error('Register failed', error);
          }
        )
      } else {
        console.log('Invalid Form:', this.registerForm.errors);
      }
  }
}
