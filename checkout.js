// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (window.auth && !window.auth.isLoggedIn()) {
        window.location.href = '/login.html';
        return;
    }

    // Check if cart is empty
    if (window.productManager.cart.length === 0) {
        window.location.href = '/cart.html';
        return;
    }

    initializeCheckoutPage();
});

function initializeCheckoutPage() {
    // Load order summary
    loadOrderSummary();

    // Set up event listeners
    setupCheckoutEventListeners();

    // Hide loading spinner
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
}

function loadOrderSummary() {
    const cart = window.productManager.cart;
    const orderSummary = document.getElementById('orderSummary');
    const orderDetails = document.getElementById('orderDetails');

    // Clear existing content
    orderSummary.innerHTML = '';
    orderDetails.innerHTML = '';

    // Render order items
    cart.forEach(item => {
        const orderItem = createOrderItem(item);
        orderSummary.appendChild(orderItem);

        const orderDetail = createOrderDetail(item);
        orderDetails.appendChild(orderDetail);
    });

    // Calculate totals
    calculateTotals();
}

function createOrderItem(item) {
    const orderItemDiv = document.createElement('div');
    orderItemDiv.className = 'order-item';
    orderItemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="order-item-details">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-price">$${item.price.toFixed(2)}</div>
            <div class="order-item-quantity">Quantity: ${item.quantity}</div>
        </div>
    `;
    return orderItemDiv;
}

function createOrderDetail(item) {
    const orderDetailDiv = document.createElement('div');
    orderDetailDiv.className = 'order-item';
    orderDetailDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="order-item-details">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-price">$${item.price.toFixed(2)}</div>
            <div class="order-item-quantity">Quantity: ${item.quantity}</div>
        </div>
    `;
    return orderDetailDiv;
}

function calculateTotals() {
    const cart = window.productManager.cart;
    const subtotal = window.productManager.getCartTotal();
    const shipping = subtotal > 25 ? 0 : 9.99; // Free shipping over $25
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function setupCheckoutEventListeners() {
    // Form validation
    const forms = document.querySelectorAll('.checkout-form');
    forms.forEach(form => {
        form.addEventListener('input', validateForm);
    });

    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', formatCardNumber);

    // Expiry date formatting
    const expiryDateInput = document.getElementById('expiryDate');
    expiryDateInput.addEventListener('input', formatExpiryDate);

    // CVV formatting
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', formatCVV);

    // Place order button
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    placeOrderBtn.addEventListener('click', handlePlaceOrder);
}

function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
}

function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
}

function formatCVV(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value.substring(0, 3);
}

function validateForm() {
    const shippingForm = document.getElementById('shippingForm');
    const paymentForm = document.getElementById('paymentForm');
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    const isShippingValid = shippingForm.checkValidity();
    const isPaymentValid = paymentForm.checkValidity();

    placeOrderBtn.disabled = !(isShippingValid && isPaymentValid);
}

function handlePlaceOrder() {
    const shippingForm = document.getElementById('shippingForm');
    const paymentForm = document.getElementById('paymentForm');

    if (!shippingForm.checkValidity() || !paymentForm.checkValidity()) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Collect form data
    const shippingData = new FormData(shippingForm);
    const paymentData = new FormData(paymentForm);

    const orderData = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: [...window.productManager.cart],
        shipping: Object.fromEntries(shippingData),
        payment: Object.fromEntries(paymentData),
        subtotal: window.productManager.getCartTotal(),
        shipping: window.productManager.getCartTotal() > 25 ? 0 : 9.99,
        tax: window.productManager.getCartTotal() * 0.08,
        total: window.productManager.getCartTotal() + (window.productManager.getCartTotal() > 25 ? 0 : 9.99) + (window.productManager.getCartTotal() * 0.08),
        status: 'completed'
    };

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    window.productManager.cart = [];
    window.productManager.saveCart();

    // Redirect to success page
    window.location.href = `/order-success.html?orderId=${orderData.id}`;
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
