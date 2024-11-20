import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { LuArrowUpDown } from "react-icons/lu";
import { Toaster, toast } from 'sonner'
import { FiAlertCircle } from 'react-icons/fi';

// Import data
import { ordersData } from "../../data/orderDataTbl";
import { productData } from "../../data/productDataTbl";
import { businessData } from "../../data/businessDataTbl";
import { imagesData } from "../../data/imagesDataTbl";

// Components
import CartHeader from "../../components/buyer/CartHeader";
import CartTabs from "../../components/buyer/CartTabs";
import OrderCard from "../../components/buyer/OrderCard";
import CartSummary from "../../components/buyer/CartSummary";
import OrderConfirmation from "../../components/buyer/modals/OrderConfirmation";
import StoreOrderCard from "../../components/buyer/StoreOrderCard";

// Add these utility functions at the top of the file, outside the component
const STORAGE_KEYS = {
  CART_ITEMS: 'cartItems',
  PROCESSING_ORDERS: 'processingOrders',
  TO_RECEIVE_ORDERS: 'toReceiveOrders',
  COMPLETED_ORDERS: 'completedOrders',
  CANCELLED_ORDERS: 'cancelledOrders',
  REFUNDED_ORDERS: 'refundedOrders'
};

const getStorageData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return [];
  }
};

