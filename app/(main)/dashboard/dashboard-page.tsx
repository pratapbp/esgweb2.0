"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "@/hooks/use-toast"
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Bell,
  AlertTriangle,
  RefreshCw,
  Eye,
  BarChart3,
  Zap,
  Target,
  Brain,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts"
import { createSupabaseClient } from "@/lib/supabase"

interface DashboardMetrics {
  activeTenants: number
  totalUsers: number
  monthlyRevenue: number
  pendingTasks: number
  overdueTasks: number
  unreadNotifications: number
  systemHealth: number
  userEngagement: number
}

interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "in_progress" | "completed" | "overdue"
  priority: "low" | "medium" | "high"
  due_date: string
  assigned_to: string
  created_at: string
}

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  read: boolean
  action_url?: string
  created_at: string
}

interface Tenant {
  id: string
  name: string
  email: string
  status: "active" | "inactive" | "pending"
  subscription_plan: "basic" | "professional" | "enterprise"
  created_at: string
  last_activity: string
}

interface AIInsight {
  id: string
  type: "recommendation" | "alert" | "prediction"
  title: string
  description: string
  priority: "low" | "medium" | "high"
  action: string
  confidence: number
  created_at: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeTenants: 0,
    totalUsers: 0,
    monthlyRevenue: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    unreadNotifications: 0,
    systemHealth: 0,
    userEngagement: 0,
  })
  const [tasks, setTasks] = useState<Task[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [createTaskOpen, setCreateTaskOpen] = useState(false)
  const [addTenantOpen, setAddTenantOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userRole, setUserRole] = useState<string>("user")

  // Chart data
  const [revenueData] = useState([
    { name: "Jan", revenue: 45000, expenses: 32000 },
    { name: "Feb", revenue: 52000, expenses: 35000 },
    { name: "Mar", revenue: 48000, expenses: 33000 },
    { name: "Apr", revenue: 61000, expenses: 38000 },
    { name: "May", revenue: 55000, expenses: 36000 },
    { name: "Jun", revenue: 67000, expenses: 41000 },
  ])

  const [engagementData] = useState([
    { name: "Mon", users: 120 },
    { name: "Tue", users: 132 },
    { name: "Wed", users: 101 },
    { name: "Thu", users: 134 },
    { name: "Fri", users: 90 },
    { name: "Sat", users: 130 },
    { name: "Sun", users: 140 },
  ])

  const [taskDistribution] = useState([
    { name: "Completed", value: 45, color: "#00C49F" },
    { name: "In Progress", value: 25, color: "#0088FE" },
    { name: "Pending", value: 20, color: "#FFBB28" },
    { name: "Overdue", value: 10, color: "#FF8042" },
  ])

  useEffect(() => {
    setMounted(true)
    fetchDashboardData()
    checkUserRole()
  }, [])

  const checkUserRole = async () => {
    try {
      const supabase = createSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", user.id).single()
        if (profile) {
          setUserRole(profile.role)
        }
      }
    } catch (error) {
      console.error("Error checking user role:", error)
    }
  }

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Mock data for demonstration
      setMetrics({
        activeTenants: 156,
        totalUsers: 2847,
        monthlyRevenue: 125000,
        pendingTasks: 23,
        overdueTasks: 5,
        unreadNotifications: 12,
        systemHealth: 98,
        userEngagement: 87,
      })

      setTasks([
        {
          id: "1",
          title: "Review Q4 Performance",
          description: "Analyze quarterly metrics and prepare report",
          status: "pending",
          priority: "high",
          due_date: "2024-01-15",
          assigned_to: "admin",
          created_at: "2024-01-10",
        },
        {
          id: "2",
          title: "Update Security Protocols",
          description: "Implement new security measures",
          status: "in_progress",
          priority: "medium",
          due_date: "2024-01-20",
          assigned_to: "admin",
          created_at: "2024-01-08",
        },
      ])

      setNotifications([
        {
          id: "1",
          title: "System Update",
          message: "New features have been deployed",
          type: "info",
          read: false,
          created_at: "2024-01-10",
        },
      ])

      setAIInsights([
        {
          id: "1",
          type: "recommendation",
          title: "Optimize Resource Allocation",
          description: "AI analysis suggests reallocating 15% of resources to high-priority projects",
          priority: "high",
          action: "View Details",
          confidence: 94,
          created_at: "2024-01-10",
        },
      ])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDashboardData()
    setRefreshing(false)
    toast({
      title: "Success",
      description: "Dashboard data refreshed",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in_progress":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "overdue":
        return "bg-red-500"
      case "active":
        return "bg-green-500"
      case "inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your organization.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Bell className="h-4 w-4" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {notifications.filter((n) => !n.read).length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>Stay updated with the latest activities</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      notification.read ? "bg-muted/50" : "bg-background"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(notification.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Badge variant={notification.type === "error" ? "destructive" : "secondary"}>
                        {notification.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeTenants}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.userEngagement}%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.systemHealth}%</div>
            <Progress value={metrics.systemHealth} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Revenue Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
                <CardDescription>Monthly comparison of revenue and expenses</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stackId="2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Task Distribution */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
                <CardDescription>Current status of all tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={taskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {taskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {taskDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Task Completion Rate</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">User Satisfaction</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <Progress value={94} />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Uptime</span>
                    <span className="font-medium">99.9%</span>
                  </div>
                  <Progress value={99.9} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">AI Insights & Recommendations</h2>
            <Badge variant="outline" className="flex items-center">
              <Brain className="h-4 w-4 mr-1" />
              AI Powered
            </Badge>
          </div>

          <div className="grid gap-4">
            {aiInsights.map((insight) => (
              <Card key={insight.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      {insight.type === "recommendation" && <Target className="h-5 w-5 mr-2 text-blue-500" />}
                      {insight.type === "alert" && <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />}
                      {insight.type === "prediction" && <Zap className="h-5 w-5 mr-2 text-yellow-500" />}
                      {insight.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
                      <Badge variant="outline">{insight.confidence}% confidence</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Generated {new Date(insight.created_at).toLocaleDateString()}
                    </p>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      {insight.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
