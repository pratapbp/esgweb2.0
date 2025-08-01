"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FluidBackground from "@/components/backgrounds/fluid-background"
import SAPServiceCard from "@/components/about/sap-service-card"
import CompanyTimeline from "@/components/about/company-timeline"
import TeamSection from "@/components/about/team-section"
import ValuesSection from "@/components/about/values-section"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "sap-services", label: "SAP Services" },
    { id: "sap-staffing", label: "SAP Staffing" },
    { id: "timeline", label: "Our Journey" },
   // { id: "team", label: "Leadership" },
    { id: "values", label: "Values" },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Fluid Background */}
      <FluidBackground />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Pioneering the Future with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                SAP Solutions
              </span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              ESG is at the forefront of SAP innovation, leveraging cutting-edge technologies to transform businesses
              and drive sustainable growth in the digital era.
            </p>
          </motion.div>

          {/* Tabs Navigation */}
          <div className="flex justify-center mt-12 mb-16 overflow-x-auto">
            <div className="inline-flex p-1 rounded-full bg-muted/30 backdrop-blur-md">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === "overview" && (
                <div className="max-w-4xl mx-auto">
                  <div className="relative p-8 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg mb-12">
                    {/* Reflective highlight */}
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full transform rotate-45"></div>

                    <h2 className="text-2xl font-bold mb-4">About ESG</h2>
                    <p className="text-foreground/80 mb-4">
                      ESG is a robust and dynamic company offering a wide range of SAP services and IT solutions. We
                      leverage cutting-edge technology to build future-ready solutions, focusing on SAP, Cloud, and
                      Enterprise IT services.
                    </p>
                    <p className="text-foreground/80 mb-4">
                      Our expertise in SAP ensures seamless business transformation, helping enterprises thrive in the
                      digital era. With a team of certified SAP consultants and implementation specialists, we deliver
                      end-to-end SAP services across the entire ecosystem. From S/4HANA migrations to custom SAP
                      development, our SAP practice offers comprehensive solutions tailored to your business needs.
                    </p>
                    <p className="text-foreground/80">
                      At ESG, we believe in the power of technology to transform businesses and create sustainable
                      value. Our approach combines deep industry knowledge with technical expertise to deliver solutions
                      that address the unique challenges of our clients.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="relative p-6 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg h-full">
                      {/* Water drop effect */}
                      <motion.div
                        className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
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

                      <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                      <p className="text-foreground/80">
                        Our vision is to be the premier SAP services provider, empowering businesses with innovative
                        technology solutions that drive growth, efficiency, and long-term success in a rapidly evolving
                        digital landscape.
                      </p>
                    </div>

                    <div className="relative p-6 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg h-full">
                      {/* Water drop effect */}
                      <motion.div
                        className="absolute bottom-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl"
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

                      <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                      <p className="text-foreground/80">
                        To empower businesses with innovative SAP solutions that drive growth and efficiency, delivering
                        exceptional value through our expertise in SAP, Cloud, and digital transformation.
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setActiveTab("sap-services")}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium transition-transform hover:scale-105"
                    >
                      Explore Our SAP Services <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "sap-services" && (
                <div>
                  <h2 className="text-2xl font-bold text-center mb-12">
                    Our Comprehensive{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                      SAP Services
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <SAPServiceCard
                      title="S/4HANA Implementation"
                      description="End-to-end SAP S/4HANA implementation services including business process redesign, system configuration, data migration, and user training."
                      icon="Database"
                      delay={0.1}
                    />
                    <SAPServiceCard
                      title="SAP Cloud Migration"
                      description="Seamless migration of SAP workloads to cloud platforms including AWS, Azure, and Google Cloud, with optimized performance and cost efficiency."
                      icon="Cloud"
                      delay={0.2}
                    />
                    <SAPServiceCard
                      title="RISE with SAP"
                      description="Comprehensive support for RISE with SAP transformation, helping businesses move to the cloud with minimal disruption and maximum value."
                      icon="ArrowUp"
                      delay={0.3}
                    />
                    <SAPServiceCard
                      title="SAP BTP Development"
                      description="Custom application development on SAP Business Technology Platform, extending core SAP functionality with cloud-native applications."
                      icon="Code"
                      delay={0.4}
                    />
                    <SAPServiceCard
                      title="SAP Integration"
                      description="Seamless integration between SAP and non-SAP systems using SAP Integration Suite, API Management, and custom middleware solutions."
                      icon="Link"
                      delay={0.5}
                    />
                    <SAPServiceCard
                      title="SAP Analytics"
                      description="Implementation of SAP Analytics Cloud, SAP BW/4HANA, and SAP Data Intelligence for real-time insights and data-driven decision making."
                      icon="BarChart"
                      delay={0.6}
                    />
                    <SAPServiceCard
                      title="SAP Fiori UX"
                      description="Design and development of intuitive user experiences with SAP Fiori, creating responsive applications that boost productivity and user adoption."
                      icon="Smartphone"
                      delay={0.7}
                    />
                    <SAPServiceCard
                      title="SAP Managed Services"
                      description="Comprehensive SAP application management services including monitoring, maintenance, support, and continuous improvement."
                      icon="Shield"
                      delay={0.8}
                    />
                    <SAPServiceCard
                      title="SAP Security & Compliance"
                      description="Implementation of robust security controls, identity management, and compliance frameworks for SAP landscapes."
                      icon="Lock"
                      delay={0.9}
                    />
                  </div>
                </div>
              )}

              {activeTab === "sap-staffing" && (
                <div>
                  <h2 className="text-2xl font-bold text-center mb-12">
                    Our{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                      SAP Staffing
                    </span>{" "}
                    Solutions
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="relative p-8 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg h-full">
                      <motion.div
                        className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
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

                      <h3 className="text-xl font-bold mb-4">SAP Talent Acquisition</h3>
                      <p className="text-foreground/80 mb-4">
                        Our specialized SAP recruitment team identifies and attracts top SAP talent across all modules
                        and technologies. We maintain an extensive network of pre-vetted SAP consultants ready to join
                        your projects.
                      </p>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <span>SAP S/4HANA specialists</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <span>SAP Fiori/UI5 developers</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <span>SAP BTP consultants</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <span>SAP ABAP developers</span>
                        </li>
                      </ul>
                    </div>

                    <div className="relative p-8 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg h-full">
                      <motion.div
                        className="absolute bottom-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl"
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

                      <h3 className="text-xl font-bold mb-4">Flexible Engagement Models</h3>
                      <p className="text-foreground/80 mb-4">
                        We offer multiple engagement models to meet your specific SAP staffing needs, from
                        contract-to-hire to project-based consulting and managed services.
                      </p>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <span>Contract staffing</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <span>Permanent placement</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <span>Project-based teams</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                          <span>Managed SAP services</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="relative p-8 rounded-2xl backdrop-blur-md bg-card/30 border border-border shadow-lg mb-12">
                    <h3 className="text-xl font-bold mb-4">Our SAP Expertise Areas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-blue-500/10">
                        <h4 className="font-bold mb-2">SAP S/4HANA</h4>
                        <p className="text-sm text-foreground/80">
                          Implementation, migration, and optimization services
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-500/10">
                        <h4 className="font-bold mb-2">SAP Finance</h4>
                        <p className="text-sm text-foreground/80">FI/CO, Treasury, and Financial Planning</p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-500/10">
                        <h4 className="font-bold mb-2">SAP Supply Chain</h4>
                        <p className="text-sm text-foreground/80">MM, SD, PP, WM, and TM modules</p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-500/10">
                        <h4 className="font-bold mb-2">SAP HCM</h4>
                        <p className="text-sm text-foreground/80">HR, Payroll, and SuccessFactors</p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-500/10">
                        <h4 className="font-bold mb-2">SAP Technology</h4>
                        <p className="text-sm text-foreground/80">ABAP, Fiori, UI5, BTP, and HANA</p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-500/10">
                        <h4 className="font-bold mb-2">SAP Analytics</h4>
                        <p className="text-sm text-foreground/80">BW, BO, and SAC implementations</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setActiveTab("team")}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium transition-transform hover:scale-105"
                    >
                      Meet Our SAP Leadership Team <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "timeline" && <CompanyTimeline />}
              {activeTab === "team" && <TeamSection />}
              {activeTab === "values" && <ValuesSection />}
            </motion.div>
          </AnimatePresence>
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
