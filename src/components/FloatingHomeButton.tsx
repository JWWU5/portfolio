import React from 'react';
import { motion } from 'motion/react';
import { Dog } from 'lucide-react';

interface FloatingHomeButtonProps {
  onClick: () => void;
}

export const FloatingHomeButton: React.FC<FloatingHomeButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-12 right-8 z-50 flex flex-col items-center gap-2 group"
    >
      <motion.div 
        className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-2xl flex items-center justify-center text-white transition-all duration-500 group-hover:bg-[#8c7355] group-hover:scale-110"
        variants={{
          hover: { y: -5 }
        }}
      >
        <motion.div
          variants={{
            hover: { 
              rotate: [0, -10, 10, -10, 10, 0],
              transition: { duration: 0.5 }
            }
          }}
        >
          <Dog className="w-6 h-6" />
        </motion.div>
      </motion.div>
      <motion.span 
        className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#8c7355] bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg border border-[#e5e1d8]"
        variants={{
          hover: { opacity: 1, y: 0 },
          initial: { opacity: 0, y: 10 }
        }}
        initial="initial"
      >
        Back to Home
      </motion.span>
    </motion.button>
  );
};
