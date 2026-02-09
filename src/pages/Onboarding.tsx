import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { interests, budgetOptions, tripStyles } from "@/data/mockData";
import type { LucideIcon } from "lucide-react";
import {
  MapPin, Landmark, Trees, Sun, Waves, Mountain,
  UtensilsCrossed, Building2, ShoppingBag, ChevronRight, ChevronLeft, Globe,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Landmark, Trees, Sun, Waves, Mountain, UtensilsCrossed, Building2, ShoppingBag,
};

const Onboarding = () => {
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [location] = useState("Mumbai");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [tripStyle, setTripStyle] = useState("");
  const [offbeat, setOffbeat] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const canContinue = () => {
    if (step === 0) return true;
    if (step === 1) return selectedInterests.length > 0;
    if (step === 2) return !!budget;
    if (step === 3) return !!tripStyle;
    return false;
  };

  const handleFinish = () => {
    completeOnboarding({
      location,
      interests: selectedInterests,
      budget,
      tripStyle,
      offbeat,
    });
    navigate("/home");
  };

  const totalSteps = 4;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground font-medium">
            Step {step + 1} of {totalSteps}
          </span>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="text-sm text-primary font-medium flex items-center gap-1">
              <ChevronLeft size={16} /> Back
            </button>
          )}
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? "gradient-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Step 0: Location */}
        {step === 0 && (
          <div className="animate-slide-up space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">📍 Where are you?</h2>
              <p className="text-sm text-muted-foreground mt-2">
                We'll show trips near you (300–500 km radius)
              </p>
            </div>
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <MapPin size={22} className="text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Detected location</p>
                <p className="text-lg font-bold text-foreground">{location}, Maharashtra</p>
              </div>
              <Globe size={18} className="text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              ✨ Showing trips within 300–500 km of your city
            </p>
          </div>
        )}

        {/* Step 1: Interests */}
        {step === 1 && (
          <div className="animate-slide-up space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-foreground">🎯 What excites you?</h2>
              <p className="text-sm text-muted-foreground mt-1">Pick all that interest you</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((item, idx) => {
                const Icon = iconMap[item.icon];
                const isSelected = selectedInterests.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleInterest(item.id)}
                    className={`interest-card animate-fade-in-delay stagger-${idx + 1}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                      isSelected ? "gradient-primary" : "bg-muted"
                    }`}>
                      {Icon && <Icon size={20} className={isSelected ? "text-primary-foreground" : "text-muted-foreground"} />}
                    </div>
                    <p className={`text-sm font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                      {item.label}
                    </p>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-xs">✓</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Budget */}
        {step === 2 && (
          <div className="animate-slide-up space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">💰 Budget comfort</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Used to filter transport, stays, and activities
              </p>
            </div>
            <div className="space-y-3">
              {budgetOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setBudget(opt.id)}
                  className={`budget-option ${budget === opt.id ? "selected" : ""}`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <p className="font-bold text-foreground mt-1">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Style + Toggle */}
        {step === 3 && (
          <div className="animate-slide-up space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">🧳 Trip style</h2>
              <p className="text-sm text-muted-foreground mt-1">How do you like to travel?</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tripStyles.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setTripStyle(s.id)}
                  className={`style-chip ${tripStyle === s.id ? "selected" : ""}`}
                >
                  {s.label}
                </div>
              ))}
            </div>
            <div
              onClick={() => setOffbeat(!offbeat)}
              className="glass-card p-4 flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="font-semibold text-foreground">
                  {offbeat ? "🌿 Offbeat / Less-Crowded" : "⭐ Popular Destinations"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {offbeat ? "Hidden gems away from crowds" : "Trending and well-known spots"}
                </p>
              </div>
              <div className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors ${
                offbeat ? "gradient-primary" : "bg-muted"
              }`}>
                <div className={`w-5 h-5 rounded-full bg-card shadow transition-transform ${
                  offbeat ? "translate-x-5" : "translate-x-0"
                }`} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-8 pt-2">
        <Button
          onClick={step === 3 ? handleFinish : () => setStep(step + 1)}
          disabled={!canContinue()}
          className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold text-base border-0 flex items-center justify-center gap-2"
        >
          {step === 3 ? "Start Exploring 🚀" : (
            <>Continue <ChevronRight size={18} /></>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
