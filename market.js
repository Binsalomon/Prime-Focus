 // Sample product data
 const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "High-quality wireless headphones noise cancellation",
        price: 60000 ,
        image: "images/air (3).jpg",
        images: [
            "images/air (1).jpg",
            "images/air (2).jpg",
            "images/air (4).jpg"
        ],
        longDescription: "These premium wireless headphones feature active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and frequent travelers."
    },
    {
        id: 2,
        name: "Smart Watch",
        description: "Fitness tracker with heart rate monitor",
        price: 80000 , 
        image: "images/w (3).jpg",
        images: [
            "images/w (2).jpg",
            "images/w (1).jpg",
            "images/w (3).jpg"
        ],
        longDescription: "Stay connected and track your fitness with this advanced smartwatch. Features include heart rate monitoring, GPS tracking, sleep analysis, and smartphone notifications."
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        description: "Portable speaker with 20-hour battery",
        price: 200000,
        image: "images/gbl (1).jpg",
        images: [
           "images/gbl (2).jpg",
           "images/gbl (3).jpg",
           "images/gbl (4).jpg"
        ],
        longDescription: "Take your music anywhere with this rugged, waterproof Bluetooth speaker. Delivers powerful sound with deep bass and features a 20-hour rechargeable battery."
    },
    {
        id: 4,
        name: "Laptop Backpack",
        description: "Durable backpack with USB charging port",
        price: 50000,
        image: "images/bag (1).jpg",
        images: [
            "images/bag (2).jpg",
            "images/bag (3).jpg",
            "images/bag (4).jpg"
        ],
        longDescription: "This spacious backpack fits up to 15.6-inch laptops and features a built-in USB charging port, multiple compartments, and comfortable padded straps for all-day wear."
    },
    {
        id: 5,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with silent click",
        price: 20000,
        image: "images/mo (2).jpg",
        images: [
            "images/mo (1).jpg",
            "images/mo (3).jpg",
            "images/mo (4).jpg"
        ],
        longDescription: "Work in peace with this ergonomic wireless mouse featuring silent click technology. The comfortable design reduces wrist strain during long work sessions."
    },
    {
        id: 6,
        name: "4K Action Camera",
        description: "Waterproof camera with 4K video",
        price: 800000,
        image: "images/4k (2).jpg",
        images: [
            "images/4k (1).jpg",
            "images/4k (3).jpg",
            "images/4k (4).jpg"
        ],
        longDescription: "Capture your adventures in stunning 4K resolution with this waterproof action camera. Includes image stabilization, voice control, and a variety of mounting accessories."
    },
    {
        id: 7,
        name: "Hp laptop i7",
        description: "Hp laptop i7 13 Gn ...",
        price: 1500000 ,
        image: "images/hp (2).jpg",
        images: [
            "images/hp (1).jpg",
            "images/hp (3).jpg",
            "images/hp (4).jpg"
        ],
        longDescription: "Capture your adventures in stunning 4K resolution with this waterproof action camera. Includes image stabilization, voice control, and a variety of mounting accessories."
    },
    {
        id: 8,
        name: "Gaming PC",
        description: "Gaming pc ...",
        price: 1800000,
        image: "images/g (2).jpg",
        images: [
            "images/g (3).jpg",
            "images/g (1).jpg",
            "images/g (4).jpg"
        ],
        longDescription: "Capture your adventures in stunning 4K resolution with this waterproof action camera. Includes image stabilization, voice control, and a variety of mounting accessories."
    }

];

// Cart data
let cart = [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');
const cartIcon = document.querySelector('.cart-icon');
const accountIcon = document.querySelector('.account-icon');
const cartCount = document.querySelector('.cart-count');

// Modal elements
const productModal = document.getElementById('productModal');
const loginModal = document.getElementById('loginModal');
const cartModal = document.getElementById('cartModal');

// Close buttons
const closeButtons = document.querySelectorAll('.close-button');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    
    // Event listeners
    searchButton.addEventListener('click', searchProducts);
    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    cartIcon.addEventListener('click', openCartModal);
    accountIcon.addEventListener('click', openLoginModal);
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});

// Display products
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onclick="openProductModal(${product.id})">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">UGX ${product.price.toFixed()}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Search products
function searchProducts() {
    const searchTerm = searchBar.value.toLowerCase();
    if (searchTerm.trim() === '') {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

// Open product modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('mainProductImage').src = product.images[0];
    document.getElementById('detailName').textContent = product.name;
    document.getElementById('detailPrice').textContent = `UGX ${product.price.toFixed()}`;
    document.getElementById('detailDescription').textContent = product.description;
    document.getElementById('longDescription').textContent = product.longDescription;
    
    const thumbnails = document.querySelectorAll('.thumbnail-container .thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.src = product.images[index] || product.image;
    });
    
    // Set the current product ID on the add to cart button
    document.getElementById('modalAddToCart').setAttribute('data-product-id', product.id);
    document.getElementById('modalAddToCart').onclick = function() {
        addToCart(product.id);
    };
    
    productModal.style.display = 'block';
}

// Change main image in product modal
function changeMainImage(thumbnail) {
    document.getElementById('mainProductImage').src = thumbnail.src;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    // Close product modal if open
    productModal.style.display = 'none';
    
    // Show lightweight notification
    showNotification(`${product.name} added to cart`);
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Make notification visible
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}




// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Open cart modal
function openCartModal() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        document.getElementById('cartTotal').textContent = '0.00';
        cartModal.style.display = 'block';
        return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">UGX ${(item.price * item.quantity).toFixed()} (${item.quantity} x UGX ${item.price.toFixed(3)})</div>
            </div>
            <div class="cart-item-actions">
                <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    document.getElementById('cartTotal').textContent = total.toFixed();
    cartModal.style.display = 'block';
}

// Remove item from cart
// Remove item from cart with confirmation
function removeFromCart(index) {
    const itemToRemove = cart[index];
    
    // Show confirmation dialog
    const shouldRemove = confirm(`Are you sure you want to remove ${itemToRemove.name} from your cart?`);
    
    if (shouldRemove) {
        // Only remove if user confirms
        const removedItem = cart.splice(index, 1)[0];
        updateCartCount();
        openCartModal();
        showNotification(`${removedItem.name} has been removed from your cart`);
    }
    // If user cancels, do nothing
}






// Open login modal
function openLoginModal() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    loginModal.style.display = 'block';
}

// Show register form
function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

// Login function
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    // In a real app, you would send this to your server
    alert('Login successful!');
    loginModal.style.display = 'none';
}

// Register function
function register() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // In a real app, you would send this to your server
    alert('Registration successful! You can now login.');
    showLoginForm();
}



//year updt

document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  });
