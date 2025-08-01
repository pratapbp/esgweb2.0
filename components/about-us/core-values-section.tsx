"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Lightbulb, Users, Shield, Rocket, Heart, Globe, Zap, Code } from "lucide-react"

interface ValueCardProps {
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
  color: string
}

const ValueCard = ({ title, description, icon, delay = 0, color }: ValueCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
      className="relative group"
    >
      <div
        className={`absolute inset-0 ${color} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70 group-hover:opacity-100`}
      ></div>

      <div className="relative h-full p-6 rounded-2xl backdrop-blur-md bg-background/30 border border-background/20 shadow-lg overflow-hidden">
        {/* Reflective highlight */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full transform rotate-45 group-hover:scale-150 transition-transform duration-500"></div>

        {/* Icon with gradient background */}
        <div
          className={`relative z-10 mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full ${color.replace("bg-", "bg-gradient-to-br from-").replace("/20", "/20 to-").replace("500", "700")} backdrop-blur-sm border border-white/10`}
        >
          <motion.div
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
            }}
            className={`${color.replace("bg-", "text-").replace("/20", "")}`}
          >
            {icon}
          </motion.div>
        </div>

        <h3 className="relative z-10 text-xl font-bold mb-2">{title}</h3>
        <p className="relative z-10 text-foreground/80">{description}</p>

        {/* Water drop effect */}
        <motion.div
          className={`absolute bottom-0 right-0 w-32 h-32 ${color.replace("/20", "/10")} rounded-full blur-2xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
      </div>
    </motion.div>
  )
}

export default function CoreValuesSection() {
  const values = [
    {
      title: "Innovation",
      description:
        "We constantly push the boundaries of what's possible, embracing new technologies and approaches to deliver exceptional solutions.",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "bg-blue-500/20",
    },
    {
      title: "Collaboration",
      description:
        "We believe in the power of teamwork, working closely with our clients and partners to achieve shared goals.",
      icon: <Users className="w-8 h-8" />,
      color: "bg-violet-500/20",
    },
    {
      title: "Integrity",
      description:
        "We uphold the highest ethical standards in all our interactions, building trust through transparency and honesty.",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-emerald-500/20",
    },
    {
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, delivering high-quality solutions that exceed expectations.",
      icon: <Rocket className="w-8 h-8" />,
      color: "bg-amber-500/20",
    },
    {
      title: "Empathy",
      description:
        "We understand our clients' challenges and needs, approaching each project with empathy and a commitment to their success.",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-rose-500/20",
    },
    {
      title: "Sustainability",
      description:
        "We are committed to sustainable practices, developing solutions that drive positive environmental and social impact.",
      icon: <Globe className="w-8 h-8" />,
      color: "bg-teal-500/20",
    },
    {
      title: "Agility",
      description:
        "We embrace change and adapt quickly to new challenges, maintaining flexibility in our approach to problem-solving.",
      icon: <Zap className="w-8 h-8" />,
      color: "bg-indigo-500/20",
    },
    {
      title: "Technical Excellence",
      description:
        "We maintain the highest standards of technical expertise, continuously learning and improving our skills.",
      icon: <Code className="w-8 h-8" />,
      color: "bg-cyan-500/20",
    },
  ]

  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
              Core Values
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            These principles guide our decisions, shape our culture, and define how we work with our clients and each
            other.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              title={value.title}
              description={value.description}
              icon={value.icon}
              delay={index * 0.1}
              color={value.color}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
