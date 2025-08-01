"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TimelineItemProps {
  year: string
  title: string
  description: string
  isLeft?: boolean
  delay?: number
  isActive: boolean
  onClick: () => void
}

const TimelineItem = ({ year, title, description, isLeft = true, delay = 0, isActive, onClick }: TimelineItemProps) => {
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
          className={`inline-block p-6 rounded-2xl backdrop-blur-md ${
            isActive ? "bg-blue-900/30" : "bg-card/30"
          } border ${
            isActive ? "border-blue-500/50" : "border-border"
          } shadow-lg ${isLeft ? "rounded-tr-none" : "rounded-tl-none"} cursor-pointer transition-all duration-300`}
          onClick={onClick}
        >
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-foreground/80">{description}</p>
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="h-full w-px bg-gradient-to-b from-blue-500 to-violet-500 absolute top-0 z-0"></div>
        <motion.div
          className={`relative z-10 w-12 h-12 rounded-full ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-violet-500"
              : "bg-gradient-to-r from-blue-500/50 to-violet-500/50"
          } flex items-center justify-center text-white font-bold shadow-lg cursor-pointer transition-all duration-300`}
          whileHover={{ scale: 1.1 }}
          onClick={onClick}
        >
          {year}
        </motion.div>
      </div>

      <div className="w-1/2"></div>
    </motion.div>
  )
}

export default function InteractiveTimeline() {
  const [activeYear, setActiveYear] = useState("2022")

  const timelineItems = [
    {
      year: "2020",
      title: "ESG Founded",
      description: "ESG was established with a vision to transform businesses through innovative technology solutions.",
      isLeft: true,
    },
    {
      year: "2021",
      title: "SAP Partnership",
      description:
        "Became an official SAP partner, expanding our capabilities in enterprise solutions and digital transformation.",
      isLeft: false,
    },
    {
      year: "2022",
      title: "AI Division Launch",
      description:
        "Launched our dedicated AI division, focusing on advanced machine learning and artificial intelligence solutions.",
      isLeft: true,
    },
    {
      year: "2023",
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">Journey</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Explore the key milestones in our company's history as we've grown and evolved.
          </p>
        </motion.div>

        <div className="space-y-24 max-w-4xl mx-auto">
          {timelineItems.map((item, index) => (
            <TimelineItem
              key={index}
              year={item.year}
              title={item.title}
              description={item.description}
              isLeft={item.isLeft}
              delay={index * 0.1}
              isActive={activeYear === item.year}
              onClick={() => setActiveYear(item.year)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-16 p-8 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg max-w-4xl mx-auto"
          >
            {activeYear === "2020" && (
              <div>
                <h3 className="text-2xl font-bold mb-4">The Beginning of ESG</h3>
                <p className="text-foreground/80 mb-4">
                  In 2020, ESG was founded by a team of technology experts with a shared vision of transforming how
                  businesses leverage enterprise solutions and AI. Starting with a small team of 10 specialists, we
                  focused on delivering high-quality SAP implementation services.
                </p>
                <p className="text-foreground/80">
                  Our first client was a mid-sized manufacturing company looking to modernize their operations. The
                  successful implementation of their SAP system set the foundation for our reputation as a reliable
                  technology partner.
                </p>
              </div>
            )}

            {activeYear === "2021" && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Strategic SAP Partnership</h3>
                <p className="text-foreground/80 mb-4">
                  2021 marked a significant milestone as we became an official SAP partner. This partnership expanded
                  our capabilities and allowed us to offer a broader range of enterprise solutions to our growing client
                  base.
                </p>
                <p className="text-foreground/80">
                  During this year, our team grew to 50 employees, and we opened our first dedicated office space. We
                  also completed our first large-scale S/4HANA implementation for a Fortune 500 company.
                </p>
              </div>
            )}

            {activeYear === "2022" && (
              <div>
                <h3 className="text-2xl font-bold mb-4">AI Innovation Division</h3>
                <p className="text-foreground/80 mb-4">
                  Recognizing the transformative potential of artificial intelligence, we launched our dedicated AI
                  division in 2022. This team focused on developing advanced machine learning solutions that could be
                  integrated with SAP and other enterprise systems.
                </p>
                <p className="text-foreground/80">
                  Our first AI-powered predictive analytics solution was deployed for a retail client, resulting in a
                  30% improvement in inventory management efficiency. This success story became a case study that
                  attracted more clients interested in AI-enhanced enterprise solutions.
                </p>
              </div>
            )}

            {activeYear === "2023" && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Global Expansion</h3>
                <p className="text-foreground/80 mb-4">
                  2023 saw ESG expand beyond our initial market, opening offices in London, Singapore, and Berlin. This
                  global presence allowed us to better serve multinational clients and tap into diverse talent pools.
                </p>
                <p className="text-foreground/80">
                  Our team grew to over 200 professionals worldwide, and we established dedicated industry practices for
                  manufacturing, healthcare, financial services, and retail. We also launched our 24/7 support services
                  to provide continuous assistance to our global client base.
                </p>
              </div>
            )}

            {activeYear === "2024" && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Innovation Hub Launch</h3>
                <p className="text-foreground/80 mb-4">
                  In 2024, we established our Innovation Hub, a center dedicated to research and development in emerging
                  technologies. This facility brings together our brightest minds to explore new applications of AI,
                  blockchain, IoT, and other cutting-edge technologies.
                </p>
                <p className="text-foreground/80">
                  The Innovation Hub has already produced several breakthrough solutions, including our proprietary AI
                  model for SAP process optimization and a blockchain-based supply chain verification system. These
                  innovations continue to position ESG at the forefront of enterprise technology.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
