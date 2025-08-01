"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Award, Users } from "lucide-react"

const trustedCompanies = [
  { name: "Microsoft", logo: "/placeholder.svg?height=60&width=120&text=Microsoft" },
  { name: "SAP", logo: "/placeholder.svg?height=60&width=120&text=SAP" },
  { name: "Amazon", logo: "/placeholder.svg?height=60&width=120&text=Amazon" },
  { name: "Google", logo: "/placeholder.svg?height=60&width=120&text=Google" },
  { name: "IBM", logo: "/placeholder.svg?height=60&width=120&text=IBM" },
  { name: "Oracle", logo: "/placeholder.svg?height=60&width=120&text=Oracle" },
  { name: "Salesforce", logo: "/placeholder.svg?height=60&width=120&text=Salesforce" },
  { name: "Adobe", logo: "/placeholder.svg?height=60&width=120&text=Adobe" },
]

const stats = [
  { value: "500+", label: "Enterprise Clients", icon: Users },
  { value: "98.7%", label: "Client Satisfaction", icon: Award },
  { value: "50+", label: "Countries Served", icon: Users },
  { value: "24/7", label: "Global Support", icon: Award },
]

export function TrustedBySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/20 to-gray-800/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-success-green/20 text-success-green border-success-green/30">
            <Award className="w-4 h-4 mr-2" />
            Trusted Worldwide
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-luminous-white mb-6">Trusted by Industry Leaders</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the world's most innovative companies who trust ESG for their digital transformation
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-electric-cyan mb-2 flex justify-center">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-luminous-white mb-1">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {trustedCompanies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  className="h-12 md:h-16 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
