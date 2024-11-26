import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/UserService/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router : Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.userService.Login(email, password).subscribe(
        (response) => {
          // console.log(response.length);
          if (response.length > 0) {
            const user = response[0]; 
            console.log('Login successful:', user);
            localStorage.setItem('User', JSON.stringify({ email: 'test@example.com' }));
            this.authService.login(); 
            this.router.navigate(['/home']);
        
          } else {
            console.error('Invalid credentials');
            alert('Invalid email or password.');
          }
        },
        (error) => {
          console.error('Login failed:', error);
          alert('An error occurred during login.');
        }
      );
    } else {
      console.log('Invalid Form:', this.loginForm.errors);
      alert('Please fill out the form correctly.');
    }
  }
  
}
