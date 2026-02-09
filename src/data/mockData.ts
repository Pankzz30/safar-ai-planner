import destGoa from "@/assets/dest-goa.jpg";
import destJaipur from "@/assets/dest-jaipur.jpg";
import destMunnar from "@/assets/dest-munnar.jpg";
import destVaranasi from "@/assets/dest-varanasi.jpg";
import destManali from "@/assets/dest-manali.jpg";
import destUdaipur from "@/assets/dest-udaipur.jpg";
import destRishikesh from "@/assets/dest-rishikesh.jpg";

export interface Destination {
  id: string;
  name: string;
  state: string;
  image: string;
  distance: number;
  budget: string;
  duration: string;
  tags: string[];
  rating: number;
  offbeat: boolean;
  description: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  places: { name: string; type: string; time: string }[];
  food: { name: string; type: string }[];
  stay: { name: string; price: string; rating: number };
}

export interface ItineraryData {
  destination: string;
  duration: string;
  totalBudget: string;
  transport: { type: string; duration: string; price: string }[];
  days: ItineraryDay[];
  tips: string[];
}

export const destinations: Destination[] = [
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    image: destGoa,
    distance: 460,
    budget: "₹8,000 – ₹15,000",
    duration: "3–4 days",
    tags: ["Beaches", "Food & Culture", "City Life"],
    rating: 4.6,
    offbeat: false,
    description: "Sun, sand, and a vibrant nightlife awaits you in India's beach paradise.",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    image: destJaipur,
    distance: 280,
    budget: "₹5,000 – ₹12,000",
    duration: "2–3 days",
    tags: ["Historic Places", "Shopping", "Food & Culture"],
    rating: 4.5,
    offbeat: false,
    description: "The Pink City – a royal blend of heritage, culture, and vibrant bazaars.",
  },
  {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    image: destMunnar,
    distance: 350,
    budget: "₹6,000 – ₹10,000",
    duration: "3–4 days",
    tags: ["Nature & Scenic", "Adventure & Trekking"],
    rating: 4.7,
    offbeat: true,
    description: "Emerald tea gardens and misty mountains in the Western Ghats.",
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    image: destVaranasi,
    distance: 400,
    budget: "₹4,000 – ₹8,000",
    duration: "2–3 days",
    tags: ["Spiritual & Religious", "Food & Culture", "Historic Places"],
    rating: 4.4,
    offbeat: false,
    description: "One of the world's oldest cities – spirituality meets timeless tradition.",
  },
  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    image: destManali,
    distance: 480,
    budget: "₹7,000 – ₹14,000",
    duration: "4–5 days",
    tags: ["Adventure & Trekking", "Nature & Scenic"],
    rating: 4.5,
    offbeat: false,
    description: "Snow-capped peaks, river rafting, and endless mountain trails.",
  },
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    image: destUdaipur,
    distance: 390,
    budget: "₹6,000 – ₹13,000",
    duration: "3–4 days",
    tags: ["Historic Places", "Nature & Scenic", "Food & Culture"],
    rating: 4.7,
    offbeat: false,
    description: "The City of Lakes – romance, royalty, and breathtaking sunsets.",
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    image: destRishikesh,
    distance: 310,
    budget: "₹4,000 – ₹9,000",
    duration: "2–3 days",
    tags: ["Adventure & Trekking", "Spiritual & Religious"],
    rating: 4.5,
    offbeat: true,
    description: "Yoga capital of the world with thrilling white-water rafting.",
  },
];

export const interests = [
  { id: "historic", label: "Historic Places", icon: "Landmark" },
  { id: "nature", label: "Nature & Scenic", icon: "Trees" },
  { id: "spiritual", label: "Spiritual & Religious", icon: "Sun" },
  { id: "beaches", label: "Beaches", icon: "Waves" },
  { id: "adventure", label: "Adventure & Trekking", icon: "Mountain" },
  { id: "food", label: "Food & Culture", icon: "UtensilsCrossed" },
  { id: "city", label: "City Life", icon: "Building2" },
  { id: "shopping", label: "Shopping", icon: "ShoppingBag" },
] as const;

export const budgetOptions = [
  { id: "budget", label: "Budget Friendly", emoji: "💰", desc: "Under ₹5,000" },
  { id: "balanced", label: "Balanced", emoji: "⚖️", desc: "₹5,000 – ₹15,000" },
  { id: "premium", label: "Premium", emoji: "✨", desc: "₹15,000+" },
];

export const tripStyles = [
  { id: "weekend", label: "Weekend Getaway" },
  { id: "explorer", label: "Explorer" },
  { id: "relaxed", label: "Relaxed" },
  { id: "backpacking", label: "Backpacking" },
];

export const sampleItinerary: ItineraryData = {
  destination: "Jaipur",
  duration: "3 Days / 2 Nights",
  totalBudget: "₹8,500",
  transport: [
    { type: "Train (Rajdhani)", duration: "4h 30m", price: "₹1,200" },
    { type: "Flight (IndiGo)", duration: "1h 15m", price: "₹3,500" },
    { type: "Bus (Volvo AC)", duration: "5h 30m", price: "₹800" },
  ],
  days: [
    {
      day: 1,
      title: "Heritage & History",
      places: [
        { name: "Amber Fort", type: "Historic", time: "9:00 AM" },
        { name: "Jal Mahal", type: "Scenic", time: "12:00 PM" },
        { name: "Nahargarh Fort", type: "Historic", time: "4:00 PM" },
      ],
      food: [
        { name: "LMB (Laxmi Mishthan Bhandar)", type: "Famous thali" },
        { name: "Pyaaz Kachori at Rawat", type: "Street food" },
      ],
      stay: { name: "Hotel Pearl Palace", price: "₹1,800/night", rating: 4.3 },
    },
    {
      day: 2,
      title: "Culture & Shopping",
      places: [
        { name: "Hawa Mahal", type: "Iconic", time: "8:00 AM" },
        { name: "City Palace", type: "Royal", time: "11:00 AM" },
        { name: "Johari Bazaar", type: "Shopping", time: "4:00 PM" },
      ],
      food: [
        { name: "Masala Chowk", type: "Food court" },
        { name: "Dal Baati Churma", type: "Local cuisine" },
      ],
      stay: { name: "Hotel Pearl Palace", price: "₹1,800/night", rating: 4.3 },
    },
    {
      day: 3,
      title: "Offbeat & Departure",
      places: [
        { name: "Elefantastic Elephant Sanctuary", type: "Hidden gem", time: "8:00 AM" },
        { name: "Panna Meena Ka Kund", type: "Offbeat", time: "11:00 AM" },
      ],
      food: [
        { name: "Lassi at Lassiwala", type: "Iconic drink" },
      ],
      stay: { name: "Departure", price: "-", rating: 0 },
    },
  ],
  tips: [
    "Best time to visit: October to March",
    "Carry comfortable shoes for fort walks",
    "Negotiate prices at bazaars",
    "Try local Rajasthani thali – a must!",
  ],
};

export const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
  "Kolkata", "Pune", "Ahmedabad", "Lucknow", "Chandigarh",
  "Bhopal", "Indore", "Nagpur", "Kochi", "Jaipur",
];
