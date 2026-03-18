import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import APIShowcase from './components/APIShowcase'
import InteractiveMap from './components/InteractiveMap'
import APIExplorer from './components/APIExplorer'
import Stats from './components/Stats'
import Footer from './components/Footer'
import APIDocs from './pages/APIDocs'
import GIProductsSection from './components/GIProductsSection'
import WorldBankSection from './components/WorldBankSection'
import GIProductsPage from './pages/GIProductsPage'
import WorldBankPage from './pages/WorldBankPage'
import WHOPage from './pages/WHOPage'
import { Activity, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <Stats />
            <APIShowcase />
            <GIProductsSection />
            <WorldBankSection />
            <section className="py-16 bg-emerald-50/30 dark:bg-emerald-950/10 border-y border-emerald-100 dark:border-emerald-900/30">
              <div className="max-w-7xl mx-auto container-padding flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                  <div className="p-2 bg-white dark:bg-[var(--bg-secondary)] rounded-3xl shadow-xl shadow-emerald-500/10 border border-emerald-100 dark:border-emerald-800 animate-float">
                    <img 
                      src="/WHO Bangladesh Logo Vector.svg" 
                      alt="WHO Bangladesh" 
                      className="w-48 h-48 md:w-64 md:h-64 object-contain p-4"
                    />
                  </div>
                  <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      WHO Health Data
                    </h2>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                      Access official Bangladesh health indicators, mortality rates, and medical infrastructure stats directly from the World Health Organization.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">CC BY 4.0</span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">35+ Indicators</span>
                    </div>
                  </div>
                </div>
                <Link 
                  to="/who-data" 
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2 group whitespace-nowrap"
                >
                  Explore WHO Data
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>
            <InteractiveMap />
            <APIExplorer />
          </main>
        } />
        <Route path="/gi-products" element={<GIProductsPage />} />
        <Route path="/world-bank" element={<WorldBankPage />} />
        <Route path="/who-data" element={<WHOPage />} />
        <Route path="/docs" element={<APIDocs />} />
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App
