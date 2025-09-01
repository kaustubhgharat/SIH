import React, { useState } from 'react';
import { QrCode, Search } from 'lucide-react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Card } from '../UI/Card';

interface QRScannerProps {
  onBatchFound: (batchId: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onBatchFound }) => {
  const [manualInput, setManualInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    // Simulate QR code scanning
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsScanning(false);
    // Mock successful scan
    onBatchFound('BTH001');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      onBatchFound(manualInput.trim());
      setManualInput('');
    }
  };

  return (
    <Card
      title="Trace Your Produce"
      subtitle="Scan QR code or enter batch ID to view complete traceability information"
    >
      <div className="space-y-6">
        {/* QR Code Scanner */}
        <div className="text-center">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 bg-gray-50">
            <QrCode className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Position QR code within the scanner area
            </p>
            <Button
              icon={QrCode}
              onClick={handleScan}
              loading={isScanning}
              disabled={isScanning}
              className="w-full sm:w-auto"
            >
              {isScanning ? 'Scanning...' : 'Start QR Scanner'}
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-2 bg-white text-gray-500">Or enter manually</span>
          </div>
        </div>

        {/* Manual Input */}
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <Input
            label="Batch ID or QR Code"
            value={manualInput}
            onChange={setManualInput}
            placeholder="e.g., BTH001, BTH002, BTH003"
          />
          <Button
            type="submit"
            icon={Search}
            disabled={!manualInput.trim()}
            className="w-full"
          >
            Search Batch
          </Button>
        </form>

        {/* Suggested IDs */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
            Try These Sample Batch IDs:
          </h4>
          <div className="flex flex-wrap gap-2">
            {['BTH001', 'BTH002', 'BTH003'].map((id) => (
              <button
                key={id}
                onClick={() => onBatchFound(id)}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm rounded-full hover:bg-blue-200 transition-colors duration-200"
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
