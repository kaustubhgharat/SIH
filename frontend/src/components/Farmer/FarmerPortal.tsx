import React from 'react';
import { FarmerForm } from './FarmerForm';
import { BatchHistory } from './BatchHistory';

export const FarmerPortal: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2">
        <FarmerForm />
        <BatchHistory />
      </div>
    </div>
  );
};
