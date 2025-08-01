"use client"

import { motion } from "framer-motion"

interface TimelineItemProps {
  year: string
  title: string
  description: string
  isLeft?: boolean
  delay?: number
}

const TimelineItem = ({ year, title, description, isLeft = true, delay = 0 }: TimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`flex ${isLeft ? "flex-row" : "flex-row-reverse"} items-center`}
    >
      <div className={`w-1/2 ${isLeft ? "text-right pr-8" : "text-left pl-8"}`}>
        <div
          className={`inline-block p-6 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg ${
            isLeft ? "rounded-tr-none" : "rounded-tl-none"
          }`}
        >
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-foreground/80">{description}</p>
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="h-full w-px bg-gradient-to-b from-blue-500 to-violet-500 absolute top-0 z-0"></div>
        <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg">
          {year}
        </div>
      </div>

      <div className="w-1/2"></div>
    </motion.div>
  )
}

export default function CompanyTimeline() {
  const timelineItems = [
    {
      year: "2010",
      title: "ESG Founded",
      description: "ESG was established with a vision to transform businesses through innovative technology solutions.",
      isLeft: true,
    },
    {
      year: "2015",
      title: "SAP Division Launch",
      description:
        "Became an official SAP partner, expanding our capabilities in enterprise solutions and digital transformation.",
      isLeft: false,
    },
    {
      year: "2020",
      title: "AI Division Launch",
      description:
        "Launched our dedicated AI division, focusing on advanced machine learning and artificial intelligence solutions.",
      isLeft: true,
    },
    {
      year: "2022",
      title: "Global Expansion",
      description:
        "Expanded operations globally with new offices in Europe and Asia, serving clients across multiple regions.",
      isLeft: false,
    },
    {
      year: "2024",
      title: "Innovation Hub",
      description:
        "Established our Innovation Hub, a center for research and development in cutting-edge technologies.",
      isLeft: true,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-bold text-center mb-16">
        Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">Journey</span>
      </h2>

      <div className="space-y-24">
        {timelineItems.map((item, index) => (
          <TimelineItem
            key={index}
            year={item.year}
            title={item.title}
            description={item.description}
            isLeft={item.isLeft}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  )
}
