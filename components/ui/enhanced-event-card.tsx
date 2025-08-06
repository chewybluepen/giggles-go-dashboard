"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  Star,
  Users,
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark,
  MessageSquare,
  Award,
  Verified
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Organizer {
  id: number
  name: string
  avatar: string
  bio: string
  eventsHosted: number
  rating: number
  verified: boolean
}

interface Review {
  id: number
  author: string
  avatar: string
  rating: number
  comment: string
  date: string
  helpful: number
}

interface EnhancedEvent {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  location: string
  date: string
  time: string
  ageRange: string
  price: string
  category: string
  attendees: number
  maxAttendees: number
  rating: number
  totalReviews: number
  organizer: Organizer
  reviews: Review[]
  tags: string[]
  isRecommended: boolean
  isSaved: boolean
  isRegistered: boolean
}

interface EnhancedEventCardProps {
  event: EnhancedEvent
  onSave?: (eventId: number) => void
  onRegister?: (eventId: number) => void
  onShare?: (eventId: number) => void
  className?: string
}

export function EnhancedEventCard({
  event,
  onSave,
  onRegister,
  onShare,
  className
}: EnhancedEventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const displayedReviews = showAllReviews ? event.reviews : event.reviews.slice(0, 2)
  const attendancePercentage = (event.attendees / event.maxAttendees) * 100

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-xl cultural-pattern border-guyana-green/20",
      className
    )}>
      {/* Hero Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 hover:scale-105",
            !isImageLoaded && "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {event.isRecommended && (
            <Badge className="bg-guyana-yellow text-guyana-black animate-fade-in-up">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Recommended
            </Badge>
          )}
          <Badge variant="outline" className="bg-white/90 text-guyana-black border-0">
            {event.category}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 hover:bg-white border-0 shadow-lg tropical-hover"
            onClick={() => onSave?.(event.id)}
          >
            <Bookmark className={cn(
              "h-4 w-4",
              event.isSaved ? "fill-current text-guyana-red" : "text-gray-600"
            )} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 hover:bg-white border-0 shadow-lg tropical-hover"
            onClick={() => onShare?.(event.id)}
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3">
          <Badge className="bg-guyana-green text-guyana-white font-bold">
            {event.price}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title and Basic Info */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg leading-tight text-guyana-black dark:text-guyana-white">
            {event.title}
          </h3>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-guyana-green" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-guyana-green" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-tropical-teal" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-sunset-orange" />
              <span>Ages {event.ageRange}</span>
            </div>
          </div>

          {/* Rating and Attendance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <span className="font-medium">{event.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({event.totalReviews} reviews)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-guyana-green transition-all duration-500"
                  style={{ width: `${attendancePercentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {event.attendees}/{event.maxAttendees}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{event.tags.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Expandable Section */}
        {isExpanded && (
          <div className="mt-4 space-y-4 animate-fade-in-up">
            <Separator />
            
            {/* Organizer Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-guyana-black dark:text-guyana-white">
                Event Organizer
              </h4>
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={event.organizer.avatar} />
                  <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-medium">{event.organizer.name}</h5>
                    {event.organizer.verified && (
                      <Verified className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.organizer.bio}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      <span>{event.organizer.eventsHosted} events hosted</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span>{event.organizer.rating} rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Reviews */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-guyana-black dark:text-guyana-white">
                  Recent Reviews
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="text-guyana-green hover:text-forest-emerald"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {showAllReviews ? "Show Less" : `View All ${event.reviews.length}`}
                </Button>
              </div>
              
              <div className="space-y-3">
                {displayedReviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{review.author}</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3 w-3",
                                  i < review.rating
                                    ? "fill-current text-yellow-500"
                                    : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Heart className="h-3 w-3 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Full Description */}
            <div className="space-y-2">
              <h4 className="font-semibold text-guyana-black dark:text-guyana-white">
                About This Event
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.longDescription}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <Button
            onClick={() => onRegister?.(event.id)}
            className={cn(
              "flex-1 tropical-hover",
              event.isRegistered
                ? "bg-forest-emerald hover:bg-forest-emerald/90 text-guyana-white"
                : "bg-guyana-green hover:bg-forest-emerald text-guyana-white"
            )}
          >
            {event.isRegistered ? "Registered" : "Register Now"}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="border-guyana-green/30 text-guyana-green hover:bg-guyana-green/10 tropical-hover"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                More
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
