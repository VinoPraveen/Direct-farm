// ============================================
// data.js
// This file holds sample product data.
// In a real project this would come from a server/database,
// but for our college project we just use a JavaScript array.
//
// Each product now also has:
//   rating   - number out of 5, shown as stars on the cards
//   farmer   - name of the farm/farmer selling it
//   isOrganic - true/false, shown as a small badge
// ============================================

var sampleProducts = [

  // ---------- VEGETABLES ----------
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "vegetables",
    price: 40,
    unit: "kg",
    image: "images/tomato.png",
    description: "Juicy, farm-fresh tomatoes picked daily. Great for salads, curries, and sauces.",
    rating: 4.5,
    farmer: "Green Valley Farm",
    isOrganic: true
  },
  {
    id: 2,
    name: "Organic Carrots",
    category: "vegetables",
    price: 35,
    unit: "kg",
    image: "images/carrot.png",
    description: "Crunchy organic carrots grown without harmful pesticides. Rich in vitamins.",
    rating: 4.6,
    farmer: "Sunrise Organics",
    isOrganic: true
  },
  {
    id: 3,
    name: "Green Spinach",
    category: "vegetables",
    price: 25,
    unit: "bunch",
    image: "images/spinach.png",
    description: "Fresh leafy spinach, perfect for healthy meals and smoothies.",
    rating: 4.3,
    farmer: "Green Valley Farm",
    isOrganic: false
  },
  {
    id: 11,
    name: "Farm Potatoes",
    category: "vegetables",
    price: 30,
    unit: "kg",
    image: "images/potato.png",
    description: "All-purpose potatoes, freshly dug and great for every kind of cooking.",
    rating: 4.2,
    farmer: "Hilltop Farms",
    isOrganic: false
  },
  {
    id: 12,
    name: "Red Onions",
    category: "vegetables",
    price: 32,
    unit: "kg",
    image: "images/onion.png",
    description: "Firm, flavourful red onions grown by local farmers.",
    rating: 4.1,
    farmer: "Hilltop Farms",
    isOrganic: false
  },
  {
    id: 13,
    name: "Fresh Brinjal",
    category: "vegetables",
    price: 28,
    unit: "kg",
    image: "images/brinjal.png",
    description: "Glossy, tender brinjal (eggplant) picked at peak freshness.",
    rating: 4.0,
    farmer: "Green Valley Farm",
    isOrganic: false
  },
  {
    id: 14,
    name: "Green Beans",
    category: "vegetables",
    price: 38,
    unit: "kg",
    image: "images/beans.png",
    description: "Crisp green beans, a healthy side for any meal.",
    rating: 4.3,
    farmer: "Sunrise Organics",
    isOrganic: true
  },
  {
    id: 15,
    name: "Cauliflower",
    category: "vegetables",
    price: 30,
    unit: "piece",
    image: "images/cauliflower.png",
    description: "Fresh whole cauliflower, perfect for curries and stir-fries.",
    rating: 4.2,
    farmer: "Hilltop Farms",
    isOrganic: false
  },
  {
    id: 16,
    name: "Green Cabbage",
    category: "vegetables",
    price: 22,
    unit: "piece",
    image: "images/cabbage.png",
    description: "Crunchy green cabbage, great for salads and stir-fries.",
    rating: 4.0,
    farmer: "Green Valley Farm",
    isOrganic: false
  },

  // ---------- FRUITS ----------
  {
    id: 4,
    name: "Farm Apples",
    category: "fruits",
    price: 120,
    unit: "kg",
    image: "images/apple.png",
    description: "Sweet and crispy apples harvested straight from the orchard.",
    rating: 4.7,
    farmer: "Orchard Hill",
    isOrganic: false
  },
  {
    id: 5,
    name: "Ripe Bananas",
    category: "fruits",
    price: 50,
    unit: "dozen",
    image: "images/banana.png",
    description: "Naturally ripened bananas, full of energy and taste.",
    rating: 4.4,
    farmer: "Sunrise Organics",
    isOrganic: true
  },
  {
    id: 6,
    name: "Juicy Oranges",
    category: "fruits",
    price: 80,
    unit: "kg",
    image: "images/orange.png",
    description: "Tangy and sweet oranges packed with Vitamin C.",
    rating: 4.3,
    farmer: "Orchard Hill",
    isOrganic: false
  },
  {
    id: 17,
    name: "Alphonso Mangoes",
    category: "fruits",
    price: 150,
    unit: "kg",
    image: "images/mango.png",
    description: "Sweet, fragrant mangoes - the king of fruits, picked at peak ripeness.",
    rating: 4.9,
    farmer: "Orchard Hill",
    isOrganic: false
  },
  {
    id: 18,
    name: "Seedless Grapes",
    category: "fruits",
    price: 90,
    unit: "kg",
    image: "images/grapes.png",
    description: "Sweet, crisp seedless grapes, perfect for snacking.",
    rating: 4.5,
    farmer: "Sunrise Organics",
    isOrganic: true
  },
  {
    id: 19,
    name: "Ripe Papaya",
    category: "fruits",
    price: 45,
    unit: "piece",
    image: "images/papaya.png",
    description: "Soft, sweet papaya, great for breakfast or smoothies.",
    rating: 4.1,
    farmer: "Orchard Hill",
    isOrganic: false
  },
  {
    id: 20,
    name: "Watermelon",
    category: "fruits",
    price: 60,
    unit: "piece",
    image: "images/watermelon.png",
    description: "Large, juicy watermelon - perfect for hot days.",
    rating: 4.4,
    farmer: "Hilltop Farms",
    isOrganic: false
  },

  // ---------- DAIRY ----------
  {
    id: 7,
    name: "Farm Fresh Milk",
    category: "dairy",
    price: 60,
    unit: "litre",
    image: "images/milk.png",
    description: "Pure and fresh cow milk delivered straight from local dairy farms.",
    rating: 4.6,
    farmer: "Green Pastures Dairy",
    isOrganic: false
  },
  {
    id: 8,
    name: "Homemade Paneer",
    category: "dairy",
    price: 90,
    unit: "pack",
    image: "images/paneer.png",
    description: "Soft and fresh paneer made from pure farm milk.",
    rating: 4.5,
    farmer: "Green Pastures Dairy",
    isOrganic: false
  },
  {
    id: 21,
    name: "Fresh Curd",
    category: "dairy",
    price: 40,
    unit: "pack",
    image: "images/curd.png",
    description: "Thick, creamy curd made fresh from farm milk every morning.",
    rating: 4.4,
    farmer: "Green Pastures Dairy",
    isOrganic: false
  },
  {
    id: 22,
    name: "White Butter",
    category: "dairy",
    price: 110,
    unit: "pack",
    image: "images/butter.png",
    description: "Creamy homemade white butter churned the traditional way.",
    rating: 4.5,
    farmer: "Green Pastures Dairy",
    isOrganic: false
  },

  // ---------- GRAINS ----------
  {
    id: 9,
    name: "Basmati Rice",
    category: "grains",
    price: 70,
    unit: "kg",
    image: "images/rice.png",
    description: "Long grain basmati rice, aromatic and perfect for every meal.",
    rating: 4.6,
    farmer: "Golden Fields",
    isOrganic: false
  },
  {
    id: 10,
    name: "Wheat Flour",
    category: "grains",
    price: 45,
    unit: "kg",
    image: "images/wheat.png",
    description: "Stone ground wheat flour, freshly milled for soft rotis and bread.",
    rating: 4.3,
    farmer: "Golden Fields",
    isOrganic: false
  },
  {
    id: 23,
    name: "Pearl Millet",
    category: "grains",
    price: 55,
    unit: "kg",
    image: "images/millet.png",
    description: "Nutritious pearl millet (bajra), a wholesome addition to any diet.",
    rating: 4.2,
    farmer: "Golden Fields",
    isOrganic: true
  },
  {
    id: 24,
    name: "Sweet Corn Maize",
    category: "grains",
    price: 40,
    unit: "kg",
    image: "images/maize.png",
    description: "Fresh sweet corn maize, great for grilling or boiling.",
    rating: 4.1,
    farmer: "Golden Fields",
    isOrganic: false
  }
];


// ---------- MERGE IN FARMER-ADDED PRODUCTS ----------
// Farmers can add their own products on the Sell Products page.
// Those get saved in localStorage under "farmerProducts".
// We combine them with our sample products so they show up
// everywhere the "products" array is used (products page, product page, etc.)

function getFarmerAddedProducts() {
  var data = localStorage.getItem("farmerProducts");

  if (data === null) {
    return [];
  }

  return JSON.parse(data);
}

var products = sampleProducts.concat(getFarmerAddedProducts());
