Mô tả Dự án 


 Công nghệ
- Frontend: Angular 
- Database: json-server 
- Giao diện: CSS tùy chỉnh 

 Tính năng
- Đăng nhập và đăng xuất.
- Xem danh sách người dùng.
- Thêm, sửa, xóa người dùng.
- Thanh header cố định với các liên kết điều hướng.
- Kiểm tra dữ liệu nhập với thông báo lỗi.

Cách chạy

1. Cài đặt:
   - Cài Node.js và Angular CLI: `npm install -g @angular/cli`.
   - Cài json-server: `npm install -g json-server`.
   - Clone dự án và cài đặt: `npm install`.

2. Khởi động database:
   - File `db.json` với dữ liệu mẫu có thể chỉnh sửa :
     "{
       "users": [
         { "id": "123abc", "username": "user1", "password": "pass1", "email": "user1@example.com" }
       ]
     }"
   - Chạy: `json-server --watch db.json`.

3. Chạy ứng dụng:
   - Chạy: `ng serve`.
   - Truy cập: `http://localhost:4200`.
   - Đăng nhập với tài khoản: `user1/pass1`.