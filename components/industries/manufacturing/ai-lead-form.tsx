"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Send, Check } from "lucide-react"

export default function AILeadForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        company: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-400 text-sm font-medium mb-4">
                <Brain className="mr-2 h-4 w-4" />
                AI-Powered Solutions
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transform Your <span className="gradient-text">Manufacturing Operations</span>
              </h2>

              <p className="text-xl text-gray-300 mb-8">
                Ready to revolutionize your manufacturing processes with AI and SAP? Contact us to learn how our
                solutions can drive efficiency, quality, and innovation in your operations.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                    <span className="text-blue-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-bold">Predictive Maintenance:</span> Reduce downtime by up to 45% with AI that
                    predicts equipment failures before they occur.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                    <span className="text-blue-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-bold">Quality Control:</span> Improve product quality with computer vision and
                    AI that detects defects with 99.8% accuracy.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                    <span className="text-blue-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-bold">Supply Chain Optimization:</span> Reduce inventory costs by 30% with AI
                    algorithms that optimize inventory levels.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-xl border border-gray-800 p-8 shadow-xl"
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Submit Request <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-600/20 mb-6">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-300 mb-6">
                    Your request has been submitted successfully. Our team will contact you shortly to discuss how we
                    can help transform your manufacturing operations.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Submit Another Request
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
