import React from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  Download,
  Plus,
  DollarSign,
  BarChart3,
  Clock
} from 'lucide-react';
import { useBilling } from '../context/BillingContext';

const Billing: React.FC = () => {
  const { credits, usage, billingHistory, addCredits } = useBilling();

  const pricingPlans = [
    {
      name: 'Starter',
      credits: 100,
      price: 19,
      description: 'Perfect for individual researchers',
      features: ['100 research credits', 'Document upload', 'Basic reports', 'Email support']
    },
    {
      name: 'Professional',
      credits: 500,
      price: 79,
      description: 'Ideal for professionals and teams',
      features: ['500 research credits', 'Unlimited documents', 'Advanced reports', 'Priority support'],
      popular: true
    },
    {
      name: 'Enterprise',
      credits: 2000,
      price: 299,
      description: 'For large organizations',
      features: ['2000 research credits', 'Custom integrations', 'White-label reports', 'Dedicated support']
    }
  ];

  const usageStats = [
    {
      name: 'Research Queries',
      value: usage.totalQueries,
      change: '+12%',
      icon: BarChart3,
    },
    {
      name: 'Reports Generated',
      value: usage.totalReports,
      change: '+8%',
      icon: Download,
    },
    {
      name: 'Credits Used This Month',
      value: usage.creditsUsedThisMonth,
      change: '+15%',
      icon: CreditCard,
    },
    {
      name: 'Avg. Response Time',
      value: '2.4s',
      change: '-5%',
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Usage</h1>
        <p className="text-lg text-gray-600">
          Manage your credits, view usage analytics, and upgrade your plan
        </p>
      </div>

      {/* Credits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Available Credits</p>
              <p className="text-3xl font-bold">{credits}</p>
            </div>
            <CreditCard className="h-10 w-10 text-blue-200" />
          </div>
          <div className="mt-4">
            <button
              onClick={() => addCredits(100)}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              <Plus className="h-4 w-4 inline mr-2" />
              Buy More Credits
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">This Month's Usage</p>
              <p className="text-3xl font-bold text-gray-900">{usage.creditsUsedThisMonth}</p>
            </div>
            <TrendingUp className="h-10 w-10 text-green-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Budget: 200 credits</span>
              <span>{Math.round((usage.creditsUsedThisMonth / 200) * 100)}%</span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${Math.min((usage.creditsUsedThisMonth / 200) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Monthly Spend</p>
              <p className="text-3xl font-bold text-gray-900">${usage.monthlySpend}</p>
            </div>
            <DollarSign className="h-10 w-10 text-purple-500" />
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Avg. cost per research: $1.25
            </p>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Usage Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {usageStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-3">
                  <Icon className="h-6 w-6 text-gray-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                <p className={`text-xs font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Credit Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect credit package for your research needs. All plans include unlimited document uploads and report exports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={`relative rounded-xl border-2 p-6 ${
              plan.popular 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white'
            }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                </div>
                <p className="text-gray-600">{plan.credits} research credits</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => addCredits(plan.credits)}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Purchase Package
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Billing History</h2>
          <button className="flex items-center text-blue-600 hover:text-blue-500 font-medium">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {billingHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    +{item.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;