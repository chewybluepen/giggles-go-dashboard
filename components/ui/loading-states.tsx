"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

// Loading Spinner with Guyanese cultural theme
export function GuyaneseSpinner({ size = "md", className }: { 
  size?: "sm" | "md" | "lg"
  className?: string 
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-2 border-guyana-green/20" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-guyana-green animate-spin" />
      <div className="absolute inset-1 rounded-full border border-transparent border-t-tropical-teal animate-spin" 
           style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
    </div>
  )
}

// Pulsing dots loader
export function PulsingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-guyana-green rounded-full animate-tropical-pulse"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

// Shimmer loading effect
export function ShimmerLoader({ className }: { className?: string }) {
  return (
    <div className={cn(
      "relative overflow-hidden bg-gray-200 dark:bg-gray-800 rounded-lg",
      className
    )}>
      <div className="absolute inset-0 shimmer-effect" />
    </div>
  )
}

// Event Card Skeleton
export function EventCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative">
        <Skeleton className="h-48 w-full" />
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        <div className="flex gap-3 mt-4">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-20 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  )
}

// Map Loading State
export function MapSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800", className)}>
      <div className="absolute inset-0 cultural-pattern opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-3">
          <GuyaneseSpinner size="lg" />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
      
      {/* Simulated map elements */}
      <div className="absolute top-4 left-4 right-4">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
      
      {/* Simulated markers */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-6 h-6 bg-guyana-green/30 rounded-full animate-tropical-pulse"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}
    </div>
  )
}

// Carousel Loading State
export function CarouselSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative overflow-hidden rounded-2xl">
        <Skeleton className="h-64 w-full" />
        <div className="absolute top-4 left-4">
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
      <div className="flex justify-center space-x-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="w-2 h-2 rounded-full" />
        ))}
      </div>
    </div>
  )
}

// Full Page Loading State
export function FullPageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <GuyaneseSpinner size="lg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-guyana-yellow rounded-full animate-tropical-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-guyana-black dark:text-guyana-white">
            {message}
          </p>
          <PulsingDots />
        </div>
      </div>
    </div>
  )
}

// Button Loading State
export function ButtonLoader({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-2">
      <GuyaneseSpinner size={size} />
      <span>Loading...</span>
    </div>
  )
}

// List Loading State
export function ListSkeleton({ 
  items = 3, 
  className 
}: { 
  items?: number
  className?: string 
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {[...Array(items)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Search Loading State
export function SearchLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <GuyaneseSpinner size="md" />
          <span className="text-muted-foreground">Searching events...</span>
        </div>
        <PulsingDots />
      </div>
    </div>
  )
}
