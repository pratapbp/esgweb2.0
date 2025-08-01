"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Shield, Zap, Users, BarChart3 } from "lucide-react"

export default function TechnologyBenefitsSection() {
  const benefitCategories = [
    {
      title: "Operational Efficiency",
      icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
      color: "blue",
      benefits: [
        { metric: "Production Efficiency", improvement: "+47%", description: "Streamlined processes and automation" },
        { metric: "Equipment Utilization", improvement: "+35%", description: "Optimized machine usage and scheduling" },
        {
          metric: "Cycle Time Reduction",
          improvement: "-38%",
          description: "Faster production cycles through optimization",
        },
        {
          metric: "Overall Equipment Effectiveness",
          improvement: "+42%",
          description: "Improved OEE through predictive maintenance",
        },
      ],
    },
    {
      title: "Cost Reduction",
      icon: <DollarSign className="h-8 w-8 text-green-400" />,
      color: "green",
      benefits: [
        { metric: "Operating Costs", improvement: "-32%", description: "Reduced labor and material costs" },
        { metric: "Maintenance Costs", improvement: "-45%", description: "Predictive maintenance reduces repairs" },
        { metric: "Energy Consumption", improvement: "-28%", description: "Smart systems optimize energy usage" },
        { metric: "Inventory Costs", improvement: "-35%", description: "Optimized inventory management" },
      ],
    },
    {
      title: "Quality Improvement",
      icon: <Shield className="h-8 w-8 text-purple-400" />,
      color: "purple",
      benefits: [
        { metric: "Defect Rate", improvement: "-85%", description: "AI-powered quality control systems" },
        { metric: "First-Pass Yield", improvement: "+28%", description: "Improved process control and monitoring" },
        { metric: "Customer Satisfaction", improvement: "+41%", description: "Higher quality products and delivery" },
        { metric: "Compliance Score", improvement: "+95%", description: "Automated compliance monitoring" },
      ],
    },
  ]

  const industryImpact = [
    { sector: "Automotive", efficiency: "+52%", cost: "-38%", quality: "+45%" },
    { sector: "Electronics", efficiency: "+48%", cost: "-35%", quality: "+52%" },
    { sector: "Pharmaceuticals", efficiency: "+41%", cost: "-42%", quality: "+68%" },
    { sector: "Food & Beverage", efficiency: "+39%", cost: "-31%", quality: "+38%" },
    { sector: "Aerospace", efficiency: "+44%", cost: "-36%", quality: "+58%" },
    { sector: "Textiles", efficiency: "+37%", cost: "-29%", quality: "+35%" },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-900/20",
          border: "border-blue-700/50",
          text: "text-blue-400",
        }
      case "green":
        return {
          bg: "bg-green-900/20",
          border: "border-green-700/50",
          text: "text-green-400",
        }
      case "purple":
        return {
          bg: "bg-purple-900/20",
          border: "border-purple-700/50",
          text: "text-purple-400",
        }
      default:
        return {
          bg: "bg-gray-900/20",
          border: "border-gray-700/50",
          text: "text-gray-400",
        }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-900/30 border border-yellow-700/50 text-yellow-400 text-sm font-medium mb-4">
            <BarChart3 className="mr-2 h-4 w-4" />
            Technology Benefits
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Measurable{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Impact</span>{" "}
            Across Operations
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our smart manufacturing solutions deliver quantifiable improvements across all aspects of your operations,
            from efficiency gains to cost reductions and quality enhancements.
          </p>
        </div>

        {/* Benefit Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {benefitCategories.map((category, index) => {
            const colors = getColorClasses(category.color)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`bg-gray-900 border-gray-800 h-full ${colors.bg} ${colors.border}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 rounded-lg bg-gray-800">{category.icon}</div>
                      <CardTitle className={`text-xl ${colors.text}`}>{category.title}</CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {category.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{benefit.metric}</h4>
                          <Badge className={`${colors.bg} ${colors.text} border-0`}>{benefit.improvement}</Badge>
                        </div>
                        <p className="text-sm text-gray-400">{benefit.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Industry Impact Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-center">Industry-Specific Impact</CardTitle>
              <p className="text-center text-gray-400">Average improvements across different manufacturing sectors</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold">Industry Sector</th>
                      <th className="text-center py-3 px-4 font-semibold text-blue-400">Efficiency Gain</th>
                      <th className="text-center py-3 px-4 font-semibold text-green-400">Cost Reduction</th>
                      <th className="text-center py-3 px-4 font-semibold text-purple-400">Quality Improvement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryImpact.map((industry, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-4 px-4 font-medium">{industry.sector}</td>
                        <td className="py-4 px-4 text-center">
                          <Badge className="bg-blue-900/30 text-blue-400 border-0">{industry.efficiency}</Badge>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Badge className="bg-green-900/30 text-green-400 border-0">{industry.cost}</Badge>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Badge className="bg-purple-900/30 text-purple-400 border-0">{industry.quality}</Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Success Factors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Rapid Implementation</h3>
                <p className="text-sm text-gray-400">Average deployment time of 6-12 weeks</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Expert Support</h3>
                <p className="text-sm text-gray-400">Dedicated team of manufacturing specialists</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Proven Results</h3>
                <p className="text-sm text-gray-400">2,500+ successful implementations</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Scalable Solutions</h3>
                <p className="text-sm text-gray-400">Grows with your business needs</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
