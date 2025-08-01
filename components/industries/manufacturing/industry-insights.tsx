"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, BookOpen, Calendar, ArrowRight, BarChart3, Lightbulb, Globe } from "lucide-react"

export default function IndustryInsightsSection() {
  const [selectedInsight, setSelectedInsight] = useState(0)

  const insights = [
    {
      title: "The Future of Smart Manufacturing: Industry 4.0 Trends for 2024",
      category: "Industry Trends",
      date: "March 15, 2024",
      readTime: "8 min read",
      excerpt:
        "Explore the latest trends shaping the future of manufacturing, from AI-powered automation to sustainable production practices.",
      image: "/images/manufacturing/industry-4-trends.jpg",
      tags: ["Industry 4.0", "AI", "Automation", "Sustainability"],
      author: "Dr. Sarah Mitchell",
      authorRole: "Manufacturing Technology Expert",
    },
    {
      title: "Predictive Maintenance ROI: A Comprehensive Analysis",
      category: "Best Practices",
      date: "March 10, 2024",
      readTime: "12 min read",
      excerpt:
        "Deep dive into the financial benefits of predictive maintenance, with real-world case studies and ROI calculations.",
      image: "/images/manufacturing/predictive-maintenance-roi.jpg",
      tags: ["Predictive Maintenance", "ROI", "Cost Savings", "Analytics"],
      author: "Michael Johnson",
      authorRole: "Operations Consultant",
    },
    {
      title: "Supply Chain Resilience in the Digital Age",
      category: "Supply Chain",
      date: "March 5, 2024",
      readTime: "10 min read",
      excerpt: "How digital technologies are helping manufacturers build more resilient and agile supply chains.",
      image: "/images/manufacturing/supply-chain-resilience.jpg",
      tags: ["Supply Chain", "Digital Transformation", "Resilience", "AI"],
      author: "Lisa Chen",
      authorRole: "Supply Chain Strategist",
    },
  ]

  const industryStats = [
    { label: "Manufacturing GDP Growth", value: "3.2%", trend: "+0.8%", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Digital Adoption Rate", value: "67%", trend: "+15%", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "AI Implementation", value: "42%", trend: "+22%", icon: <Lightbulb className="h-5 w-5" /> },
    { label: "Global Market Size", value: "$16.2T", trend: "+4.1%", icon: <Globe className="h-5 w-5" /> },
  ]

  const upcomingEvents = [
    {
      title: "Smart Manufacturing Summit 2024",
      date: "April 15-17, 2024",
      location: "Chicago, IL",
      type: "Conference",
    },
    {
      title: "AI in Manufacturing Webinar",
      date: "March 28, 2024",
      location: "Virtual",
      type: "Webinar",
    },
    {
      title: "Industry 4.0 Workshop",
      date: "April 5, 2024",
      location: "Detroit, MI",
      type: "Workshop",
    },
  ]

  const whitepapers = [
    {
      title: "The Complete Guide to Smart Manufacturing Implementation",
      description: "A comprehensive 50-page guide covering everything from planning to execution",
      downloads: "2,847",
      pages: "50",
    },
    {
      title: "Predictive Maintenance Best Practices",
      description: "Industry best practices and implementation strategies for predictive maintenance",
      downloads: "1,923",
      pages: "32",
    },
    {
      title: "IoT Security in Manufacturing",
      description: "Essential security considerations for IoT implementations in manufacturing",
      downloads: "1,456",
      pages: "28",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-700/50 text-indigo-400 text-sm font-medium mb-4">
            <BookOpen className="mr-2 h-4 w-4" />
            Industry Insights
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Ahead with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Manufacturing
            </span>{" "}
            Intelligence
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access the latest industry insights, trends, and best practices to keep your manufacturing operations at the
            forefront of innovation and efficiency.
          </p>
        </div>

        {/* Industry Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {industryStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900 border-gray-800 text-center hover:shadow-lg hover:shadow-indigo-900/20 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-3 text-indigo-400">{stat.icon}</div>
                  <div className="text-2xl font-bold text-indigo-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
                  <Badge variant="secondary" className="bg-green-900/30 text-green-400 text-xs">
                    {stat.trend}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Insights */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Latest Insights</h3>
              <div className="space-y-6">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className="bg-gray-900 border-gray-800 hover:shadow-lg hover:shadow-indigo-900/20 transition-all cursor-pointer"
                      onClick={() => setSelectedInsight(index)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                          <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-gray-600" />
                          </div>
                        </div>
                        <div className="md:col-span-2 p-6">
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge variant="secondary" className="bg-indigo-900/30 text-indigo-400">
                              {insight.category}
                            </Badge>
                            <span className="text-sm text-gray-400">{insight.date}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-400">{insight.readTime}</span>
                          </div>

                          <h4 className="text-xl font-bold mb-3 hover:text-indigo-400 transition-colors">
                            {insight.title}
                          </h4>

                          <p className="text-gray-300 mb-4">{insight.excerpt}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {insight.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">
                              Read More <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-800">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {insight.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold">{insight.author}</div>
                              <div className="text-xs text-gray-400">{insight.authorRole}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 text-purple-400 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date}
                      </div>
                      <div>{event.location}</div>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-sm">View All Events</Button>
              </CardContent>
            </Card>

            {/* Whitepapers */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 text-green-400 mr-2" />
                  Free Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {whitepapers.map((paper, index) => (
                  <div key={index} className="p-3 bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">{paper.title}</h4>
                    <p className="text-xs text-gray-400 mb-3">{paper.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{paper.pages} pages</span>
                      <span>{paper.downloads} downloads</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2 text-xs bg-transparent">
                      Download PDF
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-indigo-700/50">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2">Stay Updated</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Get the latest manufacturing insights delivered to your inbox weekly.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
