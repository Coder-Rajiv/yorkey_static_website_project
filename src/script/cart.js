let cart = [];

// Function to add an item to the cart
function addItem(name, price) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
}

// Function to update the quantity of an item in the cart
function updateQuantity(name, quantity) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity = Math.max(1, quantity); // Ensure minimum quantity is 1
        updateCartDisplay();
    }
}

// Function to calculate subtotal, tax, and total
function calculateTotals() {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.10; // Assuming 10% tax rate
    const total = subtotal + tax;
    return { subtotal, tax, total };
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.name}', this.value)">
            <button onclick="removeItem('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    const { subtotal, tax, total } = calculateTotals();
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
}
