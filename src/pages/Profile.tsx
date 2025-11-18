import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AdBanner from '../components/AdBanner';
import { User, Mail, Lock, Shield, Bell, Globe, Save, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [showAd, setShowAd] = useState(user?.subscription === 'free');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    if (user) {
      updateUser({ name, email });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showAd && user?.subscription === 'free' && (
          <div className="mb-6">
            <AdBanner onClose={() => setShowAd(false)} />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Profil Ayarları</h1>
          <p className="text-gray-600">Hesap bilgilerini ve tercihlerini yönet</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                  {user?.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold mb-1">{user?.name}</h2>
                <p className="text-gray-600 mb-4">{user?.email}</p>
                
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  user?.subscription === 'ultra_pro'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    : user?.subscription === 'pro'
                    ? 'gradient-primary text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {user?.subscription !== 'free' && <Crown className="w-4 h-4" />}
                  <span className="font-semibold">
                    {user?.subscription === 'ultra_pro' ? 'Ultra Pro' :
                     user?.subscription === 'pro' ? 'Pro' : 'Free'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Toplam Puan</span>
                  <span className="font-bold text-purple-600">{user?.points}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Seri</span>
                  <span className="font-bold text-orange-600">{user?.streak} gün</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Üyelik</span>
                  <span className="text-sm text-gray-500">
                    {new Date(user?.createdAt || '').toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>

              {user?.subscription === 'free' && (
                <Link
                  to="/subscription"
                  className="block mt-6 w-full gradient-primary text-white text-center py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Premium'a Geç
                </Link>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <User className="w-5 h-5 text-purple-600" />
                <span>Kişisel Bilgiler</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Adresi
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Save className="w-5 h-5" />
                  <span>Değişiklikleri Kaydet</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <span>Güvenlik</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Şifre</p>
                      <p className="text-sm text-gray-600">Son değişiklik: 30 gün önce</p>
                    </div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 font-semibold">
                    Değiştir
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium">İki Faktörlü Doğrulama</p>
                      <p className="text-sm text-gray-600">
                        {user?.twoFactorEnabled ? 'Aktif' : 'Pasif'}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/2fa-setup"
                    className="text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    {user?.twoFactorEnabled ? 'Yönet' : 'Aktifleştir'}
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <Bell className="w-5 h-5 text-purple-600" />
                <span>Bildirimler</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Email Bildirimleri</p>
                      <p className="text-sm text-gray-600">Günlük sorular ve güncellemeler</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <Globe className="w-5 h-5 text-purple-600" />
                <span>Tercihler</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dil
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Saat Dilimi
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    <option value="UTC+3">Istanbul (UTC+3)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
