# MERN Notes App - Development Plan

## Overview
This is a full-stack **MERN (MongoDB, Express, React, Node.js) Notes Application** that I have planned to develop in three days, ensuring an efficient workflow with steady progress. This document outlines the complete plan and implementation details.

---

## Project Structure
```
MERN-Notes-App/
│── backend/       # Node.js & Express backend
│   ├── controllers/    # Business logic (Authentication & Notes)
│   │   ├── authController.js
│   │   ├── noteController.js
│   ├── models/         # Database models (Schemas)
│   │   ├── User.js
│   │   ├── Note.js
│   ├── routes/         # API endpoints
│   │   ├── authRoutes.js
│   │   ├── noteRoutes.js
│   ├── middleware/     # JWT authentication middleware
│   │   ├── authMiddleware.js
│   ├── config/         # Configuration files (Database connection)
│   │   ├── db.js
│   ├── .env            # Environment variables
│   ├── server.js       # Main Express server
│   ├── package.json    # Backend dependencies
│
│── frontend/      # React frontend with Tailwind CSS
│   ├── src/
│   │   ├── components/
        |__
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json    # Frontend dependencies
│
│── .gitignore
│── README.md
```

---

# Development Plan (Day-wise Breakdown)

## Day 1: Backend Authentication & Frontend Setup (Branch: `day-1`)

### ✅ Backend Tasks
1. Initialize backend project
   ```sh
   mkdir backend && cd backend
   npm init -y
   ```
2. Install required dependencies
   ```sh
   npm install express mongoose dotenv cors bcryptjs jsonwebtoken helmet morgan nodemon
   ```
3. Set up `.env` file for environment variables
4. Create folder structure: `models/`, `routes/`, `controllers/`, `middleware/`, `config/`
5. Implement **MongoDB connection** in `config/db.js`
6. Define **User model (`models/User.js`)** with password hashing
7. Create **Authentication routes (`routes/authRoutes.js`)**
8. Implement **Auth controller (`controllers/authController.js`)** for user registration and login
9. Set up **Express server (`server.js`)** with CORS enabled
10. Run the backend server
    ```sh
    npm run dev
    ```

### ✅ Frontend Tasks
1. Create a **React app**
   ```sh
   npx create-react-app frontend
   cd frontend
   ```
2. Install dependencies
   ```sh
   npm install bootstrap
   ```
3. Configure **Bootstrap CSS**
4. Set up **folder structure**: `components/`, `pages/`, `context/`, `utils/`
5. Implement basic **React Router setup (`App.js`)**
6. Push **Day 1** changes to GitHub
   ```sh
   git checkout -b day-1
   git add .
   git commit -m "Day 1: Backend authentication & frontend setup"
   git push origin day-1
   ```

---


## Day 2: Notes CRUD API & Authentication Middleware (Branch: `day-2`)

### ✅ Backend Tasks
1. Define **Note model (`models/Note.js`)**
2. Create **CRUD routes (`routes/noteRoutes.js`)**
3. Implement **authentication middleware (`middleware/authMiddleware.js`)**
4. Implement **Notes controller (`controllers/noteController.js`)**
5. Secure all **protected routes** using authentication middleware
6. Test APIs using **Postman**
7. Push changes to GitHub
   ```sh
   git checkout -b day-2
   git add .
   git commit -m "Day 2: Implement Notes CRUD API & authentication middleware"
   git push origin day-2
   ```

### ✅ Frontend Tasks
1. Implement **authentication context (`context/AuthContext.js`)**
2. Create **Login & Registration components**
3. Set up **Protected Route component**
4. Push changes to GitHub
   ```sh
   git add .
   git commit -m "Day 2: Authentication logic & context setup"
   git push origin day-2
   ```

---

 # Git Workflow

1. Initialize Git and **create remote repository**
   ```sh
   git init
   git remote add origin <repo-url>
   ```
2. Create feature branches for each day
   ```sh
   git checkout -b day-1
   git push origin day-1
   git checkout -b day-2
   git push origin day-2
   git checkout -b day-3
   git push origin day-3
   ```
3. Commit and push daily progress
   ```sh
   git add .
   git commit -m "Day X: Description of work done"
   git push origin day-X
   ```
--


   
   