import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdBannerProps {
  onClose?: () => void;
}

const AdBanner: React.FC<AdBannerProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-4 rounded-lg relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">🎁 Özel Fırsat!</h3>
            <p className="text-sm opacity-90">
              Pro üyeliğe geçerek reklamlardan kurtulun ve özel avantajlardan yararlanın!
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-4 hover:bg-white/20 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdBanner;
