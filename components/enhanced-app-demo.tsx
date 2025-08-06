"use client"

import React, { useState } from "react"
import { InteractiveCarousel } from "@/components/ui/interactive-carousel"
import { FilterSliders } from "@/components/ui/filter-sliders"
import { DynamicMap } from "@/components/ui/dynamic-map"
import { EnhancedEventCard } from "@/components/ui/enhanced-event-card"
import { SuccessBanner, useSuccessBanner } from "@/components/ui/success-banner"
import { CalendarSync } from "@/components/ui/calendar-sync"
import { EventSubmissionForm } from "@/components/ui/event-submission-form"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { OptimizedImage, LazyComponent } from "@/components/ui/optimized-image"
import { EventCardSkeleton, MapSkeleton, CarouselSkeleton } from "@/components/ui/loading-states"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for demonstration
const carouselItems = [
  {
    id: 1,
    title: "Georgetown Heritage Festival",
    subtitle: "Cultural Celebration",
    description: "Experience the rich cultural heritage of Georgetown with traditional music, dance, and local cuisine.",
    image: "/images/georgetown-festival.jpg",
    badge: "Featured",
    action: {
      label: "Learn More",
      onClick: () => console.log("Georgetown Festival clicked")
    }
  },
  {
    id: 2,
    title: "Kaieteur Falls Adventure",
    subtitle: "Nature Expedition",
    description: "Join us for an unforgettable journey to one of the world's most spectacular waterfalls.",
    image: "/images/kaieteur-falls.jpg",
    badge: "Adventure",
    badgeVariant: "secondary" as const,
    action: {
      label: "Book Now",
      onClick: () => console.log("Kaieteur Falls clicked")
    }
  },
  {
    id: 3,
    title: "Mashramani Carnival",
    subtitle: "National Celebration",
    description: "Celebrate Guyana's Republic Day with vibrant parades, music, and traditional festivities.",
    image: "/images/mashramani.jpg",
    badge: "Popular",
    badgeVariant: "destructive" as const,
    action: {
      label: "Join Celebration",
      onClick: () => console.log("Mashramani clicked")
    }
  }
]

const sampleEvents = [
  {
    id: 1,
    title: "Children's Art Workshop",
    description: "Creative art session for kids aged 5-12",
    longDescription: "Join us for an exciting art workshop where children can explore their creativity through various mediums including painting, drawing, and crafts. Professional art instructors will guide participants through fun projects while learning basic art techniques.",
    image: "/images/art-workshop.jpg",
    location: "Georgetown Community Center",
    date: "2025-01-15",
    time: "10:00 AM",
    ageRange: "5-12",
    price: "Free",
    category: "Arts & Crafts",
    attendees: 25,
    maxAttendees: 30,
    rating: 4.8,
    totalReviews: 12,
    organizer: {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/images/organizer-sarah.jpg",
      bio: "Professional art teacher with 10+ years experience working with children",
      eventsHosted: 25,
      rating: 4.9,
      verified: true
    },
    reviews: [
      {
        id: 1,
        author: "Maria Santos",
        avatar: "/images/reviewer-maria.jpg",
        rating: 5,
        comment: "My daughter loved this workshop! Great activities and very well organized.",
        date: "2 days ago",
        helpful: 8
      }
    ],
    tags: ["Creative", "Educational", "Indoor"],
    isRecommended: true,
    isSaved: false,
    isRegistered: false
  }
]

const mapEvents = [
  {
    id: 1,
    title: "Georgetown Market Tour",
    location: "Stabroek Market",
    coordinates: [6.8077, -58.1651] as [number, number],
    date: "2025-01-20",
    time: "9:00 AM",
    ageRange: "All ages",
    attendees: 15,
    rating: 4.5,
    category: "Cultural",
    description: "Explore the vibrant Stabroek Market with a guided tour"
  },
  {
    id: 2,
    title: "Botanical Gardens Walk",
    location: "Georgetown Botanical Gardens",
    coordinates: [6.8147, -58.1548] as [number, number],
    date: "2025-01-22",
    time: "7:00 AM",
    ageRange: "All ages",
    attendees: 20,
    rating: 4.7,
    category: "Nature",
    description: "Morning nature walk through the beautiful botanical gardens"
  }
]

const calendarEvent = {
  id: 1,
  title: "Children's Art Workshop",
  description: "Creative art session for kids aged 5-12 at Georgetown Community Center",
  location: "Georgetown Community Center, Georgetown, Guyana",
  startDate: new Date("2025-01-15T10:00:00"),
  endDate: new Date("2025-01-15T12:00:00"),
  organizer: "Sarah Johnson",
  url: "https://gigglesandgo.gy/events/1"
}

