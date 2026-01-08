import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Subscription } from '../types/subscription';

interface SubscriptionContextType {
  subscriptions: Subscription[];
  addSubscription: (subscription: Omit<Subscription, 'id'>) => void;
  updateSubscription: (id: string, subscription: Omit<Subscription, 'id'>) => void;
  deleteSubscription: (id: string) => void;
  totalMonthlySpend: number;
  totalYearlySpend: number;
  highestExpense: Subscription | null;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscriptions = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider');
  }
  return context;
};

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('subscriptions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const calculateMonthlyAmount = (subscription: Subscription): number => {
    return subscription.billingCycle === 'monthly' 
      ? subscription.amount 
      : subscription.amount / 12;
  };

  const calculateYearlyAmount = (subscription: Subscription): number => {
    return subscription.billingCycle === 'yearly' 
      ? subscription.amount 
      : subscription.amount * 12;
  };

  const totalMonthlySpend = subscriptions.reduce(
    (sum, sub) => sum + calculateMonthlyAmount(sub),
    0
  );

  const totalYearlySpend = subscriptions.reduce(
    (sum, sub) => sum + calculateYearlyAmount(sub),
    0
  );

  const highestExpense = subscriptions.length > 0
    ? subscriptions.reduce((max, sub) => 
        calculateMonthlyAmount(sub) > calculateMonthlyAmount(max) ? sub : max
      )
    : null;

  const addSubscription = (subscription: Omit<Subscription, 'id'>) => {
    const newSubscription: Subscription = {
      ...subscription,
      id: Date.now().toString(),
    };
    setSubscriptions([...subscriptions, newSubscription]);
  };

  const updateSubscription = (id: string, subscription: Omit<Subscription, 'id'>) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id ? { ...subscription, id } : sub
      )
    );
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription,
        updateSubscription,
        deleteSubscription,
        totalMonthlySpend,
        totalYearlySpend,
        highestExpense,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
