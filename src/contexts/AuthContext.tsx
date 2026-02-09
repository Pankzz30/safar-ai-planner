import React, { createContext, useContext, useState, useCallback } from "react";

interface UserPreferences {
  location: string;
  interests: string[];
  budget: string;
  tripStyle: string;
  offbeat: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  isNewUser: boolean;
  preferences: UserPreferences | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  completeOnboarding: (prefs: UserPreferences) => void;
  savedTrips: string[];
  wishlist: string[];
  toggleSaveTrip: (id: string) => void;
  toggleWishlist: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [savedTrips, setSavedTrips] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const login = useCallback(async (email: string, _password: string) => {
    // Mock login
    const stored = localStorage.getItem(`safar_user_${email}`);
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser({
        id: "user_1",
        name: email.split("@")[0],
        email,
        isNewUser: true,
        preferences: null,
      });
    }
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      isNewUser: true,
      preferences: null,
    };
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSavedTrips([]);
    setWishlist([]);
  }, []);

  const completeOnboarding = useCallback((prefs: UserPreferences) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, isNewUser: false, preferences: prefs };
      localStorage.setItem(`safar_user_${prev.email}`, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleSaveTrip = useCallback((id: string) => {
    setSavedTrips((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        completeOnboarding,
        savedTrips,
        wishlist,
        toggleSaveTrip,
        toggleWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
