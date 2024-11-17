export const ordersData = {
  orders: [
    // Orders for Mike Customer (user_id: 3)
    {
      order_id: 1,
      status: "Pending", // Pending, Processing, Completed, Cancelled
      qty: 2,
      total_down_pay: 499.99, // 50% of overall_pay
      overall_pay: 999.98, // price * qty
      prod_id: 1, // Classic Vanilla Cake
      user_id: 3,
      bus_id: 1 // Sarah's Sweet Creations
    },
    {
      order_id: 2,
      status: "Completed",
      qty: 1,
      total_down_pay: 299.995,
      overall_pay: 599.99,
      prod_id: 3, // Red Velvet Delight
      user_id: 3,
      bus_id: 1
    },
    {
      order_id: 3,
      status: "Processing",
      qty: 3,
      total_down_pay: 269.97,
      overall_pay: 539.94,
      prod_id: 41, // Danish Pastry
      user_id: 3,
      bus_id: 3 // Peter's Pastry Paradise
    },

    // Orders for Emma Wilson (user_id: 4)
    {
      order_id: 4,
      status: "Completed",
      qty: 2,
      total_down_pay: 549.99,
      overall_pay: 1099.98,
      prod_id: 2, // Chocolate Dream Cake
      user_id: 4,
      bus_id: 1
    },
    {
      order_id: 5,
      status: "Processing",
      qty: 1,
      total_down_pay: 189.99,
      overall_pay: 379.98,
      prod_id: 16, // Sourdough Bread
      user_id: 4,
      bus_id: 2
    },
    {
      order_id: 6,
      status: "Pending",
      qty: 4,
      total_down_pay: 259.98,
      overall_pay: 519.96,
      prod_id: 38, // Palmier
      user_id: 4,
      bus_id: 3
    },
    {
      order_id: 7,
      status: "Completed",
      qty: 2,
      total_down_pay: 169.99,
      overall_pay: 339.98,
      prod_id: 39, // Mille-feuille
      user_id: 4,
      bus_id: 3
    },

    // Orders for Tom Smith (user_id: 7)
    {
      order_id: 8,
      status: "Processing",
      qty: 1,
      total_down_pay: 239.995,
      overall_pay: 479.99,
      prod_id: 5, // Carrot Cake Supreme
      user_id: 7,
      bus_id: 1
    },
    {
      order_id: 9,
      status: "Completed",
      qty: 2,
      total_down_pay: 199.99,
      overall_pay: 399.98,
      prod_id: 20, // Rye Bread
      user_id: 7,
      bus_id: 2
    },
    {
      order_id: 10,
      status: "Pending",
      qty: 3,
      total_down_pay: 194.97,
      overall_pay: 389.94,
      prod_id: 44, // Cannoli
      user_id: 7,
      bus_id: 3
    },

    // Orders for Anna Jones (user_id: 8)
    {
      order_id: 11,
      status: "Completed",
      qty: 1,
      total_down_pay: 229.995,
      overall_pay: 459.99,
      prod_id: 6, // Strawberry Shortcake
      user_id: 8,
      bus_id: 1
    },
    {
      order_id: 12,
      status: "Processing",
      qty: 2,
      total_down_pay: 219.99,
      overall_pay: 439.98,
      prod_id: 24, // Brioche
      user_id: 8,
      bus_id: 2
    },
    {
      order_id: 13,
      status: "Completed",
      qty: 3,
      total_down_pay: 194.97,
      overall_pay: 389.94,
      prod_id: 34, // Cream Puff
      user_id: 8,
      bus_id: 3
    },
    {
      order_id: 14,
      status: "Pending",
      qty: 1,
      total_down_pay: 109.995,
      overall_pay: 219.99,
      prod_id: 45, // Opera Cake
      user_id: 8,
      bus_id: 3
    }
  ]
};
