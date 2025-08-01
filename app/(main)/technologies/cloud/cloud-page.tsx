"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Cloud,
  Server,
  Database,
  Shield,
  Zap,
  Globe,
  Settings,
  TrendingUp,
  Lock,
  Smartphone,
  Monitor,
  Network,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Gauge,
  Layers,
  Building,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CloudPage() {
  const [activeModel, setActiveModel] = useState(0)
  const [activeProvider, setActiveProvider] = useState(0)

  const cloudStats = [
    { label: "Global Cloud Market", value: "$545B", icon: Globe },
    { label: "Cost Reduction", value: "35%", icon: DollarSign },
    { label: "Scalability Improvement", value: "10x", icon: TrendingUp },
    { label: "Deployment Speed", value: "90%", icon: Zap },
  ]

  const serviceModels = [
    {
      model: "Infrastructure as a Service (IaaS)",
      description: "Virtualized computing resources over the internet",
      icon: Server,
      color: "from-blue-500 to-cyan-500",
      characteristics: ["Virtual machines", "Storage", "Networks", "Operating systems"],
      benefits: ["Maximum control", "Cost-effective", "Scalable", "Flexible"],
      useCases: ["Development environments", "Backup & recovery", "Web hosting", "High-performance computing"],
      examples: ["Amazon EC2", "Azure Virtual Machines", "Google Compute Engine", "IBM Cloud Virtual Servers"],
    },
    {
      model: "Platform as a Service (PaaS)",
      description: "Development and deployment platform in the cloud",
      icon: Layers,
      color: "from-green-500 to-emerald-500",
      characteristics: ["Development tools", "Database management", "Business analytics", "Operating systems"],
      benefits: ["Faster development", "Reduced complexity", "Built-in scalability", "Cost-effective"],
      useCases: ["Application development", "API development", "Business analytics", "Database management"],
      examples: ["Heroku", "Azure App Service", "Google App Engine", "AWS Elastic Beanstalk"],
    },
    {
      model: "Software as a Service (SaaS)",
      description: "Software applications delivered over the internet",
      icon: Monitor,
      color: "from-purple-500 to-pink-500",
      characteristics: ["Web-based access", "Subscription model", "Automatic updates", "Multi-tenancy"],
      benefits: ["No installation required", "Automatic updates", "Accessibility", "Lower upfront costs"],
      useCases: ["Email services", "CRM systems", "Collaboration tools", "Business applications"],
      examples: ["Salesforce", "Microsoft 365", "Google Workspace", "Slack"],
    },
  ]

  const deploymentModels = [
    {
      model: "Public Cloud",
      description: "Services offered over the public internet and shared across organizations",
      icon: Globe,
      advantages: ["Cost-effective", "High scalability", "No maintenance", "Quick deployment"],
      considerations: ["Less control", "Security concerns", "Compliance challenges", "Internet dependency"],
      bestFor: ["Startups", "Development/testing", "Non-critical workloads", "Variable demand"],
    },
    {
      model: "Private Cloud",
      description: "Dedicated cloud infrastructure for a single organization",
      icon: Lock,
      advantages: ["Enhanced security", "Full control", "Compliance", "Customization"],
      considerations: ["Higher costs", "Maintenance required", "Limited scalability", "Technical expertise needed"],
      bestFor: ["Large enterprises", "Regulated industries", "Sensitive data", "Predictable workloads"],
    },
    {
      model: "Hybrid Cloud",
      description: "Combination of public and private cloud environments",
      icon: Network,
      advantages: ["Flexibility", "Cost optimization", "Scalability", "Risk mitigation"],
      considerations: ["Complexity", "Integration challenges", "Management overhead", "Security coordination"],
      bestFor: ["Enterprises", "Seasonal workloads", "Data sovereignty", "Gradual migration"],
    },
    {
      model: "Multi-Cloud",
      description: "Using multiple cloud service providers simultaneously",
      icon: Layers,
      advantages: ["Vendor independence", "Best-of-breed", "Risk distribution", "Negotiation power"],
      considerations: ["Increased complexity", "Management challenges", "Integration issues", "Skill requirements"],
      bestFor: ["Large organizations", "Global presence", "Specialized needs", "Risk mitigation"],
    },
  ]

  const cloudProviders = [
    {
      provider: "Amazon Web Services (AWS)",
      marketShare: "32%",
      strengths: ["Comprehensive services", "Global infrastructure", "Enterprise features", "Innovation"],
      keyServices: ["EC2", "S3", "Lambda", "RDS", "CloudFront"],
      bestFor: ["Enterprises", "Startups", "Machine learning", "Global applications"],
      logo: "/images/providers/aws-logo.png",
    },
    {
      provider: "Microsoft Azure",
      marketShare: "23%",
      strengths: ["Enterprise integration", "Hybrid capabilities", "Microsoft ecosystem", "AI/ML services"],
      keyServices: ["Virtual Machines", "Blob Storage", "Functions", "SQL Database", "CDN"],
      bestFor: ["Microsoft shops", "Hybrid environments", "Enterprise applications", "DevOps"],
      logo: "/images/providers/azure-logo.png",
    },
    {
      provider: "Google Cloud Platform",
      marketShare: "10%",
      strengths: ["Data analytics", "Machine learning", "Kubernetes", "Global network"],
      keyServices: ["Compute Engine", "Cloud Storage", "BigQuery", "Kubernetes Engine", "AI Platform"],
      bestFor: ["Data analytics", "Machine learning", "Modern applications", "Kubernetes workloads"],
      logo: "/images/providers/gcp-logo.png",
    },
    {
      provider: "IBM Cloud",
      marketShare: "4%",
      strengths: ["Enterprise focus", "AI capabilities", "Hybrid cloud", "Industry solutions"],
      keyServices: ["Virtual Servers", "Object Storage", "Watson", "Red Hat OpenShift", "Db2"],
      bestFor: ["Enterprises", "AI applications", "Hybrid environments", "Industry-specific solutions"],
      logo: "/images/providers/ibm-logo.png",
    },
  ]

  const benefits = [
    {
      title: "Cost Efficiency",
      description: "Reduce capital expenditure and operational costs",
      icon: DollarSign,
      metrics: "30-50% cost reduction",
      details: ["Pay-as-you-use model", "Reduced hardware costs", "Lower maintenance", "Economies of scale"],
    },
    {
      title: "Scalability",
      description: "Scale resources up or down based on demand",
      icon: TrendingUp,
      metrics: "Instant scalability",
      details: ["Auto-scaling", "Global reach", "Elastic resources", "Performance optimization"],
    },
    {
      title: "Accessibility",
      description: "Access applications and data from anywhere",
      icon: Smartphone,
      metrics: "24/7 availability",
      details: ["Remote access", "Mobile compatibility", "Global accessibility", "Disaster recovery"],
    },
    {
      title: "Security",
      description: "Enterprise-grade security and compliance",
      icon: Shield,
      metrics: "99.9% uptime",
      details: ["Data encryption", "Access controls", "Compliance certifications", "Security monitoring"],
    },
  ]

  const challenges = [
    {
      challenge: "Security & Privacy",
      description: "Protecting data and ensuring privacy in cloud environments",
      icon: Shield,
      concerns: ["Data breaches", "Compliance requirements", "Access control", "Data sovereignty"],
      solutions: ["Encryption", "Identity management", "Security monitoring", "Compliance frameworks"],
    },
    {
      challenge: "Vendor Lock-in",
      description: "Dependency on specific cloud provider services and APIs",
      icon: Lock,
      concerns: ["Migration difficulties", "Cost implications", "Limited flexibility", "Proprietary technologies"],
      solutions: ["Multi-cloud strategy", "Open standards", "Containerization", "API abstraction"],
    },
    {
      challenge: "Data Governance",
      description: "Managing data quality, privacy, and regulatory compliance",
      icon: Database,
      concerns: ["Data location", "Regulatory compliance", "Data quality", "Access controls"],
      solutions: ["Data classification", "Governance policies", "Compliance tools", "Regular audits"],
    },
    {
      challenge: "Performance & Latency",
      description: "Ensuring optimal performance across distributed cloud environments",
      icon: Gauge,
      concerns: ["Network latency", "Bandwidth limitations", "Performance variability", "Geographic distribution"],
      solutions: ["Edge computing", "CDN services", "Performance monitoring", "Optimization tools"],
    },
  ]

  const migrationSteps = [
    {
      step: "Assessment & Planning",
      description: "Evaluate current infrastructure and plan migration strategy",
      icon: BarChart3,
      activities: ["Infrastructure audit", "Application assessment", "Cost analysis", "Migration roadmap"],
    },
    {
      step: "Design & Architecture",
      description: "Design cloud architecture and select appropriate services",
      icon: Settings,
      activities: ["Architecture design", "Service selection", "Security planning", "Performance optimization"],
    },
    {
      step: "Migration Execution",
      description: "Execute the migration plan with minimal disruption",
      icon: Zap,
      activities: ["Data migration", "Application deployment", "Testing", "Cutover planning"],
    },
    {
      step: "Optimization & Management",
      description: "Optimize performance and establish ongoing management",
      icon: TrendingUp,
      activities: ["Performance tuning", "Cost optimization", "Monitoring setup", "Team training"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-green-600/10" />
          {/* Cloud Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              >
                <Cloud className="h-8 w-8 text-blue-400" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-blue-600/20 text-blue-300 border-blue-500/30 px-4 py-2">
              <Cloud className="h-4 w-4 mr-2" />
              Cloud Computing Solutions
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Cloud
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                Transformation
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Accelerate your digital transformation with comprehensive cloud computing solutions that deliver
              scalability, security, and cost-effectiveness for modern enterprises.
            </p>

            {/* Cloud Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {cloudStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <stat.icon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Models */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Service{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Models</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the right cloud service model for your business needs, from infrastructure to complete software
              solutions.
            </p>
          </motion.div>

          <div className="space-y-8">
            {serviceModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveModel(index)}
              >
                <Card
                  className={`transition-all duration-300 ${
                    activeModel === index
                      ? "bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30 scale-105"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${model.color} flex-shrink-0`}>
                        <model.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{model.model}</h3>
                        <p className="text-gray-300 mb-4">{model.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <h4 className="font-semibold text-white mb-3 text-sm">Characteristics:</h4>
                        <div className="space-y-2">
                          {model.characteristics.map((char, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-300">
                              <CheckCircle className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                              {char}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-3 text-sm">Benefits:</h4>
                        <div className="space-y-2">
                          {model.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-300">
                              <Zap className="h-3 w-3 text-yellow-400 mr-2 flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-3 text-sm">Use Cases:</h4>
                        <div className="space-y-2">
                          {model.useCases.map((useCase, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-300">
                              <Building className="h-3 w-3 text-blue-400 mr-2 flex-shrink-0" />
                              {useCase}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-3 text-sm">Examples:</h4>
                        <div className="flex flex-wrap gap-1">
                          {model.examples.map((example, idx) => (
                            <Badge key={idx} className="bg-white/10 text-gray-300 border-white/20 text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Models */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Deployment{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Models</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select the optimal deployment model that aligns with your security, compliance, and business requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deploymentModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
                        <model.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{model.model}</CardTitle>
                        <p className="text-gray-300 text-sm">{model.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Advantages:</h4>
                      <div className="space-y-1">
                        {model.advantages.map((advantage, idx) => (
                          <div key={idx} className="flex items-center text-xs text-green-400">
                            <CheckCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                            {advantage}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Considerations:</h4>
                      <div className="space-y-1">
                        {model.considerations.map((consideration, idx) => (
                          <div key={idx} className="flex items-center text-xs text-orange-400">
                            <AlertTriangle className="h-3 w-3 mr-2 flex-shrink-0" />
                            {consideration}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Best For:</h4>
                      <div className="flex flex-wrap gap-1">
                        {model.bestFor.map((best, idx) => (
                          <Badge key={idx} className="bg-blue-600/20 text-blue-300 border-blue-500/30 text-xs">
                            {best}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Providers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cloud{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Providers
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Compare leading cloud providers and their unique strengths to make informed decisions for your cloud
              strategy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cloudProviders.map((provider, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveProvider(index)}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    activeProvider === index
                      ? "bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30 scale-105"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-xl text-white">{provider.provider}</CardTitle>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                        {provider.marketShare} Market Share
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Key Strengths:</h4>
                      <div className="space-y-1">
                        {provider.strengths.map((strength, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-300">
                            <CheckCircle className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                            {strength}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Key Services:</h4>
                      <div className="flex flex-wrap gap-1">
                        {provider.keyServices.map((service, idx) => (
                          <Badge key={idx} className="bg-white/10 text-gray-300 border-white/20 text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Best For:</h4>
                      <div className="flex flex-wrap gap-1">
                        {provider.bestFor.map((best, idx) => (
                          <Badge key={idx} className="bg-blue-600/20 text-blue-300 border-blue-500/30 text-xs">
                            {best}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cloud{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Benefits
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the transformative benefits of cloud computing that drive business growth and operational
              excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 h-full text-center">
                  <CardContent className="p-6">
                    <benefit.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{benefit.description}</p>
                    <div className="text-2xl font-bold text-green-400 mb-4">{benefit.metrics}</div>
                    <div className="space-y-1">
                      {benefit.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-gray-400">
                          {detail}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Challenges &{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Address common cloud adoption challenges with proven solutions and best practices for successful
              implementation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/20 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
                        <challenge.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{challenge.challenge}</CardTitle>
                        <p className="text-gray-300 text-sm">{challenge.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Key Concerns:</h4>
                      <div className="space-y-1">
                        {challenge.concerns.map((concern, idx) => (
                          <div key={idx} className="flex items-center text-xs text-red-400">
                            <AlertTriangle className="h-3 w-3 mr-2 flex-shrink-0" />
                            {concern}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-sm">Our Solutions:</h4>
                      <div className="space-y-1">
                        {challenge.solutions.map((solution, idx) => (
                          <div key={idx} className="flex items-center text-xs text-green-400">
                            <CheckCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                            {solution}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Process */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Migration{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our proven cloud migration methodology ensures smooth transition with minimal disruption to your business
              operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {migrationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20 h-full text-center">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-cyan-400 font-bold text-sm mb-2">Step {index + 1}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.step}</h3>
                      <p className="text-gray-300 text-sm mb-4">{step.description}</p>
                    </div>
                    <div className="space-y-1">
                      {step.activities.map((activity, idx) => (
                        <div key={idx} className="text-xs text-gray-400">
                          • {activity}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-blue-500/30 max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Accelerate your digital transformation with our comprehensive cloud solutions and expert guidance
                  every step of the way.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    <Cloud className="mr-2 h-5 w-5" />
                    Start Cloud Journey
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                  >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Get Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
