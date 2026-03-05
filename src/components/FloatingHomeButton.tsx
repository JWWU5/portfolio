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
        className="w-14 h-14 bg-[#0D9488] rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#0F766E] group-hover:shadow-xl"
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
          <Dog className="w-7 h-7" />
        </motion.div>
      </motion.div>
      <motion.span 
        className="text-[10px] uppercase tracking-widest font-bold text-[#0D9488] bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm border border-teal-100"
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
