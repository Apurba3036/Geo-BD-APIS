import { motion } from 'framer-motion'
import { Github, Mail, Heart, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <img src="/bdicon.png" alt="Bangladesh" className="w-5 h-5" />
              </div>
              <span className="font-semibold text-lg">GeoBD API</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Bangladesh's official open geo API platform. Free, fast, and developer-friendly access to geographical data. Visit geobd.vercel.com
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@geobd.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="text-gray-400 hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="/#map" className="text-gray-400 hover:text-white transition-colors">
                  Interactive Map
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-white mb-4">Platform Stats</h3>
            <ul className="space-y-2 text-gray-400">
              <li>8 Divisions</li>
              <li>64 Districts</li>
              <li>495+ Upazilas</li>
              <li>Free Forever</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center"
        >
        
          <p className="text-gray-400 text-sm flex items-center space-x-1">
            <span>Developed by Nazmus Sakib Apurba</span>
            <Heart className="w-4 h-4 bd-red-bg" fill="currentColor" />
            <span>for Bangladesh 🇧🇩</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
