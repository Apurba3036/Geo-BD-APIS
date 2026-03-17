import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, FileCode, ArrowRight, Users, Globe, Zap, Shield, Database } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/80 to-blue-900/70">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/image.png')",
            filter: "brightness(0.8) contrast(1.2)"
          }}
        />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Bangladesh Flag Accent
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 mb-8"
          >
            <div className="relative">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 shadow-2xl">
                <img src="/bdicon.png" alt="Bangladesh" className="w-12 h-12" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full shadow-lg"
              />
            </div>
          </motion.div> */}

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <img src="/bdicon.png" alt="Bangladesh" className="inline-block w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mr-4 mb-2" />
            Bangladesh Geo API
          </motion.h1>

          {/* Green Underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-24 h-2 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full mb-8 shadow-lg"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Free API for divisions, districts & upazilas with interactive maps and developer-friendly documentation
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <ScrollLink
              to="map"
              smooth={true}
              duration={800}
              className="group relative inline-flex items-center space-x-3 bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 cursor-pointer"
            >
              <MapPin className="w-5 h-5" />
              <span>Explore Map</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </ScrollLink>
            
            <RouterLink
              to="/docs"
              className="group inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <FileCode className="w-5 h-5" />
              <span>View API Docs</span>
            </RouterLink>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Lightning Fast</h3>
              <p className="text-white/80 text-sm">Optimized API responses with intelligent caching</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <Database className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Complete Data</h3>
              <p className="text-white/80 text-sm">8 divisions, 64 districts, 495+ upazilas, 4,500+ unions</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Developer First</h3>
              <p className="text-white/80 text-sm">Clean documentation & easy integration</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Interactive Maps</h3>
              <p className="text-white/80 text-sm">Beautiful map integration with real-time data</p>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">8</div>
                <div className="text-white/70 text-sm uppercase tracking-wide">Divisions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">64</div>
                <div className="text-white/70 text-sm uppercase tracking-wide">Districts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">495+</div>
                <div className="text-white/70 text-sm uppercase tracking-wide">Upazilas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">4,500+</div>
                <div className="text-white/70 text-sm uppercase tracking-wide">Unions</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
