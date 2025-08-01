"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Shield, Globe, TrendingUp, Eye, Lock, Wifi } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function CyberThreatsLandscape() {
  const [activeTab, setActiveTab] = useState(0)
  const [liveThreats, setLiveThreats] = useState(2847)

  const threatCategories = [
    {
      name: "Malware & Ransomware",
      icon: AlertTriangle,
      severity: "Critical",
      count: 1247,
      trend: "+23%",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      description: "Advanced persistent threats targeting enterprise infrastructure",
      examples: ["WannaCry variants", "Ryuk ransomware", "Emotet trojans", "Zero-day exploits"],
      impact: "Data encryption, system downtime, financial losses",
      prevention: "Real-time scanning, behavioral analysis, endpoint protection",
    },
    {
      name: "Phishing & Social Engineering",
      icon: Eye,
      severity: "High",
      count: 892,
      trend: "+15%",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      description: "Sophisticated social engineering attacks targeting human vulnerabilities",
      examples: ["Spear phishing", "Business email compromise", "Vishing attacks", "Deepfake scams"],
      impact: "Credential theft, unauthorized access, financial fraud",
      prevention: "Email filtering, user training, multi-factor authentication",
    },
    {
      name: "Network Intrusions",
      icon: Wifi,
      severity: "High",
      count: 634,
      trend: "+8%",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      description: "Unauthorized access attempts and network-based attacks",
      examples: ["SQL injection", "Cross-site scripting", "Man-in-the-middle", "DNS poisoning"],
      impact: "Data breaches, network compromise, service disruption",
      prevention: "Network segmentation, intrusion detection, vulnerability patching",
    },
    {
      name: "Insider Threats",
      icon: Lock,
      severity: "Medium",
      count: 234,
      trend: "-5%",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      description: "Security risks from internal users and privileged access abuse",
      examples: ["Data exfiltration", "Privilege escalation", "Sabotage", "Negligent actions"],
      impact: "Intellectual property theft, compliance violations, reputation damage",
      prevention: "Access controls, user monitoring, privilege management",
    },
  ]

  const globalStats = [
    { label: "Global Cyber Attacks", value: "4.8B", period: "2024 YTD", icon: Globe },
    { label: "Average Cost per Breach", value: "$4.45M", period: "2024", icon: TrendingUp },
    { label: "Time to Identify", value: "207 days", period: "Average", icon: Eye },
    { label: "Time to Contain", value: "73 days", period: "Average", icon: Shield },
  ]

  const industryTargets = [
    { industry: "Healthcare", percentage: 89, attacks: "2.3M", color: "bg-red-500" },
    { industry: "Financial Services", percentage: 76, attacks: "1.8M", color: "bg-orange-500" },
    { industry: "Manufacturing", percentage: 68, attacks: "1.4M", color: "bg-yellow-500" },
    { industry: "Government", percentage: 62, attacks: "1.1M", color: "bg-blue-500" },
    { industry: "Education", percentage: 54, attacks: "890K", color: "bg-purple-500" },
    { industry: "Retail", percentage: 47, attacks: "720K", color: "bg-green-500" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveThreats((prev) => prev + Math.floor(Math.random() * 5) + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-black/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Global{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Threat Landscape
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Understanding the evolving cybersecurity threat environment and our comprehensive defense strategies against
            modern attack vectors.
          </p>

          {/* Live Threat Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 backdrop-blur-xl border border-red-500/20 rounded-full px-6 py-3"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-red-400 text-sm font-medium">Live Threats Detected</span>
            </div>
            <div className="text-2xl font-bold text-white">{liveThreats.toLocaleString()}</div>
            <span className="text-xs text-gray-400">Today</span>
          </motion.div>
        </motion.div>

        {/* Global Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {globalStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-red-500/30 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <IconComponent className="h-8 w-8 text-red-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-gray-300 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.period}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Threat Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Major Threat Categories</h3>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {threatCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === index
                    ? `${category.bgColor} ${category.color} border ${category.borderColor}`
                    : "bg-white/5 text-gray-400 border border-white/10 hover:border-white/20"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Active Category Details */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${threatCategories[activeTab].bgColor}`}>
                      {(() => {
                        const IconComponent = threatCategories[activeTab].icon
                        return <IconComponent className={`h-6 w-6 ${threatCategories[activeTab].color}`} />
                      })()}
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white">{threatCategories[activeTab].name}</CardTitle>
                      <p className="text-gray-400">{threatCategories[activeTab].description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={`${threatCategories[activeTab].bgColor} ${threatCategories[activeTab].color} ${threatCategories[activeTab].borderColor} border`}
                    >
                      {threatCategories[activeTab].severity}
                    </Badge>
                    <div className="text-sm text-gray-400 mt-1">
                      {threatCategories[activeTab].count.toLocaleString()} incidents
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Common Examples:</h4>
                  <ul className="space-y-2">
                    {threatCategories[activeTab].examples.map((example, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <AlertTriangle className="h-3 w-3 text-orange-400 mr-2 flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Potential Impact:</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{threatCategories[activeTab].impact}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Prevention Strategy:</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{threatCategories[activeTab].prevention}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Industry Targets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Industries Under Attack</h3>
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-gray-700">
            <CardContent className="p-8">
              <div className="space-y-6">
                {industryTargets.map((industry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{industry.industry}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-400">{industry.attacks} attacks</span>
                        <span className="text-sm font-medium text-white">{industry.percentage}%</span>
                      </div>
                    </div>
                    <Progress value={industry.percentage} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
