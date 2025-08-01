"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, Lock, Eye, Users, Database, Network, CheckCircle, Award, FileCheck } from "lucide-react"

export default function SecurityFrameworkSection() {
  const frameworks = [
    {
      name: "NIST Cybersecurity Framework",
      icon: Shield,
      description: "Comprehensive framework for managing and reducing cybersecurity risk.",
      functions: ["Identify", "Protect", "Detect", "Respond", "Recover"],
      adoption: 92,
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "ISO 27001/27002",
      icon: Award,
      description: "International standard for information security management systems.",
      functions: ["Risk Assessment", "Controls", "Monitoring", "Improvement"],
      adoption: 88,
      color: "from-green-600 to-green-800",
    },
    {
      name: "MITRE ATT&CK",
      icon: Eye,
      description: "Knowledge base of adversary tactics and techniques based on real observations.",
      functions: ["Tactics", "Techniques", "Procedures", "Mitigations"],
      adoption: 85,
      color: "from-red-600 to-red-800",
    },
    {
      name: "Zero Trust Architecture",
      icon: Lock,
      description: "Security model that requires verification for every user and device.",
      functions: ["Verify", "Secure", "Monitor", "Respond"],
      adoption: 78,
      color: "from-purple-600 to-purple-800",
    },
  ]

  const securityLayers = [
    {
      layer: "Perimeter Security",
      icon: Shield,
      description: "Firewalls, intrusion detection, and network access controls.",
      coverage: 95,
      technologies: ["Next-Gen Firewalls", "IDS/IPS", "VPN", "Network Segmentation"],
    },
    {
      layer: "Identity & Access Management",
      icon: Users,
      description: "User authentication, authorization, and privilege management.",
      coverage: 89,
      technologies: ["Multi-Factor Auth", "SSO", "PAM", "Identity Governance"],
    },
    {
      layer: "Endpoint Protection",
      icon: Network,
      description: "Device security, antivirus, and endpoint detection response.",
      coverage: 92,
      technologies: ["EDR", "Antivirus", "Device Control", "Mobile Security"],
    },
    {
      layer: "Data Protection",
      icon: Database,
      description: "Encryption, data loss prevention, and backup security.",
      coverage: 87,
      technologies: ["Encryption", "DLP", "Backup Security", "Data Classification"],
    },
    {
      layer: "Application Security",
      icon: FileCheck,
      description: "Secure coding, vulnerability testing, and runtime protection.",
      coverage: 83,
      technologies: ["SAST", "DAST", "RASP", "Code Review"],
    },
  ]

  const complianceStandards = [
    { name: "SOC 2", status: "Certified", color: "bg-green-500" },
    { name: "ISO 27001", status: "Certified", color: "bg-green-500" },
    { name: "PCI DSS", status: "Compliant", color: "bg-blue-500" },
    { name: "HIPAA", status: "Compliant", color: "bg-blue-500" },
    { name: "GDPR", status: "Compliant", color: "bg-blue-500" },
    { name: "FedRAMP", status: "In Progress", color: "bg-yellow-500" },
  ]

  return (
    <section className="py-20 bg-slate-800/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-6">
            <Shield className="h-4 w-4 text-indigo-400" />
            <span className="text-indigo-400 text-sm font-medium">Security Framework</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Comprehensive Security Framework</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our security architecture is built on industry-leading frameworks and standards, providing multiple layers
            of protection and ensuring compliance with global regulations.
          </p>
        </motion.div>

        {/* Security Frameworks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">Industry-Standard Frameworks</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {frameworks.map((framework, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-indigo-500/50 transition-all duration-300 h-full group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${framework.color}`}>
                        <framework.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-indigo-400 font-bold text-lg">{framework.adoption}%</div>
                        <div className="text-gray-400 text-xs">Adoption</div>
                      </div>
                    </div>
                    <CardTitle className="text-white group-hover:text-indigo-400 transition-colors">
                      {framework.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6 leading-relaxed">{framework.description}</p>
                    <div className="mb-4">
                      <Progress value={framework.adoption} className="h-2" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {framework.functions.map((func, idx) => (
                        <Badge key={idx} variant="outline" className="border-indigo-500/50 text-indigo-400">
                          {func}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Layers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">Defense in Depth Architecture</h3>

          <div className="space-y-6">
            {securityLayers.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-indigo-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600">
                        <layer.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-bold text-white">{layer.layer}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-indigo-400 font-bold">{layer.coverage}%</span>
                            <span className="text-gray-400 text-sm">Coverage</span>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4">{layer.description}</p>
                        <div className="mb-4">
                          <Progress value={layer.coverage} className="h-2" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {layer.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="border-gray-600 text-gray-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-slate-800/30 border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Compliance & Certifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {complianceStandards.map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-slate-800/50 rounded-lg p-4 mb-3 border border-slate-700">
                    <Award className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm mb-1">{standard.name}</div>
                    <Badge className={`${standard.color} text-white text-xs`}>{standard.status}</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Security Maturity Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-500/30 p-8">
            <Shield className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Assess Your Security Maturity</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Evaluate your organization's security posture against industry frameworks and identify areas for
              improvement with our comprehensive security assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3">
                <CheckCircle className="h-4 w-4 mr-2" />
                Start Assessment
              </Button>
              <Button
                variant="outline"
                className="border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 px-8 py-3 bg-transparent"
              >
                <FileCheck className="h-4 w-4 mr-2" />
                Download Framework Guide
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
