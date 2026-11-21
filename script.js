
const services = [
    { id: 1, name: "Dry Cleaning", price: 200 },
    { id: 2, name: "Wash & Fold", price: 150 },
    { id: 3, name: "Ironing", price: 100 },
    { id: 4, name: "Stain Removal", price: 250 },
    { id: 5, name: "Leather Cleaning", price: 500 },
    { id: 6, name: "Wedding Dress Cleaning", price: 800 }
];

let cart = [];

const serviceList = document.getElementById("serviceList");
const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");
const bookButton = document.getElementById("bookButton");

function displayServices() {
    serviceList.innerHTML = "";

    services.forEach(function (service) {
        const serviceDiv = document.createElement("div");
        serviceDiv.className = "service-item";

        serviceDiv.innerHTML = `
            <div>
                <h3>${service.name}</h3>
                <p>₹${service.price.toFixed(2)}</p>
            </div>

            <div class="service-actions">
                <button class="remove-btn">Skip Item</button>
                <button class="add-btn">Add Item</button>
            </div>
        `;

        serviceDiv.querySelector(".add-btn").addEventListener("click", function () {
            addToCart(service);
        });

        serviceDiv.querySelector(".remove-btn").addEventListener("click", function () {
            serviceDiv.remove();
        });

        serviceList.appendChild(serviceDiv);
    });
}

function addToCart(service) {
    cart.push(service);
    displayCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function displayCart() {
    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">No Items Added</p>';
    }

    cart.forEach(function (item, index) {
        total += item.price;

        const cartDiv = document.createElement("div");
        cartDiv.className = "cart-item";

        cartDiv.innerHTML = `
            <span>${item.name} - ₹${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItems.appendChild(cartDiv);
    });

    totalAmount.textContent = "₹" + total.toFixed(2);
    bookButton.disabled = cart.length === 0;
}

function scrollToServices() {
    document.getElementById("services").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("bookingForm").addEventListener("submit", function (event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Please add a service to your cart.");
        return;
    }

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const bookingDetails = {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        services: cart.map(item => item.name).join(", "),
        total_amount: totalAmount.textContent
    };

    document.getElementById("bookingMessage").textContent =
        "Thank you for booking with us! Your booking has been received.";

    alert("Thank you for booking with us, " + name + "!");

    cart = [];
    displayCart();
    this.reset();

    console.log("Booking Details:", bookingDetails);
});

document.getElementById("newsletterForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("subscriberName").value.trim();

    document.getElementById("newsletterMessage").textContent =
        "Thank you for subscribing, " + name + "!";

    this.reset();
});

displayServices();
displayCart();
