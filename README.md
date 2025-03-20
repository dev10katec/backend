# Node.js Backend Project

## 📌 Giới thiệu

Đây là một dự án Node.js Backend được xây dựng theo mô hình MVC (Model-View-Controller) kết hợp với Event-Driven Architecture. Dự án hỗ trợ RESTful API, xử lý sự kiện bất đồng bộ, xác thực người dùng bằng JWT, caching, và logging.

## 🚀 Công nghệ sử dụng

- Node.js + Express.js - Xây dựng API

- Sequelize - ORM cho cơ sở dữ liệu

- JWT (JSON Web Token) - Xác thực người dùng

- EventEmitter - Hệ thống sự kiện

- Swagger - Tài liệu API

- EJS - Template Engine cho email

- Redis (có thể mở rộng) - Cache dữ liệu

- Winston - Logging

- Docker (tuỳ chọn) - Triển khai

```JS
📦src
 ┣ 📂bootstrap       # Khởi tạo ứng dụng, cấu hình container DI
 ┃ ┗ 📜container.js  # Cấu hình Dependency Injection (DI)
 ┣ 📂commands        # Các lệnh CLI hỗ trợ tự động tạo file
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜to.pascal.case.js  # Chuyển đổi chuỗi thành PascalCase
 ┃ ┣ 📜make.controller.js   # Lệnh tạo Controller
 ┃ ┗ 📜make.mail.js         # Lệnh tạo Mail Template
 ┣ 📂config          # Cấu hình ứng dụng
 ┃ ┣ 📜cache.js      # Cấu hình Redis cache
 ┃ ┣ 📜database.js   # Cấu hình Sequelize ORM
 ┃ ┣ 📜file.system.js # Cấu hình hệ thống file
 ┃ ┣ 📜json.web.token.js  # Cấu hình JWT
 ┃ ┣ 📜lang.js       # Cấu hình đa ngôn ngữ
 ┃ ┣ 📜logging.js    # Cấu hình Winston logging
 ┃ ┣ 📜mail.js       # Cấu hình gửi mail
 ┃ ┣ 📜socket.js     # Cấu hình WebSocket (nếu có)
 ┃ ┣ 📜swagger.js    # Cấu hình tài liệu API Swagger
 ┃ ┗ 📜view.js       # Cấu hình View Engine (EJS)
 ┣ 📂constants       # Các hằng số dùng chung
 ┃ ┗ 📜http.status.code.js  # Danh sách mã HTTP status
 ┣ 📂controllers     # Xử lý logic request API
 ┃ ┣ 📜controller.js # Controller gốc
 ┃ ┗ 📜welcome.controller.js # Ví dụ controller đơn giản
 ┣ 📂database        # Quản lý cơ sở dữ liệu
 ┃ ┣ 📂migrations    # Các file migration
 ┃ ┃ ┗ 📜20250319022013-create-user.js  # Migration tạo bảng users
 ┃ ┗ 📂seeders       # Seeder cho dữ liệu mẫu
 ┃ ┃ ┗ 📜20250319022055-user-seeder.js  # Seeder tạo dữ liệu users mẫu
 ┣ 📂documents       # Tài liệu API (Swagger)
 ┃ ┗ 📜auth.yaml     # Tài liệu Swagger cho xác thực
 ┣ 📂events          # Hệ thống sự kiện
 ┃ ┗ 📜index.js      # Khởi tạo và quản lý event
 ┣ 📂exceptions      # Xử lý lỗi tập trung
 ┃ ┣ 📜auth.exception.js       # Lỗi xác thực
 ┃ ┣ 📜bad.request.exception.js # Lỗi request sai
 ┃ ┣ 📜forbidden.exception.js  # Lỗi không có quyền truy cập
 ┃ ┣ 📜http.exception.js       # Lỗi HTTP chung
 ┃ ┣ 📜not.found.exception.js  # Lỗi 404
 ┃ ┣ 📜sql.exception.js        # Lỗi SQL
 ┃ ┣ 📜system.exception.js     # Lỗi hệ thống
 ┃ ┗ 📜validation.exception.js # Lỗi validate dữ liệu
 ┣ 📂lang           # Đa ngôn ngữ
 ┃ ┣ 📜en.json      # Tiếng Anh
 ┃ ┗ 📜vi.json      # Tiếng Việt
 ┣ 📂listeners      # Lắng nghe và xử lý sự kiện
 ┃ ┣ 📜index.js              # Đăng ký tất cả listener
 ┃ ┗ 📜user.register.listener.js # Xử lý sự kiện khi người dùng đăng ký
 ┣ 📂mails          # Quản lý email template
 ┃ ┗ 📜.gitkeep
 ┣ 📂middlewares    # Các middleware xử lý request
 ┃ ┣ 📜authenticated.js  # Kiểm tra user đăng nhập
 ┃ ┣ 📜authorize.js      # Phân quyền người dùng
 ┃ ┣ 📜error.handler.js  # Middleware xử lý lỗi
 ┃ ┣ 📜lang.js           # Middleware chọn ngôn ngữ
 ┃ ┣ 📜not.found.js      # Middleware xử lý lỗi 404
 ┃ ┗ 📜validation.js     # Middleware validate request
 ┣ 📂models         # Định nghĩa Model Sequelize
 ┃ ┣ 📜index.js     # Khởi tạo models
 ┃ ┗ 📜user.js      # Model User
 ┣ 📂public         # Thư mục public để lưu trữ file tĩnh (CSS, JS, ảnh)
 ┃ ┗ 📜.gitkeep
 ┣ 📂requests       # Validate dữ liệu request (nếu có)
 ┃ ┗ 📜.gitkeep
 ┣ 📂routes         # Định nghĩa route API
 ┃ ┗ 📂v1
 ┃ ┃ ┣ 📜.prettierrc  # Cấu hình Prettier format code
 ┃ ┃ ┗ 📜index.js     # Định nghĩa route v1
 ┣ 📂services       # Lớp Service xử lý logic nghiệp vụ
 ┃ ┗ 📜service.js
 ┣ 📂storage        # Lưu trữ file tạm thời, cache, logs
 ┃ ┣ 📂cached       # Cache file
 ┃ ┃ ┗ 📜.gitkeep
 ┃ ┣ 📂logs         # Log file
 ┃ ┃ ┗ 📜.gitkeep
 ┃ ┗ 📂tmp          # File tạm
 ┃ ┃ ┗ 📜.gitkeep
 ┣ 📂utils          # Các hàm tiện ích dùng chung
 ┃ ┣ 📜hash.js      # Mã hóa mật khẩu
 ┃ ┣ 📜http.js      # Xử lý HTTP request
 ┃ ┗ 📜storage.js   # Xử lý đường dẫn file
 ┣ 📂views         # Template Engine (EJS)
 ┃ ┣ 📂mails        # Template email
 ┃ ┃ ┗ 📜.gitkeep
 ┃ ┗ 📜welcome.ejs  # Trang welcome
 ┗ 📜index.js      # File khởi động server

---
```

