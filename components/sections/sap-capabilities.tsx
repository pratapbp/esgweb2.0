"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Database,
  BarChart,
  Truck,
  Lightbulb,
  LineChart,
  ArrowRight,
  Check,
  Zap,
  Server,
  Layers,
  Settings,
  Users,
} from "lucide-react"
import WaterDropButton from "@/components/ui/water-drop-button"

// Define the workflow steps
const workflowSteps = [
  {
    id: "data-integration",
    title: "Data Integration",
    icon: <Database className="h-6 w-6" />,
    description: "Connect and harmonize data from multiple sources across your enterprise",
    color: "from-blue-400 to-blue-600",
    details: [
      "Real-time data synchronization",
      "Automated data cleansing",
      "Cross-system data mapping",
      "Legacy system integration",
    ],
  },
  {
    id: "process-automation",
    title: "Process Automation",
    icon: <Settings className="h-6 w-6" />,
    description: "Streamline operations with intelligent automation of business processes",
    color: "from-purple-400 to-purple-600",
    details: ["Workflow orchestration", "Business rule automation", "Exception handling", "Process monitoring"],
  },
  {
    id: "analytics-insights",
    title: "Analytics & Insights",
    icon: <BarChart className="h-6 w-6" />,
    description: "Transform data into actionable insights with advanced analytics",
    color: "from-green-400 to-green-600",
    details: ["Predictive analytics", "Real-time dashboards", "KPI monitoring", "Custom reporting"],
  },
  {
    id: "optimization",
    title: "Optimization",
    icon: <Zap className="h-6 w-6" />,
    description: "Continuously improve performance with AI-driven optimization",
    color: "from-yellow-400 to-yellow-600",
    details: ["Resource allocation", "Cost optimization", "Performance tuning", "Capacity planning"],
  },
  {
    id: "user-experience",
    title: "User Experience",
    icon: <Users className="h-6 w-6" />,
    description: "Deliver intuitive interfaces for enhanced user productivity",
    color: "from-red-400 to-red-600",
    details: ["Personalized dashboards", "Mobile accessibility", "Role-based views", "Intuitive navigation"],
  },
]

// SAP solutions we offer
const sapSolutions = [
  {
    title: "SAP S/4HANA",
    description: "Next-generation ERP system with simplified data model and AI-powered processes",
    icon: <Server className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "SAP BW/4HANA",
    description: "Modern data warehousing solution for advanced analytics and reporting",
    icon: <BarChart className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "SAP IBP",
    description: "Integrated business planning for supply chain optimization and forecasting",
    icon: <Truck className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "SAP Fiori",
    description: "User experience design system for intuitive, responsive applications",
    icon: <Lightbulb className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "SAP Analytics Cloud",
    description: "Cloud-based analytics combining BI, planning, and predictive capabilities",
    icon: <LineChart className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "SAP Integration Suite",
    description: "Comprehensive integration platform for connecting systems and processes",
    icon: <Layers className="h-10 w-10 text-blue-500" />,
  },
]

export default function SapCapabilities() {
  const [activeStep, setActiveStep] = useState<string>("data-integration")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  // Handle intersection observer to trigger animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          controls.start("visible")
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [controls])

  // Auto-advance through workflow steps
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      const currentIndex = workflowSteps.findIndex((step) => step.id === activeStep)
      const nextIndex = (currentIndex + 1) % workflowSteps.length
      setActiveStep(workflowSteps[nextIndex].id)
    }, 5000)

    return () => clearInterval(interval)
  }, [activeStep, isVisible])

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our SAP{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                Capabilities
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transforming enterprises with cutting-edge SAP solutions powered by intelligent automation
            </p>
          </motion.div>
        </div>

        {/* Workflow Engine Visualization */}
        <div className="mb-20">
          <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-8 border border-gray-800 shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-center">SAP Intelligent Workflow Engine</h3>

            {/* Workflow Steps */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-12">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`relative cursor-pointer ${index < workflowSteps.length - 1 ? "workflow-step" : ""}`}
                  onClick={() => setActiveStep(step.id)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`p-4 rounded-lg ${
                      activeStep === step.id
                        ? `bg-gradient-to-r ${step.color} text-white`
                        : "bg-gray-800/50 hover:bg-gray-800"
                    } transition-all duration-300`}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`mr-3 ${activeStep === step.id ? "text-white" : "text-blue-400"}`}>
                        {step.icon}
                      </div>
                      <h4 className="font-bold">{step.title}</h4>
                    </div>
                    <p className="text-sm">{step.description}</p>
                  </div>

                  {/* Connector line for desktop */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-0.5 bg-blue-500 z-10"></div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Active Step Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
              >
                {workflowSteps.map(
                  (step) =>
                    step.id === activeStep && (
                      <div key={step.id}>
                        <h4 className="text-xl font-bold mb-4 flex items-center">
                          <div className={`mr-3 bg-gradient-to-r ${step.color} p-2 rounded-full`}>{step.icon}</div>
                          {step.title}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-gray-300 mb-4">{step.description}</p>
                            <ul className="space-y-2">
                              {step.details.map((detail, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start"
                                >
                                  <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                                  <span>{detail}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div className="relative h-48 md:h-full min-h-[200px] rounded-lg overflow-hidden">
                            <Image
                              src={`/images/sap-workflow/${step.id}.jpg`}
                              alt={step.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                          </div>
                        </div>
                      </div>
                    ),
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* SAP Solutions Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Our SAP Solutions</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sapSolutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.1 },
                  },
                }}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-blue-900/50 transition-all duration-300 group"
              >
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/20 group-hover:bg-blue-900/30 transition-colors duration-300">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                  {solution.title}
                </h3>
                <p className="text-gray-400">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
          }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to transform your SAP landscape?</h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Let our experts help you leverage the full potential of your SAP investments
          </p>
          <WaterDropButton className="bg-blue-600 hover:bg-blue-700">
            Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </WaterDropButton>
        </motion.div>
      </div>

      {/* Custom CSS for workflow steps on mobile */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .workflow-step::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: -12px;
            transform: translateX(-50%);
            width: 0; 
            height: 0; 
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid #3b82f6;
          }
        }
      `}</style>
    </section>
  )
}
