"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Database, Shield, Eye, FileText, Network, HardDrive, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DataLossPreventionSection() {
  const [activeTab, setActiveTab] = useState("discovery")

  const dlpComponents = [
    {
      id: "discovery",
      title: "Content Discovery",
      description: "Identify and classify sensitive data across your organization",
      icon: Eye,
      color: "text-blue-400",
      features: [
        "Automated data classification",
        "Sensitive data mapping",
        "Compliance template matching",
        "Custom pattern recognition",
      ],
      metrics: {
        dataScanned: "2.4 TB",
        sensitiveFiles: "847K",
        accuracy: 96,
        coverage: 100,
      },
    },
    {
      id: "network",
      title: "Network DLP",
      description: "Monitor and control data in motion across network channels",
      icon: Network,
      color: "text-green-400",
      features: [
        "Real-time traffic inspection",
        "Protocol-aware monitoring",
        "Encrypted traffic analysis",
        "Cloud service integration",
      ],
      metrics: {
        dataScanned: "156 GB/day",
        blockedTransfers: "1,247",
        accuracy: 94,
        coverage: 98,
      },
    },
    {
      id: "endpoint",
      title: "Endpoint DLP",
      description: "Protect data at rest and in use on endpoint devices",
      icon: HardDrive,
      color: "text-purple-400",
      features: [
        "File system monitoring",
        "Application control",
        "Removable media protection",
        "Screen capture prevention",
      ],
      metrics: {
        dataScanned: "45 TB",
        protectedDevices: "12,450",
        accuracy: 97,
        coverage: 100,
      },
    },
    {
      id: "storage",
      title: "Storage DLP",
      description: "Secure sensitive data in databases and file repositories",
      icon: Database,
      color: "text-orange-400",
      features: [
        "Database activity monitoring",
        "File repository scanning",
        "Access control enforcement",
        "Encryption key management",
      ],
      metrics: {
        dataScanned: "890 GB",
        protectedRepositories: "234",
        accuracy: 95,
        coverage: 99,
      },
    },
  ]

  const dataTypes = [
    { type: "Credit Card Numbers", detected: 15420, blocked: 847, risk: "High" },
    { type: "Social Security Numbers", detected: 8934, blocked: 234, risk: "Critical" },
    { type: "Personal Health Information", detected: 23567, blocked: 1205, risk: "High" },
    { type: "Intellectual Property", detected: 5678, blocked: 89, risk: "Medium" },
    { type: "Financial Records", detected: 12890, blocked: 456, risk: "High" },
  ]

  const complianceFrameworks = [
    { name: "GDPR", coverage: 98, status: "Compliant" },
    { name: "HIPAA", coverage: 96, status: "Compliant" },
    { name: "PCI DSS", coverage: 99, status: "Compliant" },
    { name: "SOX", coverage: 94, status: "Compliant" },
    { name: "CCPA", coverage: 97, status: "Compliant" },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Data Loss{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Prevention
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive data protection strategy that identifies, monitors, and protects sensitive information across
            all data states and locations.
          </p>
        </motion.div>

        {/* DLP Components Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/5 backdrop-blur-sm">
              {dlpComponents.map((component) => (
                <TabsTrigger
                  key={component.id}
                  value={component.id}
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
                >
                  <component.icon className="h-4 w-4 mr-2" />
                  {component.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {dlpComponents.map((component) => (
              <TabsContent key={component.id} value={component.id} className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Component Details */}
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-gray-700/50">
                          <component.icon className={`h-6 w-6 ${component.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-white">{component.title}</CardTitle>
                          <p className="text-gray-400">{component.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-3">Key Features:</h4>
                        <div className="space-y-2">
                          {component.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-300">
                              <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <div className="text-lg font-bold text-blue-400">{component.metrics.accuracy}%</div>
                          <div className="text-sm text-gray-400">Accuracy</div>
                        </div>
                        <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <div className="text-lg font-bold text-green-400">{component.metrics.coverage}%</div>
                          <div className="text-sm text-gray-400">Coverage</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Metrics Dashboard */}
                  <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">Real-time Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-white/5 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-400">Data Scanned</span>
                            <span className="text-lg font-bold text-white">{component.metrics.dataScanned}</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>

                        {component.id === "network" && (
                          <div className="p-4 bg-white/5 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-400">Blocked Transfers</span>
                              <span className="text-lg font-bold text-red-400">
                                {component.metrics.blockedTransfers}
                              </span>
                            </div>
                            <Progress value={12} className="h-2" />
                          </div>
                        )}

                        {component.id === "endpoint" && (
                          <div className="p-4 bg-white/5 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-400">Protected Devices</span>
                              <span className="text-lg font-bold text-green-400">
                                {component.metrics.protectedDevices}
                              </span>
                            </div>
                            <Progress value={95} className="h-2" />
                          </div>
                        )}

                        {component.id === "storage" && (
                          <div className="p-4 bg-white/5 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-400">Protected Repositories</span>
                              <span className="text-lg font-bold text-purple-400">
                                {component.metrics.protectedRepositories}
                              </span>
                            </div>
                            <Progress value={78} className="h-2" />
                          </div>
                        )}
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Eye className="mr-2 h-4 w-4" />
                        View Detailed Analytics
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Data Types Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <FileText className="h-5 w-5 text-blue-400 mr-2" />
                  Sensitive Data Types Monitored
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dataTypes.map((data, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-white">{data.type}</div>
                        <div className="text-sm text-gray-400">
                          {data.detected.toLocaleString()} detected • {data.blocked.toLocaleString()} blocked
                        </div>
                      </div>
                      <Badge
                        className={`${
                          data.risk === "Critical"
                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                            : data.risk === "High"
                              ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        }`}
                      >
                        {data.risk}
                      </Badge>
                    </div>
                    <Progress value={(data.blocked / data.detected) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Shield className="h-5 w-5 text-green-400 mr-2" />
                  Compliance Framework Coverage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceFrameworks.map((framework, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-white">{framework.name}</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">{framework.coverage}%</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{framework.status}</Badge>
                      </div>
                    </div>
                    <Progress value={framework.coverage} className="h-2" />
                  </div>
                ))}

                <div className="text-center pt-4">
                  <Button
                    variant="outline"
                    className="border-green-500/50 text-green-400 hover:bg-green-500/10 bg-transparent"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Compliance Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
