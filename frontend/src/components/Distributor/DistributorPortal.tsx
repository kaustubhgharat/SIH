import React from 'react';
import { BatchVerification } from './BatchVerification';

export const DistributorPortal: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="space-y-6">
        <BatchVerification />
      </div>
    </div>
  );
};
