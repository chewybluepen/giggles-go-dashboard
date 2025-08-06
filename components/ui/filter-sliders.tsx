"use client"

import React, { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterSlidersProps {
  onAgeRangeChange?: (range: [number, number]) => void
  onDistanceChange?: (distance: number) => void
  initialAgeRange?: [number, number]
  initialDistance?: number
  className?: string
}

const AGE_PRESETS = [
  { label: "Toddlers", range: [1, 3] as [number, number] },
  { label: "Preschool", range: [3, 5] as [number, number] },
  { label: "School Age", range: [6, 12] as [number, number] },
  { label: "Teens", range: [13, 17] as [number, number] },
  { label: "All Ages", range: [0, 18] as [number, number] }
]

const DISTANCE_PRESETS = [
  { label: "Nearby", distance: 5 },
  { label: "Local", distance: 15 },
  { label: "City-wide", distance: 50 },
  { label: "Anywhere", distance: 100 }
]

export function FilterSliders({
  onAgeRangeChange,
  onDistanceChange,
  initialAgeRange = [0, 18],
  initialDistance = 25,
  className
}: FilterSlidersProps) {
  const [ageRange, setAgeRange] = useState<[number, number]>(initialAgeRange)
  const [distance, setDistance] = useState(initialDistance)
  const [isAgeAnimating, setIsAgeAnimating] = useState(false)
  const [isDistanceAnimating, setIsDistanceAnimating] = useState(false)

  // Handle age range changes
  const handleAgeRangeChange = (newRange: number[]) => {
    const range = [newRange[0], newRange[1]] as [number, number]
    setAgeRange(range)
    setIsAgeAnimating(true)
    onAgeRangeChange?.(range)
    
    setTimeout(() => setIsAgeAnimating(false), 300)
  }

  // Handle distance changes
  const handleDistanceChange = (newDistance: number[]) => {
    const dist = newDistance[0]
    setDistance(dist)
    setIsDistanceAnimating(true)
    onDistanceChange?.(dist)
    
    setTimeout(() => setIsDistanceAnimating(false), 300)
  }

  // Apply age preset
  const applyAgePreset = (preset: [number, number]) => {
    setAgeRange(preset)
    setIsAgeAnimating(true)
    onAgeRangeChange?.(preset)
    
    setTimeout(() => setIsAgeAnimating(false), 300)
  }

  // Apply distance preset
  const applyDistancePreset = (preset: number) => {
    setDistance(preset)
    setIsDistanceAnimating(true)
    onDistanceChange?.(preset)
    
    setTimeout(() => setIsDistanceAnimating(false), 300)
  }

  // Reset filters
  const resetFilters = () => {
    setAgeRange([0, 18])
    setDistance(25)
    onAgeRangeChange?.([0, 18])
    onDistanceChange?.(25)
  }

  // Format age range display
  const formatAgeRange = (range: [number, number]) => {
    if (range[0] === 0 && range[1] === 18) return "All Ages"
    if (range[0] === range[1]) return `${range[0]} years`
    return `${range[0]}-${range[1]} years`
  }

  // Format distance display
  const formatDistance = (dist: number) => {
    if (dist >= 100) return "Anywhere"
    return `${dist} km`
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Age Range Filter */}
      <Card className="cultural-pattern border-guyana-green/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-guyana-black dark:text-guyana-white">
            <Users className="h-5 w-5 text-guyana-green" />
            Age Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Range Display */}
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={cn(
                "text-guyana-green border-guyana-green transition-all duration-300",
                isAgeAnimating && "animate-tropical-pulse"
              )}
            >
              {formatAgeRange(ageRange)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {ageRange[0]} - {ageRange[1]} years
            </span>
          </div>

          {/* Age Range Slider */}
          <div className="px-2">
            <Slider
              value={[ageRange[0], ageRange[1]]}
              onValueChange={handleAgeRangeChange}
              max={18}
              min={0}
              step={1}
              className="w-full"
              // Custom styling for Guyanese theme
              style={{
                "--slider-track": "hsl(var(--guyana-green))",
                "--slider-range": "hsl(var(--guyana-green))",
                "--slider-thumb": "hsl(var(--guyana-green))"
              } as React.CSSProperties}
            />
          </div>

          {/* Age Presets */}
          <div className="flex flex-wrap gap-2">
            {AGE_PRESETS.map((preset) => (
              <Button
                key={preset.label}
                variant={
                  ageRange[0] === preset.range[0] && ageRange[1] === preset.range[1]
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => applyAgePreset(preset.range)}
                className={cn(
                  "text-xs tropical-hover",
                  ageRange[0] === preset.range[0] && ageRange[1] === preset.range[1]
                    ? "bg-guyana-green hover:bg-forest-emerald text-guyana-white"
                    : "border-guyana-green/30 text-guyana-green hover:bg-guyana-green/10"
                )}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Distance Filter */}
      <Card className="cultural-pattern border-tropical-teal/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-guyana-black dark:text-guyana-white">
            <MapPin className="h-5 w-5 text-tropical-teal" />
            Distance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Distance Display */}
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={cn(
                "text-tropical-teal border-tropical-teal transition-all duration-300",
                isDistanceAnimating && "animate-tropical-pulse"
              )}
            >
              {formatDistance(distance)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Within {distance} km
            </span>
          </div>

          {/* Distance Slider */}
          <div className="px-2">
            <Slider
              value={[distance]}
              onValueChange={handleDistanceChange}
              max={100}
              min={1}
              step={1}
              className="w-full"
              style={{
                "--slider-track": "hsl(var(--tropical-teal))",
                "--slider-range": "hsl(var(--tropical-teal))",
                "--slider-thumb": "hsl(var(--tropical-teal))"
              } as React.CSSProperties}
            />
          </div>

          {/* Distance Presets */}
          <div className="flex flex-wrap gap-2">
            {DISTANCE_PRESETS.map((preset) => (
              <Button
                key={preset.label}
                variant={distance === preset.distance ? "default" : "outline"}
                size="sm"
                onClick={() => applyDistancePreset(preset.distance)}
                className={cn(
                  "text-xs tropical-hover",
                  distance === preset.distance
                    ? "bg-tropical-teal hover:bg-tropical-teal/90 text-guyana-white"
                    : "border-tropical-teal/30 text-tropical-teal hover:bg-tropical-teal/10"
                )}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={resetFilters}
          className="tropical-hover border-guyana-red/30 text-guyana-red hover:bg-guyana-red/10"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
