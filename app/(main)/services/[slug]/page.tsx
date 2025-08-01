"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import FluidBackground from "@/components/backgrounds/fluid-background"
import { Database, BarChart, Truck, Lightbulb, LineChart, Brain, Cloud, Shield, Users, ArrowLeft } from "lucide-react"

interface ServicePageProps {
  params: {
    slug: string
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const services = [
    {
      title: "SAP Enterprise Solutions",
      description: "End-to-end SAP implementation and optimization services tailored to your business needs.",
      icon: <Database className="h-10 w-10 text-blue-500" />,
      slug: "sap-enterprise-solutions",
      image: "/images/services/enterprise.jpg",
      longDescription: `
        Our SAP Enterprise Solutions provide comprehensive implementation, optimization, and support services for businesses looking to leverage the full potential of SAP technologies. With deep expertise in SAP S/4HANA, SAP ERP, and other SAP solutions, we help organizations streamline operations, enhance efficiency, and drive digital transformation.
        
        Our team of certified SAP consultants works closely with clients to understand their unique business requirements and develop tailored solutions that address specific challenges and opportunities. From initial assessment and planning to implementation, testing, and ongoing support, we provide end-to-end services to ensure successful SAP deployments.
      `,
      benefits: [
        "Streamlined business processes and improved operational efficiency",
        "Enhanced data visibility and real-time insights for better decision-making",
        "Reduced operational costs through automation and optimization",
        "Improved customer experience through integrated systems and processes",
        "Scalable solutions that grow with your business",
        "Seamless integration with existing systems and technologies",
      ],
    },
    {
      title: "SAP Data & AI Analytics",
      description: "Transform your data into actionable insights with our advanced analytics solutions.",
      icon: <BarChart className="h-10 w-10 text-blue-500" />,
      slug: "sap-data-ai-analytics",
      image: "/images/services/data-ai.jpg",
      longDescription: `
        Our SAP Data & AI Analytics services help organizations harness the power of their data to drive better business outcomes. By combining SAP's advanced analytics capabilities with cutting-edge AI technologies, we enable businesses to extract valuable insights from their data and make data-driven decisions.
        
        From data strategy and architecture to implementation and optimization, our team of data scientists and SAP experts works with clients to develop comprehensive analytics solutions that address specific business challenges. We leverage SAP Analytics Cloud, SAP Data Intelligence, and other SAP tools to deliver powerful analytics capabilities that drive business value.
      `,
      benefits: [
        "Real-time insights and predictive analytics for better decision-making",
        "Enhanced data quality and governance",
        "Improved operational efficiency through data-driven process optimization",
        "Personalized customer experiences through advanced analytics",
        "Fraud detection and risk management through AI-powered analytics",
        "Scalable analytics solutions that grow with your business",
      ],
    },
    {
      title: "SAP Supply Chain & Procurement",
      description: "Optimize your supply chain operations with intelligent SAP solutions.",
      icon: <Truck className="h-10 w-10 text-blue-500" />,
      slug: "sap-supply-chain-procurement",
      image: "/images/services/supply-chain.jpg",
      longDescription: `
        Our SAP Supply Chain & Procurement services help organizations optimize their supply chain operations and procurement processes. By leveraging SAP's advanced supply chain management and procurement solutions, we enable businesses to enhance efficiency, reduce costs, and improve customer satisfaction.
        
        From demand planning and inventory management to procurement and supplier collaboration, our team of SAP experts works with clients to develop comprehensive supply chain solutions that address specific business challenges. We leverage SAP Integrated Business Planning, SAP Ariba, and other SAP tools to deliver powerful supply chain capabilities that drive business value.
      `,
      benefits: [
        "Enhanced supply chain visibility and transparency",
        "Improved demand forecasting and inventory management",
        "Streamlined procurement processes and reduced procurement costs",
        "Better supplier collaboration and relationship management",
        "Reduced supply chain risks through advanced analytics",
        "Improved customer satisfaction through better delivery performance",
      ],
    },
    {
      title: "SAP Technology & Innovation",
      description: "Leverage cutting-edge SAP technologies to drive innovation in your organization.",
      icon: <Lightbulb className="h-10 w-10 text-blue-500" />,
      slug: "sap-technology-innovation",
      image: "/images/services/technology.jpg",
      longDescription: `
        Our SAP Technology & Innovation services help organizations leverage cutting-edge SAP technologies to drive innovation and digital transformation. By combining SAP's advanced technology stack with our expertise in emerging technologies, we enable businesses to stay ahead of the curve and gain a competitive edge.
        
        From SAP S/4HANA and SAP Cloud Platform to SAP Leonardo and SAP HANA, our team of SAP experts works with clients to develop innovative solutions that address specific business challenges. We leverage SAP's latest technologies to deliver powerful capabilities that drive business value and enable digital transformation.
      `,
      benefits: [
        "Accelerated digital transformation through innovative SAP technologies",
        "Enhanced business agility and flexibility",
        "Improved user experience through modern interfaces and mobile capabilities",
        "Reduced IT complexity and costs through cloud-based solutions",
        "Faster time-to-market for new products and services",
        "Competitive advantage through innovative business models and processes",
      ],
    },
    {
      title: "SAP RevBRIM",
      description: "Maximize revenue and billing management with specialized SAP solutions.",
      icon: <LineChart className="h-10 w-10 text-blue-500" />,
      slug: "sap-revbrim",
      image: "/images/services/revbrim.jpg",
      longDescription: `
        Our SAP RevBRIM (Revenue, Billing, and Incentive Management) services help organizations optimize their revenue management, billing processes, and incentive programs. By leveraging SAP's advanced revenue management solutions, we enable businesses to enhance revenue streams, improve billing accuracy, and optimize incentive programs.
        
        From revenue recognition and billing to commissions and rebates, our team of SAP experts works with clients to develop comprehensive revenue management solutions that address specific business challenges. We leverage SAP Revenue Accounting and Reporting, SAP Billing and Revenue Innovation Management, and other SAP tools to deliver powerful revenue management capabilities that drive business value.
      `,
      benefits: [
        "Enhanced revenue recognition and compliance with accounting standards",
        "Improved billing accuracy and efficiency",
        "Optimized incentive programs and commission calculations",
        "Better visibility into revenue streams and profitability",
        "Reduced revenue leakage through improved processes",
        "Scalable revenue management solutions that grow with your business",
      ],
    },
    {
      title: "Digital & AI Solutions",
      description: "Harness the power of AI and digital technologies to transform your business processes.",
      icon: <Brain className="h-10 w-10 text-blue-500" />,
      slug: "digital-ai-solutions",
      image: "/images/services/digital-ai.jpg",
      longDescription: `
        Our Digital & AI Solutions help organizations harness the power of artificial intelligence and digital technologies to transform their business processes and drive innovation. By combining cutting-edge AI technologies with our expertise in digital transformation, we enable businesses to enhance efficiency, improve customer experiences, and gain a competitive edge.
        
        From machine learning and natural language processing to robotic process automation and computer vision, our team of AI experts works with clients to develop innovative solutions that address specific business challenges. We leverage the latest AI technologies and frameworks to deliver powerful capabilities that drive business value.
      `,
      benefits: [
        "Enhanced operational efficiency through automation and AI-powered processes",
        "Improved customer experiences through personalization and intelligent interactions",
        "Better decision-making through advanced analytics and predictive insights",
        "Reduced costs through process optimization and automation",
        "New revenue streams through innovative AI-powered products and services",
        "Competitive advantage through cutting-edge digital capabilities",
      ],
    },
    {
      title: "Cloud Solutions",
      description: "Seamlessly migrate and optimize your operations in the cloud environment.",
      icon: <Cloud className="h-10 w-10 text-blue-500" />,
      slug: "cloud-solutions",
      image: "/images/services/cloud.jpg",
      longDescription: `
        Our Cloud Solutions help organizations seamlessly migrate and optimize their operations in the cloud environment. By leveraging leading cloud platforms and our expertise in cloud architecture, we enable businesses to enhance scalability, improve flexibility, and reduce IT costs.
        
        From cloud strategy and assessment to migration, implementation, and ongoing management, our team of cloud experts works with clients to develop comprehensive cloud solutions that address specific business challenges. We leverage AWS, Microsoft Azure, Google Cloud Platform, and other cloud technologies to deliver powerful cloud capabilities that drive business value.
      `,
      benefits: [
        "Enhanced scalability and flexibility to meet changing business needs",
        "Reduced IT infrastructure costs through pay-as-you-go models",
        "Improved business continuity and disaster recovery capabilities",
        "Faster time-to-market for new applications and services",
        "Better collaboration and productivity through cloud-based tools",
        "Enhanced security and compliance through advanced cloud security features",
      ],
    },
    {
      title: "Cybersecurity Services",
      description: "Protect your digital assets with our comprehensive security solutions.",
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      slug: "cybersecurity-services",
      image: "/images/services/cybersecurity.jpg",
      longDescription: `
        Our Cybersecurity Services help organizations protect their digital assets and sensitive information from cyber threats. By combining advanced security technologies with our expertise in cybersecurity, we enable businesses to enhance their security posture, reduce risks, and ensure compliance with regulatory requirements.
        
        From security assessments and strategy to implementation, monitoring, and incident response, our team of cybersecurity experts works with clients to develop comprehensive security solutions that address specific business challenges. We leverage the latest security technologies and frameworks to deliver powerful security capabilities that protect business value.
      `,
      benefits: [
        "Enhanced protection against cyber threats and data breaches",
        "Improved compliance with regulatory requirements and industry standards",
        "Reduced security risks through proactive threat detection and prevention",
        "Better visibility into security posture and vulnerabilities",
        "Faster incident response and recovery capabilities",
        "Peace of mind through comprehensive security coverage",
      ],
    },
    {
      title: "Staffing Solutions",
      description: "Access top talent and expertise to drive your technology initiatives forward.",
      icon: <Users className="h-10 w-10 text-blue-500" />,
      slug: "staffing-solutions",
      image: "/interconnected-talent-network.png",
      longDescription: `
        Our Staffing Solutions help organizations access top talent and expertise to drive their technology initiatives forward. By leveraging our extensive network of skilled professionals and our expertise in talent acquisition, we enable businesses to fill critical roles, enhance their capabilities, and accelerate their digital transformation journey.
        
        From temporary staffing and contract-to-hire to permanent placement and managed services, our team of staffing experts works with clients to develop comprehensive staffing solutions that address specific business challenges. We leverage our deep understanding of technology roles and requirements to deliver the right talent at the right time.
      `,
      benefits: [
        "Access to skilled professionals with specialized expertise",
        "Reduced time-to-hire and recruitment costs",
        "Flexibility to scale resources up or down based on project needs",
        "Enhanced project delivery through experienced professionals",
        "Knowledge transfer from external experts to internal teams",
        "Competitive advantage through access to top talent",
      ],
    },
  ]

  const service = services.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Fluid Background */}
      <FluidBackground />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="mb-4">{service.icon}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
              <p className="text-xl text-foreground/80 mb-8">{service.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden">
                <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg mb-12"
            >
              {/* Water drop effect */}
              <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                }}
              />

              <h2 className="text-2xl font-bold mb-6">Overview</h2>
              <div className="text-foreground/80 space-y-4">
                {service.longDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg"
            >
              {/* Water drop effect */}
              <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  delay: 1,
                }}
              />

              <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
              <ul className="text-foreground/80 space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1 text-blue-500">•</div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          <button className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600 dark:text-blue-400"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                1
              </span>
            </div>
          </button>
          <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg">
            Chat with us 👋
          </div>
        </div>
      </div>
    </div>
  )
}
