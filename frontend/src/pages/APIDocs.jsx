import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, ChevronRight, Book, Code, Zap, Activity, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const APIDocs = () => {
  const [copiedId, setCopiedId] = useState(null)
  const [activeEndpoint, setActiveEndpoint] = useState('divisions')

  const endpoints = {
    divisions: {
      title: 'Divisions',
      icon: '🏛️',
      endpoints: [
        {
          method: 'GET',
          path: '/api/divisions',
          description: 'Get all 8 divisions of Bangladesh',
          example: `curl https://geo-bd-apis.onrender.com/api/divisions`,
          response: `{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Chattagram",
      "bn_name": "চট্টগ্রাম",
      "url": "www.chittagongdiv.gov.bd",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "count": 8
}`
        },
        {
          method: 'GET',
          path: '/api/divisions/:id',
          description: 'Get a specific division by ID',
          example: `curl https://geo-bd-apis.onrender.com/api/divisions/1`,
          response: `{
  "success": true,
  "data": {
    "id": "1",
    "name": "Chattagram",
    "bn_name": "চট্টগ্রাম",
    "url": "www.chittagongdiv.gov.bd",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}`
        },
        {
          method: 'GET',
          path: '/api/divisions/:id/districts',
          description: 'Get division with all its districts',
          example: `curl https://geo-bd-apis.onrender.com/api/divisions/1/districts`,
          response: `{
  "success": true,
  "data": {
    "id": "1",
    "name": "Chattagram",
    "bn_name": "চট্টগ্রাম",
    "url": "www.chittagongdiv.gov.bd",
    "districts": [
      {
        "id": "1",
        "name": "Comilla",
        "bn_name": "কুমিল্লা",
        "lat": "23.4682747",
        "lon": "91.1788135",
        "url": "www.comilla.gov.bd"
      }
    ]
  }
}`
        }
      ]
    },
    districts: {
      title: 'Districts',
      icon: '🏘️',
      endpoints: [
        {
          method: 'GET',
          path: '/api/districts',
          description: 'Get all 64 districts of Bangladesh',
          example: `curl https://geo-bd-apis.onrender.com/api/districts`,
          response: `{
  "success": true,
  "data": [
    {
      "id": "1",
      "division_id": "1",
      "name": "Comilla",
      "bn_name": "কুমিল্লা",
      "lat": "23.4682747",
      "lon": "91.1788135",
      "url": "www.comilla.gov.bd",
      "division": {
        "id": "1",
        "name": "Chattagram",
        "bn_name": "চট্টগ্রাম"
      }
    }
  ],
  "count": 64
}`
        },
        {
          method: 'GET',
          path: '/api/districts?division_id=:id',
          description: 'Get districts by division ID',
          example: `curl https://geo-bd-apis.onrender.com/api/districts?division_id=2`,
          response: `{
  "success": true,
  "data": [
    {
      "id": "13",
      "division_id": "2",
      "name": "Pabna",
      "bn_name": "পাবনা",
      "lat": "23.998524",
      "lon": "89.233645",
      "url": "www.pabna.gov.bd",
      "division": {
        "id": "2",
        "name": "Rajshahi",
        "bn_name": "রাজশাহী"
      }
    }
  ],
  "count": 8
}`
        },
        {
          method: 'GET',
          path: '/api/districts/search?q=:query',
          description: 'Search districts by name (English or Bengali)',
          example: `curl https://geo-bd-apis.onrender.com/api/districts/search?q=Pabna`,
          response: `{
  "success": true,
  "data": [
    {
      "id": "13",
      "division_id": "2",
      "name": "Pabna",
      "bn_name": "পাবনা",
      "lat": "23.998524",
      "lon": "89.233645",
      "url": "www.pabna.gov.bd",
      "division": {
        "id": "2",
        "name": "Rajshahi",
        "bn_name": "রাজশাহী"
      }
    }
  ],
  "count": 1
}`
        }
      ]
    },
    upazilas: {
      title: 'Upazilas',
      icon: '📍',
      endpoints: [
        {
          method: 'GET',
          path: '/api/upazilas',
          description: 'Get all upazilas of Bangladesh',
          example: `curl https://geo-bd-apis.onrender.com/api/upazilas`,
          response: `{
  "success": true,
  "data": [
    {
      "id": "1",
      "district_id": "1",
      "name": "Debidwar",
      "bn_name": "দেবিদ্বার",
      "url": "debidwar.comilla.gov.bd",
      "district": {
        "id": "1",
        "name": "Comilla",
        "bn_name": "কুমিল্লা"
      }
    }
  ],
  "count": 495
}`
        },
        {
          method: 'GET',
          path: '/api/upazilas?district_id=:id',
          description: 'Get upazilas by district ID',
          example: `curl https://geo-bd-apis.onrender.com/api/upazilas?district_id=13`,
          response: `{
  "success": true,
  "data": [
    {
      "id": "85",
      "district_id": "13",
      "name": "Pabna Sadar",
      "bn_name": "পাবনা সদর",
      "url": "pabnasadar.pabna.gov.bd",
      "district": {
        "id": "13",
        "name": "Pabna",
        "bn_name": "পাবনা"
      }
    }
  ],
  "count": 9
}`
        },
        {
          method: 'GET',
          path: '/api/upazilas/search?q=:query',
          description: 'Search upazilas by name (English or Bengali)',
          example: `curl https://geo-bd-apis.onrender.com/api/upazilas/search?q=Debidwar`,
          response: `{
  "success": true,
  "data": [
    {
      "id": "1",
      "district_id": "1",
      "name": "Debidwar",
      "bn_name": "দেবিদ্বার",
      "url": "debidwar.comilla.gov.bd",
      "district": {
        "id": "1",
        "name": "Comilla",
        "bn_name": "কুমিল্লা"
      }
    }
  ],
  "count": 1
}`
        }
      ]
    },
    unions: {
      title: 'Unions',
      icon: '🏛️',
      endpoints: [
        {
          method: 'GET',
          path: '/api/unions',
          description: 'Get all unions of Bangladesh',
          example: `curl https://geo-bd-apis.onrender.com/api/unions`,
          response: `{
  "success": true,
  "data": [
    {
      "id": "1",
      "upazila_id": "1",
      "name": "Baragachhia",
      "bn_name": "বড়গাছিয়া",
      "url": "baragachia.debidwar.gov.bd",
      "upazila": {
        "id": "1",
        "name": "Debidwar",
        "bn_name": "দেবিদ্বার"
      }
    }
  ],
  "count": 4563
}`
        },
        {
          method: 'GET',
          path: '/api/unions?upazila_id=:id',
          description: 'Get unions by upazila ID',
          example: `curl https://geo-bd-apis.onrender.com/api/unions?upazila_id=85`,
          response: `{
  "success": true,
  "data": [
    {
      "id": "756",
      "upazila_id": "85",
      "name": "Pabna Sadar",
      "bn_name": "পাবনা সদর",
      "url": "pabnasadar.pabna.gov.bd",
      "upazila": {
        "id": "85",
        "name": "Pabna Sadar",
        "bn_name": "পাবনা সদর"
      }
    }
  ],
  "count": 12
}`
        },
        {
          method: 'GET',
          path: '/api/unions/:id',
          description: 'Get a specific union by ID',
          example: `curl https://geo-bd-apis.onrender.com/api/unions/1`,
          response: `{
  "success": true,
  "data": {
    "id": "1",
    "upazila_id": "1",
    "name": "Baragachhia",
    "bn_name": "বড়গাছিয়া",
    "url": "baragachia.debidwar.gov.bd",
    "upazila": {
      "id": "1",
      "name": "Debidwar",
      "bn_name": "দেবিদ্বার"
    }
  }
}`
        },
        {
          method: 'GET',
          path: '/api/unions/search?q=:query',
          description: 'Search unions by name (English or Bengali)',
          example: `curl https://geo-bd-apis.onrender.com/api/unions/search?q=Baragachhia`,
          response: `{
  "success": true,
  "data": [
    {
      "id": "1",
      "upazila_id": "1",
      "name": "Baragachhia",
      "bn_name": "বড়গাছিয়া",
      "url": "baragachia.debidwar.gov.bd",
      "upazila": {
        "id": "1",
        "name": "Debidwar",
        "bn_name": "দেবিদ্বার"
      }
    }
  ],
  "count": 1
}`
        }
      ]
    },
    giproducts: {
      title: 'GI Products',
      icon: '🛍️',
      endpoints: [
        {
          method: 'GET',
          path: '/api/giproducts',
          description: 'Get all Geographical Indication (GI) products of Bangladesh',
          example: `curl https://geo-bd-apis.onrender.com/api/giproducts`,
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
    },
    worldbank: {
      title: 'World Bank Data',
      icon: '📊',
      endpoints: [
        {
          method: 'GET',
          path: '/api/worldbank',
          description: 'Get all World Bank development indicators for Bangladesh',
          example: `curl https://geo-bd-apis.onrender.com/api/worldbank`,
          response: `[...]`
        }
      ]
    },
    who: {
      title: 'WHO Health Data',
      icon: '🏥',
      endpoints: [
        {
          method: 'GET',
          path: '/api/who',
          description: 'Fetch all available WHO health indicators for Bangladesh',
          example: `curl https://geo-bd-apis.onrender.com/api/who`,
          response: `{
  "success": true,
  "count": 38,
  "data": [
    {
      "uuid": "AC597B1",
      "name": "Maternal mortality ratio",
      "data": { "2021": 193.89, "2020": 151.84 }
    }
  ]
}`
        },
        {
          method: 'GET',
          path: '/api/who/:uuid',
          description: 'Get historical data for a specific health indicator using its UUID',
          example: `curl https://geo-bd-apis.onrender.com/api/who/AC597B1`,
          response: `{
  "indicator": "Maternal mortality ratio",
  "data": { "2021": 193.89, "2020": 151.84 }
}`
        }
      ],
      customContent: (
        <div className="bg-amber-500/5 rounded-3xl p-8 border border-amber-500/10 mt-12">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-400">WHO Data Terms of Use</h3>
          </div>
          <div className="space-y-4 text-sm text-amber-800/80 dark:text-amber-400/80 leading-relaxed">
            <p className="font-bold">License: Creative Commons Attribution 4.0 International (CC BY 4.0)</p>
            <p>The World Health Organization (“WHO”) encourages public access and use of the data that it collects and publishes on its web site data.who.int. Use of the data is subject to these mandatory Terms and Conditions.</p>
            <div className="bg-[var(--bg)] p-6 rounded-2xl border border-amber-500/20 shadow-sm space-y-4 text-xs font-mono text-[var(--text)]">
              <p><strong>Prohibited Uses:</strong></p>
              <ul className="list-disc list-inside space-y-2">
                <li>You shall not attempt to de-anonymise the Datasets or use the Datasets in a manner that falsifies or misrepresents their content.</li>
                <li>You shall not, in connection with your use of the Datasets, state or imply that WHO endorses you.</li>
              </ul>
            </div>
            <p><strong>Dispute Resolution:</strong> Any dispute relating to the interpretation or application of this license shall be subject to conciliation or arbitration in accordance with UNCITRAL Arbitration Rules.</p>
            <div className="flex items-center gap-2 pt-4 border-t border-amber-500/10 text-emerald-600 font-medium italic">
              <Activity className="w-4 h-4" />
              <span>Developers must ensure these terms are passed down to end-users.</span>
            </div>
          </div>
        </div>
      )
    }
  }

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
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto container-padding py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[var(--text)] mb-2">API Documentation</h1>
              <p className="text-[var(--text-muted)]">Complete guide for the API Hub endpoints</p>
            </div>
            <Link to="/" className="btn-secondary self-start sm:self-auto">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto container-padding py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-2">
              {Object.entries(endpoints).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveEndpoint(key)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    activeEndpoint === key
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-[var(--bg-secondary)] text-[var(--text)] hover:bg-[var(--bg-tertiary)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {Object.entries(endpoints).map(([key, section]) => (
              <div
                key={key}
                className={activeEndpoint === key ? 'block' : 'hidden'}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[var(--text)] mb-2">
                    {section.icon} {section.title}
                  </h2>
                  <p className="text-[var(--text-muted)]">
                    API endpoints for {section.title.toLowerCase()} of Bangladesh
                  </p>
                </div>

                <div className="space-y-8">
                  {section.endpoints.map((endpoint, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="card overflow-hidden"
                    >
                      {/* Header */}
                      <div className="px-6 py-4 border-b border-[var(--border)]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-primary text-white text-sm font-semibold rounded-lg">
                              {endpoint.method}
                            </span>
                            <code className="text-lg font-mono text-[var(--text)]">
                              {endpoint.path}
                            </code>
                          </div>
                          <button
                            onClick={() => copyToClipboard(endpoint.example, `${key}-${index}`)}
                            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-primary hover:bg-[var(--bg-secondary)] transition-all"
                          >
                            {copiedId === `${key}-${index}` ? (
                              <Check className="w-5 h-5 text-primary" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <p className="mt-2 text-[var(--text-muted)]">{endpoint.description}</p>
                      </div>

                      {/* Example */}
                      <div className="px-6 py-4">
                        <h4 className="font-semibold text-[var(--text)] mb-2">Example</h4>
                        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-[var(--text-secondary)] font-mono">
                            <code>{endpoint.example}</code>
                          </pre>
                        </div>
                      </div>

                      {/* Response */}
                      <div className="px-6 py-4 bg-[var(--bg-secondary)]">
                        <h4 className="font-semibold text-[var(--text)] mb-2">Response</h4>
                        <div className="bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg p-4 overflow-x-auto">
                          <pre className="text-xs text-[var(--text-secondary)] font-mono">
                            <code>{endpoint.response}</code>
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {section.customContent}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIDocs
