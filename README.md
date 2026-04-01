# CareerSync-AI

A modern, full-stack AI-powered career guidance platform with pathway exploration, skill tracking, and personalized roadmap generation.

## 🌟 Features

### Core Features
- **Career Pathways Explorer** - Browse industry-specific learning paths
- **Skill Hub** - Comprehensive skill-building resources organized by level
- **Industry Trends** - Stay updated with latest market trends
- **AI Roadmap Generator** - Get personalized career development roadmaps
- **Comparison Tool** - Compare different pathways and courses
- **AI Chatbot** - Interactive career guidance assistant
- **Course Enrollment** - Track learning progress and course completion
- **Admin Dashboard** - Manage content and users

### Advanced Features
- JWT-based authentication with refresh tokens
- Role-Based Access Control (RBAC) - User, Admin, Career Counselor
- User profile management
- Progress tracking for enrolled courses
- Subscription management
- Email notifications
- Responsive modern UI with Tailwind CSS

---

## 🏗️ Architecture

### Technology Stack

**Backend:**
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt password hashing

**Frontend:**
- React 18+ with Vite
- Tailwind CSS
- React Router v6
- Axios for API calls
- Framer Motion for animations

---

## 📁 Project Structure

```
CareerSync-AI/
├── server/                 # Backend (Node.js/Express)
│   ├── controllers/       # Business logic
│   ├── models/            # Database schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth & RBAC
│   ├── utils/             # Helper functions
│   ├── config/            # Database config
│   └── app.js             # Express app
│
├── client/                # Frontend (React/Vite)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # State management
│   │   ├── services/     # API client
│   │   └── assets/       # Static files
│   └── package.json
│
├── ARCHITECTURE.md        # System architecture
├── RBAC_DOCUMENTATION.md  # Security & roles
├── IMPLEMENTATION_GUIDE.md # Development guide
└── README.md              # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone & Setup**
```bash
cd CareerSync-AI

# Backend setup
cd server
npm install
cp .env.example .env
# Edit .env with your credentials

# Frontend setup
cd ../client
npm install
cp .env.example .env
# Edit .env with API URL
```

2. **Environment Variables**

**Server** (server/.env):
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/careerSync
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
REFRESH_SECRET=your-refresh-secret
REFRESH_EXPIRE=30d
PORT=3001
GEMINI_API_KEY=your-gemini-key
```

**Client** (client/.env):
```
VITE_API_URL=http://localhost:3001
VITE_GEMINI_API_KEY=your-gemini-key
```

3. **Run Development Servers**

```bash
# Backend (Terminal 1)
cd server
npm run dev

# Frontend (Terminal 2)
cd client
npm run dev
```

Visit: http://localhost:5173

---

## 📚 API Documentation

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh-token
GET    /api/auth/me
PUT    /api/auth/profile
```

### Pathways
```
GET    /api/pathways
GET    /api/pathways/:id
GET    /api/pathways/category/:category
POST   /api/pathways (Admin)
PUT    /api/pathways/:id (Admin)
DELETE /api/pathways/:id (Admin)
```

### Resources
```
GET    /api/resources
GET    /api/resources/:id
GET    /api/resources/search
POST   /api/resources (Admin)
PUT    /api/resources/:id (Admin)
DELETE /api/resources/:id (Admin)
```

### Skills
```
GET    /api/skills
GET    /api/skills/:id
GET    /api/skills/level/:level
POST   /api/skills (Admin)
PUT    /api/skills/:id (Admin)
DELETE /api/skills/:id (Admin)
```

### Trends
```
GET    /api/trends
GET    /api/trends/:id
GET    /api/trends/high-impact
GET    /api/trends/industry/:industry
POST   /api/trends (Admin)
PUT    /api/trends/:id (Admin)
DELETE /api/trends/:id (Admin)
```

### Enrollments
```
GET    /api/enrollments (Protected)
POST   /api/enrollments/enroll (Protected)
DELETE /api/enrollments/:id (Protected)
GET    /api/enrollments/:id/progress (Protected)
PUT    /api/enrollments/:id/progress (Protected)
```

### Roadmaps
```
GET    /api/roadmaps (Protected)
GET    /api/roadmaps/:id (Protected)
POST   /api/roadmaps (Protected)
PUT    /api/roadmaps/:id (Protected)
DELETE /api/roadmaps/:id (Protected)
```

---

## 🔐 Authentication & Authorization

### Roles
1. **USER** - Access to learning features, can enroll courses
2. **ADMIN** - Full access, can create and manage all content
3. **CAREER_COUNSELOR** - Can create resources and guide users

### Protected Routes
All routes are protected by JWT authentication. Include token in header:
```
Authorization: Bearer <your_token>
```

See [RBAC_DOCUMENTATION.md](./RBAC_DOCUMENTATION.md) for detailed permissions.

---

## 🎨 Frontend Usage

### Using Auth Context
```javascript
import { useAuth } from '@/context/AuthContext';

