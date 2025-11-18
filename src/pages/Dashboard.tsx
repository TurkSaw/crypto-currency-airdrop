import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AdBanner from '../components/AdBanner';
import { Trophy, Flame, Calendar, TrendingUp, ArrowRight, Zap, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showAd, setShowAd] = useState(user?.subscription === 'free');

  const stats = [
    { label: 'Toplam Puan', value: user?.points || 0, icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Seri', value: `${user?.streak || 0} gün`, icon: Flame, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Sıralama', value: '#127', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Bu Ay', value: '23 puan', icon: Calendar, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  const recentActivity = [
    { date: '2025-01-15', question: 'Blockchain nedir?', correct: true, points: 1 },
    { date: '2025-01-14', question: 'Bitcoin kimdir?', correct: true, points: 1 },
    { date: '2025-01-13', question: 'Smart contract nedir?', correct: false, points: 0 },
    { date: '2025-01-12', question: 'DeFi ne demek?', correct: true, points: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <h1 className="text-3xl font-bold mb-2">
            Merhaba, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Bugünkü soruyu henüz cevaplamadın. Hadi başlayalım!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Bugünkü Soru</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Kalan süre: 14s 23d</span>
              </div>
            </div>
            
            <div className="gradient-primary rounded-xl p-8 text-white mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-6 h-6" />
                  <span className="font-semibold">1 Puan Kazanma Şansı</span>
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Soru #156
                </span>
              </div>
              <p className="text-lg mb-6">
                Her gün yeni bir soru, her doğru cevap için 1 puan. Serini koru ve sıralamada yüksel!
              </p>
              <Link
                to="/daily-question"
                className="inline-flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <span>Soruyu Cevapla</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <Award className="w-6 h-6 text-purple-600 mb-2" />
                <p className="text-sm text-gray-600 mb-1">En Uzun Seri</p>
                <p className="text-xl font-bold text-purple-600">12 gün</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
                <p className="text-sm text-gray-600 mb-1">Doğruluk Oranı</p>
                <p className="text-xl font-bold text-green-600">87%</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-4">Son Aktiviteler</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className={`w-8 h-8 ${activity.correct ? 'bg-green-100' : 'bg-red-100'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {activity.correct ? (
                      <Trophy className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.question}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">{activity.date}</p>
                      <span className={`text-xs font-semibold ${activity.correct ? 'text-green-600' : 'text-gray-400'}`}>
                        {activity.correct ? `+${activity.points}` : '0'} puan
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/leaderboard" className="block text-center text-purple-600 hover:text-purple-700 font-semibold mt-4">
              Tüm Aktiviteleri Gör →
            </Link>
          </motion.div>
        </div>

        {user?.subscription === 'free' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Pro'ya Geç, Daha Fazla Kazan!</h3>
                <p className="text-purple-100">
                  Reklamsız deneyim ve özel avantajlar için hemen yükselt
                </p>
              </div>
              <Link
                to="/subscription"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all whitespace-nowrap"
              >
                Planları Görüntüle
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const X: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default Dashboard;
