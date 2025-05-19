// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Navigation Functionality
    // ======================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');
    const navItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling and section switching
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active-section');
            });
            
            // Show target section
            targetSection.classList.add('active-section');
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Update active nav link
            navItems.forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Set home as active by default
    document.querySelector('.nav-link[href="#home"]').classList.add('active');
    document.getElementById('home').classList.add('active-section');

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ======================
    // Form Validation
    // ======================
    const contactForm = document.getElementById('contactForm');
    const reservationForm = document.getElementById('reservationForm');
    const checkoutForm = document.getElementById('checkoutForm');

    // Contact Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const formMessage = document.getElementById('formMessage');
            
            let isValid = true;
            
            // Reset previous errors
            formMessage.textContent = '';
            formMessage.classList.remove('success', 'error');
            
            // Validate name
            if (name.value.trim() === '') {
                isValid = false;
                name.style.borderColor = 'var(--error-color)';
            } else {
                name.style.borderColor = '#ddd';
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                isValid = false;
                email.style.borderColor = 'var(--error-color)';
            } else {
                email.style.borderColor = '#ddd';
            }
            
            // Validate message
            if (message.value.trim() === '') {
                isValid = false;
                message.style.borderColor = 'var(--error-color)';
            } else {
                message.style.borderColor = '#ddd';
            }
            
            if (isValid) {
                // Simulate form submission
                formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                formMessage.classList.add('success');
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                formMessage.textContent = 'Please fill out all required fields correctly.';
                formMessage.classList.add('error');
            }
        });
    }

    // Reservation Form Validation
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reserve-name');
            const email = document.getElementById('reserve-email');
            const phone = document.getElementById('reserve-phone');
            const date = document.getElementById('reserve-date');
            const time = document.getElementById('reserve-time');
            const guests = document.getElementById('reserve-guests');
            const formMessage = document.getElementById('reservationMessage');
            
            let isValid = true;
            
            // Reset previous errors
            formMessage.textContent = '';
            formMessage.classList.remove('success', 'error');
            
            // Validate name
            if (name.value.trim() === '') {
                isValid = false;
                name.style.borderColor = 'var(--error-color)';
            } else {
                name.style.borderColor = '#ddd';
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                isValid = false;
                email.style.borderColor = 'var(--error-color)';
            } else {
                email.style.borderColor = '#ddd';
            }
            
            // Validate phone
            const phoneRegex = /^[0-9]{10,15}$/;
            if (!phoneRegex.test(phone.value)) {
                isValid = false;
                phone.style.borderColor = 'var(--error-color)';
            } else {
                phone.style.borderColor = '#ddd';
            }
            
            // Validate date
            if (date.value === '') {
                isValid = false;
                date.style.borderColor = 'var(--error-color)';
            } else {
                date.style.borderColor = '#ddd';
            }
            
            // Validate time
            if (time.value === '') {
                isValid = false;
                time.style.borderColor = 'var(--error-color)';
            } else {
                time.style.borderColor = '#ddd';
            }
            
            // Validate guests
            if (guests.value === '') {
                isValid = false;
                guests.style.borderColor = 'var(--error-color)';
            } else {
                guests.style.borderColor = '#ddd';
            }
            
            if (isValid) {
                // Simulate form submission
                formMessage.textContent = 'Your reservation has been received! We will confirm shortly.';
                formMessage.classList.add('success');
                reservationForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                formMessage.textContent = 'Please fill out all required fields correctly.';
                formMessage.classList.add('error');
            }
        });
    }

    // ======================
    // Menu Filtering
    // ======================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Filter menu items
                menuItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ======================
    // Shopping Cart Functionality
    // ======================
    let cart = [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeModal = document.querySelector('.close-modal');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeConfirmation = document.getElementById('close-confirmation');
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const deliveryFee = document.getElementById('delivery-fee');
    const checkoutTotal = document.getElementById('checkout-total');

    // Add to cart functionality
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.getAttribute('data-name');
                const itemPrice = parseFloat(this.getAttribute('data-price'));
                
                // Check if item already exists in cart
                const existingItem = cart.find(item => item.name === itemName);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        name: itemName,
                        price: itemPrice,
                        quantity: 1
                    });
                }
                
                updateCart();
                
                // Show success animation
                this.textContent = 'Added!';
                this.style.backgroundColor = 'var(--success-color)';
                
                setTimeout(() => {
                    this.textContent = 'Add to Order';
                    this.style.backgroundColor = 'var(--primary-color)';
                }, 1000);
            });
        });
    }

    // Update cart display
    function updateCart() {
        // Clear cart display
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            checkoutBtn.disabled = true;
            cartSubtotal.textContent = '₱0';
        } else {
            let subtotal = 0;
            
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₱${itemTotal.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <div class="cart-item-remove" data-index="${index}"><i class="fas fa-times"></i></div>
                `;
                
                cartItemsContainer.appendChild(cartItem);
            });
            
            // Update subtotal
            cartSubtotal.textContent = `₱${subtotal.toFixed(2)}`;
            checkoutBtn.disabled = false;
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.quantity-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    const isPlus = this.classList.contains('plus');
                    const isMinus = this.classList.contains('minus');
                    
                    if (isPlus) {
                        cart[index].quantity += 1;
                    } else if (isMinus) {
                        if (cart[index].quantity > 1) {
                            cart[index].quantity -= 1;
                        } else {
                            cart.splice(index, 1);
                        }
                    }
                    
                    updateCart();
                });
            });
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.cart-item-remove').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    cart.splice(index, 1);
                    updateCart();
                });
            });
        }
    }

    // Delivery option change
    deliveryOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateCheckoutSummary();
        });
    });

    // Update checkout summary
    function updateCheckoutSummary() {
        let subtotal = 0;
        checkoutItems.innerHTML = '';
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-item';
            itemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>₱${itemTotal.toFixed(2)}</span>
            `;
            
            checkoutItems.appendChild(itemElement);
        });
        
        // Calculate delivery fee
        const isDelivery = document.querySelector('input[name="delivery"]:checked').value === 'delivery';
        const fee = isDelivery ? 50 : 0;
        
        checkoutSubtotal.textContent = `₱${subtotal.toFixed(2)}`;
        deliveryFee.textContent = `₱${fee.toFixed(2)}`;
        checkoutTotal.textContent = `₱${(subtotal + fee).toFixed(2)}`;
    }

    // Checkout button click
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            updateCheckoutSummary();
            checkoutModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            checkoutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close confirmation modal
    if (closeConfirmation) {
        closeConfirmation.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Checkout form submission
if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('checkout-name');
        const phone = document.getElementById('checkout-phone');
        const isDelivery = document.querySelector('input[name="delivery"]:checked').value === 'delivery';
        const address = document.getElementById('checkout-address');
        
        let isValid = true;
        
        // Simple validation
        if (name.value.trim() === '') {
            isValid = false;
            name.style.borderColor = 'var(--error-color)';
        } else {
            name.style.borderColor = '#ddd';
        }
        
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phone.value)) {
            isValid = false;
            phone.style.borderColor = 'var(--error-color)';
        } else {
            phone.style.borderColor = '#ddd';
        }
        
        if (isDelivery && address.value.trim() === '') {
            isValid = false;
            address.style.borderColor = 'var(--error-color)';
        } else {
            address.style.borderColor = '#ddd';
        }
        
        if (isValid) {
            // Generate random order reference
            const orderRef = 'SB-' + Math.floor(10000 + Math.random() * 90000);
            document.getElementById('order-reference').textContent = orderRef;
            
            // Show confirmation modal
            checkoutModal.style.display = 'none';
            confirmationModal.style.display = 'block';
            
            // Clear cart
            cart = [];
            updateCart();
            
            // Reset form
            checkoutForm.reset();
        }
    });
}

// Add this event listener for closing the confirmation modal
document.getElementById('close-confirmation').addEventListener('click', function() {
    document.getElementById('confirmation-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Also add click outside to close functionality
window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('confirmation-modal')) {
        document.getElementById('confirmation-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === checkoutModal) {
            checkoutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ======================
    // Google Maps Integration
    // ======================
    function initMap() {
        // This function would be called by the Google Maps API
        // Replace with your actual map initialization code
        console.log('Map would be initialized here');
    }

    // Load Google Maps API (replace with your actual API key)
    function loadGoogleMaps() {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }

    // Only load if map container exists
    if (document.querySelector('.map-container')) {
        loadGoogleMaps();
    }

    // ======================
    // Scroll Animations
    // ======================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('show');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    
});