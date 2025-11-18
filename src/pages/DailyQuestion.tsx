import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AdBanner from '../components/AdBanner';
import { Clock, Lightbulb, ArrowRight, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DailyQuestion: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showAd, setShowAd] = useState(user?.subscription === 'free');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 23, seconds: 45 });

  const question = {
    id: '156',
    question: 'Blockchain teknolojisinin en temel özelliği nedir?',
    options: [
      'Merkeziyetsiz yapı',
      'Yüksek işlem hızı',
      'Düşük maliyet',
      'Kolay kullanım'
    ],
    correctAnswer: 0,
    difficulty: 'Orta'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setSubmitted(true);
    
    if (selectedAnswer === question.correctAnswer && user) {
      updateUser({
        points: user.points + 1,
        streak: user.streak + 1
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
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
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="gradient-primary p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Günün Sorusu</h1>
                  <p className="text-purple-100 text-sm">Soru #{question.id}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
                  <Clock className="w-5 h-5" />
                  <span className="font-mono font-semibold">
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-xs text-purple-100 mt-1">Sonraki soruya kalan süre</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  Zorluk: {question.difficulty}
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                  <Trophy className="w-4 h-4" />
                  <span>1 Puan</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-100">Serini sürdür</p>
                <p className="text-2xl font-bold">{user?.streak} 🔥</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {question.question}
              </h2>

              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => !submitted && setSelectedAnswer(index)}
                    disabled={submitted}
                    whileHover={!submitted ? { scale: 1.02 } : {}}
                    whileTap={!submitted ? { scale: 0.98 } : {}}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      submitted
                        ? index === question.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : selectedAnswer === index
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                        : selectedAnswer === index
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                    } ${submitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold ${
                          submitted
                            ? index === question.correctAnswer
                              ? 'bg-green-500 text-white'
                              : selectedAnswer === index
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                            : selectedAnswer === index
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-900 font-medium">{option}</span>
                      </div>
                      {submitted && (
                        <div>
                          {index === question.correctAnswer ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : selectedAnswer === index ? (
                            <XCircle className="w-6 h-6 text-red-500" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-6 rounded-xl mb-6 ${
                    selectedAnswer === question.correctAnswer
                      ? 'bg-green-50 border-2 border-green-500'
                      : 'bg-red-50 border-2 border-red-500'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {selectedAnswer === question.correctAnswer ? (
                      <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                    )}
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${
                        selectedAnswer === question.correctAnswer ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {selectedAnswer === question.correctAnswer ? 'Tebrikler! 🎉' : 'Maalesef 😔'}
                      </h3>
                      <p className={
                        selectedAnswer === question.correctAnswer ? 'text-green-700' : 'text-red-700'
                      }>
                        {selectedAnswer === question.correctAnswer
                          ? 'Doğru cevap! 1 puan kazandın ve serini sürdürdün.'
                          : `Doğru cevap: ${question.options[question.correctAnswer]}. Yarın tekrar dene!`
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>💡 İpucu: Blockchain merkeziyetsiz bir yapıya sahiptir</p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null || submitted}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedAnswer === null || submitted
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'gradient-primary text-white hover:shadow-lg'
                }`}
              >
                <span>{submitted ? 'Cevaplandı' : 'Cevabı Gönder'}</span>
                {!submitted && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Bugün Cevaplanan</p>
            <p className="text-2xl font-bold text-purple-600">3,247</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Doğru Cevap Oranı</p>
            <p className="text-2xl font-bold text-green-600">64%</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Ortalama Süre</p>
            <p className="text-2xl font-bold text-blue-600">1:23</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuestion;
