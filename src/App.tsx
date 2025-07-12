import React, { useState } from 'react';
import Header from './components/common/Header';
import Hero from './components/home/Hero';
import FeaturedItems from './components/home/FeaturedItems';
import Categories from './components/home/Categories';
import BrowseItems from './components/browse/BrowseItems';
import ItemDetails from './components/item/ItemDetails';
import Dashboard from './components/dashboard/Dashboard';
import './styles/design-system.css';

type Page = 'home' | 'browse' | 'item-details' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <FeaturedItems />
            <Categories />
          </>
        );
      case 'browse':
        return <BrowseItems />;
      case 'item-details':
        return <ItemDetails />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return (
          <>
            <Hero />
            <FeaturedItems />
            <Categories />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Navigation for Demo */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-[var(--color-gray-200)] p-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                currentPage === 'home'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-gray-100)] text-[var(--color-gray-700)] hover:bg-[var(--color-gray-200)]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('browse')}
              className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                currentPage === 'browse'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-gray-100)] text-[var(--color-gray-700)] hover:bg-[var(--color-gray-200)]'
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => setCurrentPage('item-details')}
              className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                currentPage === 'item-details'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-gray-100)] text-[var(--color-gray-700)] hover:bg-[var(--color-gray-200)]'
              }`}
            >
              Item
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                currentPage === 'dashboard'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-gray-100)] text-[var(--color-gray-700)] hover:bg-[var(--color-gray-200)]'
              }`}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>

      {renderPage()}
    </div>
  );
}

export default App;