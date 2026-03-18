import { BarChart3, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import WorldBankSection from '../components/WorldBankSection'

const WorldBankPage = () => {

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-20">
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
                <BarChart3 className="w-8 h-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)]">World Bank Indicators</h1>
              </div>
              <p className="text-[var(--text-muted)] text-lg max-w-2xl">
                Explore comprehensive developmental data for Bangladesh from 1990 to 2025 across all key sectors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reusing the WorldBankSection with isFullPage=true */}
      <div className="-mt-16">
        <WorldBankSection isFullPage={true} />
      </div>
    </div>
  )
}

export default WorldBankPage
