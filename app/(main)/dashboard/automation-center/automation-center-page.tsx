"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Bot,
  Play,
  Pause,
  Square,
  Settings,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  Plus,
  Search,
  BarChart3,
  Users,
  FileText,
} from "lucide-react"

interface AutomationBot {
  id: string
  name: string
  description: string
  type: "data_processing" | "report_generation" | "compliance_check" | "notification" | "integration"
  status: "running" | "stopped" | "paused" | "error"
  lastRun: Date
  nextRun?: Date
  frequency: string
  successRate: number
  totalRuns: number
  avgDuration: number
  isEnabled: boolean
}

interface RPAWorkflow {
  id: string
  name: string
  description: string
  steps: string[]
  status: "active" | "inactive" | "draft"
  trigger: "manual" | "scheduled" | "event"
  lastExecution: Date
  executionCount: number
  successRate: number
  avgDuration: number
  category: "lca_processing" | "audit_automation" | "data_migration" | "reporting"
}

export default function AutomationCenterPage() {
  const [bots, setBots] = useState<AutomationBot[]>([
    {
      id: "1",
      name: "LCA Data Processor",
      description: "Automatically processes incoming LCA data submissions and validates format compliance",
      type: "data_processing",
      status: "running",
      lastRun: new Date(Date.now() - 300000),
      nextRun: new Date(Date.now() + 3600000),
      frequency: "Every hour",
      successRate: 98.5,
      totalRuns: 1247,
      avgDuration: 45,
      isEnabled: true,
    },
    {
      id: "2",
      name: "Compliance Report Generator",
      description: "Generates automated compliance reports based on audit results and regulatory requirements",
      type: "report_generation",
      status: "running",
      lastRun: new Date(Date.now() - 86400000),
      nextRun: new Date(Date.now() + 86400000),
      frequency: "Daily",
      successRate: 96.2,
      totalRuns: 365,
      avgDuration: 180,
      isEnabled: true,
    },
    {
      id: "3",
      name: "Data Quality Checker",
      description: "Monitors data quality and flags inconsistencies or missing information",
      type: "compliance_check",
      status: "paused",
      lastRun: new Date(Date.now() - 7200000),
      frequency: "Every 2 hours",
      successRate: 94.8,
      totalRuns: 892,
      avgDuration: 30,
      isEnabled: false,
    },
    {
      id: "4",
      name: "Alert Notification System",
      description: "Sends automated notifications for critical events and threshold breaches",
      type: "notification",
      status: "running",
      lastRun: new Date(Date.now() - 900000),
      nextRun: new Date(Date.now() + 900000),
      frequency: "Every 15 minutes",
      successRate: 99.1,
      totalRuns: 5678,
      avgDuration: 5,
      isEnabled: true,
    },
  ])

  const [workflows, setWorkflows] = useState<RPAWorkflow[]>([
    {
      id: "1",
      name: "Monthly LCA Report Automation",
      description:
        "End-to-end automation for monthly LCA reporting including data collection, analysis, and distribution",
      steps: ["Collect Data", "Validate Quality", "Generate Analysis", "Create Report", "Distribute to Stakeholders"],
      status: "active",
      trigger: "scheduled",
      lastExecution: new Date(Date.now() - 2592000000),
      executionCount: 12,
      successRate: 91.7,
      avgDuration: 3600,
      category: "lca_processing",
    },
    {
      id: "2",
      name: "Audit Trail Documentation",
      description: "Automatically documents all system activities and maintains comprehensive audit trails",
      steps: ["Monitor Activities", "Log Events", "Generate Timestamps", "Create Documentation", "Archive Records"],
      status: "active",
      trigger: "event",
      lastExecution: new Date(Date.now() - 3600000),
      executionCount: 2847,
      successRate: 99.3,
      avgDuration: 120,
      category: "audit_automation",
    },
    {
      id: "3",
      name: "Legacy Data Migration",
      description: "Migrates data from legacy systems to the new LCA platform with validation and mapping",
      steps: ["Extract Data", "Transform Format", "Validate Integrity", "Map Fields", "Load to System"],
      status: "draft",
      trigger: "manual",
      lastExecution: new Date(Date.now() - 604800000),
      executionCount: 3,
      successRate: 66.7,
      avgDuration: 7200,
      category: "data_migration",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isCreateBotOpen, setIsCreateBotOpen] = useState(false)
  const [isCreateWorkflowOpen, setIsCreateWorkflowOpen] = useState(false)

  const filteredBots = bots.filter((bot) => {
    const matchesSearch =
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || bot.status === statusFilter
    const matchesType = typeFilter === "all" || bot.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Play className="h-4 w-4 text-green-500" />
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />
      case "stopped":
        return <Square className="h-4 w-4 text-gray-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "data_processing":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "report_generation":
        return <BarChart3 className="h-4 w-4 text-green-500" />
      case "compliance_check":
        return <CheckCircle className="h-4 w-4 text-purple-500" />
      case "notification":
        return <Zap className="h-4 w-4 text-orange-500" />
      case "integration":
        return <Settings className="h-4 w-4 text-gray-500" />
      default:
        return <Bot className="h-4 w-4 text-gray-500" />
    }
  }

  const handleBotAction = (botId: string, action: "start" | "pause" | "stop") => {
    setBots((prev) =>
      prev.map((bot) =>
        bot.id === botId
          ? {
              ...bot,
              status: action === "start" ? "running" : action === "pause" ? "paused" : "stopped",
              lastRun: action === "start" ? new Date() : bot.lastRun,
            }
          : bot,
      ),
    )
  }

  const handleBotToggle = (botId: string, enabled: boolean) => {
    setBots((prev) =>
      prev.map((bot) =>
        bot.id === botId ? { ...bot, isEnabled: enabled, status: enabled ? "running" : "stopped" } : bot,
      ),
    )
  }

  const runningBots = bots.filter((bot) => bot.status === "running").length
  const totalExecutions = bots.reduce((sum, bot) => sum + bot.totalRuns, 0)
  const avgSuccessRate =
    bots.length > 0 ? Math.round(bots.reduce((sum, bot) => sum + bot.successRate, 0) / bots.length) : 0
  const activeWorkflows = workflows.filter((wf) => wf.status === "active").length

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automation Center</h1>
          <p className="text-muted-foreground">Manage bots and RPA workflows for automated processes</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateBotOpen} onOpenChange={setIsCreateBotOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Create Bot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Bot</DialogTitle>
                <DialogDescription>Set up a new automation bot for your processes</DialogDescription>
              </DialogHeader>
              {/* Create bot form would go here */}
            </DialogContent>
          </Dialog>
          <Dialog open={isCreateWorkflowOpen} onOpenChange={setIsCreateWorkflowOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Workflow
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New RPA Workflow</DialogTitle>
                <DialogDescription>Design a new robotic process automation workflow</DialogDescription>
              </DialogHeader>
              {/* Create workflow form would go here */}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bots</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{runningBots}</div>
            <p className="text-xs text-muted-foreground">of {bots.length} total bots</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExecutions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time executions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSuccessRate}%</div>
            <p className="text-xs text-muted-foreground">Average across all bots</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeWorkflows}</div>
            <p className="text-xs text-muted-foreground">RPA workflows running</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bots" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bots">Automation Bots</TabsTrigger>
          <TabsTrigger value="workflows">RPA Workflows</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="bots" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter & Search</CardTitle>
              <CardDescription>Filter bots by status, type, or search terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search bots..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="stopped">Stopped</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="data_processing">Data Processing</SelectItem>
                    <SelectItem value="report_generation">Report Generation</SelectItem>
                    <SelectItem value="compliance_check">Compliance Check</SelectItem>
                    <SelectItem value="notification">Notification</SelectItem>
                    <SelectItem value="integration">Integration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bots List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBots.map((bot) => (
              <Card key={bot.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(bot.type)}
                      <div>
                        <h3 className="font-medium">{bot.name}</h3>
                        <p className="text-sm text-muted-foreground">{bot.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(bot.status)}
                      <Switch checked={bot.isEnabled} onCheckedChange={(checked) => handleBotToggle(bot.id, checked)} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Frequency</p>
                      <p className="font-medium">{bot.frequency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Success Rate</p>
                      <p className="font-medium">{bot.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Runs</p>
                      <p className="font-medium">{bot.totalRuns.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Duration</p>
                      <p className="font-medium">{bot.avgDuration}s</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last Run: {bot.lastRun.toLocaleString()}</span>
                      {bot.nextRun && <span>Next: {bot.nextRun.toLocaleTimeString()}</span>}
                    </div>
                    <Progress value={bot.successRate} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    {bot.status !== "running" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBotAction(bot.id, "start")}
                        className="flex-1"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    )}
                    {bot.status === "running" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBotAction(bot.id, "pause")}
                        className="flex-1"
                      >
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBotAction(bot.id, "stop")}
                      className="flex-1"
                    >
                      <Square className="h-3 w-3 mr-1" />
                      Stop
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>RPA Workflows</CardTitle>
              <CardDescription>Manage complex robotic process automation workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{workflow.name}</h3>
                        <p className="text-sm text-muted-foreground">{workflow.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            workflow.status === "active"
                              ? "default"
                              : workflow.status === "inactive"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {workflow.status}
                        </Badge>
                        <Badge variant="outline">{workflow.trigger}</Badge>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">Workflow Steps:</p>
                      <div className="flex flex-wrap gap-2">
                        {workflow.steps.map((step, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {index + 1}. {step}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Executions</p>
                        <p className="font-medium">{workflow.executionCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Success Rate</p>
                        <p className="font-medium">{workflow.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Duration</p>
                        <p className="font-medium">{Math.round(workflow.avgDuration / 60)}m</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Run</p>
                        <p className="font-medium">{workflow.lastExecution.toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-3 w-3 mr-1" />
                        Execute
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Real-time automation system metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Queue Length</span>
                    <span className="font-medium">23 jobs</span>
                  </div>
                  <Progress value={23} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Error Rate</span>
                    <span className="font-medium text-green-600">0.8%</span>
                  </div>
                  <Progress value={0.8} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest automation events and executions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: "2 min ago", event: "LCA Data Processor completed successfully", status: "success" },
                    { time: "15 min ago", event: "Alert Notification System triggered", status: "info" },
                    { time: "1 hour ago", event: "Compliance Report Generator started", status: "info" },
                    { time: "2 hours ago", event: "Data Quality Checker paused by user", status: "warning" },
                    { time: "3 hours ago", event: "Monthly LCA Report Automation completed", status: "success" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 border rounded">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.status === "success"
                            ? "bg-green-500"
                            : activity.status === "warning"
                              ? "bg-yellow-500"
                              : activity.status === "error"
                                ? "bg-red-500"
                                : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm">{activity.event}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Automation Analytics</CardTitle>
              <CardDescription>Performance insights and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="font-medium">Time Saved</p>
                  <p className="text-2xl font-bold">247h</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium">Tasks Automated</p>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-muted-foreground">Successfully completed</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="font-medium">Users Impacted</p>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-muted-foreground">Benefiting from automation</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <BarChart3 className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="font-medium">Efficiency Gain</p>
                  <p className="text-2xl font-bold">34%</p>
                  <p className="text-sm text-muted-foreground">Process improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
