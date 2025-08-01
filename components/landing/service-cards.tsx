"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface ServiceCardProps {
  title: string
  description: string
  image: string
  delay?: number
}

function ServiceCard({ title, description, image, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href="#" className="block h-full">
        <div className="bg-gray-900 rounded-lg overflow-hidden h-full transition-transform duration-300 group-hover:transform group-hover:scale-[1.02] shadow-lg">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400 mb-6">{description}</p>
          </div>
          <div className="relative h-48 w-full">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ServiceCards() {
  const services = [
    {
      title: "SAP BRIM",
      description: "Optimizing business processes with cutting-edge SAP RevBRIM solutions.",
      image: "/images/services/revbrim.jpg",
    },
    {
      title: "SAP Enterprise Solutions",
      description: "Optimizing business processes with cutting-edge SAP solutions.",
      image: "/images/services/enterprise.jpg",
    },
    {
      title: "SAP Data & AI Analytics",
      description: "Harness data intelligence with AI-powered SAP analytics.",
      image: "/images/services/data-ai.jpg",
    },
    {
      title: "SAP Supply Chain & Procurement",
      description: "Transforming supply chains with intelligent SAP solutions.",
      image: "/images/services/supply-chain.jpg",
    },
    {
      title: "SAP Technology & Innovation",
      description: "Innovate with next-gen SAP technology and solutions.",
      image: "/images/services/technology.jpg",
    },
    {
      title: "Digital & AI Solutions",
      description: "Empowering businesses with digital transformation and AI.",
      image: "/images/services/digital-ai.jpg",
    },
    {
      title: "Cloud Solutions",
      description: "Scalable and secure cloud strategies for modern enterprises.",
      image: "/images/services/cloud.jpg",
    },
    {
      title: "Cybersecurity Services",
      description: "Advanced security solutions to protect your business assets.",
      image: "/images/services/cybersecurity.jpg",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              image={service.image}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
