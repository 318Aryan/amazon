// Wait for DOM to load and auth system to initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Image Slider Functionality
    const imgs = document.querySelectorAll('#slider ul img');
    const prev_btn = document.querySelector('.control_prev');
    const next_btn = document.querySelector('.control_next');

let n = 0;
let autoSlideInterval;

function changeSlide() {
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.display = "none";
    }
    imgs[n].style.display = "block";
}

function nextSlide() {
    if (n < imgs.length - 1) {
        n++;
    } else {
        n = 0;
    }
    changeSlide();
}

function prevSlide() {
    if (n > 0) {
        n--;
    } else {
        n = imgs.length - 1;
    }
    changeSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Initialize slider
changeSlide();
startAutoSlide();

// Event listeners for slider controls
prev_btn.addEventListener("click", (e) => {
    e.preventDefault();
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

next_btn.addEventListener("click", (e) => {
    e.preventDefault();
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

// Pause auto-slide on hover
const slider = document.querySelector('.header-slider');
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

// Horizontal scroll for product containers
const scrollContainer = document.querySelectorAll(".products");
for (const item of scrollContainer) {
    item.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        item.scrollLeft += evt.deltaY;
    });
}

// Search functionality
const searchInput = document.querySelector('.nav-search-input');
const searchIcon = document.querySelector('.nav-search-icon');

function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Redirect to search results page
        window.location.href = `/products.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

searchIcon.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

    // Product card click functionality
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            // Get product ID from data attribute or generate one
            const productId = card.dataset.productId || 1;
            // Navigate to product page with ID
            window.location.href = `/product.html?id=${productId}`;
        });
    });

// Box column click functionality
const boxCols = document.querySelectorAll('.box-col');
boxCols.forEach(box => {
    box.addEventListener('click', () => {
        const title = box.querySelector('h3').textContent;
        // Navigate to category page
        window.location.href = `/products.html?category=${encodeURIComponent(title.toLowerCase())}`;
    });
});

// Product image click functionality
const productImages = document.querySelectorAll('.products img');
productImages.forEach(img => {
    img.addEventListener('click', () => {
        window.location.href = '/product.html';
    });
});

// Product item click functionality (for new structure)
const productItems = document.querySelectorAll('.product-item');
productItems.forEach(item => {
    item.addEventListener('click', () => {
        const productId = item.dataset.productId;
        window.location.href = `/product.html?id=${productId}`;
    });
});

// Cart functionality
const cartIcon = document.querySelector('.nav-cart');
let cartCount = 0;

cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/cart.html';
});

// Add to cart functionality (for demonstration)
function addToCart(productName) {
    // Check if user is logged in
    if (window.auth && !window.auth.isLoggedIn()) {
        showNotification('Please sign in to add items to your cart', 'error');
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 2000);
        return;
    }

    cartCount++;
    updateCartDisplay();
    // Show success notification instead of alert
    showNotification(`${productName} added to cart!`, 'success');
}

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

    const colors = {
        success: '#00a650',
        error: '#d00',
        info: '#0066c0'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function updateCartDisplay() {
    const cartText = cartIcon.querySelector('h4');
    if (cartText) {
        cartText.textContent = `Cart (${cartCount})`;
    }
}

// Mobile menu functionality
const mobileMenuIcon = document.querySelector('.menu-toggle');
const navBottom = document.querySelector('.nav-bottom');

if (mobileMenuIcon) {
    mobileMenuIcon.addEventListener('click', () => {
        navBottom.classList.toggle('mobile-menu-open');
    });
}

// Navigation items functionality
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // If there's an <a> tag inside, let it handle the navigation
        const link = item.querySelector('a');
        if (link) {
            // Don't prevent default - let the link work naturally
            return;
        }

        // If no <a> tag, handle navigation with JavaScript
        e.preventDefault();
        const itemText = item.textContent.trim();

        // Navigate to appropriate page based on item text
        switch(itemText) {
            case 'Customer Service':
                window.location.href = '/customer-service.html';
                break;
            case 'Registry':
                window.location.href = '/registry.html';
                break;
            case 'Gift Cards':
                window.location.href = '/gift-cards.html';
                break;
            case 'Sell':
                window.location.href = '/sell.html';
                break;
            case 'Today\'s Deals':
                window.location.href = '/deals.html';
                break;
            default:
                console.log(`No page defined for: ${itemText}`);
        }
    });
});

// Smooth scrolling for navigation
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

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
});

    // Add loading class to body initially
    document.body.classList.add('loading');

    // Update cart display
    updateCartDisplay();
}

// Update cart display function
function updateCartDisplay() {
    if (window.productManager) {
        const cartCount = window.productManager.getCartItemCount();
        const cartText = document.querySelector('.nav-cart h4');
        if (cartText) {
            cartText.textContent = `Cart (${cartCount})`;
        }
    }
}
