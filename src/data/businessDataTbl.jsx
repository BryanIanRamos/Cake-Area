// Export business data table
export const businessData = {
  businesses: [
    {
      bus_id: 1,
      name: "Sarah's Sweet Creations",
      description: "Welcome to Sarah's Sweet Creations! We specialize in creating delicious, handcrafted baked goods using only the finest ingredients. From custom cakes to fresh pastries, we put love and care into every creation. Our passion for baking shines through in every bite.",
      no_visits: 1250,
      user_id: 2, // References sarah.baker@email.com
      is_active: true
    },
    {
      bus_id: 2,
      name: "Lisa's Artisan Bakery",
      description: "Welcome to Lisa's Artisan Bakery! We're dedicated to bringing you authentic, artisanal baked goods made from scratch daily. Our selection ranges from rustic breads to elegant pastries, all crafted with traditional techniques and modern creativity.",
      no_visits: 980,
      user_id: 6, // References lisa.baker@email.com
      is_active: false
    },
    {
      bus_id: 3,
      name: "Peter's Pastry Paradise",
      description: "Welcome to Peter's Pastry Paradise! Experience the magic of freshly baked goods made with premium ingredients and years of expertise. We take pride in offering a wide variety of breads, cakes, and pastries that will satisfy any sweet or savory craving.",
      no_visits: 1500,
      user_id: 9, // References peter.baker@email.com
      is_active: true
    }
  ]
};
