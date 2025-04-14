import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from '../../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  user: User | null = null;
  loading: boolean = true;
  error: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
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
          return;
        }

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.userService.getUserById(id).subscribe({
            next: (user) => {
              this.user = user;
              this.loading = false;
            },
            error: (err) => {
              this.error = 'Error to view user information.';
              this.loading = false;
            }
          });
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onUpdate() {
    if (!this.user) {
      this.error = 'No user information available for update.';
      return;
    }
  
    // Check if the username is empty
    if (!this.user.username) {
      this.error = 'Username cannot be empty!';
      return;
    }
  
    // Check if the username already exists (excluding the current user)
    this.userService.getUsers().subscribe({
      next: (users) => {
        const otherUsers = users.filter(u => u.id !== this.user!.id); // Exclude current user
        if (otherUsers.some(u => u.username === this.user!.username)) {
          this.error = 'Username already exists, please choose another one!';
          return;
        }
  
        // If no error, proceed to update
        this.userService.updateUser(this.user!).subscribe({
          next: () => {
            this.showMessage("Update successfully!")
            this.router.navigate(['/users']);
          },
          error: (err) => {
            console.error('Update user error:', err);
            this.error = 'Update failed, please try again.';
          }
        });
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.error = 'An error occurred, please try again.';
      }
    });
  }
  
  goBack() {
    this.router.navigate(['/users']);
  }
}