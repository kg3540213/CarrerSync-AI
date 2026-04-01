import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, ShoppingCart, TicketPlus, XIcon, LogOut, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart';
import { toast } from 'sonner';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isSignedIn, logout } = useAuth();
  const { count: cartCount } = useCart();
  const navigate = useNavigate();

  const close = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/');
    close();
  };

  const navLinks = [
    { to: '/',                    label: 'Home'        },
    { to: '/pathways',            label: 'Pathways'    },
    { to: '/resources',           label: 'Resources'   },
    { to: '/comparison-tool-page', label: 'Career Tool' },
    { to: '/roadmap',             label: 'Roadmap AI'  },
  ];

  return (
    <div className="fixed top-0 left-0 z-[9999] w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">

      {/* Logo */}
      <Link to="/" onClick={close} className="flex items-center gap-2 flex-shrink-0">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center shadow-lg">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight hidden sm:block">CareerAI</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map(({ to, label }) => (
          <Link key={to} to={to} onClick={() => scrollTo(0, 0)}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/60 transition-all">
            {label}
          </Link>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-3">

        {/* Cart */}
        <button
          onClick={() => {
            if (!isSignedIn) { toast('Please login first'); return; }
            navigate('/cart'); scrollTo(0, 0);
          }}
          className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <ShoppingCart className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold bg-primary text-white rounded-full flex items-center justify-center">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </button>

        {/* Auth */}
        {!isSignedIn ? (
          <button onClick={() => navigate('/login')}
            className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-white rounded-xl transition-all shadow-sm">
            Login
          </button>
        ) : (
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all border border-gray-700">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/60 to-pink-600/60 flex items-center justify-center text-[10px] font-bold">
                {user?.firstName?.[0]}
              </div>
              <span className="max-w-[80px] truncate">{user?.firstName}</span>
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-1 w-52 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-800">
                <p className="text-sm font-medium text-white truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <Link to="/my-dashboard" onClick={close}
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                <TicketPlus className="w-4 h-4" /> Dashboard
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin/dashboard" onClick={close}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-amber-400 hover:bg-gray-800 transition-colors">
                  ⚡ Admin Panel
                </Link>
              )}
              <button onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors border-t border-gray-800">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        )}

        {/* Mobile menu toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors">
          {isOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 px-6 py-4 space-y-1">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => { close(); scrollTo(0, 0); }}
              className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;