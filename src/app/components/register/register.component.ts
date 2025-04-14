import { Component } from '@angular/core';
import { UserService, User } from '../../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  standalone:false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {  username: '', password: '', email: '' };
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router,private snackBar: MatSnackBar) {}
  showMessage(message:string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'right', 
      verticalPosition: 'bottom',
    });
    
  }
  onRegister() {
    this.userService.getUsers().subscribe({
      next: (users) => {

        if (users.some(u => u.username === this.user.username)) {
          this.errorMessage = 'Username already exists, please select another name.!';
          return;
        }

        this.userService.register(this.user).subscribe({
          next: () => {
            this.router.navigate(['/login']);
            this.showMessage('Register successfully.Please wait some seconds')  ;
          },
          error: (err) => {
            console.error('Register error:', err);
            this.showMessage('Register failed , please try again!')  ;
          }
        });
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.errorMessage = 'Have some errors , please try again.';
      }
    });
  }

  navigateToLogin(event: Event) {
    event.preventDefault(); 
    this.router.navigate(['/login']);
  }
}