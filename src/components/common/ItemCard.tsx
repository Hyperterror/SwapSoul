import React, { useState } from 'react';
import { Heart, MapPin, Calendar, User } from 'lucide-react';

interface ItemCardProps {
  item: {
    id: string;
    title: string;
    brand: string;
    size: string;
    condition: string;
    location: string;
    postedDate: string;
    images: string[];
    user: {
      name: string;
      avatar?: string;
      rating: number;
    };
    isFavorited?: boolean;
  };
  onClick?: () => void;
  className?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick, className = '' }) => {
  const [isFavorited, setIsFavorited] = useState(item.isFavorited || false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <article 
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
      aria-label={`View details for ${item.title} by ${item.brand}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-gray-100)]">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton rounded-t-xl"></div>
        )}
        <img
          src={item.images[0]}
          alt={`${item.title} by ${item.brand}`}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isFavorited 
              ? 'bg-[var(--color-error)] text-white' 
              : 'bg-white/80 text-[var(--color-gray-600)] hover:bg-white hover:text-[var(--color-error)]'
          } backdrop-blur-sm shadow-sm hover:scale-110`}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.condition === 'Like New' 
              ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]'
              : item.condition === 'Good'
              ? 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]'
              : 'bg-[var(--color-gray-200)] text-[var(--color-gray-700)]'
          }`}>
            {item.condition}
          </span>
        </div>

        {/* Image Count Indicator */}
        {item.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
            1/{item.images.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Brand */}
        <div className="mb-3">
          <h3 className="body-base font-semibold text-[var(--color-gray-900)] mb-1 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
            {item.title}
          </h3>
          <p className="body-sm text-[var(--color-gray-600)] font-medium">
            {item.brand}
          </p>
        </div>

        {/* Size */}
        <div className="mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-[var(--color-secondary)] text-[var(--color-primary)] text-xs font-medium">
            Size {item.size}
          </span>
        </div>

        {/* Location and Date */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-[var(--color-gray-500)] body-sm">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center text-[var(--color-gray-500)] body-sm">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{formatDate(item.postedDate)}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-gray-100)]">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center">
              {item.user.avatar ? (
                <img 
                  src={item.user.avatar} 
                  alt={item.user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="body-sm text-[var(--color-gray-600)] truncate">
              {item.user.name}
            </span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i}
                  className={`text-xs ${
                    i < Math.floor(item.user.rating) 
                      ? 'text-[var(--color-warning)]' 
                      : 'text-[var(--color-gray-300)]'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="body-sm text-[var(--color-gray-500)]">
              {item.user.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ItemCard;