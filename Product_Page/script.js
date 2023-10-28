const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");
let itemsAdded = [];

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    loadCartFromLocalStorage();
    attachEventListeners();
    updateTotal();
}

function resetActiveImg() {
    document.querySelectorAll('.hover-container div').forEach((img) => {
        img.classList.remove('active');
    });
}

function handle_addCartItem() {
    let product, title, price, imgSrc;

    if (this.classList.contains('add-cart-btn')) {
        product = this.closest('.product-div');
    } else {
        product = this.closest('.Product-box');
    }

    title = product.querySelector(".product-title").innerHTML;
    price = product.querySelector(".product-price").innerHTML;
    imgSrc = product.querySelector(".product-image").src;

    let newToAdd = { title, price, imgSrc };

    if (itemsAdded.find((el) => el.title == newToAdd.title)) {
        alert("This Item Already Exists!");
        return;
    }

    itemsAdded.push(newToAdd);
    alert("Item successfully added to the cart!");

    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML += CartBoxComponent(title, price, imgSrc);
    saveCartToLocalStorage();
    updateTotal();
}

function handle_removeCart() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el => el.title !== this.parentElement.querySelector('.cart-product-title').innerHTML);
    saveCartToLocalStorage();
    updateTotal();
}


function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);
    saveCartToLocalStorage();
    updateTotal();
}

function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("₹", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });
    total = total.toFixed(2);
    totalElement.innerHTML = "₹" + total;
}

function CartBoxComponent(title, price, imgSrc) {
    return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bx-trash cart-remove'></i>
    </div>`;
}

function loadCartFromLocalStorage() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
        itemsAdded = JSON.parse(storedItems);
        const cartContent = cart.querySelector(".cart-content");
        cartContent.innerHTML = "";
        itemsAdded.forEach(item => {
            cartContent.innerHTML += CartBoxComponent(item.title, item.price, item.imgSrc);
        });
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(itemsAdded));
}

function toggleDropdown() {
    const dropdownContent = document.getElementById("myDropdown");
    dropdownContent.style.display = dropdownContent.style.display === 'none' ? 'block' : 'none';
}

window.onclick = function(event) {
    if (!event.target.matches('button')) {
        const dropdownContent = document.getElementById("myDropdown");
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        }
    }
}


// Reference to the "View Cart" button
const viewCartButton = document.querySelector(".buy-now-btn");

// Event Listener for the "View Cart" button to open the cart
viewCartButton.addEventListener("click", () => cart.classList.add("active"));


viewCartButton.addEventListener("click", () => {
    if(cart.classList.contains("active")) {
        cart.classList.remove("active");
    } else {
        cart.classList.add("active");
    }
});

function attachEventListeners() {
    cartIcon.addEventListener("click", () => cart.classList.add("active"));
    closeCart.addEventListener("click", () => cart.classList.remove("active"));

    // Additional code for "View Cart" button
    const viewCartButton = document.querySelector(".buy-now-btn");
    viewCartButton.addEventListener("click", () => {
        if(cart.classList.contains("active")) {
            cart.classList.remove("active");
        } else {
            cart.classList.add("active");
        }
    });
    function attachEventListeners() {
        cartIcon.addEventListener("click", () => cart.classList.add("active"));
        closeCart.addEventListener("click", () => cart.classList.remove("active"));
    
        cart.querySelector(".cart-content").addEventListener("click", function(event) {
            if (event.target.classList.contains('cart-remove')) {
                handle_removeCart.call(event.target, event);  // Use call to set 'this' to the clicked element
            }
        });
    }

    function handle_changeItemQuantity() {
        console.log("handle_changeItemQuantity triggered");
        console.log("New Value:", this.value);
    
        if (isNaN(this.value) || this.value < 1) {
            this.value = 1;
        }
        this.value = Math.floor(this.value);
        saveCartToLocalStorage();
        updateTotal();
    }

   
    document.querySelectorAll(".cart-remove").forEach(btn => btn.addEventListener("click", handle_removeCart));
    document.querySelectorAll(".cart-quantity").forEach(input => input.addEventListener("change", handle_changeItemQuantity));
   
    document.querySelectorAll(".add-cart, .add-cart-btn").forEach(btn => btn.addEventListener("click", handle_addCartItem));

    const allHoverImages = document.querySelectorAll('.hover-container div img');
    const imgContainer = document.querySelector('.img-container');
    allHoverImages[0].parentElement.classList.add('active');
    allHoverImages.forEach((image) => {
        image.addEventListener('mouseover', () => {
            imgContainer.querySelector('img').src = image.src;
            resetActiveImg();
            image.parentElement.classList.add('active');
        });
    });
}


const buyNowButton = document.querySelector(".btn-buy.color");

buyNowButton.addEventListener("click", () => {
    if(itemsAdded.length <= 0){
        alert("There are no items in the cart!\nPlease add the required items to cart.");
        return;
    }
    
    alert("Order Placed Successfully!");


    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    itemsAdded = [];
    localStorage.removeItem('cartItems');
    updateTotal();
});
