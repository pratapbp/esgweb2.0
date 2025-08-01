"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Clock, Shield, CheckCircle, FileText, Zap, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function IncidentResponseSection() {
  const [activePhase, setActivePhase] = useState(0)

  const responsePhases = [
    {
      phase: "Detection & Analysis",
      duration: "0-30 minutes",
      description: "Identify and analyze the security incident",
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      activities: [
        "Automated threat detection triggers",
        "Initial incident classification",
        "Evidence collection and preservation",
        "Impact assessment and scope determination",
      ],
      tools: ["SIEM", "EDR", "Network Monitoring", "Threat Intelligence"],
    },
    {
      phase: "Containment",
      duration: "30-60 minutes",
      description: "Isolate and contain the threat to prevent spread",
      icon: Shield,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      activities: [
        "Network segmentation and isolation",
        "Endpoint quarantine procedures",
        "Account access restrictions",
        "System shutdown if necessary",
      ],
      tools: ["Firewall Rules", "EDR Isolation", "Identity Management", "Network Controls"],
    },
    {
      phase: "Eradication & Recovery",
      duration: "1-4 hours",
      description: "Remove threats and restore normal operations",
      icon: Zap,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      activities: [
        "Malware removal and system cleaning",
        "Vulnerability patching and hardening",
        "System restoration from clean backups",
        "Security control validation",
      ],
      tools: ["Anti-malware", "Patch Management", "Backup Systems", "Vulnerability Scanners"],
    },
    {
      phase: "Post-Incident",
      duration: "24-48 hours",
      description: "Document lessons learned and improve processes",
      icon: FileText,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      activities: [
        "Incident documentation and reporting",
        "Root cause analysis",
        "Process improvement recommendations",
        "Security awareness training updates",
      ],
      tools: ["Documentation Systems", "Analytics Tools", "Training Platforms", "Compliance Reports"],
    },
  ]

  const responseMetrics = [
    { label: "Mean Time to Detection", value: "12 min", improvement: "+67%", color: "text-blue-400" },
    { label: "Mean Time to Response", value: "18 min", improvement: "+54%", color: "text-green-400" },
    { label: "Mean Time to Recovery", value: "2.3 hrs", improvement: "+43%", color: "text-purple-400" },
    { label: "Incident Resolution Rate", value: "98.7%", improvement: "+12%", color: "text-cyan-400" },
  ]

  const emergencyContacts = [
    { role: "Security Operations Center", contact: "+1-800-SEC-HELP", available: "24/7" },
    { role: "Incident Response Team", contact: "+1-800-IRT-HELP", available: "24/7" },
    { role: "Executive Escalation", contact: "+1-800-EXEC-SEC", available: "Business Hours" },
  ]

  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Incident{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Response Framework
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Structured approach to handling security incidents with automated playbooks, rapid response times, and
            comprehensive recovery procedures.
          </p>
        </motion.div>

        {/* Response Timeline */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Phase Navigation */}
            <div className="w-full lg:w-1/3 space-y-4">
              {responsePhases.map((phase, index) => {
                const IconComponent = phase.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 ${
                        activePhase === index
                          ? `${phase.bgColor} ${phase.borderColor} shadow-lg`
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                      onClick={() => setActivePhase(index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${phase.bgColor}`}>
                            <IconComponent className={`h-5 w-5 ${phase.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white">{phase.phase}</div>
                            <div className="text-sm text-gray-400">{phase.duration}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-white">{index + 1}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Phase Details */}
            <div className="w-full lg:w-2/3">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-gray-700">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${responsePhases[activePhase].bgColor}`}>
                        {(() => {
                          const IconComponent = responsePhases[activePhase].icon
                          return <IconComponent className={`h-6 w-6 ${responsePhases[activePhase].color}`} />
                        })()}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">{responsePhases[activePhase].phase}</CardTitle>
                        <p className="text-gray-400">{responsePhases[activePhase].description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Key Activities:</h4>
                      <div className="space-y-2">
                        {responsePhases[activePhase].activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Tools & Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {responsePhases[activePhase].tools.map((tool, idx) => (
                          <Badge key={idx} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex items-center space-x-2">
                        <Clock className={`h-4 w-4 ${responsePhases[activePhase].color}`} />
                        <span className="text-sm text-gray-400">Target Duration:</span>
                        <span className="text-sm font-medium text-white">{responsePhases[activePhase].duration}</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setActivePhase((prev) => (prev + 1) % responsePhases.length)}
                      >
                        Next Phase
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Response Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Response Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {responseMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 text-center">
                  <CardContent className="p-6">
                    <div className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                    <div className="text-sm font-medium text-white mb-2">{metric.label}</div>
                    <div className="text-xs text-green-400">Improved {metric.improvement}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-xl border-red-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Phone className="h-6 w-6 text-red-400 mr-3" />
                Emergency Response Contacts
              </CardTitle>
              <p className="text-gray-300">24/7 incident response support for critical security events.</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                    <div className="font-semibold text-white mb-2">{contact.role}</div>
                    <div className="text-lg font-mono text-blue-400 mb-2">{contact.contact}</div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{contact.available}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
