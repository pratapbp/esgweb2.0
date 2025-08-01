"use client"
import { motion } from "framer-motion"

const technologies = [
  {
    name: "Machine Learning",
    description: "Advanced algorithms for predictive analytics and automation",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    name: "Neural Networks",
    description: "Deep learning models for complex pattern recognition",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    name: "Big Data",
    description: "Scalable data processing and analytics platforms",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  {
    name: "Predictive Analytics",
    description: "Forecasting and trend analysis for business intelligence",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
  {
    name: "Edge Computing",
    description: "Distributed computing for real-time processing",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
  },
  {
    name: "Secure AI",
    description: "Privacy-preserving artificial intelligence solutions",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
  },
]

const MachineLearningIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <defs>
      <linearGradient id="mlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>

    {/* Neural network nodes */}
    <motion.circle
      cx="20"
      cy="30"
      r="4"
      fill="url(#mlGradient)"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
    />
    <motion.circle
      cx="20"
      cy="50"
      r="4"
      fill="url(#mlGradient)"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
    />
    <motion.circle
      cx="20"
      cy="70"
      r="4"
      fill="url(#mlGradient)"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
    />

    <motion.circle
      cx="50"
      cy="25"
      r="4"
      fill="url(#mlGradient)"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
    />
    <motion.circle
      cx="50"
      cy="50"
      r="4"
      fill="url(#mlGradient)"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
    />
    <motion.circle
      cx="50"
      cy="75"
      r="4"
      fill="url(#mlGradient)"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.8 }}
    />

    <motion.circle
      cx="80"
      cy="40"
      r="4"
      fill="url(#mlGradient)"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
    />
    <motion.circle
      cx="80"
      cy="60"
      r="4"
      fill="url(#mlGradient)"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.7 }}
    />

    {/* Connections */}
    <motion.line
      x1="24"
      y1="30"
      x2="46"
      y2="25"
      stroke="url(#mlGradient)"
      strokeWidth="1"
      opacity="0.6"
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
    />
    <motion.line
      x1="24"
      y1="50"
      x2="46"
      y2="50"
      stroke="url(#mlGradient)"
      strokeWidth="1"
      opacity="0.6"
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
    />
    <motion.line
      x1="54"
      y1="25"
      x2="76"
      y2="40"
      stroke="url(#mlGradient)"
      strokeWidth="1"
      opacity="0.6"
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
    />
  </svg>
)

const NeuralNetworkIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <defs>
      <linearGradient id="nnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>

    {/* Multi-layer network */}
    {[15, 35, 55, 75].map((x, layerIndex) => (
      <g key={layerIndex}>
        {[25, 45, 65].map((y, nodeIndex) => (
          <motion.circle
            key={`${layerIndex}-${nodeIndex}`}
            cx={x}
            cy={y}
            r="3"
            fill="url(#nnGradient)"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: layerIndex * 0.2 + nodeIndex * 0.1,
            }}
          />
        ))}
      </g>
    ))}

    {/* Data flow visualization */}
    <motion.path
      d="M 10 45 Q 30 35, 50 45 Q 70 55, 90 45"
      stroke="url(#nnGradient)"
      strokeWidth="2"
      fill="none"
      opacity="0.4"
      animate={{
        pathLength: [0, 1, 0],
        opacity: [0, 0.8, 0],
      }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
    />
  </svg>
)

const BigDataIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <defs>
      <linearGradient id="bdGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>

    {/* Database cylinders */}
    <motion.ellipse
      cx="30"
      cy="25"
      rx="12"
      ry="4"
      fill="url(#bdGradient)"
      opacity="0.8"
      animate={{ scaleY: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
    />
    <motion.rect
      x="18"
      y="25"
      width="24"
      height="20"
      fill="url(#bdGradient)"
      opacity="0.6"
      animate={{ scaleX: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
    />
    <motion.ellipse
      cx="30"
      cy="45"
      rx="12"
      ry="4"
      fill="url(#bdGradient)"
      opacity="0.8"
      animate={{ scaleY: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
    />

    <motion.ellipse
      cx="70"
      cy="35"
      rx="10"
      ry="3"
      fill="url(#bdGradient)"
      opacity="0.8"
      animate={{ scaleY: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
    />
    <motion.rect
      x="60"
      y="35"
      width="20"
      height="15"
      fill="url(#bdGradient)"
      opacity="0.6"
      animate={{ scaleX: [1, 1.15, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
    />
    <motion.ellipse
      cx="70"
      cy="50"
      rx="10"
      ry="3"
      fill="url(#bdGradient)"
      opacity="0.8"
      animate={{ scaleY: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.8 }}
    />

    {/* Data streams */}
    <motion.path
      d="M 42 35 Q 50 30, 60 35"
      stroke="url(#bdGradient)"
      strokeWidth="2"
      fill="none"
      animate={{
        pathLength: [0, 1, 0],
        opacity: [0, 1, 0],
      }}
      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
    />
  </svg>
)

const PredictiveAnalyticsIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <defs>
      <linearGradient id="paGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
    </defs>

    {/* Chart bars growing */}
    {[20, 35, 50, 65, 80].map((x, index) => (
      <motion.rect
        key={index}
        x={x - 3}
        y={70 - (index + 1) * 8}
        width="6"
        height={(index + 1) * 8}
        fill="url(#paGradient)"
        animate={{
          scaleY: [0.5, 1, 0.8, 1.2, 1],
          opacity: [0.6, 1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          delay: index * 0.2,
        }}
      />
    ))}

    {/* Trend line */}
    <motion.path
      d="M 15 65 Q 30 55, 45 50 Q 60 45, 75 35 Q 85 30, 95 25"
      stroke="url(#paGradient)"
      strokeWidth="2"
      fill="none"
      animate={{
        pathLength: [0, 1],
        opacity: [0, 1],
      }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
    />

    {/* Prediction curve */}
    <motion.path
      d="M 75 35 Q 85 25, 95 15"
      stroke="url(#paGradient)"
      strokeWidth="2"
      fill="none"
      strokeDasharray="4,2"
      animate={{
        pathLength: [0, 1],
        opacity: [0, 0.8],
      }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
    />
  </svg>
)

const EdgeComputingIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <defs>
      <linearGradient id="ecGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14B8A6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>

    {/* Central processor */}
    <motion.rect
      x="40"
      y="40"
      width="20"
      height="20"
      rx="4"
      fill="url(#ecGradient)"
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
    />

    {/* Edge nodes */}
    {[
      { x: 20, y: 20 },
      { x: 80, y: 20 },
      { x: 20, y: 80 },
      { x: 80, y: 80 },
      { x: 50, y: 15 },
      { x: 15, y: 50 },
      { x: 85, y: 50 },
      { x: 50, y: 85 },
    ].map((pos, index) => (
      <motion.circle
        key={index}
        cx={pos.x}
        cy={pos.y}
        r="4"
        fill="url(#ecGradient)"
        opacity="0.7"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          delay: index * 0.2,
        }}
      />
    ))}

    {/* Data pulses */}
    <motion.circle
      cx="50"
      cy="50"
      r="2"
      fill="url(#ecGradient)"
      animate={{
        scale: [0, 3, 0],
        opacity: [1, 0, 1],
      }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
    />
  </svg>
)

const SecureAIIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <defs>
      <linearGradient id="saGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>

    {/* Shield */}
    <motion.path
      d="M 50 15 Q 35 20, 35 35 Q 35 60, 50 80 Q 65 60, 65 35 Q 65 20, 50 15 Z"
      fill="url(#saGradient)"
      opacity="0.8"
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
    />

    {/* Lock */}
    <motion.rect
      x="45"
      y="45"
      width="10"
      height="8"
      rx="1"
      fill="white"
      opacity="0.9"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
    />
    <motion.path
      d="M 47 45 Q 47 40, 50 40 Q 53 40, 53 45"
      stroke="white"
      strokeWidth="2"
      fill="none"
      opacity="0.9"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
    />

    {/* Security particles */}
    {[
      { x: 25, y: 30 },
      { x: 75, y: 25 },
      { x: 30, y: 70 },
      { x: 70, y: 75 },
    ].map((pos, index) => (
      <motion.circle
        key={index}
        cx={pos.x}
        cy={pos.y}
        r="2"
        fill="url(#saGradient)"
        opacity="0.6"
        animate={{
          y: [pos.y, pos.y - 10, pos.y],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          delay: index * 0.5,
        }}
      />
    ))}
  </svg>
)

const iconComponents = {
  "Machine Learning": MachineLearningIcon,
  "Neural Networks": NeuralNetworkIcon,
  "Big Data": BigDataIcon,
  "Predictive Analytics": PredictiveAnalyticsIcon,
  "Edge Computing": EdgeComputingIcon,
  "Secure AI": SecureAIIcon,
}

export default function AITechIcons() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI-Powered Technologies
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Cutting-edge artificial intelligence and machine learning technologies that power our industry solutions
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => {
            const IconComponent = iconComponents[tech.name as keyof typeof iconComponents]

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={`
                  relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer
                  ${tech.bgColor} ${tech.borderColor} hover:border-opacity-50 hover:shadow-2xl
                `}
                >
                  {/* Background gradient effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div
                        className={`p-4 rounded-xl bg-gradient-to-r ${tech.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      >
                        <IconComponent />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                        {tech.name}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{tech.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
