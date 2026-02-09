import { useAuth } from "@/contexts/AuthContext";
import { destinations } from "@/data/mockData";
import DestinationCard from "@/components/DestinationCard";
import { MapPin, Bell, Flame, Target, Wallet, Mountain, Star } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";
import { useNavigate } from "react-router-dom";

const sections = [
  { icon: Flame, title: "Trips Near You", emoji: "🔥", filter: () => true },
  { icon: Target, title: "Recommended for You", emoji: "🎯", filter: () => true },
  { icon: Wallet, title: "Budget-Friendly Picks", emoji: "💰", filter: (d: typeof destinations[0]) => d.budget.includes("4,000") || d.budget.includes("5,000") },
  { icon: Mountain, title: "Offbeat Gems", emoji: "🌄", filter: (d: typeof destinations[0]) => d.offbeat },
  { icon: Star, title: "Popular This Month", emoji: "⭐", filter: (d: typeof destinations[0]) => d.rating >= 4.5 },
];

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 pt-5 pb-3 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Hey, {user?.name || "Traveller"} 👋</p>
          <h1 className="text-xl font-bold text-foreground">Where to next?</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-1.5 rounded-full">
            <MapPin size={12} /> {user?.preferences?.location || "Mumbai"}
          </div>
          <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <Bell size={18} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-4 mb-5">
        <div
          onClick={() => navigate("/planner")}
          className="relative h-40 rounded-2xl overflow-hidden cursor-pointer"
        >
          <img src={heroImage} alt="Plan your trip" className="w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-lg font-bold text-primary-foreground">Plan with AI ✨</h2>
            <p className="text-xs text-primary-foreground/80 mt-0.5">
              Get personalized itineraries powered by Safar AI
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, sIdx) => {
        const filtered = destinations.filter(section.filter);
        if (filtered.length === 0) return null;
        return (
          <div key={sIdx} className="mb-6">
            <div className="px-4 mb-3">
              <h3 className="section-title">
                {section.emoji} {section.title}
              </h3>
            </div>
            {sIdx === 0 ? (
              /* Horizontal scroll for first section */
              <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
                {filtered.map((d) => (
                  <DestinationCard key={d.id} destination={d} variant="compact" />
                ))}
              </div>
            ) : (
              <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.slice(0, 4).map((d) => (
                  <DestinationCard key={d.id} destination={d} />
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="h-4" />
    </div>
  );
};

export default Home;
