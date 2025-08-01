"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Users,
  Eye,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Zap,
  Database,
  Network,
  Smartphone,
} from "lucide-react"

export default function SecurityBestPractices() {
  const practiceCategories = [
    {
      category: "Access Management",
      icon: Users,
      color: "from-blue-600 to-blue-800",
      practices: [
        {
          title: "Multi-Factor Authentication (MFA)",
          description: "Implement MFA for all user accounts, especially privileged accounts.",
          impact: "Reduces account compromise by 99.9%",
          difficulty: "Easy",
        },
        {
          title: "Principle of Least Privilege",
          description: "Grant users minimum access rights needed to perform their job functions.",
          impact: "Limits blast radius of security incidents",
          difficulty: "Medium",
        },
        {
          title: "Regular Access Reviews",
          description: "Conduct quarterly reviews of user access rights and permissions.",
          impact: "Prevents privilege creep and unauthorized access",
          difficulty: "Medium",
        },
      ],
    },
    {
      category: "Data Protection",
      icon: Database,
      color: "from-green-600 to-green-800",
      practices: [
        {
          title: "Data Encryption",
          description: "Encrypt sensitive data both at rest and in transit using strong algorithms.",
          impact: "Protects data even if systems are compromised",
          difficulty: "Medium",
        },
        {
          title: "Regular Backups",
          description: "Implement automated, tested backup procedures with offline storage.",
          impact: "Ensures business continuity during incidents",
          difficulty: "Easy",
        },
        {
          title: "Data Classification",
          description: "Classify data based on sensitivity and apply appropriate protection measures.",
          impact: "Enables targeted security controls",
          difficulty: "Hard",
        },
      ],
    },
    {
      category: "Network Security",
      icon: Network,
      color: "from-purple-600 to-purple-800",
      practices: [
        {
          title: "Network Segmentation",
          description: "Isolate critical systems and limit lateral movement of threats.",
          impact: "Contains breaches and reduces attack surface",
          difficulty: "Hard",
        },
        {
          title: "Firewall Configuration",
          description: "Properly configure and regularly update firewall rules and policies.",
          impact: "Blocks unauthorized network access",
          difficulty: "Medium",
        },
        {
          title: "VPN Security",
          description: "Use secure VPN solutions for remote access with strong authentication.",
          impact: "Secures remote connections",
          difficulty: "Easy",
        },
      ],
    },
    {
      category: "Endpoint Security",
      icon: Smartphone,
      color: "from-orange-600 to-orange-800",
      practices: [
        {
          title: "Endpoint Detection & Response",
          description: "Deploy EDR solutions for real-time threat detection and response.",
          impact: "Rapid threat detection and containment",
          difficulty: "Medium",
        },
        {
          title: "Patch Management",
          description: "Maintain current security patches across all systems and applications.",
          impact: "Closes known security vulnerabilities",
          difficulty: "Medium",
        },
        {
          title: "Device Management",
          description: "Implement mobile device management and security policies.",
          impact: "Secures BYOD and mobile devices",
          difficulty: "Medium",
        },
      ],
    },
  ]

  const securityTips = [
    {
      tip: "Use Strong, Unique Passwords",
      description: "Create complex passwords and use different passwords for each account.",
      icon: Lock,
      priority: "High",
    },
    {
      tip: "Keep Software Updated",
      description: "Regularly update operating systems, applications, and security software.",
      icon: RefreshCw,
      priority: "High",
    },
    {
      tip: "Be Cautious with Email",
      description: "Verify sender identity and avoid clicking suspicious links or attachments.",
      icon: AlertTriangle,
      priority: "High",
    },
    {
      tip: "Use Secure Networks",
      description: "Avoid public Wi-Fi for sensitive activities and use VPN when necessary.",
      icon: Shield,
      priority: "Medium",
    },
    {
      tip: "Regular Security Training",
      description: "Stay informed about latest threats and security best practices.",
      icon: BookOpen,
      priority: "Medium",
    },
    {
      tip: "Monitor Account Activity",
      description: "Regularly review account statements and activity logs for suspicious behavior.",
      icon: Eye,
      priority: "Medium",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

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
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-6">
            <BookOpen className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Best Practices</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Cybersecurity Best Practices</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Implement these proven security practices to strengthen your organization's defense against cyber threats
            and maintain a robust security posture.
          </p>
        </motion.div>

        {/* Practice Categories */}
        <div className="space-y-12 mb-16">
          {practiceCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8">
                <div
                  className={`inline-flex items-center gap-3 bg-gradient-to-r ${category.color} rounded-full px-6 py-3 mb-4`}
                >
                  <category.icon className="h-6 w-6 text-white" />
                  <span className="text-white font-semibold text-lg">{category.category}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.practices.map((practice, practiceIndex) => (
                  <motion.div
                    key={practiceIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: practiceIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 h-full group">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
                            {practice.title}
                          </CardTitle>
                          <Badge className={`${getDifficultyColor(practice.difficulty)} text-white`}>
                            {practice.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4 leading-relaxed">{practice.description}</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-green-400 text-sm font-medium">{practice.impact}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Security Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">Essential Security Tips</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 h-full group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600">
                        <tip.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge className={`${getPriorityColor(tip.priority)} text-white`}>{tip.priority}</Badge>
                    </div>
                    <h4 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                      {tip.tip}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{tip.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-slate-800/30 border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Monthly Security Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Technical Tasks
                </h4>
                <div className="space-y-3">
                  {[
                    "Update all software and security patches",
                    "Review firewall and security logs",
                    "Test backup and recovery procedures",
                    "Scan for vulnerabilities",
                    "Update antivirus definitions",
                  ].map((task, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  Administrative Tasks
                </h4>
                <div className="space-y-3">
                  {[
                    "Review user access permissions",
                    "Conduct security awareness training",
                    "Update incident response procedures",
                    "Review security policies",
                    "Assess third-party vendor security",
                  ].map((task, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
