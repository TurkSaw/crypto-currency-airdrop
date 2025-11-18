import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Shield, Smartphone, Key, CheckCircle, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

const TwoFactorSetup: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes] = useState([
    'ABCD-1234-EFGH',
    'IJKL-5678-MNOP',
    'QRST-9012-UVWX',
    'YZAB-3456-CDEF',
    'GHIJ-7890-KLMN',
    'OPQR-1234-STUV',
  ]);

  const secretKey = 'JBSWY3DPEHPK3PXP';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/CryptoQuest:${user?.email}?secret=${secretKey}&issuer=CryptoQuest`;

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      setStep(3);
      if (user) {
        updateUser({ twoFactorEnabled: true });
      }
    }
  };

  const handleFinish = () => {
    navigate('/profile');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">İki Faktörlü Doğrulama</h1>
          <p className="text-gray-600">Hesabınızı ekstra güvenlik katmanı ile koruyun</p>
        </motion.div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step >= s ? 'gradient-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    step > s ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-600">QR Kod</span>
            <span className="text-sm text-gray-600">Doğrulama</span>
            <span className="text-sm text-gray-600">Yedek Kodlar</span>
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          {step === 1 && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Authenticator Uygulaması</h2>
                  <p className="text-gray-600">Google Authenticator veya benzer bir uygulama kullanın</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  1. Telefonunuza Google Authenticator veya benzeri bir uygulama indirin
                  <br />
                  2. Uygulamada QR kod okutma seçeneğini açın
                  <br />
                  3. Aşağıdaki QR kodu okutun
                </p>

                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="w-48 h-48 border-4 border-white rounded-lg shadow-md"
                  />
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">veya manuel olarak girin:</p>
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg">
                      <code className="text-sm font-mono">{secretKey}</code>
                      <button
                        onClick={() => copyToClipboard(secretKey)}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full gradient-primary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Devam Et
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Doğrulama Kodu</h2>
                  <p className="text-gray-600">Authenticator uygulamanızdaki 6 haneli kodu girin</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doğrulama Kodu
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-center text-2xl font-mono tracking-widest"
                  maxLength={6}
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  Geri
                </button>
                <button
                  onClick={handleVerify}
                  disabled={verificationCode.length !== 6}
                  className="flex-1 gradient-primary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Doğrula
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Yedek Kodlar</h2>
                  <p className="text-gray-600">Bu kodları güvenli bir yerde saklayın</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
                <div className="flex items-start space-x-3 mb-4">
                  <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    <strong>Önemli:</strong> Authenticator uygulamanıza erişiminizi kaybederseniz, bu kodları kullanarak hesabınıza giriş yapabilirsiniz. Her kod sadece bir kez kullanılabilir.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {backupCodes.map((code, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded-lg flex items-center justify-between"
                    >
                      <code className="text-sm font-mono">{code}</code>
                      <button
                        onClick={() => copyToClipboard(code)}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => copyToClipboard(backupCodes.join('\n'))}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
                >
                  <Copy className="w-5 h-5" />
                  <span>Tümünü Kopyala</span>
                </button>
                <button
                  onClick={handleFinish}
                  className="flex-1 gradient-primary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Tamamla
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {step < 3 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800">
                  <strong>İpucu:</strong> İki faktörlü doğrulama, hesabınızı yetkisiz erişime karşı korur. Giriş yaparken şifrenize ek olarak telefonunuzdaki uygulamadan bir kod girmeniz gerekecek.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoFactorSetup;
