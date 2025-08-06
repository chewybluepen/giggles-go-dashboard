"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle, 
  X, 
  Calendar, 
  Heart, 
  Share2, 
  Award,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SuccessBannerProps {
  type: "registration" | "save" | "share" | "achievement" | "general"
  title: string
  message: string
  isVisible: boolean
  onClose: () => void
  autoClose?: boolean
  autoCloseDelay?: number
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

const bannerConfig = {
  registration: {
    icon: Calendar,
    bgColor: "bg-guyana-green",
    accentColor: "text-guyana-white",
    animation: "animate-slide-in-right"
  },
  save: {
    icon: Heart,
    bgColor: "bg-guyana-red",
    accentColor: "text-guyana-white",
    animation: "animate-slide-in-left"
  },
  share: {
    icon: Share2,
    bgColor: "bg-tropical-teal",
    accentColor: "text-guyana-white",
    animation: "animate-fade-in-up"
  },
  achievement: {
    icon: Award,
    bgColor: "bg-golden-amber",
    accentColor: "text-guyana-black",
    animation: "animate-tropical-pulse"
  },
  general: {
    icon: CheckCircle,
    bgColor: "bg-forest-emerald",
    accentColor: "text-guyana-white",
    animation: "animate-slide-in-right"
  }
}

export function SuccessBanner({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  autoCloseDelay = 4000,
  action,
  className
}: SuccessBannerProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const config = bannerConfig[type]
  const Icon = config.icon

  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        handleClose()
      }, autoCloseDelay)

      return () => clearTimeout(timer)
    }
  }, [isVisible, autoClose, autoCloseDelay])

  const handleClose = () => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      onClose()
      setIsAnimatingOut(false)
    }, 300)
  }

  if (!isVisible && !isAnimatingOut) return null

  return (
    <div className={cn(
      "fixed top-4 right-4 z-50 max-w-sm w-full",
      className
    )}>
      <Card className={cn(
        "overflow-hidden shadow-2xl border-0 transition-all duration-300",
        config.bgColor,
        isAnimatingOut ? "animate-slide-in-right reverse" : config.animation
      )}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Icon with sparkle effect */}
            <div className="relative">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-white/20 backdrop-blur-sm"
              )}>
                <Icon className={cn("h-5 w-5", config.accentColor)} />
              </div>
              {type === "achievement" && (
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-tropical-pulse" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1">
              <h4 className={cn("font-semibold text-sm", config.accentColor)}>
                {title}
              </h4>
              <p className={cn("text-sm opacity-90", config.accentColor)}>
                {message}
              </p>
              
              {/* Action Button */}
              {action && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={action.onClick}
                  className={cn(
                    "mt-2 h-7 text-xs border-white/30 hover:bg-white/20",
                    config.accentColor
                  )}
                >
                  {action.label}
                </Button>
              )}
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className={cn(
                "h-6 w-6 hover:bg-white/20 rounded-full",
                config.accentColor
              )}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          {autoClose && (
            <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/60 rounded-full transition-all ease-linear"
                style={{
                  animation: `shrink ${autoCloseDelay}ms linear forwards`
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

// Hook for managing success banners
export function useSuccessBanner() {
  const [banners, setBanners] = useState<Array<{
    id: string
    type: SuccessBannerProps["type"]
    title: string
    message: string
    action?: SuccessBannerProps["action"]
  }>>([])

  const showBanner = (
    type: SuccessBannerProps["type"],
    title: string,
    message: string,
    action?: SuccessBannerProps["action"]
  ) => {
    const id = Math.random().toString(36).substr(2, 9)
    setBanners(prev => [...prev, { id, type, title, message, action }])
  }

  const closeBanner = (id: string) => {
    setBanners(prev => prev.filter(banner => banner.id !== id))
  }

  const BannerContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          style={{ 
            transform: `translateY(${index * 10}px)`,
            zIndex: 50 - index
          }}
        >
          <SuccessBanner
            type={banner.type}
            title={banner.title}
            message={banner.message}
            isVisible={true}
            onClose={() => closeBanner(banner.id)}
            action={banner.action}
          />
        </div>
      ))}
    </div>
  )

  return {
    showBanner,
    BannerContainer
  }
}
