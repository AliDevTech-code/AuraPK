// WhatsApp Number - Replace with your actual number
const WHATSAPP_NUMBER = "923063159899"; // Format: countrycode + number (without +)

// DOM Elements
const loader = document.querySelector('.loader');
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('quickViewModal');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle overlay
        const overlay = document.querySelector('.menu-overlay');
        if (overlay) {
            overlay.classList.toggle('active');
        }
        
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking overlay
    document.querySelectorAll('.menu-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Remove overlay
            const overlay = document.querySelector('.menu-overlay');
            if (overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // Scroll animations
    initScrollAnimations();

    // Smooth scroll for anchor links
    initSmoothScroll();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Order via WhatsApp
function orderViaWhatsApp(productName, price, size = '30ml', qty = 1) {
    const total = (price * qty).toFixed(2);
    const message = `*Hello Luxe Fragrances!* 🙏

I'd like to order:
📦 *Product:* ${productName}
📏 *Size:* ${size}
🔢 *Quantity:* ${qty}
💰 *Total Price:* Rs ${total.toLocaleString()}

Please confirm my order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Quick View Modal Variables
let currentQty = 1;
let currentSize = '30ml';
let currentBasePrice = 0;
let currentSizePrice = 0;

function quickView(name, price, description, imageUrl) {
    currentQty = 1;
    currentSize = '30ml';
    currentBasePrice = price;
    currentSizePrice = 0;
    
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalPrice').textContent = `Rs ${price.toLocaleString()}`;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalImage').src = imageUrl;
    document.getElementById('modalQty').textContent = '1';
    
    // Reset size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === '30ml') {
            btn.classList.add('active');
        }
    });
    
    updateTotal();
    
    // Update order button
    const orderBtn = document.getElementById('modalOrderBtn');
    orderBtn.onclick = function() {
        const totalPrice = (currentBasePrice + currentSizePrice) * currentQty;
        orderViaWhatsApp(name, totalPrice, currentSize, currentQty);
    };
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Change Quantity
function changeQty(change) {
    const newQty = currentQty + change;
    if (newQty >= 1 && newQty <= 10) {
        currentQty = newQty;
        document.getElementById('modalQty').textContent = currentQty;
        updateTotal();
    }
}

// Update Total Price
function updateTotal() {
    const total = (currentBasePrice + currentSizePrice) * currentQty;
    document.getElementById('modalTotal').textContent = `Total: Rs ${total.toLocaleString()}`;
}

// Size Selection
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('size-btn')) {
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        currentSize = e.target.dataset.size;
        currentSizePrice = parseFloat(e.target.dataset.price);
        
        document.getElementById('modalPrice').textContent = `Rs ${(currentBasePrice + currentSizePrice).toLocaleString()}`;
        updateTotal();
    }
});

// Close Modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Go to Checkout
function goToCheckout(name, price, image) {
    const imageUrl = image || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400';
    window.location.href = `checkout.html?product=${encodeURIComponent(name)}&price=${price}&image=${encodeURIComponent(imageUrl)}`;
}

// Add to Cart
function addToCart(name, price) {
    // Store in localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.qty = (existingItem.qty || 1) + 1;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count in navbar
    updateCartCount();
    
    // Show custom toast notification
    showToast(name, price);
}

// Custom Toast Notification
function showToast(productName, price) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="toast-content">
            <h4>Added to Cart!</h4>
            <p>${productName} - Rs ${price.toLocaleString()}</p>
        </div>
        <div class="toast-actions">
            <button class="btn-view-cart" onclick="window.location.href='cart.html'">
                View Cart
            </button>
            <button class="btn-continue" onclick="this.parentElement.parentElement.remove()">
                Continue
            </button>
        </div>
    `;

    // Add toast styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .custom-toast {
            position: fixed;
            top: 90px;
            right: 20px;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: white;
            padding: 1.2rem;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 1rem;
            min-width: 320px;
            animation: slideIn 0.4s ease, fadeOut 0.4s ease 3.5s forwards;
            border-left: 4px solid #d4af37;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .toast-icon {
            width: 45px;
            height: 45px;
            background: linear-gradient(135deg, #d4af37, #b8962e);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
            color: #1a1a2e;
            flex-shrink: 0;
        }
        
        .toast-content {
            flex: 1;
        }
        
        .toast-content h4 {
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 0.2rem;
            color: #d4af37;
        }
        
        .toast-content p {
            font-size: 0.85rem;
            color: #ccc;
            margin: 0;
        }
        
        .toast-actions {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .btn-view-cart {
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #d4af37, #b8962e);
            color: #1a1a2e;
            border: none;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-view-cart:hover {
            transform: scale(1.05);
            box-shadow: 0 3px 10px rgba(212, 175, 55, 0.4);
        }
        
        .btn-continue {
            padding: 0.4rem 1rem;
            background: transparent;
            color: #999;
            border: 1px solid #444;
            border-radius: 6px;
            font-size: 0.75rem;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-continue:hover {
            background: rgba(255,255,255,0.1);
            color: white;
        }
        
        @media (max-width: 480px) {
            .custom-toast {
                right: 10px;
                left: 10px;
                min-width: auto;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(toast);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 4000);
}

// Update Cart Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQty = 0;
    cart.forEach(item => {
        totalQty += item.qty || 1;
    });
    
    // Update all cart count elements
    document.querySelectorAll('#cartCount').forEach(el => {
        el.textContent = totalQty;
    });
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Newsletter Subscription
function subscribeNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    
    // Show success message
    alert(`Thank you for subscribing with email: ${email}`);
    e.target.reset();
    
    // Optionally send to WhatsApp
    const message = `*New Newsletter Subscription*\n\nEmail: ${email}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    return false;
}

// Add to cart animation
document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create floating animation
        const rect = this.getBoundingClientRect();
        const floatingBtn = document.createElement('button');
        floatingBtn.innerHTML = '<i class="fas fa-shopping-cart"></i>';
        floatingBtn.style.cssText = `
            position: fixed;
            top: ${rect.top}px;
            left: ${rect.left}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            background: #25D366;
            color: white;
            border: none;
            border-radius: 8px;
            z-index: 9999;
            pointer-events: none;
            animation: floatToCart 1s ease forwards;
        `;
        
        document.body.appendChild(floatingBtn);
        
        setTimeout(() => {
            floatingBtn.remove();
        }, 1000);
    });
});

// Add float animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatToCart {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) translateY(-100px);
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };

        // Set data-target if not set
        if (!counter.hasAttribute('data-target')) {
            const text = counter.innerText;
            counter.setAttribute('data-target', text.replace(/\D/g, ''));
            counter.innerText = '0';
        }

        // Start animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        });

        observer.observe(counter);
    });
}

// Initialize counters when DOM loaded
document.addEventListener('DOMContentLoaded', animateCounters);

// Mobile menu animation
navToggle.addEventListener('click', () => {
    const spans = navToggle.querySelectorAll('span');
    
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Preload images
function preloadImages() {
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        const src = img.src;
        if (src) {
            const preloader = new Image();
            preloader.src = src;
        }
    });
}

document.addEventListener('DOMContentLoaded', preloadImages);

// Lazy load fallback for older browsers
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
} else {
    // Fallback - load all images immediately
    document.addEventListener('DOMContentLoaded', preloadImages);
}
