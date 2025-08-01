"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import DropdownMenu from "../navigation/dropdown-menu"
import AnimatedSapAiLogo from "@/components/ui/animated-sap-ai-logo"

const expertiseItems = [
  {
    title: "Manufacturing & Engineering",
    href: "/industries/manufacturing",
  },
  {
    title: "Automotive & Transportation",
    href: "/industries/automotive",
  },
  {
    title: "Construction & Infrastructure",
    href: "/industries/construction",
  },
  {
    title: "Energy & Utilities",
    href: "/industries/energy",
  },
  {
    title: "IT & Consulting",
    href: "/industries/it-consulting",
  },
  {
    title: "Retail & Consumer Goods",
    href: "/industries/retail",
  },
  {
    title: "Finance & Professional Services",
    href: "/industries/finance",
  },
  {
    title: "Healthcare & Pharmaceuticals",
    href: "/industries/healthcare",
  },
]

const whatWeDoItems = [
  {
    title: "SAP Enterprise Solutions",
    href: "/services/sap-enterprise-solutions",
  },
  {
    title: "SAP Data & AI Analytics",
    href: "/services/sap-data-ai-analytics",
  },
  {
    title: "SAP Supply Chain & Procurement",
    href: "/services/sap-supply-chain-procurement",
  },
  {
    title: "SAP Technology & Innovation",
    href: "/services/sap-technology-innovation",
  },
  {
    title: "SAP RevBRIM",
    href: "/services/sap-revbrim",
  },
  {
    title: "Digital & AI Solutions",
    href: "/services/digital-ai-solutions",
  },
  {
    title: "Cloud Solutions",
    href: "/services/cloud-solutions",
  },
  {
    title: "Cybersecurity Services",
    href: "/services/cybersecurity-services",
  },
  {
    title: "Staffing Solutions",
    href: "/services/staffing-solutions",
  },
]

const techStackItems = [
  {
    title: "SAP S/4HANA",
    href: "/tech/sap-s4hana",
  },
  {
    title: "SAP Fiori",
    href: "/tech/sap-fiori",
  },
  {
    title: "SAP BTP",
    href: "/tech/sap-btp",
  },
  {
    title: "Cloud Platforms",
    href: "/tech/cloud-platforms",
  },
]

const joinTeamItems = [
  {
    title: "Current Openings",
    href: "/careers/openings",
  },
  {
    title: "Life at ESG",
    href: "/careers/life-at-esg",
  },
  {
    title: "Benefits",
    href: "/careers/benefits",
  },
]

export default function ModernHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-[#111827] border-b border-gray-800 sticky top-0 z-[100]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo (self-linked) */}
          <AnimatedSapAiLogo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu
              title="About Us"
              items={[
                { title: "About Us", href: "/about" },
                { title: "Our Team", href: "/team" },
                { title: "Our Mission", href: "/mission" },
              ]}
              description="Learn about ESG's vision, values, and the team behind our success."
            />

            <DropdownMenu
              title="Services"
              items={whatWeDoItems}
              description="Explore our comprehensive range of SAP and technology services."
            />

            <DropdownMenu
              title="Industries"
              items={expertiseItems}
              description="Discover how ESG delivers tailored IT solutions across various industries."
            />

            <DropdownMenu
              title="Technologies"
              items={techStackItems}
              description="Learn about the technologies and platforms we leverage."
            />

            <DropdownMenu
              title="Careers"
              items={joinTeamItems}
              description="Explore career opportunities and life at ESG."
            />

            <Link href="/contact" className="text-white hover:text-blue-400 transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Search and Mobile Menu Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-blue-400 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button
              className="md:hidden text-white hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111827] border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">About Us</h3>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              <div className="pl-4 space-y-2">
                <Link href="/about" className="block text-gray-300 hover:text-white">
                  About Us
                </Link>
                <Link href="/team" className="block text-gray-300 hover:text-white">
                  Our Team
                </Link>
                <Link href="/mission" className="block text-gray-300 hover:text-white">
                  Our Mission
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">Services</h3>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              <div className="pl-4 space-y-2">
                {whatWeDoItems.map((item) => (
                  <Link key={item.title} href={item.href} className="block text-gray-300 hover:text-white">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">Industries</h3>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              <div className="pl-4 space-y-2">
                {expertiseItems.map((item) => (
                  <Link key={item.title} href={item.href} className="block text-gray-300 hover:text-white">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">Technologies</h3>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              <div className="pl-4 space-y-2">
                {techStackItems.map((item) => (
                  <Link key={item.title} href={item.href} className="block text-gray-300 hover:text-white">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">Careers</h3>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              <div className="pl-4 space-y-2">
                {joinTeamItems.map((item) => (
                  <Link key={item.title} href={item.href} className="block text-gray-300 hover:text-white">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/what-we-do" className="block text-white font-medium">
              What We Do
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
