import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BillingHistory {
  id: number;
  date: Date;
  description: string;
  credits: number;
  amount: number;
  status: 'completed' | 'pending';
}

interface Usage {
  totalQueries: number;
  totalReports: number;
  creditsUsedThisMonth: number;
  monthlySpend: number;
}

interface BillingContextType {
  credits: number;
  usage: Usage;
  billingHistory: BillingHistory[];
  useCredits: (amount: number) => void;
  addCredits: (amount: number) => void;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export const BillingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [credits, setCredits] = useState(247);
  const [usage] = useState<Usage>({
    totalQueries: 156,
    totalReports: 23,
    creditsUsedThisMonth: 153,
    monthlySpend: 89
  });

  const [billingHistory] = useState<BillingHistory[]>([
    {
      id: 1,
      date: new Date(Date.now() - 86400000),
      description: 'Professional Package - 500 credits',
      credits: 500,
      amount: 79,
      status: 'completed'
    },
    {
      id: 2,
      date: new Date(Date.now() - 2592000000),
      description: 'Starter Package - 100 credits',
      credits: 100,
      amount: 19,
      status: 'completed'
    },
    {
      id: 3,
      date: new Date(Date.now() - 5184000000),
      description: 'Enterprise Package - 2000 credits',
      credits: 2000,
      amount: 299,
      status: 'completed'
    }
  ]);

  const useCredits = (amount: number) => {
    setCredits(prev => Math.max(0, prev - amount));
  };

  const addCredits = (amount: number) => {
    setCredits(prev => prev + amount);
  };

  return (
    <BillingContext.Provider value={{ credits, usage, billingHistory, useCredits, addCredits }}>
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (context === undefined) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
};