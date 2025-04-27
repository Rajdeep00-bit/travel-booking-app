const stays = [
  {
    id: 1,
    name: "Mountain Retreat Cabin",
    location: "Aspen, Colorado",
    price: 175,
    rating: 4,
    image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Cozy cabin nestled in the mountains with breathtaking views. Perfect for a peaceful getaway in nature.",
    amenities: ["Fireplace", "Hot tub", "Hiking trails", "Full kitchen"]
  },
  {
    id: 2,
    name: "Luxury Beach Villa",
    location: "Baa Atoll, Maldives",
    price: 450,
    rating: 5,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    description: "Stunning overwater villa with direct access to crystal clear waters. Enjoy the ultimate luxury beach vacation.",
    amenities: ["Private pool", "Ocean view", "Room service", "Spa access"]
  },
  {
    id: 3,
    name: "Alpine Chalet",
    location: "Zermatt, Swiss Alps",
    price: 320,
    rating: 5,
    image: "https://images.unsplash.com/photo-1520452112805-c6692c840af0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Traditional Swiss chalet with modern amenities offering panoramic views of the Matterhorn and surrounding peaks.",
    amenities: ["Sauna", "Ski-in/ski-out", "Fireplace", "Mountain views"]
  },
  {
    id: 4,
    name: "Modern Downtown Loft",
    location: "Manhattan, New York",
    price: 275,
    rating: 4,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    description: "Sleek, contemporary loft in the heart of the city. Walking distance to major attractions, restaurants, and nightlife.",
    amenities: ["High ceilings", "Smart home features", "Fitness center", "Rooftop access"]
  },
  {
    id: 5,
    name: "Tropical Beachfront Bungalow",
    location: "Koh Samui, Thailand",
    price: 195,
    rating: 4,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Charming bungalow steps from a pristine beach with warm waters and swaying palm trees.",
    amenities: ["Beach access", "Outdoor shower", "Hammock", "Breakfast included"]
  },
  {
    id: 6,
    name: "Historic City Apartment",
    location: "Prague, Czech Republic",
    price: 145,
    rating: 4,
    image: "https://images.unsplash.com/photo-1562664377-709f2c337eb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Beautifully restored apartment in a centuries-old building, located in the historic center of Prague.",
    amenities: ["Original architecture", "Modern interior", "City views", "Walk to attractions"]
  },
  {
    id: 7,
    name: "Lakeside Cottage",
    location: "Lake District, England",
    price: 160,
    rating: 4,
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Charming cottage overlooking a serene lake with boats available for exploring the calm waters.",
    amenities: ["Lake view", "Boat dock", "Garden", "Fireplace"]
  },
  {
    id: 8,
    name: "Rainforest Eco Lodge",
    location: "Costa Rica",
    price: 210,
    rating: 4,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Sustainable eco-lodge surrounded by lush rainforest and abundant wildlife. Perfect for nature lovers.",
    amenities: ["Wildlife tours", "Yoga deck", "Organic meals", "Hiking trails"]
  },
  {
    id: 9,
    name: "Tuscan Farmhouse",
    location: "Tuscany, Italy",
    price: 245,
    rating: 5,
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Rustic farmhouse in the rolling hills of Tuscany with vineyard views and traditional Italian charm.",
    amenities: ["Wine tasting", "Olive grove", "Cooking classes", "Pool"]
  },
  {
    id: 10,
    name: "Urban Penthouse",
    location: "Tokyo, Japan",
    price: 380,
    rating: 5,
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Sleek penthouse apartment with panoramic views of Tokyo's skyline and modern Japanese design.",
    amenities: ["City views", "Smart home", "Concierge", "Chef's kitchen"]
  },
  {
    id: 11,
    name: "Redwood Forest Cabin",
    location: "Northern California, USA",
    price: 185,
    rating: 4,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Secluded cabin surrounded by towering redwood trees offering peace and tranquility in nature.",
    amenities: ["Wood stove", "Outdoor deck", "Hiking trails", "Stargazing"]
  },
  {
    id: 12,
    name: "Australian Beach House",
    location: "Byron Bay, Australia",
    price: 230,
    rating: 4,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Modern beach house just steps from the sand with surfboards available for guests to use.",
    amenities: ["Ocean view", "Surfboard rental", "Outdoor shower", "BBQ area"]
  },
  {
    id: 13,
    name: "Icelandic Cottage",
    location: "Southern Iceland",
    price: 190,
    rating: 4,
    image: "https://images.unsplash.com/photo-1504233529578-6d46baba6d34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
    description: "Cozy cottage with hot tub under the northern lights, perfect for experiencing Iceland's natural wonders.",
    amenities: ["Hot tub", "Northern lights viewing", "Heated floors", "Mountain views"]
  },
  {
    id: 14,
    name: "Bali Rice Field Villa",
    location: "Ubud, Bali",
    price: 170,
    rating: 4,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    description: "Tranquil villa surrounded by lush rice terraces with traditional Balinese architecture and an infinity pool.",
    amenities: ["Private pool", "Rice field views", "Yoga pavilion", "Outdoor bathroom"]
  },
  {
    id: 15,
    name: "Miami Beach Condo",
    location: "Miami, Florida",
    price: 240,
    rating: 4,
    image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
    description: "Modern condo with ocean views in the heart of Miami Beach with access to pool and beach.",
    amenities: ["Ocean view", "Pool access", "Beach service", "Gym access"]
  },
  {
    id: 16,
    name: "Irish Country Cottage",
    location: "County Kerry, Ireland",
    price: 145,
    rating: 4,
    image: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    description: "Traditional thatched cottage in the Irish countryside with cozy interiors and lush green surroundings.",
    amenities: ["Fireplace", "Garden", "Countryside views", "Authentic decor"]
  },
  {
    id: 17,
    name: "Kyoto Traditional Machiya",
    location: "Kyoto, Japan",
    price: 195,
    rating: 4,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Restored traditional Japanese townhouse with tatami rooms and a peaceful zen garden in historic Kyoto.",
    amenities: ["Tatami rooms", "Zen garden", "Tea ceremony space", "Traditional bath"]
  },
  {
    id: 18,
    name: "Barcelona Penthouse",
    location: "Barcelona, Spain",
    price: 255,
    rating: 5,
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    description: "Modern penthouse with a private rooftop terrace offering panoramic views of Barcelona and the Mediterranean.",
    amenities: ["Rooftop terrace", "City views", "Air conditioning", "Modern design"]
  },
  {
    id: 19,
    name: "New Zealand Lake House",
    location: "Queenstown, New Zealand",
    price: 310,
    rating: 5,
    image: "https://images.unsplash.com/photo-1614094082869-cd4e4b2905c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    description: "Modern house with floor-to-ceiling windows offering stunning views of Lake Wakatipu and the surrounding mountains.",
    amenities: ["Lake views", "Mountain views", "Outdoor deck", "Adventure activities nearby"]
  }
];

export default stays;