import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, Truck } from 'lucide-react';
import type { ProduceBatch } from '../../types';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { StatusBadge } from '../UI/StatusBadge';
import { mockBatches } from '../../data/mockData';

export const BatchVerification: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<ProduceBatch | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Show only pending or verified batches
  const pendingBatches = mockBatches.filter(
    (batch) => batch.status === 'pending' || batch.status === 'verified'
  );

  const handleVerifyBatch = async (
    batchId: string,
    action: 'verify' | 'reject'
  ) => {
    console.log(`Batch ${batchId} - Action: ${action}`);
    setIsProcessing(true);

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setSelectedBatch(null);
  };

  const handleUpdateStatus = async (
    batchId: string,
    newStatus: ProduceBatch['status']
  ) => {
    console.log(`Batch ${batchId} updated to ${newStatus}`);
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <Card title="Batch Verification" subtitle="Verify and update produce batch status">
        <div className="space-y-4">
          {pendingBatches.map((batch) => (
            <div
              key={batch.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-3">
                <div className="flex items-center space-x-3">
                  {batch.imageUrl && (
                    <img
                      src={batch.imageUrl}
                      alt={batch.cropType}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {batch.cropType} - {batch.variety}
                    </h4>
                    <p className="text-sm text-gray-600">From: {batch.farmerName}</p>
                    <p className="text-sm text-gray-600">Batch ID: {batch.id}</p>
                  </div>
                </div>
                <StatusBadge status={batch.status} />
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                <div>
                  Quantity: {batch.quantity} {batch.unit}
                </div>
                <div>
                  Harvest: {new Date(batch.harvestDate).toLocaleDateString()}
                </div>
                <div>Quality: {batch.qualityScore}/100</div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Eye}
                  onClick={() => setSelectedBatch(batch)}
                >
                  View Details
                </Button>

                {batch.status === 'pending' && (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={CheckCircle}
                      onClick={() => handleVerifyBatch(batch.id, 'verify')}
                      loading={isProcessing}
                    >
                      Verify
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={XCircle}
                      onClick={() => handleVerifyBatch(batch.id, 'reject')}
                      loading={isProcessing}
                    >
                      Reject
                    </Button>
                  </>
                )}

                {batch.status === 'verified' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Truck}
                    onClick={() => handleUpdateStatus(batch.id, 'in-transit')}
                    loading={isProcessing}
                  >
                    Mark as Shipped
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal */}
      {selectedBatch && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="p-6">
              {/* Modal header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Batch Details</h3>
                <button
                  onClick={() => setSelectedBatch(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                  aria-label="Close details"
                >
                  ×
                </button>
              </div>

              {/* Modal content */}
              <div className="space-y-4">
                {selectedBatch.imageUrl && (
                  <img
                    src={selectedBatch.imageUrl}
                    alt={selectedBatch.cropType}
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                  />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Crop:</span>
                    <p>
                      {selectedBatch.cropType} - {selectedBatch.variety}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Farmer:</span>
                    <p>{selectedBatch.farmerName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <p>{selectedBatch.location}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Quantity:</span>
                    <p>
                      {selectedBatch.quantity} {selectedBatch.unit}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Certifications:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedBatch.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedBatch.blockchainTxId && (
                  <div>
                    <span className="font-medium text-gray-700">Blockchain Transaction:</span>
                    <p className="font-mono text-xs text-gray-600 break-all mt-1">
                      {selectedBatch.blockchainTxId}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
