"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
  quality?: number
  priority?: boolean
  lazy?: boolean
  onLoad?: () => void
  onError?: () => void
  sizes?: string
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+",
  quality = 75,
  priority = false,
  lazy = true,
  onLoad,
  onError,
  sizes,
  objectFit = "cover"
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isInView, setIsInView] = useState(!lazy || priority)
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observerRef.current?.disconnect()
          }
        })
      },
      {
        rootMargin: "50px"
      }
    )

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [lazy, priority, isInView])

  // Generate optimized image URL (placeholder for actual CDN integration)
  const getOptimizedSrc = (originalSrc: string) => {
    // In a real implementation, this would integrate with a CDN like Cloudinary or ImageKit
    const params = new URLSearchParams()
    if (width) params.set('w', width.toString())
    if (height) params.set('h', height.toString())
    params.set('q', quality.toString())
    params.set('f', 'auto') // Auto format selection
    
    // For demo purposes, return original src
    // In production: return `${CDN_BASE_URL}/${originalSrc}?${params.toString()}`
    return originalSrc
  }

  // Generate srcSet for responsive images
  const generateSrcSet = (originalSrc: string) => {
    if (!width) return undefined
    
    const breakpoints = [0.5, 1, 1.5, 2]
    return breakpoints
      .map(multiplier => {
        const scaledWidth = Math.round(width * multiplier)
        const optimizedSrc = getOptimizedSrc(originalSrc)
        return `${optimizedSrc} ${scaledWidth}w`
      })
      .join(', ')
  }

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setIsError(true)
    onError?.()
  }

  return (
    <div 
      ref={imgRef}
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {/* Placeholder/Loading State */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-guyana-green border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Failed to load image</div>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {isInView && (
        <img
          src={getOptimizedSrc(src)}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            objectFit === "cover" && "object-cover",
            objectFit === "contain" && "object-contain",
            objectFit === "fill" && "object-fill",
            objectFit === "none" && "object-none",
            objectFit === "scale-down" && "object-scale-down"
          )}
          style={{
            width: "100%",
            height: "100%"
          }}
        />
      )}
    </div>
  )
}

// Lazy loading hook for components
export function useLazyLoading<T extends HTMLElement>(
  threshold = 0.1,
  rootMargin = "50px"
) {
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            setIsInView(true)
            setIsLoaded(true)
            observer.disconnect()
          }
        })
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, isLoaded])

  return { ref, isInView, isLoaded }
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0
  })

  useEffect(() => {
    // Measure page load time
    const loadTime = performance.now()
    setMetrics(prev => ({ ...prev, loadTime }))

    // Measure First Contentful Paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, renderTime: entry.startTime }))
          }
        })
      })
      observer.observe({ entryTypes: ['paint'] })

      return () => observer.disconnect()
    }
  }, [])

  const measureInteraction = (name: string) => {
    const startTime = performance.now()
    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      setMetrics(prev => ({ ...prev, interactionTime: duration }))
      
      // Log to analytics (placeholder)
      console.log(`Interaction "${name}" took ${duration.toFixed(2)}ms`)
    }
  }

  return { metrics, measureInteraction }
}

// Image preloader utility
export function preloadImages(urls: string[]) {
  return Promise.all(
    urls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = url
      })
    })
  )
}

// Bundle size analyzer (development only)
export function analyzeBundleSize() {
  if (process.env.NODE_ENV !== 'development') return

  const scripts = Array.from(document.querySelectorAll('script[src]'))
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
  
  const totalSize = [...scripts, ...styles].reduce((total, element) => {
    const src = element.getAttribute('src') || element.getAttribute('href')
    if (src && !src.startsWith('http')) {
      // In a real implementation, you'd fetch the actual file sizes
      return total + 1 // Placeholder
    }
    return total
  }, 0)

  console.log(`Estimated bundle size: ${totalSize} resources`)
}

// Memory usage monitor
export function useMemoryMonitor() {
  const [memoryUsage, setMemoryUsage] = useState<{
    used: number
    total: number
    percentage: number
  } | null>(null)

  useEffect(() => {
    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        setMemoryUsage({
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
        })
      }
    }

    updateMemoryUsage()
    const interval = setInterval(updateMemoryUsage, 5000)

    return () => clearInterval(interval)
  }, [])

  return memoryUsage
}

// Component lazy loading wrapper
export function LazyComponent({ 
  children, 
  fallback = <div>Loading...</div>,
  threshold = 0.1 
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
}) {
  const { ref, isInView } = useLazyLoading<HTMLDivElement>(threshold)

  return (
    <div ref={ref}>
      {isInView ? children : fallback}
    </div>
  )
}
