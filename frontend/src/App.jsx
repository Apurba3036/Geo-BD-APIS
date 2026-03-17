import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import APIShowcase from './components/APIShowcase'
import InteractiveMap from './components/InteractiveMap'
import APIExplorer from './components/APIExplorer'
import Stats from './components/Stats'
import Footer from './components/Footer'
import APIDocs from './pages/APIDocs'
import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <Stats />
            <APIShowcase />
            <InteractiveMap />
            <APIExplorer />
          </main>
        } />
        <Route path="/docs" element={<APIDocs />} />
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App