function Dashboard() {
  const { user, isSignedIn, logout } = useAuth();
  
  if (!isSignedIn) return <Navigate to="/login" />;
  
  return <h1>Welcome, {user.firstName}!</h1>;
}
```

### API Services
```javascript
import { 
  pathwayService, 
  resourceService, 
  enrollmentService 
} from '@/services/api';

// Get all pathways
const pathways = await pathwayService.getAllPathways();

// Enroll in course
const enrollment = await enrollmentService.enrollCourse(resourceId);

// Update progress
await enrollmentService.updateProgress(enrollmentId, { progress: 75 });
```

---

## 🔧 Configuration

### MongoDB
- Create cluster on MongoDB Atlas
- Add IP to whitelist
- Get connection string
- Update MONGO_URI in .env

### Gemini API
- Get API key from Google Cloud Console
- Add to GEMINI_API_KEY in .env

### JWT Configuration
- Change JWT_SECRET to strong random string
- Adjust JWT_EXPIRE as needed
- Set REFRESH_SECRET for refresh tokens

---

## 📊 Database Models

### User
```javascript
{
  email: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  bio: String,
  skills: [String],
  role: String (user|admin|career_counselor),
  profileImageUrl: String,
  isActive: Boolean,
  createdAt: Date
}
```

### Pathway
```javascript
{
  title: String,
  description: String,
  difficulty: String,
  duration: String,
  skills: [String],
  resources: [ResourceId],
  createdBy: UserId,
  createdAt: Date
}
```

### Resource
```javascript
{
  title: String,
  type: String (course|tutorial|article|video|book),
  category: String,
  price: Number,
  level: String,
  skills: [String],
  pathway: PathwayId,
  createdBy: UserId,
  createdAt: Date
}
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete schema documentation.

---

## 🚢 Deployment

### Backend Deployment
```bash
# Build
npm run build

# Upload to Render/Heroku/Vercel
# Set environment variables in platform
# Deploy
```

### Frontend Deployment
```bash
# Build
npm run build

# Upload dist/ to Vercel/Netlify
# Or serve with backend
```

### Environment Variables
Update all URLs and secrets for production:
- MONGO_URI (Production database)
- JWT_SECRET (Strong random string)
- FRONTEND_URL (Production domain)

---

## 📖 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design and structure
- [RBAC_DOCUMENTATION.md](./RBAC_DOCUMENTATION.md) - Security & permissions
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Development guide

---

## 🐛 Troubleshooting

### API Connection Issues
- Check VITE_API_URL in client/.env
- Verify server is running on correct port
- Check CORS configuration in server/app.js

### Authentication Issues
- Verify JWT_SECRET is set
- Check token in localStorage
- Ensure token is included in request headers

### Database Issues
- Check MONGO_URI connection string
- Verify MongoDB is running
- Check IP whitelist in MongoDB Atlas

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 📧 Support

For issues, questions, or suggestions, please create an issue on GitHub.

---

## 🎯 Roadmap

