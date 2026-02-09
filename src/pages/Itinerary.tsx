import { useParams, useNavigate } from "react-router-dom";
import { destinations, sampleItinerary } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft, MapPin, Clock, Wallet, Train, Plane, Bus,
  Utensils, Hotel, Lightbulb, Bookmark, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import type { LucideIcon } from "lucide-react";

const transportIcons: Record<string, LucideIcon> = {
  Train, Flight: Plane, Bus,
};

const Itinerary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedTrips, toggleSaveTrip } = useAuth();
  const dest = destinations.find((d) => d.id === id) || destinations[1];
  const isSaved = savedTrips.includes(dest.id);
  const data = sampleItinerary;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <div className="relative h-56">
        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <button
            onClick={() => toggleSaveTrip(dest.id)}
            className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
          >
            <Bookmark
              size={18}
              className={isSaved ? "fill-primary text-primary" : "text-foreground"}
            />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <h1 className="text-2xl font-bold text-primary-foreground">{dest.name}</h1>
          <p className="text-sm text-primary-foreground/80">{dest.state}</p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="glass-card p-4 flex items-center justify-around">
          <div className="text-center">
            <Clock size={16} className="text-primary mx-auto mb-1" />
            <p className="text-xs font-bold text-foreground">{data.duration}</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <Wallet size={16} className="text-primary mx-auto mb-1" />
            <p className="text-xs font-bold text-foreground">{data.totalBudget}</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <Star size={16} className="text-accent mx-auto mb-1" />
            <p className="text-xs font-bold text-foreground">{dest.rating}</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* Transport */}
        <div>
          <h3 className="section-title mb-3">🚆 Getting There</h3>
          <div className="space-y-2">
            {data.transport.map((t, i) => {
              const type = t.type.split(" ")[0];
              const Icon = transportIcons[type] || Train;
              return (
                <div key={i} className="glass-card p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-secondary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.type}</p>
                      <p className="text-xs text-muted-foreground">{t.duration}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary">{t.price}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day-wise */}
        {data.days.map((day) => (
          <div key={day.day}>
            <h3 className="section-title mb-3">
              📅 Day {day.day}: {day.title}
            </h3>

            {/* Places */}
            <div className="space-y-2 mb-3">
              {day.places.map((p, i) => (
                <div key={i} className="itinerary-card flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.type} • {p.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Food */}
            <div className="space-y-2 mb-3">
              {day.food.map((f, i) => (
                <div key={i} className="itinerary-card flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Utensils size={14} className="text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.type}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stay */}
            {day.stay.rating > 0 && (
              <div className="itinerary-card flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Hotel size={14} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{day.stay.name}</p>
                  <p className="text-xs text-muted-foreground">{day.stay.price}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} className="fill-accent text-accent" />
                  <span className="text-xs font-semibold text-foreground">{day.stay.rating}</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Tips */}
        <div>
          <h3 className="section-title mb-3">💡 Travel Tips</h3>
          <div className="glass-card p-4 space-y-2">
            {data.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <Lightbulb size={14} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={() => toggleSaveTrip(dest.id)}
          className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold border-0"
        >
          {isSaved ? "✓ Saved to My Trips" : "Save This Trip"}
        </Button>
      </div>
    </div>
  );
};

export default Itinerary;
