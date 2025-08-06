"use client"

import React, { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CarouselItem {
  id: number
  title: string
  subtitle?: string
  description: string
  image: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  action?: {
    label: string
    onClick: () => void
  }
}

interface InteractiveCarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showControls?: boolean
  showIndicators?: boolean
  className?: string
  itemClassName?: string
}

export function InteractiveCarousel({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  className,
  itemClassName
}: InteractiveCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }, [items.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }, [items.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [isPlaying, nextSlide, autoPlayInterval])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === " ") {
        e.preventDefault()
        setIsPlaying(!isPlaying)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide, isPlaying])

  if (items.length === 0) return null

  const currentItem = items[currentIndex]

  return (
    <div className={cn("relative w-full", className)}>
      {/* Main Carousel */}
      <div
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <Card className={cn(
                "border-0 shadow-lg overflow-hidden cultural-pattern",
                itemClassName
              )}>
                <div className="relative">
                  {/* Background Image */}
                  <div
                    className="h-64 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-4 left-4">
                        <Badge 
                          variant={item.badgeVariant || "default"}
                          className="animate-fade-in-up bg-guyana-green text-guyana-white"
                        >
                          {item.badge}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content Overlay */}
                  <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="space-y-2">
                      {item.subtitle && (
                        <p className="text-sm text-guyana-yellow font-medium">
                          {item.subtitle}
                        </p>
                      )}
                      <h3 className="text-xl font-bold leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-200 line-clamp-2">
                        {item.description}
                      </p>
                      {item.action && (
                        <Button
                          onClick={item.action.onClick}
                          className="mt-3 bg-guyana-green hover:bg-forest-emerald text-guyana-white tropical-hover"
                          size="sm"
                        >
                          {item.action.label}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {showControls && items.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg tropical-hover"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg tropical-hover"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Play/Pause Button */}
      {autoPlay && (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white border-0 shadow-lg tropical-hover"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-guyana-green w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
