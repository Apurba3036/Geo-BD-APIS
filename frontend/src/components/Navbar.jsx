import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { motion } from 'framer-motion'
import { MapPin, FileCode, Github, Home } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  
  const navItems = [
    { name: 'Home', href: '/', icon: Home, type: 'router' },
    { name: 'Map', href: 'map', icon: MapPin, type: 'scroll' },
    { name: 'API Explorer', href: 'api-explorer', icon: FileCode, type: 'scroll' },
    { name: 'API Docs', href: '/docs', icon: FileCode, type: 'router' },
    { name: 'GitHub', href: 'https://github.com', icon: Github, external: true, type: 'external' }
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <RouterLink to="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bd-green-bg rounded-lg flex items-center justify-center">
                <img src="/bdicon.png" alt="Bangladesh" className="w-5 h-5" />
              </div>
              <span className="font-semibold text-gray-900">GeoBD API</span>
            </div>
          </RouterLink>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <div key={item.name}>
                  {item.type === 'external' ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-600 hover:text-[#006A4E] transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </a>
                  ) : item.type === 'scroll' ? (
                    <ScrollLink
                      to={item.href}
                      smooth={true}
                      duration={600}
                      className="flex items-center space-x-1 text-gray-600 hover:text-[#006A4E] transition-colors cursor-pointer"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </ScrollLink>
                  ) : (
                    <RouterLink
                      to={item.href}
                      className={`flex items-center space-x-1 transition-colors ${
                        isActive ? 'text-[#006A4E]' : 'text-gray-600 hover:text-[#006A4E]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </RouterLink>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-[#006A4E]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
