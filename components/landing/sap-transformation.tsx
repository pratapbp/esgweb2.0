"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SapTransformation() {
  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Increased Efficiency",
      description: "Streamline operations with automated workflows and intelligent process optimization.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Enhanced Collaboration",
      description: "Connect teams across departments with unified communication and data sharing.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Accelerated Growth",
      description: "Scale your business rapidly with flexible, cloud-native SAP solutions.",
    },
  ]

  const achievements = [
    { number: "500+", label: "Successful Implementations" },
    { number: "98%", label: "Client Satisfaction Rate" },
    { number: "40%", label: "Average Cost Reduction" },
    { number: "15+", label: "Years of Expertise" },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/city-digital-network.jpg"
          alt="Digital transformation cityscape"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-blue-400/30 mb-6">
              <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-blue-300 text-sm font-medium">Proven SAP Excellence</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Transform Your Business with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                SAP Innovation
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-8">
              Unlock unprecedented business value through our comprehensive SAP transformation services. From legacy
              system modernization to cutting-edge S/4HANA implementations, we deliver solutions that drive real
              results.
            </p>

            {/* Benefits */}
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 p-2 rounded-lg bg-blue-600/20 border border-blue-400/30">
                    <div className="text-blue-400">{benefit.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4"
            >
              Start Your Transformation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{achievement.number}</div>
                    <div className="text-gray-300 text-sm">{achievement.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
