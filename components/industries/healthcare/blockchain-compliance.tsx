"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Lock,
  FileCheck,
  Users,
  Database,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"

const complianceSteps = [
  {
    id: 1,
    title: "Patient Consent (Form)",
    description: "Digital consent capture with cryptographic signatures",
    icon: FileCheck,
    status: "completed",
    details: [
      "HIPAA-compliant consent forms",
      "Multi-language support",
      "Digital signature validation",
      "Consent versioning and tracking",
    ],
  },
  {
    id: 2,
    title: "Immutable Blockchain Log",
    description: "Tamper-proof audit trail for all healthcare interactions",
    icon: Lock,
    status: "active",
    details: [
      "Cryptographic hash verification",
      "Distributed ledger technology",
      "Real-time transaction logging",
      "Consensus mechanism validation",
    ],
  },
  {
    id: 3,
    title: "Linked to SAP EMR Audit Trail",
    description: "Seamless integration with existing healthcare systems",
    icon: Database,
    status: "processing",
    details: [
      "SAP Health integration",
      "Real-time data synchronization",
      "Automated compliance checking",
      "Cross-system audit correlation",
    ],
  },
  {
    id: 4,
    title: "Accessible to Admins, Doctors, Patients with RBAC",
    description: "Role-based access control ensuring data privacy",
    icon: Users,
    status: "pending",
    details: [
      "Granular permission management",
      "Multi-factor authentication",
      "Session management",
      "Access logging and monitoring",
    ],
  },
]

const complianceStandards = [
  { name: "HIPAA", status: "100%", color: "green" },
  { name: "GDPR", status: "100%", color: "blue" },
  { name: "FDA CFR 21", status: "98%", color: "purple" },
  { name: "SOC 2", status: "100%", color: "orange" },
]

const auditMetrics = [
  { label: "Audit Events Logged", value: "2.4M+", trend: "+15%" },
  { label: "Compliance Score", value: "99.7%", trend: "+2.1%" },
  { label: "Security Incidents", value: "0", trend: "0%" },
  { label: "Response Time", value: "<1ms", trend: "-5%" },
]

export function BlockchainCompliance() {
  const [selectedStep, setSelectedStep] = useState(2)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "active":
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />
      case "processing":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 border-green-300"
      case "active":
        return "bg-blue-100 border-blue-300"
      case "processing":
        return "bg-yellow-100 border-yellow-300"
      default:
        return "bg-gray-100 border-gray-300"
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
            Blockchain for Healthcare Compliance
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Unbreakable Healthcare Compliance</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Ensure HIPAA, GDPR, and FDA CFR 21 compliance with blockchain-powered audit trails and immutable healthcare
            data management.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Compliance Standards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={standard.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
                  <CardContent className="p-4">
                    <div className={`text-2xl font-bold text-${standard.color}-400 mb-1`}>{standard.status}</div>
                    <div className="text-white font-semibold">{standard.name}</div>
                    <div className="text-xs text-blue-200 mt-1">Compliant</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Blockchain Flow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Shield className="h-6 w-6 text-green-400" />
                    <span>Compliance Workflow</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {complianceSteps.map((step, index) => {
                    const IconComponent = step.icon
                    const isSelected = selectedStep === step.id

                    return (
                      <div key={step.id}>
                        <motion.div
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                            isSelected
                              ? getStatusColor(step.status) + " text-gray-900"
                              : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                          }`}
                          onClick={() => setSelectedStep(step.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${isSelected ? "bg-white" : "bg-white/20"}`}>
                              <IconComponent size={20} className={isSelected ? "text-blue-600" : "text-white"} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{step.title}</h3>
                                {getStatusIcon(step.status)}
                              </div>
                              <p className={`text-sm mt-1 ${isSelected ? "text-gray-600" : "text-blue-200"}`}>
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {index < complianceSteps.length - 1 && (
                          <div className="flex justify-center my-2">
                            <ArrowRight className="h-5 w-5 text-blue-400" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Details Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Selected Step Details */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">
                    {complianceSteps.find((step) => step.id === selectedStep)?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {complianceSteps
                      .find((step) => step.id === selectedStep)
                      ?.details.map((detail, index) => (
                        <li key={index} className="flex items-center space-x-3 text-blue-100">
                          <CheckCircle size={16} className="text-green-400" />
                          <span>{detail}</span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Audit Metrics */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Eye className="h-6 w-6 text-purple-400" />
                    <span>Real-time Audit Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {auditMetrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                        <div className="text-sm text-blue-200 mb-1">{metric.label}</div>
                        <Badge
                          className={`text-xs ${
                            metric.trend.startsWith("+")
                              ? "bg-green-500/20 text-green-300"
                              : metric.trend === "0%"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {metric.trend}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                  <Shield className="mr-2 h-4 w-4" />
                  View Audit Trail
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
