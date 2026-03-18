import { motion } from 'framer-motion'
import { Landmark, Building2, MapPin, Home, ShoppingBag, BarChart3 } from 'lucide-react'

const Stats = () => {
  const stats = [
    { number: "8", label: "Divisions", icon: Landmark, color: "from-emerald-400 to-emerald-600" },
    { number: "64", label: "Districts", icon: Building2, color: "from-blue-400 to-blue-600" },
    { number: "495+", label: "Upazilas", icon: MapPin, color: "from-purple-400 to-purple-600" },
    { number: "4,500+", label: "Unions", icon: Home, color: "from-orange-400 to-orange-600" },
    { number: "30+", label: "GI Products", icon: ShoppingBag, color: "from-pink-400 to-pink-600" },
    { number: "50+", label: "World Bank Data", icon: BarChart3, color: "from-indigo-400 to-indigo-600" }
  ]

  // Duplicate stats for infinite scroll effect
  const duplicatedStats = [...stats, ...stats, ...stats]

  return (
    <section className="py-24 bg-[var(--bg-secondary)] overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto container-padding relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
            Comprehensive <span className="text-gradient">Bangladesh Data</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-primary-light mx-auto rounded-full"></div>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden group">
        {/* Left Gradient Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent z-20"></div>
        
        {/* Scrolling Content */}
        <motion.div
          className="flex gap-8 py-4 whitespace-nowrap"
          animate={{
            x: [0, -1920], // Adjusted for the width of the duplicated content
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={`${stat.label}-${index}`}
                className="flex-shrink-0 w-72 h-44 card p-8 relative group/card hover:border-primary/50 transition-all cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-[var(--text)] tracking-tight">
                    {stat.number}
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[var(--text)] mb-1">{stat.label}</div>
                  <div className="text-sm text-[var(--text-muted)]">Verified Dataset</div>
                </div>
                
                {/* Decorative glow on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-[2rem] opacity-0 group-hover/card:opacity-10 blur-xl transition-opacity pointer-events-none`}></div>
              </div>
            )
          })}
        </motion.div>

        {/* Right Gradient Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent z-20"></div>
      </div>
    </section>
  )
}

export default Stats
