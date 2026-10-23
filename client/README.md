# BlogSphere — MERN Stack Blogging Platform

BlogSphere is a full-stack blogging platform built with the MERN stack. Users can register, log in, create and manage blog articles, explore related posts, and bookmark their favourite content.

## Features

- **User Authentication:** Registration and login using JWT authentication and password hashing.
- **Create Articles:** Write and publish blog posts.
- **Edit and Delete:** Manage your own articles.
- **Ownership Protection:** Backend checks prevent users from editing or deleting other users' articles.
- **Browse Articles:** View published articles and explore related posts.
- **Search and Categories:** Find articles using search and category filters.
- **Bookmarks:** Save favourite articles with browser local storage.
- **Responsive Interface:** React-based user interface for browsing and managing articles.

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

## Project Structure

```text
BlogSphere/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── server/                 # Express backend
│   ├── models/
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB Atlas account or another MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd BlogSphere
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository URL after publishing the project.

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a private `.env` file inside the `server` folder using `.env.example` as a guide.

Configure these variables with your own values:

```dotenv
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Never commit your real `.env` file, database credentials, or JWT secret to GitHub.

In MongoDB Atlas, configure database access and the network access list for your development environment.

### 5. Start the backend

From the `server` directory:

```bash
node server.js
```

The API runs at `http://localhost:5000` when configured with the default port.

### 6. Start the frontend

In a separate terminal:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite, typically `http://localhost:5173`.

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register an account |
| POST | `/api/auth/login` | Log in |
| GET | `/api/blogs` | Retrieve blog articles |
| GET | `/api/blogs/:id` | Retrieve a specific article |
| POST | `/api/blogs` | Create an article (authenticated) |
| PUT | `/api/blogs/:id` | Update your own article (authenticated) |
| DELETE | `/api/blogs/:id` | Delete your own article (authenticated) |

Protected endpoints require a valid bearer token. Actual behavior depends on the routes configured in the backend.

## Security Notes

- Passwords are hashed before being stored.
- JWT authentication protects article creation and modification routes.
- Backend ownership checks restrict edits and deletions to the article owner.
- Environment files and credentials must remain private.

## Future Improvements

- User profile pages
- Comments and likes
- Image upload support
- Pagination
- Automated testing
- Deployment to a production hosting platform

## Author

Developed as a full-stack web development project to practise React, Node.js, Express, MongoDB, and authentication.

## License

No License has been specified yet.
