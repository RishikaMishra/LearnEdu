import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
import AtomVisualizer from './components/AtomVisualizer';
import InfoPanel from './components/InfoPanel';
import QuizSection from './components/QuizSection';
import MiniPeriodicTable from './components/MiniPeriodicTable';
import FullPeriodicTable from './components/FullPeriodicTable';
import DarkModeToggle from './components/DarkModeToggle';
import IntroAnimation from './components/IntroAnimation';

function AppContent() {
  const [atomicNumber, setAtomicNumber] = useState(1);
  const [activeTab, setActiveTab] = useState('visualizer');
  const [showIntro, setShowIntro] = useState(true);
  const { isDarkMode } = useDarkMode();

  const handleAtomicNumberChange = (newNumber) => {
    setAtomicNumber(newNumber);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      {/* Header */}
      <motion.header 
        className={`shadow-lg border-b transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.h1 
              className={`text-3xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              🧪 Atomic Structure Explorer
            </motion.h1>
            <div className="flex items-center space-x-4">
              <p className={`text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Interactive Learning for Class 10
              </p>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <motion.div 
          className={`flex space-x-1 p-1 rounded-xl shadow-lg mb-8 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-white'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { id: 'visualizer', label: 'Atom Visualizer', icon: '🔬' },
            { id: 'periodic', label: 'Periodic Table', icon: '📊' },
            { id: 'info', label: 'Learn', icon: '📚' },
            { id: 'quiz', label: 'Quiz', icon: '🧩' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content based on active tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'visualizer' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Atom Visualizer */}
              <div className="lg:col-span-2">
                <AtomVisualizer 
                  atomicNumber={atomicNumber}
                  onAtomicNumberChange={handleAtomicNumberChange}
                />
              </div>
              
              {/* Side Panel */}
              <div className="space-y-6">
                {/* Mini Periodic Table */}
                <MiniPeriodicTable 
                  onElementSelect={(z) => { setAtomicNumber(z); }}
                  selectedAtomicNumber={atomicNumber}
                />
                
                {/* Quick Info */}
                <div className={`card transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : ''
                }`}>
                  <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Quick Facts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Element:</span>
                      <span className={`font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>{getElementName(atomicNumber)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Symbol:</span>
                      <span className={`font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>{getElementSymbol(atomicNumber)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Atomic Number:</span>
                      <span className={`font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>{atomicNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Mass Number:</span>
                      <span className={`font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>{getMassNumber(atomicNumber)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Electronic Configuration */}
                <div className={`card transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : ''
                }`}>
                  <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Electronic Configuration
                  </h3>
                  <div className="text-sm space-y-2">
                    {getElectronicConfiguration(atomicNumber).map((shell, index) => (
                      <div key={index} className="flex justify-between">
                        <span className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {String.fromCharCode(75 + index)} Shell ({index + 1}{getOrdinalSuffix(index + 1)}):
                        </span>
                        <span className={`font-medium transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>{shell} electrons</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'periodic' && (
            <FullPeriodicTable 
              onElementSelect={(z) => { setAtomicNumber(z); }}
              selectedAtomicNumber={atomicNumber}
              onViewAtom={(z) => { setAtomicNumber(z); setActiveTab('visualizer'); }}
            />
          )}

          {activeTab === 'info' && (
            <InfoPanel />
          )}

          {activeTab === 'quiz' && (
            <QuizSection />
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        className={`border-t transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className={`text-center transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © 2024 Atomic Structure Explorer. Built with React, Framer Motion, and Tailwind CSS.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

// Helper functions for element data
function getElementName(atomicNumber) {
  const elements = {
    1: 'Hydrogen', 2: 'Helium', 3: 'Lithium', 4: 'Beryllium', 5: 'Boron',
    6: 'Carbon', 7: 'Nitrogen', 8: 'Oxygen', 9: 'Fluorine', 10: 'Neon',
    11: 'Sodium', 12: 'Magnesium', 13: 'Aluminum', 14: 'Silicon', 15: 'Phosphorus',
    16: 'Sulfur', 17: 'Chlorine', 18: 'Argon', 19: 'Potassium', 20: 'Calcium'
  };
  return elements[atomicNumber] || 'Unknown';
}

function getElementSymbol(atomicNumber) {
  const symbols = {
    1: 'H', 2: 'He', 3: 'Li', 4: 'Be', 5: 'B',
    6: 'C', 7: 'N', 8: 'O', 9: 'F', 10: 'Ne',
    11: 'Na', 12: 'Mg', 13: 'Al', 14: 'Si', 15: 'P',
    16: 'S', 17: 'Cl', 18: 'Ar', 19: 'K', 20: 'Ca'
  };
  return symbols[atomicNumber] || '?';
}

function getMassNumber(atomicNumber) {
  // Approximate mass numbers for elements 1-20
  const massNumbers = {
    1: 1, 2: 4, 3: 7, 4: 9, 5: 11,
    6: 12, 7: 14, 8: 16, 9: 19, 10: 20,
    11: 23, 12: 24, 13: 27, 14: 28, 15: 31,
    16: 32, 17: 35.5, 18: 40, 19: 39, 20: 40
  };
  return massNumbers[atomicNumber] || atomicNumber * 2;
}

function getElectronicConfiguration(atomicNumber) {
  const shells = [];
  let remainingElectrons = atomicNumber;
  
  // K shell (n=1): max 2 electrons
  const kShell = Math.min(2, remainingElectrons);
  shells.push(kShell);
  remainingElectrons -= kShell;
  
  // L shell (n=2): max 8 electrons
  if (remainingElectrons > 0) {
    const lShell = Math.min(8, remainingElectrons);
    shells.push(lShell);
    remainingElectrons -= lShell;
  }
  
  // M shell (n=3): max 18 electrons, but for simplicity we'll use 8 for elements 1-20
  if (remainingElectrons > 0) {
    const mShell = Math.min(8, remainingElectrons);
    shells.push(mShell);
    remainingElectrons -= mShell;
  }
  
  // N shell (n=4): remaining electrons
  if (remainingElectrons > 0) {
    shells.push(remainingElectrons);
  }
  
  return shells;
}

// Helper function to get ordinal suffix
function getOrdinalSuffix(num) {
  if (num === 1) return 'st';
  if (num === 2) return 'nd';
  if (num === 3) return 'rd';
  return 'th';
}

export default App; 