// Main application logic

class SwapSoulApp {
  constructor() {
    this.currentPage = 'home';
    this.currentFilters = {
      categories: [],
      sizes: [],
      conditions: []
    };
    this.currentSort = 'newest';
    
    this.initializeApp();
  }

  initializeApp() {
    this.initializeNavigation();
    this.initializeHeader();
    this.initializeBrowsePage();
    this.initializeSearch();
    this.handleInitialLoad();
  }

  initializeNavigation() {
    // Page navigation
    document.addEventListener('click', (e) => {
      const pageLink = e.target.closest('[data-page]');
      if (pageLink) {
        e.preventDefault();
        const page = pageLink.dataset.page;
        this.showPage(page);
      }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.nav-mobile');
    
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', () => {
        const isActive = mobileNav.classList.contains('active');
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', !isActive);
        
        // Close menu when clicking outside
        if (!isActive) {
          document.addEventListener('click', this.handleOutsideClick.bind(this), { once: true });
        }
      });
    }

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav?.classList.remove('active');
        mobileMenuBtn?.classList.remove('active');
        mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      });
    });
  }

  initializeHeader() {
    // Sticky header effect
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
      } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      }
      
      lastScrollY = currentScrollY;
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleSearchSubmit(e.target.value);
        }
      });
    }
  }

  initializeBrowsePage() {
    // Filters toggle
    const filtersBtn = document.getElementById('filters-btn');
    const filtersSidebar = document.getElementById('filters-sidebar');
    
    if (filtersBtn && filtersSidebar) {
      filtersBtn.addEventListener('click', () => {
        filtersSidebar.classList.toggle('active');
        
        // Add overlay for mobile
        if (window.innerWidth < 1024) {
          this.toggleOverlay(filtersSidebar.classList.contains('active'));
        }
      });
    }

    // Filter checkboxes
    document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', this.handleFilterChange.bind(this));
    });

    // Sort dropdown
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', this.handleSortChange.bind(this));
    }

    // Initialize infinite scroll
    this.initializeInfiniteScroll();
  }

  initializeSearch() {
    // Global search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('focused');
      });
      
      searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('focused');
      });
    }
  }

  initializeInfiniteScroll() {
    let isLoading = false;
    let hasMore = true;
    
    const loadMore = () => {
      if (isLoading || !hasMore) return;
      
      isLoading = true;
      showLoadingState();
      
      // Simulate loading more items
      setTimeout(() => {
        // In a real app, this would fetch more data
        hideLoadingState();
        isLoading = false;
        
        // Simulate end of data after a few loads
        if (Math.random() > 0.7) {
          hasMore = false;
        }
      }, 1000);
    };

    // Intersection Observer for infinite scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && this.currentPage === 'browse') {
          loadMore();
        }
      });
    }, { threshold: 0.1 });

    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      observer.observe(loadingIndicator);
    }
  }

  showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
      targetPage.classList.add('active');
      this.currentPage = pageName;

      // Update navigation active states
      this.updateNavigationState(pageName);

      // Page-specific initialization
      this.handlePageLoad(pageName);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update URL (in a real app, you'd use proper routing)
      if (history.pushState) {
        history.pushState(null, null, `#${pageName}`);
      }
    }
  }

  updateNavigationState(activePage) {
    // Update desktop navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === activePage) {
        link.classList.add('active');
      }
    });

    // Update mobile navigation
    document.querySelectorAll('.nav-mobile-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === activePage) {
        link.classList.add('active');
      }
    });
  }

  handlePageLoad(pageName) {
    switch (pageName) {
      case 'home':
        // Reinitialize home page components
        setTimeout(() => {
          renderFeaturedItems();
          renderCategories();
          initializeCarousel();
        }, 100);
        break;
        
      case 'browse':
        // Load browse page content
        this.loadBrowseContent();
        break;
        
      case 'login':
      case 'register':
        // Clear any previous form data
        this.clearAuthForms();
        break;
    }
  }

  loadBrowseContent() {
    // Apply current filters and load items
    setTimeout(() => {
      this.applyFiltersAndSort();
    }, 100);
  }

  handleFilterChange(e) {
    const checkbox = e.target;
    const value = checkbox.value;
    const filterType = this.getFilterType(value);
    
    if (checkbox.checked) {
      if (!this.currentFilters[filterType].includes(value)) {
        this.currentFilters[filterType].push(value);
      }
    } else {
      this.currentFilters[filterType] = this.currentFilters[filterType].filter(v => v !== value);
    }
    
    this.applyFiltersAndSort();
  }

  handleSortChange(e) {
    this.currentSort = e.target.value;
    this.applyFiltersAndSort();
  }

  getFilterType(value) {
    const categories = ['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories'];
    const sizes = ['xs', 's', 'm', 'l', 'xl'];
    const conditions = ['new', 'excellent', 'good'];
    
    if (categories.includes(value)) return 'categories';
    if (sizes.includes(value)) return 'sizes';
    if (conditions.includes(value)) return 'conditions';
    
    return 'categories';
  }

  applyFiltersAndSort() {
    if (typeof applyFilters === 'function') {
      applyFilters();
    }
  }

  handleSearch(query) {
    if (query.length < 2) return;
    
    // In a real app, this would search the backend
    console.log('Searching for:', query);
    
    // Show search suggestions or results
    this.showSearchSuggestions(query);
  }

  handleSearchSubmit(query) {
    if (query.trim()) {
      // Navigate to browse page with search query
      this.showPage('browse');
      // Apply search filter
      console.log('Search submitted:', query);
    }
  }

  showSearchSuggestions(query) {
    // Implementation for search suggestions dropdown
    // This would show a dropdown with matching items/categories
  }

  handleOutsideClick(e) {
    const mobileNav = document.querySelector('.nav-mobile');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav && !mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileNav.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  toggleOverlay(show) {
    let overlay = document.querySelector('.page-overlay');
    
    if (show && !overlay) {
      overlay = document.createElement('div');
      overlay.className = 'page-overlay';
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      
      document.body.appendChild(overlay);
      
      setTimeout(() => {
        overlay.style.opacity = '1';
      }, 10);
      
      overlay.addEventListener('click', () => {
        document.getElementById('filters-sidebar')?.classList.remove('active');
        this.toggleOverlay(false);
      });
    } else if (!show && overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
  }

  clearAuthForms() {
    document.querySelectorAll('.auth-form').forEach(form => {
      form.reset();
      
      // Clear error states
      form.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error');
      });
      
      form.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
      });
      
      // Hide password strength indicator
      const strengthIndicator = form.querySelector('.password-strength');
      if (strengthIndicator) {
        strengthIndicator.style.display = 'none';
      }
    });
  }

  handleInitialLoad() {
    // Check URL hash for initial page
    const hash = window.location.hash.slice(1);
    const validPages = ['home', 'browse', 'login', 'register'];
    
    if (hash && validPages.includes(hash)) {
      this.showPage(hash);
    } else {
      this.showPage('home');
    }

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      const hash = window.location.hash.slice(1) || 'home';
      if (validPages.includes(hash)) {
        this.showPage(hash);
      }
    });
  }

  // Utility function for debouncing
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Global function for page navigation (used by components)
function showPage(pageName) {
  if (window.swapSoulApp) {
    window.swapSoulApp.showPage(pageName);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  window.swapSoulApp = new SwapSoulApp();
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add loading states for images
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
      this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDE3SDE2TTE2IDlIMTJNMTIgOUg4TTggOVY5LjAxTTggMTNWMTNNOCAxN0g4LjAxIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=';
    });
  });
});