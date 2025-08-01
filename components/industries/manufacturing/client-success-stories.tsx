"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export default function ClientSuccessStories() {
  const [activeStory, setActiveStory] = useState(0)

  const stories = [
    {
      quote:
        "The predictive maintenance solution has completely transformed our operations. We've reduced unplanned downtime by 37% and saved millions in maintenance costs.",
      author: "Sarah Johnson",
      title: "CIO, Global Automotive Manufacturer",
      image: "/images/testimonials/manufacturing-exec-1.jpg",
    },
    {
      quote:
        "Implementing the AI-powered quality control system has improved our defect detection rate by 92%. Our customers have noticed the difference in product quality.",
      author: "Michael Chen",
      title: "VP of Operations, Electronics Manufacturer",
      image: "/images/testimonials/manufacturing-exec-2.jpg",
    },
    {
      quote:
        "The SAP and AI integration for our supply chain has been a game-changer. We've reduced inventory costs by 32% while improving on-time delivery to 97.8%.",
      author: "David Rodriguez",
      title: "Supply Chain Director, Industrial Equipment Maker",
      image: "/images/testimonials/manufacturing-exec-3.jpg",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from manufacturing leaders who have transformed their operations with our solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: activeStory === index ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={`${activeStory === index ? "block" : "hidden"}`}
              >
                <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                  <Quote className="h-12 w-12 text-blue-500 mb-6 opacity-50" />

                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">"{story.quote}"</p>

                  <div className="flex items-center">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={story.image || "/placeholder.svg?height=100&width=100&query=executive portrait"}
                        alt={story.author}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="font-bold text-lg">{story.author}</h4>
                      <p className="text-gray-400">{story.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStory(index)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  activeStory === index ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
