"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Phone, Mail, Calendar, Download, CheckCircle, ArrowRight, Users, Clock, Award } from "lucide-react"

export default function CybersecurityCTA() {
  const services = [
    {
      name: "Security Assessment",
      description: "Comprehensive evaluation of your current security posture",
      duration: "2-4 weeks",
      icon: Shield,
      features: ["Vulnerability scanning", "Risk assessment", "Compliance review", "Recommendations report"],
    },
    {
      name: "Incident Response Planning",
      description: "Develop and test your incident response capabilities",
      duration: "1-2 weeks",
      icon: Clock,
      features: ["Response playbooks", "Team training", "Simulation exercises", "Communication plans"],
    },
    {
      name: "Security Training Program",
      description: "Educate your team on cybersecurity best practices",
      duration: "Ongoing",
      icon: Users,
      features: ["Phishing simulations", "Security awareness", "Role-based training", "Progress tracking"],
    },
  ]

  const benefits = [
    "Reduce security incidents by up to 85%",
    "Achieve compliance with industry standards",
    "Minimize business disruption from cyber attacks",
    "Protect customer data and maintain trust",
    "Lower cyber insurance premiums",
    "Improve overall security posture",
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Card className="bg-gradient-to-r from-red-900/30 via-slate-800/50 to-blue-900/30 border-slate-700 p-12">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Shield className="h-16 w-16 text-red-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Secure Your Digital Future Today</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Don't wait for a cyber attack to happen. Implement comprehensive cybersecurity solutions and protect
                your organization with our expert guidance and cutting-edge technologies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 text-lg"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Security Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg bg-transparent"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Security Guide
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-400" />
                  <span>ISO 27001 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </motion.div>
          </Card>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">Our Cybersecurity Services</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-red-500/50 transition-all duration-300 h-full group">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-600">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline" className="border-red-500/50 text-red-400">
                        {service.duration}
                      </Badge>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {service.name}
                    </h4>
                    <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>

                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 group-hover:border-red-400 bg-transparent"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-slate-800/30 border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Why Choose Our Cybersecurity Solutions?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-slate-800/50 border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Ready to Strengthen Your Security?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact our cybersecurity experts today for a free consultation and learn how we can help protect your
              organization from cyber threats.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-red-400" />
                <span className="text-white font-medium">+1 (781) 425-1012</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">security@esgit.com</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700">
              <p className="text-gray-400 text-sm">Available 24/7 for emergency incident response</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
