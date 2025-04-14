import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
  showMessage(message:string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'right', 
      verticalPosition: 'bottom'
    });
    
  }
  onLogin() {
    this.userService.login(this.username, this.password).subscribe({
      next: (users) => {
        if (users.length > 0) {
          this.authService.login(users[0]); 
          this.showMessage("Login Successfully");
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Username or password incorrect!';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Have some errors , please try again.';
      }
    });
  }

  navigateToRegister(event: Event) {
    event.preventDefault(); 
    this.router.navigate(['/register']);
  }navigateToForgotPassword(event: Event) {
    event.preventDefault();
    this.router.navigate(['/forgot-password']);
  }
}