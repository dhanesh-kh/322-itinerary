"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import HomePage from "@/components/home-page"
import ItineraryPage from "@/components/itinerary-page"
import SavedTripsPage from "@/components/saved-trips-page"
import type { Itinerary } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function App() {
  // Simple state-based navigation
  const [currentPage, setCurrentPage] = useState<"home" | "itinerary" | "saved">("home")

  // State to hold the current itinerary
  const [currentItinerary, setCurrentItinerary] = useState<Itinerary | null>(null)

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to navigate to a specific page
  const navigateTo = (page: "home" | "itinerary" | "saved") => {
    setCurrentPage(page)
  }

  // Function to handle generating an itinerary
  const handleGenerateItinerary = async (location: string, interests: string[], duration: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, interests, duration }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error generating itinerary:', errorData.error);
        alert(`Error: ${errorData.error || 'Failed to generate itinerary.'}`);
        return false; // Indicate failure
      }

      const itineraryData: Itinerary = await response.json();
      setCurrentItinerary(itineraryData);
      navigateTo("itinerary");
      return true; // Indicate success

    } catch (error) {
      console.error('Network error or other issue generating itinerary:', error);
      alert('An unexpected error occurred. Please try again.');
      return false; // Indicate failure
    }
  }

  if (!mounted) {
    // Render a placeholder or null during server rendering and initial client mount to avoid hydration mismatch
    // You could also render a basic button structure without theme-dependent icons here if preferred.
    return (
      <main className="min-h-screen bg-background p-4">
        <div className="flex justify-end">
          <Button variant="outline" size="icon" disabled>
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
          )}
        </Button>
      </div>

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
