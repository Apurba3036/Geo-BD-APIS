import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Code, Copy, CheckCircle, Loader } from 'lucide-react'
import { geoAPI } from '../services/api'
import toast from 'react-hot-toast'

const APIExplorer = () => {
  const [divisions, setDivisions] = useState([])
  const [districts, setDistricts] = useState([])
  const [upazilas, setUpazilas] = useState([])
  const [unions, setUnions] = useState([])
  const [selectedDivision, setSelectedDivision] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedUpazila, setSelectedUpazila] = useState('')
  const [selectedUnion, setSelectedUnion] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    loadDivisions()
  }, [])

  useEffect(() => {
    if (selectedDivision) {
      loadDistricts(selectedDivision)
    } else {
      setDistricts([])
      setSelectedDistrict('')
      setUpazilas([])
      setSelectedUpazila('')
      setUnions([])
      setSelectedUnion('')
    }
  }, [selectedDivision])

  useEffect(() => {
    if (selectedDistrict) {
      loadUpazilas(selectedDistrict)
    } else {
      setUpazilas([])
      setSelectedUpazila('')
      setUnions([])
      setSelectedUnion('')
    }
  }, [selectedDistrict])

  useEffect(() => {
    if (selectedUpazila) {
      loadUnions(selectedUpazila)
    } else {
      setUnions([])
      setSelectedUnion('')
    }
  }, [selectedUpazila])

  const loadDivisions = async () => {
    try {
      setLoading(true)
      const response = await geoAPI.getDivisions()
      setDivisions(response.data.data)
      updateAPIResponse('https://geobd.vercel.com/api/divisions', response.data)
    } catch (error) {
      toast.error('Failed to load divisions')
    } finally {
      setLoading(false)
    }
  }

  const loadDistricts = async (divisionId) => {
    try {
      setLoading(true)
      const response = await geoAPI.getDistricts(divisionId)
      setDistricts(response.data.data)
      updateAPIResponse(`https://geobd.vercel.com/api/districts?division_id=${divisionId}`, response.data)
    } catch (error) {
      toast.error('Failed to load districts')
    } finally {
      setLoading(false)
    }
  }

  const loadUpazilas = async (districtId) => {
    try {
      setLoading(true)
      const response = await geoAPI.getUpazilas(districtId)
      setUpazilas(response.data.data)
      updateAPIResponse(`https://geobd.vercel.com/api/upazilas?district_id=${districtId}`, response.data)
    } catch (error) {
      toast.error('Failed to load upazilas')
    } finally {
      setLoading(false)
    }
  }

  const loadUnions = async (upazilaId) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/unions?upazila_id=${upazilaId}`)
      const data = await response.json()
      setUnions(data.data)
      updateAPIResponse(`https://geobd.vercel.com/api/unions?upazila_id=${upazilaId}`, data)
    } catch (error) {
      toast.error('Failed to load unions')
    } finally {
      setLoading(false)
    }
  }

  const loadUnionDetails = async (unionId) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/unions/${unionId}`)
      const data = await response.json()
      updateAPIResponse(`https://geobd.vercel.com/api/unions/${unionId}`, data)
    } catch (error) {
      toast.error('Failed to load union details')
    } finally {
      setLoading(false)
    }
  }

  const updateAPIResponse = (endpoint, data) => {
    setApiResponse({
      endpoint,
      method: 'GET',
      data,
      timestamp: new Date().toLocaleTimeString()
    })
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Endpoint copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const getActiveEndpoint = () => {
    const baseUrl = 'https://geobd.vercel.com'
    if (selectedUnion) return `${baseUrl}/api/unions/${selectedUnion}`
    if (selectedUpazila) return `${baseUrl}/api/unions?upazila_id=${selectedUpazila}`
    if (selectedDistrict) return `${baseUrl}/api/upazilas?district_id=${selectedDistrict}`
    if (selectedDivision) return `${baseUrl}/api/districts?division_id=${selectedDivision}`
    return `${baseUrl}/api/divisions`
  }

  return (
    <section id="api-explorer" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Live API Explorer
          </h2>
          <div className="w-16 h-1 bd-green-bg mx-auto rounded mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test our API endpoints in real-time. Select locations to see live data and endpoint URLs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Division Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Division
              </label>
              <div className="relative">
                <select
                  value={selectedDivision}
                  onChange={(e) => setSelectedDivision(e.target.value)}
                  className="input-field appearance-none pr-10"
                  disabled={loading}
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division.id} value={division.id}>
                      {division.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* District Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select District
              </label>
              <div className="relative">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="input-field appearance-none pr-10"
                  disabled={!selectedDivision || loading}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Upazila Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Upazila
              </label>
              <div className="relative">
                <select
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  className="input-field appearance-none pr-10"
                  disabled={!selectedDistrict || loading}
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.id}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Union Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Union
              </label>
              <div className="relative">
                <select
                  value={selectedUnion}
                  onChange={(e) => {
                    setSelectedUnion(e.target.value)
                    if (e.target.value) {
                      loadUnionDetails(e.target.value)
                    }
                  }}
                  className="input-field appearance-none pr-10"
                  disabled={!selectedUpazila || loading}
                >
                  <option value="">Select Union</option>
                  {unions.map((union) => (
                    <option key={union.id} value={union.id}>
                      {union.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Selection Info */}
            {(selectedDivision || selectedDistrict || selectedUpazila || selectedUnion) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-4"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Selected Location</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  {selectedDivision && (
                    <div>Division: {divisions.find(d => d.id === selectedDivision)?.name}</div>
                  )}
                  {selectedDistrict && (
                    <div>District: {districts.find(d => d.id === selectedDistrict)?.name}</div>
                  )}
                  {selectedUpazila && (
                    <div>Upazila: {upazilas.find(u => u.id === selectedUpazila)?.name}</div>
                  )}
                  {selectedUnion && (
                    <div>Union: {unions.find(u => u.id === selectedUnion)?.name}</div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Loading Status */}
            {loading && (
              <div className="flex items-center space-x-2 text-blue-600">
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading data...</span>
              </div>
            )}
          </motion.div>

          {/* API Response */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Current Endpoint */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span>Current Endpoint</span>
                </h3>
                <button
                  onClick={() => copyToClipboard(getActiveEndpoint())}
                  className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                GET {getActiveEndpoint()}
              </div>
            </div>

            {/* API Response */}
            {apiResponse && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">API Response</h3>
                  <span className="text-xs text-gray-500">{apiResponse.timestamp}</span>
                </div>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono overflow-x-auto max-h-96 overflow-y-auto">
                  <pre>{JSON.stringify(apiResponse.data, null, 2)}</pre>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Status: {apiResponse.data?.success ? 'Success' : 'Error'} | 
                  Count: {apiResponse.data?.data?.length || 0} items
                </div>
              </div>
            )}

            {/* Usage Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">How to Use</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Select a division to see districts</li>
                <li>• Select a district to see upazilas</li>
                <li>• Select an upazila to see unions</li>
                <li>• Select a union for detailed information</li>
                <li>• Copy the endpoint URL for your application</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default APIExplorer
