import React from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { Subscription } from '../types/subscription';
import { Edit, Trash2, Calendar } from 'lucide-react';

interface SubscriptionListProps {
  onEdit: (subscription: Subscription) => void;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ onEdit }) => {
  const { subscriptions, deleteSubscription } = useSubscriptions();

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Entertainment: 'bg-purple-100 text-purple-800',
      Utilities: 'bg-yellow-100 text-yellow-800',
      Software: 'bg-blue-100 text-blue-800',
      Food: 'bg-green-100 text-green-800',
      Health: 'bg-red-100 text-red-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.Other;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleDelete = (id: string, serviceName: string) => {
    if (window.confirm(`Are you sure you want to delete ${serviceName}?`)) {
      deleteSubscription(id);
    }
  };

  if (subscriptions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">No subscriptions yet. Add your first one to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Your Subscriptions</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {subscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {subscription.serviceName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(subscription.category)}`}>
                    {subscription.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(subscription.firstPaymentDate)}
                  </span>
                  <span className="capitalize">{subscription.billingCycle}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ${subscription.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {subscription.currency} / {subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(subscription)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(subscription.id, subscription.serviceName)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionList;
