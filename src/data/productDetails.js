import neapolitanBrownie from "../assets/CakeSample.png"; // Adjust path as needed

// Export for baker's products
export const bakerProducts = {
  categories: [
    { name: "All", count: 20 },
    { name: "Cakes", count: 8 },
    { name: "Bread", count: 4 },
    { name: "Pastries", count: 3 },
    { name: "Cookies", count: 3 },
    { name: "Pies", count: 2 },
  ],
  products: [
    // Cakes
    {
      id: 1,
      name: "Neapolitan Brownie Cake",
      description: "A delicious triple-layered brownie featuring chocolate, vanilla, and strawberry flavors.",
      price: 499.99,
      rating: 4.5,
      ordered: 250,
      viewed: 1200,
      stock: 50,
      category: "Cakes",
      image: neapolitanBrownie,
      status: "Available"
    },
    {
      id: 2,
      name: "Classic Chocolate Cake",
      description: "Rich and moist chocolate cake with dark chocolate ganache.",
      price: 599.99,
      rating: 4.8,
      ordered: 320,
      viewed: 1500,
      stock: 30,
      category: "Cakes",
      image: neapolitanBrownie,
      status: "Available"
    },
    {
      id: 3,
      name: "Red Velvet Dream",
      description: "Smooth red velvet cake with cream cheese frosting.",
      price: 649.99,
      rating: 4.7,
      ordered: 180,
      viewed: 890,
      stock: 25,
      category: "Cakes",
      image: neapolitanBrownie,
      status: "Low Stock"
    },
    {
      id: 4,
      name: "Vanilla Bean Delight",
      description: "Light and fluffy vanilla cake with real vanilla beans.",
      price: 449.99,
      rating: 4.3,
      ordered: 150,
      viewed: 720,
      stock: 40,
      category: "Cakes",
      image: neapolitanBrownie,
      status: "Available"
    },
    {
      id: 5,
      name: "Carrot Cake Supreme",
      description: "Spiced carrot cake with walnuts and cream cheese frosting.",
      price: 549.99,
      rating: 4.6,
      ordered: 200,
      viewed: 950,
      stock: 35,
      category: "Cakes",
      image: neapolitanBrownie,
      status: "Available"
    },
    // Bread
    {
      id: 6,
      name: "Sourdough Loaf",
      description: "Traditional sourdough bread with perfect crust.",
      price: 189.99,
      rating: 4.4,
      ordered: 420,
      viewed: 800,
      stock: 60,
      category: "Bread",
      image: neapolitanBrownie,
      status: "Available"
    },
    {
      id: 7,
      name: "Banana Walnut Bread",
      description: "Moist banana bread loaded with walnuts.",
      price: 259.99,
      rating: 4.5,
      ordered: 280,
      viewed: 650,
      stock: 45,
      category: "Bread",
      image: neapolitanBrownie,
      status: "Available"
    },
    {
      id: 8,
      name: "Garlic Focaccia",
      description: "Italian-style focaccia with roasted garlic and herbs.",
      price: 219.99,
      rating: 4.6,
      ordered: 190,
      viewed: 480,
      stock: 40,
      category: "Bread",
      image: neapolitanBrownie,
      status: "Available"
    },
    // Pastries
    {
      id: 9,
      name: "Butter Croissant",
      description: "Flaky, buttery croissants made from scratch.",
      price: 89.99,
      rating: 4.7,
      ordered: 560,
      viewed: 920,
      stock: 80,
      category: "Pastries",
      image: neapolitanBrownie,
      status: "Available"
    },
    {
      id: 10,
      name: "Chocolate Danish",
      description: "Flaky danish pastry with rich chocolate filling.",
      price: 109.99,
      rating: 4.5,
      ordered: 340,
      viewed: 780,
      stock: 55,
      category: "Pastries",
      image: neapolitanBrownie,
      status: "Available"
    },
    // Cookies
    {
      id: 11,
      name: "Chocolate Chip Cookies",
      description: "Classic chocolate chip cookies with premium chocolate.",
      price: 149.99,
      rating: 4.8,
      ordered: 620,
      viewed: 1100,
      stock: 100,
      category: "Cookies",
      image: neapolitanBrownie,
      status: "Available"
    },
    {
      id: 12,
      name: "Oatmeal Raisin Cookies",
      description: "Chewy oatmeal cookies with plump raisins.",
      price: 139.99,
      rating: 4.3,
      ordered: 280,
      viewed: 560,
      stock: 75,
      category: "Cookies",
      image: neapolitanBrownie,
      status: "Available"
    },
    // Pies
    {
      id: 13,
      name: "Apple Cinnamon Pie",
      description: "Classic apple pie with a buttery crust.",
      price: 399.99,
      rating: 4.6,
      ordered: 180,
      viewed: 450,
      stock: 30,
      category: "Pies",
      image: neapolitanBrownie,
      status: "Available"
    },
    {
      id: 14,
      name: "Blueberry Pie",
      description: "Fresh blueberry pie with a lattice top.",
      price: 429.99,
      rating: 4.7,
      ordered: 150,
      viewed: 380,
      stock: 25,
      category: "Pies",
      image: neapolitanBrownie,
      status: "Low Stock"
    },
    // More Cakes
    {
      id: 15,
      name: "Tiramisu Cake",
      description: "Italian coffee-flavored cake with mascarpone.",
      price: 679.99,
      rating: 4.9,
      ordered: 220,
      viewed: 890,
      stock: 20,
      category: "Cakes",
      image: neapolitanBrownie,
      status: "Low Stock"
    },
    {
      id: 16,
      name: "Lemon Drizzle Cake",
      description: "Zesty lemon cake with lemon glaze.",
      price: 489.99,
      rating: 4.4,
      ordered: 160,
      viewed: 420,
      stock: 35,
      category: "Cakes",
      image: neapolitanBrownie,
      status: "Available"
    },
    // More Bread
    {
      id: 17,
      name: "Whole Wheat Bread",
      description: "Healthy whole wheat bread with seeds.",
      price: 169.99,
      rating: 4.3,
      ordered: 290,
      viewed: 580,
      stock: 50,
      category: "Bread",
      image: neapolitanBrownie,
      status: "Available"
    },
    // More Pastries
    {
      id: 18,
      name: "Fruit Danish",
      description: "Flaky danish with seasonal fruits.",
      price: 119.99,
      rating: 4.5,
      ordered: 310,
      viewed: 670,
      stock: 45,
      category: "Pastries",
      image: neapolitanBrownie,
      status: "Available"
    },
    // More Cookies
    {
      id: 19,
      name: "Double Chocolate Cookies",
      description: "Rich chocolate cookies with chocolate chips.",
      price: 159.99,
      rating: 4.7,
      ordered: 380,
      viewed: 820,
      stock: 65,
      category: "Cookies",
      image: neapolitanBrownie,
      status: "Available"
    },
    {
      id: 20,
      name: "Matcha Green Tea Cake",
      description: "Japanese-inspired matcha green tea cake.",
      price: 599.99,
      rating: 4.6,
      ordered: 140,
      viewed: 460,
      stock: 30,
      category: "Cakes",
      image: neapolitanBrownie,
      status: "Available"
    }
  ]
};

// Export for buyer's product details
export const productDetails = {
  mainProduct: {
    id: 1,
    name: "Neapolitan Brownie Cake",
    description: "A delicious triple-layered brownie featuring chocolate, vanilla, and strawberry flavors.",
    price: 499.99,
    rating: 4.5,
    ordered: 250,
    images: [neapolitanBrownie, neapolitanBrownie, neapolitanBrownie], // Replace with actual images
    stock: 50
  },
  recommendedProducts: [
    {
      id: 2,
      name: "Classic Chocolate Cake",
      price: 599.99,
      image: neapolitanBrownie,
      rating: 4.8
    },
    {
      id: 3,
      name: "Red Velvet Dream",
      price: 649.99,
      image: neapolitanBrownie,
      rating: 4.7
    },
    {
      id: 4,
      name: "Vanilla Bean Delight",
      price: 449.99,
      image: neapolitanBrownie,
      rating: 4.3
    }
  ]
}; 