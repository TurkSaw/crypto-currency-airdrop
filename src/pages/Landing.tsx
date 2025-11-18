import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coins, Trophy, Gift, Zap, Users, Shield, ArrowRight, Check, X } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CryptoQuest
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Giriş Yap
              </Link>
              <Link to="/register" className="gradient-primary text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-medium">
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
            <Gift className="w-4 h-4" />
            <span className="text-sm font-semibold">Airdrop Yakında Başlıyor!</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Günlük Sorularla
            <br />
            Kripto Kazan
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Her gün yeni bir soru, her doğru cevap için puan kazan ve airdrop lansmanında büyük ödülleri yakala!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link to="/register" className="gradient-primary text-white px-8 py-4 rounded-lg hover:shadow-xl transition-all font-semibold text-lg flex items-center space-x-2 w-full sm:w-auto justify-center">
              <span>Hemen Başla</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#features" className="bg-white text-purple-600 px-8 py-4 rounded-lg border-2 border-purple-600 hover:bg-purple-50 transition-all font-semibold text-lg w-full sm:w-auto text-center">
              Nasıl Çalışır?
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-2xl mb-2">5,000+</h3>
              <p className="text-gray-600">Aktif Kullanıcı</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-2xl mb-2">50,000</h3>
              <p className="text-gray-600">Toplam Ödül</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 gradient-success rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-2xl mb-2">100%</h3>
              <p className="text-gray-600">Ücretsiz Katılım</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nasıl Çalışır?</h2>
            <p className="text-xl text-gray-600">Sadece 3 basit adımda kripto kazanmaya başla</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Kayıt Ol</h3>
              <p className="text-gray-600">
                Email ve şifren ile ücretsiz hesap oluştur. 2FA ile güvenliğini artır.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Soruları Cevapla</h3>
              <p className="text-gray-600">
                Her gün UTC 00:00'da yeni soru. Doğru cevapla 1 puan kazan!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 gradient-success rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Ödülleri Topla</h3>
              <p className="text-gray-600">
                Airdrop lansmanında puanlarını kripto para ile değiştir!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Abonelik Planları</h2>
            <p className="text-xl text-purple-100">İhtiyacına uygun planı seç</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-gray-600 mb-6">Başlangıç için ideal</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₺0</span>
                <span className="text-gray-600">/ay</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Günlük sorulara erişim</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Sıralama tablosu</span>
                </li>
                <li className="flex items-start space-x-2">
                  <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">Reklamlar var</span>
                </li>
              </ul>
              <Link to="/register" className="block w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold text-center hover:bg-gray-200 transition-colors">
                Başla
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 ring-4 ring-purple-500 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Popüler
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-gray-600 mb-6">Reklamsız deneyim</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0.99</span>
                <span className="text-gray-600">/ay</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Tüm Free özellikler</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Reklamsız kullanım</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Öncelikli destek</span>
                </li>
              </ul>
              <Link to="/register" className="block w-full gradient-primary text-white py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all">
                Pro'ya Geç
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-2">Ultra Pro</h3>
              <p className="text-gray-600 mb-6">En iyi değer</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-gray-600">/yıl</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Tüm Pro özellikler</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">%17 tasarruf</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Özel rozet</span>
                </li>
              </ul>
              <Link to="/register" className="block w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all">
                Ultra Pro'ya Geç
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold mb-6">Güvenlik Önceliğimiz</h2>
              <p className="text-xl text-gray-600 mb-8">
                Verilerinizin güvenliği için en son teknolojileri kullanıyoruz.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">2FA Doğrulama</h3>
                    <p className="text-gray-600">İki faktörlü kimlik doğrulama ile ekstra güvenlik</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Şifreli Veri</h3>
                    <p className="text-gray-600">Tüm verileriniz şifreli olarak saklanır</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Düzenli Denetim</h3>
                    <p className="text-gray-600">Güvenlik protokollerimiz sürekli güncellenir</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center">
                <Shield className="w-48 h-48 text-white opacity-20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="gradient-primary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Hemen Başla ve Kazanmaya Başla!
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Kayıt ol, soruları cevapla ve airdrop lansmanında büyük ödülleri kazan!
            </p>
            <Link to="/register" className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-lg hover:shadow-xl transition-all font-semibold text-lg">
              <span>Ücretsiz Kayıt Ol</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CryptoQuest</span>
              </div>
              <p className="text-gray-400">
                Günlük sorularla kripto kazanın.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Ürün</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Özellikler</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fiyatlandırma</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SSS</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Şirket</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Yasal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Gizlilik</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Şartlar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Çerezler</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CryptoQuest. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
