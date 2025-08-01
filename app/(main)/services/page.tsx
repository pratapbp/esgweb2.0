"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Database,
  BarChart3,
  TrendingUp,
  Banknote,
  Rocket,
  Brain,
  Cloud,
  Shield,
  Users,
  Sparkles,
  Check,
  Star,
  Award,
  Target,
  Zap,
  Globe,
  Building,
  Factory,
  ShoppingCart,
  Heart,
  GraduationCap,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import WaterDropButton from "@/components/ui/water-drop-button"

// Services data with comprehensive information
const servicesData = [
  {
    id: "sap-enterprise-solutions",
    category: "SAP Solutions",
    title: "SAP Enterprise Solutions",
    description: "Transform your business with intelligent ERP powered by S/4HANA, RISE, and BTP",
    longDescription:
      "Comprehensive SAP implementation and modernization services including S/4HANA migration, SAP RISE adoption, and Business Technology Platform integration.",
    href: "/services/sap-enterprise-solutions",
    icon: <Database className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-500",
    badge: "Most Popular",
    features: [
      "S/4HANA Implementation & Migration",
      "SAP RISE & BTP Adoption",
      "SAP Fiori & UX Modernization",
      "Custom Development & Integration",
    ],
    benefits: ["40% faster implementation", "99% system uptime", "60% reduction in TCO", "Real-time business insights"],
    industries: ["Manufacturing", "Retail", "BFSI", "Healthcare"],
    image: "/images/services/enterprise.jpg",
  },
  {
    id: "sap-data-ai-analytics",
    category: "SAP Solutions",
    title: "SAP Data & AI Analytics",
    description: "Transform data into actionable insights with AI-powered analytics and predictive modeling",
    longDescription:
      "Advanced analytics solutions leveraging SAP Analytics Cloud, machine learning, and AI to drive data-driven decision making.",
    href: "/services/sap-data-ai-analytics",
    icon: <BarChart3 className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500",
    badge: "AI-Powered",
    features: [
      "Predictive Analytics & Forecasting",
      "Real-time Dashboards & Reporting",
      "Machine Learning Models",
      "Data Integration & Harmonization",
    ],
    benefits: ["95% forecast accuracy", "70% faster reporting", "Real-time insights", "Automated analytics"],
    industries: ["All Industries"],
    image: "/images/services/data-ai.jpg",
  },
  {
    id: "sap-supply-chain",
    category: "SAP Solutions",
    title: "SAP Supply Chain & Procurement",
    description: "Optimize end-to-end supply chain operations with intelligent automation and visibility",
    longDescription:
      "Complete supply chain transformation including procurement optimization, logistics management, and supplier collaboration.",
    href: "/services/sap-supply-chain-procurement",
    icon: <TrendingUp className="h-8 w-8" />,
    color: "from-green-500 to-teal-500",
    badge: "ROI Focused",
    features: [
      "Supply Chain Planning & Optimization",
      "Procurement & Sourcing",
      "Logistics & Transportation",
      "Supplier Collaboration",
    ],
    benefits: ["30% cost reduction", "50% faster procurement", "99% delivery accuracy", "Real-time visibility"],
    industries: ["Manufacturing", "Retail", "Automotive"],
    image: "/images/services/supply-chain.jpg",
  },
  {
    id: "sap-brim",
    category: "SAP Solutions",
    title: "SAP BRIM",
    description: "Streamline billing and revenue management with intelligent subscription and usage-based models",
    longDescription:
      "Comprehensive billing and revenue innovation management for subscription-based and usage-based business models.",
    href: "/services/sap-brim",
    icon: <Banknote className="h-8 w-8" />,
    color: "from-yellow-500 to-orange-500",
    badge: "Revenue Growth",
    features: ["Subscription Management", "Usage-based Billing", "Revenue Recognition", "Contract Management"],
    benefits: [
      "90% billing accuracy",
      "50% faster invoicing",
      "Automated revenue recognition",
      "Flexible pricing models",
    ],
    industries: ["Telecommunications", "SaaS", "Utilities"],
    image: "/images/services/revbrim.jpg",
  },
  {
    id: "sap-technology",
    category: "SAP Solutions",
    title: "SAP Technology & Innovation",
    description: "Leverage cutting-edge SAP technologies including BTP, Fiori, and emerging innovations",
    longDescription:
      "Advanced SAP technology services including Business Technology Platform, Fiori development, and integration with emerging technologies.",
    href: "/services/sap-technology-innovation",
    icon: <Rocket className="h-8 w-8" />,
    color: "from-indigo-500 to-purple-500",
    badge: "Innovation",
    features: ["SAP BTP Development", "Fiori App Development", "Integration Suite", "Emerging Technologies"],
    benefits: ["Faster development", "Modern user experience", "Seamless integration", "Future-ready platform"],
    industries: ["All Industries"],
    image: "/images/services/technology.jpg",
  },
  {
    id: "digital-ai-solutions",
    category: "Digital & AI",
    title: "Digital & AI Solutions",
    description: "Custom AI models, automation, and digital transformation solutions powered by generative AI",
    longDescription:
      "Comprehensive digital transformation services including custom AI development, intelligent automation, and generative AI solutions.",
    href: "/services/digital-ai-solutions",
    icon: <Brain className="h-8 w-8" />,
    color: "from-cyan-500 to-blue-500",
    badge: "GenAI",
    features: [
      "Custom AI Model Development",
      "Generative AI Solutions",
      "Intelligent Process Automation",
      "Digital Transformation Strategy",
    ],
    benefits: ["340+ AI workflows deployed", "98.7% accuracy rate", "70% process automation", "Rapid ROI realization"],
    industries: ["All Industries"],
    image: "/images/services/digital-ai.jpg",
  },
  {
    id: "cloud-solutions",
    category: "Digital & AI",
    title: "Cloud Solutions",
    description: "Multi-cloud strategy, migration, and management across AWS, Azure, and GCP platforms",
    longDescription:
      "Complete cloud transformation services including strategy, migration, and ongoing management across multiple cloud platforms.",
    href: "/services/cloud-solutions",
    icon: <Cloud className="h-8 w-8" />,
    color: "from-sky-500 to-cyan-500",
    badge: "Multi-Cloud",
    features: [
      "Cloud Strategy & Assessment",
      "Migration & Modernization",
      "Multi-cloud Management",
      "DevOps & Automation",
    ],
    benefits: ["40% cost reduction", "99.9% uptime", "Scalable infrastructure", "Enhanced security"],
    industries: ["All Industries"],
    image: "/images/services/cloud.jpg",
  },
  {
    id: "cybersecurity",
    category: "Digital & AI",
    title: "Cybersecurity Services",
    description: "AI-powered security solutions including threat detection, compliance, and risk management",
    longDescription:
      "Comprehensive cybersecurity services leveraging AI for threat detection, compliance management, and risk mitigation.",
    href: "/services/cybersecurity-services",
    icon: <Shield className="h-8 w-8" />,
    color: "from-red-500 to-pink-500",
    badge: "AI-Secured",
    features: [
      "AI-powered Threat Detection",
      "Security Operations Center",
      "Compliance Management",
      "Risk Assessment & Mitigation",
    ],
    benefits: ["99.9% threat detection", "24/7 monitoring", "Automated response", "Regulatory compliance"],
    industries: ["BFSI", "Healthcare", "Government"],
    image: "/images/services/cybersecurity.jpg",
  },
  {
    id: "staffing-solutions",
    category: "Digital & AI",
    title: "Staffing Solutions",
    description: "H1B visa processing, talent placement, and AI-enhanced recruitment services",
    longDescription:
      "Comprehensive staffing services including H1B visa processing, talent acquisition, and AI-powered recruitment solutions.",
    href: "/services/staffing-solutions",
    icon: <Users className="h-8 w-8" />,
    color: "from-emerald-500 to-green-500",
    badge: "Talent Focus",
    features: [
      "H1B Visa Processing",
      "AI-enhanced Recruitment",
      "Talent Pipeline Management",
      "Managed Staffing Services",
    ],
    benefits: [
      "95% placement success",
      "1,250+ consultants placed",
      "Faster hiring process",
      "Quality talent matching",
    ],
    industries: ["Technology", "Consulting", "Healthcare"],
    image: "/images/services/staffing.png",
  },
]

