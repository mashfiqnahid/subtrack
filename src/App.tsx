import { useState } from 'react';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Dashboard from './components/Dashboard';
import AddSubscriptionForm from './components/AddSubscriptionForm';
import SubscriptionList from './components/SubscriptionList';
import Analytics from './components/Analytics';
import { Plus, CreditCard } from 'lucide-react';
import { Subscription } from './types/subscription';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSubscription(null);
  };

  return (
    <SubscriptionProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-3 rounded-xl">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">SubTrack</h1>
                  <p className="text-sm text-gray-600">Manage your subscriptions effortlessly</p>
                </div>
              </div>
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Subscription
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Cards */}
          <Dashboard />

          {/* Analytics */}
          <div className="mb-8">
            <Analytics />
          </div>

          {/* Subscription List */}
          <SubscriptionList onEdit={handleEdit} />
        </main>

        {/* Add/Edit Subscription Modal */}
        {isFormOpen && (
          <AddSubscriptionForm
            editingSubscription={editingSubscription}
            onClose={handleCloseForm}
          />
        )}

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-600 text-sm">
              Built with React, TypeScript, and Tailwind CSS • SubTrack © 2026
            </p>
          </div>
        </footer>
      </div>
    </SubscriptionProvider>
  );
}

export default App;
