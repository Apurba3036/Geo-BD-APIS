import { motion } from 'framer-motion'
import { Github, Mail, Heart, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] py-12 px-4 sm:px-6 lg:px-8">
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
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                <img src="/bdicon.png" alt="BD" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-bold text-lg text-[var(--text)]">API Hub</span>
            </div>
            <p className="text-[var(--text-muted)] mb-4 max-w-md text-sm sm:text-base">
              Bangladesh's open API hub platform. Free, fast, and developer-friendly access to geographical data.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Apurba3036/Geo-BD-APIS"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-primary hover:bg-[var(--bg-secondary)] transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@apihub.com"
                className="p-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-primary hover:bg-[var(--bg-secondary)] transition-all"
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
            <h3 className="font-semibold text-[var(--text)] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="text-[var(--text-muted)] hover:text-primary transition-colors text-sm sm:text-base">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="/#map" className="text-[var(--text-muted)] hover:text-primary transition-colors text-sm sm:text-base">
                  Interactive Map
                </a>
              </li>
              <li>
                <a href="https://github.com/Apurba3036/Geo-BD-APIS" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-primary transition-colors flex items-center gap-1 text-sm sm:text-base">
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
            <h3 className="font-semibold text-[var(--text)] mb-4">Platform Stats</h3>
            <ul className="space-y-2 text-[var(--text-muted)] text-sm sm:text-base">
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
          className="border-t border-[var(--border)] mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-[var(--text-muted)] text-sm flex items-center gap-1 flex-wrap justify-center">
            <span>Developed by Nazmus Sakib Apurba</span>
            <Heart className="w-4 h-4 text-accent fill-accent" />
            <span>for Bangladesh 🇧🇩</span>
          </p>
         
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
