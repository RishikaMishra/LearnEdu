import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const steps = [
    { name: 'Nucleus', delay: 500, icon: '🔴' },
    { name: 'K Shell', delay: 800, icon: '🟡' },
    { name: 'L Shell', delay: 1100, icon: '🟠' },
    { name: 'Electrons', delay: 1400, icon: '🟢' },
    { name: 'Ready!', delay: 2000, icon: '✨' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].delay);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, steps, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center text-white">
          {/* Atom Building Animation */}
          <div className="relative w-64 h-64 mb-8">
            {/* Nucleus */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: currentStep >= 0 ? 1 : 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              🔴
            </motion.div>

            {/* K Shell */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-32 h-32 border-4 border-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: currentStep >= 1 ? 1 : 0 }}
              transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
            />

            {/* L Shell */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-48 h-48 border-4 border-orange-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: currentStep >= 2 ? 1 : 0 }}
              transition={{ duration: 0.5, type: "spring", delay: 0.4 }}
            />

            {/* Electrons */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
              <motion.div
                key={index}
                className="absolute w-4 h-4 bg-green-400 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  marginLeft: `${Math.cos(index * Math.PI / 4) * 24}px`,
                  marginTop: `${Math.sin(index * Math.PI / 4) * 24}px`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: currentStep >= 3 ? 1 : 0,
                  opacity: currentStep >= 3 ? 1 : 0
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.6 + index * 0.1,
                  type: "spring"
                }}
              />
            ))}
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex justify-center space-x-2 mb-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentStep ? 'bg-white' : 'bg-white/30'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>
            <motion.h2
              className="text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {steps[currentStep]?.name || 'Building...'}
            </motion.h2>
            <motion.div
              className="text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {steps[currentStep]?.icon || '⚛️'}
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto mb-8">
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="bg-white h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Loading Text */}
          <motion.p
            className="text-lg text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Preparing your atomic adventure...
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation; 