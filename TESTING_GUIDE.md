# CareerSync-AI - System Testing Guide

## 🧪 Complete System Test

Run these tests to verify the entire project is working correctly.

---

## Part 1: Backend Testing

### 1.1 Health Check
```bash
# Should return OK status
curl http://localhost:3001/health

# Expected Response:
# {"status":"ok","timestamp":"2026-04-01T..."}
```

### 1.2 Authentication Tests

**Register New User:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"testuser@example.com",
    "password":"TestPass123",
    "firstName":"Test",
    "lastName":"User"
  }'

# Expected: accessToken, refreshToken, user object
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"testuser@example.com",
    "password":"TestPass123"
  }'

# Save the accessToken for other requests
```

**Get Current User (Protected):**
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Expected: Current user profile
```

### 1.3 Dashboard Tests (Requires Auth)
```bash
curl -X GET http://localhost:3001/api/dashboard \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Expected: User stats (enrolled courses, cart items, etc.)
```

### 1.4 Admin Routes Tests (Requires Admin Token)
```bash
curl -X GET http://localhost:3001/api/admin/stats \
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN"

# Expected: Platform statistics
```

### 1.5 Chatbot Test
```bash
curl -X POST http://localhost:3001/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message":"What career paths are available?"
  }'

# Expected: AI generated response with career guidance
```

### 1.6 Course Operations
```bash
# Add course to cart
curl -X POST http://localhost:3001/api/cart/toggle \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "resourceId":"course123",
    "addedToCart":true
  }'

# Get cart
curl -X GET http://localhost:3001/api/cart \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Get cart count
curl -X GET http://localhost:3001/api/cart/count \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 1.7 Roadmap Generation
```bash
curl -X POST http://localhost:3001/api/roadmap \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "careerGoal":"Software Engineer",
    "currentSkills":["JavaScript","React"],
    "experience":"2 years"
  }'

# Expected: Generated roadmap with learning steps
```

### 1.8 Email Subscription
```bash
curl -X POST http://localhost:3001/api/email-subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email":"subscriber@example.com"
  }'

# Expected: Subscription confirmation
```

---

## Part 2: Frontend Testing

### 2.1 Visual Checks
- [ ] Page loads without errors
- [ ] Navigation bar visible
- [ ] Footer visible
- [ ] No console errors (open DevTools)
- [ ] No CORS errors

### 2.2 Authentication Flow
- [ ] Go to `/login`
- [ ] Enter credentials
- [ ] Should redirect to dashboard
- [ ] Token appears in localStorage

### 2.3 Dashboard
- [ ] Access `/my-dashboard`
- [ ] Display enrolled courses
- [ ] Display subscribed pathways
- [ ] Show statistics

### 2.4 Career Pathways
- [ ] Navigate to `/pathways`
- [ ] Load list of pathways
- [ ] Click pathway details
- [ ] Compare pathways feature works

### 2.5 Resources
- [ ] Navigate to `/resources`
- [ ] Load resources list
- [ ] Search/filter functionality works
- [ ] Add to cart works

### 2.6 Career Test
- [ ] Navigate to `/career-test`
- [ ] Answer questions
- [ ] Get results
- [ ] Results are accurate

### 2.7 Chatbot
- [ ] Click chatbot icon
- [ ] Send message
- [ ] Get AI response
- [ ] Conversation history works

### 2.8 Roadmap Generator
- [ ] Navigate to roadmap generator
- [ ] Enter career goals
- [ ] Generate roadmap
- [ ] Export/download PDF

---

## Part 3: Database Testing

### 3.1 Connection Verification
```bash
# Check MongoDB is running
mongosh

# Exit and check server logs show "✅ MongoDB connected"
```

### 3.2 Data Verification
```javascript
// In MongoDB shell
use careersync
db.users.find().limit(1)
db.courses.find().limit(1)
db.roadmaps.find().limit(1)
db.subscriptions.find().limit(1)
```

### 3.3 Collection Indexes
```bash
# Check indexes are created
db.users.getIndexes()
db.courses.getIndexes()
```

---

## Part 4: Error Scenarios

### 4.1 Invalid Credentials
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"wrong@example.com",
    "password":"wrong"
  }'

# Expected: 401 Unauthorized
```

### 4.2 Missing Token
```bash
curl -X GET http://localhost:3001/api/dashboard

# Expected: 401 No token provided
```

