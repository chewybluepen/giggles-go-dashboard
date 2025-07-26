"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Menu,
  Heart,
  MapPin,
  Calendar,
  Clock,
  Star,
  Home,
  Map,
  Bookmark,
  User,
  Settings,
  ArrowLeft,
  Plus,
  Edit3,
  ChevronRight,
  Bell,
  Shield,
  Globe,
  Smartphone,
  HelpCircle,
  LogOut,
  Camera,
  Lock,
  Eye,
  MessageSquare,
  Share2,
  Check,
  X,
  Send,
  Phone,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Image from "next/image"

// Mock data for events with real images
const mockEvents = [
  {
    id: 1,
    title: "Georgetown Children's Festival",
    date: "Dec 28, 2024",
    time: "10:00 AM",
    location: "National Park, Georgetown",
    image: "/images/georgetown-festival.jpg",
    category: "Weekend Highlights",
    isFree: true,
    isRecommended: true,
    description:
      "Join us for a day of fun activities, local music, and traditional Guyanese games for children of all ages.",
    ageRange: "3-12 years",
    organizer: "Georgetown City Council",
    registrationStatus: "open",
  },
  {
    id: 2,
    title: "Kaieteur Falls Nature Walk",
    date: "Dec 29, 2024",
    time: "8:00 AM",
    location: "Kaieteur National Park",
    image: "/images/nature-walk.jpg",
    category: "Recommended",
    isFree: false,
    isRecommended: true,
    description: "Educational nature walk suitable for families with children to explore Guyana's natural wonders.",
    ageRange: "6+ years",
    organizer: "Guyana Tourism Authority",
    registrationStatus: "open",
  },
  {
    id: 3,
    title: "Library Story Time",
    date: "Dec 30, 2024",
    time: "3:00 PM",
    location: "National Library, Georgetown",
    image: "/images/library-story.jpg",
    category: "Top Free",
    isFree: true,
    isRecommended: false,
    description: "Interactive storytelling session featuring local Guyanese folktales and children's books.",
    ageRange: "2-8 years",
    organizer: "National Library of Guyana",
    registrationStatus: "open",
  },
  {
    id: 4,
    title: "Craft Workshop at Community Center",
    date: "Jan 2, 2025",
    time: "2:00 PM",
    location: "Kitty Community Center",
    image: "/images/craft-workshop.jpg",
    category: "Weekend Highlights",
    isFree: true,
    isRecommended: true,
    description: "Learn traditional Guyanese crafts and create beautiful artwork to take home.",
    ageRange: "4-14 years",
    organizer: "Kitty Community Group",
    registrationStatus: "open",
  },
  {
    id: 5,
    title: "Splash Park Opening",
    date: "Jan 3, 2025",
    time: "9:00 AM",
    location: "Bourda Green, Georgetown",
    image: "/images/splash-park.jpg",
    category: "Top Free",
    isFree: true,
    isRecommended: false,
    description: "Grand opening of the new splash park with water games and activities for children.",
    ageRange: "1-12 years",
    organizer: "Georgetown Parks Department",
    registrationStatus: "open",
  },
  {
    id: 6,
    title: "Saturday Family Fun Day",
    date: "Jan 4, 2025",
    time: "11:00 AM",
    location: "Promenade Gardens, Georgetown",
    image: "/images/georgetown-festival.jpg",
    category: "Weekend Highlights",
    isFree: false,
    isRecommended: false,
    description: "Weekend family activities with games, food stalls, and entertainment for all ages.",
    ageRange: "All ages",
    organizer: "Georgetown Recreation Club",
    registrationStatus: "open",
  },
  {
    id: 7,
    title: "Free Puppet Show",
    date: "Jan 5, 2025",
    time: "4:00 PM",
    location: "Cultural Center, New Amsterdam",
    image: "/images/library-story.jpg",
    category: "Top Free",
    isFree: true,
    isRecommended: false,
    description: "Traditional Guyanese puppet show featuring local folklore and stories.",
    ageRange: "3-10 years",
    organizer: "Berbice Cultural Society",
    registrationStatus: "open",
  },
  {
    id: 8,
    title: "Educational Science Fair",
    date: "Jan 6, 2025",
    time: "1:00 PM",
    location: "University of Guyana",
    image: "/images/craft-workshop.jpg",
    category: "Recommended",
    isFree: false,
    isRecommended: true,
    description: "Interactive science experiments and demonstrations perfect for curious young minds.",
    ageRange: "8-16 years",
    organizer: "UG Science Department",
    registrationStatus: "open",
  },
]

const filterChips = [
  { id: "weekend", label: "Weekend Highlights", category: "Weekend Highlights" },
  { id: "free", label: "Top Free", category: "Top Free" },
  { id: "recommended", label: "Recommended", category: "Recommended" },
]

