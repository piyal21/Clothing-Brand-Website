// Main JavaScript file for Lipuvai clothing brand website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initProductFilters();
    initProductModal();
    initNewsletterForm();
    initScrollAnimations();
    initSmoothScrolling();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Product Filtering
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Product Modal
function initProductModal() {
    const modal = document.getElementById('product-modal');
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const closeModal = document.querySelector('.close-modal');
    const modalAddCart = document.querySelector('.modal-add-cart');

    // Product data - dynamically determine image path based on current page
    const getImagePath = (imageName) => {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/products/')) {
            return `../assets/images/${imageName}`;
        } else {
            return `assets/images/${imageName}`;
        }
    };

    const products = {
        1: {
            title: 'Premium Cotton T-Shirt',
            description: 'Soft, breathable cotton with a modern fit. Perfect for everyday wear.',
            price: '$29.99',
            image: getImagePath('product1.jpg')
        },
        2: {
            title: 'Designer Hoodie',
            description: 'Comfortable and stylish for everyday wear. Made with premium materials.',
            price: '$79.99',
            image: getImagePath('product2.jpg')
        },
        3: {
            title: 'Classic Denim Jeans',
            description: 'Timeless style with premium denim. Perfect fit and durability.',
            price: '$89.99',
            image: getImagePath('product3.jpg')
        },
        4: {
            title: 'Luxury Blouse',
            description: 'Elegant design for special occasions. Sophisticated and comfortable.',
            price: '$79.99',
            image: getImagePath('product4.jpg')
        },
        5: {
            title: 'Casual Shorts',
            description: 'Perfect for summer and casual outings. Lightweight and comfortable.',
            price: '$39.99',
            image: getImagePath('product5.jpg')
        },
        6: {
            title: 'Designer Bag',
            description: 'Stylish and functional everyday bag. Premium materials and craftsmanship.',
            price: '$129.99',
            image: getImagePath('product6.jpg')
        },
        7: {
            title: 'Vintage Denim Jacket',
            description: 'Classic denim jacket with vintage wash. Perfect for layering.',
            price: '$95.99',
            image: getImagePath('product7.jpg')
        },
        8: {
            title: 'Elegant Summer Dress',
            description: 'Light and breezy dress for warm weather. Flowing and comfortable.',
            price: '$65.99',
            image: getImagePath('product8.jpg')
        },
        9: {
            title: 'Casual Sneakers',
            description: 'Comfortable sneakers for everyday wear. Durable and stylish.',
            price: '$89.99',
            image: getImagePath('product9.jpg')
        },
        10: {
            title: 'Formal Blazer',
            description: 'Professional blazer for business occasions. Sharp and sophisticated.',
            price: '$149.99',
            image: getImagePath('product10.jpg')
        },
        11: {
            title: 'Cozy Sweater',
            description: 'Warm and comfortable knit sweater. Perfect for cold weather.',
            price: '$75.99',
            image: getImagePath('product11.jpg')
        },
        12: {
            title: 'Trendy Cap',
            description: 'Stylish cap to complete your look. Adjustable and comfortable.',
            price: '$24.99',
            image: getImagePath('product12.jpg')
        }
    };

    // Open modal
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const product = products[productId];
            
            if (product) {
                document.getElementById('modal-product-title').textContent = product.title;
                document.getElementById('modal-product-description').textContent = product.description;
                document.getElementById('modal-product-price').textContent = product.price;
                document.getElementById('modal-product-img').src = product.image;
                document.getElementById('modal-product-img').alt = product.title;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModalFunction() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    // Quantity controls
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const qtyValue = document.getElementById('qty-value');

    if (qtyMinus && qtyPlus && qtyValue) {
        qtyMinus.addEventListener('click', function() {
            let currentValue = parseInt(qtyValue.textContent);
            if (currentValue > 1) {
                qtyValue.textContent = currentValue - 1;
            }
        });

        qtyPlus.addEventListener('click', function() {
            let currentValue = parseInt(qtyValue.textContent);
            qtyValue.textContent = currentValue + 1;
        });
    }

    // Add to cart functionality
    if (modalAddCart) {
        modalAddCart.addEventListener('click', function() {
            const productTitle = document.getElementById('modal-product-title').textContent;
            const quantity = document.getElementById('qty-value').textContent;
            const size = document.getElementById('size-select').value;
            
            // Show success message
            showNotification(`${productTitle} (Size: ${size}, Qty: ${quantity}) added to cart!`);
            
            // Close modal
            closeModalFunction();
            
            // Reset quantity
            qtyValue.textContent = '1';
        });
    }
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            
            if (emailInput && submitButton) {
                const email = emailInput.value;
                
                // Show loading state
                const originalText = submitButton.textContent;
                submitButton.innerHTML = '<span class="loading"></span> Subscribing...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    showNotification('Thank you for subscribing to our newsletter!');
                    
                    // Reset form
                    emailInput.value = '';
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const elementsToAnimate = document.querySelectorAll('.feature-card, .product-card, .value-card, .team-member, .stat-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add to Cart functionality for product cards
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-outline') && e.target.textContent.includes('Add to Cart')) {
        const productCard = e.target.closest('.product-card');
        const productTitle = productCard.querySelector('h3').textContent;
        
        showNotification(`${productTitle} added to cart!`);
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Search functionality (if needed in future)
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const productTitle = card.querySelector('h3').textContent.toLowerCase();
                const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
                
                if (productTitle.includes(searchTerm) || productDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Image lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#f44336';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Utility functions
function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 10px;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(style);
