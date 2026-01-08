import React, { useState, useEffect } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { Category, BillingCycle, Subscription } from '../types/subscription';
import { X } from 'lucide-react';

interface AddSubscriptionFormProps {
  editingSubscription?: Subscription | null;
  onClose: () => void;
}

const AddSubscriptionForm: React.FC<AddSubscriptionFormProps> = ({ editingSubscription, onClose }) => {
  const { addSubscription, updateSubscription } = useSubscriptions();

  const [formData, setFormData] = useState({
    serviceName: '',
    amount: '',
    currency: 'USD',
    billingCycle: 'monthly' as BillingCycle,
    firstPaymentDate: '',
    category: 'Entertainment' as Category,
  });

  useEffect(() => {
    if (editingSubscription) {
      setFormData({
        serviceName: editingSubscription.serviceName,
        amount: editingSubscription.amount.toString(),
        currency: editingSubscription.currency,
        billingCycle: editingSubscription.billingCycle,
        firstPaymentDate: editingSubscription.firstPaymentDate,
        category: editingSubscription.category,
      });
    }
  }, [editingSubscription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subscriptionData = {
      serviceName: formData.serviceName,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      billingCycle: formData.billingCycle,
      firstPaymentDate: formData.firstPaymentDate,
      category: formData.category,
    };

    if (editingSubscription) {
      updateSubscription(editingSubscription.id, subscriptionData);
    } else {
      addSubscription(subscriptionData);
    }

    setFormData({
      serviceName: '',
      amount: '',
      currency: 'USD',
      billingCycle: 'monthly',
      firstPaymentDate: '',
      category: 'Entertainment',
    });
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingSubscription ? 'Edit Subscription' : 'Add New Subscription'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 mb-1">
              Service Name *
            </label>
            <input
              type="text"
              id="serviceName"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Netflix, Spotify, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount *
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="9.99"
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="billingCycle" className="block text-sm font-medium text-gray-700 mb-1">
              Billing Cycle *
            </label>
            <select
              id="billingCycle"
              name="billingCycle"
              value={formData.billingCycle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Software">Software</option>
              <option value="Food">Food</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="firstPaymentDate" className="block text-sm font-medium text-gray-700 mb-1">
              First Payment Date *
            </label>
            <input
              type="date"
              id="firstPaymentDate"
              name="firstPaymentDate"
              value={formData.firstPaymentDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {editingSubscription ? 'Update' : 'Add'} Subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscriptionForm;
