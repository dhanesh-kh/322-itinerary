# AI-Powered Travel Itinerary Planner

This is a web application that helps users generate personalized travel itineraries using the power of OpenAI's GPT models. Users can input their desired location, select their interests, and specify the duration of their trip, and the application will generate a tailored itinerary with suggested activities and estimated times.

## Features

-   **Personalized Itinerary Generation**: Creates travel plans based on user inputs for location, interests, and duration.
-   **Dynamic UI**: Built with React and Next.js for a responsive and modern user experience.
-   **OpenAI Integration**: Leverages the OpenAI API to generate creative and relevant itinerary suggestions.
-   **Save and View Trips**: Allows users to save generated itineraries to their browser's local storage and view or delete them later.
-   **Simple Navigation**: Easy-to-use interface to switch between planning a new trip, viewing a generated itinerary, and managing saved trips.
-   **Theming**: Supports system preference for light/dark mode using `next-themes`.
-   **UI Components**: Utilizes `shadcn/ui` for pre-built, accessible, and customizable UI components.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Library**: [React](https://reactjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **AI**: [OpenAI API](https://platform.openai.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

-   Node.js (v18.x or later recommended)
-   npm, pnpm, or yarn
-   An OpenAI API Key

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    Choose your package manager:
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project and add your OpenAI API key:
    ```env
    OPENAI_API_KEY=your_openai_api_key_here
    ```
    *Note: `.env.local` is already included in the `.gitignore` file to prevent accidental exposure of your API key.*

### Running the Application

To start the development server:

```bash
npm run dev
# or
# yarn dev
# or
# pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

-   `app/`: Contains the core application routes, layouts, and pages (using Next.js App Router).
    -   `app/page.tsx`: The main entry point and controller for the application's views.
    -   `app/layout.tsx`: The root layout for the application, including theme setup.
    -   `app/globals.css`: Global stylesheets.
    -   `app/api/generate-itinerary/route.ts`: The API route that handles communication with the OpenAI API.
-   `components/`: Contains reusable React components.
    -   `components/home-page.tsx`: UI for the itinerary planning form.
    -   `components/itinerary-page.tsx`: UI for displaying the generated itinerary.
    -   `components/saved-trips-page.tsx`: UI for displaying saved trips (if implemented).
    -   `components/ui/`: Components from `shadcn/ui`.
    -   `components/theme-provider.tsx`: Component for managing application theme (light/dark mode).
-   `lib/`: Contains utility functions and type definitions.
    -   `lib/types.ts`: TypeScript type definitions for `Itinerary` and `ItineraryItem`.
-   `public/`: Static assets.
-   `styles/`: Additional styles (if any beyond `globals.css`).
-   Configuration files (e.g., `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`).

## How to Use

1.  Navigate to the application's home page.
2.  Enter the location you want to visit.
3.  Select your interests from the provided list.
4.  Choose the duration of your trip.
5.  Click "Generate Itinerary".
6.  The application will fetch a personalized itinerary from OpenAI and display it.
7.  On the itinerary page, you can click "Save This Itinerary" to store it in your browser's local storage.
8.  Access saved trips via the "My Saved Trips" button on the home page, where you can view or delete them.

## Future Enhancements

-   **User Authentication**: Allow users to create accounts to save their preferences and itineraries across devices (could replace or augment local storage).
-   **Cloud-Based Storage**: Implement a backend database to store saved itineraries, enabling cross-device access if user accounts are added.
-   **More Customization**: Add options for budget, travel style, specific dates, etc.
-   **Mapping Integration**: Display itinerary locations on a map.
-   **Error Handling**: More robust and user-friendly error messages.
-   **Loading Skeletons**: Implement more sophisticated loading states instead of simple spinners.
