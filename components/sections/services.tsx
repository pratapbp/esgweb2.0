"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, BarChart, Truck, Lightbulb, LineChart, Brain, Cloud, Shield, Users } from "lucide-react"

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services = [
    {
      title: "SAP Enterprise Solutions",
      description: "End-to-end SAP implementation and optimization services tailored to your business needs.",
      icon: <Database className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "SAP Data & AI Analytics",
      description: "Transform your data into actionable insights with our advanced analytics solutions.",
      icon: <BarChart className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "SAP Supply Chain & Procurement",
      description: "Optimize your supply chain operations with intelligent SAP solutions.",
      icon: <Truck className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "SAP Technology & Innovation",
      description: "Leverage cutting-edge SAP technologies to drive innovation in your organization.",
      icon: <Lightbulb className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "SAP RevBRIM",
      description: "Maximize revenue and billing management with specialized SAP solutions.",
      icon: <LineChart className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Digital & AI Solutions",
      description: "Harness the power of AI and digital technologies to transform your business processes.",
      icon: <Brain className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Cloud Solutions",
      description: "Seamlessly migrate and optimize your operations in the cloud environment.",
      icon: <Cloud className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Cybersecurity Services",
      description: "Protect your digital assets with our comprehensive security solutions.",
      icon: <Shield className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Staffing Solutions",
      description: "Access top talent and expertise to drive your technology initiatives forward.",
      icon: <Users className="h-10 w-10 text-blue-500" />,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive solutions to drive your digital transformation journey
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className={`h-full transition-all duration-300 ${
                  hoveredIndex === index ? "futuristic-border transform scale-[1.02]" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardHeader className="pb-2">
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
