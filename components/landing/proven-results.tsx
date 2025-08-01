"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Award, BarChart3, Clock, Shield, Star, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ProvenResults() {
  const metrics = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Revenue Growth",
      value: "45%",
      description: "Average increase in client revenue within 12 months",
      progress: 85,
      color: "text-green-400",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Time to Market",
      value: "60%",
      description: "Faster product launches with optimized processes",
      progress: 75,
      color: "text-blue-400",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Operational Efficiency",
      value: "35%",
      description: "Reduction in operational costs through automation",
      progress: 90,
      color: "text-purple-400",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Data Security",
      value: "99.9%",
      description: "Uptime with enterprise-grade security measures",
      progress: 95,
      color: "text-orange-400",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp Industries",
      content:
        "The SAP transformation delivered by this team exceeded all our expectations. We saw immediate improvements in efficiency and data visibility.",
      rating: 5,
      avatar: "/images/testimonials/testimonial-1.jpg",
    },
    {
      name: "Michael Chen",
      role: "VP Operations, Global Manufacturing",
      content:
        "Their AI-powered analytics solution revolutionized our decision-making process. ROI was achieved within 6 months.",
      rating: 5,
      avatar: "/images/testimonials/testimonial-2.jpg",
    },
    {
      name: "Emily Rodriguez",
      role: "CFO, Financial Services Inc",
      content: "Outstanding expertise in SAP S/4HANA migration. The project was delivered on time and under budget.",
      rating: 5,
      avatar: "/images/testimonials/testimonial-3.jpg",
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/digital-transformation.jpg"
          alt="Digital transformation results"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-blue-900/90 to-purple-900/80"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-600/20 border border-green-400/30 mb-6">
            <Award className="h-4 w-4 text-green-400 mr-2" />
            <span className="text-green-300 text-sm font-medium">Proven Track Record</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Delivering{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
              Measurable Results
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our clients consistently achieve exceptional outcomes through our data-driven approach to SAP and AI
            implementation. Here's the proof.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className={`${metric.color} mb-4`}>{metric.icon}</div>
                  <div className={`text-3xl font-bold mb-2 ${metric.color}`}>{metric.value}</div>
                  <h3 className="text-lg font-semibold text-white mb-3">{metric.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{metric.description}</p>
                  <Progress value={metric.progress} className="h-2" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
