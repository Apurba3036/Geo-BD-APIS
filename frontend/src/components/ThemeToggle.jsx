import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative p-2 rounded-full overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
          darkMode 
            ? 'bg-gradient-to-br from-indigo-600 to-purple-700' 
            : 'bg-gradient-to-br from-orange-400 to-yellow-500'
        }`}
        initial={false}
        animate={{
          rotate: darkMode ? 180 : 0,
        }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: darkMode ? 0 : 1,
            opacity: darkMode ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <FiSun className="w-6 h-6 text-white" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            scale: darkMode ? 1 : 0,
            opacity: darkMode ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <FiMoon className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-xl opacity-50 -z-10 ${
          darkMode ? 'bg-purple-500' : 'bg-orange-400'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  )
}

export default ThemeToggle
