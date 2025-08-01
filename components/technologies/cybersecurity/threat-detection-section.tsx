"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye, Brain, Zap, Shield, AlertTriangle, CheckCircle, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function ThreatDetectionSection() {
  const [activeDetection, setActiveDetection] = useState(0)
  const [detectionMetrics, setDetectionMetrics] = useState({
    threatsDetected: 1247,
    falsePositives: 12,
    responseTime: 18,
    accuracy: 99.2,
  })

  const detectionMethods = [
    {
      name: "AI-Powered Behavioral Analysis",
      icon: Brain,
      description: "Machine learning algorithms analyze user and system behavior patterns to identify anomalies",
      accuracy: 98.7,
      speed: "Real-time",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      features: [
        "User behavior analytics (UBA)",
        "Entity behavior analytics (EBA)",
        "Anomaly detection algorithms",
        "Predictive threat modeling",
      ],
      useCases: [
        "Insider threat detection",
        "Account compromise identification",
        "Privilege escalation detection",
        "Data exfiltration prevention",
      ],
    },
    {
      name: "Signature-Based Detection",
      icon: Eye,
      description: "Traditional pattern matching against known threat signatures and indicators of compromise",
      accuracy: 95.4,
      speed: "< 1 second",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      features: [
        "Malware signature database",
        "Hash-based detection",
        "Pattern matching algorithms",
        "IOC correlation",
      ],
      useCases: ["Known malware detection", "Virus identification", "Trojan detection", "Worm prevention"],
    },
    {
      name: "Heuristic Analysis",
      icon: Zap,
      description: "Advanced heuristic engines analyze code behavior and characteristics for unknown threats",
      accuracy: 92.1,
      speed: "< 5 seconds",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      features: ["Code emulation", "Behavioral heuristics", "Static analysis", "Dynamic analysis"],
      useCases: [
        "Zero-day threat detection",
        "Polymorphic malware",
        "Packed executable analysis",
        "Suspicious activity identification",
      ],
    },
    {
      name: "Threat Intelligence Integration",
      icon: Shield,
      description: "Real-time threat intelligence feeds provide context and attribution for detected threats",
      accuracy: 96.8,
      speed: "< 2 seconds",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      features: ["Global threat feeds", "IOC enrichment", "Attribution analysis", "Campaign tracking"],
      useCases: ["APT detection", "Campaign attribution", "Threat actor profiling", "Attack correlation"],
    },
  ]

  const liveThreats = [
    { type: "Malware", severity: "High", source: "Email", status: "Blocked", time: "2 min ago" },
    { type: "Phishing", severity: "Medium", source: "Web", status: "Quarantined", time: "5 min ago" },
    { type: "Intrusion", severity: "Critical", source: "Network", status: "Investigating", time: "8 min ago" },
    { type: "Anomaly", severity: "Low", source: "User", status: "Monitoring", time: "12 min ago" },
  ]

  const detectionStats = [
    { label: "Detection Rate", value: "99.8%", change: "+0.3%", icon: Eye },
    { label: "False Positives", value: "0.2%", change: "-0.1%", icon: AlertTriangle },
    { label: "Response Time", value: "18s", change: "-5s", icon: Zap },
    { label: "Threat Coverage", value: "100%", change: "0%", icon: Shield },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDetection((prev) => (prev + 1) % detectionMethods.length)
      setDetectionMetrics((prev) => ({
        ...prev,
        threatsDetected: prev.threatsDetected + Math.floor(Math.random() * 3),
        responseTime: Math.max(15, prev.responseTime + (Math.random() - 0.5) * 2),
      }))
    }, 4000)

    return () => clearInterval(interval)
  }, [detectionMethods.length])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      case "High":
        return "text-orange-400 bg-orange-500/20 border-orange-500/30"
      case "Medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "Low":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Blocked":
        return "text-red-400 bg-red-500/20"
      case "Quarantined":
        return "text-orange-400 bg-orange-500/20"
      case "Investigating":
        return "text-yellow-400 bg-yellow-500/20"
      case "Monitoring":
        return "text-blue-400 bg-blue-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black/50 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Advanced{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Threat Detection
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Multi-layered threat detection combining AI, machine learning, and traditional security methods for
            comprehensive protection against known and unknown threats.
          </p>
        </motion.div>

        {/* Detection Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {detectionStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="h-6 w-6 text-blue-400" />
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          stat.change.startsWith("+") || stat.change.startsWith("-")
                            ? stat.change.startsWith("+")
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Detection Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Method Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Detection Methods</h3>
            {detectionMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      activeDetection === index
                        ? `${method.bgColor} ${method.borderColor} border shadow-lg`
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                    onClick={() => setActiveDetection(index)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${method.bgColor}`}>
                          <IconComponent className={`h-5 w-5 ${method.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white text-sm">{method.name}</div>
                          <div className="text-xs text-gray-400">{method.accuracy}% accuracy</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Method Details */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeDetection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-gray-700 h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${detectionMethods[activeDetection].bgColor}`}>
                      {(() => {
                        const IconComponent = detectionMethods[activeDetection].icon
                        return <IconComponent className={`h-6 w-6 ${detectionMethods[activeDetection].color}`} />
                      })()}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">{detectionMethods[activeDetection].name}</CardTitle>
                      <p className="text-gray-400 text-sm">{detectionMethods[activeDetection].description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Accuracy Rate</div>
                      <div className="flex items-center space-x-2">
                        <Progress value={detectionMethods[activeDetection].accuracy} className="flex-1" />
                        <span className="text-sm font-medium text-white">
                          {detectionMethods[activeDetection].accuracy}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Response Speed</div>
                      <div className={`text-lg font-semibold ${detectionMethods[activeDetection].color}`}>
                        {detectionMethods[activeDetection].speed}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {detectionMethods[activeDetection].features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Use Cases:</h4>
                      <ul className="space-y-2">
                        {detectionMethods[activeDetection].useCases.map((useCase, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-300">
                            <Shield className="h-3 w-3 text-blue-400 mr-2 flex-shrink-0" />
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Live Threat Feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white flex items-center">
                  <Activity className="h-5 w-5 text-green-400 mr-2" />
                  Live Threat Detection Feed
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400">Real-time</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {liveThreats.map((threat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      <AlertTriangle className="h-4 w-4 text-orange-400" />
                      <div>
                        <div className="font-medium text-white">{threat.type}</div>
                        <div className="text-xs text-gray-400">Source: {threat.source}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={`${getSeverityColor(threat.severity)} border text-xs`}>{threat.severity}</Badge>
                      <Badge className={`${getStatusColor(threat.status)} text-xs`}>{threat.status}</Badge>
                      <span className="text-xs text-gray-400">{threat.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Full Threat Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
