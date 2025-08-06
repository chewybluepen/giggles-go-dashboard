"use client"

import React, { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Upload,
  X,
  Check,
  AlertCircle,
  Camera,
  FileText,
  Send,
  Eye
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  title: string
  description: string
  longDescription: string
  category: string
  location: string
  date: string
  time: string
  endTime: string
  ageRange: [number, number]
  price: string
  maxAttendees: number
  organizerName: string
  organizerEmail: string
  organizerPhone: string
  organizerBio: string
  tags: string[]
  images: File[]
}

interface ValidationErrors {
  [key: string]: string
}

interface EventSubmissionFormProps {
  onSubmit?: (data: FormData) => void
  onDraft?: (data: FormData) => void
  className?: string
}

const categories = [
  "Arts & Crafts", "Sports & Recreation", "Educational", "Cultural",
  "Music & Dance", "Food & Dining", "Outdoor Adventure", "Community Service",
  "Family Fun", "Health & Wellness"
]

const priceOptions = [
  "Free", "$5", "$10", "$15", "$20", "$25", "$30", "Custom"
]

export function EventSubmissionForm({ 
  onSubmit, 
  onDraft, 
  className 
}: EventSubmissionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    longDescription: "",
    category: "",
    location: "",
    date: "",
    time: "",
    endTime: "",
    ageRange: [0, 18],
    price: "Free",
    maxAttendees: 50,
    organizerName: "",
    organizerEmail: "",
    organizerPhone: "",
    organizerBio: "",
    tags: [],
    images: []
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [newTag, setNewTag] = useState("")
  const [customPrice, setCustomPrice] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const totalSteps = 4

  // Validation rules
  const validateField = (field: string, value: any): string => {
    switch (field) {
      case "title":
        return value.length < 5 ? "Title must be at least 5 characters" : ""
      case "description":
        return value.length < 20 ? "Description must be at least 20 characters" : ""
      case "category":
        return !value ? "Please select a category" : ""
      case "location":
        return !value ? "Location is required" : ""
      case "date":
        return !value ? "Date is required" : ""
      case "time":
        return !value ? "Start time is required" : ""
      case "organizerName":
        return value.length < 2 ? "Organizer name is required" : ""
      case "organizerEmail":
        return !/\S+@\S+\.\S+/.test(value) ? "Valid email is required" : ""
      default:
        return ""
    }
  }

  // Real-time validation
  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }

    // Validate on blur (simulated with timeout)
    setTimeout(() => {
      const error = validateField(field, value)
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }))
      }
    }, 500)
  }

  // Add tag
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag("")
    }
  }

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => 
      file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024 // 5MB limit
    )
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles].slice(0, 5) // Max 5 images
    }))
  }

  // Remove image
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  // Validate current step
  const validateStep = (step: number): boolean => {
    const stepFields = {
      1: ["title", "description", "category"],
      2: ["location", "date", "time"],
      3: ["organizerName", "organizerEmail"],
      4: []
    }

    const fieldsToValidate = stepFields[step as keyof typeof stepFields] || []
    let hasErrors = false

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData])
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }))
        hasErrors = true
      }
    })

    return !hasErrors
  }

  // Navigate steps
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  // Submit form
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      onSubmit?.(formData)
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Save as draft
  const handleDraft = () => {
    onDraft?.(formData)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                placeholder="Enter a catchy event title..."
                className={cn(errors.title && "border-red-500")}
              />
              {errors.title && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                placeholder="Brief description of your event..."
                className={cn("min-h-20", errors.description && "border-red-500")}
              />
              {errors.description && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.description}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Category *</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={formData.category === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFieldChange("category", category)}
                    className={cn(
                      "justify-start text-xs",
                      formData.category === category
                        ? "bg-guyana-green text-guyana-white"
                        : "border-guyana-green/30 text-guyana-green hover:bg-guyana-green/10"
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              {errors.category && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.category}
                </p>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleFieldChange("location", e.target.value)}
                  placeholder="Enter event location..."
                  className={cn("pl-10", errors.location && "border-red-500")}
                />
              </div>
              {errors.location && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.location}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleFieldChange("date", e.target.value)}
                    className={cn("pl-10", errors.date && "border-red-500")}
                  />
                </div>
                {errors.date && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Start Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleFieldChange("time", e.target.value)}
                    className={cn("pl-10", errors.time && "border-red-500")}
                  />
                </div>
                {errors.time && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.time}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleFieldChange("endTime", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="maxAttendees"
                    type="number"
                    value={formData.maxAttendees}
                    onChange={(e) => handleFieldChange("maxAttendees", parseInt(e.target.value))}
                    className="pl-10"
                    min="1"
                    max="1000"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Price</Label>
              <div className="grid grid-cols-4 gap-2">
                {priceOptions.map((price) => (
                  <Button
                    key={price}
                    type="button"
                    variant={formData.price === price ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFieldChange("price", price)}
                    className={cn(
                      "text-xs",
                      formData.price === price
                        ? "bg-guyana-green text-guyana-white"
                        : "border-guyana-green/30 text-guyana-green hover:bg-guyana-green/10"
                    )}
                  >
                    {price}
                  </Button>
                ))}
              </div>
              {formData.price === "Custom" && (
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    placeholder="Enter custom price..."
                    className="pl-10"
                  />
                </div>
              )}
            </div>
          </div>
        )

      default:
        return <div>Step content for step {currentStep}</div>
    }
  }

  return (
    <Card className={cn("cultural-pattern border-guyana-green/20", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-guyana-black dark:text-guyana-white">
          <Send className="h-5 w-5 text-guyana-green" />
          Submit Community Event
        </CardTitle>
        
        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mt-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 h-2 rounded-full transition-all duration-300",
                i + 1 <= currentStep ? "bg-guyana-green" : "bg-gray-200 dark:bg-gray-700"
              )}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {renderStep()}

        <Separator />

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-guyana-green/30 text-guyana-green hover:bg-guyana-green/10"
              >
                Previous
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={handleDraft}
              className="text-muted-foreground hover:text-guyana-green"
            >
              <FileText className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>

          <div className="flex gap-2">
            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                className="bg-guyana-green hover:bg-forest-emerald text-guyana-white tropical-hover"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-guyana-green hover:bg-forest-emerald text-guyana-white tropical-hover"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Event
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
