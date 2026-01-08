import React from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Category } from '../types/subscription';

const Analytics: React.FC = () => {
  const { subscriptions } = useSubscriptions();

  const COLORS: { [key in Category]: string } = {
    Entertainment: '#8B5CF6',
    Utilities: '#F59E0B',
    Software: '#3B82F6',
    Food: '#10B981',
    Health: '#EF4444',
    Other: '#6B7280',
  };

  const calculateMonthlyAmount = (subscription: typeof subscriptions[0]): number => {
    return subscription.billingCycle === 'monthly' 
      ? subscription.amount 
      : subscription.amount / 12;
  };

  const categoryData = subscriptions.reduce((acc, sub) => {
    const monthlyAmount = calculateMonthlyAmount(sub);
    const existing = acc.find((item) => item.name === sub.category);
    
    if (existing) {
      existing.value += monthlyAmount;
    } else {
      acc.push({
        name: sub.category,
        value: monthlyAmount,
      });
    }
    
    return acc;
  }, [] as Array<{ name: Category; value: number }>);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-blue-600 font-bold">${payload[0].value.toFixed(2)}/mo</p>
          <p className="text-sm text-gray-600">
            {((payload[0].value / categoryData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (subscriptions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">Add subscriptions to see spending analytics</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryData.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {categoryData.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[item.name] }}
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-600">${item.value.toFixed(2)}/mo</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
