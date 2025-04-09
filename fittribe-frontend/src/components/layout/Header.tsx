import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotificationDropdown from '../common/NotificationDropdown';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userRole, setUserRole] = React.useState('client');

  // This would be replaced with actual auth logic
  React.useEffect(() => {
    // Check if user is logged in from localStorage or context
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Get user role from localStorage or context
      const role = localStorage.getItem('userRole') || 'client';
      setUserRole(role);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <header className="bg-primary-800 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-display font-bold text-white">
              FitTribe.fitness
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`hover:text-accent-300 transition-colors ${pathname === '/' ? 'text-accent-300' : ''}`}>
              Home
            </Link>
            <Link href="/trainers" className={`hover:text-accent-300 transition-colors ${pathname === '/trainers' ? 'text-accent-300' : ''}`}>
              Find Trainers
            </Link>
            <Link href="/how-it-works" className={`hover:text-accent-300 transition-colors ${pathname === '/how-it-works' ? 'text-accent-300' : ''}`}>
              How It Works
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/booking" className={`hover:text-accent-300 transition-colors ${pathname === '/booking' ? 'text-accent-300' : ''}`}>
                  Book Session
                </Link>
                {userRole === 'client' && (
                  <Link href="/dashboard" className={`hover:text-accent-300 transition-colors ${pathname === '/dashboard' ? 'text-accent-300' : ''}`}>
                    Dashboard
                  </Link>
                )}
                {userRole === 'trainer' && (
                  <Link href="/trainer-dashboard" className={`hover:text-accent-300 transition-colors ${pathname === '/trainer-dashboard' ? 'text-accent-300' : ''}`}>
                    Trainer Dashboard
                  </Link>
                )}
                {userRole === 'admin' && (
                  <Link href="/admin" className={`hover:text-accent-300 transition-colors ${pathname === '/admin' ? 'text-accent-300' : ''}`}>
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <NotificationDropdown />
                <button
                  onClick={handleLogout}
                  className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-accent-300 transition-colors">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className={`hover:text-accent-300 transition-colors ${pathname === '/' ? 'text-accent-300' : ''}`}>
                Home
              </Link>
              <Link href="/trainers" className={`hover:text-accent-300 transition-colors ${pathname === '/trainers' ? 'text-accent-300' : ''}`}>
                Find Trainers
              </Link>
              <Link href="/how-it-works" className={`hover:text-accent-300 transition-colors ${pathname === '/how-it-works' ? 'text-accent-300' : ''}`}>
                How It Works
              </Link>
              {isLoggedIn && (
                <>
                  <Link href="/booking" className={`hover:text-accent-300 transition-colors ${pathname === '/booking' ? 'text-accent-300' : ''}`}>
                    Book Session
                  </Link>
                  {userRole === 'client' && (
                    <Link href="/dashboard" className={`hover:text-accent-300 transition-colors ${pathname === '/dashboard' ? 'text-accent-300' : ''}`}>
                      Dashboard
                    </Link>
                  )}
                  {userRole === 'trainer' && (
                    <Link href="/trainer-dashboard" className={`hover:text-accent-300 transition-colors ${pathname === '/trainer-dashboard' ? 'text-accent-300' : ''}`}>
                      Trainer Dashboard
                    </Link>
                  )}
                  {userRole === 'admin' && (
                    <Link href="/admin" className={`hover:text-accent-300 transition-colors ${pathname === '/admin' ? 'text-accent-300' : ''}`}>
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center space-x-4 pt-2">
                    <NotificationDropdown />
                    <button
                      onClick={handleLogout}
                      className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
              {!isLoggedIn && (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link href="/login" className="text-white hover:text-accent-300 transition-colors">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg transition-colors text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
