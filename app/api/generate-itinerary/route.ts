import OpenAI from "openai";
import type { NextRequest } from "next/server";
import type { Itinerary, ItineraryItem } from "@/lib/types"; // Assuming your types are here

// Initialize OpenAI client
// Ensure your OPENAI_API_KEY is set in your .env.local file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { location, interests, duration } = await req.json();

    if (!location || !interests || !duration) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `
You are an expert travel itinerary planner. Your goal is to generate a personalized travel itinerary based on the user's specified location, interests, and trip duration.

Respond ONLY with a valid JSON object that strictly adheres to the following TypeScript interfaces:

interface ItineraryItem {
  name: string; // Name of the place or activity
  description: string; // A brief, engaging description (2-3 sentences)
  estimatedTime: string; // Estimated time, e.g., "1 hour", "2.5 hours", "30 minutes"
}

interface Itinerary {
  location: string; // The primary location of the itinerary
  interests: string[]; // List of interests provided by the user
  duration: string; // The duration category (e.g., "quick", "half-day", "full-day")
  items: ItineraryItem[]; // An array of itinerary items. Generate 2-5 items based on duration.
}

- For 'quick' duration (1-2 hours), generate 1-2 items.
- For 'half-day' duration (3-4 hours), generate 2-3 items.
- For 'full-day' duration (6-8 hours), generate 3-5 items.

Do NOT include any explanatory text or markdown formatting before or after the JSON object.
Do NOT include 'id' or 'dateCreated' fields in the Itinerary object you return; these will be handled client-side if needed, or you can add them after parsing.
Ensure the descriptions are concise and appealing.
Tailor the suggestions to the provided interests.
`;

    const userMessage = `Generate an itinerary for a trip to ${location} with interests in ${interests.join(", ")} for a ${duration} duration.`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      model: "gpt-4o-mini", // Or your preferred model, e.g., gpt-4
      response_format: { type: "json_object" }, // Ensure JSON output
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;

    if (!responseContent) {
      return new Response(
        JSON.stringify({ error: "Failed to get response from OpenAI" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Attempt to parse the JSON content
    let parsedItineraryData: Omit<Itinerary, 'id' | 'dateCreated'>;
    try {
      parsedItineraryData = JSON.parse(responseContent);
    } catch (parseError) {
      console.error("OpenAI response (not valid JSON):", responseContent); 
      return new Response(
        JSON.stringify({ error: "Invalid JSON response from OpenAI", details: responseContent }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Construct the full itinerary object, now including id and dateCreated generated server-side
    const fullItinerary: Itinerary = {
      ...parsedItineraryData,
      id: Date.now().toString(), 
      dateCreated: new Date().toISOString(),
    };

    return new Response(JSON.stringify(fullItinerary), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in generate-itinerary API route:", error);
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
