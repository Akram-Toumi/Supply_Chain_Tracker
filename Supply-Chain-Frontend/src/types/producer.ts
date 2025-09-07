export type ProductStatus = 'available' | 'low' | 'out_of_stock';
export type BatchStatus = 'processing' | 'completed' | 'shipped';
export type CertificateStatus = 'active' | 'expiring' | 'expired';
export type TransactionType = 'production' | 'shipment' | 'certification';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: ProductStatus;
  lastUpdated: string;
}

export interface Batch {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  productionDate: string;
  expiryDate: string;
  status: BatchStatus;
  certificates: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate: string;
  status: CertificateStatus;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  date: string;
  status: TransactionStatus;
}

export interface Analytics {
  totalProducts: number;
  activeBatches: number;
  totalCertificates: number;
  recentTransactions: Transaction[];
}
