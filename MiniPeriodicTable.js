import React from 'react';
import { motion } from 'framer-motion';

const MiniPeriodicTable = ({ onElementSelect, selectedAtomicNumber }) => {
  const elements = [
    { number: 1, symbol: 'H', name: 'Hydrogen', group: 1, period: 1, category: 'nonmetal' },
    { number: 2, symbol: 'He', name: 'Helium', group: 18, period: 1, category: 'noble' },
    { number: 3, symbol: 'Li', name: 'Lithium', group: 1, period: 2, category: 'alkali' },
    { number: 4, symbol: 'Be', name: 'Beryllium', group: 2, period: 2, category: 'alkaline' },
    { number: 5, symbol: 'B', name: 'Boron', group: 13, period: 2, category: 'metalloid' },
    { number: 6, symbol: 'C', name: 'Carbon', group: 14, period: 2, category: 'nonmetal' },
    { number: 7, symbol: 'N', name: 'Nitrogen', group: 15, period: 2, category: 'nonmetal' },
    { number: 8, symbol: 'O', name: 'Oxygen', group: 16, period: 2, category: 'nonmetal' },
    { number: 9, symbol: 'F', name: 'Fluorine', group: 17, period: 2, category: 'halogen' },
    { number: 10, symbol: 'Ne', name: 'Neon', group: 18, period: 2, category: 'noble' },
    { number: 11, symbol: 'Na', name: 'Sodium', group: 1, period: 3, category: 'alkali' },
    { number: 12, symbol: 'Mg', name: 'Magnesium', group: 2, period: 3, category: 'alkaline' },
    { number: 13, symbol: 'Al', name: 'Aluminum', group: 13, period: 3, category: 'post-transition' },
    { number: 14, symbol: 'Si', name: 'Silicon', group: 14, period: 3, category: 'metalloid' },
    { number: 15, symbol: 'P', name: 'Phosphorus', group: 15, period: 3, category: 'nonmetal' },
    { number: 16, symbol: 'S', name: 'Sulfur', group: 16, period: 3, category: 'nonmetal' },
    { number: 17, symbol: 'Cl', name: 'Chlorine', group: 17, period: 3, category: 'halogen' },
    { number: 18, symbol: 'Ar', name: 'Argon', group: 18, period: 3, category: 'noble' },
    { number: 19, symbol: 'K', name: 'Potassium', group: 1, period: 4, category: 'alkali' },
    { number: 20, symbol: 'Ca', name: 'Calcium', group: 2, period: 4, category: 'alkaline' }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      alkali: 'bg-red-500',
      alkaline: 'bg-orange-500',
      transition: 'bg-yellow-500',
      'post-transition': 'bg-blue-500',
      metalloid: 'bg-purple-500',
      nonmetal: 'bg-green-500',
      halogen: 'bg-teal-500',
      noble: 'bg-indigo-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const handleElementClick = (atomicNumber) => {
    onElementSelect(atomicNumber);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="card"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        🧪 Mini Periodic Table
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Click on any element to visualize its atomic structure
      </p>
      
      <div className="grid grid-cols-10 gap-1 mb-4">
        {elements.map((element) => (
          <motion.button
            key={element.number}
            onClick={() => handleElementClick(element.number)}
            className={`w-8 h-8 rounded text-white text-xs font-bold transition-all duration-200 hover:scale-110 ${
              getCategoryColor(element.category)
            } ${selectedAtomicNumber === element.number ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={`${element.name} (${element.symbol})`}
          >
            <div className="text-xs">{element.number}</div>
            <div className="text-xs font-bold">{element.symbol}</div>
          </motion.button>
        ))}
      </div>
      
      {/* Legend */}
      <div className="text-xs space-y-1">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-300">Alkali Metals</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-300">Alkaline Earth</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-300">Nonmetals</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-300">Metalloids</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MiniPeriodicTable; 