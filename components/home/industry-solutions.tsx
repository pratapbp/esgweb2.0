"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Factory,
  ShoppingCart,
  Heart,
  Banknote,
  GraduationCap,
  Building,
  ArrowRight,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import Link from "next/link"

const industries = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Smart manufacturing with Industry 4.0 solutions",
    icon: Factory,
    color: "from-blue-500 to-cyan-500",
    href: "/industries/manufacturing",
    stats: {
      efficiency: "+40%",
      downtime: "-60%",
      quality: "+25%",
    },
    solutions: ["Predictive Maintenance", "Quality Control", "Supply Chain Optimization", "Digital Twin"],
  },
  {
    id: "retail",
    title: "Retail & E-commerce",
    description: "Omnichannel retail transformation",
    icon: ShoppingCart,
    color: "from-green-500 to-emerald-500",
    href: "/industries/retail",
    stats: {
      conversion: "+65%",
      satisfaction: "+45%",
      revenue: "+30%",
    },
    solutions: ["Customer Analytics", "Inventory Optimization", "Personalization", "Omnichannel Experience"],
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Digital health and patient care solutions",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    href: "/industries/healthcare",
    stats: {
      efficiency: "+50%",
      accuracy: "+35%",
      satisfaction: "+40%",
    },
    solutions: ["Patient Management", "Telemedicine", "Medical Analytics", "Compliance Management"],
  },
  {
    id: "banking",
    title: "Banking & Finance",
    description: "Digital banking and fintech solutions",
    icon: Banknote,
    color: "from-yellow-500 to-orange-500",
    href: "/industries/bfsi",
    stats: {
      processing: "+70%",
      fraud: "-80%",
      satisfaction: "+55%",
    },
    solutions: ["Digital Banking", "Risk Management", "Fraud Detection", "Regulatory Compliance"],
  },
  {
    id: "education",
    title: "Education",
    description: "EdTech and learning management platforms",
    icon: GraduationCap,
    color: "from-purple-500 to-indigo-500",
    href: "/industries/education",
    stats: {
      engagement: "+60%",
      outcomes: "+35%",
      efficiency: "+45%",
    },
    solutions: ["Learning Management", "Student Analytics", "Virtual Classrooms", "Assessment Tools"],
  },
  {
    id: "government",
    title: "Government",
    description: "Public sector digital transformation",
    icon: Building,
    color: "from-indigo-500 to-purple-500",
    href: "/industries/public-sector",
    stats: {
      efficiency: "+55%",
      transparency: "+70%",
      satisfaction: "+40%",
    },
    solutions: ["Citizen Services", "Digital Identity", "Process Automation", "Data Analytics"],
  },
]

export function IndustrySolutions() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800/20 to-gray-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-success-green/20 text-success-green border-success-green/30">
            <Building className="w-4 h-4 mr-2" />
            Industry Solutions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-luminous-white mb-6">Tailored for Every Industry</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Specialized AI and SAP solutions designed for your industry's unique challenges and opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="h-full bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-electric-cyan/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${industry.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <industry.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-luminous-white group-hover:text-electric-cyan transition-colors">
                    {industry.title}
                  </CardTitle>
                  <p className="text-gray-300">{industry.description}</p>
                </CardHeader>
                <CardContent>
                  {/* Industry Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {Object.entries(industry.stats).map(([key, value], statIndex) => (
                      <div key={key} className="text-center p-2 bg-gray-800/50 rounded-lg">
                        <div className="text-lg font-bold text-success-green">{value}</div>
                        <div className="text-xs text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Solutions */}
                  <div className="space-y-2 mb-6">
                    {industry.solutions.map((solution, solutionIndex) => (
                      <div key={solutionIndex} className="flex items-center text-sm text-gray-300">
                        <div className="w-2 h-2 bg-electric-cyan rounded-full mr-3 flex-shrink-0" />
                        {solution}
                      </div>
                    ))}
                  </div>

                  <Link href={industry.href}>
                    <Button className="w-full bg-gradient-to-r from-electric-cyan/20 to-neural-violet/20 border border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/10 group-hover:border-electric-cyan/70">
                      Explore Solutions
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Industry Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { icon: TrendingUp, value: "50+", label: "Industry Projects", color: "text-blue-400" },
            { icon: Users, value: "200+", label: "Industry Experts", color: "text-green-400" },
            { icon: Zap, value: "95%", label: "Success Rate", color: "text-yellow-400" },
            { icon: Building, value: "3+", label: "Countries", color: "text-purple-400" },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`${metric.color} mb-3 flex justify-center`}>
                <metric.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-luminous-white mb-1">{metric.value}</div>
              <div className="text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
