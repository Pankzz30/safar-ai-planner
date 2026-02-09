import { useAuth } from "@/contexts/AuthContext";
import { destinations } from "@/data/mockData";
import DestinationCard from "@/components/DestinationCard";
import { Bookmark } from "lucide-react";

const MyTrips = () => {
  const { savedTrips } = useAuth();
  const trips = destinations.filter((d) => savedTrips.includes(d.id));

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">My Trips</h1>
        <p className="text-sm text-muted-foreground mt-1">Your saved itineraries</p>
      </div>

      <div className="px-4">
        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Bookmark size={28} className="text-muted-foreground" />
            </div>
            <h3 className="font-bold text-foreground mb-1">No saved trips yet</h3>
            <p className="text-sm text-muted-foreground">
              Explore destinations and save your favorites
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trips.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
