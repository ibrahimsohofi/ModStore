import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import type { GameResource } from "@/types/games";
import { Star, Download } from "lucide-react";

export interface ResourceCardProps {
  resource: GameResource;
  onClick: () => void;
  loading?: boolean;
}

export function ResourceCard({ resource, onClick, loading = false }: ResourceCardProps) {
  const isUnlocked = typeof window !== "undefined" && localStorage.getItem(`unlocked_${resource.id}`) === 'true';

  if (loading) {
    return <ResourceCardSkeleton />;
  }

  return (
    <Card className="overflow-hidden border-[#00f7ff]/20 bg-card/70 backdrop-blur-sm card-hover group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={resource.image}
          alt={resource.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {resource.featured && (
          <Badge className="absolute top-2 left-2 bg-[#00f7ff] text-primary-foreground badge-glow">
            Featured
          </Badge>
        )}
        {resource.new && (
          <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground badge-glow">
            New
          </Badge>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold group-hover:text-[#00f7ff] transition-colors">{resource.title}</h3>
          <Badge variant="outline" className="text-xs border-[#00f7ff]/20">
            {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
          </Badge>
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-2">{resource.description}</p>

        <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>{resource.rating}/5</span>
          </div>
          <div>
            <Download className="h-4 w-4 inline mr-1" />
            <span>{resource.unlocks.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            className={`flex-1 ${isUnlocked ? 'bg-green-600 hover:bg-green-700' : 'btn-primary shine-effect pulse-button'}`}
            onClick={onClick}
          >
            {isUnlocked ? 'PLAY GAME' : 'DOWNLOAD'}
          </Button>

          <Link to={`/games/${resource.id}`} className="w-auto">
            <Button variant="outline" className="border-[#00f7ff]/30 hover:bg-[#00f7ff]/10">
              Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export function ResourceCardSkeleton() {
  return (
    <Card className="overflow-hidden border-[#00f7ff]/20 bg-card/70 backdrop-blur-sm">
      <div className="relative h-48 overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5 mb-4" />

        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

interface ResourceCardGridProps {
  resources: GameResource[];
  onClick: (resource: GameResource) => void;
  loading?: boolean;
  count?: number;
}

export function ResourceCardGrid({ resources, onClick, loading = false, count = 6 }: ResourceCardGridProps) {
  if (loading) {
    // Create an array of ids for skeleton cards to avoid using array index as key
    const skeletonIds = Array.from({ length: count }, (_, i) => `skeleton-card-${Math.random().toString(36).substr(2, 9)}`);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletonIds.map((id) => (
          <ResourceCardSkeleton key={id} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map(resource => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onClick={() => onClick(resource)}
        />
      ))}
    </div>
  );
}
