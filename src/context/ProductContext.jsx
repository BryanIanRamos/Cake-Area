import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import productsData from '../data/products.json';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useLocalStorage('products', productsData.products);
  const [categories] = useState(productsData.categories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate loading state
  const withLoading = async (callback) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      await callback();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (newProduct) => {
    await withLoading(async () => {
      setProducts(prev => [...prev, { 
        ...newProduct, 
        id: Math.max(...prev.map(p => p.id)) + 1,
        createdAt: new Date().toISOString(),
        rating: 0,
        ordered: 0,
        viewed: 0
      }]);
    });
  };

  const updateProduct = async (updatedProduct) => {
    await withLoading(async () => {
      setProducts(prev => 
        prev.map(product => 
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    });
  };

  const deleteProduct = async (productId) => {
    await withLoading(async () => {
      setProducts(prev => prev.filter(product => product.id !== productId));
    });
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const filterProducts = ({ category, search, sortBy }) => {
    let filtered = [...products];

    // Category filter
    if (category && category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.ordered - a.ordered);
        break;
      default:
        break;
    }

    return filtered;
  };

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      error,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      filterProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext); 