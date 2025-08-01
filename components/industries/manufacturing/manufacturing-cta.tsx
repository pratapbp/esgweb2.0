"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Phone, Calendar, Download, MessageSquare, CheckCircle } from "lucide-react"

export default function ManufacturingCTA() {
  const ctaOptions = [
    {
      title: "Schedule a Consultation",
      description: "Get personalized recommendations for your manufacturing operations",
      icon: <Calendar className="h-6 w-6" />,
      action: "Book Meeting",
      color: "blue",
      benefits: ["Free 60-minute consultation", "Custom solution roadmap", "ROI analysis"],
    },
    {
      title: "Request a Demo",
      description: "See our smart manufacturing solutions in action",
      icon: <MessageSquare className="h-6 w-6" />,
      action: "Watch Demo",
      color: "green",
      benefits: ["Live product demonstration", "Q&A with experts", "Use case examples"],
    },
    {
      title: "Download Resources",
      description: "Access our comprehensive manufacturing transformation guide",
      icon: <Download className="h-6 w-6" />,
      action: "Get Guide",
      color: "purple",
      benefits: ["50-page implementation guide", "Best practices checklist", "ROI calculator"],
    },
  ]

  const successMetrics = [
    { label: "Average ROI", value: "340%", description: "Within 12 months" },
    { label: "Implementation Time", value: "8-12 weeks", description: "From start to production" },
    { label: "Client Satisfaction", value: "98%", description: "Would recommend us" },
    { label: "Uptime Improvement", value: "25%", description: "Average increase" },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-600 hover:bg-blue-700",
          border: "border-blue-500",
          text: "text-blue-400",
        }
      case "green":
        return {
          bg: "bg-green-600 hover:bg-green-700",
          border: "border-green-500",
          text: "text-green-400",
        }
      case "purple":
        return {
          bg: "bg-purple-600 hover:bg-purple-700",
          border: "border-purple-500",
          text: "text-purple-400",
        }
      default:
        return {
          bg: "bg-gray-600 hover:bg-gray-700",
          border: "border-gray-500",
          text: "text-gray-400",
        }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 text-blue-400 text-sm font-medium mb-6">
              <CheckCircle className="mr-2 h-4 w-4" />
              Ready to Transform Your Manufacturing?
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Start Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Smart Manufacturing
              </span>{" "}
              Journey Today
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join 2,500+ manufacturers who have transformed their operations with our AI-powered solutions. Get started
              with a free consultation and discover your potential for improvement.
            </p>
          </motion.div>
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {successMetrics.map((metric, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-400 mb-2">{metric.value}</div>
                <div className="text-sm font-semibold mb-1">{metric.label}</div>
                <div className="text-xs text-gray-400">{metric.description}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* CTA Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {ctaOptions.map((option, index) => {
            const colors = getColorClasses(option.color)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full hover:shadow-lg hover:shadow-blue-900/20 transition-all">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-6 ${colors.text}`}
                    >
                      {option.icon}
                    </div>

                    <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                    <p className="text-gray-300 mb-6">{option.description}</p>

                    <div className="space-y-3 mb-8">
                      {option.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button className={`w-full ${colors.bg}`}>
                      {option.action} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-700/50">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-red-400 mr-3" />
                <div>
                  <h3 className="text-xl font-bold">Need Immediate Support?</h3>
                  <p className="text-gray-300">Our manufacturing experts are available 24/7 for urgent consultations</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">1-800-SMART-MFG</div>
                  <div className="text-sm text-gray-400">24/7 Emergency Hotline</div>
                </div>

                <div className="hidden sm:block w-px h-12 bg-gray-700"></div>

                <div className="text-center">
                  <div className="text-lg font-semibold">support@esg-manufacturing.com</div>
                  <div className="text-sm text-gray-400">Email Support</div>
                </div>
              </div>

              <Badge variant="secondary" className="mt-4 bg-red-900/30 text-red-400">
                Average Response Time: &lt; 15 minutes
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Join industry leaders who trust ESG for their manufacturing transformation
          </p>

          <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-gray-500">FORD</div>
            <div className="text-2xl font-bold text-gray-500">BOEING</div>
            <div className="text-2xl font-bold text-gray-500">3M</div>
            <div className="text-2xl font-bold text-gray-500">CATERPILLAR</div>
            <div className="text-2xl font-bold text-gray-500">GE</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
