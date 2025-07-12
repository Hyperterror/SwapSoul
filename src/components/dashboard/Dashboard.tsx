import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MessageCircle, 
  Settings, 
  Plus,
  Bell,
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'my-items', label: 'My Items', icon: Package },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Items Listed', value: '12', change: '+2 this week', color: 'primary' },
    { label: 'Items Swapped', value: '8', change: '+1 this month', color: 'success' },
    { label: 'Favorites', value: '24', change: '+5 this week', color: 'accent' },
    { label: 'Messages', value: '6', change: '2 unread', color: 'warning' },
  ];

  const recentItems = [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      image: 'https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg',
      status: 'active',
      views: 23,
      favorites: 5
    },
    {
      id: '2',
      title: 'Summer Floral Dress',
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
      status: 'swapped',
      views: 41,
      favorites: 8
    },
    {
      id: '3',
      title: 'Wool Blend Coat',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      status: 'pending',
      views: 12,
      favorites: 3
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'swap_completed',
      message: 'Successfully swapped "Summer Dress" with Maya L.',
      time: '2 hours ago',
      icon: '🔄'
    },
    {
      id: '2',
      type: 'new_favorite',
      message: 'Someone favorited your "Vintage Jacket"',
      time: '5 hours ago',
      icon: '❤️'
    },
    {
      id: '3',
      type: 'message_received',
      message: 'New message from Alex R. about your coat',
      time: '1 day ago',
      icon: '💬'
    },
    {
      id: '4',
      type: 'item_viewed',
      message: 'Your "Denim Jacket" was viewed 5 times today',
      time: '1 day ago',
      icon: '👀'
    }
  ];

  const OverviewContent = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-gray-200)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="body-sm font-medium text-[var(--color-gray-600)]">{stat.label}</h3>
            </div>
            <div className="space-y-2">
              <p className="heading-3 text-[var(--color-gray-900)]">{stat.value}</p>
              <p className="body-sm text-[var(--color-success)]">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-gray-200)]">
        <h3 className="heading-4 text-[var(--color-gray-900)] mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-[var(--color-primary)]/5 rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors duration-200">
            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="body-base font-medium text-[var(--color-gray-900)]">List New Item</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-[var(--color-accent)]/5 rounded-lg hover:bg-[var(--color-accent)]/10 transition-colors duration-200">
            <div className="w-10 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="body-base font-medium text-[var(--color-gray-900)]">View Messages</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-[var(--color-success)]/5 rounded-lg hover:bg-[var(--color-success)]/10 transition-colors duration-200">
            <div className="w-10 h-10 bg-[var(--color-success)] rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="body-base font-medium text-[var(--color-gray-900)]">Browse Favorites</span>
          </button>
        </div>
      </div>

      {/* Recent Items and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Items */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-gray-200)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="heading-4 text-[var(--color-gray-900)]">Recent Items</h3>
            <button className="body-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-[var(--color-gray-50)] transition-colors duration-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <h4 className="body-base font-medium text-[var(--color-gray-900)]">{item.title}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'active' ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]' :
                      item.status === 'swapped' ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' :
                      'bg-[var(--color-warning)]/20 text-[var(--color-warning)]'
                    }`}>
                      {item.status}
                    </span>
                    <span className="body-sm text-[var(--color-gray-600)]">{item.views} views</span>
                    <span className="body-sm text-[var(--color-gray-600)]">{item.favorites} ❤️</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-gray-200)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="heading-4 text-[var(--color-gray-900)]">Recent Activity</h3>
            <button className="body-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[var(--color-gray-50)] transition-colors duration-200">
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="body-sm text-[var(--color-gray-900)]">{activity.message}</p>
                  <p className="body-sm text-[var(--color-gray-500)] mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const TabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'my-items':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--color-gray-200)] text-center">
            <Package className="w-16 h-16 text-[var(--color-gray-400)] mx-auto mb-4" />
            <h3 className="heading-4 text-[var(--color-gray-900)] mb-2">My Items</h3>
            <p className="body-base text-[var(--color-gray-600)]">Manage your listed items and track their performance.</p>
          </div>
        );
      case 'favorites':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--color-gray-200)] text-center">
            <Heart className="w-16 h-16 text-[var(--color-gray-400)] mx-auto mb-4" />
            <h3 className="heading-4 text-[var(--color-gray-900)] mb-2">Favorites</h3>
            <p className="body-base text-[var(--color-gray-600)]">View all your favorited items from the community.</p>
          </div>
        );
      case 'messages':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--color-gray-200)] text-center">
            <MessageCircle className="w-16 h-16 text-[var(--color-gray-400)] mx-auto mb-4" />
            <h3 className="heading-4 text-[var(--color-gray-900)] mb-2">Messages</h3>
            <p className="body-base text-[var(--color-gray-600)]">Connect with other community members about swaps.</p>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--color-gray-200)] text-center">
            <User className="w-16 h-16 text-[var(--color-gray-400)] mx-auto mb-4" />
            <h3 className="heading-4 text-[var(--color-gray-900)] mb-2">Profile</h3>
            <p className="body-base text-[var(--color-gray-600)]">Manage your profile information and preferences.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--color-gray-200)] text-center">
            <Settings className="w-16 h-16 text-[var(--color-gray-400)] mx-auto mb-4" />
            <h3 className="heading-4 text-[var(--color-gray-900)] mb-2">Settings</h3>
            <p className="body-base text-[var(--color-gray-600)]">Customize your account settings and preferences.</p>
          </div>
        );
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-[var(--color-gray-200)] overflow-hidden">
              <div className="p-6 border-b border-[var(--color-gray-200)]">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg"
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="body-base font-semibold text-[var(--color-gray-900)]">Sarah Martinez</h3>
                    <p className="body-sm text-[var(--color-gray-600)]">Brooklyn, NY</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        activeTab === item.id
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="body-base">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="heading-2 text-[var(--color-gray-900)] mb-2">
                {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="body-lg text-[var(--color-gray-600)]">
                Welcome back! Here's what's happening with your account.
              </p>
            </div>

            <TabContent />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;