import React from 'react';
import { Link } from 'react-router-dom';
import CakeSample from '../../assets/CakeSample.png'; // Import a default image
import { FiAlertCircle } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { TbRefresh } from 'react-icons/tb';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    'To Receive': {
      icon: FiAlertCircle,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      message: 'Ready for pickup/delivery'
    },
    'Completed': {
      icon: BsCheckCircleFill,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      message: 'Order completed successfully'
    },
    'Cancelled': {
      icon: MdCancel,
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      message: 'Order was cancelled'
    },
    'Refunded': {
      icon: TbRefresh,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      message: 'Payment has been refunded'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="relative group">
      <div className={`px-3 py-1 ${config.bgColor} ${config.textColor} rounded-full text-sm font-medium flex items-center gap-1`}>
        <span>{status}</span>
        <Icon className="w-4 h-4" />
      </div>
      <div className="absolute right-0 mt-2 w-48 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-center z-10">
        {config.message}
        <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
      </div>
    </div>
  );
};

const OrderCard = ({ data, isSelected, onSelect, onSelectAll, status }) => {
  if (!data || !data.product || !data.business) {
    return null; // Or return a loading/error state
  }

  const { product, business, images, qty, overall_pay } = data;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between mb-4 pb-2 border-b">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onSelect}
                className="w-5 h-5"
              />
              <Link to={`/store/${business.bus_id}`} className="font-semibold hover:text-primary">
                {business.name}
              </Link>
            </div>
            <button
              onClick={onSelectAll}
              className="text-sm text-gray-500 hover:text-primary"
            >
              Select All from Store
            </button>
          </div>

          <div className="flex gap-4">
            <img
              src={images?.[0]?.link || CakeSample}
              alt={product.prod_name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Order #{data.order_id}</h3>
              <span className="text-sm text-gray-500">
                {status === 'Completed' && `Completed on: ${new Date(data.completedDate).toLocaleDateString()}`}
                {status === 'Cancelled' && `Cancelled on: ${new Date(data.cancelledDate).toLocaleDateString()}`}
                {status === 'Refunded' && `Refunded on: ${new Date(data.refundedDate).toLocaleDateString()}`}
              </span>
              <h3 className="font-semibold">{product.prod_name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-primary font-semibold">₱{overall_pay?.toFixed(2) || '0.00'}</p>
                <p>Quantity: {qty || 1}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StatusBadge status={status} />
    </div>
  );
};

export default OrderCard;