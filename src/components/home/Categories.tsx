import React from 'react';
import { ArrowRight } from 'lucide-react';

const Categories: React.FC = () => {
  const categories = [
    {
      id: 'tops',
      name: 'Tops & Blouses',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
      count: 1240,
      featured: true
    },
    {
      id: 'dresses',
      name: 'Dresses',
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
      count: 856,
      featured: true
    },
    {
      id: 'outerwear',
      name: 'Outerwear',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      count: 642,
      featured: true
    },
    {
      id: 'bottoms',
      name: 'Pants & Jeans',
      image: 'https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg',
      count: 923,
      featured: false
    },
    {
      id: 'shoes',
      name: 'Shoes',
      image: 'https://images.pexels.com/photos/1464207/pexels-photo-1464207.jpeg',
      count: 567,
      featured: false
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: 'https://images.pexels.com/photos/1557654/pexels-photo-1557654.jpeg',
      count: 789,
      featured: false
    },
    {
      id: 'bags',
      name: 'Bags & Purses',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
      count: 445,
      featured: false
    },
    {
      id: 'activewear',
      name: 'Activewear',
      image: 'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg',
      count: 334,
      featured: false
    },
    {
      id: 'formal',
      name: 'Formal Wear',
      image: 'https://images.pexels.com/photos/1375849/pexels-photo-1375849.jpeg',
      count: 289,
      featured: false
    }
  ];

  const CategoryCard: React.FC<{ category: typeof categories[0], size?: 'large' | 'medium' | 'small' }> = ({ 
    category, 
    size = 'medium' 
  }) => {
    const sizeClasses = {
      large: 'col-span-2 row-span-2 h-80',
      medium: 'col-span-1 row-span-1 h-36',
      small: 'col-span-1 row-span-1 h-36'
    };

    const textSizeClasses = {
      large: 'heading-4',
      medium: 'heading-5',
      small: 'body-base font-semibold'
    };

    return (
      <article 
        className={`relative group overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${sizeClasses[size]}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            console.log('Navigate to category:', category.id);
          }
        }}
        aria-label={`Browse ${category.name} - ${category.count} items`}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-4 lg:p-6">
          <div className="text-white">
            <h3 className={`${textSizeClasses[size]} mb-2 text-white`}>
              {category.name}
            </h3>
            <p className="body-sm opacity-90 mb-3">
              {category.count.toLocaleString()} items
            </p>
            
            {/* Explore Button */}
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="body-sm font-medium">Explore</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>

          {/* Featured Badge */}
          {category.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 bg-[var(--color-accent)] text-white text-xs font-medium rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[var(--color-primary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </article>
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-[var(--color-gray-50)]" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-[var(--color-gray-900)]">
            Shop by Category
          </h2>
          <p className="body-lg text-[var(--color-gray-600)] max-w-2xl mx-auto">
            Find exactly what you're looking for. Browse through our carefully organized categories 
            to discover amazing preloved fashion pieces.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
          {/* Featured Categories - Larger */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <CategoryCard category={categories[0]} size="large" />
          </div>
          
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <CategoryCard category={categories[1]} size="large" />
          </div>

          <div className="col-span-2 md:col-span-2 lg:col-span-2 row-span-2">
            <CategoryCard category={categories[2]} size="large" />
          </div>

          {/* Regular Categories */}
          {categories.slice(3).map((category) => (
            <div key={category.id} className="col-span-1 md:col-span-1 lg:col-span-1">
              <CategoryCard category={category} size="small" />
            </div>
          ))}
        </div>

        {/* Browse All Button */}
        <div className="text-center mt-12">
          <button className="btn-base btn-primary px-8 py-3">
            Browse All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;