"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Youtube,
  Facebook,
  Instagram,
  ArrowRight,
  Zap,
  Brain,
  Shield,
  Cloud,
  Database,
  Cpu,
  Users,
  Award,
  TrendingUp,
  Target,
  Lightbulb,
  Heart,
  CheckCircle,
  Briefcase,
  FileText,
  HelpCircle,
  Factory,
  ShoppingCart,
  Landmark,
  Smartphone,
  Truck,
  Bot,
  Blocks,
  Wifi,
  CloudLightning,
  Copy,
  Eye,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const footerSections = {
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about-us", icon: <Building2 className="h-4 w-4" /> },
      { name: "Who We Are", href: "/who-we-are", icon: <Users className="h-4 w-4" /> },
      { name: "Our Mission", href: "/mission", icon: <Target className="h-4 w-4" /> },
      { name: "Careers", href: "/careers", icon: <Briefcase className="h-4 w-4" />, badge: "Hiring" },
      { name: "LCA Postings", href: "/lca-postings", icon: <FileText className="h-4 w-4" />, badge: "H1B" },
    ],
  },
  services: {
    title: "What We Do",
    links: [
      {
        name: "SAP Enterprise Solutions",
        href: "/services/sap-enterprise-solutions",
        icon: <Database className="h-4 w-4" />,
        badge: "Popular",
      },
      {
        name: "SAP Data & AI Analytics",
        href: "/services/sap-data-ai-analytics",
        icon: <Brain className="h-4 w-4" />,
        badge: "GenAI",
      },
      {
        name: "SAP Supply Chain & Procurement",
        href: "/services/sap-supply-chain-procurement",
        icon: <Truck className="h-4 w-4" />,
      },
      { name: "SAP BRIM", href: "/services/sap-brim", icon: <TrendingUp className="h-4 w-4" /> },
      {
        name: "SAP Technology Innovation",
        href: "/services/sap-technology-innovation",
        icon: <Cpu className="h-4 w-4" />,
        badge: "New",
      },
      {
        name: "Digital & AI Solutions",
        href: "/services/digital-ai-solutions",
        icon: <Brain className="h-4 w-4" />,
        badge: "Hot",
      },
      { name: "Cloud Solutions", href: "/services/cloud-solutions", icon: <Cloud className="h-4 w-4" /> },
      {
        name: "Cybersecurity Services",
        href: "/services/cybersecurity-services",
        icon: <Shield className="h-4 w-4" />,
      },
      { name: "Staffing Solutions", href: "/services/staffing-solutions", icon: <Users className="h-4 w-4" /> },
    ],
  },
  industries: {
    title: "Our Expertise",
    links: [
      { name: "Manufacturing", href: "/industries/manufacturing", icon: <Factory className="h-4 w-4" /> },
      { name: "Healthcare", href: "/industries/healthcare", icon: <Heart className="h-4 w-4" /> },
      { name: "Financial Services", href: "/industries/bfsi", icon: <Landmark className="h-4 w-4" /> },
      { name: "Retail & E-commerce", href: "/industries/retail", icon: <ShoppingCart className="h-4 w-4" /> },
      {
        name: "Telecommunications",
        href: "/industries/telecom",
        icon: <Smartphone className="h-4 w-4" />,
        badge: "New",
      },
      { name: "Public Sector", href: "/industries/public-sector", icon: <Building2 className="h-4 w-4" /> },
      { name: "Energy & Utilities", href: "/industries/energy-utilities", icon: <Zap className="h-4 w-4" /> },
      { name: "Logistics", href: "/industries/logistics", icon: <Truck className="h-4 w-4" /> },
      { name: "Pharmaceuticals", href: "/industries/pharma", icon: <Heart className="h-4 w-4" /> },
    ],
  },
  technologies: {
    title: "Tech Stack",
    links: [
      { name: "Technology Overview", href: "/technologies", icon: <Cpu className="h-4 w-4" /> },
      { name: "Generative AI", href: "/technologies/genai", icon: <Brain className="h-4 w-4" />, badge: "Featured" },
      { name: "Blockchain", href: "/technologies/blockchain", icon: <Blocks className="h-4 w-4" /> },
      { name: "RPA", href: "/technologies/rpa", icon: <Bot className="h-4 w-4" /> },
      {
        name: "Cybersecurity",
        href: "/technologies/cybersecurity",
        icon: <Shield className="h-4 w-4" />,
        badge: "New",
      },
      { name: "IoT & Edge AI", href: "/technologies/iot", icon: <Wifi className="h-4 w-4" />, badge: "New" },
      {
        name: "Superintelligence",
        href: "/technologies/superintelligence",
        icon: <Lightbulb className="h-4 w-4" />,
        badge: "New",
      },
      {
        name: "Cloud Infrastructure",
        href: "/technologies/cloud",
        icon: <CloudLightning className="h-4 w-4" />,
        badge: "New",
      },
      {
        name: "Theory of Mind AI",
        href: "/technologies/theory-of-mind",
        icon: <Eye className="h-4 w-4" />,
        badge: "New",
      },
      { name: "Digital Twin", href: "/technologies/digital-twin", icon: <Copy className="h-4 w-4" />, badge: "New" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "Insights", href: "/insights", icon: <Lightbulb className="h-4 w-4" />, badge: "AI-Powered" },
      { name: "Blog", href: "/blog", icon: <FileText className="h-4 w-4" /> },
      { name: "Case Studies", href: "/case-studies", icon: <Award className="h-4 w-4" /> },
      { name: "Whitepapers", href: "/whitepapers", icon: <FileText className="h-4 w-4" /> },
      { name: "Help Center", href: "/help", icon: <HelpCircle className="h-4 w-4" /> },
    ],
  },
}

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/esg-executive-software-guild",
    icon: <Linkedin className="h-5 w-5" />,
  },
  { name: "Twitter", href: "https://twitter.com/esg_guild", icon: <Twitter className="h-5 w-5" /> },
  { name: "GitHub", href: "https://github.com/esg-guild", icon: <Github className="h-5 w-5" /> },
  { name: "YouTube", href: "https://youtube.com/@esg-guild", icon: <Youtube className="h-5 w-5" /> },
  { name: "Facebook", href: "https://facebook.com/esg.guild", icon: <Facebook className="h-5 w-5" /> },
  { name: "Instagram", href: "/instagram.com/esg_guild", icon: <Instagram className="h-5 w-5" /> },
]

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "info@esgit.com",
    href: "mailto:info@esgit.com",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    value: "+1 (781) 425-1012",
    href: "tel:+17814251012",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Address",
    value: "8751 Collin Mckinney PKWY, Suite#601, Mckinney, TX-75070",
    href: "/contact#locations",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    label: "Website",
    value: "www.esgit.com",
    href: "https://www.esgit.com",
  },
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
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-2 space-y-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">ESG</h3>
                  <p className="text-sm text-gray-400">Executive Software Guild</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                ESG Executive Software Guild is a leading technology consulting firm specializing in SAP solutions,
                AI-powered analytics, and digital transformation services for enterprises worldwide.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
              <p className="text-sm text-gray-400">Get the latest insights on AI, SAP, and digital transformation.</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-r-none"
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-l-none"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-sm flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Successfully subscribed!</span>
                  </motion.p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contact Info</h4>
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <div className="text-blue-400">{item.icon}</div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm">{item.value}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {Object.entries(footerSections).map(([key, section]) => (
                <div key={key} className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link, index) => (
                      <li key={index}>
                        <Link
                          href={link.href}
                          className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors text-sm group"
                        >
                          <div className="text-blue-400/60 group-hover:text-blue-400 transition-colors">
                            {link.icon}
                          </div>
                          <span>{link.name}</span>
                          {link.badge && (
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                link.badge === "AI-Powered" || link.badge === "GenAI"
                                  ? "border-purple-500 text-purple-400"
                                  : link.badge === "Hot"
                                    ? "border-red-500 text-red-400"
                                    : link.badge === "New"
                                      ? "border-green-500 text-green-400"
                                      : link.badge === "Featured"
                                        ? "border-blue-500 text-blue-400"
                                        : link.badge === "Popular"
                                          ? "border-orange-500 text-orange-400"
                                          : link.badge === "Hiring"
                                            ? "border-emerald-500 text-emerald-400"
                                            : link.badge === "H1B"
                                              ? "border-yellow-500 text-yellow-400"
                                              : "border-gray-500 text-gray-400"
                              }`}
                            >
                              {link.badge}
                            </Badge>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ESG Executive Software Guild. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-4 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
