import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from '../../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
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
        } else {
          this.loadUsers();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  navigateToAdd() {
    this.router.navigate(['/user/add']);
  }

  navigateToEdit(id: string | undefined) {
    if (id !== undefined) {
      this.router.navigate([`/user/edit/${id}`]);
    }
  }
  deleteUser(id: string | undefined) {
    if (id !== undefined) {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        this.userService.deleteUser(id).subscribe(() => {
          this.showMessage("Delete successfully!")
          this.loadUsers();
        });
      }
    }
  }
  
}