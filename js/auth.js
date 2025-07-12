// Authentication functionality

class AuthManager {
  constructor() {
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', this.handleLogin.bind(this));
    }

    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', this.handleRegister.bind(this));
    }

    // Password toggles
    document.querySelectorAll('.password-toggle').forEach(toggle => {
      toggle.addEventListener('click', this.togglePasswordVisibility.bind(this));
    });

    // Password strength indicator
    const passwordInput = document.getElementById('register-password');
    if (passwordInput) {
      passwordInput.addEventListener('input', this.updatePasswordStrength.bind(this));
    }

    // Real-time validation
    document.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('blur', this.validateField.bind(this));
      input.addEventListener('input', this.clearFieldError.bind(this));
    });

    // Auth page navigation
    document.querySelectorAll('.auth-link[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        showPage(page);
      });
    });
  }

  async handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    // Validate form
    if (!this.validateLoginForm(data)) {
      return;
    }

    // Show loading state
    this.setFormLoading(form, true);

    try {
      // Simulate API call
      await this.simulateApiCall(2000);
      
      // Success
      this.showSuccess('Login successful! Welcome back.');
      
      // Redirect to home page
      setTimeout(() => {
        showPage('home');
      }, 1500);
      
    } catch (error) {
      this.showError('Invalid email or password. Please try again.');
    } finally {
      this.setFormLoading(form, false);
    }
  }

  async handleRegister(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      agreeToTerms: formData.get('agreeToTerms'),
      subscribeNewsletter: formData.get('subscribeNewsletter')
    };

    // Validate form
    if (!this.validateRegisterForm(data)) {
      return;
    }

    // Show loading state
    this.setFormLoading(form, true);

    try {
      // Simulate API call
      await this.simulateApiCall(2500);
      
      // Success
      this.showSuccess('Account created successfully! Welcome to SwapSoul.');
      
      // Redirect to home page
      setTimeout(() => {
        showPage('home');
      }, 1500);
      
    } catch (error) {
      this.showError('Registration failed. Please try again.');
    } finally {
      this.setFormLoading(form, false);
    }
  }

  validateLoginForm(data) {
    let isValid = true;

    // Email validation
    if (!data.email) {
      this.showFieldError('login-email', 'Email is required');
      isValid = false;
    } else if (!this.isValidEmail(data.email)) {
      this.showFieldError('login-email', 'Please enter a valid email');
      isValid = false;
    }

    // Password validation
    if (!data.password) {
      this.showFieldError('login-password', 'Password is required');
      isValid = false;
    } else if (data.password.length < 6) {
      this.showFieldError('login-password', 'Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  }

  validateRegisterForm(data) {
    let isValid = true;

    // First name validation
    if (!data.firstName?.trim()) {
      this.showFieldError('register-firstName', 'First name is required');
      isValid = false;
    }

    // Last name validation
    if (!data.lastName?.trim()) {
      this.showFieldError('register-lastName', 'Last name is required');
      isValid = false;
    }

    // Email validation
    if (!data.email) {
      this.showFieldError('register-email', 'Email is required');
      isValid = false;
    } else if (!this.isValidEmail(data.email)) {
      this.showFieldError('register-email', 'Please enter a valid email');
      isValid = false;
    }

    // Password validation
    if (!data.password) {
      this.showFieldError('register-password', 'Password is required');
      isValid = false;
    } else if (data.password.length < 8) {
      this.showFieldError('register-password', 'Password must be at least 8 characters');
      isValid = false;
    } else if (!this.isStrongPassword(data.password)) {
      this.showFieldError('register-password', 'Password must contain uppercase, lowercase, and number');
      isValid = false;
    }

    // Confirm password validation
    if (!data.confirmPassword) {
      this.showFieldError('register-confirmPassword', 'Please confirm your password');
      isValid = false;
    } else if (data.password !== data.confirmPassword) {
      this.showFieldError('register-confirmPassword', 'Passwords do not match');
      isValid = false;
    }

    // Terms agreement validation
    if (!data.agreeToTerms) {
      this.showFieldError('register-terms', 'You must agree to the terms and conditions');
      isValid = false;
    }

    return isValid;
  }

  validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;

    switch (fieldName) {
      case 'email':
        if (value && !this.isValidEmail(value)) {
          this.showFieldError(field.id, 'Please enter a valid email');
        }
        break;
      case 'password':
        if (value && value.length < 6) {
          this.showFieldError(field.id, 'Password must be at least 6 characters');
        }
        break;
      case 'confirmPassword':
        const passwordField = document.getElementById('register-password');
        if (value && passwordField && value !== passwordField.value) {
          this.showFieldError(field.id, 'Passwords do not match');
        }
        break;
    }
  }

  clearFieldError(e) {
    const field = e.target;
    this.hideFieldError(field.id);
  }

  showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field) {
      field.classList.add('error');
    }
    
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'flex';
    }
  }

  hideFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field) {
      field.classList.remove('error');
    }
    
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }

  togglePasswordVisibility(e) {
    const button = e.currentTarget;
    const input = button.parentElement.querySelector('input');
    const icon = button.querySelector('.eye-icon');
    
    if (input.type === 'password') {
      input.type = 'text';
      button.setAttribute('aria-label', 'Hide password');
      // Update icon to eye-off
      icon.innerHTML = `
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      `;
    } else {
      input.type = 'password';
      button.setAttribute('aria-label', 'Show password');
      // Update icon to eye
      icon.innerHTML = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      `;
    }
  }

  updatePasswordStrength(e) {
    const password = e.target.value;
    const strengthContainer = document.getElementById('password-strength');
    const strengthFill = document.getElementById('strength-fill');
    const strengthLabel = document.getElementById('strength-label');

    if (!password) {
      strengthContainer.style.display = 'none';
      return;
    }

    strengthContainer.style.display = 'flex';

    const strength = this.calculatePasswordStrength(password);
    const percentage = (strength / 5) * 100;

    strengthFill.style.width = `${percentage}%`;
    strengthFill.className = `strength-fill strength-${strength}`;

    const labels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    strengthLabel.textContent = labels[strength - 1] || 'Weak';
  }

  calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return Math.max(1, strength);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isStrongPassword(password) {
    return password.length >= 8 && 
           /[a-z]/.test(password) && 
           /[A-Z]/.test(password) && 
           /\d/.test(password);
  }

  setFormLoading(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonIcon = submitButton.querySelector('.button-icon');
    const spinner = submitButton.querySelector('.spinner');

    if (isLoading) {
      submitButton.disabled = true;
      submitButton.classList.add('loading');
      if (buttonText) buttonText.style.opacity = '0';
      if (buttonIcon) buttonIcon.style.opacity = '0';
      if (spinner) spinner.style.display = 'block';
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove('loading');
      if (buttonText) buttonText.style.opacity = '1';
      if (buttonIcon) buttonIcon.style.opacity = '1';
      if (spinner) spinner.style.display = 'none';
    }
  }

  showSuccess(message) {
    this.showNotification(message, 'success');
  }

  showError(message) {
    this.showNotification(message, 'error');
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Close notification">×</button>
      </div>
    `;

    // Styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 400px;
    `;

    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button handler
    closeBtn.addEventListener('click', () => {
      this.removeNotification(notification);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      this.removeNotification(notification);
    }, 5000);
  }

  removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  simulateApiCall(delay = 1000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('API Error'));
        }
      }, delay);
    });
  }
}

// Initialize authentication manager
document.addEventListener('DOMContentLoaded', () => {
  new AuthManager();
});