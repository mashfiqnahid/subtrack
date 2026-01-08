export type BillingCycle = 'monthly' | 'yearly';

export type Category = 'Entertainment' | 'Utilities' | 'Software' | 'Food' | 'Health' | 'Other';

export interface Subscription {
  id: string;
  serviceName: string;
  amount: number;
  currency: string;
  billingCycle: BillingCycle;
  firstPaymentDate: string;
  category: Category;
  nextPaymentDate?: string;
}
