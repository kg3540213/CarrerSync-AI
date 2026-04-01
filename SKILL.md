# CareerSync-AI: Project Overview & Implementation Guide

## 📋 Project Description

**CareerSync-AI** is a full-stack, AI-powered career guidance and learning platform. It serves as a comprehensive ecosystem for career exploration, skill development, and personalized career roadmap generation. The platform combines artificial intelligence, interactive tools, and community resources to help users navigate their career paths effectively.

---

## 🎯 Core Purpose & Vision

CareerSync-AI solves the problem of career uncertainty by providing:
- **Guided Career Exploration**: Browse and discover various career pathways
- **Personalized Recommendations**: AI-driven insights for career decisions
- **Skill Development Tracking**: Monitor progress through learning modules
- **Interactive Tools**: Comparison tools, career tests, and AI chatbot
- **Resource Hub**: Curated learning materials and industry trends
- **Admin Management**: Educational institution control over content and users

---

## 🏛️ System Architecture

### Stack Overview

```
Frontend: React 18 + Vite + Tailwind CSS (Client-side SPA)
         ↓↓↓ (REST API via Axios)
Backend: Node.js + Express.js (Server-side)
         ↓↓↓ (Queries & Commands)
Database: MongoDB + Mongoose (NoSQL Document Store)
         ↓↓↓ (External Services)
AI Services: Google Generative AI API
Notifications: SendGrid (Email), Nodemailer
File Upload: Multer (Middleware)
```

### Database Models

1. **User Model** - Core user data with authentication
   - Profile information (name, email, skills)
   - Role-based access (User, Admin, Career Counselor)
   - JWT tokens for session management

2. **Course Model** - Learning content
   - Course metadata (title, description, duration)
   - Instructor association
   - Enrollment tracking

3. **EnrolledCourse Model** - User progress tracking
   - Links users to courses they've taken
   - Tracks completion percentage and status

4. **Roadmap Model** - Personalized career paths
   - AI-generated career development roadmaps
   - Custom learning sequences per user

5. **Subscription Model** - Premium access management
   - Subscription tiers and features
   - Billing information

---

## 🎨 Frontend Architecture

### Folder Structure: `/client/src/`

```
components/
  ├── Core UI
  │   ├── Navbar.jsx - Main navigation
  │   ├── Footer.jsx - Site footer
  │   ├── ErrorBoundary.jsx - Error handling
  │   └── ProtectedRoute.jsx - Route authentication
  │
  ├── Features
  │   ├── Chatbot.jsx - AI assistant
  │   ├── CareerPathways.jsx - Pathway display
  │   ├── CareerPathwayCard.jsx - Individual pathway cards
  │   ├── ComparisonTool.jsx - Pathway comparison
  │   ├── SkillsHub.jsx - Skill resources
  │   ├── IndustryTrends.jsx - Market insights
  │   ├── HowItWorks.jsx - Tutorial/onboarding
  │   └── Faq.jsx - Help section
  │
  ├── Content Display
  │   ├── ResourceCard.jsx - Resource listing
  │   ├── Result.jsx - Results display
  │   ├── LoadingSpinner.jsx - Loading states
  │   └── BlurCircle.jsx - UI effects
  │
  ├── Admin
  │   ├── AdminLogin.jsx - Admin authentication
  │   └── PostCard.jsx - Content management cards
  │
  └── Roadmap
      └── RoadmapGeneratorBanner.jsx - Call-to-action

pages/
  ├── Home.jsx - Landing page
  ├── About.jsx - Company info
  ├── AllPathways.jsx - Browse all pathways
  ├── PathwayDetails.jsx - Single pathway details
  ├── AllResources.jsx - Resource library
  ├── ResourceDetails.jsx - Resource deep-dive
  ├── CareerTestPage.jsx - Career assessment quiz
  ├── ComparisonToolPage.jsx - Tool UI
  ├── Cart.jsx - Course shopping cart
  ├── Payment.jsx - Payment processing
  ├── Dashboard.jsx - User dashboard
  ├── LearningPage.jsx - Learning interface
  ├── Login.jsx & SignUp.jsx - Authentication
  │
  ├── admin/
  │   ├── AdminHome.jsx - Admin landing
  │   ├── AdminDashboard.jsx - Admin control panel
  │
  └── roadmap/
      ├── RoadmapGenerator.jsx - AI roadmap creation
      └── RoadmapPage.jsx - View saved roadmaps

context/
  └── AuthContext.jsx - Global auth state management

hooks/
  ├── useCart.js - Shopping cart logic
  └── usePathways.js - Pathway data fetching

services/
  └── api.js - Axios instance & API calls

assets/
  ├── pathwaysData.js - Hardcoded pathway data
  ├── resources.js - Resource definitions
  └── carrier-test/preDefinedQuestions.js - Quiz questions
```

