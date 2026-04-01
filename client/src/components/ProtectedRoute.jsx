/**
 * CareerSync-AI — Role-Based Access Control (RBAC)
 * =================================================
 *
 * ROLES: user | admin
 *
 * ─── FEATURE ACCESS ──────────────────────────────────────────────────────────
 *
 *  Feature                      │ user │ admin │ Notes
 * ─────────────────────────────────────────────────────────────────────
 *  Public pages (Home, About)   │  ✓   │  ✓    │ No auth needed
 *  Career Pathways (browse)     │  ✓   │  ✓    │ Auth required
 *  Pathway subscribe/unsubscribe│  ✓   │  ✓    │ Own data only
 *  Skill Hub / Resources        │  ✓   │  ✓    │ Auth required
 *  Resource detail              │  ✓   │  ✓    │ Auth required
 *  Add to cart                  │  ✓   │  ✓    │ Own cart only
 *  Payment / enroll             │  ✓   │  ✓    │ Own enrollments only
 *  Learning page                │  ✓*  │  ✓    │ * Must be enrolled
 *  Career Test                  │  ✓   │  ✓    │ Auth required
 *  Comparison Tool              │  ✓   │  ✓    │ Auth required (email send)
 *  AI Roadmap Generator         │  ✓   │  ✓    │ Auth required
 *  AI Chatbot                   │  ✓   │  ✓    │ Public endpoint
 *  User Dashboard               │  ✓   │  ✓    │ Own data only
 *  Admin Dashboard              │  ✗   │  ✓    │ Admin only
 *  User list / role change      │  ✗   │  ✓    │ Admin only
 *  Delete users                 │  ✗   │  ✓    │ Admin only
 *  System stats                 │  ✗   │  ✓    │ Admin only
 *
 * ─── ALLOWED ACTIONS ─────────────────────────────────────────────────────────
 *
 *  user:
 *   - register / login / refresh / logout
 *   - view own profile
 *   - subscribe / unsubscribe pathways (own)
 *   - add / remove cart items (own)
 *   - purchase and enroll in courses (own)
 *   - view enrolled courses (own)
 *   - generate AI roadmaps (own)
 *   - view roadmap history (own)
 *   - delete own roadmaps
 *   - take career test
 *   - use comparison tool (PDF download + email if logged in)
 *
 *  admin (all of the above, plus):
 *   - GET  /api/admin/stats          → system-wide counts
 *   - GET  /api/admin/users          → all users
 *   - PATCH /api/admin/users/:id/role → promote / demote
 *   - DELETE /api/admin/users/:id    → remove user
 *
 * ─── RESTRICTIONS ────────────────────────────────────────────────────────────
 *
 *  - Users cannot read or modify another user's data (enforced via JWT userId)
 *  - Admin routes protected by `requireAdmin` middleware (role check on JWT)
 *  - Learning page enforces enrolled check before serving video
 *  - All mutation routes require valid access token (15-min expiry)
 *  - Refresh token (7d) used to silently renew access tokens
 *  - On token mismatch, user is logged out and redirected to /login
 */

// ─── Frontend route guard ──────────────────────────────────────────────────

/**
 * ProtectedRoute — wrap any React Router route.
 *
 * Usage:
 *   <Route path="/my-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 *   <Route path="/admin/*"       element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isSignedIn, isLoading, user } = useAuth();
  if (isLoading) return null; // or a spinner
  if (!isSignedIn) return <Navigate to="/login" replace />;
  if (requireAdmin && user?.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;