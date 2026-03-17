import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Stats = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { number: "8", label: "Divisions", icon: "🏛️" },
    { number: "64", label: "Districts", icon: "🏘️" },
    { number: "495+", label: "Upazilas", icon: "📍" },
    { number: "4,500+", label: "Unions", icon: "🏡" }
  ]

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Complete Bangladesh Geography
          </h2>
          <div className="w-16 h-1 bd-green-bg mx-auto rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="text-4xl sm:text-5xl font-bold bd-green mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
