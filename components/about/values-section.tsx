"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Lightbulb, Users, Shield, Rocket, Heart, Globe } from "lucide-react"

interface ValueCardProps {
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
}

const ValueCard = ({ title, description, icon, delay = 0 }: ValueCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        transition: { duration: 0.3 },
      }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-2xl blur-lg"></div>

      <div className="relative p-6 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg h-full">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400 mr-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-foreground/80">{description}</p>
      </div>
    </motion.div>
  )
}

export default function ValuesSection() {
  const values = [
    {
      title: "Innovation",
      description:
        "We constantly push the boundaries of what's possible, embracing new technologies and approaches to deliver exceptional solutions.",
      icon: <Lightbulb />,
    },
    {
      title: "Collaboration",
      description:
        "We believe in the power of teamwork, working closely with our clients and partners to achieve shared goals.",
      icon: <Users />,
    },
    {
      title: "Integrity",
      description:
        "We uphold the highest ethical standards in all our interactions, building trust through transparency and honesty.",
      icon: <Shield />,
    },
    {
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, delivering high-quality solutions that exceed expectations.",
      icon: <Rocket />,
    },
    {
      title: "Empathy",
      description:
        "We understand our clients' challenges and needs, approaching each project with empathy and a commitment to their success.",
      icon: <Heart />,
    },
    {
      title: "Sustainability",
      description:
        "We are committed to sustainable practices, developing solutions that drive positive environmental and social impact.",
      icon: <Globe />,
    },
    {
      title: "SAP Excellence",
      description:
        "We are dedicated to delivering exceptional SAP solutions and services, leveraging our deep expertise to drive client success.",
      icon: <Rocket />,
    },
    {
      title: "SAP Innovation",
      description:
        "We embrace innovation in the SAP ecosystem, constantly seeking new ways to optimize processes and enhance business value for our clients.",
      icon: <Lightbulb />,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h2 className="text-2xl font-bold text-center mb-16">
        Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">Core</span>{" "}
        Values
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <ValueCard
            key={index}
            title={value.title}
            description={value.description}
            icon={value.icon}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  )
}
