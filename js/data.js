// Sample Data for SwapSoul

const sampleItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    brand: "Levi's",
    price: 45,
    size: "M",
    condition: "Excellent",
    category: "outerwear",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
    owner: {
      name: "Sarah M.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    featured: true,
    isFavorite: false
  },
  {
    id: 2,
    title: "Floral Summer Dress",
    brand: "Zara",
    price: 32,
    size: "S",
    condition: "Like New",
    category: "dresses",
    image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400",
    owner: {
      name: "Emma K.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    featured: true,
    isFavorite: true
  },
  {
    id: 3,
    title: "Wool Blend Sweater",
    brand: "H&M",
    price: 28,
    size: "L",
    condition: "Good",
    category: "tops",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
    owner: {
      name: "Alex R.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    featured: false,
    isFavorite: false
  },
  {
    id: 4,
    title: "High-Waisted Jeans",
    brand: "American Eagle",
    price: 38,
    size: "M",
    condition: "Excellent",
    category: "bottoms",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
    owner: {
      name: "Maya L.",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    featured: true,
    isFavorite: false
  },
  {
    id: 5,
    title: "Silk Blouse",
    brand: "Mango",
    price: 42,
    size: "S",
    condition: "Like New",
    category: "tops",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
    owner: {
      name: "Olivia T.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    featured: false,
    isFavorite: true
  },
  {
    id: 6,
    title: "Leather Ankle Boots",
    brand: "Dr. Martens",
    price: 65,
    size: "8",
    condition: "Good",
    category: "shoes",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
    owner: {
      name: "Jordan P.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    featured: true,
    isFavorite: false
  },
  {
    id: 7,
    title: "Cashmere Scarf",
    brand: "Uniqlo",
    price: 25,
    size: "One Size",
    condition: "Excellent",
    category: "accessories",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
    owner: {
      name: "Riley M.",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    featured: false,
    isFavorite: false
  },
  {
    id: 8,
    title: "Midi Skirt",
    brand: "COS",
    price: 35,
    size: "M",
    condition: "Like New",
    category: "bottoms",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
    owner: {
      name: "Casey W.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    featured: true,
    isFavorite: true
  }
];

const categories = [
  {
    id: 'tops',
    name: 'Tops',
    icon: '👕',
    count: 245,
    gradient: 'linear-gradient(135deg, #4A7C59 0%, #81B29A 100%)'
  },
  {
    id: 'bottoms',
    name: 'Bottoms',
    icon: '👖',
    count: 189,
    gradient: 'linear-gradient(135deg, #81B29A 0%, #4A7C59 100%)'
  },
  {
    id: 'dresses',
    name: 'Dresses',
    icon: '👗',
    count: 156,
    gradient: 'linear-gradient(135deg, #4A7C59 0%, #5A8C69 100%)'
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    icon: '🧥',
    count: 98,
    gradient: 'linear-gradient(135deg, #5A8C69 0%, #81B29A 100%)'
  },
  {
    id: 'shoes',
    name: 'Shoes',
    icon: '👠',
    count: 134,
    gradient: 'linear-gradient(135deg, #81B29A 0%, #91C2AA 100%)'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: '👜',
    count: 87,
    gradient: 'linear-gradient(135deg, #4A7C59 0%, #3A6C49 100%)'
  }
];

// Export data for use in other files
window.SwapSoulData = {
  items: sampleItems,
  categories: categories,
  
  // Helper functions
  getFeaturedItems: () => sampleItems.filter(item => item.featured),
  getItemsByCategory: (categoryId) => sampleItems.filter(item => item.category === categoryId),
  getItemById: (id) => sampleItems.find(item => item.id === parseInt(id)),
  
  // Filter and sort functions
  filterItems: (filters) => {
    let filteredItems = [...sampleItems];
    
    if (filters.categories && filters.categories.length > 0) {
      filteredItems = filteredItems.filter(item => 
        filters.categories.includes(item.category)
      );
    }
    
    if (filters.sizes && filters.sizes.length > 0) {
      filteredItems = filteredItems.filter(item => 
        filters.sizes.includes(item.size.toLowerCase())
      );
    }
    
    if (filters.conditions && filters.conditions.length > 0) {
      filteredItems = filteredItems.filter(item => 
        filters.conditions.includes(item.condition.toLowerCase().replace(' ', ''))
      );
    }
    
    return filteredItems;
  },
  
  sortItems: (items, sortBy) => {
    const sortedItems = [...items];
    
    switch (sortBy) {
      case 'price-low':
        return sortedItems.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sortedItems.sort((a, b) => b.price - a.price);
      case 'popular':
        return sortedItems.sort((a, b) => b.featured - a.featured);
      case 'newest':
      default:
        return sortedItems.reverse();
    }
  }
};