- [ ] Email notification system
- [ ] Real-time notifications (WebSockets)
- [ ] User recommendation engine
- [ ] Video streaming integration
- [ ] Discussion forums
- [ ] Gamification (badges, points)
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Peer mentoring
- [ ] Blockchain certificates

---

## 📊 Performance

- Query optimization with MongoDB indexing
- Pagination for large datasets
- Caching for frequently accessed data
- Lazy loading of components
- Image optimization
- API response compression

---

## 🔒 Security

- JWT authentication with expiration
- Password hashing with bcrypt
- Role-based access control
- Input validation & sanitization
- HTTPS/SSL support
- CORS configuration
- Rate limiting ready
- Secure environment variables

---

**Built with ❤️ for career development**
CareerSync-AI is a comprehensive platform designed to help users explore, compare, and plan their career pathways. It provides personalized recommendations, industry insights, skill development resources, and interactive tools for both learners and administrators.


## Recent Updates & Improvements

This project has seen several important enhancements and new features:

- **AI Chatbot Integration:** The chatbot now provides instant answers and guidance, leveraging advanced AI for personalized support. Navigation commands are supported for seamless user experience.
- **Roadmap Generator (Gemini API):** Users can generate personalized learning and career roadmaps using the Gemini API, with results stored in MongoDB for tracking and retrieval.
- **Course Enrollment Logic:** Improved backend logic for course enrollment and cart management, including robust error handling and toggling enrollment status.
- **Career Assessment Test:** Expanded and refined predefined questions for the career test, offering more accurate recommendations.
- **Admin Tools:** Enhanced admin dashboard for secure management of courses, resources, and pathway content.
- **Frontend Enhancements:** UI improvements across components (CareerPathways, ComparisonTool, ResourceCard, etc.) for better usability and visual appeal.
- **Industry Trends & Skill Hub:** Updated content and resources to reflect the latest industry insights and skill development opportunities.
- **Error Handling:** Improved error boundaries and feedback for both client and server operations.
- **Code Quality:** Updated ESLint configuration and refactored code for maintainability.

These updates make CareerSync-AI a more robust, user-friendly, and feature-rich platform for career planning and development.

## Features

- **Career Pathways Explorer:** Browse and compare various career paths with detailed information and visualizations.
- **Skill Hub:** Access curated resources to develop relevant skills for your chosen career.
- **Industry Trends:** Stay updated with the latest trends and insights in different industries.
- **Roadmap Generator:** Create personalized learning and career roadmaps.
- **Comparison Tool:** Compare courses, pathways, and resources side-by-side.
- **Chatbot:** Get instant answers and guidance using AI-powered chat.
- **Admin Dashboard:** Manage courses, resources, and pathway content securely.

## Project Structure

```
client/
  src/
    components/
    pages/
    services/
  public/
  index.html
  package.json
  vite.config.js
server/
  app.js
  config/
  models/
  routes/
  package.json
```

## Technologies Used

- **Frontend:** React, Vite, Clerk authentication, Gemini API
- **Backend:** Node.js, Express, MongoDB
- **Other:** Email integration, Admin tools

## Environment Variables

Set the following variables in your `.env` files:

```
VITE_API_URL=<your_backend_url>
VITE_CLERK_PUBLISHABLE_KEY=<your_clerk_key>
VITE_ADMIN_NAME=<admin_name>
VITE_EMAIL_USER=<email_user>
VITE_EMAIL_PASS=<email_pass>
VITE_GEMINI_API_KEY=<gemini_api_key>
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kg3540213/CarrerSync-AI.git
   ```
2. **Install dependencies:**
   - For client:
     ```bash
     cd client
     npm install
     ```
   - For server:
     ```bash
     cd server
     npm install
     ```
3. **Configure environment variables:**
   - Add your keys and credentials to `.env` files in both `client` and `server` folders.
4. **Run the project:**
   - Start the backend:
     ```bash
     npm start
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.

---

For more information, visit the [GitHub repository](https://github.com/kg3540213/CarrerSync-AI).
