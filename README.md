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
* **Docker & Docker Compose** – Containerization

---

## ✨ Features

* User authentication (Signup & Login)
* Secure JWT authentication using **httpOnly cookies**
* Protected Todo APIs
* User-specific Todos (ownership enforced)
* PostgreSQL with proper relations & indexes
* Swagger UI available at `/api-docs`
* Clean, scalable project structure
* Docker support for easy deployment

---

## 📁 Project Structure

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
├── keys/                    # JWT RSA keys (you need to generate these)
│   ├── private.key
│   └── public.key
├── utils/
├── validations/
├── server.js
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🐳 Quick Start with Docker (Recommended)

### Prerequisites

* Docker and Docker Compose installed
* Git

### Step 1: Clone the repository

```bash
git clone https://github.com/rohann-xd/todo-express-postgres.git
cd todo-express-postgres
```

---

### Step 2: Generate JWT Keys ⚠️ REQUIRED BEFORE DOCKER

**You MUST generate RSA keys before running Docker.**

Run these commands from the **project root**:

**For Linux/Mac:**

```bash
mkdir -p keys
openssl genrsa -out keys/private.key 2048
openssl rsa -in keys/private.key -pubout -out keys/public.key
chmod 600 keys/private.key
chmod 644 keys/public.key
```

**For Windows (PowerShell):**

```powershell
mkdir keys -Force
openssl genrsa -out keys/private.key 2048
openssl rsa -in keys/private.key -pubout -out keys/public.key
```

**For Windows (Git Bash):**

```bash
mkdir -p keys
openssl genrsa -out keys/private.key 2048
openssl rsa -in keys/private.key -pubout -out keys/public.key
chmod 600 keys/private.key
chmod 644 keys/public.key
```

📌 **Why?** These keys are used for signing and verifying JWT tokens. Without them, authentication will not work.

For detailed instructions, see `KEYS_SETUP.md` in the project root.

---

### Step 3: Setup environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

**For Windows:**

```powershell
copy .env.example .env
```

**For Docker setup**, the default `.env.example` values should work out of the box. 

**Important:** Make sure your `.env` file has these values for Docker:

```env
DATABASE_URL=postgresql://postgres:admin@db:5432/todo_app
POSTGRES_URI=postgresql://postgres:admin@db:5432/todo_app
```

⚠️ **Note:** Use `db` as the hostname (Docker service name), NOT `localhost`.

---

### Step 4: Start with Docker Compose

Docker will automatically create the database for you!

```bash
docker-compose up --build
```

**Or run in detached mode (background):**

```bash
docker-compose up -d --build
```

This will:
* ✅ Start PostgreSQL 16 container
* ✅ Create the `todo_app` database automatically
* ✅ Run Prisma migrations automatically
* ✅ Start the Express API server

---

### Step 5: Access the application

* **API Server:** `http://localhost:5000`
* **Swagger Docs:** `http://localhost:5000/api-docs`
* **PostgreSQL:** `localhost:5432`

---

### Docker Management Commands

**Stop containers:**

```bash
docker-compose down
```

**Stop and remove volumes (fresh start):**

```bash
docker-compose down -v
```

**View logs:**

```bash
docker-compose logs -f
```

**View logs for specific service:**

```bash
docker-compose logs -f api
```

**Restart services:**

```bash
docker-compose restart
```

**Rebuild after code changes:**

```bash
docker-compose up --build
```

---

## 🧑‍💻 Local Development Setup (Without Docker)

Follow these steps to run the project **locally without Docker**.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/rohann-xd/todo-express-postgres.git
cd todo-express-postgres
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup PostgreSQL Database ⚠️ MANUAL STEP

**You need to create the database manually.**

Install PostgreSQL locally, then create a database:

```sql
CREATE DATABASE todo_app;
```

Or using psql:

```bash
psql -U postgres
CREATE DATABASE todo_app;
\q
```

---

### 4️⃣ Setup JWT keys (IMPORTANT)

This project uses **RSA public/private keys** for JWT signing and verification.

**For Linux/Mac:**

```bash
mkdir -p keys
openssl genrsa -out keys/private.key 2048
openssl rsa -in keys/private.key -pubout -out keys/public.key
chmod 600 keys/private.key
chmod 644 keys/public.key
```

**For Windows (PowerShell):**

```powershell
mkdir keys -Force
openssl genrsa -out keys/private.key 2048
openssl rsa -in keys/private.key -pubout -out keys/public.key
```

📌 This will create:

* `keys/private.key` (used for signing JWTs)
* `keys/public.key` (used for verifying JWTs)

⚠️ These keys are **required** for authentication to work.

---

### 5️⃣ Setup environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

**For Windows:**

```powershell
copy .env.example .env
```

**For local setup**, update your `.env` file with `localhost`:

```env
DATABASE_URL=postgresql://postgres:admin@localhost:5432/todo_app
POSTGRES_URI=postgresql://postgres:admin@localhost:5432/todo_app
PORT=5000
NODE_ENV=development
JWT_PRIVATE_KEY_PATH=./keys/private.key
JWT_PUBLIC_KEY_PATH=./keys/public.key
```

⚠️ **Note:** Use `localhost` as the hostname for local setup, NOT `db`.

Make sure PostgreSQL is running and the database exists.

---

### 6️⃣ Setup database with Prisma

Run the following commands:

```bash
npx prisma migrate deploy
npx prisma generate
```

This will:

* Create required tables
* Apply migrations
* Generate Prisma Client

---

### 7️⃣ Start the server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
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

* `POST /api/todos` – Create a todo
* `GET /api/todos` – Get all todos for logged-in user
* `GET /api/todos/:id` – Get a specific todo
* `PUT /api/todos/:id` – Update a todo
* `DELETE /api/todos/:id` – Delete a todo

Each todo belongs to a specific user.

---

## 🔑 Authentication APIs

* `POST /api/auth/signup` – Register a new user
* `POST /api/auth/login` – Login and receive JWT cookies
* `POST /api/auth/logout` – Logout and clear cookies
* `POST /api/auth/refresh` – Refresh access token

---

## 🛡️ Security Highlights

* Passwords are hashed using bcrypt
* JWT stored in httpOnly cookies (XSS protection)
* Ownership checks at database level
* Clean separation of auth & business logic
* Input validation and sanitization
* Protected routes with authentication middleware

---

## 🐛 Troubleshooting

### Docker Issues

**Problem: PostgreSQL connection failed**
- Solution: Make sure `.env` uses `db` as hostname, not `localhost`

**Problem: "Cannot find module '/app/app.js'"**
- Solution: Check that `package.json` start script points to `server.js`

**Problem: Database volume conflicts**
- Solution: Run `docker-compose down -v` to remove old volumes

### Local Setup Issues

**Problem: Database connection refused**
- Solution: Make sure PostgreSQL is running locally
- Solution: Check that `.env` uses `localhost` as hostname

**Problem: JWT authentication not working**
- Solution: Make sure you generated the RSA keys in `keys/` folder
- Solution: Check that key paths in `.env` are correct

**Problem: Prisma Client errors**
- Solution: Run `npx prisma generate` after any schema changes

---

## 🧠 Notes

* Swagger docs are **static** and visible on fresh clone
* Prisma requires running `migrate` + `generate` after schema changes
* This project is structured for easy scalability
* Docker automatically handles database creation and migrations
* For local setup, you must create the database manually

---

## 📌 License

MIT License


---

If you have questions or want to extend this project, feel free to build on top of this foundation 🚀

**Star ⭐ this repo if you found it helpful!**