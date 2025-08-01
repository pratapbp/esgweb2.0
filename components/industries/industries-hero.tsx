"use client"
import { motion } from "framer-motion"
import { Building2, TrendingUp, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const stats = [
  {
    icon: Building2,
    value: "20+",
    label: "Industries Served",
    description: "Across multiple sectors",
  },
  {
    icon: Users,
    value: "50+",
    label: "Enterprise Clients",
    description: "Worldwide partnerships",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Success Rate",
    description: "Project completion",
  },
  {
    icon: Globe,
    value: "5",
    label: "Countries",
    description: "Global presence",
  },
]

export default function IndustriesHero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm border-blue-500/30 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-colors duration-300"
            >
              Industry Expertise
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Transforming Industries
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Through Innovation
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            We deliver specialized solutions across diverse industries, combining deep sector knowledge with
            cutting-edge technology to drive digital transformation and business growth.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Discuss Your Industry
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-white/10 px-8 py-3 rounded-xl transition-all duration-300 bg-transparent"
              >
                Explore Solutions
              </Button>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 mb-4 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-300">
                      <stat.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-300 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-400">{stat.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
