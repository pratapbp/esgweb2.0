"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function IndustryInsights() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry Insights</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Stay ahead with our latest research, trends, and insights across various industries
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "The Future of Manufacturing: AI and IoT Integration",
              image: "/images/manufacturing/technology-integration.jpg",
              category: "Manufacturing",
            },
            {
              title: "Digital Transformation in Healthcare: 2023 Trends",
              image: "/images/industries/healthcare.jpg",
              category: "Healthcare",
            },
            {
              title: "Financial Services: Blockchain and Beyond",
              image: "/images/industries/banking.jpg",
              category: "Financial Services",
            },
          ].map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative h-48">
                <Image src={insight.image || "/placeholder.svg"} alt={insight.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {insight.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{insight.title}</h3>
                <p className="text-muted-foreground mb-4">
                  Explore the latest trends, challenges, and opportunities shaping the future of this industry.
                </p>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="default" size="lg">
            View All Insights
          </Button>
        </div>
      </div>
    </section>
  )
}
