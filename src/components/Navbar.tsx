import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Coins, Trophy, User, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              CryptoQuest
            </span>
          </Link>

          {user && (
            <>
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/daily-question" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Günlük Soru
                </Link>
                <Link to="/leaderboard" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Sıralama
                </Link>
                <Link to="/subscription" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Abonelik
                </Link>
                
                <div className="flex items-center space-x-4 border-l pl-4">
                  <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1.5 rounded-lg">
                    <Trophy className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-purple-600">{user.points}</span>
                  </div>
                  
                  <div className="relative group">
                    <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-600">
                      <User className="w-5 h-5" />
                      <span className="text-sm font-medium">{user.name}</span>
                    </button>
                    
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50">
                        <Settings className="w-4 h-4" />
                        <span>Ayarlar</span>
                      </Link>
                      <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 w-full text-left text-red-600">
                        <LogOut className="w-4 h-4" />
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && user && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-3">
              <div className="flex items-center justify-between bg-purple-50 px-4 py-3 rounded-lg">
                <span className="font-medium">{user.name}</span>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-purple-600">{user.points}</span>
                </div>
              </div>
              
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700">
                Dashboard
              </Link>
              <Link to="/daily-question" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700">
                Günlük Soru
              </Link>
              <Link to="/leaderboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700">
                Sıralama
              </Link>
              <Link to="/subscription" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700">
                Abonelik
              </Link>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700">
                Ayarlar
              </Link>
              <button onClick={handleLogout} className="block py-2 text-red-600 w-full text-left">
                Çıkış Yap
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
