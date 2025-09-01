import React from 'react';
import { CheckCircle, Clock, Truck, Package, ShoppingCart } from 'lucide-react';

interface StatusBadgeProps {
  status: 'pending' | 'verified' | 'in-transit' | 'delivered' | 'sold';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = {
    pending: {
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      label: 'Pending',
    },
    verified: {
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800 border-green-200',
      label: 'Verified',
    },
    'in-transit': {
      icon: Truck,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      label: 'In Transit',
    },
    delivered: {
      icon: Package,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      label: 'Delivered',
    },
    sold: {
      icon: ShoppingCart,
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      label: 'Sold',
    },
  };

  const { icon: Icon, color, label } = config[status];
  const sizeClasses =
    size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border ${color} ${sizeClasses}
        sm:text-xs sm:px-2 sm:py-1
      `}
    >
      <Icon
        className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} mr-1 flex-shrink-0`}
      />
      <span className="truncate max-w-[80px] sm:max-w-[60px]">{label}</span>
    </span>
  );
};
