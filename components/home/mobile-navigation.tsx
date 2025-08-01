"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const isMobile = useMediaQuery("(max-width: 768px)")

  const navItems: NavItem[] = [
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "SAP Enterprise Solutions", href: "/services/sap-enterprise-solutions" },
        { label: "SAP Data & AI Analytics", href: "/services/sap-data-ai-analytics" },
        { label: "SAP Supply Chain & Procurement", href: "/services/sap-supply-chain-procurement" },
        { label: "SAP Technology & Innovation", href: "/services/sap-technology-innovation" },
        { label: "SAP RevBRIM", href: "/services/sap-revbrim" },
        { label: "Digital & AI Solutions", href: "/services/digital-ai-solutions" },
        { label: "Cloud Solutions", href: "/services/cloud-solutions" },
        { label: "Cybersecurity Services", href: "/services/cybersecurity-services" },
        { label: "Staffing Solutions", href: "/services/staffing-solutions" },
      ],
    },
    {
      label: "Industries",
      href: "/industries",
      children: [
        { label: "Manufacturing", href: "/industries/manufacturing" },
        { label: "Healthcare", href: "/industries/healthcare" },
        { label: "Retail", href: "/industries/retail" },
        { label: "Financial Services", href: "/industries/financial-services" },
      ],
    },
    { label: "About Us", href: "/about" },
    { label: "Technologies", href: "/technologies" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ]

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  if (!isMobile) return null

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 bg-gray-900/80 backdrop-blur-sm border border-gray-700 md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-gray-900 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end p-4 border-b border-gray-800">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.label} className="border-b border-gray-800 py-2">
                      {item.children ? (
                        <div>
                          <button
                            className="flex items-center justify-between w-full py-2 text-left"
                            onClick={() => toggleExpanded(item.label)}
                          >
                            <span className="text-lg font-medium">{item.label}</span>
                            {expandedItems.includes(item.label) ? (
                              <ChevronDown className="h-5 w-5" />
                            ) : (
                              <ChevronRight className="h-5 w-5" />
                            )}
                          </button>

                          <AnimatePresence>
                            {expandedItems.includes(item.label) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pl-4 space-y-1 overflow-hidden"
                              >
                                {item.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    className="block py-2 text-gray-400 hover:text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block py-2 text-lg font-medium hover:text-blue-400 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="mt-8 space-y-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Contact Us</Button>
                  <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                    Client Portal
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
