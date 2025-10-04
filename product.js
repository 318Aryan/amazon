// Product Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (window.auth && !window.auth.isLoggedIn()) {
        window.location.href = '/login.html';
        return;
    }

    initializeProductPage();
});

function initializeProductPage() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        window.location.href = '/';
        return;
    }

    // Load product data
    const product = window.productManager.getProductById(productId);
    if (!product) {
        window.location.href = '/';
        return;
    }

    // Populate product details
    populateProductDetails(product);

    // Set up event listeners
    setupEventListeners(product);

    // Load related products
    loadRelatedProducts(product);

    // Hide loading spinner
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
}

function populateProductDetails(product) {
    // Product title
    document.getElementById('productName').textContent = product.name;

    // Product images
    const mainImage = document.getElementById('mainImage');
    mainImage.src = product.image;
    mainImage.alt = product.name;

    // Thumbnail images
    const thumbnailContainer = document.getElementById('thumbnailImages');
    thumbnailContainer.innerHTML = '';
    product.images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = `${product.name} ${index + 1}`;
        img.addEventListener('click', () => {
            mainImage.src = image;
            // Update active thumbnail
            thumbnailContainer.querySelectorAll('img').forEach(thumb => thumb.classList.remove('active'));
            img.classList.add('active');
        });
        if (index === 0) img.classList.add('active');
        thumbnailContainer.appendChild(img);
    });

    // Rating
    const starsContainer = document.getElementById('productStars');
    starsContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = i <= Math.floor(product.rating) ? '★' : '☆';
        starsContainer.appendChild(star);
    }

    document.getElementById('productRating').textContent = product.rating;
    document.getElementById('productReviews').textContent = `(${product.reviews} reviews)`;

    // Price
    document.getElementById('currentPrice').textContent = `$${product.price}`;
    if (product.originalPrice > product.price) {
        document.getElementById('originalPrice').textContent = `$${product.originalPrice}`;
        document.getElementById('discount').textContent = `-${product.discount}%`;
    } else {
        document.getElementById('originalPrice').style.display = 'none';
        document.getElementById('discount').style.display = 'none';
    }

    // Features
    const featuresContainer = document.getElementById('productFeatures');
    featuresContainer.innerHTML = '<h3>Key Features:</h3><ul></ul>';
    const featuresList = featuresContainer.querySelector('ul');
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Description
    document.getElementById('productDescription').textContent = product.description;

    // Wishlist button state
    updateWishlistButton(product.id);
}

function setupEventListeners(product) {
    // Add to cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        const success = window.productManager.addToCart(product.id, quantity);

        if (success) {
            // Show success message
            showNotification(`${product.name} added to cart!`, 'success');
            updateCartDisplay();
        } else {
            showNotification('Failed to add item to cart', 'error');
        }
    });

    // Add to wishlist button
    const addToWishlistBtn = document.getElementById('addToWishlistBtn');
    addToWishlistBtn.addEventListener('click', () => {
        const isInWishlist = window.productManager.isInWishlist(product.id);

        if (isInWishlist) {
            window.productManager.removeFromWishlist(product.id);
            showNotification('Removed from wishlist', 'info');
        } else {
            window.productManager.addToWishlist(product.id);
            showNotification('Added to wishlist', 'success');
        }

        updateWishlistButton(product.id);
    });

    // Image zoom functionality
    const mainImage = document.getElementById('mainImage');
    const imageZoom = document.getElementById('imageZoom');

    mainImage.addEventListener('mousemove', (e) => {
        const rect = mainImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        imageZoom.style.left = `${x - 100}px`;
        imageZoom.style.top = `${y - 100}px`;
        imageZoom.style.opacity = '1';
    });

    mainImage.addEventListener('mouseleave', () => {
        imageZoom.style.opacity = '0';
    });
}

function updateWishlistButton(productId) {
    const addToWishlistBtn = document.getElementById('addToWishlistBtn');
    const wishlistText = document.getElementById('wishlistText');
    const isInWishlist = window.productManager.isInWishlist(productId);

    if (isInWishlist) {
        addToWishlistBtn.classList.add('in-wishlist');
        wishlistText.textContent = 'In Wishlist';
    } else {
        addToWishlistBtn.classList.remove('in-wishlist');
        wishlistText.textContent = 'Add to Wishlist';
    }
}

function loadRelatedProducts(currentProduct) {
    const relatedProductsContainer = document.getElementById('relatedProducts');
    const relatedProducts = window.productManager.getProductsByCategory(currentProduct.category)
        .filter(product => product.id !== currentProduct.id)
        .slice(0, 4);

    relatedProductsContainer.innerHTML = '';
    relatedProducts.forEach(product => {
        const productCard = createRelatedProductCard(product);
        relatedProductsContainer.appendChild(productCard);
    });
}

function createRelatedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'related-product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <div class="price">$${product.price}</div>
    `;

    card.addEventListener('click', () => {
        window.location.href = `/product.html?id=${product.id}`;
    });

    return card;
}

function updateCartDisplay() {
    if (window.productManager) {
        const cartCount = window.productManager.getCartItemCount();
        const cartText = document.querySelector('.nav-cart h4');
        if (cartText) {
            cartText.textContent = `Cart (${cartCount})`;
        }
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
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

    // Set background color based on type
    const colors = {
        success: '#00a650',
        error: '#d00',
        info: '#0066c0'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
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
