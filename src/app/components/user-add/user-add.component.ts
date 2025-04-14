import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from '../../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-add',
  standalone: false,
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit, OnDestroy {
  user: Partial<User> = { username: '', password: '', email: '' };
  errorMessage: string = '';
  private subscriptions: Subscription = new Subscription();

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
      verticalPosition: 'bottom',
    });
    
  }
  ngOnInit() {
    this.subscriptions.add(
      this.authService.isLoggedIn.subscribe((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onAdd() {
    // Check if the username is empty
    if (!this.user.username) {
      this.errorMessage = 'Username cannot be empty!';
      return;
    }
  
    // Check if the username already exists
    this.userService.getUsers().subscribe({
      next: (users) => {
        if (users.some(u => u.username === this.user.username)) {
          this.errorMessage = 'Username already exists, please choose another one!';
          return;
        }
  
        // If no error, proceed to add the user
        this.userService.addUser(this.user as User).subscribe({
          next: () => {
            this.showMessage("Add successfully!")
            this.router.navigate(['/users']);
          },
          error: (err) => {
            console.error('Add user error:', err);
            this.errorMessage = 'Failed to add user, please try again.';
          }
        });
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.errorMessage = 'An error occurred, please try again.';
      }
    });
  }
  
  goBack() {
    this.router.navigate(['/users']);
  }
}