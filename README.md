# BlogSphere — MERN Blogging Platform

BlogSphere is a full-stack blogging platform built with the MERN stack. It allows users to register, log in, create articles, browse posts, bookmark favourites, and manage their own content.

## Features

- User registration and login with password hashing and JWT authentication
- Create, view, edit, and delete blog articles
- Article ownership checks for editing and deleting posts
- Browse articles and view related posts
- Search and filter articles by category
- Bookmark articles with browser storage
- Responsive user interface

## Tech Stack

**Frontend:** React, Vite, CSS

**Backend:** Node.js, Express.js

**Database:** MongoDB Atlas, Mongoose

**Authentication:** JSON Web Tokens (JWT), bcryptjs

**Version Control:** Git and GitHub

## Project Structure

```text
BlogSphere/
├── client/          # React frontend
├── server/          # Express backend and API
│   └── models/      # MongoDB models
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB Atlas account or MongoDB connection string
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Tammu-05/BlogSphere.git
cd BlogSphere
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory with your own values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Never commit your real `.env` file or expose your secrets.

Start the backend:

```bash
node server.js
```

### 3. Configure the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Security Notes

- Passwords are hashed before being stored.
- Protected API routes require JWT authentication.
- Article modifications are restricted by ownership checks.
- Environment variables and credentials must remain private.

## Future Improvements

- User profile pages
- Comments and likes
- Pagination
- Image uploads
- Deployment and automated testing

## Author

**Tammu-05**

GitHub: https://github.com/Tammu-05