const languages = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Español" },
  { value: "creole", label: "Guyanese Creole" },
]

export default function GigglesGoApp() {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [savedEvents, setSavedEvents] = useState<number[]>([1, 3])
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([])
  const [eventQuestions, setEventQuestions] = useState<{ [key: number]: string }>({})
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState("")
  const [questionText, setQuestionText] = useState("")

  const [userProfile, setUserProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    children: [
      { name: "Emma", age: 6 },
      { name: "Liam", age: 9 },
    ],
    location: "Georgetown, Guyana",
    phone: "+592-123-4567",
  })

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editedProfile, setEditedProfile] = useState(userProfile)

  // Settings state with more comprehensive options
  const [settings, setSettings] = useState({
    notifications: {
      pushNotifications: true,
      emailNotifications: false,
      eventReminders: true,
      newEvents: true,
      weeklyDigest: false,
    },
    privacy: {
      locationServices: true,
      shareActivity: false,
      publicProfile: false,
    },
    app: {
      darkMode: false,
      language: "english",
      autoPlay: true,
      soundEffects: true,
    },
  })

  // Show success messages temporarily
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => setShowSuccessMessage(""), 3000)
      return () => clearTimeout(timer)
    }
  }, [showSuccessMessage])

  const toggleSaveEvent = (eventId: number) => {
    setSavedEvents((prev) => {
      const newSaved = prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
      setShowSuccessMessage(prev.includes(eventId) ? "Event removed from saved" : "Event saved successfully!")
      return newSaved
    })
  }

  const updateSetting = (category: string, key: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
    setShowSuccessMessage("Settings updated successfully!")
  }

  const registerForEvent = (eventId: number) => {
    setRegisteredEvents((prev) => [...prev, eventId])
    setShowSuccessMessage("Registration successful! Confirmation email sent.")
  }

  const submitQuestion = (eventId: number, question: string) => {
    setEventQuestions((prev) => ({ ...prev, [eventId]: question }))
    setShowSuccessMessage("Question sent to organizer. They'll respond within 24 hours.")
  }

  const shareEvent = (event: any) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(`Check out this event: ${event.title} - ${window.location.href}`)
      setShowSuccessMessage("Event link copied to clipboard!")
    }
  }

  const submitFeedback = () => {
    if (feedbackMessage.trim()) {
      setShowSuccessMessage("Thank you for your feedback! We'll review it shortly.")
      setFeedbackMessage("")
    }
  }

  const getFilteredEvents = () => {
    if (!activeFilter) return mockEvents
    return mockEvents.filter((event) => {
      switch (activeFilter) {
        case "weekend":
          return event.category === "Weekend Highlights"
        case "free":
          return event.category === "Top Free"
        case "recommended":
          return event.category === "Recommended"
        default:
          return true
      }
    })
  }

  const getSavedEvents = () => {
    return mockEvents.filter((event) => savedEvents.includes(event.id))
  }

  const getLanguageLabel = (langCode: string) => {
    return languages.find((lang) => lang.value === langCode)?.label || "English"
  }

  const renderTopBar = (title?: string, showBack?: boolean) => (
    <div
      className={`flex items-center justify-between p-4 ${settings.app.darkMode ? "bg-gray-800 text-white" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"}`}
    >
      <div className="flex items-center gap-3">
        {showBack ? (
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 transition-colors"
            onClick={() => setCurrentScreen("home")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        ) : (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 transition-colors">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={`w-80 ${settings.app.darkMode ? "bg-gray-900" : "bg-gradient-to-b from-purple-50 to-pink-50"}`}
            >
              <div className="py-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    G&G
                  </div>
                  <div>
                    <h2 className={`font-bold text-lg ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                      Giggles & Go GY
                    </h2>
                    <p className={`text-sm ${settings.app.darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Family Fun Finder
                    </p>
                  </div>
                </div>
                <nav className="space-y-2">
                  {[
                    { screen: "home", icon: Home, label: "Home Dashboard" },
                    { screen: "events", icon: Calendar, label: "All Events" },
                    { screen: "map", icon: Map, label: "Event Map" },
                    { screen: "saved", icon: Bookmark, label: "Saved Events" },
                    { screen: "profile", icon: User, label: "Family Profile" },
                    { screen: "settings", icon: Settings, label: "Settings" },
                  ].map(({ screen, icon: Icon, label }) => (
                    <Button
                      key={screen}
                      variant="ghost"
                      className={`w-full justify-start transition-colors ${
                        settings.app.darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-purple-100"
                      }`}
                      onClick={() => {
                        setCurrentScreen(screen)
                        setIsMenuOpen(false)
                      }}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      {label}
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        )}
        <h1 className="text-lg font-bold">{title || "Giggles & Go GY"}</h1>
      </div>
      <Avatar
        className="h-8 w-8 border-2 border-white cursor-pointer hover:scale-105 transition-transform"
        onClick={() => setCurrentScreen("profile")}
      >
        <AvatarImage src="/images/woman-profile.png" />
        <AvatarFallback className="bg-white text-purple-500 text-sm font-bold">SJ</AvatarFallback>
      </Avatar>
    </div>
  )

  const renderBottomNav = () => (
    <div
      className={`fixed bottom-0 left-0 right-0 border-t px-4 py-2 backdrop-blur-sm ${
        settings.app.darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex justify-around items-center max-w-sm mx-auto">
        {[
          { screen: "home", icon: Home, label: "Home" },
          { screen: "map", icon: Map, label: "Map" },
          { screen: "saved", icon: Bookmark, label: "Saved" },
          { screen: "profile", icon: User, label: "Profile" },
          { screen: "settings", icon: Settings, label: "Settings" },
        ].map(({ screen, icon: Icon, label }) => (
          <Button
            key={screen}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 transition-all ${
              currentScreen === screen
                ? "text-purple-500 scale-105"
                : settings.app.darkMode
                  ? "text-gray-400 hover:text-purple-400"
                  : "text-gray-500 hover:text-purple-400"
            }`}
            onClick={() => setCurrentScreen(screen)}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  )

  const renderSuccessMessage = () => {
    if (!showSuccessMessage) return null

    return (
      <div className="fixed top-20 left-4 right-4 z-50 bg-green-500 text-white p-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top">
        <Check className="h-4 w-4" />
        <span className="text-sm">{showSuccessMessage}</span>
      </div>
    )
  }

  const renderEventCard = (event: any, showSaveButton = true) => (
    <Card
      key={event.id}
      className={`mb-4 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${
        settings.app.darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
      }`}
      onClick={() => {
        setSelectedEvent(event)
        setCurrentScreen("event-details")
      }}
    >
      <div className="relative">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        {showSaveButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white transition-all hover:scale-110"
            onClick={(e) => {
              e.stopPropagation()
              toggleSaveEvent(event.id)
            }}
          >
            <Heart
              className={`h-4 w-4 transition-all ${
                savedEvents.includes(event.id)
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-gray-600 hover:text-red-400"
              }`}
            />
          </Button>
        )}
        {event.isFree && <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">FREE</Badge>}
        {registeredEvents.includes(event.id) && (
          <Badge className="absolute bottom-2 right-2 bg-blue-500">REGISTERED</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className={`font-bold text-lg mb-2 ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
          {event.title}
        </h3>
        <div
          className={`flex items-center gap-2 text-sm mb-1 ${settings.app.darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          <Calendar className="h-4 w-4" />
          <span>{event.date}</span>
          <Clock className="h-4 w-4 ml-2" />
          <span>{event.time}</span>
        </div>
        <div
          className={`flex items-center gap-2 text-sm mb-2 ${settings.app.darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <p className={`text-sm line-clamp-2 ${settings.app.darkMode ? "text-gray-400" : "text-gray-700"}`}>
          {event.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <Badge variant="outline" className="text-xs">
            Ages {event.ageRange}
          </Badge>
          {event.isRecommended && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-xs">Recommended</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const renderHomeScreen = () => (
    <div
      className={`min-h-screen ${settings.app.darkMode ? "bg-gray-900" : "bg-gradient-to-b from-purple-50 to-pink-50"}`}
    >
      {renderTopBar()}
      {renderSuccessMessage()}

      <div className="p-4 pb-20">
        {/* Search Bar */}
        <div className="mb-6">
          <div
            className="relative cursor-pointer transform hover:scale-[1.02] transition-transform"
            onClick={() => setCurrentScreen("events")}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search events…"
              className={`pl-10 py-3 border-2 rounded-xl shadow-sm ${
                settings.app.darkMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-purple-200 focus:border-purple-400"
              }`}
              readOnly
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {filterChips.map((chip) => (
              <Button
                key={chip.id}
                variant={activeFilter === chip.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap rounded-full transition-all duration-300 ${
                  activeFilter === chip.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                    : settings.app.darkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:scale-105"
                      : "border-purple-200 text-purple-600 hover:bg-purple-50 hover:scale-105"
                }`}
                onClick={() => setActiveFilter(activeFilter === chip.id ? null : chip.id)}
              >
                {chip.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Event Feed */}
        <div className="space-y-4">
          <h2 className={`text-xl font-bold mb-4 ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
            {activeFilter ? `${filterChips.find((f) => f.id === activeFilter)?.label} Events` : "Upcoming Events"}
          </h2>
          {getFilteredEvents().map((event) => renderEventCard(event))}
        </div>
      </div>

      {renderBottomNav()}
    </div>
  )

  const renderEventsScreen = () => (
    <div
      className={`min-h-screen ${settings.app.darkMode ? "bg-gray-900" : "bg-gradient-to-b from-purple-50 to-pink-50"}`}
    >
      {renderTopBar("All Events", true)}
      {renderSuccessMessage()}

      <div className="p-4 pb-20">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search events…"
              className={`pl-10 py-3 border-2 rounded-xl shadow-sm ${
                settings.app.darkMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-purple-200 focus:border-purple-400"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* All Events */}
        <div className="space-y-4">
          {mockEvents
            .filter(
              (event) =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((event) => renderEventCard(event))}
        </div>
      </div>

      {renderBottomNav()}
    </div>
  )

  const renderEventDetails = () => {
    return (
      <div className={`min-h-screen ${settings.app.darkMode ? "bg-gray-900" : "bg-white"}`}>
        {renderTopBar(selectedEvent?.title, true)}
        {renderSuccessMessage()}

        <div className="pb-20">
          <div className="relative">
            <Image
              src={selectedEvent?.image || ""}
              alt={selectedEvent?.title || ""}
              width={375}
              height={250}
              className="w-full h-64 object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white transition-all hover:scale-110"
              onClick={() => toggleSaveEvent(selectedEvent?.id)}
            >
              <Heart
                className={`h-5 w-5 transition-all ${
                  savedEvents.includes(selectedEvent?.id)
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-gray-600 hover:text-red-400"
                }`}
              />
            </Button>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className={`text-2xl font-bold ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                {selectedEvent?.title}
              </h1>
              <div className="flex gap-2">
                {selectedEvent?.isFree && <Badge className="bg-green-500 hover:bg-green-600">FREE</Badge>}
                {registeredEvents.includes(selectedEvent?.id) && <Badge className="bg-blue-500">REGISTERED</Badge>}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className={`flex items-center gap-3 ${settings.app.darkMode ? "text-gray-300" : "text-gray-600"}`}>
                <Calendar className="h-5 w-5" />
                <span>
                  {selectedEvent?.date} at {selectedEvent?.time}
                </span>
              </div>
              <div className={`flex items-center gap-3 ${settings.app.darkMode ? "text-gray-300" : "text-gray-600"}`}>
                <MapPin className="h-5 w-5" />
                <span>{selectedEvent?.location}</span>
              </div>
              <div className={`flex items-center gap-3 ${settings.app.darkMode ? "text-gray-300" : "text-gray-600"}`}>
                <User className="h-5 w-5" />
                <span>Ages {selectedEvent?.ageRange}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className={`font-bold text-lg mb-2 ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                About This Event
              </h3>
              <p className={`leading-relaxed ${settings.app.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {selectedEvent?.description}
              </p>
            </div>

            <div className="mb-6">
              <h3 className={`font-bold text-lg mb-2 ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                Organizer
              </h3>
              <p className={settings.app.darkMode ? "text-gray-300" : "text-gray-700"}>{selectedEvent?.organizer}</p>
            </div>

            {/* Registration Section */}
            <div className="flex gap-3 mb-4">
              {!registeredEvents.includes(selectedEvent?.id) ? (
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105"
                  onClick={() => registerForEvent(selectedEvent?.id)}
                >
                  Register Now
                </Button>
              ) : (
                <Button className="flex-1 bg-green-500 hover:bg-green-600" disabled>
                  <Check className="h-4 w-4 mr-2" />
                  Registered
                </Button>
              )}
            </div>

            {/* Question Section */}
            <div className="mb-4">
              <h3 className={`font-bold text-lg mb-2 ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                Ask a Question
              </h3>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your question here..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className={`flex-1 ${settings.app.darkMode ? "bg-gray-800 border-gray-600 text-white" : ""}`}
                />
                <Button
                  onClick={() => {
                    if (questionText.trim()) {
                      submitQuestion(selectedEvent?.id, questionText)
                      setQuestionText("")
                    }
                  }}
                  disabled={!questionText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Share Section */}
            <Button
              variant="outline"
              className={`w-full transition-all ${
                settings.app.darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => shareEvent(selectedEvent)}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Event
            </Button>
          </div>
        </div>

        {renderBottomNav()}
      </div>
    )
  }

  const renderMapScreen = () => (
    <div className={`min-h-screen ${settings.app.darkMode ? "bg-gray-900" : "bg-white"}`}>
      {renderTopBar("Event Map", true)}
      {renderSuccessMessage()}

      <div className="relative h-[calc(100vh-140px)]">
        {/* Guyana Map Background */}
        <div className="w-full h-full relative overflow-hidden">
          <Image src="/images/guyana-map.jpg" alt="Map of Guyana" fill className="object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          {/* Map Markers */}
          {mockEvents.map((event, index) => (
            <div
              key={event.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{
                left: `${25 + (index % 3) * 25}%`,
                top: `${20 + Math.floor(index / 3) * 20}%`,
              }}
              onClick={() => {
                setSelectedEvent(event)
                setCurrentScreen("event-details")
              }}
            >
              <div className="bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 transition-all hover:scale-110 border-2 border-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div
                className={`absolute top-14 left-1/2 transform -translate-x-1/2 p-3 rounded-lg shadow-xl min-w-40 text-center text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 border ${
                  settings.app.darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"
                }`}
              >
                <p className={`font-semibold ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                  {event.title}
                </p>
                <p className={settings.app.darkMode ? "text-gray-300" : "text-gray-600"}>{event.date}</p>
                <p className="text-purple-600 text-xs mt-1">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {renderBottomNav()}
    </div>
  )

  const renderSavedScreen = () => (
    <div
      className={`min-h-screen ${settings.app.darkMode ? "bg-gray-900" : "bg-gradient-to-b from-purple-50 to-pink-50"}`}
    >
      {renderTopBar("Saved Events", true)}
      {renderSuccessMessage()}

      <div className="p-4 pb-20">
        {getSavedEvents().length > 0 ? (
          <div className="space-y-4">{getSavedEvents().map((event) => renderEventCard(event))}</div>
        ) : (
          <div className="text-center py-12">
            <Bookmark
              className={`h-16 w-16 mx-auto mb-4 ${settings.app.darkMode ? "text-gray-600" : "text-gray-300"}`}
            />
            <h3 className={`text-lg font-semibold mb-2 ${settings.app.darkMode ? "text-gray-300" : "text-gray-600"}`}>
              No Saved Events
            </h3>
            <p className={`mb-6 ${settings.app.darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Start saving events you're interested in!
            </p>
            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105"
              onClick={() => setCurrentScreen("home")}
            >
              Browse Events
            </Button>
          </div>
        )}
      </div>

      {renderBottomNav()}
    </div>
  )

  const renderProfileScreen = () => (
    <div
      className={`min-h-screen ${settings.app.darkMode ? "bg-gray-900" : "bg-gradient-to-b from-purple-50 to-pink-50"}`}
    >
      {renderTopBar("Family Profile", true)}
      {renderSuccessMessage()}

      <div className="p-4 pb-20">
        <div className={`rounded-xl p-6 mb-6 shadow-sm ${settings.app.darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/images/woman-profile.png" />
                <AvatarFallback className="bg-purple-500 text-white text-xl">SJ</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white hover:scale-110 transition-transform"
                onClick={() => setShowSuccessMessage("Profile photo updated!")}
              >
                <Camera className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex-1">
              {isEditingProfile ? (
                <div className="space-y-2">
                  <Input
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className={`font-bold text-lg ${settings.app.darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                  />
                  <Input
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className={settings.app.darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                  />
                  <Input
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    className={settings.app.darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                  />
                  <Input
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    className={settings.app.darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                  />
                </div>
              ) : (
                <>
                  <h2 className={`text-xl font-bold ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                    {userProfile.name}
                  </h2>
                  <p className={settings.app.darkMode ? "text-gray-300" : "text-gray-600"}>{userProfile.email}</p>
                  <p className={`text-sm ${settings.app.darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {userProfile.location}
                  </p>
                  <p className={`text-sm ${settings.app.darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {userProfile.phone}
                  </p>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="hover:scale-110 transition-transform bg-transparent"
              onClick={() => {
                if (isEditingProfile) {
                  setUserProfile(editedProfile)
                  setIsEditingProfile(false)
                  setShowSuccessMessage("Profile updated successfully!")
                } else {
                  setIsEditingProfile(true)
                }
              }}
            >
              {isEditingProfile ? <Check className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className={`font-semibold mb-3 ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                Children
              </h3>
              {userProfile.children.map((child, index) => (
                <Card
                  key={index}
                  className={`mb-3 ${
                    settings.app.darkMode ? "bg-gray-700 border-gray-600" : "bg-purple-50 border-purple-100"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label
                            className={`text-sm font-medium ${
                              settings.app.darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Child's Name
                          </Label>
                          <Input
                            value={child.name}
                            onChange={(e) => {
                              const updatedChildren = [...userProfile.children]
                              updatedChildren[index].name = e.target.value
                              setUserProfile({ ...userProfile, children: updatedChildren })
                            }}
                            placeholder="Enter child's name"
                            className={`mt-1 ${
                              settings.app.darkMode
                                ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                                : "bg-white border-gray-300"
                            }`}
                          />
                        </div>
                        <div>
                          <Label
                            className={`text-sm font-medium ${
                              settings.app.darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Age
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            max="18"
                            value={child.age}
                            onChange={(e) => {
                              const age = Math.max(0, Math.min(18, Number.parseInt(e.target.value) || 0))
                              const updatedChildren = [...userProfile.children]
                              updatedChildren[index].age = age
                              setUserProfile({ ...userProfile, children: updatedChildren })
                            }}
                            className={`mt-1 w-20 ${
                              settings.app.darkMode
                                ? "bg-gray-600 border-gray-500 text-white"
                                : "bg-white border-gray-300"
                            }`}
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-3 hover:scale-110 transition-transform text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          const updatedChildren = userProfile.children.filter((_, i) => i !== index)
                          setUserProfile({ ...userProfile, children: updatedChildren })
                          setShowSuccessMessage(`${child.name || "Child"} removed from profile`)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="outline"
                className={`w-full mt-3 border-dashed transition-all hover:scale-105 ${
                  settings.app.darkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-purple-300 text-purple-600 bg-transparent hover:bg-purple-50"
                }`}
                onClick={() => {
                  const newChild = { name: "", age: 5 }
                  setUserProfile({ ...userProfile, children: [...userProfile.children, newChild] })
                  setShowSuccessMessage("New child added! Please enter their details.")
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Child
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: "Event Preferences", action: () => setShowSuccessMessage("Event preferences updated!") },
            { label: "Notifications", action: () => setCurrentScreen("settings") },
            { label: "Help & Support", action: () => setCurrentScreen("help") },
          ].map(({ label, action }) => (
            <Button
              key={label}
              variant="outline"
              className={`w-full justify-between transition-all hover:scale-105 ${
                settings.app.darkMode
                  ? "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "bg-white hover:bg-purple-50"
              }`}
              onClick={action}
            >
              <span>{label}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>

      {renderBottomNav()}
    </div>
  )

  const renderSettingsScreen = () => (
    <div
      className={`min-h-screen ${settings.app.darkMode ? "bg-gray-900" : "bg-gradient-to-b from-purple-50 to-pink-50"}`}
    >
      {renderTopBar("Settings", true)}
      {renderSuccessMessage()}

      <div className="p-4 pb-20 space-y-6">
        {/* Notifications */}
        <Card className={`shadow-sm ${settings.app.darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`flex items-center gap-2 text-lg ${settings.app.darkMode ? "text-white" : ""}`}>
              <Bell className="h-5 w-5 text-purple-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "pushNotifications", label: "Push Notifications", desc: "Get notified about new events" },
              { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
              { key: "eventReminders", label: "Event Reminders", desc: "Remind me before events start" },
              { key: "newEvents", label: "New Events", desc: "Notify when new events are added" },
              { key: "weeklyDigest", label: "Weekly Digest", desc: "Weekly summary of upcoming events" },
            ].map(({ key, label, desc }, index, array) => (
              <div key={key}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${settings.app.darkMode ? "text-white" : ""}`}>{label}</p>
                    <p className={`text-sm ${settings.app.darkMode ? "text-gray-400" : "text-gray-500"}`}>{desc}</p>
                  </div>
                  <Switch
                    checked={settings.notifications[key as keyof typeof settings.notifications]}
                    onCheckedChange={(checked) => updateSetting("notifications", key, checked)}
                  />
                </div>
                {index < array.length - 1 && <Separator className={settings.app.darkMode ? "bg-gray-700" : ""} />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className={`shadow-sm ${settings.app.darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`flex items-center gap-2 text-lg ${settings.app.darkMode ? "text-white" : ""}`}>
              <Shield className="h-5 w-5 text-purple-500" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "locationServices", label: "Location Services", desc: "Find events near you" },
              { key: "shareActivity", label: "Share Activity", desc: "Let others see your saved events" },
              { key: "publicProfile", label: "Public Profile", desc: "Make your profile visible to others" },
            ].map(({ key, label, desc }, index, array) => (
              <div key={key}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${settings.app.darkMode ? "text-white" : ""}`}>{label}</p>
                    <p className={`text-sm ${settings.app.darkMode ? "text-gray-400" : "text-gray-500"}`}>{desc}</p>
                  </div>
                  <Switch
                    checked={settings.privacy[key as keyof typeof settings.privacy]}
                    onCheckedChange={(checked) => updateSetting("privacy", key, checked)}
                  />
                </div>
                {index < array.length - 1 && <Separator className={settings.app.darkMode ? "bg-gray-700" : ""} />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className={`shadow-sm ${settings.app.darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`flex items-center gap-2 text-lg ${settings.app.darkMode ? "text-white" : ""}`}>
              <Smartphone className="h-5 w-5 text-purple-500" />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-medium ${settings.app.darkMode ? "text-white" : ""}`}>Dark Mode</p>
                <p className={`text-sm ${settings.app.darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Switch to dark theme
                </p>
              </div>
              <Switch
                checked={settings.app.darkMode}
                onCheckedChange={(checked) => updateSetting("app", "darkMode", checked)}
              />
            </div>
            <Separator className={settings.app.darkMode ? "bg-gray-700" : ""} />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className={settings.app.darkMode ? "text-white" : ""}>Language</span>
              </div>
              <Select value={settings.app.language} onValueChange={(value) => updateSetting("app", "language", value)}>
                <SelectTrigger
                  className={`w-32 ${settings.app.darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={settings.app.darkMode ? "bg-gray-700 border-gray-600" : ""}>
                  {languages.map((lang) => (
                    <SelectItem
                      key={lang.value}
                      value={lang.value}
                      className={settings.app.darkMode ? "text-white hover:bg-gray-600" : ""}
                    >
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Separator className={settings.app.darkMode ? "bg-gray-700" : ""} />
            {[
              { key: "autoPlay", label: "Auto-play Videos", desc: "Automatically play event videos" },
              { key: "soundEffects", label: "Sound Effects", desc: "Play sounds for interactions" },
            ].map(({ key, label, desc }, index, array) => (
              <div key={key}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${settings.app.darkMode ? "text-white" : ""}`}>{label}</p>
                    <p className={`text-sm ${settings.app.darkMode ? "text-gray-400" : "text-gray-500"}`}>{desc}</p>
                  </div>
                  <Switch
                    checked={settings.app[key as keyof typeof settings.app] as boolean}
                    onCheckedChange={(checked) => updateSetting("app", key, checked)}
                  />
                </div>
                {index < array.length - 1 && <Separator className={settings.app.darkMode ? "bg-gray-700" : ""} />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className={`shadow-sm ${settings.app.darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`flex items-center gap-2 text-lg ${settings.app.darkMode ? "text-white" : ""}`}>
              <User className="h-5 w-5 text-purple-500" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: HelpCircle, label: "Help & Support", action: () => setCurrentScreen("help") },
              { icon: Eye, label: "Privacy Policy", action: () => setCurrentScreen("privacy") },
              { icon: Lock, label: "Terms of Service", action: () => setCurrentScreen("terms") },
              { icon: MessageSquare, label: "Send Feedback", action: () => setCurrentScreen("feedback") },
            ].map(({ icon: Icon, label, action }) => (
              <Button
                key={label}
                variant="outline"
                className={`w-full justify-start transition-all ${
                  settings.app.darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    : "bg-transparent hover:bg-purple-50"
                }`}
                onClick={action}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
            <Separator className={settings.app.darkMode ? "bg-gray-700" : ""} />
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 transition-all bg-transparent"
              onClick={() => {
                setShowSuccessMessage("Logged out successfully!")
                setTimeout(() => setCurrentScreen("home"), 2000)
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className={`text-center text-sm pt-4 ${settings.app.darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <p>Giggles & Go GY v1.0.0</p>
          <p>Made with ❤️ for Guyanese families</p>
        </div>
      </div>

      {renderBottomNav()}
    </div>
  )

  const renderHelpScreen = () => (
    <div
      className={`min-h-screen ${settings.app.darkMode ? "bg-gray-900" : "bg-gradient-to-b from-purple-50 to-pink-50"}`}
    >
      {renderTopBar("Help & Support", true)}
      {renderSuccessMessage()}

      <div className="p-4 pb-20 space-y-6">
        <Card className={`shadow-sm ${settings.app.darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className={settings.app.darkMode ? "text-white" : ""}>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                q: "How do I register for events?",
                a: "Simply tap on any event card and click the 'Register Now' button.",
              },
              {
                q: "Are all events free?",
                a: "No, some events have fees. Look for the green 'FREE' badge on event cards.",
              },
              { q: "How do I save events?", a: "Tap the heart icon on any event card to save it to your favorites." },
              {
                q: "Can I submit my own events?",
                a: "Yes! Contact us through the feedback form to learn about event submission.",
              },
            ].map(({ q, a }, index) => (
              <div key={index} className="space-y-2">
                <h4 className={`font-semibold ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>{q}</h4>
                <p className={`text-sm ${settings.app.darkMode ? "text-gray-300" : "text-gray-600"}`}>{a}</p>
                {index < 3 && <Separator className={settings.app.darkMode ? "bg-gray-700" : ""} />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className={`shadow-sm ${settings.app.darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className={settings.app.darkMode ? "text-white" : ""}>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center gap-3 ${settings.app.darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <Mail className="h-5 w-5" />
              <span>support@gigglesandgo.gy</span>
            </div>
            <div className={`flex items-center gap-3 ${settings.app.darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <Phone className="h-5 w-5" />
              <span>+592-123-KIDS (5437)</span>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => setCurrentScreen("feedback")}
            >
              Send Feedback
            </Button>
          </CardContent>
        </Card>
      </div>

      {renderBottomNav()}
    </div>
  )

  const renderFeedbackScreen = () => (
    <div
      className={`min-h-screen ${settings.app.darkMode ? "bg-gray-900" : "bg-gradient-to-b from-purple-50 to-pink-50"}`}
    >
      {renderTopBar("Send Feedback", true)}
      {renderSuccessMessage()}

      <div className="p-4 pb-20">
        <Card className={`shadow-sm ${settings.app.darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className={settings.app.darkMode ? "text-white" : ""}>We'd Love Your Feedback!</CardTitle>
            <p className={`text-sm ${settings.app.darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Help us improve Giggles & Go GY for Guyanese families
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Tell us what you think about the app, suggest new features, or report any issues..."
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              className={`min-h-32 ${settings.app.darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
            />
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={submitFeedback}
              disabled={!feedbackMessage.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Feedback
            </Button>
          </CardContent>
        </Card>
      </div>

      {renderBottomNav()}
    </div>
  )

  const renderPrivacyScreen = () => (
    <div
      className={`min-h-screen ${settings.app.darkMode ? "bg-gray-900" : "bg-gradient-to-b from-purple-50 to-pink-50"}`}
    >
      {renderTopBar("Privacy Policy", true)}

      <div className="p-4 pb-20">
        <Card className={`shadow-sm ${settings.app.darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardContent className="p-6 space-y-4">
            <h3 className={`font-bold text-lg ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
              Privacy Policy
            </h3>
            <div className={`space-y-4 text-sm ${settings.app.darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <p>
                <strong>Last updated:</strong> December 2024
              </p>
              <p>
                Giggles & Go GY is committed to protecting your privacy. This policy explains how we collect, use, and
                protect your information.
              </p>
              <h4 className={`font-semibold ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                Information We Collect
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Profile information (name, email, location)</li>
                <li>Children's information (names, ages)</li>
                <li>Event preferences and saved events</li>
                <li>Usage data to improve our services</li>
              </ul>
              <h4 className={`font-semibold ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                How We Use Your Information
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>To provide personalized event recommendations</li>
                <li>To send notifications about events you're interested in</li>
                <li>To improve our app and services</li>
                <li>To connect you with event organizers when you have questions</li>
              </ul>
              <h4 className={`font-semibold ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                Data Protection
              </h4>
              <p>
                We use industry-standard security measures to protect your personal information. We never sell your data
                to third parties.
              </p>
              <h4 className={`font-semibold ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>Contact Us</h4>
              <p>If you have questions about this privacy policy, contact us at privacy@gigglesandgo.gy</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {renderBottomNav()}
    </div>
  )

  const renderTermsScreen = () => (
    <div
      className={`min-h-screen ${settings.app.darkMode ? "bg-gray-900" : "bg-gradient-to-b from-purple-50 to-pink-50"}`}
    >
      {renderTopBar("Terms of Service", true)}

      <div className="p-4 pb-20">
        <Card className={`shadow-sm ${settings.app.darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardContent className="p-6 space-y-4">
            <h3 className={`font-bold text-lg ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
              Terms of Service
            </h3>
            <div className={`space-y-4 text-sm ${settings.app.darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <p>
                <strong>Last updated:</strong> December 2024
              </p>
              <p>By using Giggles & Go GY, you agree to these terms of service.</p>
              <h4 className={`font-semibold ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                Acceptable Use
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use the app only for finding family-friendly events</li>
                <li>Provide accurate information when registering for events</li>
                <li>Respect event organizers and other families</li>
                <li>Do not misuse or attempt to hack the platform</li>
              </ul>
              <h4 className={`font-semibold ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>
                Event Information
              </h4>
              <p>
                While we strive for accuracy, event details may change. Always confirm with organizers before attending.
              </p>
              <h4 className={`font-semibold ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>Liability</h4>
              <p>
                Giggles & Go GY is a platform connecting families with events. We are not responsible for event quality
                or safety.
              </p>
              <h4 className={`font-semibold ${settings.app.darkMode ? "text-white" : "text-gray-800"}`}>Contact</h4>
              <p>Questions about these terms? Contact us at legal@gigglesandgo.gy</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {renderBottomNav()}
    </div>
  )

  // Main render logic
  switch (currentScreen) {
    case "events":
      return renderEventsScreen()
    case "event-details":
      return renderEventDetails()
    case "map":
      return renderMapScreen()
    case "saved":
      return renderSavedScreen()
    case "profile":
      return renderProfileScreen()
    case "settings":
      return renderSettingsScreen()
    case "help":
      return renderHelpScreen()
    case "feedback":
      return renderFeedbackScreen()
    case "privacy":
      return renderPrivacyScreen()
    case "terms":
      return renderTermsScreen()
    default:
      return renderHomeScreen()
  }
}
