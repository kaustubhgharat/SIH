import React, { useState } from 'react';
import { QRScanner } from './QRScanner';
import { TraceabilityInfo } from './TraceabilityInfo';
import { mockBatches } from '../../data/mockData';
import type { ProduceBatch } from '../../types';

export const ConsumerPortal: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<ProduceBatch | null>(null);

  const handleBatchFound = (batchId: string) => {
    const batch = mockBatches.find((b) => b.id === batchId);
    if (batch) {
      setSelectedBatch(batch);
    } else {
      alert('Batch not found. Please check the batch ID and try again.');
    }
  };

  const handleBack = () => {
    setSelectedBatch(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {selectedBatch ? (
        <TraceabilityInfo batch={selectedBatch} onBack={handleBack} />
      ) : (
        <div className="max-w-xl mx-auto w-full">
          <QRScanner onBatchFound={handleBatchFound} />
        </div>
      )}
    </div>
  );
};
