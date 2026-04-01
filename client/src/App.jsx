import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

import Navbar   from './components/Navbar';
import Footer   from './components/Footer';
import BlurCircle from './components/BlurCircle';
import Chatbot  from './components/Chatbot';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home              from './pages/Home';
import ComparisonToolPage from './pages/ComparisonToolPage';
import CareerTestPage    from './pages/CareerTestPage';
import AllPathways       from './pages/AllPathways';
import PathwayDetails    from './pages/PathwayDetails';
import AllResources      from './pages/AllResources';
import ResourceDetails   from './pages/ResourceDetails';
import Cart              from './pages/Cart';
import Payment           from './pages/Payment';
import Dashboard         from './pages/Dashboard';
import About             from './pages/About';
import NotFound          from './pages/NotFound';
import Login             from './pages/Login';
import SignUp            from './pages/SignUp';
import LearningPage      from './pages/LearningPage';

import AdminHome      from './pages/admin/AdminHome';
import AdminDashboard from './pages/admin/AdminDashboard';

import { RoadmapPage }    from './pages/roadmap/RoadmapPage';
import RoadmapGenerator   from './pages/roadmap/RoadmapGenerator';

const HIDE_NAVBAR = ['/my-dashboard', '/about', '/cart/payment', '/admin', '/roadmap-generator'];
const HIDE_FOOTER = ['/my-dashboard', '/cart/payment', '/admin', '/roadmap-generator'];

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const hideNav    = HIDE_NAVBAR.some(p => location.pathname.startsWith(p));
  const hideFooter = HIDE_FOOTER.some(p => location.pathname.startsWith(p));

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#09090B] z-50">
      <BlurCircle top="200px" left="200px" /><BlurCircle top="-100px" right="100px" />
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading CareerAI…</p>
      </div>
    </div>
  );

  return (
    <>
      {!hideNav && <Navbar />}
      <Toaster richColors position="top-center" />
      <Chatbot />

      <Routes>
        {/* Public */}
        <Route path="/"          element={<Home />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/signup"    element={<SignUp />} />
        <Route path="/about"     element={<About />} />
        <Route path="/pathways"  element={<AllPathways />} />
        <Route path="/resources" element={<AllResources />} />
        <Route path="/resources/:resourceId"                    element={<ResourceDetails />} />
        <Route path="/comparison-tool-page"                     element={<ComparisonToolPage />} />
        <Route path="/roadmap"                                  element={<RoadmapPage />} />

        {/* Protected — any signed-in user */}
        <Route path="/pathways/:pathwayId" element={
          <ProtectedRoute><PathwayDetails /></ProtectedRoute>
        } />
        <Route path="/career-test" element={
          <ProtectedRoute><CareerTestPage /></ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        <Route path="/cart/:payment" element={
          <ProtectedRoute><Payment /></ProtectedRoute>
        } />
        <Route path="/my-dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/resources/learning-page/:resourceId" element={
          <ProtectedRoute><LearningPage /></ProtectedRoute>
        } />
        <Route path="/roadmap-generator" element={
          <ProtectedRoute><RoadmapGenerator /></ProtectedRoute>
        } />

        {/* Admin only */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/:dashboard" element={
          <ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>
        } />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
};

export default App;