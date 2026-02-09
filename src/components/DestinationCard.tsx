import { Heart, MapPin, Clock, Star } from "lucide-react";
import { Destination } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  destination: Destination;
  variant?: "default" | "compact";
}

const DestinationCard = ({ destination, variant = "default" }: Props) => {
  const { wishlist, toggleWishlist } = useAuth();
  const navigate = useNavigate();
  const isWished = wishlist.includes(destination.id);

  const handleClick = () => {
    navigate(`/itinerary/${destination.id}`);
  };

  if (variant === "compact") {
    return (
      <div
        onClick={handleClick}
        className="dest-card flex-shrink-0 w-40 snap-start"
      >
        <div className="relative h-28 overflow-hidden rounded-t-2xl">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(destination.id); }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-card/80 backdrop-blur-sm"
          >
            <Heart
              size={14}
              className={isWished ? "fill-primary text-primary" : "text-foreground/70"}
            />
          </button>
        </div>
        <div className="p-2.5">
          <h4 className="font-semibold text-sm text-foreground">{destination.name}</h4>
          <p className="text-xs text-muted-foreground">{destination.distance} km</p>
          <p className="text-xs font-medium text-primary mt-0.5">{destination.budget}</p>
        </div>
      </div>
    );
  }

  return (
    <div onClick={handleClick} className="dest-card">
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 gradient-hero" />
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(destination.id); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm"
        >
          <Heart
            size={16}
            className={isWished ? "fill-primary text-primary" : "text-foreground/70"}
          />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-card/80 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star size={12} className="fill-accent text-accent" />
          <span className="text-xs font-semibold text-foreground">{destination.rating}</span>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-foreground">{destination.name}</h3>
            <p className="text-xs text-muted-foreground">{destination.state}</p>
          </div>
          <span className="text-sm font-bold text-primary">{destination.budget}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {destination.distance} km
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {destination.duration}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {destination.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-badge">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
