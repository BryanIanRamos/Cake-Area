import React, { useState } from 'react';
import BakerLayout from '../../components/baker/BakerLayout';
import { Icon } from "@iconify/react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('week'); // week, month, year

  // Sample data - Replace with actual data
  const salesData = {
    week: [
      { day: 'Mon', sales: 2400, orders: 15 },
      { day: 'Tue', sales: 1398, orders: 12 },
      { day: 'Wed', sales: 9800, orders: 25 },
      { day: 'Thu', sales: 3908, orders: 18 },
      { day: 'Fri', sales: 4800, orders: 20 },
      { day: 'Sat', sales: 3800, orders: 17 },
      { day: 'Sun', sales: 4300, orders: 19 },
    ],
    month: [
      // Add monthly data here
    ],
    year: [
      // Add yearly data here
    ],
  };

  const categoryData = [
    { name: 'Cakes', value: 400 },
    { name: 'Bread', value: 300 },
    { name: 'Pastries', value: 200 },
    { name: 'Cookies', value: 150 },
    { name: 'Pies', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const metrics = [
    {
      title: 'Total Sales',
      value: '₱45,678',
      change: '+12.5%',
      icon: 'mdi:currency-php',
      trend: 'up',
    },
    {
      title: 'Total Orders',
      value: '126',
      change: '+8.2%',
      icon: 'mdi:shopping-outline',
      trend: 'up',
    },
    {
      title: 'Average Order Value',
      value: '₱362.52',
      change: '-2.4%',
      icon: 'mdi:chart-line',
      trend: 'down',
    },
    {
      title: 'Customer Satisfaction',
      value: '4.8/5',
      change: '+0.3',
      icon: 'mdi:star',
      trend: 'up',
    },
  ];

  return (
    <BakerLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Business Statistics</h1>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last 12 Months</option>
            </select>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">{metric.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                  </div>
                  <Icon icon={metric.icon} className="text-2xl text-gray-400" />
                </div>
                <div className="flex items-center mt-2">
                  <Icon
                    icon={metric.trend === 'up' ? 'mdi:trending-up' : 'mdi:trending-down'}
                    className={`mr-1 ${
                      metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData[timeRange]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#E88F2A"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Orders Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Orders Overview</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData[timeRange]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#E88F2A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Best Selling Products */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Best Selling Products</h3>
              <div className="space-y-4">
                {[
                  {
                    id: "1",
                    name: "Premium Almond Croissant",
                    orders: 63,
                    price: 119.99,
                    image: "../assets/AlmondCroissantv2.jpg"
                  },
                  {
                    id: "2",
                    name: "Classic Brioche",
                    orders: 45,
                    price: 199.99,
                    image: "../assets/ClassicBriochev3.jpg"
                  },
                  {
                    id: "3",
                    name: "Chocolate Dream Layer Cake",
                    orders: 38,
                    price: 299.99,
                    image: "../assets/ChocolateDreamLayerCakev1.jpg"
                  },
                  {
                    id: "4",
                    name: "Classic Butter Croissant",
                    orders: 35,
                    price: 89.99,
                    image: "../assets/ButterCroissantv1.jpg"
                  },
                  {
                    id: "5",
                    name: "Carrot Spice Cake",
                    orders: 28,
                    price: 249.99,
                    image: "../assets/CarrotSpiceCakev1.jpg"
                  }
                ].map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {product.orders} orders
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">₱{product.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BakerLayout>
  );
};

export default Statistics; 