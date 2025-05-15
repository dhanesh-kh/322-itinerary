import type { Itinerary } from "./types"

const STORAGE_KEY = "my-local-explorer-itineraries"

// Save an itinerary to localStorage
export function saveItinerary(itinerary: Itinerary): void {
  const savedItineraries = getSavedItineraries()

  // Check if itinerary with same ID already exists
  const existingIndex = savedItineraries.findIndex((item) => item.id === itinerary.id)

  if (existingIndex !== -1) {
    // Update existing itinerary
    savedItineraries[existingIndex] = itinerary
  } else {
    // Add new itinerary
    savedItineraries.push(itinerary)
  }

  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItineraries))
}

// Get all saved itineraries from localStorage
export function getSavedItineraries(): Itinerary[] {
  const savedData = localStorage.getItem(STORAGE_KEY)

  if (!savedData) {
    return []
  }

  try {
    return JSON.parse(savedData) as Itinerary[]
  } catch (error) {
    console.error("Error parsing saved itineraries:", error)
    return []
  }
}

// Get a specific itinerary by ID
export function getItineraryById(id: string): Itinerary | null {
  const savedItineraries = getSavedItineraries()
  return savedItineraries.find((itinerary) => itinerary.id === id) || null
}

// Delete an itinerary by ID
export function deleteItinerary(id: string): void {
  const savedItineraries = getSavedItineraries()
  const updatedItineraries = savedItineraries.filter((itinerary) => itinerary.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItineraries))
}
