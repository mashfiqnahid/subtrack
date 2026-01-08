import React from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { DollarSign, TrendingUp, Award } from 'lucide-react';
import StatCard from './StatCard';

const Dashboard: React.FC = () => {
  const { totalMonthlySpend, totalYearlySpend, highestExpense } = useSubscriptions();

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Monthly Spend"
        value={formatCurrency(totalMonthlySpend)}
        subtitle="Average per month"
        icon={DollarSign}
        color="bg-blue-500"
      />
      <StatCard
        title="Total Yearly Spend"
        value={formatCurrency(totalYearlySpend)}
        subtitle="Projected annually"
        icon={TrendingUp}
        color="bg-green-500"
      />
      <StatCard
        title="Highest Expense"
        value={highestExpense ? formatCurrency(highestExpense.amount) : '$0.00'}
        subtitle={highestExpense?.serviceName || 'No subscriptions'}
        icon={Award}
        color="bg-purple-500"
      />
    </div>
  );
};

export default Dashboard;
