import type{ ProduceBatch, Transaction, QualityScore, PriceHistory } from '../types';

export const mockBatches: ProduceBatch[] = [
  {
    id: 'BTH001',
    cropType: 'Tomatoes',
    variety: 'Roma',
    harvestDate: '2025-01-10',
    location: 'Organic Valley Farm, California',
    farmerId: 'FRM001',
    farmerName: 'John Martinez',
    quantity: 150,
    unit: 'kg',
    imageUrl: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
    status: 'verified',
    createdAt: '2025-01-10T08:30:00Z',
    qualityScore: 94,
    certifications: ['Organic', 'Non-GMO', 'Fair Trade'],
    blockchainTxId: '0x1a2b3c4d5e6f7890abcdef1234567890'
  },
  {
    id: 'BTH002',
    cropType: 'Lettuce',
    variety: 'Iceberg',
    harvestDate: '2025-01-12',
    location: 'Green Acres Farm, Oregon',
    farmerId: 'FRM002',
    farmerName: 'Sarah Chen',
    quantity: 75,
    unit: 'kg',
    imageUrl: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
    status: 'in-transit',
    createdAt: '2025-01-12T06:15:00Z',
    qualityScore: 89,
    certifications: ['Organic', 'Local'],
    blockchainTxId: '0x2b3c4d5e6f7890abcdef1234567890ab'
  },
  {
    id: 'BTH003',
    cropType: 'Apples',
    variety: 'Gala',
    harvestDate: '2025-01-08',
    location: 'Mountain View Orchard, Washington',
    farmerId: 'FRM003',
    farmerName: 'Mike Thompson',
    quantity: 200,
    unit: 'kg',
    imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
    status: 'delivered',
    createdAt: '2025-01-08T14:20:00Z',
    qualityScore: 96,
    certifications: ['Organic', 'Non-GMO'],
    blockchainTxId: '0x3c4d5e6f7890abcdef1234567890abcd'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    batchId: 'BTH001',
    type: 'harvest',
    from: 'Organic Valley Farm',
    to: 'Farm Storage',
    timestamp: '2025-01-10T08:30:00Z',
    blockchainTxId: '0x1a2b3c4d5e6f7890abcdef1234567890',
    status: 'confirmed'
  },
  {
    id: 'TXN002',
    batchId: 'BTH001',
    type: 'verification',
    from: 'Farm Storage',
    to: 'Quality Control',
    timestamp: '2025-01-10T10:15:00Z',
    blockchainTxId: '0x1b2c3d4e5f6789abcdef1234567890ab',
    status: 'confirmed'
  },
  {
    id: 'TXN003',
    batchId: 'BTH001',
    type: 'transfer',
    from: 'Organic Valley Farm',
    to: 'Fresh Market Distributors',
    timestamp: '2025-01-11T09:00:00Z',
    blockchainTxId: '0x1c2d3e4f5678abcdef1234567890abcd',
    status: 'confirmed'
  }
];

export const mockQualityScores: QualityScore[] = [
  {
    batchId: 'BTH001',
    overallScore: 94,
    freshness: 96,
    appearance: 92,
    size: 95,
    pesticides: 98,
    nutrients: 91,
    generatedAt: '2025-01-10T08:45:00Z',
    aiModel: 'AgriVision AI v2.1'
  },
  {
    batchId: 'BTH002',
    overallScore: 89,
    freshness: 88,
    appearance: 90,
    size: 87,
    pesticides: 95,
    nutrients: 88,
    generatedAt: '2025-01-12T06:30:00Z',
    aiModel: 'AgriVision AI v2.1'
  },
  {
    batchId: 'BTH003',
    overallScore: 96,
    freshness: 97,
    appearance: 95,
    size: 96,
    pesticides: 99,
    nutrients: 94,
    generatedAt: '2025-01-08T14:35:00Z',
    aiModel: 'AgriVision AI v2.1'
  }
];

export const mockPriceHistory: PriceHistory[] = [
  {
    batchId: 'BTH001',
    date: '2025-01-11',
    price: 4.50,
    location: 'Fresh Market Distributors',
    retailer: 'Wholesale'
  },
  {
    batchId: 'BTH001',
    date: '2025-01-12',
    price: 5.99,
    location: 'Metro Grocery Store',
    retailer: 'Metro Foods'
  },
  {
    batchId: 'BTH003',
    date: '2025-01-09',
    price: 3.25,
    location: 'Mountain View Orchard',
    retailer: 'Farm Direct'
  },
  {
    batchId: 'BTH003',
    date: '2025-01-10',
    price: 4.99,
    location: 'Organic Market',
    retailer: 'Whole Earth'
  }
];