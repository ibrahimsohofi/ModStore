// Game resource data types
export interface GameResource {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  unlocks: number;
  featured?: boolean;
  new?: boolean;

  // Extended information
  developer: string;
  publishYear: number;
  version: string;
  size: string;
  platforms: string[];
  ageRating: string;
  features: string[];
  requirements: string;

  // Store and download links
  storeLink?: string;
  downloadLink?: string;
  screenshots: string[];
}