export function EnhancedAppDemo() {
  const [activeTab, setActiveTab] = useState("home")
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 18])
  const [distance, setDistance] = useState(25)
  const [isLoading, setIsLoading] = useState(false)
  const { showBanner, BannerContainer } = useSuccessBanner()

  const handleEventSave = (eventId: number) => {
    showBanner("save", "Event Saved!", "Added to your saved events list", {
      label: "View Saved",
      onClick: () => setActiveTab("saved")
    })
  }

  const handleEventRegister = (eventId: number) => {
    showBanner("registration", "Registration Successful!", "You're all set for this event", {
      label: "Add to Calendar",
      onClick: () => setActiveTab("calendar")
    })
  }

  const handleEventShare = (eventId: number) => {
    showBanner("share", "Event Shared!", "Link copied to clipboard")
  }

  const handleCalendarSync = (provider: string) => {
    showBanner("general", "Calendar Updated!", `Event added to ${provider}`)
  }

  const handleFormSubmit = (data: any) => {
    showBanner("achievement", "Event Submitted!", "Your event is under review and will be published soon", {
      label: "View Status",
      onClick: () => console.log("View submission status")
    })
  }

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 cultural-pattern">
      <BannerContainer />
      
      <div className="container mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold guyanese-gradient bg-clip-text text-transparent">
            Giggles & Go GY
          </h1>
          <p className="text-lg text-muted-foreground">
            Enhanced with Modern Guyanese Cultural Design
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="home" className="tropical-hover">Home</TabsTrigger>
            <TabsTrigger value="map" className="tropical-hover">Map</TabsTrigger>
            <TabsTrigger value="filters" className="tropical-hover">Filters</TabsTrigger>
            <TabsTrigger value="calendar" className="tropical-hover">Calendar</TabsTrigger>
            <TabsTrigger value="submit" className="tropical-hover">Submit</TabsTrigger>
            <TabsTrigger value="settings" className="tropical-hover">Settings</TabsTrigger>
          </TabsList>

          {/* Home Tab - Interactive Carousel */}
          <TabsContent value="home" className="space-y-6">
            <Card className="cultural-pattern border-guyana-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-guyana-black dark:text-guyana-white">
                  ✨ Featured Events & Cultural Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <CarouselSkeleton />
                ) : (
                  <InteractiveCarousel
                    items={carouselItems}
                    autoPlay={true}
                    autoPlayInterval={4000}
                    className="mb-6"
                  />
                )}
                <Button 
                  onClick={simulateLoading}
                  variant="outline"
                  className="w-full tropical-hover"
                >
                  Refresh Featured Content
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Event Cards */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-guyana-black dark:text-guyana-white">
                Upcoming Events
              </h2>
              {isLoading ? (
                <EventCardSkeleton />
              ) : (
                <LazyComponent fallback={<EventCardSkeleton />}>
                  {sampleEvents.map((event) => (
                    <EnhancedEventCard
                      key={event.id}
                      event={event}
                      onSave={handleEventSave}
                      onRegister={handleEventRegister}
                      onShare={handleEventShare}
                      className="mb-4"
                    />
                  ))}
                </LazyComponent>
              )}
            </div>
          </TabsContent>

          {/* Map Tab - Dynamic Map */}
          <TabsContent value="map" className="space-y-6">
            <Card className="cultural-pattern border-tropical-teal/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-guyana-black dark:text-guyana-white">
                  🗺️ Interactive Event Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <MapSkeleton height="500px" />
                ) : (
                  <DynamicMap
                    events={mapEvents}
                    onEventSelect={(event) => console.log("Selected event:", event)}
                    height="500px"
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Filters Tab - Age and Distance Sliders */}
          <TabsContent value="filters" className="space-y-6">
            <FilterSliders
              onAgeRangeChange={setAgeRange}
              onDistanceChange={setDistance}
              initialAgeRange={ageRange}
              initialDistance={distance}
            />
            
            <Card className="cultural-pattern">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Current Filters:</h3>
                <p className="text-sm text-muted-foreground">
                  Age Range: {ageRange[0]}-{ageRange[1]} years | Distance: {distance} km
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab - Calendar Sync */}
          <TabsContent value="calendar" className="space-y-6">
            <CalendarSync
              event={calendarEvent}
              onSync={handleCalendarSync}
            />
          </TabsContent>

          {/* Submit Tab - Event Submission Form */}
          <TabsContent value="submit" className="space-y-6">
            <EventSubmissionForm
              onSubmit={handleFormSubmit}
              onDraft={(data) => console.log("Draft saved:", data)}
            />
          </TabsContent>

          {/* Settings Tab - Theme Switcher */}
          <TabsContent value="settings" className="space-y-6">
            <ThemeSwitcher showCulturalVariants={true} />
          </TabsContent>
        </Tabs>

        {/* Demo Actions */}
        <Card className="cultural-pattern border-golden-amber/20">
          <CardHeader>
            <CardTitle className="text-guyana-black dark:text-guyana-white">
              🎯 Demo Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => showBanner("registration", "Demo Success!", "Registration banner triggered")}
              className="bg-guyana-green hover:bg-forest-emerald text-guyana-white tropical-hover"
            >
              Test Registration
            </Button>
            <Button
              onClick={() => showBanner("save", "Demo Success!", "Save banner triggered")}
              className="bg-guyana-red hover:bg-red-600 text-guyana-white tropical-hover"
            >
              Test Save
            </Button>
            <Button
              onClick={() => showBanner("achievement", "Demo Success!", "Achievement unlocked!")}
              className="bg-golden-amber hover:bg-yellow-600 text-guyana-black tropical-hover"
            >
              Test Achievement
            </Button>
            <Button
              onClick={simulateLoading}
              variant="outline"
              className="border-tropical-teal text-tropical-teal hover:bg-tropical-teal/10 tropical-hover"
            >
              Toggle Loading
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
