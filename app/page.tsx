"use client"

import { useState } from "react"
import HomePage from "@/components/home-page"
import ItineraryPage from "@/components/itinerary-page"
import SavedTripsPage from "@/components/saved-trips-page"
import type { Itinerary } from "@/lib/types"

export default function App() {
  // Simple state-based navigation
  const [currentPage, setCurrentPage] = useState<"home" | "itinerary" | "saved">("home")

  // State to hold the current itinerary
  const [currentItinerary, setCurrentItinerary] = useState<Itinerary | null>(null)

  // Function to navigate to a specific page
  const navigateTo = (page: "home" | "itinerary" | "saved") => {
    setCurrentPage(page)
  }

  // Function to handle generating an itinerary
  const handleGenerateItinerary = (location: string, interests: string[], duration: string) => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock itinerary data
      const mockItinerary: Itinerary = {
        id: Date.now().toString(),
        location,
        interests,
        duration,
        dateCreated: new Date().toISOString(),
        items: [
          {
            name: "Café de Flore",
            description:
              "Start your day with a classic Parisian breakfast at this historic café, once frequented by famous writers and philosophers. Enjoy a croissant and coffee while people-watching.",
            estimatedTime: "1 hour",
          },
          {
            name: "Luxembourg Gardens",
            description:
              "Take a leisurely stroll through these beautiful gardens. Admire the fountains, statues, and meticulously maintained flowerbeds. Perfect for relaxation and photography.",
            estimatedTime: "1.5 hours",
          },
          {
            name: "Le Comptoir du Relais",
            description:
              "Enjoy a delicious lunch at this popular bistro known for its seasonal French cuisine. The outdoor seating area is perfect for soaking in the local atmosphere.",
            estimatedTime: "1.5 hours",
          },
        ],
      }

      // Set the current itinerary and navigate to the itinerary page
      setCurrentItinerary(mockItinerary)
      navigateTo("itinerary")
    }, 1500) // Simulate 1.5 second API call
  }

  // Render the appropriate page based on currentPage state
  return (
    <main className="min-h-screen bg-background">
      {currentPage === "home" && (
        <HomePage onGenerateItinerary={handleGenerateItinerary} onViewSavedTrips={() => navigateTo("saved")} />
      )}

      {currentPage === "itinerary" && currentItinerary && (
        <ItineraryPage itinerary={currentItinerary} onPlanAnother={() => navigateTo("home")} />
      )}

      {currentPage === "saved" && (
        <SavedTripsPage
          onBackToHome={() => navigateTo("home")}
          onViewItinerary={(itinerary) => {
            setCurrentItinerary(itinerary)
            navigateTo("itinerary")
          }}
        />
      )}
    </main>
  )
}
