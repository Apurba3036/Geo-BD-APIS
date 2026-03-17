import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Landmark, Building2, MapPin, Home } from 'lucide-react'

const Stats = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { number: "8", label: "Divisions", icon: Landmark, color: "from-emerald-400 to-emerald-600" },
    { number: "64", label: "Districts", icon: Building2, color: "from-blue-400 to-blue-600" },
    { number: "495+", label: "Upazilas", icon: MapPin, color: "from-purple-400 to-purple-600" },
    { number: "4,500+", label: "Unions", icon: Home, color: "from-orange-400 to-orange-600" }
  ]

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)] mb-4">
            Complete Bangladesh Geography
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="card p-6 sm:p-8">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-[var(--text-muted)] font-medium">{stat.label}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Stats
