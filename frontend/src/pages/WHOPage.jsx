import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Activity, ArrowLeft, ChevronDown, ChevronUp, Clock, Info, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { geoAPI } from '../services/api'
import WHOTermsModal from '../components/WHOTermsModal'

const WHOPage = () => {
  const [indicators, setIndicators] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [showTerms, setShowTerms] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(localStorage.getItem('who_terms_accepted') === 'true')

  useEffect(() => {
    if (!termsAccepted) {
      setShowTerms(true)
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await geoAPI.getWHOIndicators()
      setIndicators(response.data.data)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching WHO data:', err)
      setLoading(false)
    }
  }

  const handleAcceptTerms = () => {
    localStorage.setItem('who_terms_accepted', 'true')
    setTermsAccepted(true)
    setShowTerms(false)
  }

  const filteredIndicators = indicators.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.uuid.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-20">
      <WHOTermsModal 
        isOpen={showTerms} 
        onAccept={handleAcceptTerms} 
        onCancel={() => window.location.href = '/'} 
      />

      {/* Header Section */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)] mb-8">
        <div className="max-w-7xl mx-auto container-padding py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors mb-4 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-8 h-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)]">WHO Health Indicators</h1>
              </div>
              <div className="flex items-center gap-2 text-emerald-500 text-sm mb-4 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Data from WHO (data.who.int)</span>
              </div>
              <p className="text-[var(--text-muted)] text-lg max-w-2xl">
                Explore critical health metrics for Bangladesh, including mortality rates, disease prevalence, and health worker density.
              </p>
            </div>

            <div className="w-full md:w-96">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search health indicators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-2xl py-4 pl-12 pr-4 text-[var(--text)] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto container-padding pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-[var(--text-muted)]">Loading metrics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredIndicators.map((item, index) => (
              <motion.div
                key={item.uuid}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index % 20 * 0.05 }}
                className={`card group cursor-pointer border-l-4 transition-all ${
                  expandedId === item.uuid ? 'border-primary ring-2 ring-primary/10' : 'border-transparent'
                }`}
                onClick={() => setExpandedId(expandedId === item.uuid ? null : item.uuid)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {item.uuid}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--text)] group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <div className="p-2 rounded-lg bg-[var(--bg-secondary)] group-hover:bg-primary/10 transition-colors">
                      {expandedId === item.uuid ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[var(--text-muted)] group-hover:text-primary" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === item.uuid && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-[var(--border)]">
                          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                            {Object.entries(item.data).reverse().map(([year, value]) => (
                              <div key={year} className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-sm">
                                <span className="block text-[10px] text-[var(--text-muted)] font-medium mb-1">{year}</span>
                                <span className="block text-sm font-bold text-[var(--text)]">{value.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-6 flex items-center justify-between text-xs text-[var(--text-muted)]">
                            <div className="flex items-center gap-1">
                              <Info className="w-3 h-3" />
                              <span>Source: WHO (CC BY 4.0)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>Updated: 2025</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredIndicators.length === 0 && !loading && (
          <div className="text-center py-20 bg-[var(--bg-secondary)] rounded-3xl border border-dashed border-[var(--border)]">
            <p className="text-xl text-[var(--text-muted)]">No indicators found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WHOPage
