// Products Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProductsPage();
});

function initializeProductsPage() {
    // Load all products
    loadProducts();

    // Set up filters
    setupFilters();

    // Set up search
    setupSearch();

    // Set up sorting and view controls
    setupControls();

    // Hide loading spinner
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
}

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 12;

function loadProducts() {
    allProducts = window.productManager.products;
    filteredProducts = [...allProducts];
    renderProducts();
    setupCategoryFilters();
}

function setupCategoryFilters() {
    const categories = window.productManager.getCategories();
    const categoryFilters = document.getElementById('categoryFilters');

    categoryFilters.innerHTML = '';

    // Add "All Categories" option
    const allLabel = document.createElement('label');
    allLabel.innerHTML = '<input type="radio" name="category" value="all" checked> All Categories';
    categoryFilters.appendChild(allLabel);

    // Add category options
    categories.forEach(category => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="category" value="${category}"> ${category}`;
        categoryFilters.appendChild(label);
    });
}

function setupFilters() {
    // Category filter
    document.addEventListener('change', (e) => {
        if (e.target.name === 'category') {
            filterProducts();
        }
    });

    // Price range filter
    const priceRange = document.getElementById('priceRange');
    const maxPriceDisplay = document.getElementById('maxPrice');

    priceRange.addEventListener('input', (e) => {
        maxPriceDisplay.textContent = `$${e.target.value}`;
        filterProducts();
    });

    // Rating filter
    document.addEventListener('change', (e) => {
        if (e.target.name === 'rating') {
            filterProducts();
        }
    });

    // Clear filters
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    searchBtn.addEventListener('click', performSearch);
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        filteredProducts = window.productManager.searchProducts(searchTerm);
        currentPage = 1;
        renderProducts();
        updateProductsTitle(`Search results for "${searchTerm}"`);
    } else {
        clearFilters();
    }
}

function filterProducts() {
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;
    const selectedRating = document.querySelector('input[name="rating"]:checked').value;
    const maxPrice = parseInt(document.getElementById('priceRange').value);

    filteredProducts = allProducts.filter(product => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
            return false;
        }

        // Price filter
        if (product.price > maxPrice) {
            return false;
        }

        // Rating filter
        if (selectedRating !== 'all' && product.rating < parseInt(selectedRating)) {
            return false;
        }

        return true;
    });

    currentPage = 1;
    renderProducts();
    updateProductsTitle(`Filtered Products (${filteredProducts.length} results)`);
}

function clearFilters() {
    // Reset all filters
    document.querySelector('input[name="category"][value="all"]').checked = true;
    document.querySelector('input[name="rating"][value="all"]').checked = true;
    document.getElementById('priceRange').value = 500;
    document.getElementById('maxPrice').textContent = '$500';
    document.getElementById('searchInput').value = '';

    filteredProducts = [...allProducts];
    currentPage = 1;
    renderProducts();
    updateProductsTitle('All Products');
}

function setupControls() {
    // Sort control
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });

    // View toggle
    document.getElementById('gridView').addEventListener('click', () => {
        setView('grid');
    });

    document.getElementById('listView').addEventListener('click', () => {
        setView('list');
    });
}

function sortProducts(sortBy) {
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            // Keep original order
            break;
    }

    currentPage = 1;
    renderProducts();
}

function setView(view) {
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    const productsGrid = document.getElementById('productsGrid');

    if (view === 'grid') {
        gridView.classList.add('active');
        listView.classList.remove('active');
        productsGrid.classList.remove('list-view');
    } else {
        listView.classList.add('active');
        gridView.classList.remove('active');
        productsGrid.classList.add('list-view');
    }
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    productsGrid.innerHTML = '';

    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
        return;
    }

    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    renderPagination();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-text">(${product.reviews})</span>
            </div>
            <div class="product-price">
                $${product.price.toFixed(2)}
                ${product.originalPrice > product.price ?
                    `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                     <span class="product-discount">-${product.discount}%</span>` : ''}
            </div>
            <div class="product-actions">
                <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                <button class="wishlist-btn" data-product-id="${product.id}">
                    <span class="wishlist-text">♡</span>
                </button>
            </div>
        </div>
    `;

    // Add click handlers
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.product-actions')) {
            window.location.href = `/product.html?id=${product.id}`;
        }
    });

    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product.id);
    });

    const wishlistBtn = card.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(product.id, wishlistBtn);
    });

    // Update wishlist button state
    updateWishlistButton(product.id, wishlistBtn);

    return card;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= Math.floor(rating) ? '★' : '☆';
    }
    return stars;
}

function addToCart(productId) {
    if (window.auth && !window.auth.isLoggedIn()) {
        window.location.href = '/login.html';
        return;
    }

    const success = window.productManager.addToCart(productId, 1);
    if (success) {
        showNotification('Product added to cart!', 'success');
        updateCartDisplay();
    } else {
        showNotification('Failed to add product to cart', 'error');
    }
}

function toggleWishlist(productId, button) {
    if (window.auth && !window.auth.isLoggedIn()) {
        window.location.href = '/login.html';
        return;
    }

    const isInWishlist = window.productManager.isInWishlist(productId);

    if (isInWishlist) {
        window.productManager.removeFromWishlist(productId);
        showNotification('Removed from wishlist', 'info');
    } else {
        window.productManager.addToWishlist(productId);
        showNotification('Added to wishlist', 'success');
    }

    updateWishlistButton(productId, button);
}

function updateWishlistButton(productId, button) {
    const isInWishlist = window.productManager.isInWishlist(productId);
    const wishlistText = button.querySelector('.wishlist-text');

    if (isInWishlist) {
        button.classList.add('in-wishlist');
        wishlistText.textContent = '♥';
    } else {
        button.classList.remove('in-wishlist');
        wishlistText.textContent = '♡';
    }
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
            Previous
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += '<span class="pagination-ellipsis">...</span>';
        }
    }

    // Next button
    paginationHTML += `
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
            Next
        </button>
    `;

    pagination.innerHTML = paginationHTML;

    // Add click handlers
    pagination.addEventListener('click', (e) => {
        if (e.target.classList.contains('pagination-btn') && !e.target.disabled) {
            currentPage = parseInt(e.target.dataset.page);
            renderProducts();
        }
    });
}

function updateProductsTitle(title) {
    document.getElementById('productsTitle').textContent = title;
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
