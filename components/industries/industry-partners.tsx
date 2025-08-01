"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function IndustryPartners() {
  const partners = [
    { name: "Partner 1", logo: "/images/partners/partner-1.svg" },
    { name: "Partner 2", logo: "/images/partners/partner-2.svg" },
    { name: "Partner 3", logo: "/images/partners/partner-3.svg" },
    { name: "Partner 4", logo: "/images/partners/partner-4.svg" },
    { name: "Partner 5", logo: "/images/partners/partner-5.svg" },
    { name: "Partner 6", logo: "/images/partners/partner-6.svg" },
  ]

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Technology Partners</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We collaborate with industry-leading technology providers to deliver comprehensive solutions
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center p-6 bg-card rounded-lg hover:shadow-md transition-shadow"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={120}
                height={60}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
