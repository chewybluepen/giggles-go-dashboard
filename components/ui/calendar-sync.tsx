"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
// Note: DropdownMenu components would need to be implemented or imported from a UI library
import {
  Calendar,
  CalendarPlus,
  Clock,
  MapPin,
  Bell,
  Download,
  Smartphone,
  Monitor,
  ChevronDown,
  Check,
  ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: number
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
  organizer: string
  url?: string
}

interface CalendarSyncProps {
  event: CalendarEvent
  onSync?: (provider: string) => void
  className?: string
}

// Calendar providers configuration
const calendarProviders = [
  {
    id: "google",
    name: "Google Calendar",
    icon: "🗓️",
    color: "text-blue-600",
    description: "Add to Google Calendar"
  },
  {
    id: "outlook",
    name: "Outlook",
    icon: "📅",
    color: "text-blue-800",
    description: "Add to Outlook Calendar"
  },
  {
    id: "apple",
    name: "Apple Calendar",
    icon: "🍎",
    color: "text-gray-800",
    description: "Add to Apple Calendar"
  },
  {
    id: "yahoo",
    name: "Yahoo Calendar",
    icon: "💜",
    color: "text-purple-600",
    description: "Add to Yahoo Calendar"
  },
  {
    id: "ics",
    name: "Download ICS",
    icon: "💾",
    color: "text-green-600",
    description: "Download calendar file"
  }
]

export function CalendarSync({ event, onSync, className }: CalendarSyncProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [syncedProviders, setSyncedProviders] = useState<string[]>([])

  // Format date for different calendar providers
  const formatDateForProvider = (date: Date, provider: string) => {
    switch (provider) {
      case "google":
      case "yahoo":
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
      case "outlook":
        return date.toISOString()
      default:
        return date.toISOString()
    }
  }

  // Generate calendar URLs
  const generateCalendarUrl = (provider: string) => {
    const startDate = formatDateForProvider(event.startDate, provider)
    const endDate = formatDateForProvider(event.endDate, provider)
    const title = encodeURIComponent(event.title)
    const description = encodeURIComponent(event.description)
    const location = encodeURIComponent(event.location)

    switch (provider) {
      case "google":
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}&sf=true&output=xml`
      
      case "outlook":
        return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startDate}&enddt=${endDate}&body=${description}&location=${location}`
      
      case "yahoo":
        return `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${title}&st=${startDate}&et=${endDate}&desc=${description}&in_loc=${location}`
      
      default:
        return ""
    }
  }

  // Generate ICS file content
  const generateICSContent = () => {
    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Giggles & Go GY//Event Calendar//EN",
      "BEGIN:VEVENT",
      `UID:${event.id}@gigglesandgo.gy`,
      `DTSTART:${formatICSDate(event.startDate)}`,
      `DTEND:${formatICSDate(event.endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      `ORGANIZER:CN=${event.organizer}`,
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Event reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n")

    return icsContent
  }

  // Download ICS file
  const downloadICS = () => {
    const icsContent = generateICSContent()
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${event.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle calendar sync
  const handleSync = async (provider: string) => {
    setIsLoading(provider)
    
    try {
      if (provider === "ics") {
        downloadICS()
      } else if (provider === "apple") {
        // For Apple Calendar, we'll download ICS as it's the most compatible method
        downloadICS()
      } else {
        const url = generateCalendarUrl(provider)
        window.open(url, "_blank", "width=600,height=600")
      }
      
      // Mark as synced
      setSyncedProviders(prev => [...prev, provider])
      onSync?.(provider)
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Calendar sync error:", error)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <Card className={cn("cultural-pattern border-guyana-green/20", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-guyana-black dark:text-guyana-white">
          <Calendar className="h-5 w-5 text-guyana-green" />
          Add to Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Event Summary */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">{event.title}</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {event.startDate.toLocaleDateString()} at {event.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Quick Add Button */}
        <Button
          className="w-full bg-guyana-green hover:bg-forest-emerald text-guyana-white tropical-hover"
          onClick={() => handleSync("google")}
        >
          <CalendarPlus className="h-4 w-4 mr-2" />
          Add to Calendar
        </Button>

        {/* Individual Provider Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {calendarProviders.slice(0, 4).map((provider) => (
            <Button
              key={provider.id}
              variant="outline"
              size="sm"
              onClick={() => handleSync(provider.id)}
              disabled={isLoading === provider.id}
              className={cn(
                "flex items-center gap-2 tropical-hover",
                syncedProviders.includes(provider.id) && "border-green-500 bg-green-50 dark:bg-green-950"
              )}
            >
              <span>{provider.icon}</span>
              <span className="text-xs">{provider.name.split(" ")[0]}</span>
              {syncedProviders.includes(provider.id) && (
                <Check className="h-3 w-3 text-green-600" />
              )}
              {isLoading === provider.id && (
                <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
              )}
            </Button>
          ))}
        </div>

        {/* Sync Status */}
        {syncedProviders.length > 0 && (
          <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950 rounded-lg">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700 dark:text-green-300">
              Added to {syncedProviders.length} calendar{syncedProviders.length > 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* Help Text */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-2">
            <Smartphone className="h-3 w-3" />
            <span>Works on mobile and desktop</span>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="h-3 w-3" />
            <span>Automatic reminders included</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Hook for calendar sync functionality
export function useCalendarSync() {
  const [syncHistory, setSyncHistory] = useState<Array<{
    eventId: number
    provider: string
    timestamp: Date
  }>>([])

  const recordSync = (eventId: number, provider: string) => {
    setSyncHistory(prev => [...prev, {
      eventId,
      provider,
      timestamp: new Date()
    }])
  }

  const getSyncHistory = (eventId?: number) => {
    if (eventId) {
      return syncHistory.filter(sync => sync.eventId === eventId)
    }
    return syncHistory
  }

  return {
    recordSync,
    getSyncHistory,
    syncHistory
  }
}
