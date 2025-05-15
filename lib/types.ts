export interface ItineraryItem {
  name: string
  description: string
  estimatedTime: string
}

export interface Itinerary {
  id: string
  location: string
  interests: string[]
  duration: string
  dateCreated: string
  items: ItineraryItem[]
}
