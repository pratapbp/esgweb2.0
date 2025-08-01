"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Factory,
  Heart,
  CreditCard,
  ShoppingCart,
  Car,
  Plane,
  Zap,
  Smartphone,
  Pill,
  Package,
  Monitor,
  Film,
  Truck,
  Building,
  GraduationCap,
  Building2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const industries = [
  {
    name: "Manufacturing",
    href: "/industries/manufacturing",
    icon: Factory,
    description: "Smart manufacturing solutions with IoT integration and predictive maintenance",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    featured: true,
    solutions: ["Smart Factory", "Predictive Maintenance", "Quality Control"],
  },
  {
    name: "Healthcare",
    href: "/industries/healthcare",
    icon: Heart,
    description: "Digital health platforms and patient management systems",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    featured: true,
    solutions: ["Patient Management", "Telemedicine", "Health Analytics"],
  },
  {
    name: "Financial Services",
    href: "/industries/financial-services",
    icon: CreditCard,
    description: "Comprehensive financial solutions including banking, insurance, and fintech",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    featured: true,
    solutions: ["Digital Banking", "Risk Management", "Compliance"],
  },
  {
    name: "Retail",
    href: "/industries/retail",
    icon: ShoppingCart,
    description: "E-commerce platforms and omnichannel retail solutions",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    solutions: ["E-commerce", "Inventory Management", "Customer Analytics"],
  },
  {
    name: "Automotive",
    href: "/industries/automotive",
    icon: Car,
    description: "Electric vehicles, autonomous driving, and connected car technologies",
    color: "from-gray-500 to-slate-600",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/20",
    solutions: ["Electric Vehicles", "Autonomous Driving", "Connected Cars"],
  },
  {
    name: "Aerospace & Defense",
    href: "/industries/aerospace-defense",
    icon: Plane,
    description: "Mission-critical systems and defense technology solutions",
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    solutions: ["Mission Systems", "Security", "Compliance"],
  },
  {
    name: "Energy & Utilities",
    href: "/industries/energy-utilities",
    icon: Zap,
    description: "Smart grid solutions and renewable energy management",
    color: "from-yellow-500 to-orange-600",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    solutions: ["Smart Grid", "Energy Management", "Sustainability"],
  },
  {
    name: "Telecommunications",
    href: "/industries/telecommunications",
    icon: Smartphone,
    description: "5G infrastructure and network optimization solutions",
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
    solutions: ["5G Networks", "Network Optimization", "IoT Connectivity"],
  },
  {
    name: "Pharmaceuticals",
    href: "/industries/pharma",
    icon: Pill,
    description: "Drug discovery platforms and regulatory compliance systems",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    solutions: ["Drug Discovery", "Clinical Trials", "Regulatory Compliance"],
  },
  {
    name: "Consumer Goods",
    href: "/industries/consumer-goods",
    icon: Package,
    description: "Product development, supply chain optimization, and omnichannel retail",
    color: "from-amber-500 to-yellow-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    solutions: ["Product Development", "Supply Chain", "Omnichannel"],
  },
  {
    name: "Technology",
   href: "/industries/technology",
    icon: Monitor,
    description: "AI development, cloud infrastructure, and cybersecurity solutions",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
    solutions: ["AI Development", "Cloud Infrastructure", "Cybersecurity"],
  },
  {
    name: "Media & Entertainment",
    href: "/industries/media-entertainment",
    icon: Film,
    description: "Content creation, digital distribution, and immersive experiences",
    color: "from-fuchsia-500 to-pink-600",
    bgColor: "bg-fuchsia-500/10",
    borderColor: "border-fuchsia-500/20",
    solutions: ["Content Creation", "Digital Distribution", "Immersive Tech"],
  },
  {
    name: "Transportation & Logistics",
    href: "/industries/logistics",
    icon: Truck,
    description: "Fleet management, supply chain optimization, and autonomous delivery",
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    solutions: ["Fleet Management", "Supply Chain", "Autonomous Delivery"],
  },
  {
    name: "Construction",
    href: "/industries/construction",
    icon: Building,
    description: "BIM technology, project management, and sustainable building practices",
    color: "from-stone-500 to-gray-600",
    bgColor: "bg-stone-500/10",
    borderColor: "border-stone-500/20",
    solutions: ["BIM Technology", "Project Management", "Sustainable Building"],
  },
  {
    name: "Education",
    href: "/industries/education",
    icon: GraduationCap,
    description: "Learning management systems and educational technology",
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/20",
    solutions: ["LMS", "Virtual Classrooms", "Student Analytics"],
  },
  {
    name: "Public Sector",
    href: "/industries/public-sector",
    icon: Building2,
    description: "Government solutions and citizen service platforms",
    color: "from-slate-500 to-gray-600",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/20",
    solutions: ["Citizen Services", "Digital Government", "Compliance"],
  },
]

export default function IndustriesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {industries.map((industry, index) => (
        <motion.div
          key={industry.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={industry.href}>
            <Card
              className={`group hover:shadow-2xl transition-all duration-300 border-2 ${industry.borderColor} ${industry.bgColor} hover:scale-105 cursor-pointer h-full`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${industry.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <industry.icon className="h-6 w-6 text-white" />
                  </div>
                  {industry.featured && (
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {industry.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-300 mb-4 line-clamp-2">{industry.description}</CardDescription>
                <div className="flex flex-wrap gap-1">
                  {industry.solutions.slice(0, 2).map((solution) => (
                    <Badge
                      key={solution}
                      variant="outline"
                      className="text-xs border-gray-600 text-gray-400 hover:border-blue-500/50 hover:text-blue-400 transition-colors duration-200"
                    >
                      {solution}
                    </Badge>
                  ))}
                  {industry.solutions.length > 2 && (
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                      +{industry.solutions.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
