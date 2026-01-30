import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ContentLockerDialog } from "../shared/ContentLockerDialog";
import { SearchBar } from "../shared/SearchBar";
import { ResourceCardGrid } from "./ResourceCard";
import { GAME_RESOURCES } from "../../data/games";
import type { GameResource } from "../../types/games";
import { Filter, ChevronDown, ChevronUp, Download, ShieldAlert, Star } from "lucide-react";

// Extract all unique categories from games data
const uniqueCategories = [...new Set(GAME_RESOURCES.map(game => game.category))];

// Create categories array with counts
const CATEGORIES = [
  { id: "all", name: "All Games", count: GAME_RESOURCES.length },
  ...uniqueCategories.map(category => ({
    id: category,
    name: category.charAt(0).toUpperCase() + category.slice(1),
    count: GAME_RESOURCES.filter(game => game.category === category).length
  }))
];

export function ResourceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<GameResource | null>(null);
  const [filteredResources, setFilteredResources] = useState<GameResource[]>(GAME_RESOURCES);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Apply filtering when category or search query changes
  useEffect(() => {
    let result = GAME_RESOURCES;

    // Filter by category
    if (selectedCategory !== "all") {
      if (selectedCategory === "featured") {
        result = result.filter(resource => resource.featured);
      } else if (selectedCategory === "new") {
        result = result.filter(resource => resource.new);
      } else {
        result = result.filter(resource => resource.category === selectedCategory);
      }
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        resource =>
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.category.toLowerCase().includes(query)
      );
    }

    setFilteredResources(result);
  }, [selectedCategory, searchQuery]);

  const handleResourceClick = (resource: GameResource) => {
    setSelectedResource(resource);
    setIsDialogOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  // Count of featured and new games
  const featuredCount = GAME_RESOURCES.filter(game => game.featured).length;
  const newCount = GAME_RESOURCES.filter(game => game.new).length;

  return (
    <section id="games" className="py-16">
      <div className="container-custom">
        <h2 className="section-title">
          POPULAR <span className="highlight">MOBILE GAMES</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          {/* Search bar */}
          <div className="w-full md:w-1/2">
            <SearchBar
              onSearch={handleSearch}
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search games by title, category or features..."
            />
          </div>

          {/* Filter controls for mobile */}
          <div className="md:hidden w-full">
            <Button
              variant="outline"
              className="w-full flex items-center justify-between border-[#00f7ff]/30 hover:bg-[#00f7ff]/10"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filter: {selectedCategory === "all" ? "All Games" : CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
              </div>
              {showCategoryDropdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {showCategoryDropdown && (
              <div className="mt-2 bg-card border border-[#00f7ff]/20 rounded-md p-2 shadow-lg z-10 relative">
                {CATEGORIES.map(category => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`px-3 py-1.5 text-sm cursor-pointer mb-1 w-full justify-between ${
                      selectedCategory === category.id
                        ? "bg-[#00f7ff] hover:bg-[#00c4cc] text-primary-foreground"
                        : "hover:bg-[#00f7ff]/10 border-[#00f7ff]/30"
                    }`}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs opacity-80">{category.count}</span>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick filter badges for desktop */}
        <div className="hidden md:flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground mr-1">Quick Filters:</span>
          {CATEGORIES.map(category => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`px-3 py-1.5 text-sm cursor-pointer ${
                selectedCategory === category.id
                  ? "bg-[#00f7ff] hover:bg-[#00c4cc] text-primary-foreground"
                  : "hover:bg-[#00f7ff]/10 border-[#00f7ff]/30"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} <span className="ml-1 text-xs opacity-80">({category.count})</span>
            </Badge>
          ))}

          <Badge
            variant={selectedCategory === "featured" ? "default" : "outline"}
            className={`px-3 py-1.5 text-sm cursor-pointer hover:bg-secondary/10 border-secondary/30 ${
              selectedCategory === "featured" ? "bg-[#00f7ff] text-primary-foreground" : ""
            }`}
            onClick={() => setSelectedCategory("featured")}
          >
            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
            Featured <span className="ml-1 text-xs opacity-80">({featuredCount})</span>
          </Badge>

          <Badge
            variant={selectedCategory === "new" ? "default" : "outline"}
            className={`px-3 py-1.5 text-sm cursor-pointer hover:bg-secondary/10 border-secondary/30 ${
              selectedCategory === "new" ? "bg-secondary text-secondary-foreground" : ""
            }`}
            onClick={() => setSelectedCategory("new")}
          >
            <ShieldAlert className="h-3 w-3 mr-1 text-secondary" />
            New <span className="ml-1 text-xs opacity-80">({newCount})</span>
          </Badge>
        </div>

        {/* Active filters display */}
        {(searchQuery || selectedCategory !== "all") && (
          <div className="flex items-center gap-2 mb-6 p-2 bg-card/50 border border-[#00f7ff]/10 rounded">
            <span className="text-sm text-muted-foreground">Active Filters:</span>
            {selectedCategory !== "all" && (
              <Badge className="bg-[#00f7ff]/20 text-foreground hover:bg-[#00f7ff]/30 cursor-pointer" onClick={() => setSelectedCategory("all")}>
                Category: {selectedCategory === "featured"
                  ? "Featured"
                  : selectedCategory === "new"
                  ? "New"
                  : CATEGORIES.find(c => c.id === selectedCategory)?.name} ✕
              </Badge>
            )}
            {searchQuery && (
              <Badge className="bg-[#00f7ff]/20 text-foreground hover:bg-[#00f7ff]/30 cursor-pointer" onClick={() => setSearchQuery("")}>
                Search: "{searchQuery}" ✕
              </Badge>
            )}
            <Button variant="ghost" size="sm" className="ml-auto text-xs" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        )}

        {/* Search results count */}
        {(searchQuery || selectedCategory !== "all") && (
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              {filteredResources.length === 0
                ? `No results found ${searchQuery ? `for "${searchQuery}"` : ""} ${
                    selectedCategory !== "all"
                      ? `in category "${
                          selectedCategory === "featured"
                            ? "Featured"
                            : selectedCategory === "new"
                            ? "New"
                            : CATEGORIES.find(c => c.id === selectedCategory)?.name
                        }"`
                      : ""
                  }`
                : `Found ${filteredResources.length} result${filteredResources.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        )}

        {/* Resources grid */}
        {filteredResources.length > 0 ? (
          <ResourceCardGrid
            resources={filteredResources}
            onClick={handleResourceClick}
            loading={false}
          />
        ) : (
          <div className="text-center py-12 border border-dashed border-[#00f7ff]/20 rounded-lg bg-card/30">
            <Download className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-30" />
            <h3 className="text-xl font-semibold mb-2">No Games Found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or browsing a different category.</p>
            <Button variant="outline" className="border-[#00f7ff]/30 hover:bg-[#00f7ff]/10" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}

        {selectedResource && (
          <ContentLockerDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            title={`Download ${selectedResource.title}`}
            description="Complete one quick verification to download this game:"
            contentId={selectedResource.id}
          />
        )}
      </div>
    </section>
  );
}
