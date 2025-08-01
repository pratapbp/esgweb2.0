"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import WaterDropButton from "@/components/ui/water-drop-button"

interface CaseStudyCardProps {
  title: string
  category: string
  image: string
  delay?: number
}

function CaseStudyCard({ title, category, image, delay = 0 }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-all duration-300 group-hover:border-blue-500/30">
        <div className="relative h-48">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
          <p className="text-sm text-gray-400">{category}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "Streamlining Subscription Billing for Telecom Giant",
      category: "SAP RevBRIM",
      image: "/images/case-studies/telecom.jpg",
    },
    {
      title: "Optimizing Revenue Recognition for SaaS Provider",
      category: "SAP RevBRIM",
      image: "/images/case-studies/saas.jpg",
    },
    {
      title: "Enhancing Convergent Charging for Digital Firm",
      category: "SAP RevBRIM",
      image: "/images/case-studies/digital.jpg",
    },
    {
      title: "Reducing Invoice Processing Time for Energy Sector Leader",
      category: "SAP RevBRIM",
      image: "/images/case-studies/energy.jpg",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <div className="text-blue-500 mr-3">🔍</div>
          <h3 className="text-blue-500 font-medium">Case Studies</h3>
        </div>

        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">How SAP solutions solve complex business challenges.</h2>

          <div className="relative">
            <select className="appearance-none bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Services</option>
              <option>SAP RevBRIM</option>
              <option>SAP Enterprise Solutions</option>
              <option>SAP Data & AI Analytics</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={index}
              title={study.title}
              category={study.category}
              image={study.image}
              delay={index * 0.1}
            />
          ))}
        </div>

        <div className="text-center">
          <WaterDropButton className="bg-purple-600 hover:bg-purple-700">LOAD MORE</WaterDropButton>
        </div>
      </div>
    </section>
  )
}
