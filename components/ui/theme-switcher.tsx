"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sun,
  Moon,
  Monitor,
  Palette,
  Check,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeSwitcherProps {
  className?: string
  showCulturalVariants?: boolean
}

type Theme = "light" | "dark" | "system"
type CulturalVariant = "default" | "carnival" | "heritage" | "nature"

const themeOptions = [
  {
    value: "light" as Theme,
    label: "Light",
    icon: Sun,
    description: "Clean and bright"
  },
  {
    value: "dark" as Theme,
    label: "Dark",
    icon: Moon,
    description: "Easy on the eyes"
  },
  {
    value: "system" as Theme,
    label: "System",
    icon: Monitor,
    description: "Follows device setting"
  }
]

const culturalVariants = [
  {
    value: "default" as CulturalVariant,
    label: "Golden Arrowhead",
    description: "Classic Guyanese flag colors",
    colors: ["bg-guyana-green", "bg-guyana-yellow", "bg-guyana-red"],
    preview: "🇬🇾"
  },
  {
    value: "carnival" as CulturalVariant,
    label: "Carnival",
    description: "Vibrant festival colors",
    colors: ["bg-sunset-orange", "bg-tropical-teal", "bg-golden-amber"],
    preview: "🎭"
  },
  {
    value: "heritage" as CulturalVariant,
    label: "Heritage",
    description: "Traditional earth tones",
    colors: ["bg-forest-emerald", "bg-amber-700", "bg-stone-600"],
    preview: "🏛️"
  },
  {
    value: "nature" as CulturalVariant,
    label: "Rainforest",
    description: "Inspired by Guyana's nature",
    colors: ["bg-emerald-600", "bg-green-500", "bg-lime-500"],
    preview: "🌿"
  }
]

