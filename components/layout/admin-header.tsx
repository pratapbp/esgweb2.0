"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings, User, LogOut, Shield, Activity, AlertTriangle, CheckCircle, Clock, Home } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  timestamp: string
  read: boolean
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Application",
    message: "Application received for Senior Software Engineer position",
    type: "info",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    title: "LCA Certified",
    message: "Labor Condition Application I-200-24001-123456 has been certified",
    type: "success",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "System Alert",
    message: "Database backup completed successfully",
    type: "success",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    title: "Compliance Check",
    message: "Monthly DOL compliance audit is due in 3 days",
    type: "warning",
    timestamp: "1 day ago",
    read: true,
  },
]

export function AdminHeader() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return <Bell className="h-4 w-4 text-blue-400" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
      <div className="flex h-full items-center justify-between px-6">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">ESG Admin</h1>
              <p className="text-xs text-gray-400">Executive Software Guild</p>
            </div>
          </Link>
        </div>

        {/* System Status Indicators */}
        <div className="hidden md:flex items-center gap-3">
          <Badge variant="outline" className="border-green-600/30 text-green-400">
            <Activity className="h-3 w-3 mr-1" />
            System Healthy
          </Badge>
          <Badge variant="outline" className="border-blue-600/30 text-blue-400">
            <Clock className="h-3 w-3 mr-1" />
            All Services Online
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Actions */}
          <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Main Site</span>
            </Link>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-white">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-gray-900 border-gray-800">
              <DropdownMenuLabel className="flex items-center justify-between text-white">
                Notifications
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    Mark all read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 cursor-pointer ${
                      !notification.read ? "bg-gray-800/50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{notification.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                    </div>
                    {!notification.read && <div className="h-2 w-2 rounded-full bg-cyan-400 mt-2"></div>}
                  </DropdownMenuItem>
                ))}
              </div>
              {notifications.length === 0 && (
                <div className="p-4 text-center text-gray-400 text-sm">No notifications</div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                  <AvatarFallback className="bg-cyan-600 text-white">AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800" align="end" forceMount>
              <DropdownMenuLabel className="font-normal text-white">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-gray-400">admin@esgit.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
