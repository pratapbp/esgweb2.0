"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  BarChart3,
  Database,
  Eye,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Search,
} from "lucide-react"

export default function SIEMSection() {
  const siemCapabilities = [
    {
      name: "Log Management & Aggregation",
      icon: Database,
      description: "Centralized collection and storage of security logs from across your entire infrastructure.",
      features: [
        "Multi-source log collection",
        "Real-time log processing",
        "Long-term log retention",
        "Compliance reporting",
      ],
      performance: 98,
    },
    {
      name: "Real-time Event Correlation",
      icon: Activity,
      description: "Advanced correlation engine that identifies patterns and relationships between security events.",
      features: [
        "Complex event processing",
        "Pattern recognition",
        "Behavioral analysis",
        "Threat intelligence integration",
      ],
      performance: 95,
    },
    {
      name: "Security Analytics & Reporting",
      icon: BarChart3,
      description: "Comprehensive analytics and reporting capabilities for security insights and compliance.",
      features: ["Interactive dashboards", "Custom report generation", "Trend analysis", "Executive summaries"],
      performance: 92,
    },
    {
      name: "Incident Management",
      icon: AlertTriangle,
      description: "Streamlined incident management workflow from detection to resolution.",
      features: ["Automated ticket creation", "Escalation procedures", "Investigation tools", "Response tracking"],
      performance: 89,
    },
  ]

  const siemMetrics = [
    { label: "Events/Second", value: "100K+", icon: Zap, color: "text-yellow-400" },
    { label: "Data Sources", value: "500+", icon: Database, color: "text-blue-400" },
    { label: "Detection Rules", value: "2,000+", icon: Eye, color: "text-green-400" },
    { label: "Response Time", value: "<30s", icon: Clock, color: "text-red-400" },
  ]

  const threatDetectionRules = [
    { category: "Malware Detection", rules: 450, accuracy: 97, color: "bg-red-500" },
    { category: "Intrusion Attempts", rules: 380, accuracy: 94, color: "bg-orange-500" },
    { category: "Data Exfiltration", rules: 290, accuracy: 96, color: "bg-yellow-500" },
    { category: "Insider Threats", rules: 220, accuracy: 89, color: "bg-purple-500" },
    { category: "Compliance Violations", rules: 180, accuracy: 92, color: "bg-blue-500" },
  ]

  const dashboardComponents = [
    { name: "Security Overview", alerts: 23, status: "Active" },
    { name: "Threat Intelligence", alerts: 8, status: "Monitoring" },
    { name: "Compliance Status", alerts: 2, status: "Compliant" },
    { name: "Asset Management", alerts: 15, status: "Updating" },
  ]

  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Activity className="h-4 w-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">SIEM Platform</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Security Information & Event Management</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Centralized security monitoring and analysis platform that provides real-time visibility into your security
            posture with advanced threat detection and incident response capabilities.
          </p>
        </motion.div>

        {/* SIEM Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-slate-800/50 border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">SIEM Platform Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {siemMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-3">
                    <metric.icon className={`h-8 w-8 ${metric.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Live Dashboard Simulation */}
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-white font-semibold">Security Dashboard</h4>
                <Badge className="bg-green-500 text-white">Live</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardComponents.map((component, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">{component.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {component.status}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-purple-400">{component.alerts}</div>
                    <div className="text-gray-400 text-xs">Active Alerts</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* SIEM Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">Core SIEM Capabilities</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {siemCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 h-full group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600">
                        <capability.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-purple-400 font-bold text-lg">{capability.performance}%</div>
                        <div className="text-gray-400 text-xs">Performance</div>
                      </div>
                    </div>
                    <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                      {capability.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6 leading-relaxed">{capability.description}</p>
                    <div className="mb-4">
                      <Progress value={capability.performance} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      {capability.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Threat Detection Rules */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-slate-800/30 border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Advanced Detection Rules</h3>
            <div className="space-y-6">
              {threatDetectionRules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                >
                  <div className={`w-4 h-4 ${rule.color} rounded-full`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{rule.category}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm">{rule.rules} rules</span>
                        <span className="text-purple-400 font-medium">{rule.accuracy}% accuracy</span>
                      </div>
                    </div>
                    <Progress value={rule.accuracy} className="h-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Integration & Compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-slate-800/50 border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Integration Ecosystem</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {["Firewalls", "IDS/IPS", "Antivirus", "Cloud Services", "Databases", "Applications"].map(
                (integration, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="bg-purple-500/20 rounded-lg p-4 mb-2 hover:bg-purple-500/30 transition-colors">
                      <Shield className="h-8 w-8 text-purple-400 mx-auto" />
                    </div>
                    <div className="text-white font-medium text-sm">{integration}</div>
                  </motion.div>
                ),
              )}
            </div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/30 p-8">
            <Activity className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Deploy Enterprise SIEM Solution</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Gain complete visibility into your security landscape with our advanced SIEM platform. Monitor, detect,
              and respond to threats in real-time with comprehensive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">Request SIEM Demo</Button>
              <Button
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 bg-transparent"
              >
                <Search className="h-4 w-4 mr-2" />
                Explore Features
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