// Industry icons mapping
const industryIcons = {
  Manufacturing: <Factory className="h-4 w-4" />,
  Retail: <ShoppingCart className="h-4 w-4" />,
  BFSI: <Banknote className="h-4 w-4" />,
  Healthcare: <Heart className="h-4 w-4" />,
  Technology: <Rocket className="h-4 w-4" />,
  Telecommunications: <Globe className="h-4 w-4" />,
  SaaS: <Cloud className="h-4 w-4" />,
  Utilities: <Zap className="h-4 w-4" />,
  Automotive: <Building className="h-4 w-4" />,
  Government: <Building className="h-4 w-4" />,
  Consulting: <Users className="h-4 w-4" />,
  Education: <GraduationCap className="h-4 w-4" />,
  "All Industries": <Globe className="h-4 w-4" />,
}

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const categories = ["all", "SAP Solutions", "Digital & AI"]

  const filteredServices =
    selectedCategory === "all" ? servicesData : servicesData.filter((service) => service.category === selectedCategory)

  const handleImageError = (serviceId: string) => {
    setImageErrors((prev) => ({ ...prev, [serviceId]: true }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-midnight-blue via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-cyan to-neural-violet blur-3xl animate-pulse"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-block mb-6">
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm border-electric-cyan text-electric-cyan bg-electric-cyan/10"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Comprehensive Service Portfolio
              </Badge>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold mb-6 text-luminous-white">
              Transform Your Business with{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neural-violet bg-clip-text text-transparent">
                AI-Powered Solutions
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              From SAP enterprise solutions to cutting-edge AI implementations, we deliver comprehensive digital
              transformation services that drive measurable results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
              <WaterDropButton className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue min-w-[220px] text-lg py-4">
                Explore Services <ArrowRight className="ml-2 h-5 w-5" />
              </WaterDropButton>
              <Button
                variant="outline"
                className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 min-w-[220px] text-lg py-4 bg-transparent"
              >
                Schedule Consultation <Target className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-luminous-white">
              Our{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neural-violet bg-clip-text text-transparent">
                Service Categories
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Choose from our comprehensive portfolio of services designed to accelerate your digital transformation
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? "bg-electric-cyan text-midnight-blue"
                      : "border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/10"
                  }`}
                >
                  {category === "all" ? "All Services" : category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <Card className="h-full bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-electric-cyan/50 transition-all duration-300 group-hover:scale-105 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    {!imageErrors[service.id] ? (
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={`${service.title} - Professional service illustration`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 6}
                        quality={85}
                        onError={() => handleImageError(service.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <div className="text-center">
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} p-4 mx-auto mb-2`}>
                            <div className="text-white">{service.icon}</div>
                          </div>
                          <p className="text-gray-400 text-sm">{service.title}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className="bg-electric-cyan/20 text-electric-cyan border-electric-cyan/30 backdrop-blur-sm"
                      >
                        {service.category}
                      </Badge>
                      {service.badge && (
                        <Badge
                          variant="secondary"
                          className="bg-success-green/20 text-success-green border-success-green/30 backdrop-blur-sm"
                        >
                          {service.badge}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <div className="text-white">{service.icon}</div>
                    </div>
                    <CardTitle className="text-xl text-luminous-white group-hover:text-electric-cyan transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-electric-cyan mb-3 flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-success-green mt-2 mr-3 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-neural-violet mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-2" />
                        Key Benefits:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {service.benefits.slice(0, 2).map((benefit, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs border-neural-violet/30 text-neural-violet bg-neural-violet/5"
                          >
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Industries */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-electric-cyan mb-2 flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Industries:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {service.industries.slice(0, 3).map((industry, i) => (
                          <div
                            key={i}
                            className="flex items-center text-xs text-gray-400 bg-gray-800/50 rounded-full px-2 py-1 border border-gray-700/50"
                          >
                            {industryIcons[industry as keyof typeof industryIcons]}
                            <span className="ml-1">{industry}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link href={service.href} className="block">
                      <Button className="w-full bg-gradient-to-r from-electric-cyan/20 to-neural-violet/20 border border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan/10 hover:border-electric-cyan/50 transition-all duration-300 group/btn">
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Benefits Overview */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-luminous-white">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neural-violet bg-clip-text text-transparent">
                ESG Services
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive approach delivers measurable results and accelerates your digital transformation journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="h-8 w-8" />,
                title: "Proven Results",
                description: "340+ successful AI implementations with 98.7% accuracy rate",
                metric: "340+ Projects",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Rapid Deployment",
                description: "50% faster implementation using our AI-powered accelerators",
                metric: "50% Faster",
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "ROI Focused",
                description: "Average 6-month ROI with guaranteed performance metrics",
                metric: "6-Month ROI",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Global Expertise",
                description: "1,250+ consultants placed across multiple industries",
                metric: "1,250+ Experts",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <Card className="h-full bg-gray-900/50 backdrop-blur-md border-gray-800 hover:border-electric-cyan/50 transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-8">
                    <div className="text-electric-cyan mb-4 group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-luminous-white mb-2 group-hover:text-electric-cyan transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{benefit.description}</p>
                    <Badge variant="outline" className="border-success-green text-success-green">
                      {benefit.metric}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-electric-cyan/10 to-neural-violet/10 border-electric-cyan/30 backdrop-blur-md">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-luminous-white">
                  Ready to Transform Your{" "}
                  <span className="bg-gradient-to-r from-electric-cyan to-neural-violet bg-clip-text text-transparent">
                    Business?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Let's discuss how our AI-powered solutions can accelerate your digital transformation and deliver
                  measurable business results.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link href="/contact">
                    <WaterDropButton className="bg-gradient-to-r from-electric-cyan to-neural-violet text-midnight-blue min-w-[220px] text-lg py-4">
                      Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                    </WaterDropButton>
                  </Link>
                  <Link href="/case-studies">
                    <Button
                      variant="outline"
                      className="border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 min-w-[220px] text-lg py-4 bg-transparent"
                    >
                      View Success Stories <Star className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-electric-cyan/20">
                  <p className="text-gray-400 text-sm">
                    Join 500+ companies that have transformed their operations with ESG's AI-powered solutions
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
