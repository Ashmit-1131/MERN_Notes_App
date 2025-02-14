# MERN Notes App - Development Plan

## Overview
This is a full-stack **MERN (MongoDB, Express, React, Node.js) Notes Application** that I have planned to develop in three days, ensuring an efficient workflow with steady progress. This document outlines the complete plan and implementation details.

---

## Project Structure
```
MERN-Notes-App/
│── backend/       # Node.js & Express backend
│   ├── controllers/    # Business logic (Authentication & Notes)
│   │   
│   ├── models/         # Database models (Schemas)
│   │  
│   ├── routes/         # API endpoints
│   │  
│   ├── middleware/     # JWT authentication middleware
│   │   
│   ├── config/         # Configuration files (Database connection)
│   │  
│   ├── .env            # Environment variables
│   ├── server.js       # Main Express server
│   ├── package.json    # Backend dependencies
│
│── frontend/      # React frontend with Tailwind CSS
│   ├── src/
│   ├── package.json    # Frontend dependencies
│
│── .gitignore
│── README.md
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


   
   