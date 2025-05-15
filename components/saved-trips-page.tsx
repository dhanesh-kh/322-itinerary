"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, MapPin, Trash2 } from "lucide-react"
import type { Itinerary } from "@/lib/types"
import { getSavedItineraries, deleteItinerary } from "@/lib/local-storage"

interface SavedTripsPageProps {
  onBackToHome: () => void
  onViewItinerary: (itinerary: Itinerary) => void
}

export default function SavedTripsPage({ onBackToHome, onViewItinerary }: SavedTripsPageProps) {
  const [savedItineraries, setSavedItineraries] = useState<Itinerary[]>([])

  // Load saved itineraries on component mount
  useEffect(() => {
    const itineraries = getSavedItineraries()
    setSavedItineraries(itineraries)
  }, [])

  // Handle deleting an itinerary
  const handleDelete = (id: string) => {
    deleteItinerary(id)
    setSavedItineraries(getSavedItineraries())
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBackToHome} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">My Saved Trips</h1>
      </div>

      {savedItineraries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">You haven't saved any trips yet.</p>
          <Button onClick={onBackToHome}>Plan a New Trip</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {savedItineraries.map((itinerary) => (
            <Card key={itinerary.id}>
              <CardHeader>
                <CardTitle>{itinerary.location}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{itinerary.interests.join(", ")}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Created on {formatDate(itinerary.dateCreated)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => onViewItinerary(itinerary)}>
                  View
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(itinerary.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
