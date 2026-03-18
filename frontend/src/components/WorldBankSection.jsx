import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Info, TrendingUp, BarChart3, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { geoAPI } from '../services/api'

const WorldBankSection = ({ isFullPage = false }) => {
  const [indicators, setIndicators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const response = await geoAPI.getWorldBankIndicators()
        setIndicators(response.data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching World Bank data:', err)
        setError('Failed to load indicators')
        setLoading(false)
      }
    }
    fetchIndicators()
  }, [])

  const filteredIndicators = indicators.filter(
    (item) =>
      item.indicator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayIndicators = isFullPage ? filteredIndicators : filteredIndicators.slice(0, 6)

  const toggleExpand = (code) => {
    setExpandedId(expandedId === code ? null : code)
  }

  return (
    <section id="worldbank" className={`py-24 relative overflow-hidden ${isFullPage ? 'bg-transparent' : 'bg-[var(--bg-secondary)]'}`}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        {!isFullPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">World Bank Data</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-6">
              Bangladesh <span className="text-gradient">Development Indicators</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-primary-light mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed mb-8">
              Explore key development metrics for Bangladesh from 1990 to 2025. 
              Search by indicator name or World Bank Series Code.
            </p>
            {!isFullPage && (
              <Link to="/world-bank" className="text-primary hover:underline flex items-center justify-center gap-1 font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>Browse all 50+ data indicators</span>
              </Link>
            )}
          </motion.div>
        )}

        {/* Search Bar */}
        <div className={`max-w-2xl mx-auto mb-12 ${isFullPage ? 'mt-8' : ''}`}>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search indicators (e.g., Population, GDP, Literacy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-2xl py-4 pl-12 pr-4 text-[var(--text)] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-lg"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-[var(--text-muted)]">Loading indicators...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 bg-red-500/10 rounded-2xl border border-red-500/20">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayIndicators.map((item, index) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index % 10 * 0.05 }}
                  viewport={{ once: true }}
                  className={`card group cursor-pointer border-l-4 transition-all ${
                    expandedId === item.code ? 'border-primary ring-2 ring-primary/10' : 'border-transparent'
                  }`}
                  onClick={() => toggleExpand(item.code)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                            {item.code}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text)] group-hover:text-primary transition-colors">
                          {item.indicator}
                        </h3>
                      </div>
                      <div className="p-2 rounded-lg bg-[var(--bg-secondary)] group-hover:bg-primary/10 transition-colors">
                        {expandedId === item.code ? (
                          <ChevronUp className="w-5 h-5 text-primary" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[var(--text-muted)] group-hover:text-primary" />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedId === item.code && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 pt-6 border-t border-[var(--border)]">
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                              {Object.entries(item.data).map(([year, value]) => (
                                <div 
                                  key={year} 
                                  className={`p-3 rounded-xl border transition-all ${
                                    value === null 
                                      ? 'bg-transparent border-[var(--border)] opacity-30' 
                                      : 'bg-[var(--bg)] border-primary/20 hover:border-primary shadow-sm'
                                  }`}
                                >
                                  <span className="block text-[10px] text-[var(--text-muted)] font-medium mb-1">{year}</span>
                                  <span className="block text-sm font-bold text-[var(--text)]">
                                    {value === null ? 'N/A' : (typeof value === 'number' ? value.toLocaleString() : value)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-6 flex items-center justify-between text-xs text-[var(--text-muted)]">
                              <div className="flex items-center gap-1">
                                <Info className="w-3 h-3" />
                                <span>Source: World Bank WDI</span>
                              </div>
                              <div className="flex items-center gap-1 text-primary hover:underline">
                                <TrendingUp className="w-3 h-3" />
                                <span>View detailed trends</span>
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

            {filteredIndicators.length === 0 && (
              <div className="text-center py-20 bg-[var(--bg)] rounded-3xl border border-dashed border-[var(--border)]">
                <p className="text-xl text-[var(--text-muted)]">No indicators found matching "{searchQuery}"</p>
              </div>
            )}

            {!isFullPage && filteredIndicators.length > 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mt-12"
              >
                <Link
                  to="/world-bank"
                  className="group btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
                >
                  <span>Show All 50+ Indicators</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default WorldBankSection