### Key Frontend Features

- **Responsive UI**: Tailwind CSS for mobile-first design
- **Animations**: Framer Motion for smooth transitions
- **State Management**: React Context API for auth
- **Icons**: Font Awesome + Lucide React
- **Notifications**: Sonner toast notifications
- **PDF Export**: html-to-image, html2canvas, jsPDF
- **Markdown Rendering**: react-markdown for content

---

## ⚙️ Backend Architecture

### Folder Structure: `/server/`

```
routes/
  ├── auth.js - Authentication endpoints
  ├── User.js - User profile management
  ├── course.js - Course CRUD operations
  ├── cart.js - Shopping cart logic
  ├── chatbot.js - AI chatbot endpoint
  ├── subscribe.js - Subscription management
  ├── subscribePathway.js - Pathway subscriptions
  ├── mainRoutes.js - Main feature routes
  ├── sendComparisonImage.js - Image export
  │
  └── admin/
      ├── admin.js - Admin helpers
      └── adminMainRoute.js - Admin endpoints

controllers/
  ├── authController.js - Auth business logic
  ├── userController.js - User management
  ├── adminController.js - Admin operations
  └── roadmapController.js - AI roadmap generation

models/
  ├── User.js - User schema
  ├── Course.js - Course schema
  ├── EnrolledCourse.js - Enrollment schema
  ├── Roadmap.js - Roadmap schema
  └── Subscription.js - Subscription schema

middleware/
  └── auth.js - JWT verification & RBAC

config/
  └── db.js - MongoDB connection

utils/
  └── jwt.js - JWT token generation/verification

app.js - Express server setup
```

### Key Backend Features

- **Authentication**: JWT with refresh tokens
- **Security**: Bcrypt password hashing, CORS, Helmet
- **Rate Limiting**: express-rate-limit for API protection
- **AI Integration**: Google Generative AI for roadmap generation
- **Email Services**: SendGrid + Nodemailer for notifications
- **File Upload**: Multer middleware for image/file handling
- **Logging**: Morgan HTTP request logger
- **Database**: Mongoose ODM for MongoDB

---

## 🔐 Security & Authentication

### Authentication Flow
```
1. User Signs Up/Logs In
   ↓
2. Server validates credentials (Bcrypt)
   ↓
3. JWT token generated (access + refresh)
   ↓
4. Client stores token (localStorage/cookies)
   ↓
5. Subsequent requests include token in headers
   ↓
6. Auth middleware verifies token
   ↓
7. Route handler processes authenticated request
```

### Role-Based Access Control (RBAC)

**User Roles:**
- **User** (Default): Access to pathways, resources, cart, dashboard
- **Admin**: Full platform management, content creation, user management
- **Career Counselor** (Future): Personalized guidance features

---

## 📡 API Endpoints Summary

### Authentication (`/api/auth/`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /refresh` - Refresh JWT token
- `POST /logout` - Invalidate token

### Users (`/api/users/`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update profile
- `GET /dashboard` - User dashboard data

### Courses (`/api/courses/`)
- `GET /` - List all courses
- `GET /:id` - Course details
- `POST /enroll` - Enroll in course
- `GET /progress` - Track progress

### Pathways (`/api/pathways/`)
- `GET /` - List careers
- `GET /:id` - Pathway details
- `POST /compare` - Compare pathways

### AI Roadmap (`/api/roadmap/`)
- `POST /generate` - Generate personalized roadmap
- `GET /saved` - Retrieve user's roadmaps

### Chatbot (`/api/chatbot/`)
- `POST /message` - Send message to AI assistant

### Admin (`/api/admin/`)
- `POST /content` - Add/manage content
- `GET /users` - List users
- `PUT /users/:id` - Manage user roles

---

## 🎯 Key Features in Detail

### 1. Career Pathways Explorer
- Browse 50+ predefined career paths
- Filter by industry, skill level, salary range
- Compare different career options
- View required skills and resources

### 2. Skill Development Hub
- Organized skill categories
- Beginner to advanced resources
- Track skill progress
- Resource recommendations

### 3. AI-Powered Roadmap Generator
- Input career goals and current skills
- AI generates personalized learning roadmap
- PDF export capability
- Save roadmaps for future reference

### 4. Interactive Career Test
- Pre-defined assessment questions
- Career aptitude evaluation
- Personalized results and recommendations

### 5. AI Chatbot
- 24/7 career guidance
- Answer career-related questions
- Powered by Google Generative AI
- Conversation history

### 6. Course Enrollment & Progress
- Browse and enroll in courses
- Track completion percentage
- View enrolled course list
- Mark milestones

### 7. Admin Dashboard
- Content management (add/edit/delete courses, pathways)
- User management (roles, permissions, activity)
- Analytics and insights
- Email notifications system