const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkOutConfirm, setCheckOutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingOrders, setProcessingOrders] = useState([]);
  const [toReceiveOrders, setToReceiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [refundedOrders, setRefundedOrders] = useState([]);

  // Modified useEffect to load from localStorage
  useEffect(() => {
    const loadCartItems = async () => {
      setIsLoading(true);
      try {
        // Load from localStorage first
        const storedCartItems = getStorageData(STORAGE_KEYS.CART_ITEMS);
        const storedProcessingOrders = getStorageData(STORAGE_KEYS.PROCESSING_ORDERS);

        if (storedCartItems.length > 0) {
          setCartItems(storedCartItems);
        } else {
          // If no stored items, load from initial data
          const userCartItems = ordersData.orders.filter(order => order.status === "Pending");
          
          const enrichedItems = userCartItems.map(item => {
            const product = productData.products.find(p => p.prod_id === item.prod_id);
            const business = businessData.businesses.find(b => b.bus_id === product?.bus_id);
            const images = imagesData.images.filter(img => img.prod_id === item.prod_id);
            
            return {
              ...item,
              product,
              business,
              images
            };
          }).filter(item => item.product && item.business);

          setCartItems(enrichedItems);
          setStorageData(STORAGE_KEYS.CART_ITEMS, enrichedItems);
        }

        setProcessingOrders(storedProcessingOrders);
      } catch (error) {
        console.error('Error loading cart items:', error);
        toast.error('Failed to load cart items');
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  // Save cart items whenever they change
  useEffect(() => {
    setStorageData(STORAGE_KEYS.CART_ITEMS, cartItems);
  }, [cartItems]);

  // Save processing orders whenever they change
  useEffect(() => {
    setStorageData(STORAGE_KEYS.PROCESSING_ORDERS, processingOrders);
  }, [processingOrders]);

  const handleSelectItem = (orderId) => {
    setSelectedItems(prev => {
      const isSelected = prev.includes(orderId);
      if (isSelected) {
        return prev.filter(id => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  };

  const handleSelectAll = (businessId) => {
    const businessItems = cartItems.filter(item => item.bus_id === businessId);
    const allSelected = businessItems.every(item => selectedItems.includes(item.order_id));
    
    if (allSelected) {
      setSelectedItems(prev => prev.filter(id => 
        !businessItems.find(item => item.order_id === id)
      ));
    } else {
      const newSelected = businessItems
        .map(item => item.order_id)
        .filter(id => !selectedItems.includes(id));
      setSelectedItems(prev => [...prev, ...newSelected]);
    }
  };

  const handleUpdateQuantity = (orderId, newQty) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.order_id === orderId 
          ? { 
              ...item, 
              qty: newQty,
              overall_pay: item.product.price * newQty 
            }
          : item
      )
    );
  };

  useEffect(() => {
    const total = cartItems
      .filter(item => selectedItems.includes(item.order_id))
      .reduce((sum, item) => sum + (item.overall_pay || item.product.price * (item.qty || 1)), 0);
    setTotalAmount(total);
  }, [selectedItems, cartItems]);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error('Please select items to checkout');
      return;
    }
    setCheckOutConfirm(true);
  };

  const handleConfirmCheckout = (receiveDate) => {
    const selectedOrders = cartItems.filter(item => 
      selectedItems.includes(item.order_id)
    ).map(item => {
      const totalAmount = item.overall_pay || item.product.price * (item.qty || 1);
      return {
        ...item,
        status: "Processing",
        checkoutDate: new Date().toISOString(),
        receiveDate: receiveDate.toISOString(),
        totalAmount: totalAmount,
        downPayment: totalAmount * 0.5,
        remainingPayment: totalAmount * 0.5,
        paymentStatus: "Partial - Down Payment Received"
      };
    });

    // Add to processing orders
    setProcessingOrders(prev => [...prev, ...selectedOrders]);

    // Remove from cart
    setCartItems(prev => 
      prev.filter(item => !selectedItems.includes(item.order_id))
    );

    setSelectedItems([]);
    setCheckOutConfirm(false);
    
    toast.success("Down payment received! Order has been placed successfully!");
    navigate('/cart/in-process');
  };

  const getOrderCount = () => {
    switch(location.pathname) {
      case '/cart':
        return cartItems.length;
      case '/cart/in-process':
        return processingOrders.length;
      case '/cart/to-receive':
        return toReceiveOrders.length;
      case '/cart/completed':
        return completedOrders.length;
      case '/cart/cancelled':
        return cancelledOrders.length;
      default:
        return 0;
    }
  };

  // Group cart items by store
  const groupedCartItems = React.useMemo(() => {
    const grouped = cartItems.reduce((acc, item) => {
      const busId = item.business?.bus_id;
      if (!busId) return acc;
      
      if (!acc[busId]) {
        acc[busId] = {
          business: item.business,
          items: []
        };
      }
      acc[busId].items.push(item);
      return acc;
    }, {});

    return Object.values(grouped);
  }, [cartItems]);

  // Add this useEffect to initialize the dummy data
  useEffect(() => {
    // Dummy data for to-receive orders
    const dummyToReceive = [{
      order_id: "TR001",
      product: {
        prod_name: "Classic Palmier",
        price: 89.99,
        description: "Crispy puff pastry heart shapes"
      },
      business: {
        name: "Peter's Pastry Paradise"
      },
      qty: 4,
      overall_pay: 359.96,
      receiveDate: new Date().toISOString()
    }];

    // Dummy data for completed orders
    const dummyCompleted = [{
      order_id: "CO001",
      product: {
        prod_name: "Classic Palmier",
        price: 89.99,
        description: "Crispy puff pastry heart shapes"
      },
      business: {
        name: "Peter's Pastry Paradise"
      },
      qty: 4,
      overall_pay: 359.96,
      completedDate: new Date().toISOString()
    }];

    // Dummy data for cancelled orders
    const dummyCancelled = [{
      order_id: "CA001",
      product: {
        prod_name: "Classic Palmier",
        price: 89.99,
        description: "Crispy puff pastry heart shapes"
      },
      business: {
        name: "Peter's Pastry Paradise"
      },
      qty: 4,
      overall_pay: 359.96,
      cancellationReason: "Changed my mind",
      cancelledDate: new Date().toISOString()
    }];

    // Dummy data for refunded orders
    const dummyRefunded = [{
      order_id: "RF001",
      product: {
        prod_name: "Classic Palmier",
        price: 89.99,
        description: "Crispy puff pastry heart shapes"
      },
      business: {
        name: "Peter's Pastry Paradise"
      },
      qty: 4,
      overall_pay: 359.96,
      refundReason: "Product quality issues",
      refundDate: new Date().toISOString()
    }];

    setToReceiveOrders(dummyToReceive);
    setCompletedOrders(dummyCompleted);
    setCancelledOrders(dummyCancelled);
    setRefundedOrders(dummyRefunded);
    console.log('Refunded orders set:', dummyRefunded);
  }, []);

  console.log('Current refunded orders:', refundedOrders);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster richColors closeButton position="top-center" />
      <CartHeader />
      
      {/* Main content area */}
      <div className="flex-1 px-4 md:px-8 lg:px-12 xl:px-32 2xl:px-72 mb-24"> {/* Added mb-24 for CartSummary space */}
        {checkOutConfirm && (
          <OrderConfirmation 
            isOpen={checkOutConfirm}
            closeModal={() => setCheckOutConfirm(false)}
            totalAmount={totalAmount}
            selectedItems={selectedItems.map(id => 
              cartItems.find(item => item.order_id === id)
            )}
            onConfirm={handleConfirmCheckout}
          />
        )}

        <div className="flex flex-col gap-2">
          <div className="flex justify-between pt-24 md:pt-36">
            <div className="flex gap-2 items-center text-xl md:text-3xl font-semibold">
              <h1>My Orders</h1>
              <h1 className="bg-gray-300 px-3 rounded-md">{getOrderCount()}</h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-primary py-2 px-10 text-white rounded-lg font-semibold"
            >
              Back
            </button>
          </div>
          <CartTabs />
          <hr className="bg-black" />
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col gap-4 pb-20 relative z-0">
                {isLoading ? (
                  <div className="text-center py-8">
                    <p>Loading cart items...</p>
                  </div>
                ) : groupedCartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p>Your cart is empty</p>
                    <button
                      onClick={() => navigate('/')}
                      className="mt-4 bg-primary text-white px-6 py-2 rounded-lg"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  groupedCartItems.map((group, index) => (
                    <StoreOrderCard
                      key={index}
                      storeData={group}
                      selectedItems={selectedItems}
                      onSelectItem={handleSelectItem}
                      onSelectAll={() => handleSelectAll(group.business.bus_id)}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  ))
                )}
              </div>
            }
          />
          <Route
            path="/in-process"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {processingOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p>No orders in process</p>
                    <button
                      onClick={() => navigate('/')}
                      className="mt-4 bg-primary text-white px-6 py-2 rounded-lg"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  processingOrders.map((order, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        console.log('Card clicked:', order);
                        // Add your click handler here
                      }}
                    >
                      <div className="flex justify-between mb-4 pb-2 border-b">
                        <div className="flex flex-col">
                          <h3 className="font-semibold text-lg">Order #{order.order_id}</h3>
                          <span className="text-sm text-gray-500">
                            Ordered on: {new Date(order.checkoutDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="relative group">
                          <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-1">
                            <span>Processing</span>
                            <FiAlertCircle className="w-4 h-4" />
                          </div>
                          <div className="absolute right-0 mt-2 w-48 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-center z-10">
                            Waiting for the baker to accept
                            <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <img
                          src={order.images?.[0]?.link || CakeSample}
                          alt={order.product?.prod_name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-lg">{order.product?.prod_name}</p>
                              <p className="text-gray-500 text-sm">{order.business?.name}</p>
                            </div>
                            <p className="text-primary font-semibold text-lg">
                              ₱{order.overall_pay.toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="mt-2 flex justify-between items-end">
                            <div className="text-sm text-gray-600">
                              <p>Quantity: {order.qty}</p>
                              <p>Expected delivery: {new Date(order.receiveDate).toLocaleDateString()}</p>
                            </div>
                            <button className="text-primary text-sm hover:underline">
                              Contact Seller
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            }
          />
          <Route
            path="/to-receive"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {toReceiveOrders.map((order, index) => (
                  <div key={index}>
                    <div className="bg-white rounded-lg p-4">
                      {/* Store Name Header */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">{order.business?.name}</h2>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">★</span>
                          <span>4.9</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-600">1250 sold</span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex gap-4">
                        <img
                          src="/path/to/default-image.jpg"
                          alt={order.product?.prod_name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">{order.product?.prod_name}</h3>
                          <p className="text-gray-600">{order.product?.description}</p>
                          <div className="flex justify-between items-end mt-2">
                            <p className="text-primary text-lg font-semibold">
                              ₱{order.product?.price?.toFixed(2) || '0.00'}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-600">Quantity: {order.qty || 0}</span>
                              <span className="text-gray-600">
                                Total: ₱{order.overall_pay?.toFixed(2) || '0.00'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex justify-end mt-4">
                        <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          Ready for Pickup
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />

          <Route
            path="/completed"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {completedOrders.map((order, index) => (
                  <div key={index}>
                    <div className="bg-white rounded-lg p-4">
                      {/* Same structure as above */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">{order.business?.name}</h2>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">★</span>
                          <span>4.9</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-600">1250 sold</span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <img
                          src="/path/to/default-image.jpg"
                          alt={order.product?.prod_name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">{order.product?.prod_name}</h3>
                          <p className="text-gray-600">{order.product?.description}</p>
                          <div className="flex justify-between items-end mt-2">
                            <p className="text-primary text-lg font-semibold">
                              ₱{order.product?.price?.toFixed(2) || '0.00'}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-600">Quantity: {order.qty || 0}</span>
                              <span className="text-gray-600">
                                Total: ₱{order.overall_pay?.toFixed(2) || '0.00'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Completed
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />

          <Route
            path="/cancelled"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {cancelledOrders.map((order, index) => (
                  <div key={index}>
                    <div className="bg-white rounded-lg p-4">
                      {/* Store Name Header */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">{order.business?.name}</h2>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">★</span>
                          <span>4.9</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-600">1250 sold</span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex gap-4">
                        <img
                          src="/path/to/default-image.jpg"
                          alt={order.product?.prod_name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">{order.product?.prod_name}</h3>
                          <p className="text-gray-600">{order.product?.description}</p>
                          <div className="flex justify-between items-end mt-2">
                            <p className="text-primary text-lg font-semibold">
                              ₱{order.product?.price?.toFixed(2) || '0.00'}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-600">Quantity: {order.qty || 0}</span>
                              <span className="text-gray-600">
                                Total: ₱{order.overall_pay?.toFixed(2) || '0.00'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cancellation Reason */}
                      <div className="mt-2 text-red-600 text-sm">
                        Reason: {order.cancellationReason}
                      </div>

                      {/* Status Badge */}
                      <div className="flex justify-end mt-4">
                        <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                          Cancelled
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />

          <Route
            path="/refunded"
            element={
              <div className="flex flex-col gap-4 mt-4">
                {refundedOrders && refundedOrders.length > 0 ? (
                  refundedOrders.map((order, index) => (
                    <div key={index}>
                      <div className="bg-white rounded-lg p-4">
                        {/* Store Name Header */}
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-semibold">{order.business?.name}</h2>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400">★</span>
                            <span>4.9</span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">1250 sold</span>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex gap-4">
                          <img
                            src="/path/to/default-image.jpg"
                            alt={order.product?.prod_name}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-medium">{order.product?.prod_name}</h3>
                            <p className="text-gray-600">{order.product?.description}</p>
                            <div className="flex justify-between items-end mt-2">
                              <p className="text-primary text-lg font-semibold">
                                ₱{order.product?.price?.toFixed(2) || '0.00'}
                              </p>
                              <div className="flex items-center gap-4">
                                <span className="text-gray-600">Quantity: {order.qty || 0}</span>
                                <span className="text-gray-600">
                                  Total: ₱{order.overall_pay?.toFixed(2) || '0.00'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Refund Information */}
                        <div className="mt-2">
                          <p className="text-yellow-600 text-sm">
                            Reason: {order.refundReason}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Refunded on: {new Date(order.refundDate).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Status Badge */}
                        <div className="flex justify-end mt-4">
                          <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                            Refunded
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p>No refunded orders</p>
                  </div>
                )}
              </div>
            }
          />
        </Routes>
      </div>

      {/* CartSummary at the bottom */}
      <div className="fixed bottom-0 left-0 right-0">
        <CartSummary
          totalAmount={totalAmount}
          itemCount={selectedItems.length}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default Cart;
