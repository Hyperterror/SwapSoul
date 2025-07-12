import React, { useState } from 'react';
import { Heart, Share2, Flag, MapPin, Calendar, Tag, User, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const ItemDetails: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // Sample item data
  const item = {
    id: '1',
    title: 'Vintage Denim Jacket',
    brand: 'Levi\'s',
    size: 'M',
    condition: 'Like New',
    location: 'Brooklyn, NY',
    postedDate: '2024-01-15',
    description: 'Beautiful vintage Levi\'s denim jacket in excellent condition. This classic piece has been well-maintained and shows minimal signs of wear. Perfect for layering and adding a timeless touch to any outfit. The fit is true to size and the quality is outstanding.',
    measurements: {
      chest: '42 inches',
      length: '24 inches',
      sleeves: '25 inches'
    },
    material: '100% Cotton Denim',
    careInstructions: 'Machine wash cold, tumble dry low',
    tags: ['vintage', 'denim', 'classic', 'unisex'],
    images: [
      'https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
      'https://images.pexels.com/photos/1464207/pexels-photo-1464207.jpeg'
    ],
    user: {
      name: 'Sarah Martinez',
      avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
      rating: 4.8,
      reviewCount: 23,
      joinDate: '2023-06-15',
      location: 'Brooklyn, NY',
      bio: 'Fashion enthusiast with a passion for sustainable clothing. I love finding unique pieces and giving them new life!'
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li><a href="#" className="text-[var(--color-gray-600)] hover:text-[var(--color-primary)]">Home</a></li>
            <li><span className="text-[var(--color-gray-400)]">/</span></li>
            <li><a href="#" className="text-[var(--color-gray-600)] hover:text-[var(--color-primary)]">Browse</a></li>
            <li><span className="text-[var(--color-gray-400)]">/</span></li>
            <li><span className="text-[var(--color-gray-900)]">{item.title}</span></li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-gray-100)]">
              <img
                src={item.images[currentImageIndex]}
                alt={`${item.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-[var(--color-gray-700)] hover:bg-white transition-all duration-200"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-[var(--color-gray-700)] hover:bg-white transition-all duration-200"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {currentImageIndex + 1} / {item.images.length}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'border-[var(--color-primary)]' 
                      : 'border-transparent hover:border-[var(--color-gray-300)]'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${item.title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="heading-2 text-[var(--color-gray-900)] mb-2">
                    {item.title}
                  </h1>
                  <p className="heading-5 text-[var(--color-primary)] mb-4">
                    {item.brand}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      isFavorited 
                        ? 'bg-[var(--color-error)] text-white' 
                        : 'bg-[var(--color-gray-100)] text-[var(--color-gray-600)] hover:bg-[var(--color-error)] hover:text-white'
                    }`}
                    aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    className="p-3 rounded-full bg-[var(--color-gray-100)] text-[var(--color-gray-600)] hover:bg-[var(--color-gray-200)] transition-colors duration-200"
                    aria-label="Share item"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  
                  <button
                    className="p-3 rounded-full bg-[var(--color-gray-100)] text-[var(--color-gray-600)] hover:bg-[var(--color-gray-200)] transition-colors duration-200"
                    aria-label="Report item"
                  >
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-[var(--color-gray-500)]" />
                  <span className="body-sm text-[var(--color-gray-700)]">Size: {item.size}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${
                    item.condition === 'Like New' ? 'bg-[var(--color-success)]' : 'bg-[var(--color-warning)]'
                  }`}></span>
                  <span className="body-sm text-[var(--color-gray-700)]">{item.condition}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[var(--color-gray-500)]" />
                  <span className="body-sm text-[var(--color-gray-700)]">{item.location}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[var(--color-gray-500)]" />
                  <span className="body-sm text-[var(--color-gray-700)]">Posted 5 days ago</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="heading-5 text-[var(--color-gray-900)] mb-3">Description</h3>
              <p className="body-base text-[var(--color-gray-700)] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="body-base font-semibold text-[var(--color-gray-900)] mb-3">Measurements</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="body-sm text-[var(--color-gray-600)]">Chest:</dt>
                    <dd className="body-sm text-[var(--color-gray-900)]">{item.measurements.chest}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="body-sm text-[var(--color-gray-600)]">Length:</dt>
                    <dd className="body-sm text-[var(--color-gray-900)]">{item.measurements.length}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="body-sm text-[var(--color-gray-600)]">Sleeves:</dt>
                    <dd className="body-sm text-[var(--color-gray-900)]">{item.measurements.sleeves}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h4 className="body-base font-semibold text-[var(--color-gray-900)] mb-3">Care & Material</h4>
                <div className="space-y-2">
                  <p className="body-sm text-[var(--color-gray-700)]">
                    <span className="text-[var(--color-gray-600)]">Material:</span> {item.material}
                  </p>
                  <p className="body-sm text-[var(--color-gray-700)]">
                    <span className="text-[var(--color-gray-600)]">Care:</span> {item.careInstructions}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="body-base font-semibold text-[var(--color-gray-900)] mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-[var(--color-secondary)] text-[var(--color-primary)] text-sm rounded-full hover:bg-[var(--color-secondary-dark)] transition-colors duration-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[var(--color-gray-200)]">
              <button className="flex-1 btn-base btn-primary py-4">
                Start Conversation
              </button>
              <button className="flex-1 btn-base btn-outline py-4">
                Propose Swap
              </button>
            </div>

            {/* User Info */}
            <div className="bg-[var(--color-gray-50)] rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="heading-5 text-[var(--color-gray-900)]">
                      {item.user.name}
                    </h4>
                    
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-[var(--color-warning)] fill-current" />
                      <span className="body-sm font-medium text-[var(--color-gray-900)]">
                        {item.user.rating}
                      </span>
                      <span className="body-sm text-[var(--color-gray-600)]">
                        ({item.user.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3 text-sm text-[var(--color-gray-600)]">
                    <span>📍 {item.user.location}</span>
                    <span>📅 Joined June 2023</span>
                  </div>
                  
                  <p className="body-sm text-[var(--color-gray-700)] mb-4">
                    {item.user.bio}
                  </p>
                  
                  <button className="btn-base btn-outline py-2 px-4">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;