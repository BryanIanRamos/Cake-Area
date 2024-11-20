import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage";
import CakeSample from "../assets/CakeSample.png";

// Load initial data from localStorage or use default data
export const ordersData = loadFromLocalStorage("ordersData", [
  // Cart/Pending Orders
  {
    order_id: "ORD001",
    business_id: 1,
    business: {
      bus_id: 1,
      name: "Sarah's Sweet Creations",
      rating: 4.8,
      total_sold: 1250,
    },
    product: {
      prod_id: 1,
      prod_name: "Classic Vanilla Celebration Cake",
      description: "Light and fluffy vanilla cake with buttercream frosting",
      price: 499.99,
    },
    images: [{ link: CakeSample }],
    quantity: 2,
    price: 499.99,
    total_amount: 999.98,
    status: "Pending",
    created_at: new Date().toISOString(),
    checkoutDate: null,
    receiveDate: null,
    downPayment: 0,
    remainingPayment: 0,
    paymentStatus: "",
    cancellationReason: "",
    refundReason: "",
    refundDate: null,
  },
  {
    order_id: "ORD002",
    business_id: 1,
    business: {
      bus_id: 1,
      name: "Sarah's Sweet Creations",
      rating: 4.8,
      total_sold: 1250,
    },
    product: {
      prod_id: 2,
      prod_name: "Chocolate Dream Layer Cake",
      description: "Rich chocolate layers with dark chocolate ganache",
      price: 549.99,
    },
    images: [{ link: CakeSample }],
    quantity: 1,
    price: 549.99,
    total_amount: 549.99,
    status: "Pending",
    created_at: "2024-03-19T11:00:00Z",
    checkoutDate: null,
    receiveDate: null,
    downPayment: 0,
    remainingPayment: 0,
    paymentStatus: "",
    cancellationReason: "",
    refundReason: "",
    refundDate: null,
  },

  // Processing Orders
  {
    order_id: "ORD003",
    business_id: 2,
    business: {
      bus_id: 2,
      name: "Lisa's Artisan Bakery",
      rating: 4.9,
      total_sold: 980,
    },
    product: {
      prod_id: 16,
      prod_name: "Traditional Sourdough Bread",
      description: "Traditional sourdough with perfect crust",
      price: 189.99,
    },
    images: [{ link: CakeSample }],
    quantity: 3,
    price: 189.99,
    total_amount: 569.97,
    status: "Processing",
    created_at: "2024-03-18T15:00:00Z",
    checkoutDate: "2024-03-18T15:30:00Z",
    receiveDate: "2024-03-25T15:00:00Z",
    downPayment: 284.99,
    remainingPayment: 284.98,
    paymentStatus: "Partial - Down Payment Received",
    cancellationReason: "",
    refundReason: "",
    refundDate: null,
  },

  // To Receive Orders
  {
    order_id: "ORD004",
    business_id: 3,
    business: {
      bus_id: 3,
      name: "Peter's Pastry Paradise",
      rating: 4.7,
      total_sold: 1500,
    },
    product: {
      prod_id: 29,
      prod_name: "Classic French Croissant",
      description: "Buttery, flaky French pastry",
      price: 89.99,
    },
    images: [{ link: CakeSample }],
    quantity: 5,
    price: 89.99,
    total_amount: 449.95,
    status: "To Receive",
    created_at: "2024-03-17T09:00:00Z",
    checkoutDate: "2024-03-17T09:30:00Z",
    receiveDate: "2024-03-20T09:00:00Z",
    downPayment: 0,
    remainingPayment: 0,
    paymentStatus: "",
    cancellationReason: "",
    refundReason: "",
    refundDate: null,
  },

  // Completed Orders
  {
    order_id: "ORD005",
    business_id: 1,
    business: {
      bus_id: 1,
      name: "Sarah's Sweet Creations",
      rating: 4.8,
      total_sold: 1250,
    },
    product: {
      prod_id: 5,
      prod_name: "Carrot Spice Cake",
      description: "Spiced carrot cake with walnuts and cream cheese frosting",
      price: 479.99,
    },
    images: [{ link: CakeSample }],
    quantity: 1,
    price: 479.99,
    total_amount: 479.99,
    status: "Completed",
    created_at: "2024-03-15T14:00:00Z",
    completedDate: "2024-03-18T14:00:00Z",
    downPayment: 0,
    remainingPayment: 0,
    paymentStatus: "",
    cancellationReason: "",
    refundReason: "",
    refundDate: null,
  },

  // Cancelled Orders
  {
    order_id: "ORD006",
    business_id: 2,
    business: {
      bus_id: 2,
      name: "Lisa's Artisan Bakery",
      rating: 4.9,
      total_sold: 980,
    },
    product: {
      prod_id: 17,
      prod_name: "French Baguette",
      description: "Classic French baguette with crispy crust",
      price: 149.99,
    },
    images: [{ link: CakeSample }],
    quantity: 2,
    price: 149.99,
    total_amount: 299.98,
    status: "Cancelled",
    created_at: "2024-03-16T16:00:00Z",
    cancelledDate: "2024-03-16T17:00:00Z",
    cancellationReason: "Changed my mind",
    downPayment: 0,
    remainingPayment: 0,
    paymentStatus: "",
    refundReason: "",
    refundDate: null,
  },

  // Refunded Orders
  {
    order_id: "ORD007",
    business_id: 3,
    business: {
      bus_id: 3,
      name: "Peter's Pastry Paradise",
      rating: 4.7,
      total_sold: 1500,
    },
    product: {
      prod_id: 30,
      prod_name: "Pain au Chocolat",
      description: "Chocolate-filled croissant pastry",
      price: 99.99,
    },
    images: [{ link: CakeSample }],
    quantity: 3,
    price: 99.99,
    total_amount: 299.97,
    refundAmount: 299.97,
    status: "Refunded",
    created_at: "2024-03-14T10:00:00Z",
    refundDate: "2024-03-15T10:00:00Z",
    refundReason: "Product quality did not meet expectations",
    refundStatus: "Full Refund",
    refundNotes: "Customer reported stale products",
  },
  {
    order_id: "ORD010",
    business_id: 1,
    business: {
      bus_id: 1,
      name: "Sarah's Sweet Creations",
      rating: 4.8,
      total_sold: 1250,
    },
    product: {
      prod_id: 8,
      prod_name: "Black Forest Cake",
      description: "Chocolate cake with cherries and whipped cream",
      price: 579.99,
    },
    images: [{ link: CakeSample }],
    quantity: 1,
    price: 579.99,
    total_amount: 579.99,
    refundAmount: 289.99,
    status: "Refunded",
    created_at: "2024-03-13T09:00:00Z",
    refundDate: "2024-03-14T15:30:00Z",
    refundReason: "Order arrived slightly damaged",
    refundStatus: "Partial Refund",
    refundNotes: "50% refund issued due to minor damage",
  },
  {
    order_id: "ORD011",
    business_id: 2,
    business: {
      bus_id: 2,
      name: "Lisa's Artisan Bakery",
      rating: 4.9,
      total_sold: 980,
    },
    product: {
      prod_id: 15,
      prod_name: "Assorted Cupcakes Box",
      description: "12 pieces of assorted flavored cupcakes",
      price: 449.99,
    },
    images: [{ link: CakeSample }],
    quantity: 2,
    price: 449.99,
    total_amount: 899.98,
    refundAmount: 899.98,
    status: "Refunded",
    created_at: "2024-03-12T14:00:00Z",
    refundDate: "2024-03-13T09:15:00Z",
    refundReason: "Wrong order delivered",
    refundStatus: "Full Refund",
    refundNotes: "Customer received incorrect cupcake flavors",
  },
]);

// Helper functions
export const updateOrder = (updatedOrder) => {
  const index = ordersData.findIndex(
    (order) => order.order_id === updatedOrder.order_id
  );
  if (index !== -1) {
    ordersData[index] = {
      ...updatedOrder,
      updated_at: new Date().toISOString(),
    };
    saveToLocalStorage("ordersData", ordersData);
  }
};

export const addOrder = (newOrder) => {
  const order = {
    ...newOrder,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  ordersData.push(order);
  saveToLocalStorage("ordersData", ordersData);
};

export const deleteOrder = (orderId) => {
  const filteredOrders = ordersData.filter(
    (order) => order.order_id !== orderId
  );
  saveToLocalStorage("ordersData", filteredOrders);
  return filteredOrders;
};

export const getOrdersByStatus = (status) => {
  return ordersData.filter((order) => order.status === status);
};
