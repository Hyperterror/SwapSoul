// Component Functions for SwapSoul

// Create item card HTML
function createItemCard(item) {
  return `
    <div class="item-card" data-item-id="${item.id}">
      <div class="item-card-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        ${item.featured ? '<div class="item-card-badge">Featured</div>' : ''}
        <button class="item-card-favorite ${item.isFavorite ? 'active' : ''}" 
                aria-label="Add to favorites" 
                data-item-id="${item.id}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="${item.isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div class="item-card-content">
        <h3 class="item-card-title">${item.title}</h3>
        <p class="item-card-brand">${item.brand}</p>
        <div class="item-card-details">
          <span class="item-card-size">Size ${item.size}</span>
          <span class="item-card-condition">${item.condition}</span>
        </div>
        <div class="item-card-footer">
          <span class="item-card-price">$${item.price}</span>
          <div class="item-card-owner">
            <img src="${item.owner.avatar}" alt="${item.owner.name}" class="item-card-avatar">
            <span class="item-card-owner-name">${item.owner.name}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Create category card HTML
function createCategoryCard(category) {
  return `
    <div class="category-card" data-category="${category.id}">
      <div class="category-card-background" style="background: ${category.gradient}"></div>
      <div class="category-card-pattern"></div>
      <div class="category-card-content">
        <div class="category-card-icon">${category.icon}</div>
        <div>
          <h3 class="category-card-title">${category.name}</h3>
          <p class="category-card-count">${category.count} items</p>
        </div>
      </div>
    </div>
  `;
}

// Create skeleton loading card
function createSkeletonCard() {
  return `
    <div class="skeleton-card">
      <div class="skeleton-image skeleton"></div>
      <div class="skeleton-content">
        <div class="skeleton-title skeleton"></div>
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-text skeleton short"></div>
      </div>
    </div>
  `;
}

// Render featured items carousel
function renderFeaturedItems() {
  const featuredTrack = document.getElementById('featured-track');
  if (!featuredTrack) return;
  
  const featuredItems = window.SwapSoulData.getFeaturedItems();
  featuredTrack.innerHTML = featuredItems.map(createItemCard).join('');
  
  // Add click handlers for item cards
  featuredTrack.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.item-card-favorite')) {
        const itemId = card.dataset.itemId;
        // Navigate to item details (placeholder)
        console.log('Navigate to item:', itemId);
      }
    });
  });
  
  // Add favorite button handlers
  featuredTrack.querySelectorAll('.item-card-favorite').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(btn.dataset.itemId);
    });
  });
}

// Render categories grid
function renderCategories() {
  const categoriesGrid = document.getElementById('categories-grid');
  if (!categoriesGrid) return;
  
  categoriesGrid.innerHTML = window.SwapSoulData.categories.map(createCategoryCard).join('');
  
  // Add click handlers for category cards
  categoriesGrid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const categoryId = card.dataset.category;
      // Navigate to browse with category filter
      showPage('browse');
      filterByCategory(categoryId);
    });
  });
}

// Render items grid for browse page
function renderItemsGrid(items = null) {
  const itemsGrid = document.getElementById('items-grid');
  if (!itemsGrid) return;
  
  const itemsToRender = items || window.SwapSoulData.items;
  
  // Show loading state
  showLoadingState();
  
  // Simulate loading delay
  setTimeout(() => {
    itemsGrid.innerHTML = itemsToRender.map(createItemCard).join('');
    hideLoadingState();
    
    // Add click handlers
    itemsGrid.querySelectorAll('.item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.item-card-favorite')) {
          const itemId = card.dataset.itemId;
          console.log('Navigate to item:', itemId);
        }
      });
    });
    
    // Add favorite button handlers
    itemsGrid.querySelectorAll('.item-card-favorite').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.itemId);
      });
    });
    
    // Add animation
    itemsGrid.querySelectorAll('.item-card').forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add('fade-in');
    });
  }, 800);
}

// Show loading state
function showLoadingState() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.classList.add('active');
  }
}

// Hide loading state
function hideLoadingState() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.classList.remove('active');
  }
}

// Toggle favorite status
function toggleFavorite(itemId) {
  const item = window.SwapSoulData.getItemById(itemId);
  if (item) {
    item.isFavorite = !item.isFavorite;
    
    // Update all favorite buttons for this item
    document.querySelectorAll(`[data-item-id="${itemId}"].item-card-favorite`).forEach(btn => {
      btn.classList.toggle('active', item.isFavorite);
      const svg = btn.querySelector('svg path');
      if (svg) {
        svg.setAttribute('fill', item.isFavorite ? 'currentColor' : 'none');
      }
    });
    
    // Show feedback
    showToast(item.isFavorite ? 'Added to favorites' : 'Removed from favorites');
  }
}

// Filter by category
function filterByCategory(categoryId) {
  const categoryCheckbox = document.querySelector(`input[value="${categoryId}"]`);
  if (categoryCheckbox) {
    categoryCheckbox.checked = true;
    applyFilters();
  }
}

// Apply filters and sorting
function applyFilters() {
  const filters = {
    categories: Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
      .map(cb => cb.value)
      .filter(value => ['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories'].includes(value)),
    sizes: Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
      .map(cb => cb.value)
      .filter(value => ['xs', 's', 'm', 'l', 'xl'].includes(value)),
    conditions: Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
      .map(cb => cb.value)
      .filter(value => ['new', 'excellent', 'good'].includes(value))
  };
  
  const sortBy = document.querySelector('.sort-select')?.value || 'newest';
  
  let filteredItems = window.SwapSoulData.filterItems(filters);
  filteredItems = window.SwapSoulData.sortItems(filteredItems, sortBy);
  
  renderItemsGrid(filteredItems);
}

// Show toast notification
function showToast(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--color-primary);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    transform: translateY(100px);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
  }, 100);
  
  // Remove after delay
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Animate counter numbers
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    
    updateCounter();
  });
}

// Carousel functionality
function initializeCarousel() {
  const track = document.getElementById('featured-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (!track || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  const itemWidth = 320; // Card width + gap
  const visibleItems = Math.floor(track.parentElement.offsetWidth / itemWidth);
  const maxIndex = Math.max(0, track.children.length - visibleItems);
  
  const updateCarousel = () => {
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  };
  
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });
  
  // Initialize
  updateCarousel();
  
  // Handle resize
  window.addEventListener('resize', () => {
    const newVisibleItems = Math.floor(track.parentElement.offsetWidth / itemWidth);
    const newMaxIndex = Math.max(0, track.children.length - newVisibleItems);
    if (currentIndex > newMaxIndex) {
      currentIndex = newMaxIndex;
    }
    updateCarousel();
  });
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedItems();
  renderCategories();
  
  // Initialize carousel after items are rendered
  setTimeout(initializeCarousel, 100);
  
  // Animate counters when hero section is visible
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(heroSection);
  }
});
