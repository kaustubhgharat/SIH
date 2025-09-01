export interface ProduceBatch {
  id: string;
  cropType: string;
  variety: string;
  harvestDate: string;
  location: string;
  farmerId: string;
  farmerName: string;
  quantity: number;
  unit: string;
  imageUrl?: string;
  status: 'pending' | 'verified' | 'in-transit' | 'delivered' | 'sold';
  createdAt: string;
  qualityScore?: number;
  certifications: string[];
  blockchainTxId?: string;
}

export interface Transaction {
  id: string;
  batchId: string;
  type: 'harvest' | 'transfer' | 'verification' | 'sale';
  from: string;
  to: string;
  timestamp: string;
  blockchainTxId: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface QualityScore {
  batchId: string;
  overallScore: number;
  freshness: number;
  appearance: number;
  size: number;
  pesticides: number;
  nutrients: number;
  generatedAt: string;
  aiModel: string;
}

export interface PriceHistory {
  batchId: string;
  date: string;
  price: number;
  location: string;
  retailer: string;
}

export type UserRole = 'farmer' | 'distributor' | 'consumer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  farmName?: string;
  companyName?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}