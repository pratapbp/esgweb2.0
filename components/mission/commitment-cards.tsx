"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Check, Shield, Users, BarChart3, Code, Award, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export function CommitmentCards() {
  return (
    <section className="py-24 bg-gradient-to-b from-emerald-50 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Our Commitments
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Unwavering <span className="text-emerald-600">Dedication</span> to Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We uphold these core commitments in every SAP transformation project we undertake, ensuring consistent,
              high-quality outcomes that drive lasting business value.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {commitments.map((commitment, index) => (
            <CommitmentCard key={commitment.title} commitment={commitment} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface Commitment {
  title: string
  description: string
  icon: React.ElementType
  features: string[]
  gradient: string
  bgColor: string
}

function CommitmentCard({ commitment, index }: { commitment: Commitment; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 h-full group",
        commitment.bgColor,
      )}
    >
      <div className={cn("h-2", commitment.gradient)} />
      <div className="p-8">
        <div className="mb-6">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300",
              "bg-gradient-to-br",
              commitment.gradient.replace("bg-gradient-to-r", ""),
            )}
          >
            <commitment.icon className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">{commitment.title}</h3>
          <p className="text-gray-600 leading-relaxed">{commitment.description}</p>
        </div>

        <ul className="space-y-3">
          {commitment.features.map((feature) => (
            <li key={feature} className="flex items-start">
              <Check className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 shrink-0" />
              <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

const commitments: Commitment[] = [
  {
    title: "Technical Excellence",
    description: "We deliver SAP solutions built on technical best practices and cutting-edge innovation.",
    icon: Code,
    features: [
      "Adherence to SAP architecture standards",
      "Clean, maintainable implementations",
      "Performance optimization protocols",
      "Future-ready system designs",
    ],
    gradient: "bg-gradient-to-r from-emerald-500 to-teal-400",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
  {
    title: "Measurable Outcomes",
    description: "Every transformation we deliver focuses on tangible, quantifiable business results.",
    icon: BarChart3,
    features: [
      "KPI-driven implementation approach",
      "Regular performance benchmarking",
      "ROI measurement frameworks",
      "Continuous improvement cycles",
    ],
    gradient: "bg-gradient-to-r from-teal-500 to-emerald-400",
    bgColor: "bg-teal-50 border-teal-200",
  },
  {
    title: "Enterprise Security",
    description: "Security is foundational to our SAP and AI integration methodology.",
    icon: Shield,
    features: [
      "SAP security best practices",
      "Data privacy compliance (GDPR, SOX)",
      "Secure AI model deployment",
      "Comprehensive access controls",
    ],
    gradient: "bg-gradient-to-r from-emerald-600 to-green-500",
    bgColor: "bg-green-50 border-green-200",
  },
  {
    title: "Client Partnership",
    description: "We build lasting relationships through collaborative delivery methods.",
    icon: Users,
    features: [
      "Transparent communication protocols",
      "Knowledge transfer focus",
      "Joint planning and execution",
      "Long-term success orientation",
    ],
    gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
  {
    title: "Innovation Leadership",
    description: "We continuously evolve our approaches to deliver cutting-edge solutions.",
    icon: Award,
    features: [
      "Research & development investment",
      "Emerging technology adoption",
      "Experimental solution frameworks",
      "Innovation workshops and labs",
    ],
    gradient: "bg-gradient-to-r from-teal-600 to-emerald-600",
    bgColor: "bg-teal-50 border-teal-200",
  },
  {
    title: "Quality Assurance",
    description: "Rigorous quality controls ensure reliable, high-performing solutions.",
    icon: Zap,
    features: [
      "Comprehensive testing methodologies",
      "Quality gates throughout delivery",
      "Performance validation protocols",
      "Post-implementation monitoring",
    ],
    gradient: "bg-gradient-to-r from-emerald-500 to-green-400",
    bgColor: "bg-green-50 border-green-200",
  },
]
