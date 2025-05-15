"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toggle } from "@/components/ui/toggle"
import { Loader2 } from "lucide-react"

interface HomePageProps {
  onGenerateItinerary: (location: string, interests: string[], duration: string) => void
  onViewSavedTrips: () => void
}

const INTERESTS = ["History", "Food", "Art", "Nature", "Shopping", "Nightlife", "Hidden Gems", "Family Fun"]

export default function HomePage({ onGenerateItinerary, onViewSavedTrips }: HomePageProps) {
  const [location, setLocation] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [duration, setDuration] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Toggle interest selection
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!location || selectedInterests.length === 0 || !duration) {
      // Simple validation - could be enhanced with proper form validation
      alert("Please fill in all fields")
      return
    }

    setIsLoading(true)

    // Call the parent component's function to generate itinerary
    onGenerateItinerary(location, selectedInterests, duration)

    // Reset loading state after a delay (simulating API call)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Plan Your Adventure</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Input */}
        <div className="space-y-2">
          <Label htmlFor="location">Where are you exploring?</Label>
          <Input
            id="location"
            placeholder="e.g., Paris, France or Current Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Interests Selection */}
        <div className="space-y-2">
          <Label>What are your interests?</Label>
          <div className="grid grid-cols-2 gap-2">
            {INTERESTS.map((interest) => (
              <Toggle
                key={interest}
                pressed={selectedInterests.includes(interest)}
                onPressedChange={() => toggleInterest(interest)}
                variant="outline"
                className="justify-start"
              >
                {interest}
              </Toggle>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div className="space-y-2">
          <Label htmlFor="duration">How much time do you have?</Label>
          <Select onValueChange={setDuration}>
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quick">Quick Trip (1-2 hours)</SelectItem>
              <SelectItem value="half-day">Half Day (3-4 hours)</SelectItem>
              <SelectItem value="full-day">Full Day (6-8 hours)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Itinerary"
          )}
        </Button>

        <Button type="button" variant="outline" className="w-full" onClick={onViewSavedTrips}>
          My Saved Trips
        </Button>
      </form>
    </div>
  )
}
