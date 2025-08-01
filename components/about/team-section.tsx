"use client"

import { motion } from "framer-motion"
import {
  Users,
  Award,
  Globe,
  TrendingUp,
  Brain,
  Shield,
  Rocket,
  Target,
  CheckCircle,
  Star,
  Building,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Company Excellence Areas
const excellenceAreas = [
  {
    title: "Technical Excellence",
    description: "Deep expertise in SAP, AI, and enterprise technologies",
    icon: <Brain className="h-6 w-6" />,
    score: 95,
    color: "text-purple-400",
    highlights: ["SAP Gold Partner", "AI/ML Specialists", "Cloud Architects", "Security Experts"],
  },
  {
    title: "Innovation Leadership",
    description: "Pioneering next-generation enterprise solutions",
    icon: <Rocket className="h-6 w-6" />,
    score: 92,
    color: "text-blue-400",
    highlights: ["GenAI Integration", "Blockchain Solutions", "IoT Platforms", "Edge Computing"],
  },
  {
    title: "Client Success",
    description: "Delivering measurable business outcomes",
    icon: <Target className="h-6 w-6" />,
    score: 98,
    color: "text-green-400",
    highlights: ["98% Satisfaction", "150+ Projects", "Global Reach", "24/7 Support"],
  },
  {
    title: "Industry Recognition",
    description: "Acknowledged expertise and thought leadership",
    icon: <Award className="h-6 w-6" />,
    score: 88,
    color: "text-yellow-400",
    highlights: ["Industry Awards", "Speaking Engagements", "Published Research", "Community Leadership"],
  },
]

// Company Culture Values
const cultureValues = [
  {
    title: "Collaborative Innovation",
    description: "We believe the best solutions emerge from diverse perspectives working together",
    icon: <Users className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Continuous Learning",
    description: "We invest in our team's growth and stay ahead of technological advances",
    icon: <TrendingUp className="h-8 w-8" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Client-Centric Approach",
    description: "Every decision we make is guided by our commitment to client success",
    icon: <Star className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Ethical Technology",
    description: "We develop and deploy technology responsibly with integrity and transparency",
    icon: <Shield className="h-8 w-8" />,
    color: "from-orange-500 to-red-500",
  },
]

// Company Statistics
const companyStats = [
  {
    value: "50+",
    label: "Projects Delivered",
    description: "Successful implementations",
    icon: <Building className="h-5 w-5" />,
  },
  {
    value: "50+",
    label: "Enterprise Clients",
    description: "Trusted partnerships",
    icon: <Users className="h-5 w-5" />,
  },
  {
    value: "5+",
    label: "Countries",
    description: "Global presence",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    description: "Consistent excellence",
    icon: <Star className="h-5 w-5" />,
  },
]

export default function TeamSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Excellence Through{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Collaboration
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our success is built on the collective expertise, innovation, and dedication of our talented team working
            together to deliver exceptional results.
          </p>
        </motion.div>

        {/* Excellence Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {excellenceAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${area.color}`}>{area.icon}</div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${area.color}`}>{area.score}%</div>
                      <div className="text-xs text-gray-400">Excellence Score</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white">{area.title}</CardTitle>
                  <CardDescription className="text-gray-400">{area.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={area.score} className="h-2" />
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-300">Key Highlights:</h4>
                    <div className="space-y-1">
                      {area.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Company Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Our{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Impact</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-blue-400 mb-4 flex justify-center">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-lg font-semibold text-gray-200 mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-400">{stat.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Culture Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Culture</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cultureValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${value.color} bg-opacity-20 mb-4`}>
                      <div className="text-white">{value.icon}</div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
