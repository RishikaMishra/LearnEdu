import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';

const QuizSection = () => {
  const { isDarkMode } = useDarkMode();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Questions bank
  const questions = [
    {
      question: "Draw the structure of Oxygen (Z=8). How many electrons are in the L shell?",
      options: ["2", "6", "8", "4"],
      correct: 1,
      explanation: "Oxygen has 8 electrons. K shell = 2, L shell = 6. So the L shell has 6 electrons."
    },
    {
      question: "What is the maximum number of electrons that can occupy the K shell?",
      options: ["2", "8", "18", "32"],
      correct: 0,
      explanation: "The K shell (1st shell) can hold a maximum of 2 electrons (2n² rule → 2×1² = 2)."
    },
    {
      question: "Which element has the electronic configuration: K(2), L(8), M(1)?",
      options: ["Sodium (Na)", "Magnesium (Mg)", "Aluminum (Al)", "Silicon (Si)"],
      correct: 0,
      explanation: "Sodium (Z=11). K=2, L=8, M=1."
    },
    {
      question: "What happens when an electron moves to a higher energy level?",
      options: ["It emits a photon", "It absorbs energy", "It becomes a proton", "It disappears"],
      correct: 1,
      explanation: "Electrons absorb energy to move to higher shells. They emit photons when they return."
    },
    {
      question: "How many electrons can the M shell (3rd shell) hold?",
      options: ["8", "18", "32", "2"],
      correct: 1,
      explanation: "The M shell can hold up to 18 electrons (2n² rule → 2×3² = 18)."
    },
    {
      question: "What determines the identity of an element?",
      options: ["Number of neutrons", "Number of protons", "Number of electrons", "Mass number"],
      correct: 1,
      explanation: "The number of protons (atomic number) determines the element."
    },
    {
      question: "Which particle has no electrical charge?",
      options: ["Proton", "Electron", "Neutron", "Photon"],
      correct: 2,
      explanation: "Neutrons are neutral. Protons are positive, electrons negative."
    },
    {
      question: "What is the electronic configuration of Helium (Z=2)?",
      options: ["K(1)", "K(2)", "K(1), L(1)", "K(2), L(0)"],
      correct: 1,
      explanation: "Helium has 2 electrons, both in the K shell. So, K(2)."
    }
  ];

  // Start quiz (shuffle questions once)
  const startQuiz = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setQuizStarted(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    // update score if correct
    if (answerIndex === shuffledQuestions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage >= 90) return "🎉 Excellent! You're an atomic expert!";
    if (percentage >= 80) return "🌟 Great job! You understand atomic structure well!";
    if (percentage >= 70) return "👍 Good work! You have a solid foundation!";
    if (percentage >= 60) return "📚 Not bad! Keep learning and practicing!";
    return "💪 Keep studying! Understanding takes time and practice!";
  };

  // Quiz Completed View
  if (quizCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`card text-center transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : ''
        }`}
      >
        <div className="text-6xl mb-4">🎊</div>
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Quiz Completed!
        </h2>
        <p className={`text-xl mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Your Score: {score} / {shuffledQuestions.length} ({Math.round((score / shuffledQuestions.length) * 100)}%)
        </p>
        <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {getScoreMessage()}
        </p>
        <motion.button
          onClick={handleRestartQuiz}
          className="btn-primary text-lg px-8 py-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 Take Quiz Again
        </motion.button>
      </motion.div>
    );
  }

  // Quiz not started
  if (!quizStarted) {
    return (
      <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        <h2 className="text-2xl font-bold mb-4">Ready to test your knowledge?</h2>
        <button
          onClick={startQuiz}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentQuestion];

  // Main Quiz UI
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          🧩 Test Your Knowledge
        </h2>
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Challenge yourself with questions about atomic structure
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Question {currentQuestion + 1} of {shuffledQuestions.length}
          </span>
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Score: {score}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className={`card ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}
      >
        <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                showResult
                  ? index === currentQ.correct
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : index === selectedAnswer && index !== currentQ.correct
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:border-blue-500 dark:hover:bg-blue-900/20'
              } ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                  showResult
                    ? index === currentQ.correct
                      ? 'border-green-500 bg-green-500 text-white'
                      : index === selectedAnswer && index !== currentQ.correct
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-gray-300 dark:border-gray-500'
                    : 'border-gray-300 dark:border-gray-500'
                }`}>
                  {showResult
                    ? index === currentQ.correct
                      ? '✓'
                      : index === selectedAnswer && index !== currentQ.correct
                      ? '✗'
                      : String.fromCharCode(65 + index)
                    : String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg mb-6 ${
                selectedAnswer === currentQ.correct
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">
                  {selectedAnswer === currentQ.correct ? '🎉' : '💡'}
                </span>
                <span className={`font-semibold ${
                  selectedAnswer === currentQ.correct
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {selectedAnswer === currentQ.correct ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-sm">
                {currentQ.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        {showResult && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleNextQuestion}
            className="btn-primary w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentQuestion < shuffledQuestions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default QuizSection;
