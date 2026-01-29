# 📝 Todo API (Express + PostgreSQL + Prisma)

A **production-ready backend API** for a Todo application built with **Express.js**, **PostgreSQL**, and **Prisma ORM**.
It includes **authentication**, **JWT-based cookie auth**, **protected routes**, and **Swagger API documentation**.

This project follows a **clean architecture** with clear separation of concerns:

* Routes → Controllers → Services → Repositories → Database

---

## 🚀 Tech Stack

* **Node.js + Express** – Backend framework
* **PostgreSQL** – Relational database
* **Prisma ORM** – Type-safe database access
* **JWT (Cookies)** – Authentication
* **Swagger (OpenAPI)** – API documentation
* **bcryptjs** – Password hashing

---

## ✨ Features

* User authentication (Signup & Login)
* Secure JWT authentication using **httpOnly cookies**
* Protected Todo APIs
* User-specific Todos (ownership enforced)
* PostgreSQL with proper relations & indexes
* Swagger UI available at `/api-docs`
* Clean, scalable project structure

---

## 📁 Project Structure (Simplified)

```
├── config/
│   ├── config.js
│   ├── prisma.js
│   └── swagger.js
├── controllers/
├── middlewares/
├── repositories/
├── services/
├── routes/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── utils/
├── validations/
├── app.js / server.js
├── package.json
└── README.md
```

---

## 🧑‍💻 Getting Started (Fresh Clone)

Follow these steps **exactly** to run the project locally.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/rohann-xd/todo-express-postgres.git>
cd todo-express-postgres
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup JWT keys (IMPORTANT)

This project uses **RSA public/private keys** for JWT signing and verification.

A detailed guide is available in the root file:

```
KEYS_SETUP
```

Run the following commands from the **project root**:

```bash
openssl genrsa -out keys/private.key 2048
openssl rsa -in keys/private.key -pubout -out keys/public.key
chmod 600 keys/private.key
chmod 644 keys/public.key
```

📌 This will create:

* `keys/private.key` (used for signing JWTs)
* `keys/public.key` (used for verifying JWTs)

⚠️ These keys are **required** for authentication to work.

---

### 4️⃣ Setup environment variables

Create a `.env` file in the root directory (or copy from `.env.example`).

Example:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/todo_app
NODE_ENV=development

JWT_PRIVATE_KEY_PATH=keys/private.key
JWT_PUBLIC_KEY_PATH=keys/public.key
```

Make sure PostgreSQL is running and the database exists.

---

### 5️⃣ Setup database with Prisma

Run the following commands:

```bash
npx prisma migrate dev
npx prisma generate
```

This will:

* Create required tables
* Apply migrations
* Generate Prisma Client

---

### 6️⃣ Start the server

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup environment variables

Create a `.env` file in the root directory (or copy from `.env.example`).

Example:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/todo_app
NODE_ENV=development
```

Make sure PostgreSQL is running and the database exists.

---

### 4️⃣ Setup database with Prisma

Run the following commands:

```bash
npx prisma migrate dev
npx prisma generate
```

This will:

* Create required tables
* Apply migrations
* Generate Prisma Client

---

### 5️⃣ Start the server

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 📚 API Documentation (Swagger)

Swagger UI is available at:

```
http://localhost:5000/api-docs
```

From Swagger you can:

* View all available APIs
* See request/response formats
* Test APIs interactively

⚠️ For protected routes, first call **Login**, then try Todo APIs.

---

## 🔐 Authentication Flow

* Login sets **JWT tokens in httpOnly cookies**
* Cookies are automatically sent on subsequent requests
* Protected routes require authentication middleware

No need to manually attach Authorization headers when using cookies.

---

## 📝 Todo APIs (Overview)

* `POST /todos` – Create a todo
* `GET /todos` – Get all todos for logged-in user
* `PUT /todos/:id` – Update a todo
* `DELETE /todos/:id` – Delete a todo

Each todo belongs to a specific user.

---

## 🛡️ Security Highlights

* Passwords are hashed using bcrypt
* JWT stored in httpOnly cookies
* Ownership checks at database level
* Clean separation of auth & business logic

---

## 🧠 Notes

* Swagger docs are **static** and visible on fresh clone
* Prisma requires running `migrate` + `generate` after schema changes
* This project is structured for easy scalability

---

## 📌 License

MIT License

---

If you have questions or want to extend this project (roles, CSRF, pagination, etc.), feel free to build on top of this foundation 🚀
