import React from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';

const InfoPanel = () => {
  const { isDarkMode } = useDarkMode();

  const topics = [
    {
      title: '📜 Evolution of Atomic Models',
      content: [
        'Dalton: Atoms are indivisible solid spheres, like tiny billiard balls.',
        'Thomson: "Plum pudding" model – electrons are scattered in a positive sphere.',
        'Rutherford: Discovered the nucleus, a dense center surrounded by electrons.',
        'Bohr: Electrons revolve in fixed energy levels or shells.',
        'Modern: Electrons exist in orbitals, regions of high probability.'
      ]
    },
    {
      title: '🔴 Protons',
      content: [
        'Protons are positively charged particles found in the nucleus.',
        'The number of protons determines the atomic number (Z) of an element.',
        'For example, Hydrogen has 1 proton, so its atomic number is 1.'
      ]
    },
    {
      title: '⚪ Neutrons',
      content: [
        'Neutrons are neutral particles found in the nucleus.',
        'They have a mass similar to protons and help stabilize the nucleus.',
        'Different numbers of neutrons in the same element create isotopes.'
      ]
    },
    {
      title: '🟢 Electrons',
      content: [
        'Electrons are negatively charged particles that revolve around the nucleus.',
        'They are much lighter than protons and neutrons.',
        'Electrons determine the chemical properties of an element.'
      ]
    },
    {
      title: '📊 Electronic Configuration',
      content: [
        'Electrons are arranged in shells around the nucleus.',
        'The maximum number of electrons in a shell is given by 2n².',
        'For example, Oxygen (Z=8) has an electronic configuration of 2,6.'
      ]
    },
    {
      title: '⚡ Energy Levels',
      content: [
        'Electrons can jump to higher energy levels when they absorb energy.',
        'When they return to lower levels, they release energy as light.',
        'This explains phenomena like atomic spectra and neon lights.'
      ]
    },
    {
      title: '🔢 Atomic Number & Mass Number',
      content: [
        'Atomic number (Z) = Number of protons.',
        'Mass number (A) = Number of protons + neutrons.',
        'For example, Carbon-12 has 6 protons and 6 neutrons, so A = 12.'
      ]
    },
    {
      title: '🧬 Isotopes & Isobars',
      content: [
        'Isotopes: Atoms of the same element with different numbers of neutrons.',
        'Isobars: Atoms of different elements with the same mass number.',
        'For example, C-12 and C-14 are isotopes, while Ca-40 and Ar-40 are isobars.'
      ]
    },
    {
      title: '🔗 Valency & Octet Rule',
      content: [
        'Valency is the combining capacity of an atom.',
        'Atoms are stable when they have 8 electrons in their outermost shell.',
        'For example, Sodium (2,8,1) loses 1 electron to achieve stability.'
      ]
    },
    {
      title: '🌌 Quantum Mechanics & Orbitals',
      content: [
        'Electrons move in specific regions called orbitals.',
        'Types of orbitals: s (sphere-shaped), p (dumbbell-shaped), d, and f.',
        'Each orbital can hold up to 2 electrons with opposite spins.'
      ]
    },
    {
      title: '🧲 Interactions Between Atoms',
      content: [
        'Atoms combine to form molecules through chemical bonds.',
        'Ionic bonds: Atoms transfer electrons (e.g., NaCl).',
        'Covalent bonds: Atoms share electrons (e.g., H₂O).',
        'Metallic bonds: Electrons are shared among a lattice of metal atoms.'
      ]
    },
    {
      title: '🔬 Advanced Concepts',
      content: [
        'Electrons fill lower energy levels first (Aufbau Principle).',
        'Electrons prefer to stay unpaired in orbitals if possible (Hund’s Rule).',
        'No two electrons in an atom can have the same set of quantum numbers (Pauli Exclusion Principle).'
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          📚 Learn About Atomic Structure
        </h2>
        <p className={`text-lg transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Understanding the fundamental building blocks of matter
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`card transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{topic.icon}</div>
              <div className="flex-1">
                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {topic.title}
                </h3>
                <ul className={`list-disc pl-5 text-sm leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {topic.content.map((item, idx) => (
                    <li key={idx} className="mb-2">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Learning Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={`card transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : ''
        }`}
      >
        <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          🎯 Interactive Learning Tips
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-blue-300' : 'text-blue-800'
            }`}>
              Try These Activities:
            </h4>
            <ul className={`space-y-2 text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <li>• Change the atomic number to see different elements</li>
              <li>• Click on electrons to see them move to excited states</li>
              <li>• Watch photons emit when electrons return to ground state</li>
              <li>• Explore the periodic table to learn about all elements</li>
              <li>• Take the quiz to test your knowledge</li>
            </ul>
          </div>
          
          <div>
            <h4 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-green-300' : 'text-green-800'
            }`}>
              Key Concepts to Remember:
            </h4>
            <ul className={`space-y-2 text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <li>• Atomic number = number of protons</li>
              <li>• Mass number = protons + neutrons</li>
              <li>• Electrons = protons (in neutral atoms)</li>
              <li>• Shell capacity follows 2n² rule</li>
              <li>• Excited electrons emit light when returning to ground state</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Fun Facts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className={`card transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : ''
        }`}
      >
        <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          🎉 Fun Facts About Atoms
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <div className="text-2xl mb-2">⚛️</div>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-blue-800'
            }`}>
              <strong>Size:</strong> Atoms are incredibly small - about 0.1 to 0.5 nanometers across!
            </p>
          </div>
          
          <div className={`p-4 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-green-50'
          }`}>
            <div className="text-2xl mb-2">🌟</div>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-green-800'
            }`}>
              <strong>Light:</strong> The colors we see are caused by electrons jumping between energy levels!
            </p>
          </div>
          
          <div className={`p-4 rounded-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-purple-50'
          }`}>
            <div className="text-2xl mb-2">🔬</div>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-purple-800'
            }`}>
              <strong>Discovery:</strong> The first evidence of atoms came from studying how elements combine!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoPanel;