# Career_AI

Career_AI is a full-stack web application for AI-powered career guidance, learning pathways, and course management. It consists of a React client and a Node.js/Express server with MongoDB.

## Features
- AI-powered career roadmap generation (Gemini API)
- Course enrollment and management
- Learning pathway subscription
- Admin dashboard for content management
- User authentication (Clerk)
- Responsive UI with modern design

## Project Structure
```
client/   # React frontend
server/   # Node.js backend
```

## Setup Instructions

### 1. Clone the repository
```
git clone <repo-url>
cd Career_AI
```

### 2. Install dependencies
#### Client
```
cd client
npm install
```
#### Server
```
cd ../server
npm install
```

### 3. Environment Variables
- Create `.env` files in both client and server folders.
- Example for client/.env:
```
VITE_API_URL=http://localhost:3001
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-key>
```
- Example for server/.env:
```
PORT=3001
MONGO_URI=<your-mongodb-uri>
GEMINI_API_KEY=<your-gemini-api-key>
```

### 4. Start the development servers
#### Client
```
cd client
npm run dev
```
#### Server
```
cd server
nodemon app.js
```

## Usage
- Access the client at http://localhost:5173
- The server runs at http://localhost:3001

## Folder Overview
- `client/src/` - React components, pages, assets, services
- `server/routes/` - Express API routes
- `server/models/` - Mongoose models

## Tech Stack
- React, Vite, Clerk, Axios, Tailwind CSS
- Node.js, Express, MongoDB, Mongoose
- Gemini API (for AI roadmap generation)

## License
MIT
