import React, { useState, useEffect } from 'react';
import { Filter, Grid, List, SortAsc, Search } from 'lucide-react';
import ItemCard from '../common/ItemCard';

const BrowseItems: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    condition: '',
    location: '',
    priceRange: ''
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Sample items data
  const [items] = useState([
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      brand: 'Levi\'s',
      size: 'M',
      condition: 'Like New',
      location: 'Brooklyn, NY',
      postedDate: '2024-01-15',
      images: ['https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg'],
      user: { name: 'Sarah M.', rating: 4.8 }
    },
    {
      id: '2',
      title: 'Wool Blend Coat',
      brand: 'Zara',
      size: 'L',
      condition: 'Good',
      location: 'Manhattan, NY',
      postedDate: '2024-01-14',
      images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
      user: { name: 'Emma K.', rating: 4.9 }
    },
    {
      id: '3',
      title: 'Summer Floral Dress',
      brand: 'H&M',
      size: 'S',
      condition: 'Like New',
      location: 'Queens, NY',
      postedDate: '2024-01-13',
      images: ['https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg'],
      user: { name: 'Maya L.', rating: 4.7 }
    },
    {
      id: '4',
      title: 'Leather Ankle Boots',
      brand: 'Doc Martens',
      size: '8',
      condition: 'Good',
      location: 'Bronx, NY',
      postedDate: '2024-01-12',
      images: ['https://images.pexels.com/photos/1464207/pexels-photo-1464207.jpeg'],
      user: { name: 'Alex R.', rating: 4.6 }
    },
    {
      id: '5',
      title: 'Cashmere Sweater',
      brand: 'Uniqlo',
      size: 'M',
      condition: 'Like New',
      location: 'Staten Island, NY',
      postedDate: '2024-01-11',
      images: ['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'],
      user: { name: 'Jordan P.', rating: 4.9 }
    },
    {
      id: '6',
      title: 'Silk Blouse',
      brand: 'COS',
      size: 'S',
      condition: 'Like New',
      location: 'Manhattan, NY',
      postedDate: '2024-01-10',
      images: ['https://images.pexels.com/photos/1557654/pexels-photo-1557654.jpeg'],
      user: { name: 'Taylor C.', rating: 4.8 }
    }
  ]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        if (!loading && hasMore) {
          setLoading(true);
          // Simulate API call
          setTimeout(() => {
            setLoading(false);
            // For demo, stop after "loading" more items
            setHasMore(false);
          }, 1000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const FilterSidebar = () => (
    <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-white p-6 rounded-xl shadow-sm border border-[var(--color-gray-200)]`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="heading-5 text-[var(--color-gray-900)]">Filters</h3>
        <button 
          onClick={() => setShowFilters(false)}
          className="lg:hidden text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)]"
        >
          ×
        </button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="block body-sm font-medium text-[var(--color-gray-700)] mb-3">
            Category
          </label>
          <select 
            className="form-input"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="">All Categories</option>
            <option value="tops">Tops & Blouses</option>
            <option value="dresses">Dresses</option>
            <option value="outerwear">Outerwear</option>
            <option value="bottoms">Pants & Jeans</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>

        {/* Size Filter */}
        <div>
          <label className="block body-sm font-medium text-[var(--color-gray-700)] mb-3">
            Size
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                className={`py-2 px-3 text-sm border rounded-lg transition-colors duration-200 ${
                  filters.size === size
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                    : 'bg-white text-[var(--color-gray-700)] border-[var(--color-gray-300)] hover:border-[var(--color-primary)]'
                }`}
                onClick={() => setFilters({...filters, size: filters.size === size ? '' : size})}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Condition Filter */}
        <div>
          <label className="block body-sm font-medium text-[var(--color-gray-700)] mb-3">
            Condition
          </label>
          <div className="space-y-2">
            {['Like New', 'Good', 'Fair'].map((condition) => (
              <label key={condition} className="flex items-center">
                <input
                  type="radio"
                  name="condition"
                  value={condition}
                  checked={filters.condition === condition}
                  onChange={(e) => setFilters({...filters, condition: e.target.value})}
                  className="mr-3 text-[var(--color-primary)]"
                />
                <span className="body-sm text-[var(--color-gray-700)]">{condition}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block body-sm font-medium text-[var(--color-gray-700)] mb-3">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter city or zip code"
              className="form-input pl-10"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-gray-400)]" />
          </div>
        </div>

        {/* Clear Filters */}
        <button 
          className="w-full btn-base btn-outline py-2"
          onClick={() => setFilters({category: '', size: '', condition: '', location: '', priceRange: ''})}
        >
          Clear All Filters
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[var(--color-gray-50)] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-2 text-[var(--color-gray-900)] mb-4">
            Browse Items
          </h1>
          <p className="body-lg text-[var(--color-gray-600)]">
            Discover amazing preloved fashion from our community
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex items-center gap-4 flex-1">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-base btn-outline px-4 py-2"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>

            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="search"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-2 border border-[var(--color-gray-200)] rounded-lg focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-gray-400)]" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input py-2 min-w-32"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Most Popular</option>
              <option value="distance">Distance</option>
            </select>

            {/* View Mode */}
            <div className="flex rounded-lg border border-[var(--color-gray-200)] overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-gray-600)]'}`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--color-gray-600)]'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          <FilterSidebar />

          {/* Items Grid */}
          <main className="flex-1">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                : 'grid-cols-1'
            }`}>
              {items.map((item) => (
                <ItemCard 
                  key={item.id}
                  item={item}
                  onClick={() => console.log('Navigate to item:', item.id)}
                  className={viewMode === 'list' ? 'flex-row' : ''}
                />
              ))}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                    <div className="aspect-[4/5] skeleton"></div>
                    <div className="p-4 space-y-3">
                      <div className="skeleton h-4 w-3/4"></div>
                      <div className="skeleton h-3 w-1/2"></div>
                      <div className="skeleton h-3 w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No More Items */}
            {!hasMore && !loading && (
              <div className="text-center py-12">
                <p className="body-base text-[var(--color-gray-600)]">
                  You've seen all items. Check back later for more!
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BrowseItems;