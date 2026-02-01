# 📝 Todo API (Express + PostgreSQL + Prisma)

A **production-ready backend API** for a Todo application built with **Express.js**, **PostgreSQL**, and **Prisma ORM**.

It includes **authentication**, **JWT-based cookie auth**, **protected routes**, and **Swagger API documentation**.

This project follows a **clean architecture** with clear separation of concerns:

**Routes → Controllers → Services → Repositories → Database**

---

## 🚀 Tech Stack

- **Node.js + Express** – Backend framework
- **PostgreSQL** – Relational database
- **Prisma ORM** – Type-safe database access
- **JWT (Cookies)** – Authentication
- **Swagger (OpenAPI)** – API documentation
- **bcryptjs** – Password hashing
- **Docker & Docker Compose** – Containerization

---

## ✨ Features

- User authentication (Signup & Login)
- Secure JWT authentication using **httpOnly cookies**
- Protected Todo APIs
- User-specific Todos (ownership enforced)
- PostgreSQL with proper relations & indexes
- Swagger UI available at `/api-docs`
- Clean, scalable project structure
- Docker support for easy local setup

---

## 📁 Project Structure

```
├── config/
├── controllers/
├── middlewares/
├── repositories/
├── services/
├── routes/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── keys/                 # JWT keys (auto-generated, gitignored)
├── scripts/
│   └── setup-keys.js     # One-command JWT key generator
├── utils/
├── validations/
├── server.js
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🐳 Quick Start with Docker (Recommended)

### Prerequisites

- Docker & Docker Compose
- Git

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/rohann-xd/todo-express-postgres.git
cd todo-express-postgres
```

---

### 2️⃣ Generate JWT keys

This project supports **two ways** to generate JWT RSA keys.

#### ✅ Recommended (No OpenSSL required)

JWT keys can be generated using **Node.js crypto** with a single command:

```bash
npm install
npm run setup-keys
```

This will generate:

```
keys/private.key
keys/public.key
keys/private_env.txt
keys/public_env.txt
```

#### 🔁 Alternative: Using OpenSSL

If you prefer OpenSSL (or already have it installed), you can generate keys manually.

```bash
mkdir -p keys
openssl genrsa -out keys/private.key 2048
openssl rsa -in keys/private.key -pubout -out keys/public.key
```

For Windows (PowerShell):

```powershell
mkdir keys -Force
openssl genrsa -out keys/private.key 2048
openssl rsa -in keys/private.key -pubout -out keys/public.key
```

Then convert the keys for ENV usage:

```bash
node scripts/setup-keys.js
```

📌 For detailed OpenSSL instructions, see **`KEYS_SETUP.md`**.

⚠️ All files inside `keys/` are **gitignored**. Never commit them.

---

### 3️⃣ Setup environment variables

Copy the example file:

```bash
cp .env.example .env
```

**For Windows (PowerShell):**

```powershell
copy .env.example .env
```

Now open `.env` and **paste the key values**:

```env
JWT_PRIVATE_KEY=<contents of keys/private_env.txt>
JWT_PUBLIC_KEY=<contents of keys/public_env.txt>
```

📌 **Important:**
JWT keys are now provided as **environment variable values**,
**not file paths**.

---

### 4️⃣ Start with Docker Compose

```bash
docker-compose up --build
```

This will:

- Start PostgreSQL 16
- Start the API server
- Expose the app on port `5000`

---

### 5️⃣ Access the application

- **API Server:** [http://localhost:5000](http://localhost:5000)
- **Swagger Docs:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- **PostgreSQL:** localhost:5432

---

## 🧑‍💻 Local Development (Without Docker)

### 1️⃣ Install dependencies

```bash
npm install
```

---

### 2️⃣ Generate JWT keys

```bash
npm run setup-keys
```

Paste values from `keys/*_env.txt` into `.env`.

---

### 3️⃣ Setup PostgreSQL

Create a database:

```sql
CREATE DATABASE todo_app;
```

---

### 4️⃣ Configure `.env`

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/todo_app
PORT=5000
NODE_ENV=development

JWT_PRIVATE_KEY=...
JWT_PUBLIC_KEY=...
```

---

### 5️⃣ Run migrations

```bash
npx prisma migrate deploy
npx prisma generate
```

---

### 6️⃣ Start the server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## 📚 API Documentation (Swagger)

Swagger UI is available at:

```
http://localhost:5000/api-docs
```

Use **Login** first for protected routes.

---

## 🔐 Authentication Flow

- Login sets JWTs in **httpOnly cookies**
- Cookies are sent automatically
- No Authorization headers required

---

## 📝 Todo APIs

- `POST /api/todos`
- `GET /api/todos`
- `GET /api/todos/:id`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`

---

## 🛡️ Security Highlights

- Password hashing with bcrypt
- JWT stored in httpOnly cookies
- Ownership enforced at DB level
- Input validation & sanitization
- Clean separation of concerns

---

## 🐛 Troubleshooting

### JWT errors

- Ensure keys were generated using `npm run setup-keys`
- Ensure ENV values are pasted correctly (no quotes)

### Prisma errors

- Run `npx prisma generate` after schema changes

### Docker DB issues

- Use `db` as hostname inside Docker
- Run `docker-compose down -v` for a fresh start

---

## 🧠 Notes

- JWT keys are generated locally, never committed
- Prisma migrations are manual by design
- Docker is intended for **local development**
- Project structure is designed for scalability

---

## 📌 License

MIT License

---

If you have questions or want to extend this project, feel free to build on top of it 🚀
**Star ⭐ the repo if you found it useful!**
