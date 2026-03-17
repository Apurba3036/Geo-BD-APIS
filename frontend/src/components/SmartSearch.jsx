import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, ExternalLink, Loader } from 'lucide-react'
import { geoAPI } from '../services/api'
import toast from 'react-hot-toast'

const SmartSearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setShowResults(false)
      return
    }

    const timeoutId = setTimeout(() => {
      searchLocations(query)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  const searchLocations = async (searchQuery) => {
    try {
      setLoading(true)
      
      // Search districts, upazilas, and unions
      const [districtsResponse, upazilasResponse] = await Promise.all([
        geoAPI.searchDistricts(searchQuery),
        geoAPI.searchUpazilas(searchQuery)
      ])

      // Search unions separately
      const unionsResponse = await fetch(`/api/unions/search?q=${searchQuery}`)
      const unionsData = await unionsResponse.json()

      const combinedResults = [
        ...districtsResponse.data.data.map(item => ({ ...item, type: 'district' })),
        ...upazilasResponse.data.data.map(item => ({ ...item, type: 'upazila' })),
        ...unionsData.data.map(item => ({ ...item, type: 'union' }))
      ].slice(0, 10) // Limit to 10 results

      setResults(combinedResults)
      setShowResults(true)
    } catch (error) {
      toast.error('Search failed')
    } finally {
      setLoading(false)
    }
  }

  const handleResultClick = (result) => {
    setShowResults(false)
    setQuery(result.name)
    
    // In production, you'd update the map with this location
    toast.success(`Selected ${result.name}`)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Smart Search
          </h2>
          <div className="w-16 h-1 bd-green-bg mx-auto rounded mb-4"></div>
          <p className="text-lg text-gray-600">
            Type to search any district or upazila in Bangladesh
          </p>
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for 'Pabna', 'Dhaka', 'Sylhet'..."
              className="input-field pl-12 pr-4 py-4 text-lg"
              autoComplete="off"
            />
            {loading && (
              <Loader className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bd-green animate-spin" />
            )}
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {showResults && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto"
              >
                {results.map((result, index) => (
                  <motion.div
                    key={`${result.type}-${result.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleResultClick(result)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 bd-green" />
                        <div>
                          <div className="font-medium text-gray-900">{result.name}</div>
                          <div className="text-sm text-gray-500">
                            {result.bn_name} • {result.type === 'district' ? 'District' : result.type === 'upazila' ? 'Upazila' : 'Union'}
                            {result.district && ` • ${result.district.name}`}
                          </div>
                        </div>
                      </div>
                      {result.url && (
                        <a
                          href={`https://${result.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-[#006A4E] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results */}
          {showResults && !loading && results.length === 0 && query.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4"
            >
              <p className="text-gray-500 text-center">No locations found for "{query}"</p>
            </motion.div>
          )}
        </motion.div>

        {/* Search Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="card p-4 text-center">
            <div className="text-2xl mb-2">🏙️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Search Districts</h3>
            <p className="text-sm text-gray-600">Find any of the 64 districts</p>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl mb-2">📍</div>
            <h3 className="font-semibold text-gray-900 mb-1">Search Upazilas</h3>
            <p className="text-sm text-gray-600">Explore 495+ upazilas</p>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl mb-2">🏡</div>
            <h3 className="font-semibold text-gray-900 mb-1">Search Unions</h3>
            <p className="text-sm text-gray-600">Explore 4,500+ unions</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SmartSearch
