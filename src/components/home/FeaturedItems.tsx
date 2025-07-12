import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ItemCard from '../common/ItemCard';

const FeaturedItems: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sample featured items
  const featuredItems = [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      brand: 'Levi\'s',
      size: 'M',
      condition: 'Like New',
      location: 'Brooklyn, NY',
      postedDate: '2024-01-15',
      images: ['https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg'],
      user: {
        name: 'Sarah M.',
        rating: 4.8
      }
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
      user: {
        name: 'Emma K.',
        rating: 4.9
      }
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
      user: {
        name: 'Maya L.',
        rating: 4.7
      }
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
      user: {
        name: 'Alex R.',
        rating: 4.6
      }
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
      user: {
        name: 'Jordan P.',
        rating: 4.9
      }
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
      user: {
        name: 'Taylor C.',
        rating: 4.8
      }
    }
  ];

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4
  };

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return itemsPerView.desktop;
    if (window.innerWidth < 768) return itemsPerView.mobile;
    if (window.innerWidth < 1024) return itemsPerView.tablet;
    return itemsPerView.desktop;
  };

  const [itemsPerViewCurrent, setItemsPerViewCurrent] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerViewCurrent(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlide = Math.max(0, featuredItems.length - itemsPerViewCurrent);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxSlide]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-[var(--color-gray-900)]">
            Featured Items
          </h2>
          <p className="body-lg text-[var(--color-gray-600)] max-w-2xl mx-auto">
            Discover amazing pieces from our community. These items are trending and highly rated by our members.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[var(--color-gray-600)] hover:text-[var(--color-primary)] hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSlide === 0}
            aria-label="Previous items"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-[var(--color-gray-600)] hover:text-[var(--color-primary)] hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSlide === maxSlide}
            aria-label="Next items"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Items Container */}
          <div className="overflow-hidden" ref={scrollContainerRef}>
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * (100 / itemsPerViewCurrent)}%)`,
                width: `${(featuredItems.length / itemsPerViewCurrent) * 100}%`
              }}
            >
              {featuredItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / featuredItems.length}%` }}
                >
                  <ItemCard 
                    item={item}
                    onClick={() => console.log('Navigate to item:', item.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-[var(--color-primary)] w-6' 
                    : 'bg-[var(--color-gray-300)] hover:bg-[var(--color-gray-400)]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-base btn-outline px-8 py-3">
            View All Items
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;