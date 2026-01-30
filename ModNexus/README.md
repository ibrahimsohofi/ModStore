# ModNexus - Mobile Gaming Content Locker

ModNexus is a React-based web application for a premium mobile gaming content locker platform. Users can browse, discover, and "unlock" mobile games through social interactions.

## Features

- **Dark/Light Theme Toggle** - Switch between dark and light modes for comfortable viewing
- **Game Categories** - Browse games by genre, platform, rating, and more
- **Game Details** - View screenshots, features, requirements, and download games
- **User Preferences** - Save favorite games and track recently viewed titles
- **Content Locker** - Unlock premium games through social interactions
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop devices

## Technologies Used

- React 19 with TypeScript
- Vite for fast development and builds
- React Router for navigation
- Tailwind CSS for styling
- shadcn/ui components
- Context API for state management
- LocalStorage for persisting user preferences

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js

### Installation

1. Clone the repository
   ```
   git clone https://github.com/ibrahimsohofi/ModNexus.git
   cd ModNexus
   ```

2. Install dependencies
   ```
   bun install
   ```

3. Start the development server
   ```
   bun run dev
   ```

4. Open your browser and navigate to http://localhost:5173

## Building for Production

```
bun run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

- `src/components` - UI components organized by functionality
- `src/pages` - Page components for each route
- `src/data` - Game data and other static content
- `src/context` - React Context providers for state management
- `src/hooks` - Custom React hooks
- `src/types` - TypeScript type definitions
- `src/lib` - Utility functions and shared code
- `public` - Static assets like images and fonts

## Screenshots

The application features a sleek, cyan-themed UI with a focus on gaming content:

- Home page with featured games and categories
- Game details with screenshots and download options
- Category browsing with filtering and sorting options
- Light and dark mode support

## Deployment

The project is configured for easy deployment to Netlify.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Favicon and logo custom-designed for ModNexus