### 4.3 Invalid Token
```bash
curl -X GET http://localhost:3001/api/dashboard \
  -H "Authorization: Bearer invalid_token"

# Expected: 401 Invalid or expired token
```

### 4.4 Non-Existent Resource
```bash
curl http://localhost:3001/api/nonexistent

# Expected: 404 Not Found
```

---

## Part 5: Load & Performance Testing

### 5.1 Quick Speed Check
1. Open Browser DevTools (F12)
2. Go to Network tab
3. Reload page
4. Check response times:
   - Home page: < 2s
   - API calls: < 500ms
   - Images: < 1s

### 5.2 Memory Usage
```bash
# Watch server process
$ node inspector in browser
# Or use: npm run dev in server with debugger

# Check for memory leaks over 5 minutes of usage
```

---

## Part 6: Security Testing

### 6.1 CORS Check
```bash
# From different origin should be blocked if not in allowlist
curl -X GET http://localhost:3001/api/dashboard \
  -H "Origin: http://evil-site.com" \
  -H "Authorization: Bearer TOKEN"

# Expected: CORS error for unauthorized origins
```

### 6.2 SQL Injection Check
```bash
# Try SQL injection in login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"admin\"; DROP TABLE users; --",
    "password":"anything"
  }'

# Expected: Should fail gracefully (MongoDB prevents injection)
```

### 6.3 XSS Prevention
- Try submitting HTML/JavaScript in forms
- Should be sanitized or escaped
- Check console for no inline scripts

---

## Automated Test Script

Save as `test.sh`:
```bash
#!/bin/bash

echo "🧪 CareerSync-AI System Test"
echo "====================================\n"

# Test 1: Health Check
echo "1️⃣  Health Check..."
curl -s http://localhost:3001/health | jq .

# Test 2: User Registration
echo "\n2️⃣  User Registration..."
curl -s -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test'$(date +%s)'@test.com","password":"Test123","firstName":"Test"}' | jq .

# Test 3: Login
echo "\n3️⃣  Login..."
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"TestPass123"}' | jq -r '.token')

# Test 4: Protected Route
echo "\n4️⃣  Protected Route (Dashboard)..."
curl -s -X GET http://localhost:3001/api/dashboard \
  -H "Authorization: Bearer $TOKEN" | jq .

echo "\n✅ Basic tests completed!"
```

Run with: `bash test.sh`

---

## Expected Results Summary

| Component | Status | Notes |
|-----------|--------|-------|
| Backend Server | ✅ Running | Port 3001 |
| Frontend Server | ✅ Running | Port 5173 |
| Health Check | ✅ OK | Returns status |
| Auth Routes | ✅ Working | Register/Login/Refresh |
| Protected Routes | ✅ Working | Token validation works |
| Database | ✅ Connected | Or graceful fallback |
| CORS | ✅ Configured | Localhost allowed |
| Error Handling | ✅ Proper | Meaningful error messages |
| API Responses | ✅ Valid JSON | Correct format |

---

## Troubleshooting Guide

### Issue: Backend crashes on startup
- **Check**: `npm install` in server folder
- **Check**: `.env` file exists with MONGODB_URI
- **Check**: Node version ≥ 16

### Issue: Frontend won't connect to backend
- **Check**: Both servers running
- **Check**: CORS origin allowed in backend
- **Check**: VITE_API_URL in client/.env correct
- **Check**: No firewall blocking ports 3001/5173

### Issue: MongoDB connection fails
- **Check**: MongoDB server running
- **Check**: Connection string correct
- **Check**: Network access allowed (if Atlas)

### Issue: Chatbot returns errors
- **Check**: GEMINI_API_KEY in .env
- **Check**: API key is valid and active

---

## Performance Benchmarks (Expected)

| Metric | Expected | Actual |
|--------|----------|--------|
| /health response | < 50ms |  |
| Login API | < 200ms |  |
| Dashboard load | < 500ms |  |
| Chatbot response | < 3s |  |
| Database query | < 100ms |  |
| Page load | < 2s |  |

---

## Sign-Off Checklist

- [ ] All health checks passing
- [ ] Authentication working end-to-end
- [ ] All API endpoints responding
- [ ] Database connected
- [ ] Frontend pages loading
- [ ] No console errors
- [ ] CORS properly configured
- [ ] Error handling working
- [ ] Performance acceptable

✅ **When all items checked: Project is production-ready for deployment!**

