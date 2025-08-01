"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
  Building2,
  Users,
  Award,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const currentYear = new Date().getFullYear()

const footerSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about-us" },
      { name: "Mission", href: "/mission" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "SAP Solutions", href: "/services/sap-enterprise-solutions" },
      { name: "AI & Analytics", href: "/services/sap-data-ai-analytics" },
      { name: "Digital Transformation", href: "/services" },
      { name: "Cloud Services", href: "/services" },
    ],
  },
  {
    title: "Industries",
    links: [
      { name: "Manufacturing", href: "/industries/manufacturing" },
      { name: "Healthcare", href: "/industries" },
      { name: "Finance", href: "/industries" },
      { name: "Retail", href: "/industries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Case Studies", href: "/blog" },
      { name: "White Papers", href: "/blog" },
      { name: "Documentation", href: "/blog" },
      { name: "Support", href: "/contact" },
    ],
  },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-500" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500" },
  { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-500" },
]

const companyStats = [
  { icon: Building2, value: "15+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Projects Delivered" },
  { icon: Award, value: "50+", label: "Industry Awards" },
  { icon: Globe, value: "25+", label: "Countries Served" },
]

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Company Stats Section */}
        <div className="py-12 border-b border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-6">
                  <img src="/images/logos/esg-logo-horizontal.webp" alt="ESG Inc. Logo" className="h-10 w-auto" />
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Leading enterprise transformation through cutting-edge SAP implementations, AI-powered analytics, and
                  innovative digital solutions that drive business success.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Mail className="h-5 w-5 mr-3 text-blue-400" />
                    <span>contact@esg-inc.com</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-5 w-5 mr-3 text-blue-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                    <span>New York, NY | London, UK</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Get the latest insights on SAP, AI, and digital transformation.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? "Subscribed!" : "Subscribe"}
                    {!isSubscribed && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-300 mb-4 md:mb-0">
              <p className="text-lg">&copy; {currentYear} ESG Inc. All rights reserved.</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-blue-400 transition-colors duration-200">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
