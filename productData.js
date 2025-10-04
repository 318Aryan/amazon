// Product Data and Management
const PRODUCTS = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 6639,
        originalPrice: 8299,
        discount: 20,
        image: "./assets/product2-1.jpg",
        images: ["./assets/product2-1.jpg", "./assets/product2-2.jpg", "./assets/product2-3.jpg"],
        category: "Electronics",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        rating: 4.5,
        reviews: 1284,
        inStock: true,
        features: ["Noise Cancellation", "30hr Battery", "Bluetooth 5.0", "Quick Charge"]
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: 12449,
        originalPrice: 199.99,
        discount: 25,
        image: "./assets/product2-2.jpg",
        images: ["./assets/product2-2.jpg", "./assets/product2-3.jpg", "./assets/product2-4.jpg"],
        category: "Electronics",
        description: "Advanced fitness tracking with heart rate monitoring, GPS, and water resistance.",
        rating: 4.3,
        reviews: 892,
        inStock: true,
        features: ["Heart Rate Monitor", "GPS", "Water Resistant", "7-day Battery"]
    },
    {
        id: 3,
        name: "Portable Phone Charger",
        price: 2074,
        originalPrice: 34.99,
        discount: 29,
        image: "./assets/product2-3.jpg",
        images: ["./assets/product2-3.jpg", "./assets/product2-4.jpg", "./assets/product2-5.jpg"],
        category: "Electronics",
        description: "10000mAh portable charger with fast charging and multiple device support.",
        rating: 4.7,
        reviews: 2156,
        inStock: true,
        features: ["10000mAh", "Fast Charge", "Multi-Device", "LED Display"]
    },
    {
        id: 4,
        name: "Ergonomic Office Chair",
        price: 16599,
        originalPrice: 299.99,
        discount: 33,
        image: "./assets/product2-4.jpg",
        images: ["./assets/product2-4.jpg", "./assets/product2-5.jpg", "./assets/product2-6.jpg"],
        category: "Furniture",
        description: "Comfortable ergonomic chair with lumbar support and adjustable height.",
        rating: 4.4,
        reviews: 567,
        inStock: true,
        features: ["Lumbar Support", "Adjustable Height", "Breathable Mesh", "5-year Warranty"]
    },
    {
        id: 5,
        name: "Coffee Maker Machine",
        price: 7469,
        originalPrice: 129.99,
        discount: 31,
        image: "./assets/product2-5.jpg",
        images: ["./assets/product2-5.jpg", "./assets/product2-6.jpg", "./assets/product2-7.jpg"],
        category: "Home & Kitchen",
        description: "Programmable coffee maker with 12-cup capacity and auto-shutoff feature.",
        rating: 4.6,
        reviews: 1234,
        inStock: true,
        features: ["12-cup Capacity", "Programmable", "Auto-shutoff", "Permanent Filter"]
    },
    {
        id: 6,
        name: "Yoga Mat Premium",
        price: 3319,
        originalPrice: 59.99,
        discount: 33,
        image: "./assets/product2-6.jpg",
        images: ["./assets/product2-6.jpg", "./assets/product2-7.jpg", "./assets/product2-8.jpg"],
        category: "Sports & Outdoors",
        description: "Non-slip yoga mat with extra thickness and carrying strap included.",
        rating: 4.8,
        reviews: 987,
        inStock: true,
        features: ["Non-slip", "Extra Thick", "Carrying Strap", "Eco-friendly"]
    },
    {
        id: 7,
        name: "LED Desk Lamp",
        price: 3817,
        originalPrice: 65.99,
        discount: 30,
        image: "./assets/product2-7.jpg",
        images: ["./assets/product2-7.jpg", "./assets/product2-8.jpg", "./assets/product2-9.jpg"],
        category: "Home & Kitchen",
        description: "Adjustable LED desk lamp with touch control and USB charging port.",
        rating: 4.5,
        reviews: 756,
        inStock: true,
        features: ["Touch Control", "USB Port", "Adjustable", "Eye-friendly"]
    },
    {
        id: 8,
        name: "Bluetooth Speaker",
        price: 4979,
        originalPrice: 79.99,
        discount: 25,
        image: "./assets/product2-8.jpg",
        images: ["./assets/product2-8.jpg", "./assets/product2-9.jpg", "./assets/product2-10.jpg"],
        category: "Electronics",
        description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
        rating: 4.4,
        reviews: 1123,
        inStock: true,
        features: ["360° Sound", "Waterproof", "12hr Battery", "Voice Assistant"]
    },
    {
        id: 9,
        name: "Kitchen Knife Set",
        price: 6639,
        originalPrice: 119.99,
        discount: 33,
        image: "./assets/product2-9.jpg",
        images: ["./assets/product2-9.jpg", "./assets/product2-10.jpg", "./assets/product2-11.jpg"],
        category: "Home & Kitchen",
        description: "Professional 8-piece knife set with wooden block and sharpening steel.",
        rating: 4.7,
        reviews: 445,
        inStock: true,
        features: ["8-piece Set", "Wooden Block", "Sharpening Steel", "Stainless Steel"]
    },
    {
        id: 10,
        name: "Travel Backpack",
        price: 5809,
        originalPrice: 99.99,
        discount: 30,
        image: "./assets/product2-10.jpg",
        images: ["./assets/product2-10.jpg", "./assets/product2-11.jpg", "./assets/product2-12.jpg"],
        category: "Sports & Outdoors",
        description: "Durable travel backpack with laptop compartment and multiple pockets.",
        rating: 4.6,
        reviews: 678,
        inStock: true,
        features: ["Laptop Compartment", "Multiple Pockets", "Water Resistant", "Lifetime Warranty"]
    },
    {
        id: 11,
        name: "Smart Home Hub",
        price: 10789,
        originalPrice: 179.99,
        discount: 28,
        image: "./assets/product2-11.jpg",
        images: ["./assets/product2-11.jpg", "./assets/product2-12.jpg", "./assets/product2-1.jpg"],
        category: "Electronics",
        description: "Smart home hub with voice control and compatibility with 100+ devices.",
        rating: 4.3,
        reviews: 334,
        inStock: true,
        features: ["Voice Control", "100+ Devices", "WiFi", "Mobile App"]
    },
    {
        id: 12,
        name: "Gaming Mouse Pad",
        price: 1659,
        originalPrice: 29.99,
        discount: 33,
        image: "./assets/product2-12.jpg",
        images: ["./assets/product2-12.jpg", "./assets/product2-1.jpg", "./assets/product2-2.jpg"],
        category: "Electronics",
        description: "Large gaming mouse pad with RGB lighting and non-slip base.",
        rating: 4.5,
        reviews: 892,
        inStock: true,
        features: ["RGB Lighting", "Non-slip Base", "Large Size", "Gaming Optimized"]
    },
    // Sports & Outdoors Products
    {
        id: 101,
        name: "Professional Basketball",
        price: 29.99,
        originalPrice: 39.99,
        discount: 25,
        image: "./assets/product_img.jpg",
        images: ["./assets/product_img.jpg", "./assets/product1-1.jpg"],
        category: "Sports",
        description: "Official size and weight basketball for professional play with premium leather construction.",
        rating: 4.6,
        reviews: 342,
        inStock: true,
        features: ["Official Size", "Premium Leather", "Indoor/Outdoor", "Grip Technology"]
    },
    {
        id: 102,
        name: "Yoga Mat Premium",
        price: 3817,
        originalPrice: 59.99,
        discount: 23,
        image: "./assets/product1-1.jpg",
        images: ["./assets/product1-1.jpg", "./assets/product1-2.jpg"],
        category: "Sports",
        description: "Extra thick non-slip yoga mat with carrying strap and alignment lines.",
        rating: 4.4,
        reviews: 567,
        inStock: true,
        features: ["6mm Thick", "Non-Slip", "Carrying Strap", "Alignment Lines"]
    },
    {
        id: 103,
        name: "Resistance Bands Set",
        price: 1659,
        originalPrice: 29.99,
        discount: 33,
        image: "./assets/product1-2.jpg",
        images: ["./assets/product1-2.jpg", "./assets/product1-3.jpg"],
        category: "Sports",
        description: "Complete set of resistance bands for strength training and physical therapy.",
        rating: 4.5,
        reviews: 234,
        inStock: true,
        features: ["5 Resistance Levels", "Door Anchor", "Exercise Guide", "Storage Bag"]
    },
    {
        id: 104,
        name: "Running Shoes Lightweight",
        price: 7469,
        originalPrice: 119.99,
        discount: 25,
        image: "./assets/product1-3.jpg",
        images: ["./assets/product1-3.jpg", "./assets/product1-4.jpg"],
        category: "Sports",
        description: "Lightweight running shoes with responsive cushioning and breathable mesh upper.",
        rating: 4.7,
        reviews: 891,
        inStock: true,
        features: ["Lightweight", "Responsive Cushion", "Breathable", "Durable Outsole"]
    },
    {
        id: 105,
        name: "Water Bottle Insulated",
        price: 2074,
        originalPrice: 34.99,
        discount: 29,
        image: "./assets/product1-4.jpg",
        images: ["./assets/product1-4.jpg", "./assets/product1-5.jpg"],
        category: "Sports",
        description: "Stainless steel insulated water bottle that keeps drinks cold for 24 hours.",
        rating: 4.3,
        reviews: 456,
        inStock: true,
        features: ["24hr Cold", "Stainless Steel", "Leak Proof", "BPA Free"]
    },
    {
        id: 106,
        name: "Tennis Racket Pro",
        price: 10789,
        originalPrice: 179.99,
        discount: 28,
        image: "./assets/product1-5.jpg",
        images: ["./assets/product1-5.jpg", "./assets/product1-6.jpg"],
        category: "Sports",
        description: "Professional tennis racket with carbon fiber construction and advanced string technology.",
        rating: 4.8,
        reviews: 123,
        inStock: true,
        features: ["Carbon Fiber", "Advanced Strings", "Ergonomic Grip", "Professional Grade"]
    },
    {
        id: 107,
        name: "Camping Tent 4-Person",
        price: 12449,
        originalPrice: 199.99,
        discount: 25,
        image: "./assets/product1-6.jpg",
        images: ["./assets/product1-6.jpg", "./assets/product1-7.jpg"],
        category: "Sports",
        description: "Weather-resistant 4-person camping tent with easy setup and durable construction.",
        rating: 4.2,
        reviews: 234,
        inStock: true,
        features: ["4-Person", "Weather Resistant", "Easy Setup", "Durable"]
    },
    {
        id: 108,
        name: "Hiking Backpack 40L",
        price: 6639,
        originalPrice: 109.99,
        discount: 27,
        image: "./assets/product1-7.jpg",
        images: ["./assets/product1-7.jpg", "./assets/product1-8.jpg"],
        category: "Sports",
        description: "Lightweight hiking backpack with multiple compartments and adjustable straps.",
        rating: 4.6,
        reviews: 345,
        inStock: true,
        features: ["40L Capacity", "Lightweight", "Multiple Pockets", "Adjustable Straps"]
    },
    {
        id: 109,
        name: "Swimming Goggles Anti-Fog",
        price: 1659,
        originalPrice: 29.99,
        discount: 33,
        image: "./assets/product1-8.jpg",
        images: ["./assets/product1-8.jpg", "./assets/product1-9.jpg"],
        category: "Sports",
        description: "Anti-fog swimming goggles with UV protection and comfortable silicone seal.",
        rating: 4.4,
        reviews: 678,
        inStock: true,
        features: ["Anti-Fog", "UV Protection", "Silicone Seal", "Adjustable Strap"]
    },
    {
        id: 110,
        name: "Jump Rope Speed",
        price: 14.99,
        originalPrice: 24.99,
        discount: 40,
        image: "./assets/product1-9.jpg",
        images: ["./assets/product1-9.jpg", "./assets/product1-10.jpg"],
        category: "Sports",
        description: "High-speed jump rope with adjustable length and comfortable foam handles.",
        rating: 4.5,
        reviews: 189,
        inStock: true,
        features: ["Adjustable Length", "Foam Handles", "High Speed", "Durable Cable"]
    },
    {
        id: 111,
        name: "Golf Set Complete",
        price: 16599,
        originalPrice: 299.99,
        discount: 33,
        image: "./assets/product1-10.jpg",
        images: ["./assets/product1-10.jpg", "./assets/product1-1.jpg"],
        category: "Sports",
        description: "Complete golf set with driver, irons, putter, and golf bag for beginners.",
        rating: 4.3,
        reviews: 89,
        inStock: true,
        features: ["Complete Set", "Driver & Irons", "Golf Bag", "Beginner Friendly"]
    }
];

