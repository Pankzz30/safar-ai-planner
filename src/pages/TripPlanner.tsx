import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { indianCities, destinations } from "@/data/mockData";
import { MapPin, Navigation, Sparkles, ArrowRight } from "lucide-react";

const TripPlanner = () => {
  const navigate = useNavigate();
  const [source, setSource] = useState("Mumbai");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!destination) return;
    setLoading(true);
    const dest = destinations.find(
      (d) => d.name.toLowerCase() === destination.toLowerCase()
    );
    setTimeout(() => {
      setLoading(false);
      navigate(`/itinerary/${dest?.id || "jaipur"}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Plan Your Trip</h1>
        <p className="text-sm text-muted-foreground mt-1">Let AI craft the perfect itinerary</p>
      </div>

      <div className="px-4 space-y-4">
        {/* Source */}
        <div className="glass-card p-4">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">FROM</label>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Navigation size={18} className="text-secondary" />
            </div>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="flex-1 bg-transparent text-foreground font-semibold text-base outline-none"
            >
              {indianCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Connector */}
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-lg">
            <ArrowRight size={18} className="text-primary-foreground rotate-90" />
          </div>
        </div>

        {/* Destination */}
        <div className="glass-card p-4">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">TO</label>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin size={18} className="text-primary" />
            </div>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="flex-1 bg-transparent text-foreground font-semibold text-base outline-none"
            >
              <option value="">Select destination</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.name}>{d.name}, {d.state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!destination || loading}
          className="w-full h-14 rounded-2xl gradient-primary text-primary-foreground font-bold text-base border-0 flex items-center justify-center gap-2 mt-6"
        >
          {loading ? (
            <>
              <Sparkles size={18} className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Sparkles size={18} /> Generate Itinerary
            </>
          )}
        </Button>

        {/* Quick picks */}
        <div className="mt-8">
          <h3 className="section-title mb-3">🔥 Quick Picks</h3>
          <div className="flex flex-wrap gap-2">
            {destinations.slice(0, 5).map((d) => (
              <button
                key={d.id}
                onClick={() => setDestination(d.name)}
                className={`style-chip ${destination === d.name ? "selected" : ""}`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
