import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import toast from 'react-hot-toast'

const APIShowcase = () => {
  const [copiedId, setCopiedId] = useState(null)

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/divisions',
      description: 'Get all 8 divisions of Bangladesh',
      response: `{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Chattagram",
      "bn_name": "চট্টগ্রাম",
      "url": "www.chittagongdiv.gov.bd"
    }
  ],
  "count": 8
}`
    },
    {
      method: 'GET',
      endpoint: '/api/districts?division_id=2',
      description: 'Get all districts in Rajshahi division',
      response: `{
  "success": true,
  "data": [
    {
      "id": "13",
      "name": "Pabna",
      "bn_name": "পাবনা",
      "lat": "23.998524",
      "lon": "89.233645",
      "url": "www.pabna.gov.bd"
    }
  ],
  "count": 8
}`
    },
    {
      method: 'GET',
      endpoint: '/api/upazilas?district_id=13',
      description: 'Get all upazilas in Pabna district',
      response: `{
  "success": true,
  "data": [
    {
      "id": "85",
      "district_id": "13",
      "name": "Pabna Sadar",
      "bn_name": "পাবনা সদর",
      "url": "pabnasadar.pabna.gov.bd"
    }
  ],
  "count": 9
}`
    }
  ]

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple & Clean API
          </h2>
          <div className="w-16 h-1 bd-green-bg mx-auto rounded mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            RESTful endpoints with consistent JSON responses. Always returns official government links.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {apiEndpoints.map((api, index) => (
            <motion.div
              key={api.endpoint}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-[#006A4E] text-white text-xs font-semibold rounded">
                    {api.method}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(api.endpoint, index)}
                  className="text-gray-500 hover:text-[#006A4E] transition-colors"
                >
                  {copiedId === index ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Endpoint */}
              <div className="mb-4">
                <code className="text-sm text-gray-800 font-mono bg-gray-50 px-3 py-2 rounded-lg block">
                  {api.endpoint}
                </code>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">{api.description}</p>

              {/* Response Preview */}
              <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                <pre className="text-xs text-gray-300 font-mono">
                  <code>{api.response}</code>
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/docs"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
          >
            <span>View Full Documentation</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default APIShowcase