// Product Management Class
class ProductManager {
    constructor() {
        this.products = PRODUCTS;
        this.cart = this.loadCart();
        this.wishlist = this.loadWishlist();
    }

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    loadWishlist() {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }

    getProductById(id) {
        return this.products.find(product => product.id === parseInt(id));
    }

    getProductsByCategory(category) {
        return this.products.filter(product => product.category === category);
    }

    searchProducts(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.products.filter(product =>
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery) ||
            product.category.toLowerCase().includes(lowercaseQuery)
        );
    }

    addToCart(productId, quantity = 1) {
        const product = this.getProductById(productId);
        if (!product) return false;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        this.saveCart();
        return true;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItemCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    addToWishlist(productId) {
        const product = this.getProductById(productId);
        if (!product || this.wishlist.includes(productId)) return false;

        this.wishlist.push(productId);
        this.saveWishlist();
        return true;
    }

    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter(id => id !== productId);
        this.saveWishlist();
    }

    isInWishlist(productId) {
        return this.wishlist.includes(productId);
    }

    getWishlistProducts() {
        return this.wishlist.map(id => this.getProductById(id)).filter(Boolean);
    }

    getCategories() {
        const categories = [...new Set(this.products.map(product => product.category))];
        return categories;
    }

    getFeaturedProducts(limit = 8) {
        return this.products.slice(0, limit);
    }

    getBestSellers(limit = 8) {
        return [...this.products]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    getDealsUnder(price, limit = 8) {
        return this.products
            .filter(product => product.price < price)
            .slice(0, limit);
    }
}

// Initialize product manager
const productManager = new ProductManager();

// Export for use in other files
window.productManager = productManager;
