// Order Success Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (window.auth && !window.auth.isLoggedIn()) {
        window.location.href = '/login.html';
        return;
    }

    initializeOrderSuccessPage();
});

function initializeOrderSuccessPage() {
    // Get order ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');

    if (!orderId) {
        window.location.href = '/';
        return;
    }

    // Load order details
    loadOrderDetails(orderId);
}

function loadOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id == orderId);

    if (!order) {
        window.location.href = '/';
        return;
    }

    // Populate order information
    document.getElementById('orderNumber').textContent = `#${order.id}`;
    document.getElementById('orderDate').textContent = formatDate(order.date);
    document.getElementById('orderTotal').textContent = `$${order.total.toFixed(2)}`;
    document.getElementById('deliveryDate').textContent = formatDeliveryDate(order.date);

    // Populate order items
    const orderItemsList = document.getElementById('orderItemsList');
    orderItemsList.innerHTML = '';

    order.items.forEach(item => {
        const orderItem = createOrderItem(item);
        orderItemsList.appendChild(orderItem);
    });
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

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatDeliveryDate(orderDateString) {
    const orderDate = new Date(orderDateString);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 5); // 5 days delivery

    return deliveryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
