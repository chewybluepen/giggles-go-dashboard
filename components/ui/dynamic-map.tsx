"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  MapPin, 
  Search, 
  Navigation, 
  Layers, 
  Maximize2, 
  Calendar,
  Clock,
  Users,
  Star
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MapEvent {
  id: number
  title: string
  location: string
  coordinates: [number, number] // [lat, lng]
  date: string
  time: string
  ageRange: string
  attendees: number
  rating: number
  category: string
  description: string
}

interface DynamicMapProps {
  events: MapEvent[]
  onEventSelect?: (event: MapEvent) => void
  className?: string
  height?: string
}

export function DynamicMap({ 
  events, 
  onEventSelect, 
  className, 
  height = "400px" 
}: DynamicMapProps) {
  const [selectedEvent, setSelectedEvent] = useState<MapEvent | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([6.8013, -58.1551]) // Georgetown, Guyana
  const [zoom, setZoom] = useState(12)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ]
          setUserLocation(coords)
          setMapCenter(coords)
        },
        (error) => {
          console.log("Geolocation error:", error)
          // Default to Georgetown, Guyana if geolocation fails
        }
      )
    }
  }, [])

  // Filter events based on search
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle event marker click
  const handleEventClick = (event: MapEvent) => {
    setSelectedEvent(event)
    setMapCenter(event.coordinates)
    setZoom(15)
    onEventSelect?.(event)
  }

  // Calculate distance between two coordinates (simplified)
  const calculateDistance = (coord1: [number, number], coord2: [number, number]) => {
    const R = 6371 // Earth's radius in km
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Center map on user location
  const centerOnUser = () => {
    if (userLocation) {
      setMapCenter(userLocation)
      setZoom(15)
    }
  }

  return (
    <div className={cn(
      "relative",
      isFullscreen && "fixed inset-0 z-50 bg-background",
      className
    )}>
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search events or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/95 backdrop-blur-sm border-guyana-green/20 focus:border-guyana-green"
          />
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={centerOnUser}
          className="bg-white/95 backdrop-blur-sm border-0 shadow-lg tropical-hover"
          title="Center on my location"
        >
          <Navigation className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullscreen}
          className="bg-white/95 backdrop-blur-sm border-0 shadow-lg tropical-hover"
          title="Toggle fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-tropical-teal/20 to-guyana-green/20 cultural-pattern"
        style={{ height: isFullscreen ? "100vh" : height }}
      >
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20">
          {/* Grid pattern to simulate map */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-gray-300 dark:border-gray-600" />
              ))}
            </div>
          </div>

          {/* User Location Marker */}
          {userLocation && (
            <div 
              className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-tropical-pulse"
              style={{
                left: `${50 + (userLocation[1] - mapCenter[1]) * 1000}%`,
                top: `${50 + (mapCenter[0] - userLocation[0]) * 1000}%`,
                transform: 'translate(-50%, -50%)'
              }}
              title="Your location"
            />
          )}

          {/* Event Markers */}
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${50 + (event.coordinates[1] - mapCenter[1]) * 1000}%`,
                top: `${50 + (mapCenter[0] - event.coordinates[0]) * 1000}%`
              }}
              onClick={() => handleEventClick(event)}
            >
              <div className={cn(
                "w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-all duration-300 hover:scale-110",
                selectedEvent?.id === event.id 
                  ? "bg-guyana-red animate-tropical-pulse scale-110" 
                  : "bg-guyana-green hover:bg-forest-emerald"
              )}>
                <MapPin className="h-4 w-4" />
              </div>
              
              {/* Event tooltip */}
              <div className={cn(
                "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-all duration-300",
                selectedEvent?.id === event.id ? "opacity-100 visible" : "opacity-0 invisible"
              )}>
                <Card className="w-64 shadow-xl border-guyana-green/20">
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm leading-tight">{event.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{event.attendees} attending</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          <span>{event.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event List Sidebar (when fullscreen) */}
      {isFullscreen && (
        <div className="absolute left-4 top-20 bottom-4 w-80 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-guyana-black">Events Near You</h3>
            <p className="text-sm text-muted-foreground">{filteredEvents.length} events found</p>
          </div>
          <div className="overflow-y-auto h-full pb-20">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "p-4 border-b cursor-pointer transition-colors hover:bg-guyana-green/5",
                  selectedEvent?.id === event.id && "bg-guyana-green/10"
                )}
                onClick={() => handleEventClick(event)}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {event.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{event.location}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
