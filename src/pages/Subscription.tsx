import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AdBanner from '../components/AdBanner';
import { Check, Crown, Zap, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { SubscriptionPlan } from '../types';

const Subscription: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [showAd, setShowAd] = useState(user?.subscription === 'free');

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: '₺0',
      period: '/ay',
      features: [
        'Günlük sorulara erişim',
        'Puan toplama',
        'Sıralama tablosunda görünme',
        'Temel istatistikler',
        'Reklamlar var'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$0.99',
      period: '/ay',
      popular: true,
      features: [
        'Tüm Free özellikler',
        'Reklamsız deneyim',
        'Öncelikli destek',
        'Özel rozet',
        'Detaylı istatistikler',
        'Erken erişim özellikleri'
      ]
    },
    {
      id: 'ultra_pro',
      name: 'Ultra Pro',
      price: '$9.99',
      period: '/yıl',
      features: [
        'Tüm Pro özellikler',
        '%17 tasarruf ($11.88 yerine $9.99)',
        'VIP destek',
        'Özel altın rozet',
        'Premium istatistikler',
        'Bonus puanlar',
        'Özel etkinliklere erişim'
      ]
    }
  ];

  const handleUpgrade = (planId: string) => {
    if (user) {
      updateUser({ subscription: planId as 'free' | 'pro' | 'ultra_pro' });
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free':
        return <Zap className="w-6 h-6" />;
      case 'pro':
        return <Star className="w-6 h-6" />;
      case 'ultra_pro':
        return <Crown className="w-6 h-6" />;
      default:
        return <Shield className="w-6 h-6" />;
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Planını Seç
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            İhtiyacına uygun planı seç ve daha fazla özellikten yararlan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-4 ring-purple-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-semibold">
                  En Popüler
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'pt-14' : ''}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  plan.id === 'free' ? 'bg-gray-100 text-gray-600' :
                  plan.id === 'pro' ? 'gradient-primary text-white' :
                  'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                }`}>
                  {getPlanIcon(plan.id)}
                </div>
                
                <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
                
                <div className="text-center mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 text-lg">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={user?.subscription === plan.id}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    user?.subscription === plan.id
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : plan.id === 'free'
                      ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      : plan.id === 'pro'
                      ? 'gradient-primary text-white hover:shadow-lg'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:shadow-lg'
                  }`}
                >
                  {user?.subscription === plan.id ? 'Mevcut Plan' : 
                   plan.id === 'free' ? 'Başla' : 'Yükselt'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
            <h2 className="text-3xl font-bold mb-4 text-center">Neden Premium?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Reklamsız</h3>
                <p className="text-purple-100 text-sm">
                  Kesintisiz deneyim için reklamlardan kurtulun
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Özel Özellikler</h3>
                <p className="text-purple-100 text-sm">
                  Sadece premium üyelere özel içeriklere erişin
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">VIP Destek</h3>
                <p className="text-purple-100 text-sm">
                  Öncelikli müşteri desteğinden yararlanın
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Sıkça Sorulan Sorular</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Aboneliğimi iptal edebilir miyim?</h3>
                <p className="text-gray-600">
                  Evet, istediğiniz zaman iptal edebilirsiniz. İptal sonrası mevcut dönem sonuna kadar özelliklerden yararlanmaya devam edersiniz.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Ödeme güvenli mi?</h3>
                <p className="text-gray-600">
                  Evet, tüm ödemeler güvenli SSL şifrelemesi ile korunmaktadır.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Plan değişikliği yapabilir miyim?</h3>
                <p className="text-gray-600">
                  Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;
