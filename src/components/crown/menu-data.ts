// Menu data — exact prices from the supplied Crown Fried Chicken menu.
// Categories drive the menu section's filterable UI.

export type Price = string;
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  /** Each price tier — quantity label + price (and optional note like "with fries"). */
  tiers?: { qty: string; price: Price; note?: string }[];
  /** Single price items (sides/drinks). */
  single?: { label: string; price: Price }[];
  category: CategoryId;
  startingAt?: Price;
}

export type CategoryId =
  | "all"
  | "chicken"
  | "wings"
  | "seafood"
  | "combos"
  | "sides"
  | "drinks";

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "chicken", label: "Chicken" },
  { id: "wings", label: "Wings" },
  { id: "seafood", label: "Seafood" },
  { id: "combos", label: "Combos" },
  { id: "sides", label: "Sides" },
  { id: "drinks", label: "Drinks" },
];

export const MENU: MenuItem[] = [
  {
    id: "fried-chicken",
    name: "Fried Chicken",
    description:
      "Golden, hand-breaded and fried fresh to order. The signature crunch that built the crown.",
    image: "/food/hero-chicken.png",
    category: "chicken",
    startingAt: "$9.50",
    tiers: [
      { qty: "2 PC", price: "$9.50" },
      { qty: "3 PC", price: "$11.50" },
      { qty: "5 PC", price: "$15.50" },
      { qty: "6 PC", price: "$17.50" },
    ],
  },
  {
    id: "chicken-only",
    name: "Chicken Only",
    description:
      "Bulk fried chicken for the table — pieces piled high, crust still crackling.",
    image: "/food/chicken-only.png",
    category: "chicken",
    startingAt: "$15.50",
    tiers: [
      { qty: "6 PC", price: "$15.50" },
      { qty: "9 PC", price: "$17.75" },
      { qty: "15 PC", price: "$25.00" },
      { qty: "21 PC", price: "$32.00" },
      { qty: "35 PC", price: "$55.00" },
    ],
  },
  {
    id: "buffalo-wings",
    name: "Buffalo Wings",
    description:
      "Tossed in a glossy, tangy buffalo sauce with just enough heat to keep you coming back.",
    image: "/food/buffalo-wings.png",
    category: "wings",
    startingAt: "$12.75",
    tiers: [
      { qty: "10 PC", price: "$12.75" },
      { qty: "15 PC", price: "$18.00" },
      { qty: "20 PC", price: "$23.50" },
      { qty: "25 PC", price: "$28.50" },
    ],
  },
  {
    id: "hot-wings",
    name: "Hot Wings",
    description:
      "Crackling hot wings glazed in a sticky, peppery sauce. Bring the napkins.",
    image: "/food/hot-wings.png",
    category: "wings",
    startingAt: "$10.50",
    tiers: [
      { qty: "6 PC", price: "$10.50" },
      { qty: "9 PC", price: "$12.50" },
      { qty: "12 PC", price: "$14.75" },
      { qty: "15 PC", price: "$18.00" },
    ],
  },
  {
    id: "regular-wings",
    name: "Regular Wings",
    description:
      "Classic crispy fried wings — no sauce, all crunch. Pure Crown flavor.",
    image: "/food/regular-wings.png",
    category: "wings",
    startingAt: "$14.00",
    tiers: [
      { qty: "6 PC", price: "$14.00" },
      { qty: "12 PC", price: "$21.00" },
      { qty: "24 PC", price: "$36.00" },
    ],
  },
  {
    id: "chicken-nuggets",
    name: "Chicken Nuggets",
    description:
      "Bite-size golden crunch — perfect for the kids (and the kid in you).",
    image: "/food/nuggets.png",
    category: "chicken",
    startingAt: "$6.25",
    tiers: [
      { qty: "6 PC", price: "$6.25", note: "$8.75 with fries" },
      { qty: "9 PC", price: "$7.50", note: "$10.00 with fries" },
      { qty: "15 PC", price: "$10.50", note: "$13.00 with fries" },
      { qty: "21 PC", price: "$12.50", note: "$15.00 with fries" },
    ],
  },
  {
    id: "seafood-platters",
    name: "Seafood Platters",
    description:
      "Jumbo breaded shrimp fried golden — the Crown take on seafood, crisp and clean.",
    image: "/food/seafood.png",
    category: "seafood",
    startingAt: "$6.50",
    tiers: [
      { qty: "Shrimp Basket Only", price: "$6.50" },
      { qty: "Shrimp Basket w/ Fry", price: "$8.50" },
      { qty: "6 PC Jumbo Only", price: "$9.00" },
      { qty: "6 PC Jumbo w/ Fry", price: "$12.00" },
      { qty: "9 PC Jumbo Only", price: "$12.00" },
      { qty: "9 PC Jumbo w/ Fry", price: "$15.00" },
    ],
  },
  {
    id: "tilapia-combos",
    name: "Tilapia Combos",
    description:
      "Whole crispy tilapia fried to a golden crunch, served with fries or rice.",
    image: "/food/tilapia.png",
    category: "combos",
    startingAt: "$9.50",
    tiers: [
      { qty: "2 PC w/ Fry or Rice", price: "$9.50" },
      { qty: "3 PC w/ Fry or Rice", price: "$11.50" },
      { qty: "4 PC w/ Fry or Rice", price: "$13.50" },
      { qty: "5 PC w/ Fry or Rice", price: "$15.50" },
    ],
  },
  {
    id: "sides",
    name: "Sides",
    description:
      "The supporting cast: golden fries, creamy mash, mozzarella sticks and more.",
    image: "/food/fries.png",
    category: "sides",
    startingAt: "$3.00",
    single: [
      { label: "Mash", price: "$3.00" },
      { label: "Cole Slaw", price: "$3.00" },
      { label: "Mac Salad", price: "$3.00" },
      { label: "Potato Wedges", price: "$4.00" },
      { label: "Onion Ring", price: "$3.50" },
      { label: "Mozz 6 PC", price: "$5.50" },
      { label: "Mozz 12 PC", price: "$10.50" },
      { label: "Beef Patty", price: "$3.00" },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Ice-cold cans, bottles and 2-liters to wash down the crunch.",
    image: "/food/drinks.png",
    category: "drinks",
    startingAt: "$1.50",
    single: [
      { label: "Bottled Water", price: "$1.50" },
      { label: "Cans", price: "$1.50" },
      { label: "20 OZ Bottle", price: "$2.50" },
      { label: "2LT", price: "$3.75" },
      { label: "Jarritos", price: "$3.50" },
    ],
  },
];

export function itemsFor(cat: CategoryId): MenuItem[] {
  if (cat === "all") return MENU;
  return MENU.filter((m) => m.category === cat);
}
