"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Users,
  FileText,
  Activity,
  Brain,
  Zap,
  RefreshCw,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface KPI {
  name: string
  value: number
  unit: string
  change: number
  trend: "up" | "down" | "stable"
  target: number
}

interface CopilotInsight {
  id: string
  title: string
  description: string
  type: "recommendation" | "alert" | "insight"
  priority: "high" | "medium" | "low"
  timestamp: Date
  impact: string
  action?: string
}

export default function DashboardAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [kpis, setKpis] = useState<KPI[]>([
    { name: "LCA Submissions", value: 1247, unit: "", change: 12.5, trend: "up", target: 1200 },
    { name: "Audit Score", value: 87.3, unit: "%", change: 2.1, trend: "up", target: 85 },
    { name: "User Engagement", value: 78.9, unit: "%", change: -1.2, trend: "down", target: 80 },
    { name: "Processing Time", value: 4.2, unit: "hrs", change: -8.3, trend: "up", target: 5 },
    { name: "Compliance Rate", value: 94.7, unit: "%", change: 3.4, trend: "up", target: 90 },
    { name: "Cost Savings", value: 245000, unit: "$", change: 18.7, trend: "up", target: 200000 },
  ])

  const [copilotInsights, setCopilotInsights] = useState<CopilotInsight[]>([
    {
      id: "1",
      title: "Optimization Opportunity Detected",
      description:
        "Manufacturing sector shows 15% higher carbon footprint than industry average. Consider implementing energy efficiency measures.",
      type: "recommendation",
      priority: "high",
      timestamp: new Date(),
      impact: "Potential 12% reduction in emissions",
      action: "Schedule energy audit",
    },
    {
      id: "2",
      title: "Data Quality Alert",
      description:
        "Recent LCA submissions from Technology sector show inconsistent data patterns. Manual review recommended.",
      type: "alert",
      priority: "medium",
      timestamp: new Date(Date.now() - 3600000),
      impact: "May affect compliance scores",
      action: "Review data sources",
    },
    {
      id: "3",
      title: "Performance Trend Analysis",
      description: "User engagement has increased 23% following the implementation of AI-powered recommendations.",
      type: "insight",
      priority: "low",
      timestamp: new Date(Date.now() - 7200000),
      impact: "Positive user experience trend",
    },
  ])

  const performanceData = [
    { month: "Jan", submissions: 980, audits: 850, compliance: 89 },
    { month: "Feb", submissions: 1120, audits: 980, compliance: 91 },
    { month: "Mar", submissions: 1050, audits: 920, compliance: 88 },
    { month: "Apr", submissions: 1180, audits: 1050, compliance: 92 },
    { month: "May", submissions: 1320, audits: 1180, compliance: 94 },
    { month: "Jun", submissions: 1247, audits: 1120, compliance: 95 },
  ]

  const industryData = [
    { name: "Manufacturing", value: 35, color: "#3b82f6" },
    { name: "Technology", value: 25, color: "#10b981" },
    { name: "Energy", value: 20, color: "#f59e0b" },
    { name: "Healthcare", value: 12, color: "#ef4444" },
    { name: "Other", value: 8, color: "#8b5cf6" },
  ]

  const radarData = [
    { subject: "Data Quality", A: 85, B: 90, fullMark: 100 },
    { subject: "Processing Speed", A: 92, B: 85, fullMark: 100 },
    { subject: "User Satisfaction", A: 78, B: 82, fullMark: 100 },
    { subject: "Compliance", A: 95, B: 88, fullMark: 100 },
    { subject: "Cost Efficiency", A: 88, B: 75, fullMark: 100 },
    { subject: "Innovation", A: 82, B: 78, fullMark: 100 },
  ]

  const refreshData = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update KPIs with random variations
    setKpis((prev) =>
      prev.map((kpi) => ({
        ...kpi,
        value: kpi.value + (Math.random() - 0.5) * kpi.value * 0.05,
        change: (Math.random() - 0.5) * 20,
      })),
    )

    setIsRefreshing(false)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "recommendation":
        return <Brain className="h-4 w-4 text-blue-500" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "insight":
        return <Zap className="h-4 w-4 text-green-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & KPI Dashboard</h1>
          <p className="text-muted-foreground">Monitor key performance indicators and AI-powered insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={refreshData}
            disabled={isRefreshing}
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
              <div className="flex items-center gap-1">
                {kpi.trend === "up" ? (
                  <TrendingUp className={`h-4 w-4 ${kpi.change > 0 ? "text-green-500" : "text-red-500"}`} />
                ) : (
                  <TrendingUp className={`h-4 w-4 rotate-180 ${kpi.change > 0 ? "text-green-500" : "text-red-500"}`} />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpi.unit === "$" ? "$" : ""}
                {kpi.value.toLocaleString()}
                {kpi.unit !== "$" ? kpi.unit : ""}
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className={`text-xs ${kpi.change > 0 ? "text-green-500" : "text-red-500"}`}>
                  {kpi.change > 0 ? "+" : ""}
                  {kpi.change.toFixed(1)}% from last period
                </p>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>
                    Target: {kpi.target.toLocaleString()}
                    {kpi.unit}
                  </span>
                  <span>{Math.round((kpi.value / kpi.target) * 100)}%</span>
                </div>
                <Progress value={(kpi.value / kpi.target) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="copilot">AI Copilot</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">Deep Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Monthly performance metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="submissions" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="audits" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="compliance" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Distribution</CardTitle>
                <CardDescription>LCA submissions by industry sector</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {industryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {industryData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Health Overview</CardTitle>
              <CardDescription>Real-time system performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium">System Status</p>
                  <p className="text-sm text-green-500">Operational</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="font-medium">API Response</p>
                  <p className="text-sm">142ms avg</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="font-medium">Active Users</p>
                  <p className="text-sm">1,247 online</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <FileText className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="font-medium">Queue Status</p>
                  <p className="text-sm">23 pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="copilot" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-500" />
                AI Copilot Insights
              </CardTitle>
              <CardDescription>AI-powered recommendations and insights for optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {copilotInsights.map((insight) => (
                  <div key={insight.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getInsightIcon(insight.type)}
                        <h3 className="font-medium">{insight.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
                        <span className="text-xs text-muted-foreground">{insight.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-600">Impact: {insight.impact}</span>
                      {insight.action && (
                        <Button variant="outline" size="sm">
                          {insight.action}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>Automated optimization suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "Optimize Data Collection", impact: "High", savings: "$12K/month" },
                    { title: "Automate Report Generation", impact: "Medium", savings: "15 hours/week" },
                    { title: "Improve Data Quality", impact: "High", savings: "8% accuracy gain" },
                    { title: "Streamline Approval Process", impact: "Medium", savings: "2 days faster" },
                  ].map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{rec.title}</p>
                        <p className="text-xs text-muted-foreground">Impact: {rec.impact}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{rec.savings}</p>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Predictive Analytics</CardTitle>
                <CardDescription>AI-powered forecasting and predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Next Month Submissions</span>
                      <span className="text-sm text-green-600">↗ +18%</span>
                    </div>
                    <p className="text-2xl font-bold">1,470</p>
                    <p className="text-xs text-muted-foreground">Predicted based on trends</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Compliance Risk</span>
                      <span className="text-sm text-yellow-600">⚠ Medium</span>
                    </div>
                    <p className="text-2xl font-bold">12%</p>
                    <p className="text-xs text-muted-foreground">Probability of issues</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Resource Utilization</span>
                      <span className="text-sm text-blue-600">→ Stable</span>
                    </div>
                    <p className="text-2xl font-bold">78%</p>
                    <p className="text-xs text-muted-foreground">Expected capacity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Radar</CardTitle>
              <CardDescription>Multi-dimensional performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Current" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Target" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Efficiency</CardTitle>
                <CardDescription>System processing metrics and bottlenecks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Data Ingestion", time: "1.2s", efficiency: 95 },
                    { name: "LCA Processing", time: "3.8s", efficiency: 87 },
                    { name: "Audit Generation", time: "2.1s", efficiency: 92 },
                    { name: "Report Creation", time: "4.5s", efficiency: 78 },
                  ].map((process, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{process.name}</span>
                        <span className="font-medium">{process.time}</span>
                      </div>
                      <Progress value={process.efficiency} className="h-2" />
                      <p className="text-xs text-muted-foreground">{process.efficiency}% efficiency</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement Metrics</CardTitle>
                <CardDescription>User interaction and satisfaction data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Daily Active Users</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Session Duration</span>
                    <span className="font-medium">24m 32s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Feature Adoption Rate</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Satisfaction</span>
                    <span className="font-medium">4.6/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Support Tickets</span>
                    <span className="font-medium">12 open</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Deep dive into performance patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="submissions"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="audits"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Financial impact and ROI metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Cost Savings</span>
                    <span className="font-medium text-green-600">$245K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ROI</span>
                    <span className="font-medium">340%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Efficiency Gains</span>
                    <span className="font-medium">23%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
                <CardDescription>Data quality and accuracy indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Accuracy</span>
                    <span className="font-medium">96.8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completeness</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consistency</span>
                    <span className="font-medium">91.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Identified risks and mitigation status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Risk Items</span>
                    <span className="font-medium text-red-600">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Medium Risk Items</span>
                    <span className="font-medium text-yellow-600">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mitigation Rate</span>
                    <span className="font-medium text-green-600">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