### Tạo controller

```BASH
npm run cli make:controller <name>
```

### Tạo mail

```BASH
npm run cli make:mail <name>
```

🤝 Đóng góp
Chúng tôi hoan nghênh mọi đóng góp từ cộng đồng! Nếu bạn muốn đóng góp vào dự án, vui lòng làm theo các bước sau:

🛠 Cách đóng góp
1️⃣ Fork repository: Nhấn vào nút Fork để tạo một bản sao của repository này vào tài khoản của bạn.

2️⃣ Clone repository: Sao chép repository về máy cục bộ của bạn:

```BASH
git clone https://github.com/your-username/project-name.git
cd project-name
```

3️⃣ Tạo nhánh mới:

```BASH
git checkout -b feature/your-feature-name
```

4️⃣ Cài đặt dependencies:

```BASH
npm install
```

5️⃣ Thực hiện thay đổi & commit:
Chỉnh sửa code, đảm bảo tuân thủ quy tắc code style.

6️⃣ Push nhánh lên GitHub:

```BASH
git push origin feature/your-feature-name
```

7️⃣ Tạo Pull Request (PR):
Truy cập repository trên GitHub và tạo PR từ nhánh của bạn.
Mô tả rõ ràng về tính năng/sửa lỗi bạn đã thực hiện.

🎯 Quy tắc đóng góp
✔ Viết code sạch, dễ hiểu, có comment khi cần thiết.
✔ Tuân thủ quy tắc đặt tên biến, hàm, class theo camelCase hoặc PascalCase.
✔ Chạy npm run lint để kiểm tra lỗi coding style trước khi commit.
✔ Đảm bảo code của bạn không phá vỡ tính năng hiện tại.
✔ Nếu thêm tính năng mới, hãy cập nhật tài liệu hướng dẫn.

💡 Mọi đóng góp của bạn đều rất đáng quý! Cảm ơn vì đã giúp dự án phát triển! 🚀
🚀 Happy Coding! 🎯
