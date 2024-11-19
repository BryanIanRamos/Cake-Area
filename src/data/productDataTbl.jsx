import { saveToLocalStorage, loadFromLocalStorage } from './localStorage';

// Load initial data from localStorage or use default data
export let productData = loadFromLocalStorage('productData', {
  products: [
    // Sarah's Sweet Creations (bus_id: 1) Products
    {
      prod_id: 1,
      prod_name: "Classic Vanilla Celebration Cake",
      description: "Light and fluffy vanilla cake with buttercream frosting",
      price: 499.99,
      rate: 4.8,
      // qty: 25,
      views: 2450,
      num_orders: 156,
      bus_id: 1,
      cat_id: 1,
    },
    {
      prod_id: 2,
      prod_name: "Chocolate Dream Layer Cake",
      description: "Rich chocolate layers with dark chocolate ganache",
      price: 549.99,
      rate: 4.9,
      // qty: 20,
      views: 2890,
      num_orders: 178,
      bus_id: 1,
      cat_id: 1,
    },
    {
      prod_id: 3,
      prod_name: "Red Velvet Wedding Cake",
      description: "Traditional red velvet with cream cheese frosting",
      price: 599.99,
      rate: 4.2,
      // qty: 15,
      views: 1980,
      num_orders: 89,
      bus_id: 1,
      cat_id: 1,
    },
    {
      prod_id: 4,
      prod_name: "Lemon Blueberry Layer Cake",
      description: "Zesty lemon cake with fresh blueberries",
      price: 529.99,
      rate: 4.3,
      // qty: 18,
      views: 1560,
      num_orders: 95,
      bus_id: 1,
      cat_id: 1,
    },
    {
      prod_id: 5,
      prod_name: "Carrot Spice Cake",
      description: "Spiced carrot cake with walnuts and cream cheese frosting",
      price: 479.99,
      rate: 4.7,
      // qty: 22,
      views: 2150,
      num_orders: 142,
      bus_id: 1,
      cat_id: 1,
    },
    {
      prod_id: 6,
      prod_name: "Strawberry Shortcake Classic",
      description:
        "Light vanilla cake with fresh strawberries and whipped cream",
      price: 459.99,
      rate: 4.4,
      // qty: 20,
      views: 1890,
      num_orders: 134,
      bus_id: 1,
      cat_id: 1,
    },
    {
      prod_id: 7,
      prod_name: "Classic Tiramisu",
      description: "Coffee-soaked layers with mascarpone cream",
      price: 599.99,
      rate: 4.9,
      // qty: 15,
      views: 3120,
      num_orders: 198,
      bus_id: 1,
      cat_id: 10,
    },
    {
      prod_id: 8,
      prod_name: "Black Forest Cake",
      description: "Chocolate cake with cherries and whipped cream",
      price: 579.99,
      rate: 4.5,
      // qty: 12,
      views: 2340,
      num_orders: 145,
      bus_id: 1,
      cat_id: 1,
    },
    {
      prod_id: 9,
      prod_name: "Coconut Layer Cake",
      description: "Coconut cake with coconut cream frosting",
      price: 489.99,
      rate: 4.1,
      // qty: 18,
      views: 1670,
      num_orders: 98,
      bus_id: 1,
      cat_id: 1,
    },
    {
      prod_id: 10,
      prod_name: "Classic Cheesecake",
      description: "Creamy cheesecake with Oreo cookie base",
      price: 559.99,
      rate: 4.8,
      // qty: 20,
      views: 2780,
      num_orders: 167,
      bus_id: 1,
      cat_id: 10,
    },
    {
      prod_id: 11,
      prod_name: "Artisanal Banana Bread",
      description: "Moist banana bread with crunchy walnuts",
      price: 299.99,
      rate: 4.3,
      // qty: 25,
      views: 1450,
      num_orders: 234,
      bus_id: 1,
      cat_id: 2,
    },
    {
      prod_id: 12,
      prod_name: "Classic Chocolate Chip Cookies",
      description: "Classic cookies with premium chocolate chips",
      price: 199.99,
      rate: 4.7,
      // qty: 50,
      views: 2890,
      num_orders: 456,
      bus_id: 1,
      cat_id: 4,
    },
    {
      prod_id: 13,
      prod_name: "Mixed Berry Danish",
      description: "Flaky pastry with seasonal fruits",
      price: 89.99,
      rate: 4.2,
      // qty: 30,
      views: 1670,
      num_orders: 289,
      bus_id: 1,
      cat_id: 3,
    },
    {
      prod_id: 14,
      prod_name: "Glazed Cinnamon Rolls",
      description: "Soft rolls with cinnamon and cream cheese frosting",
      price: 129.99,
      rate: 4.8,
      // qty: 35,
      views: 2450,
      num_orders: 378,
      bus_id: 1,
      cat_id: 9,
    },
    {
      prod_id: 15,
      prod_name: "Classic Apple Pie",
      description: "Traditional apple pie with buttery crust",
      price: 399.99,
      rate: 4.4,
      // qty: 15,
      views: 1890,
      num_orders: 145,
      bus_id: 1,
      cat_id: 5,
    },

    // Lisa's Artisan Bakery (bus_id: 2) Products
    {
      prod_id: 16,
      prod_name: "Traditional Sourdough Bread",
      description: "Traditional sourdough with perfect crust",
      price: 189.99,
      rate: 4.9,
      // qty: 30,
      views: 3450,
      num_orders: 567,
      bus_id: 2,
      cat_id: 2,
    },
    {
      prod_id: 17,
      prod_name: "French Baguette",
      description: "Classic French baguette with crispy crust",
      price: 149.99,
      rate: 4.8,
      // qty: 40,
      views: 2980,
      num_orders: 678,
      bus_id: 2,
      cat_id: 2,
    },
    {
      prod_id: 18,
      prod_name: "Butter Croissant",
      description: "Buttery layered French croissant",
      price: 79.99,
      rate: 4.7,
      // qty: 45,
      views: 3120,
      num_orders: 789,
      bus_id: 2,
      cat_id: 3,
    },
    {
      prod_id: 19,
      prod_name: "Multigrain Wheat Bread",
      description: "Healthy whole wheat bread with seeds",
      price: 169.99,
      rate: 4.3,
      // qty: 25,
      views: 2340,
      num_orders: 432,
      bus_id: 2,
      cat_id: 2,
    },
    {
      prod_id: 20,
      prod_name: "Classic Rye Bread",
      description: "Traditional rye bread with caraway seeds",
      price: 179.99,
      rate: 4.2,
      // qty: 20,
      views: 1980,
      num_orders: 345,
      bus_id: 2,
      cat_id: 2,
    },
    {
      prod_id: 21,
      prod_name: "Italian Ciabatta",
      description: "Italian bread with soft interior and crispy crust",
      price: 159.99,
      rate: 4.4,
      // qty: 30,
      views: 2150,
      num_orders: 423,
      bus_id: 2,
      cat_id: 2,
    },
    {
      prod_id: 22,
      prod_name: "Chocolate Chip Muffins",
      description: "Soft muffins with chocolate chips",
      price: 99.99,
      rate: 4.3,
      // qty: 40,
      views: 2670,
      num_orders: 534,
      bus_id: 2,
      cat_id: 3,
    },
    {
      prod_id: 23,
      prod_name: "Artisanal Focaccia",
      description: "Italian focaccia with herbs and olive oil",
      price: 169.99,
      rate: 4.8,
      // qty: 25,
      views: 2890,
      num_orders: 467,
      bus_id: 2,
      cat_id: 2,
    },
    {
      prod_id: 24,
      prod_name: "Classic Brioche",
      description: "Rich and buttery French bread",
      price: 189.99,
      rate: 4.7,
      // qty: 20,
      views: 2450,
      num_orders: 389,
      bus_id: 2,
      cat_id: 2,
    },
    {
      prod_id: 25,
      prod_name: "Rustic Country Loaf",
      description: "Artisanal country-style bread",
      price: 199.99,
      rate: 4.1,
      // qty: 15,
      views: 1890,
      num_orders: 278,
      bus_id: 2,
      cat_id: 2,
    },
    {
      prod_id: 26,
      prod_name: "Chocolate Babka",
      description: "Twisted bread with chocolate filling",
      price: 249.99,
      rate: 4.9,
      // qty: 18,
      views: 3120,
      num_orders: 445,
      bus_id: 2,
      cat_id: 2,
    },
    {
      prod_id: 27,
      prod_name: "Garlic Knots",
      description: "Twisted bread rolls with garlic butter",
      price: 129.99,
      rate: 4.2,
      // qty: 40,
      views: 2230,
      num_orders: 567,
      bus_id: 2,
      cat_id: 9,
    },
    {
      prod_id: 28,
      prod_name: "Pretzel Rolls",
      description: "Soft pretzel-style dinner rolls",
      price: 139.99,
      rate: 4.3,
      // qty: 35,
      views: 2180,
      num_orders: 489,
      bus_id: 2,
      cat_id: 9,
    },
    // Emma's French Patisserie (bus_id: 3) Products
    {
      prod_id: 29,
      prod_name: "Classic French Croissant",
      description: "Buttery, flaky French pastry",
      price: 89.99,
      rate: 4.8,
      // qty: 50,
      views: 3450,
      num_orders: 890,
      bus_id: 3,
      cat_id: 3,
    },
    {
      prod_id: 30,
      prod_name: "Pain au Chocolat",
      description: "Chocolate-filled croissant pastry",
      price: 99.99,
      rate: 4.9,
      // qty: 45,
      views: 3670,
      num_orders: 923,
      bus_id: 3,
      cat_id: 3,
    },
    {
      prod_id: 31,
      prod_name: "Fruit Danish Pastry",
      description: "Flaky pastry with seasonal fruit filling",
      price: 109.99,
      rate: 4.5,
      // qty: 40,
      views: 2890,
      num_orders: 678,
      bus_id: 3,
      cat_id: 3,
    },
    {
      prod_id: 32,
      prod_name: "Fresh Fruit Tart",
      description: "Sweet pastry crust with custard and fresh fruits",
      price: 189.99,
      rate: 4.7,
      // qty: 25,
      views: 2780,
      num_orders: 456,
      bus_id: 3,
      cat_id: 7,
    },
    {
      prod_id: 33,
      prod_name: "Chocolate Mousse Cake",
      description: "Rich chocolate mousse on chocolate sponge",
      price: 219.99,
      rate: 4.9,
      // qty: 20,
      views: 3120,
      num_orders: 345,
      bus_id: 3,
      cat_id: 1,
    },
    {
      prod_id: 34,
      prod_name: "Classic Cream Puff",
      description: "Light choux pastry with whipped cream",
      price: 99.99,
      rate: 4.2,
      // qty: 45,
      views: 2450,
      num_orders: 567,
      bus_id: 3,
      cat_id: 3,
    },
    {
      prod_id: 35,
      prod_name: "Almond Croissant",
      description: "Flaky croissant with almond filling",
      price: 119.99,
      rate: 4.8,
      // qty: 30,
      views: 2980,
      num_orders: 678,
      bus_id: 3,
      cat_id: 3,
    },
    {
      prod_id: 36,
      prod_name: "Lemon Meringue Tart",
      description: "Tangy lemon curd with fluffy meringue",
      price: 179.99,
      rate: 4.3,
      // qty: 22,
      views: 2340,
      num_orders: 432,
      bus_id: 3,
      cat_id: 7,
    },
    {
      prod_id: 37,
      prod_name: "Chocolate Truffle Tart",
      description: "Rich chocolate ganache pastry",
      price: 159.99,
      rate: 4.7,
      // qty: 35,
      views: 2670,
      num_orders: 545,
      bus_id: 3,
      cat_id: 7,
    },
    {
      prod_id: 38,
      prod_name: "Classic Palmier",
      description: "Crispy puff pastry heart shapes",
      price: 89.99,
      rate: 4.1,
      // qty: 40,
      views: 1980,
      num_orders: 423,
      bus_id: 3,
      cat_id: 3,
    },
    {
      prod_id: 39,
      prod_name: "Classic Mille-feuille",
      description: "Layered puff pastry with vanilla cream",
      price: 169.99,
      rate: 4.8,
      // qty: 18,
      views: 2890,
      num_orders: 467,
      bus_id: 3,
      cat_id: 3,
    },
    {
      prod_id: 40,
      prod_name: "French Macarons",
      description: "French almond meringue cookies",
      price: 129.99,
      rate: 4.9,
      // qty: 50,
      views: 3450,
      num_orders: 890,
      bus_id: 3,
      cat_id: 4,
    },
    {
      prod_id: 41,
      prod_name: "Mixed Fruit Danish",
      description: "Flaky pastry with various fillings",
      price: 109.99,
      rate: 4.2,
      // qty: 35,
      views: 2230,
      num_orders: 445,
      bus_id: 3,
      cat_id: 3,
    },
    {
      prod_id: 42,
      prod_name: "Chocolate Profiteroles",
      description: "Choux pastry with chocolate sauce",
      price: 139.99,
      rate: 4.4,
      // qty: 30,
      views: 2450,
      num_orders: 534,
      bus_id: 3,
      cat_id: 3,
    },
    {
      prod_id: 43,
      prod_name: "Traditional Baklava",
      description: "Layered phyllo with nuts and honey",
      price: 189.99,
      rate: 4.8,
      // qty: 25,
      views: 2780,
      num_orders: 456,
      bus_id: 3,
      cat_id: 10,
    },
    {
      prod_id: 44,
      prod_name: "Sicilian Cannoli",
      description: "Crispy tubes with sweet ricotta filling",
      price: 149.99,
      rate: 4.3,
      // qty: 28,
      views: 2340,
      num_orders: 389,
      bus_id: 3,
      cat_id: 10,
    },
    {
      prod_id: 45,
      prod_name: "Opera Cake",
      description: "Layered almond sponge cake with coffee",
      price: 219.99,
      rate: 4.9,
      // qty: 15,
      views: 3120,
      num_orders: 278,
      bus_id: 3,
      cat_id: 1,
    },
    {
      prod_id: 46,
      prod_name: "Classic Paris-Brest",
      description: "Ring-shaped choux with praline cream",
      price: 199.99,
      rate: 4.7,
      // qty: 20,
      views: 2670,
      num_orders: 345,
      bus_id: 3,
      cat_id: 3,
    },
    {
      prod_id: 47,
      prod_name: "Classic Religieuse",
      description: "Double-decker choux pastry",
      price: 169.99,
      rate: 4.2,
      // qty: 22,
      views: 2180,
      num_orders: 312,
      bus_id: 3,
      cat_id: 3,
    },
  ]
});

export const updateProductData = (updatedProduct) => {
  const index = productData.products.findIndex(p => p.prod_id === updatedProduct.prod_id);
  if (index !== -1) {
    productData.products[index] = updatedProduct;
    // Save to localStorage after update
    saveToLocalStorage('productData', productData);
  }
};

export const addProduct = (newProduct) => {
  productData.products.push(newProduct);
  saveToLocalStorage('productData', productData);
};

export const deleteProduct = (productId) => {
  productData.products = productData.products.filter(p => p.prod_id !== productId);
  saveToLocalStorage('productData', productData);
};
