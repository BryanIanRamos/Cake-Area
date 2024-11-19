export const ordersData = {
  orders: [
    // Orders for Mike Customer (user_id: 3)
    {
      order_id: 1,
      status: "Cancelled", // Pending, Processing, Completed, Cancelled
      qty: 2,
      total_down_pay: 499.99, // 50% of overall_pay
      overall_pay: 999.98, // price * qty
      prod_id: 1, // Classic Vanilla Cake
      user_id: 3,
      bus_id: 1, // Sarah's Sweet Creations
    },
    {
      order_id: 2,
      status: "Completed",
      qty: 1,
      total_down_pay: 299.995,
      overall_pay: 599.99,
      prod_id: 3, // Red Velvet Delight
      user_id: 3,
      bus_id: 1,
    },
    {
      order_id: 3,
      status: "Refunded",
      qty: 3,
      total_down_pay: 269.97,
      overall_pay: 539.94,
      prod_id: 41, // Danish Pastry
      user_id: 3,
      bus_id: 3, // Peter's Pastry Paradise
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
      bus_id: 1,
    },
    {
      order_id: 5,
      status: "Processing",
      qty: 1,
      total_down_pay: 189.99,
      overall_pay: 379.98,
      prod_id: 16, // Sourdough Bread
      user_id: 4,
      bus_id: 2,
    },
    {
      order_id: 6,
      status: "Pending",
      qty: 4,
      total_down_pay: 259.98,
      overall_pay: 519.96,
      prod_id: 38, // Palmier
      user_id: 4,
      bus_id: 3,
    },
    {
      order_id: 7,
      status: "Completed",
      qty: 2,
      total_down_pay: 169.99,
      overall_pay: 339.98,
      prod_id: 39, // Mille-feuille
      user_id: 4,
      bus_id: 3,
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
      bus_id: 1,
    },
    {
      order_id: 9,
      status: "Completed",
      qty: 2,
      total_down_pay: 199.99,
      overall_pay: 399.98,
      prod_id: 20, // Rye Bread
      user_id: 7,
      bus_id: 2,
    },
    {
      order_id: 10,
      status: "Pending",
      qty: 3,
      total_down_pay: 194.97,
      overall_pay: 389.94,
      prod_id: 44, // Cannoli
      user_id: 7,
      bus_id: 3,
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
      bus_id: 1,
    },
    {
      order_id: 12,
      status: "Processing",
      qty: 2,
      total_down_pay: 219.99,
      overall_pay: 439.98,
      prod_id: 24, // Brioche
      user_id: 8,
      bus_id: 2,
    },
    {
      order_id: 13,
      status: "Completed",
      qty: 3,
      total_down_pay: 194.97,
      overall_pay: 389.94,
      prod_id: 34, // Cream Puff
      user_id: 8,
      bus_id: 3,
    },
    {
      order_id: 14,
      status: "Pending",
      qty: 1,
      total_down_pay: 109.995,
      overall_pay: 219.99,
      prod_id: 45, // Opera Cake
      user_id: 8,
      bus_id: 3,
    },

    // Additional orders with multiple products
    {
      order_id: 15,
      status: "Pending",
      total_down_pay: 849.97,
      overall_pay: 1699.94,
      user_id: 3, // Mike Customer
      bus_id: 1,
      order_items: [
        {
          prod_id: 8, // Black Forest Cake
          qty: 2,
          price: 579.99,
          subtotal: 1159.98,
        },
        {
          prod_id: 11, // Artisanal Banana Bread
          qty: 1,
          price: 299.99,
          subtotal: 299.99,
        },
        {
          prod_id: 12, // Classic Chocolate Chip Cookies
          qty: 2,
          price: 199.99,
          subtotal: 399.98,
        },
      ],
    },
    {
      order_id: 16,
      status: "Processing",
      total_down_pay: 599.96,
      overall_pay: 1199.92,
      user_id: 4, // Emma Wilson
      bus_id: 2,
      order_items: [
        {
          prod_id: 23, // Artisanal Focaccia
          qty: 3,
          price: 169.99,
          subtotal: 509.97,
        },
        {
          prod_id: 26, // Chocolate Babka
          qty: 2,
          price: 249.99,
          subtotal: 499.98,
        },
        {
          prod_id: 27, // Garlic Knots
          qty: 4,
          price: 129.99,
          subtotal: 519.96,
        },
      ],
    },
    {
      order_id: 17,
      status: "Completed",
      total_down_pay: 729.96,
      overall_pay: 1459.92,
      user_id: 7, // Tom Smith
      bus_id: 3,
      order_items: [
        {
          prod_id: 33, // Chocolate Mousse Cake
          qty: 2,
          price: 219.99,
          subtotal: 439.98,
        },
        {
          prod_id: 40, // French Macarons
          qty: 5,
          price: 129.99,
          subtotal: 649.95,
        },
        {
          prod_id: 43, // Traditional Baklava
          qty: 2,
          price: 189.99,
          subtotal: 379.98,
        },
      ],
    },
    {
      order_id: 18,
      status: "Pending",
      total_down_pay: 674.97,
      overall_pay: 1349.94,
      user_id: 8, // Anna Jones
      bus_id: 1,
      order_items: [
        {
          prod_id: 9, // Coconut Layer Cake
          qty: 2,
          price: 489.99,
          subtotal: 979.98,
        },
        {
          prod_id: 14, // Glazed Cinnamon Rolls
          qty: 3,
          price: 129.99,
          subtotal: 389.97,
        },
      ],
    },
    {
      order_id: 19,
      status: "Received",
      total_down_pay: 549.96,
      overall_pay: 1099.92,
      user_id: 3, // Mike Customer
      bus_id: 2,
      order_items: [
        {
          prod_id: 17, // French Baguette
          qty: 4,
          price: 149.99,
          subtotal: 599.96,
        },
        {
          prod_id: 19, // Multigrain Wheat Bread
          qty: 3,
          price: 169.99,
          subtotal: 509.97,
        },
      ],
    },
    {
      order_id: 20,
      status: "Completed",
      total_down_pay: 819.95,
      overall_pay: 1639.9,
      user_id: 4, // Emma Wilson
      bus_id: 3,
      order_items: [
        {
          prod_id: 32, // Fresh Fruit Tart
          qty: 3,
          price: 189.99,
          subtotal: 569.97,
        },
        {
          prod_id: 35, // Almond Croissant
          qty: 4,
          price: 119.99,
          subtotal: 479.96,
        },
        {
          prod_id: 46, // Classic Paris-Brest
          qty: 3,
          price: 199.99,
          subtotal: 599.97,
        },
      ],
    },
    {
      order_id: 21,
      status: "Pending",
      total_down_pay: 629.97,
      overall_pay: 1259.94,
      user_id: 7, // Tom Smith
      bus_id: 1,
      order_items: [
        {
          prod_id: 10, // Classic Cheesecake
          qty: 2,
          price: 559.99,
          subtotal: 1119.98,
        },
        {
          prod_id: 13, // Mixed Berry Danish
          qty: 3,
          price: 89.99,
          subtotal: 269.97,
        },
      ],
    },
    {
      order_id: 22,
      status: "Processing",
      total_down_pay: 709.96,
      overall_pay: 1419.92,
      user_id: 8, // Anna Jones
      bus_id: 2,
      order_items: [
        {
          prod_id: 21, // Italian Ciabatta
          qty: 3,
          price: 159.99,
          subtotal: 479.97,
        },
        {
          prod_id: 24, // Classic Brioche
          qty: 3,
          price: 189.99,
          subtotal: 569.97,
        },
        {
          prod_id: 28, // Pretzel Rolls
          qty: 4,
          price: 139.99,
          subtotal: 559.96,
        },
      ],
    },
    {
      order_id: 23,
      status: "Completed",
      total_down_pay: 779.96,
      overall_pay: 1559.92,
      user_id: 3, // Mike Customer
      bus_id: 3,
      order_items: [
        {
          prod_id: 36, // Lemon Meringue Tart
          qty: 3,
          price: 179.99,
          subtotal: 539.97,
        },
        {
          prod_id: 37, // Chocolate Truffle Tart
          qty: 4,
          price: 159.99,
          subtotal: 639.96,
        },
        {
          prod_id: 42, // Chocolate Profiteroles
          qty: 3,
          price: 139.99,
          subtotal: 419.97,
        },
      ],
    },
    {
      order_id: 24,
      status: "Pending",
      total_down_pay: 689.97,
      overall_pay: 1379.94,
      user_id: 4, // Emma Wilson
      bus_id: 1,
      order_items: [
        {
          prod_id: 7, // Classic Tiramisu
          qty: 1,
          price: 599.99,
          subtotal: 599.99,
        },
        {
          prod_id: 15, // Classic Apple Pie
          qty: 2,
          price: 399.99,
          subtotal: 799.98,
        },
      ],
    },
    {
      order_id: 25,
      status: "Processing",
      total_down_pay: 659.96,
      overall_pay: 1319.92,
      user_id: 7, // Tom Smith
      bus_id: 2,
      order_items: [
        {
          prod_id: 18, // Butter Croissant
          qty: 5,
          price: 79.99,
          subtotal: 399.95,
        },
        {
          prod_id: 22, // Chocolate Chip Muffins
          qty: 4,
          price: 99.99,
          subtotal: 399.96,
        },
        {
          prod_id: 25, // Rustic Country Loaf
          qty: 3,
          price: 199.99,
          subtotal: 599.97,
        },
      ],
    },
  ],
};
