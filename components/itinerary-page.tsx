"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowLeft, Clock } from "lucide-react"
import type { Itinerary } from "@/lib/types"
import { saveItinerary } from "@/lib/local-storage"

interface ItineraryPageProps {
  itinerary: Itinerary
  onPlanAnother: () => void
}

export default function ItineraryPage({ itinerary, onPlanAnother }: ItineraryPageProps) {
  const [isSaved, setIsSaved] = useState(false)

  // Handle saving the itinerary
  const handleSave = () => {
    saveItinerary(itinerary)
    setIsSaved(true)

    // Reset the saved state after 3 seconds
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onPlanAnother} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Your Custom Itinerary</h1>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">{itinerary.location}</h2>
        <p className="text-muted-foreground">
          {itinerary.interests.join(", ")} •{" "}
          {itinerary.duration === "quick"
            ? "Quick Trip (1-2 hours)"
            : itinerary.duration === "half-day"
              ? "Half Day (3-4 hours)"
              : "Full Day (6-8 hours)"}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {itinerary.items.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>{item.estimatedTime}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <Button className="w-full" onClick={handleSave} disabled={isSaved}>
          {isSaved ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved!
            </>
          ) : (
            "Save This Itinerary"
          )}
        </Button>

        <Button variant="outline" className="w-full" onClick={onPlanAnother}>
          Plan Another Trip
        </Button>
      </div>
    </div>
  )
}
