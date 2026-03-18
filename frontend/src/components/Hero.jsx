import { useState, useEffect } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  FileCode, 
  ArrowRight, 
  Zap, 
  Globe, 
  Database, 
  Shield,
  ChevronDown,
  Image as ImageIcon
} from 'lucide-react'

// Curated high-quality images for the hero carousel (Bangladesh landscapes & tech)
const bgImages = [
  '/image.png', // Original User Background Image
  'https://images.unsplash.com/photo-1623944686419-48fbde59275e?q=80&w=2070&auto=format&fit=crop', // River/Nature
  'https://images.unsplash.com/photo-1590053916962-d27ab6f685c4?q=80&w=2070&auto=format&fit=crop', // Ahsan Manzil / Architecture
  'https://images.unsplash.com/photo-1598282367858-29ba04aee841?q=80&w=2070&auto=format&fit=crop', // Tea Garden
  'https://images.unsplash.com/photo-1587807865768-3012a6cb8fbb?q=80&w=2070&auto=format&fit=crop', // Dhaka Cityscape
]

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Carousel auto-play effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bgImages.length)
    }, 5000) // Change image every 5 seconds
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      
      {/* Background Carousel */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.25, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImages[currentImageIndex]})` }}
        />
      </AnimatePresence>

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-[var(--bg)]" />

      {/* Animated Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full blur-[100px] mix-blend-screen"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-[120px] mix-blend-screen"
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto container-padding py-20 mt-10">
        <div className="text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2 card-glass border border-[var(--border)] rounded-full mb-8 shadow-2xl backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">
              Now with GI Products Data API
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-xl"
          >
            <span className="block mb-2">Bangladesh</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-600 to-red-600 bg-[length:200%_200%] animate-gradient pb-2">
              Geo API Platform
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-medium drop-shadow-md leading-relaxed"
          >
            A completely free, beautiful, and developer-friendly API for divisions, districts, upazilas, unions, & geographical indication products. Complete with interactive maps and live testing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20"
          >
            <ScrollLink
              to="map"
              smooth={true}
              duration={800}
              className="group relative cursor-pointer px-8 py-4 bg-primary hover:bg-primary-light text-white rounded-2xl font-semibold text-lg transition-all duration-300 shadow-[0_0_40px_-10px_rgba(var(--primary-rgb),0.5)] hover:shadow-[0_0_60px_-10px_rgba(var(--primary-rgb),0.7)] flex items-center justify-center gap-3 w-full sm:w-auto overflow-hidden text-center mx-auto sm:mx-0"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <MapPin className="w-5 h-5 relative z-10" />
              <span className="relative z-10 w-full text-center pr-2">Explore Map</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform" />
            </ScrollLink>
            
            <RouterLink
              to="/docs"
              className="group card-glass cursor-pointer px-8 py-4 text-white hover:text-white rounded-2xl font-semibold text-lg transition-all duration-300 border border-white/20 hover:border-white/40 hover:bg-white/10 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <FileCode className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
              <span className="w-full text-center pr-2">View API Docs</span>
            </RouterLink>
          </motion.div>

          {/* Feature Cards - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Optimized responses with caching', color: 'from-amber-400 to-orange-500' },
              { icon: Database, title: 'Complete Data', desc: 'All 4 administrative levels & GI', color: 'from-cyan-400 to-blue-500' },
              { icon: Globe, title: 'Developer First', desc: 'Clean docs & easy integration', color: 'from-violet-400 to-purple-500' },
              { icon: Shield, title: 'Always Free', desc: 'No limits, no registration', color: 'from-emerald-400 to-teal-500' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="card-glass p-6 rounded-2xl border border-white/10 hover:border-white/30 backdrop-blur-lg group text-left cursor-default isolate overflow-hidden relative"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <ScrollLink to="map" smooth={true} duration={800} className="cursor-pointer group flex flex-col items-center gap-2">
          <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-1 group-hover:border-primary transition-colors"
          >
            <div className="w-1.5 h-3 bg-white/60 rounded-full group-hover:bg-primary" />
          </motion.div>
        </ScrollLink>
      </motion.div>
    </section>
  )
}

export default Hero
