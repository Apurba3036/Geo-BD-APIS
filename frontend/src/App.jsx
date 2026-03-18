import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import APIShowcase from './components/APIShowcase'
import InteractiveMap from './components/InteractiveMap'
import APIExplorer from './components/APIExplorer'
import Stats from './components/Stats'
import Footer from './components/Footer'
import APIDocs from './pages/APIDocs'
import GIProductsSection from './components/GIProductsSection'
import GIProductsPage from './pages/GIProductsPage'
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
            <InteractiveMap />
            <APIExplorer />
          </main>
        } />
        <Route path="/gi-products" element={<GIProductsPage />} />
        <Route path="/docs" element={<APIDocs />} />
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App
