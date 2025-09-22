import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  FileText, 
  BookOpen, 
  TrendingUp,
  Clock,
  Users,
  Brain,
  ArrowRight
} from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import { useResearch } from '../context/ResearchContext';
import { useBilling } from '../context/BillingContext';

const Dashboard: React.FC = () => {
  const { documents } = useDocuments();
  const { reports } = useResearch();
  const { credits, usage } = useBilling();

  const stats = [
    {
      name: 'Documents Uploaded',
      value: documents.length,
      icon: FileText,
      change: '+12%',
      changeType: 'increase' as const,
    },
    {
      name: 'Reports Generated',
      value: reports.length,
      icon: BookOpen,
      change: '+8%',
      changeType: 'increase' as const,
    },
    {
      name: 'Credits Remaining',
      value: credits,
      icon: Brain,
      change: '-5%',
      changeType: 'decrease' as const,
    },
    {
      name: 'Research Queries',
      value: usage.totalQueries,
      icon: Search,
      change: '+18%',
      changeType: 'increase' as const,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'research',
      title: 'Market Analysis Report on AI Trends',
      time: '2 hours ago',
      icon: Search,
    },
    {
      id: 2,
      type: 'document',
      title: 'Uploaded: Industry_Research_2024.pdf',
      time: '4 hours ago',
      icon: FileText,
    },
    {
      id: 3,
      type: 'report',
      title: 'Generated: Competitive Analysis Report',
      time: '1 day ago',
      icon: BookOpen,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back to Research Assistant</h1>
            <p className="text-blue-100 text-lg">
              Your AI-powered research companion for comprehensive analysis and report generation
            </p>
          </div>
          <div className="hidden lg:block">
            <Brain className="h-20 w-20 text-blue-200 opacity-50" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="bg-white overflow-hidden rounded-lg border border-gray-200">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {item.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/research"
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
              >
                <div className="flex items-center">
                  <Search className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium text-blue-900">Start Research</span>
                </div>
                <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/documents"
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium text-green-900">Upload Documents</span>
                </div>
                <ArrowRight className="h-4 w-4 text-green-600 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/reports"
                className="flex items-center justify-between p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group"
              >
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="font-medium text-orange-900">View Reports</span>
                </div>
                <ArrowRight className="h-4 w-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
              <Link to="/reports" className="text-sm text-blue-600 hover:text-blue-500">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex-shrink-0">
                      <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;