export function ThemeSwitcher({ 
  className, 
  showCulturalVariants = true 
}: ThemeSwitcherProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>("system")
  const [currentVariant, setCurrentVariant] = useState<CulturalVariant>("default")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light")

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setSystemTheme(mediaQuery.matches ? "dark" : "light")

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("giggles-theme") as Theme
    const savedVariant = localStorage.getItem("giggles-cultural-variant") as CulturalVariant
    
    if (savedTheme) setCurrentTheme(savedTheme)
    if (savedVariant) setCurrentVariant(savedVariant)
  }, [])

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement
    const effectiveTheme = currentTheme === "system" ? systemTheme : currentTheme
    
    // Add transition class
    setIsTransitioning(true)
    root.style.setProperty("--theme-transition", "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)")
    
    // Apply theme
    if (effectiveTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Apply cultural variant
    root.setAttribute("data-cultural-variant", currentVariant)
    
    // Remove transition after animation
    setTimeout(() => {
      setIsTransitioning(false)
      root.style.removeProperty("--theme-transition")
    }, 300)

    // Save preferences
    localStorage.setItem("giggles-theme", currentTheme)
    localStorage.setItem("giggles-cultural-variant", currentVariant)
  }, [currentTheme, currentVariant, systemTheme])

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme)
  }

  const handleVariantChange = (variant: CulturalVariant) => {
    setCurrentVariant(variant)
  }

  const getEffectiveTheme = () => {
    return currentTheme === "system" ? systemTheme : currentTheme
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Theme Selection */}
      <Card className="cultural-pattern border-guyana-green/20">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-guyana-green" />
              <h3 className="font-semibold text-guyana-black dark:text-guyana-white">
                Theme Preference
              </h3>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((option) => {
                const Icon = option.icon
                const isActive = currentTheme === option.value
                const isEffective = getEffectiveTheme() === (option.value === "system" ? systemTheme : option.value)
                
                return (
                  <Button
                    key={option.value}
                    variant={isActive ? "default" : "outline"}
                    onClick={() => handleThemeChange(option.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 h-auto p-3 transition-all duration-300",
                      isActive
                        ? "bg-guyana-green text-guyana-white shadow-lg scale-105"
                        : "border-guyana-green/30 text-guyana-green hover:bg-guyana-green/10",
                      isTransitioning && "animate-tropical-pulse"
                    )}
                  >
                    <div className="relative">
                      <Icon className="h-5 w-5" />
                      {isActive && (
                        <Check className="absolute -top-1 -right-1 h-3 w-3 bg-guyana-white text-guyana-green rounded-full p-0.5" />
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium">{option.label}</div>
                      <div className="text-xs opacity-75">{option.description}</div>
                    </div>
                  </Button>
                )
              })}
            </div>

            {/* Current Theme Indicator */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className={cn(
                "w-3 h-3 rounded-full transition-colors duration-300",
                getEffectiveTheme() === "dark" ? "bg-gray-800" : "bg-yellow-400"
              )} />
              <span>
                Currently using {getEffectiveTheme()} theme
                {currentTheme === "system" && " (auto)"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cultural Variants */}
      {showCulturalVariants && (
        <Card className="cultural-pattern border-tropical-teal/20">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-tropical-teal" />
                <h3 className="font-semibold text-guyana-black dark:text-guyana-white">
                  Cultural Style
                </h3>
                <Badge variant="outline" className="text-xs">
                  Guyanese Heritage
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {culturalVariants.map((variant) => {
                  const isActive = currentVariant === variant.value
                  
                  return (
                    <Button
                      key={variant.value}
                      variant="outline"
                      onClick={() => handleVariantChange(variant.value)}
                      className={cn(
                        "flex flex-col items-start gap-2 h-auto p-3 transition-all duration-300",
                        isActive
                          ? "border-tropical-teal bg-tropical-teal/10 shadow-lg scale-105"
                          : "border-tropical-teal/30 hover:bg-tropical-teal/5",
                        isTransitioning && "animate-tropical-pulse"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{variant.preview}</span>
                          <span className="font-medium text-sm">{variant.label}</span>
                        </div>
                        {isActive && (
                          <Check className="h-4 w-4 text-tropical-teal" />
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground text-left">
                        {variant.description}
                      </p>
                      
                      {/* Color Preview */}
                      <div className="flex gap-1 w-full">
                        {variant.colors.map((color, index) => (
                          <div
                            key={index}
                            className={cn(
                              "flex-1 h-2 rounded-full transition-all duration-300",
                              color,
                              isActive && "shadow-sm"
                            )}
                          />
                        ))}
                      </div>
                    </Button>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Theme Preview */}
      <Card className="cultural-pattern border-golden-amber/20">
        <CardContent className="p-4">
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-guyana-black dark:text-guyana-white">
              Preview
            </h4>
            
            <div className={cn(
              "p-4 rounded-lg border transition-all duration-300",
              getEffectiveTheme() === "dark" 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-200"
            )}>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-guyana-green rounded-full flex items-center justify-center">
                    <span className="text-guyana-white text-xs font-bold">G</span>
                  </div>
                  <div>
                    <div className={cn(
                      "font-medium text-sm",
                      getEffectiveTheme() === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      Sample Event
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Georgetown, Guyana
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Badge className="bg-guyana-green text-guyana-white text-xs">
                    Family Fun
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Free
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for theme management
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system")
  const [culturalVariant, setCulturalVariant] = useState<CulturalVariant>("default")

  useEffect(() => {
    const savedTheme = localStorage.getItem("giggles-theme") as Theme
    const savedVariant = localStorage.getItem("giggles-cultural-variant") as CulturalVariant
    
    if (savedTheme) setTheme(savedTheme)
    if (savedVariant) setCulturalVariant(savedVariant)
  }, [])

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("giggles-theme", newTheme)
  }

  const updateCulturalVariant = (newVariant: CulturalVariant) => {
    setCulturalVariant(newVariant)
    localStorage.setItem("giggles-cultural-variant", newVariant)
  }

  return {
    theme,
    culturalVariant,
    updateTheme,
    updateCulturalVariant
  }
}
