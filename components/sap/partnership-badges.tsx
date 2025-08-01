"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Shield, Award, CheckCircle } from "lucide-react"

export default function PartnershipBadges() {
  const partners = [
    { name: "SAP Gold Partner", logo: "/images/partners/partner-1.svg" },
    { name: "AWS Advanced Partner", logo: "/images/partners/partner-2.svg" },
    { name: "Microsoft Gold Partner", logo: "/images/partners/partner-3.svg" },
    { name: "Google Cloud Partner", logo: "/images/partners/partner-4.svg" },
    { name: "Oracle Partner", logo: "/images/partners/partner-5.svg" },
    { name: "IBM Certified Partner", logo: "/images/partners/partner-6.svg" },
  ]

  const clients = [
    { name: "Acme Corporation", logo: "/images/clients/client-1.svg" },
    { name: "Globex", logo: "/images/clients/client-2.svg" },
    { name: "Initech", logo: "/images/clients/client-3.svg" },
    { name: "Umbrella Corp", logo: "/images/clients/client-4.svg" },
    { name: "Stark Industries", logo: "/images/clients/client-5.svg" },
    { name: "Wayne Enterprises", logo: "/images/clients/client-6.svg" },
  ]

  const certifications = [
    "ISO 27001 Certified",
    "SOC 2 Compliant",
    "GDPR Compliant",
    "HIPAA Compliant",
    "SAP S/4HANA Certified",
    "SAP Activate Methodology",
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our partnerships, certifications, and client relationships demonstrate our commitment to excellence in SAP
            services and AI innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Partnership Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          >
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold">Strategic Partnerships</h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-gray-800/70 rounded-lg p-4 flex items-center justify-center h-24"
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Client Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          >
            <div className="flex items-center mb-6">
              <Award className="h-6 w-6 text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold">Clients We Serve</h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-gray-800/70 rounded-lg p-4 flex items-center justify-center h-24"
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          >
            <div className="flex items-center mb-6">
              <CheckCircle className="h-6 w-6 text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold">Certifications</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center p-3 rounded-lg bg-gray-800/70"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                  <span className="text-gray-200">{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
