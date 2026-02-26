import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AdminLogin from '../../components/admin/AdminLogin';

const AdminHome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Get credentials from environment variables
  const ADMIN_EMAIL = import.meta.env.VITE_EMAIL_USER;
  const ADMIN_PASSWORD = import.meta.env.VITE_EMAIL_PASS;

  useEffect(() => {
    // Check if already logged in
    

    // Verify env variables are loaded
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.error('Admin credentials not configured in environment variables');
      toast.error('System configuration error');
    }
  }, [navigate, ADMIN_EMAIL, ADMIN_PASSWORD]);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Create secure token
        const authToken = btoa(`${email}:${Date.now()}`);
        localStorage.setItem('adminToken', authToken);
        
        toast.success('Authentication successful! Redirecting...');
        setTimeout(() => navigate('/admin/dashboard'), 1500);
      } else {
        toast.error('Invalid credentials');
        setErrors({
          email: ' ',
          password: 'Invalid email or password'
        });
      }
    } catch (err) {
      toast.error('Authentication failed');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLogin 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errors={errors}
      loading={loading}
      onSubmit={handleSubmit}
      adminEmailConfigured={!!ADMIN_EMAIL}
      adminPasswordConfigured={!!ADMIN_PASSWORD}
    />
  );
};

export default AdminHome;