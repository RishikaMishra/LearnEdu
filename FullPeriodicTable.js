import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';
import { periodicTableData, lanthanides, actinides, getAllElements } from '../data/periodicTableData';

const FullPeriodicTable = ({ onElementSelect, selectedAtomicNumber, onViewAtom }) => {
  const { isDarkMode } = useDarkMode();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showElementDetails, setShowElementDetails] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      alkali: 'bg-red-500',
      alkaline: 'bg-orange-500',
      transition: 'bg-yellow-500',
      'post-transition': 'bg-blue-500',
      metalloid: 'bg-purple-500',
      nonmetal: 'bg-green-500',
      halogen: 'bg-teal-500',
      noble: 'bg-indigo-500',
      lanthanide: 'bg-pink-500',
      actinide: 'bg-rose-500'
    };
    return colors[category.replace('-', '_')] || 'bg-gray-500';
  };

  const getCategoryName = (category) => {
    const names = {
      alkali: 'Alkali Metal',
      alkaline: 'Alkaline Earth Metal',
      transition: 'Transition Metal',
      'post-transition': 'Post-Transition Metal',
      metalloid: 'Metalloid',
      nonmetal: 'Nonmetal',
      halogen: 'Halogen',
      noble: 'Noble Gas',
      lanthanide: 'Lanthanide',
      actinide: 'Actinide'
    };
    return names[category] || category;
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
    setShowElementDetails(true);
    
    // If it's an element 1-20, also update the atomic number for visualization
    if (element.number <= 20) {
      onElementSelect(element.number);
    }
  };

  const handleCloseElementDetails = () => {
    setShowElementDetails(false);
    setSelectedElement(null);
  };

  // Filter elements based on selected group and period
  const filteredData = useMemo(() => {
    let filtered = periodicTableData;
    
    if (selectedPeriod) {
      filtered = filtered.filter((_, index) => index + 1 === selectedPeriod);
    }
    
    if (selectedGroup) {
      filtered = filtered.map(period => 
        period.filter(element => element.group === selectedGroup)
      );
    }
    
    return filtered;
  }, [periodicTableData, selectedPeriod, selectedGroup]);

  const allElements = getAllElements();

  return (
    <>
      <div className={`card transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : ''
      }`}>
        <div className="mb-6">
          <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            🧪 Complete Periodic Table - ALL 118 Elements
          </h3>
          <p className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Explore all elements and their properties. Click any element to see detailed information.
          </p>
        </div>

        {/* Group and Period Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Filter by Group:
            </label>
            <select
              value={selectedGroup || ''}
              onChange={(e) => setSelectedGroup(e.target.value || null)}
              className={`px-3 py-2 border rounded-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-800'
              }`}
            >
              <option value="">All Groups</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(group => (
                <option key={group} value={group}>Group {group}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Filter by Period:
            </label>
            <select
              value={selectedPeriod || ''}
              onChange={(e) => setSelectedPeriod(e.target.value || null)}
              className={`px-3 py-2 border rounded-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-800'
              }`}
            >
              <option value="">All Periods</option>
              {[1, 2, 3, 4, 5, 6, 7].map(period => (
                <option key={period} value={period}>Period {period}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Periodic Table */}
        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Period Labels */}
            <div className="flex mb-2">
              <div className="w-16"></div>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(group => (
                <div key={group} className={`w-16 h-8 flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {group}
                </div>
              ))}
            </div>

            {/* Elements Grid */}
            {filteredData.map((period, periodIndex) => (
              <div key={periodIndex} className="flex mb-1">
                {/* Period Label */}
                <div className={`w-16 h-16 flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {periodIndex + 1}
                </div>
                
                {/* Elements in this period */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(group => {
                  const element = period.find(e => e.group === group);
                  
                  if (!element) return <div key={group} className="w-16 h-16"></div>;
                  
                  const isSelected = selectedAtomicNumber === element.number;
                  
                  return (
                    <motion.div
                      key={group}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleElementClick(element)}
                      className={`
                        w-16 h-16 border-2 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-lg
                        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                        ${getCategoryColor(element.category)} text-white font-bold
                      `}
                      title={`${element.name} (${element.number}) - ${getCategoryName(element.category)}`}
                    >
                      <div className="text-xs">{element.number}</div>
                      <div className="text-sm font-bold">{element.symbol}</div>
                    </motion.div>
                  );
                })}
              </div>
            ))}

            {/* Lanthanides Row */}
            <div className="flex mb-1">
              <div className={`w-16 h-16 flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                6*
              </div>
              
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(group => {
                if (group !== 3) return <div key={group} className="w-16 h-16"></div>;
                
                return (
                  <div key={group} className="w-16 h-16 flex items-center justify-center">
                    <div className="text-xs text-center">
                      <div className="font-bold">57-71</div>
                      <div className="text-xs">La-Lu</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actinides Row */}
            <div className="flex mb-1">
              <div className={`w-16 h-16 flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                7*
              </div>
              
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(group => {
                if (group !== 3) return <div key={group} className="w-16 h-16"></div>;
                
                return (
                  <div key={group} className="w-16 h-16 flex items-center justify-center">
                    <div className="text-xs text-center">
                      <div className="font-bold">89-103</div>
                      <div className="text-xs">Ac-Lr</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lanthanides and Actinides Detail */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lanthanides */}
          <div className={`card transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : ''
          }`}>
            <h4 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Lanthanides (Period 6, f-block)
            </h4>
            <div className="grid grid-cols-7 gap-1">
              {lanthanides.map((element) => (
                <motion.button
                  key={element.number}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleElementClick(element)}
                  className={`
                    w-12 h-12 border-2 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-lg
                    ${getCategoryColor(element.category)} text-white font-bold text-xs
                  `}
                  title={`${element.name} (${element.number})`}
                >
                  <div className="text-xs">{element.number}</div>
                  <div className="text-xs font-bold">{element.symbol}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Actinides */}
          <div className={`card transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : ''
          }`}>
            <h4 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Actinides (Period 7, f-block)
            </h4>
            <div className="grid grid-cols-7 gap-1">
              {actinides.map((element) => (
                <motion.button
                  key={element.number}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleElementClick(element)}
                  className={`
                    w-12 h-12 border-2 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-lg
                    ${getCategoryColor(element.category)} text-white font-bold text-xs
                  `}
                  title={`${element.name} (${element.number})`}
                >
                  <div className="text-xs">{element.number}</div>
                  <div className="text-xs font-bold">{element.symbol}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className={`font-semibold mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Element Categories
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
            {[
              { category: 'alkali', color: 'bg-red-500', name: 'Alkali Metals' },
              { category: 'alkaline', color: 'bg-orange-500', name: 'Alkaline Earth' },
              { category: 'transition', color: 'bg-yellow-500', name: 'Transition Metals' },
              { category: 'post-transition', color: 'bg-blue-500', name: 'Post-Transition' },
              { category: 'metalloid', color: 'bg-purple-500', name: 'Metalloids' },
              { category: 'nonmetal', color: 'bg-green-500', name: 'Nonmetals' },
              { category: 'halogen', color: 'bg-teal-500', name: 'Halogens' },
              { category: 'noble', color: 'bg-indigo-500', name: 'Noble Gases' },
              { category: 'lanthanide', color: 'bg-pink-500', name: 'Lanthanides' },
              { category: 'actinide', color: 'bg-rose-500', name: 'Actinides' }
            ].map(({ category, color, name }) => (
              <div key={category} className="flex items-center space-x-2">
                <div className={`w-3 h-3 ${color} rounded`}></div>
                <span className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className={`p-3 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <div className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>118</div>
            <div className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Total Elements</div>
          </div>
          <div className={`p-3 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-green-50'
          }`}>
            <div className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}>20</div>
            <div className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Interactive</div>
          </div>
          <div className={`p-3 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-purple-50'
          }`}>
            <div className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }`}>7</div>
            <div className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Periods</div>
          </div>
          <div className={`p-3 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-orange-50'
          }`}>
            <div className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-orange-400' : 'text-orange-600'
            }`}>18</div>
            <div className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Groups</div>
          </div>
        </div>
      </div>

      {/* Element Details Modal */}
      <AnimatePresence>
        {showElementDetails && selectedElement && (
          <ElementDetails
            element={selectedElement}
            onClose={handleCloseElementDetails}
            onViewAtom={onViewAtom}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Simple Element Details Component (inline for now)
const ElementDetails = ({ element, onClose, onViewAtom }) => {
  const { isDarkMode } = useDarkMode();

  const getCategoryColor = (category) => {
    const colors = {
      alkali: 'bg-red-500',
      alkaline: 'bg-orange-500',
      transition: 'bg-yellow-500',
      'post-transition': 'bg-blue-500',
      metalloid: 'bg-purple-500',
      nonmetal: 'bg-green-500',
      halogen: 'bg-teal-500',
      noble: 'bg-indigo-500',
      lanthanide: 'bg-pink-500',
      actinide: 'bg-rose-500'
    };
    return colors[category.replace('-', '_')] || 'bg-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        transition={{ duration: 0.3 }}
        className={`max-w-md w-full rounded-xl shadow-2xl transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
        } border-2`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-6 border-b transition-colors duration-300 ${
          isDarkMode ? 'border-gray-600' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold ${getCategoryColor(element.category)}`}>
              {element.symbol}
            </div>
            <div>
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {element.name}
              </h2>
              <p className={`text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {element.symbol} • {element.number}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className={`p-4 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-blue-300' : 'text-blue-800'
            }`}>
              Properties
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Atomic Number:</span>
                <span className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>{element.number}</span>
              </div>
              <div className="flex justify-between">
                <span className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Atomic Mass:</span>
                <span className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>{element.mass} u</span>
              </div>
              <div className="flex justify-between">
                <span className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Category:</span>
                <span className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>{element.category}</span>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-purple-50'
          }`}>
            <h3 className={`font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-purple-300' : 'text-purple-800'
            }`}>
              Electronic Configuration
            </h3>
            <div className={`p-3 rounded-lg font-mono text-lg transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800 text-purple-300' : 'bg-white text-purple-700'
            }`}>
              {element.electronConfig}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {element.number <= 118 && (
              <button
                onClick={() => { onClose(); if(onViewAtom) onViewAtom(element.number); }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                🧪 View Atomic Structure
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FullPeriodicTable; 