import React from 'react';
import { Clock, MapPin, Package } from 'lucide-react';
import { Card } from '../UI/Card';
import { StatusBadge } from '../UI/StatusBadge';
import { mockBatches } from '../../data/mockData';

export const BatchHistory: React.FC = () => {
  // Filter batches for current farmer (mock data shows all)
  const farmerBatches = mockBatches;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card title="Batch History" subtitle="Track your submitted produce batches">
      <div className="space-y-4">
        {farmerBatches.map((batch) => (
          <div
            key={batch.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-white"
          >
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
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
                  <p className="text-sm text-gray-600">Batch ID: {batch.id}</p>
                </div>
              </div>
              <div className="self-start sm:self-auto">
                <StatusBadge status={batch.status} />
              </div>
            </div>

            {/* Batch details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Harvested: {formatDate(batch.harvestDate)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{batch.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Package className="w-4 h-4 shrink-0" />
                <span>
                  {batch.quantity} {batch.unit}
                </span>
              </div>
            </div>

            {/* Quality Score */}
            {batch.qualityScore && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Quality Score:</span>
                  <span
                    className={`font-semibold ${
                      batch.qualityScore >= 90
                        ? 'text-green-600'
                        : batch.qualityScore >= 75
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {batch.qualityScore}/100
                  </span>
                </div>
              </div>
            )}

            {/* Certifications */}
            {batch.certifications.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {batch.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
