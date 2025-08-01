"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

type Testimonial = {
  id: number
  name: string
  title: string
  company: string
  image: string
  quote: string
  rating: number
  industry: string
}

export default function ClientTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  // Default fallback image
  const fallbackImage = "/diverse-group-city.png"

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "CIO",
      company: "Nexus Manufacturing",
      image: "/images/testimonials/testimonial-1.jpg",
      quote:
        "The AI capabilities within our SAP environment have transformed how we approach production planning. We've seen a 27% improvement in forecast accuracy and significant reduction in inventory costs.",
      rating: 5,
      industry: "Manufacturing",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "VP of Operations",
      company: "Global Retail Solutions",
      image: "/images/testimonials/testimonial-2.jpg",
      quote:
        "ESG's SAP implementation with AI-driven analytics gave us visibility into our supply chain that we never thought possible. The ROI was evident within just three months of deployment.",
      rating: 5,
      industry: "Retail",
    },
    {
      id: 3,
      name: "Priya Sharma",
      title: "Director of Technology",
      company: "HealthFirst Systems",
      image: "/images/testimonials/testimonial-3.jpg",
      quote:
        "The intelligent process automation that ESG implemented in our SAP environment has reduced administrative tasks by 32%, allowing our staff to focus more on patient care rather than paperwork.",
      rating: 4,
      industry: "Healthcare",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    setAutoplay(false)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
    setAutoplay(false)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    }, 7000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear directly from organizations that have transformed their operations with our AI-enhanced SAP solutions.
          </p>
        </motion.div>

        <div className="relative">
          <div className="max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => {
              // Determine the image source, ensuring we never pass an empty string
              const testimonialImageSource =
                testimonial.image && testimonial.image.trim() !== "" ? testimonial.image : fallbackImage

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 0.9,
                    display: activeIndex === index ? "block" : "none",
                  }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden relative flex-shrink-0 border-4 border-blue-600">
                      {testimonial.image && testimonial.image.trim() !== "" ? (
                        <Image
                          src={testimonialImageSource || "/placeholder.svg"}
                          alt={`${testimonial.name} portrait`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">{testimonial.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <Quote className="h-8 w-8 text-blue-400 mr-2" />
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-600"}`}
                              fill={i < testimonial.rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>

                      <blockquote className="text-lg md:text-xl text-gray-200 italic mb-6">
                        "{testimonial.quote}"
                      </blockquote>

                      <div>
                        <p className="text-lg font-semibold">{testimonial.name}</p>
                        <p className="text-gray-400">
                          {testimonial.title}, {testimonial.company}
                        </p>
                        <div className="mt-2 inline-block px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 text-sm">
                          {testimonial.industry}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Navigation buttons */}
          {typeof window !== "undefined" && (
            <>
              <Button
                onClick={prevTestimonial}
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 md:-left-12 lg:-left-16 border-gray-700 bg-gray-900/70 backdrop-blur-sm hover:bg-gray-800"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                onClick={nextTestimonial}
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 md:-right-12 lg:-right-16 border-gray-700 bg-gray-900/70 backdrop-blur-sm hover:bg-gray-800"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  setAutoplay(false)
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  activeIndex === index ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
