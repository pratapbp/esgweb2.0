"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formState)
    // Reset form
    setFormState({ name: "", email: "", message: "" })
    // Show success message
    alert("Thank you for your message! We will get back to you soon.")
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-500" />,
      title: "Email",
      details: "info@esginc.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-500" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-500" />,
      title: "Address",
      details: "123 Innovation Drive, Tech City, TC 12345",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background/95 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Ready to transform your business? Contact us today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="text-lg font-medium text-white">{item.title}</h4>
                    <p className="text-gray-400">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-gray-400 mb-6">
                Schedule a consultation with our experts to discuss your business needs and how our solutions can help.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Schedule Consultation</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
