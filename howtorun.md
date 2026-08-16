# How to Run - D Anmol Enterprises Portal

This guide provides step-by-step instructions to set up, configure, and run the **D Anmol Enterprises** booking & transport portal on your local machine.

---

## 📋 Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v18.0.0 or higher recommended)
- **NPM** (typically comes packaged with Node.js)
- A terminal or shell environment (PowerShell, Command Prompt, or bash)

---

## 🛠️ Step 1: Install Dependencies

Open your terminal in the project root directory and run:

```bash
npm install
```

This will download and install all required node modules as defined in `package.json`.

---

## ⚙️ Step 2: Configure Environment Variables

1. In the project root, you will find a `.env.example` file.
2. Duplicate or copy this file and rename it to `.env`:
   - On **Windows (PowerShell)**:
     ```powershell
     copy .env.example .env
     ```
   - On **macOS/Linux or Git Bash**:
     ```bash
     cp .env.example .env
     ```

3. Open `.env` in your text editor. By default, it is configured to use a local **SQLite** database, which is ready for development without any external server configuration:
   ```env
   # SQLite database connection URL
   DATABASE_URL="file:./dev.db"

   # NextAuth session encryption secret
   NEXTAUTH_SECRET="danmol_enterprises_nextauth_secret_key_123"

   # Custom session cookie password
   ADMIN_SECRET="danmol_admin_secret_key_pass_2026"
   ```

*(Optional)* You can customize these secrets or replace the SQLite `DATABASE_URL` with a PostgreSQL database URL if you intend to run in a production-like PostgreSQL environment.

---

## 🗄️ Step 3: Setup the Database & Seed Admin Data

Run the Prisma commands to prepare the database schema and seed the initial operator user credentials:

```bash
# 1. Push schema structures to the local SQLite/PostgreSQL database
npx prisma db push

# 2. Generate the static Prisma Client types
npx prisma generate

# 3. Seed default admin credentials into the database
npx prisma db seed
```

Once seeding is complete, the default administrator operator will be created.

---

## 🚀 Step 4: Run the Development Server

Start the Next.js hot-reloading development server:

```bash
npm run dev
```

The application is now running. Open your browser and navigate to:
- **Client Booking Website**: [http://localhost:3000](http://localhost:3000)
- **Admin Operator Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔐 Operator Login Credentials

Log in to the Admin Dashboard using these seeded credentials:
- **Email**: `admin@danmol.com`
- **Password**: `Admin@2026`

---

## 📦 Production Build (Optional)

To build and start the application in production mode:

```bash
# Compile and build the Next.js bundle
npm run build

# Start the built production server
npm run start
```
