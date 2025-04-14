import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Kiểm tra trạng thái đăng nhập
    const user = localStorage.getItem('user');
    if (user) {
      this.isLoggedIn = true;
      this.username = JSON.parse(user).username;
    } else {
      this.router.navigate(['/login']); // Chuyển hướng nếu chưa đăng nhập
    }
  }
  navigateToUsers() {
    this.router.navigate(['/users']);
  }
}