import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AdBanner from '../components/AdBanner';
import { Trophy, Medal, Award, Flame, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { LeaderboardEntry } from '../types';

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const [showAd, setShowAd] = useState(user?.subscription === 'free');
  const [timeFilter, setTimeFilter] = useState<'all' | 'month' | 'week'>('all');

  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, name: 'CryptoMaster', points: 487, streak: 45 },
    { rank: 2, name: 'BlockchainKing', points: 423, streak: 38 },
    { rank: 3, name: 'SatoshiNinja', points: 398, streak: 32 },
    { rank: 4, name: 'DeFiQueen', points: 375, streak: 29 },
    { rank: 5, name: 'TokenTrader', points: 342, streak: 26 },
    { rank: 6, name: 'SmartContractor', points: 318, streak: 23 },
    { rank: 7, name: 'Web3Wizard', points: 295, streak: 21 },
    { rank: 8, name: 'NFTCollector', points: 276, streak: 19 },
    { rank: 9, name: 'AltcoinHunter', points: 254, streak: 17 },
    { rank: 10, name: 'MetaversePro', points: 231, streak: 15 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-gray-600 font-semibold">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default:
        return 'bg-white';
    }
  };

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Sıralama Tablosu 🏆</h1>
              <p className="text-gray-600">En yüksek puanlı kullanıcılar</p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeFilter === 'all'
                    ? 'gradient-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Tüm Zamanlar
              </button>
              <button
                onClick={() => setTimeFilter('month')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeFilter === 'month'
                    ? 'gradient-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Bu Ay
              </button>
              <button
                onClick={() => setTimeFilter('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeFilter === 'week'
                    ? 'gradient-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Bu Hafta
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {leaderboardData.slice(0, 3).map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getRankBg(entry.rank)} rounded-2xl p-6 text-center ${
                  entry.rank <= 3 ? 'text-white shadow-lg' : ''
                }`}
              >
                <div className="flex justify-center mb-4">
                  {getRankIcon(entry.rank)}
                </div>
                <h3 className="text-xl font-bold mb-2">{entry.name}</h3>
                <div className="flex items-center justify-center space-x-4 mb-3">
                  <div>
                    <p className={`text-3xl font-bold ${entry.rank <= 3 ? '' : 'text-purple-600'}`}>
                      {entry.points}
                    </p>
                    <p className={`text-sm ${entry.rank <= 3 ? 'text-white/80' : 'text-gray-600'}`}>
                      puan
                    </p>
                  </div>
                  <div className={`w-px h-12 ${entry.rank <= 3 ? 'bg-white/30' : 'bg-gray-300'}`}></div>
                  <div>
                    <p className={`text-2xl font-bold ${entry.rank <= 3 ? '' : 'text-orange-600'}`}>
                      {entry.streak}
                    </p>
                    <p className={`text-sm ${entry.rank <= 3 ? 'text-white/80' : 'text-gray-600'}`}>
                      seri
                    </p>
                  </div>
                </div>
                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                  entry.rank <= 3 ? 'bg-white/20' : 'bg-purple-100 text-purple-600'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>#{entry.rank}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sıra</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kullanıcı</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Puan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Seri</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboardData.map((entry, index) => (
                  <motion.tr
                    key={entry.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`hover:bg-gray-50 transition-colors ${
                      entry.name === user?.name ? 'bg-purple-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100">
                        {getRankIcon(entry.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                          {entry.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {entry.name}
                            {entry.name === user?.name && (
                              <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                                Sen
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-5 h-5 text-purple-600" />
                        <span className="text-lg font-bold text-gray-900">{entry.points}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Flame className="w-5 h-5 text-orange-500" />
                        <span className="text-lg font-bold text-gray-900">{entry.streak}</span>
                        <span className="text-sm text-gray-600">gün</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="font-semibold text-gray-900 mb-4">Senin Sıralaman</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">#{127}</p>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{user.points}</p>
                  <p className="text-sm text-gray-600">Puan</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{user.streak}</p>
                  <p className="text-sm text-gray-600">Seri</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
