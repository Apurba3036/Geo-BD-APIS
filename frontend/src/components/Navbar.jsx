import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  FileCode, 
  Github, 
  Home, 
  Menu, 
  X,
  Command,
  Sparkles
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navItems = [
    { name: 'Home', href: '/', icon: Home, type: 'router' },
    { name: 'Map', href: 'map', icon: MapPin, type: 'scroll' },
    { name: 'Explorer', href: 'api-explorer', icon: Command, type: 'scroll' },
    { name: 'Docs', href: '/docs', icon: FileCode, type: 'router' },
    { name: 'GitHub', href: 'https://github.com/Apurba3036/Geo-BD-APIS', icon: Github, external: true, type: 'external' }
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]"
    >
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <RouterLink to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="relative w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg shadow-primary/30"
            >
              <img src="/bdicon.png" alt="BD" className="w-6 h-6 object-contain" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-[var(--text)] group-hover:text-primary transition-colors">
                GeoBD
              </span>
              <span className="text-xs text-[var(--text-muted)] ml-1 hidden md:inline">API</span>
            </div>
          </RouterLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              const linkClasses = `
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-[var(--text-secondary)] hover:text-primary hover:bg-[var(--bg-secondary)]'
                }
              `
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.type === 'external' ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClasses}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </a>
                  ) : item.type === 'scroll' ? (
                    <ScrollLink
                      to={item.href}
                      smooth={true}
                      duration={600}
                      className={`${linkClasses} cursor-pointer`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </ScrollLink>
                  ) : (
                    <RouterLink to={item.href} className={linkClasses}>
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </RouterLink>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Right Side: Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[var(--bg-secondary)] text-[var(--text)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl"
          >
            <div className="container-padding py-4 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                const mobileLinkClasses = `
                  flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-[var(--text-secondary)] hover:text-primary hover:bg-[var(--bg-secondary)]'
                  }
                `
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.type === 'external' ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={mobileLinkClasses}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </a>
                    ) : item.type === 'scroll' ? (
                      <ScrollLink
                        to={item.href}
                        smooth={true}
                        duration={600}
                        className={`${mobileLinkClasses} cursor-pointer`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </ScrollLink>
                    ) : (
                      <RouterLink 
                        to={item.href} 
                        className={mobileLinkClasses}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </RouterLink>
                    )}
                  </motion.div>
                )
              })}
              
              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 mt-4 border-t border-[var(--border)]"
              >
                <RouterLink
                  to="/docs"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Get Started</span>
                </RouterLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
