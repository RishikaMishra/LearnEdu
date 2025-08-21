import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';

const AtomVisualizer = ({ atomicNumber, onAtomicNumberChange }) => {
  const { isDarkMode } = useDarkMode();
  const [excitedElectrons, setExcitedElectrons] = useState(new Set());
  const [photons, setPhotons] = useState([]);

  const getElementName = (atomicNumber) => {
    const elements = {
      1: 'Hydrogen', 2: 'Helium', 3: 'Lithium', 4: 'Beryllium', 5: 'Boron',
      6: 'Carbon', 7: 'Nitrogen', 8: 'Oxygen', 9: 'Fluorine', 10: 'Neon',
      11: 'Sodium', 12: 'Magnesium', 13: 'Aluminum', 14: 'Silicon', 15: 'Phosphorus',
      16: 'Sulfur', 17: 'Chlorine', 18: 'Argon', 19: 'Potassium', 20: 'Calcium'
    };
    return elements[atomicNumber] || `Z=${atomicNumber}`;
  };

  const getElementSymbol = (atomicNumber) => {
    const symbols = {
      1: 'H', 2: 'He', 3: 'Li', 4: 'Be', 5: 'B',
      6: 'C', 7: 'N', 8: 'O', 9: 'F', 10: 'Ne',
      11: 'Na', 12: 'Mg', 13: 'Al', 14: 'Si', 15: 'P',
      16: 'S', 17: 'Cl', 18: 'Ar', 19: 'K', 20: 'Ca'
    };
    return symbols[atomicNumber] || `${atomicNumber}`;
  };

  const getMassNumber = (atomicNumber) => {
    const massNumbers = {
      1: 1, 2: 4, 3: 7, 4: 9, 5: 11,
      6: 12, 7: 14, 8: 16, 9: 19, 10: 20,
      11: 23, 12: 24, 13: 27, 14: 28, 15: 31,
      16: 32, 17: 35.5, 18: 40, 19: 39, 20: 40
    };
    return massNumbers[atomicNumber] || Math.round(atomicNumber * 2);
  };

  // General electron distribution using 2n^2 rule across shells 1..7
  const getElectronicConfiguration = (z) => {
    const shells = [];
    let remaining = z;
    let n = 1;
    while (remaining > 0 && n <= 7) {
      const capacity = 2 * n * n; // 2n^2
      const electronsInThisShell = Math.min(capacity, remaining);
      shells.push(electronsInThisShell);
      remaining -= electronsInThisShell;
      n += 1;
    }
    if (remaining > 0) shells.push(remaining);
    return shells;
  };

  const getOrdinalSuffix = (num) => {
    if (num === 1) return 'st';
    if (num === 2) return 'nd';
    if (num === 3) return 'rd';
    return 'th';
  };

  const handleElectronClick = (shellIndex, electronIndex) => {
    const electronKey = `${shellIndex}-${electronIndex}`;
    if (excitedElectrons.has(electronKey)) {
      setExcitedElectrons((prev) => {
        const next = new Set(prev);
        next.delete(electronKey);
        return next;
      });
      const newPhoton = { id: Date.now(), x: Math.random() * 200 - 100, y: Math.random() * 200 - 100 };
      setPhotons((prev) => [...prev, newPhoton]);
      setTimeout(() => {
        setPhotons((prev) => prev.filter((p) => p.id !== newPhoton.id));
      }, 2000);
    } else {
      setExcitedElectrons((prev) => new Set([...prev, electronKey]));
    }
  };

  const shells = getElectronicConfiguration(atomicNumber);
  const shellCount = shells.length;
  // Dynamic radii to fit up to 7 shells in a 384px tall container
  const baseRadius = 50;
  const step = 24;
  const shellRadii = Array.from({ length: shellCount }, (_, i) => baseRadius + i * step);

  return (
    <div className={`card transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Interactive Atom Model
        </h2>
        <div className="mb-4">
          <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Atomic Number:
          </label>
          <input
            type="number"
            min="1"
            max="118"
            value={atomicNumber}
            onChange={(e) => {
              const v = Math.max(1, Math.min(118, parseInt(e.target.value || '1', 10)));
              onAtomicNumberChange(v);
            }}
            className={`w-32 px-3 py-2 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-800'}`}
          />
          <span className={`ml-2 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            (1-118)
          </span>
        </div>
        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg transition-colors duration-300`}>
          <h3 className={`${isDarkMode ? 'text-blue-300' : 'text-blue-800'} text-lg font-semibold transition-colors duration-300`}>
            {getElementName(atomicNumber)} ({getElementSymbol(atomicNumber)})
          </h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-blue-700'} text-sm transition-colors duration-300`}>
            Atomic Number: {atomicNumber} | Mass Number: {getMassNumber(atomicNumber)}
          </p>
        </div>
      </div>

      <div className="relative w-full h-96 flex items-center justify-center">
        {shells.map((electronCount, shellIndex) => (
          <div
            key={shellIndex}
            className="atom-shell"
            style={{
              width: `${shellRadii[shellIndex] * 2}px`,
              height: `${shellRadii[shellIndex] * 2}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {String.fromCharCode(75 + shellIndex)} Shell ({shellIndex + 1}{getOrdinalSuffix(shellIndex + 1)})
            </div>
            {Array.from({ length: electronCount }, (_, electronIndex) => {
              const angle = (electronIndex * 2 * Math.PI) / electronCount;
              const x = Math.cos(angle) * shellRadii[shellIndex];
              const y = Math.sin(angle) * shellRadii[shellIndex];
              const electronKey = `${shellIndex}-${electronIndex}`;
              const isExcited = excitedElectrons.has(electronKey);
              return (
                <motion.div
                  key={electronIndex}
                  className={`electron ${isExcited ? 'bg-yellow-400' : ''}`}
                  style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
                  onClick={() => handleElectronClick(shellIndex, electronIndex)}
                  whileHover={{ scale: 1.5 }}
                  animate={{ scale: isExcited ? [1, 1.2, 1] : 1, transition: { duration: 0.5, repeat: isExcited ? Infinity : 0 } }}
                  title={`Click to ${isExcited ? 'return to ground state' : 'excite electron'}`}
                />
              );
            })}
          </div>
        ))}

        <div className="nucleus absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-center">
            <div className="text-xs mb-1">{getElementSymbol(atomicNumber)}</div>
            <div className="flex flex-wrap justify-center gap-1">
              {Array.from({ length: Math.min(atomicNumber, 8) }, (_, i) => (
                <div key={i} className={`proton ${i < atomicNumber ? 'opacity-100' : 'opacity-30'}`} />
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {photons.map((photon) => (
            <motion.div
              key={photon.id}
              className="photon absolute"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ x: photon.x, y: photon.y, scale: [0, 1, 0], opacity: [1, 1, 0] }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6">
        <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Electronic Configuration
        </h3>
        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors duration-300`}>
          <div className="text-sm space-y-2">
            {shells.map((shell, index) => (
              <div key={index} className="flex justify-between">
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                  {String.fromCharCode(75 + index)} Shell ({index + 1}{getOrdinalSuffix(index + 1)}):
                </span>
                <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'} font-medium transition-colors duration-300`}>
                  {shell} electrons
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className={`${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'} text-sm transition-colors duration-300`}>
          💡 <strong>Tip:</strong> Click an electron to excite it, then click again to emit a photon as it returns to ground state.
        </p>
      </div>
    </div>
  );
};

export default AtomVisualizer; 