### 8. Comparison Tool
- Compare 2-3 pathways side-by-side
- Export comparison as image
- Decision matrix

---

## 🚀 Technology Dependencies

### Backend Dependencies
- **express** (5.1.0) - Web framework
- **mongoose** (8.18.0) - MongoDB ODM
- **jsonwebtoken** (9.0.2) - JWT auth
- **bcrypt** (5.1.1) - Password hashing
- **@google/generative-ai** (0.24.1) - AI integration
- **@sendgrid/mail** (8.1.5) - Email service
- **cors** (2.8.5) - Cross-origin requests
- **dotenv** (17.1.0) - Environment variables
- **helmet** (8.1.0) - Security headers
- **multer** (2.0.1) - File uploads

### Frontend Dependencies
- **react** (19.1.0) - UI library
- **vite** (7.0.2) - Build tool
- **react-router-dom** (7.6.3) - Routing
- **tailwindcss** (4.1.11) - Styling
- **axios** (1.10.0) - HTTP client
- **framer-motion** (12.23.0) - Animations
- **@google/generative-ai** (0.24.1) - AI integration
- **react-markdown** (10.1.0) - Markdown rendering
- **jspdf** & **html2canvas** - PDF export
- **sonner** (2.0.6) - Toast notifications

---

## 📊 Data Flow Diagram

```
┌─────────────────────┐
│   React Frontend    │
│  (Vite SPA)         │
└──────────┬──────────┘
           │ HTTP/REST
           ↓
┌──────────────────────────────────┐
│  Express.js API Server           │
│  ├─ Auth Middleware              │
│  ├─ Route Handlers               │
│  └─ Business Logic               │
└──────────┬───────────────────────┘
           │
      ┌────┴────────────────────┐
      ↓                         ↓
  ┌────────┐             ┌──────────┐
  │ MongoDB │             │ Google   │
  │ Database │             │ Gen AI   │
  └────────┘             └──────────┘
      ↑                         
      │ Queries
      └─────────────────────────

External Services:
- SendGrid Email
- Nodemailer
```

---

## 🎮 User Journey

### New User Flow
```
1. Landing Page → Browse pathways
2. Sign Up/Register → Create account
3. Career Test → Take assessment
4. View Results → Get recommendations
5. Explore Learning → Browse resources
6. Enroll in Course → Start learning
7. Generate Roadmap → AI creates path
8. Dashboard → Track progress
```

### Admin Flow
```
1. Admin Login → Verify credentials
2. Admin Dashboard → View platform stats
3. Content Management → Add/edit courses
4. User Management → Assign roles
5. Analytics → View insights
6. Send Messages → Notify users
```

---

## 🔧 Development Setup

### Requirements
- Node.js 16+
- MongoDB (local or Atlas)
- Npm/Yarn package manager

### Installation
```bash
# Backend
cd server
npm install
cp .env.example .env
# Configure: MONGODB_URI, PORT, JWT_SECRET, etc.
npm run dev

# Frontend
cd client
npm install
cp .env.example .env
# Configure: VITE_API_URL
npm run dev
```

### Environment Variables Required
**Server (.env):**
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 3001)
- `JWT_SECRET` - Secret key for JWT
- `CLIENT_URL` - Frontend URL
- `GOOGLE_API_KEY` - Google Generative AI key
- `SENDGRID_API_KEY` - SendGrid API key
- `EMAIL_USER` - Sender email address

**Client (.env):**
- `VITE_API_URL` - Backend API URL

---

## ✅ Current Status

- ✅ Core authentication system
- ✅ Career pathways database
- ✅ Course enrollment system
- ✅ AI chatbot integration
- ✅ Admin dashboard
- ✅ Responsive UI with Tailwind
- ✅ Roadmap generator
- ✅ Comparison tool
- ✅ PDF export functionality
- 🔄 Ongoing: Bug fixes, feature enhancements

---

## 📝 Notes for Developers

1. **File Naming**: User.js uses capital 'U' (case-sensitive on Linux)
2. **CORS Configuration**: Whitelist all allowed origins explicitly
3. **Rate Limiting**: API endpoints have rate limiting enabled
4. **Error Handling**: All routes have try-catch blocks
5. **Token Expiry**: Access tokens expire in 24 hours
6. **Password Security**: Minimum 8 characters required
7. **Email Integration**: Verify SendGrid keys for notifications

---

## 🎓 Key Learning Areas

- Full-stack MERN development
- JWT authentication & authorization
- AI/ML integration (Google Gen AI)
- RESTful API design
- Database schema design
- Role-based access control
- Email service integration
- File upload handling
- Modern React patterns (Context, Hooks)
- Responsive design with Tailwind CSS

---

**Last Updated**: April 2026
**Version**: 1.0.0
**Status**: Active Development
