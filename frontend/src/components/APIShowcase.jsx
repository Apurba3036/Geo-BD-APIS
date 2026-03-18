import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Terminal, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

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
    },
    {
      method: 'GET',
      endpoint: '/api/giproducts',
      description: 'Get all Geographical Indication (GI) products of Bangladesh',
      response: `{
  "success": true,
  "data": [
    {
      "sl_no": 1,
      "gi_product_name": "Jamdani",
      "category": "Textile",
      "origin": "Narayanganj"
    }
  ],
  "count": 33
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
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full mb-6">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-sm text-[var(--text-secondary)]">RESTful API</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)] mb-4">
            Simple & Clean API
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            RESTful endpoints with consistent JSON responses. Always returns official government links. 
            <span className="block mt-2">
              📁 Source: <a href="https://github.com/Apurba3036/Geo-BD-APIS" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light underline">Geo-BD-APIS</a>
            </span>
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
              className="card p-6 group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-primary text-white text-xs font-semibold rounded-lg">
                    {api.method}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(api.endpoint, index)}
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-primary hover:bg-[var(--bg-secondary)] transition-all"
                >
                  {copiedId === index ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Endpoint */}
              <div className="mb-4">
                <code className="text-sm text-[var(--text)] font-mono bg-[var(--bg-secondary)] px-3 py-2 rounded-lg block border border-[var(--border)]">
                  {api.endpoint}
                </code>
              </div>

              {/* Description */}
              <p className="text-sm text-[var(--text-muted)] mb-4">{api.description}</p>

              {/* Response Preview */}
              <div className="bg-[var(--bg-secondary)] rounded-lg p-3 overflow-x-auto border border-[var(--border)]">
                <pre className="text-xs text-[var(--text-secondary)] font-mono">
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
          <Link
            to="/docs"
            className="group btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
          >
            <span>View Full Documentation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default APIShowcase
