import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Heart, Bookmark, Settings, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { interests, budgetOptions, tripStyles } from "@/data/mockData";

const Profile = () => {
  const { user, logout, savedTrips, wishlist } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const prefs = user?.preferences;

  const menuItems = [
    { icon: Bookmark, label: "Saved Trips", value: `${savedTrips.length}`, path: "/my-trips" },
    { icon: Heart, label: "Wishlist", value: `${wishlist.length}`, path: "/wishlist" },
    { icon: Settings, label: "Edit Preferences", value: "", path: "/onboarding" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </div>

      {/* User Card */}
      <div className="px-4 mb-6">
        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
            <User size={24} className="text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Preferences */}
      {prefs && (
        <div className="px-4 mb-6">
          <h3 className="section-title mb-3">Your Preferences</h3>
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-primary" />
              <span className="text-sm text-foreground">{prefs.location}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {prefs.interests.map((id) => {
                const item = interests.find((i) => i.id === id);
                return item ? (
                  <span key={id} className="tag-badge">{item.label}</span>
                ) : null;
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{budgetOptions.find((b) => b.id === prefs.budget)?.emoji}</span>
              <span>{budgetOptions.find((b) => b.id === prefs.budget)?.label}</span>
              <span>•</span>
              <span>{tripStyles.find((s) => s.id === prefs.tripStyle)?.label}</span>
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="px-4 space-y-2 mb-6">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="glass-card w-full p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.value && (
                <span className="text-xs font-semibold text-primary">{item.value}</span>
              )}
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>

      <div className="px-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-12 rounded-xl border-destructive/30 text-destructive font-semibold"
        >
          <LogOut size={16} className="mr-2" /> Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
