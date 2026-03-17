import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  FileCode, 
  ArrowRight, 
  Zap, 
  Globe, 
  Database, 
  Shield,
  ChevronDown
} from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg)]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5"
        style={{ backgroundImage: 'url(/image.png)' }}
      />
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto container-padding py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm text-[var(--text-secondary)]">
              Now with 4,500+ Union data
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text)] mb-6 leading-tight"
          >
            <span className="block">Bangladesh</span>
            <span className="block gradient-text">Geo API Platform</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-responsive-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10"
          >
            Free, fast, and developer-friendly API for divisions, districts, upazilas & unions. 
            Complete with interactive maps and live testing.
          </motion.p>

          {/* Green Underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-24 h-2 bg-gradient-to-r from-primary to-primary-light mx-auto rounded-full mb-10"
          />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <ScrollLink
              to="map"
              smooth={true}
              duration={800}
              className="group btn-primary inline-flex items-center gap-2 text-base sm:text-lg px-8 py-4"
            >
              <MapPin className="w-5 h-5" />
              <span>Explore Map</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </ScrollLink>
            
            <RouterLink
              to="/docs"
              className="group btn-secondary inline-flex items-center gap-2 text-base sm:text-lg px-8 py-4"
            >
              <FileCode className="w-5 h-5" />
              <span>View API Docs</span>
            </RouterLink>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {[
              { number: '8', label: 'Divisions', color: 'from-emerald-400 to-emerald-600' },
              { number: '64', label: 'Districts', color: 'from-blue-400 to-blue-600' },
              { number: '495+', label: 'Upazilas', color: 'from-purple-400 to-purple-600' },
              { number: '4.5K+', label: 'Unions', color: 'from-orange-400 to-orange-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="card p-4 sm:p-6 text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-3`}>
                  <span className="text-lg font-bold">{stat.number.replace(/[^0-9]/g, '')}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-1">{stat.number}</div>
                <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-12"
          >
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Optimized responses with caching', color: 'from-amber-400 to-orange-500' },
              { icon: Database, title: 'Complete Data', desc: 'All 4 administrative levels', color: 'from-cyan-400 to-blue-500' },
              { icon: Globe, title: 'Developer First', desc: 'Clean docs & easy integration', color: 'from-violet-400 to-purple-500' },
              { icon: Shield, title: 'Always Free', desc: 'No limits, no registration', color: 'from-emerald-400 to-teal-500' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="card-glass p-5 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-[var(--text)] mb-1">{feature.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{feature.desc}</p>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ScrollLink to="map" smooth={true} duration={800} className="cursor-pointer group">
          <div className="flex flex-col items-center gap-2 text-[var(--text-muted)] group-hover:text-primary transition-colors">
            <span className="text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </div>
        </ScrollLink>
      </motion.div>
    </section>
  )
}

export default Hero
