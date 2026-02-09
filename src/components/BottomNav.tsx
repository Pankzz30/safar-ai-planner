import { Home, Search, Bookmark, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/home", icon: Home, label: "Home" },
  { path: "/planner", icon: Search, label: "Plan" },
  { path: "/my-trips", icon: Bookmark, label: "Trips" },
  { path: "/wishlist", icon: Heart, label: "Wishlist" },
  { path: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
