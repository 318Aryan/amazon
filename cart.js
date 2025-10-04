// Cart Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCartPage();
});

function initializeCartPage() {
    // Load cart items
    loadCartItems();

    // Set up event listeners
    setupCartEventListeners();

    // Load recommended products
    loadRecommendedProducts();

    // Hide loading spinner
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartDiv = document.getElementById('emptyCart');
    const cartSubtotalDiv = document.getElementById('cartSubtotal');
    const cartSubtotalRight = document.getElementById('cartSubtotalRight');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const cart = window.productManager.cart;

    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCartDiv.style.display = 'block';
        cartSubtotalDiv.style.display = 'none';
        cartSubtotalRight.textContent = 'Subtotal (0 items): ₹0.00';
        checkoutBtn.disabled = true;
        return;
    }

    cartItemsContainer.style.display = 'block';
    emptyCartDiv.style.display = 'none';
    cartSubtotalDiv.style.display = 'block';
    checkoutBtn.disabled = false;

    // Clear existing items
    cartItemsContainer.innerHTML = '';

    // Render cart items
    cart.forEach((item, index) => {
        const cartItem = createCartItem(item, index);
        cartItemsContainer.appendChild(cartItem);
    });

    // Update subtotal
    updateCartSubtotal();
}

function createCartItem(item, index) {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'product-cart-list';
    cartItemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-product-image" data-product-id="${item.id}">
        <div>
            <div class="product-cart-titleprice">
                <p>${item.name}</p>
                <p><b>₹${item.price.toLocaleString()}</b></p>
            </div>
            <p class="product-cart-stock">In Stock</p>
            <p class="product-cart-delivery">FREE delivery <b>Mon, Jan 29</b> available at checkout</p>
            <p class="product-cart-returns">FREE Returns <a href="#">Learn more</a></p>
            <p class="product-cart-giftoption">Gift options not available. <a href="#">Learn more</a></p>
            <div class="product-cart-list-action">
                <select class="quantity-select" data-item-index="${index}">
                    <option value="1" ${item.quantity === 1 ? 'selected' : ''}>Qty: 1</option>
                    <option value="2" ${item.quantity === 2 ? 'selected' : ''}>Qty: 2</option>
                    <option value="3" ${item.quantity === 3 ? 'selected' : ''}>Qty: 3</option>
                    <option value="4" ${item.quantity === 4 ? 'selected' : ''}>Qty: 4</option>
                    <option value="5" ${item.quantity === 5 ? 'selected' : ''}>Qty: 5</option>
                </select>
                <hr>
                <p class="action-btn delete-btn" data-item-index="${index}">Delete</p>
                <hr>
                <p class="action-btn save-later-btn" data-item-index="${index}">Save for later</p>
                <hr>
                <p class="action-btn compare-btn" data-item-id="${item.id}">Compare with similar items</p>
                <hr>
                <p class="action-btn share-btn" data-item-id="${item.id}">Share</p>
            </div>
        </div>
    `;

    // Add click handler for product image
    const productImage = cartItemDiv.querySelector('.cart-product-image');
    productImage.addEventListener('click', () => {
        window.location.href = `/product.html?id=${item.id}`;
    });

    return cartItemDiv;
}

function setupCartEventListeners() {
    // Quantity change
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-select')) {
            const itemIndex = parseInt(e.target.dataset.itemIndex);
            const newQuantity = parseInt(e.target.value);
            window.productManager.updateCartQuantity(window.productManager.cart[itemIndex].id, newQuantity);
            loadCartItems();
            updateCartDisplay();
        }
    });

    // Delete item
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const itemIndex = parseInt(e.target.dataset.itemIndex);
            const item = window.productManager.cart[itemIndex];
            if (confirm(`Remove "${item.name}" from cart?`)) {
                window.productManager.removeFromCart(item.id);
                loadCartItems();
                updateCartDisplay();
                showNotification('Item removed from cart', 'info');
            }
        }
    });

    // Save for later
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('save-later-btn')) {
            const itemIndex = parseInt(e.target.dataset.itemIndex);
            const item = window.productManager.cart[itemIndex];
            // Add to wishlist
            window.productManager.addToWishlist(item.id);
            // Remove from cart
            window.productManager.removeFromCart(item.id);
            loadCartItems();
            updateCartDisplay();
            showNotification('Item saved for later', 'success');
        }
    });

    // Compare items
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('compare-btn')) {
            const productId = e.target.dataset.itemId;
            showNotification('Compare feature coming soon!', 'info');
        }
    });

    // Share item
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('share-btn')) {
            const productId = e.target.dataset.itemId;
            if (navigator.share) {
                navigator.share({
                    title: 'Check out this product on Amazon',
                    text: 'I found this great product!',
                    url: window.location.origin + `/product.html?id=${productId}`
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(window.location.origin + `/product.html?id=${productId}`);
                showNotification('Product link copied to clipboard!', 'success');
            }
        }
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.addEventListener('click', () => {
        // Check if user is logged in
        if (window.auth && !window.auth.isLoggedIn()) {
            showNotification('Please sign in to proceed to checkout', 'error');
            setTimeout(() => {
                window.location.href = '/login.html';
            }, 2000);
            return;
        }
        if (window.productManager.cart.length > 0) {
            window.location.href = '/checkout.html';
        }
    });
}

function updateCartSubtotal() {
    const cart = window.productManager.cart;
    const subtotal = window.productManager.getCartTotal();
    const itemCount = window.productManager.getCartItemCount();

    const cartSubtotalDiv = document.getElementById('cartSubtotal');
    const cartSubtotalRight = document.getElementById('cartSubtotalRight');

    cartSubtotalDiv.innerHTML = `Subtotal (${itemCount} item${itemCount !== 1 ? 's' : ''}): <b>₹${subtotal.toLocaleString()}</b>`;
    cartSubtotalRight.innerHTML = `Subtotal (${itemCount} item${itemCount !== 1 ? 's' : ''}): <b>₹${subtotal.toLocaleString()}</b>`;
}

function loadRecommendedProducts() {
    const recommendedContainer = document.getElementById('recommendedProducts');
    const recommendedProducts = window.productManager.getFeaturedProducts(8);

    recommendedContainer.innerHTML = '';
    recommendedProducts.forEach(product => {
        const productCard = createRecommendedProductCard(product);
        recommendedContainer.appendChild(productCard);
    });
}

function createRecommendedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-img-container">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-offer">
            <p>${product.discount}% off</p> <span>Deal</span>
        </div>
        <p class="product-price">$${product.price.toFixed(2)} <span class="original-price">$${product.originalPrice.toFixed(2)}</span></p>
        <h4>${product.name}</h4>
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

