// ============================================
// cart.js
// This file has all the functions related to the shopping cart.
// The cart is stored in localStorage as an array of objects like:
// { id: 1, name: "Fresh Tomatoes", price: 40, unit: "kg", quantity: 2 }
// ============================================

// Orders qualify for free delivery once the subtotal reaches this amount
var FREE_DELIVERY_MIN = 300;
var DELIVERY_FEE = 40;


// ---------- GET CART FROM LOCALSTORAGE ----------

function getCart() {
  var cartData = localStorage.getItem("cart");

  // If nothing is saved yet, return an empty array
  if (cartData === null) {
    return [];
  }

  // Convert the saved text back into an array
  return JSON.parse(cartData);
}


// ---------- SAVE CART TO LOCALSTORAGE ----------

function saveCart(cartItems) {
  // Convert the array into text so it can be saved
  localStorage.setItem("cart", JSON.stringify(cartItems));
}


// ---------- ADD PRODUCT TO CART ----------

function addToCart(product, quantity) {

  var cartItems = getCart();
  var alreadyInCart = false;

  // Check if this product is already in the cart
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === product.id) {
      // If it is already there, just increase the quantity
      cartItems[i].quantity = cartItems[i].quantity + quantity;
      alreadyInCart = true;
    }
  }

  // If the product was not already in the cart, add it as a new item
  if (alreadyInCart === false) {
    var newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.image,
      quantity: quantity
    };
    cartItems.push(newItem);
  }

  saveCart(cartItems);
  updateCartCount();
  alert(product.name + " added to cart!");
}


// ---------- ADD TO CART, BUT CHECK LOGIN FIRST ----------
// This is the function the buttons on the home, products and
// product details pages should call. requireLogin() comes from main.js.

function handleAddToCart(product, quantity) {
  if (requireLogin() === false) {
    return;
  }
  addToCart(product, quantity);
}


// ---------- REMOVE PRODUCT FROM CART ----------

function removeFromCart(productId) {
  var cartItems = getCart();
  var updatedCart = [];

  // Rebuild the array without the item we want to remove
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id !== productId) {
      updatedCart.push(cartItems[i]);
    }
  }

  saveCart(updatedCart);
  displayCartItems();
  updateCartCount();
}


// ---------- INCREASE / DECREASE QUANTITY ----------

function changeQuantity(productId, change) {
  var cartItems = getCart();

  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === productId) {
      cartItems[i].quantity = cartItems[i].quantity + change;

      // Don't let quantity go below 1
      if (cartItems[i].quantity < 1) {
        cartItems[i].quantity = 1;
      }
    }
  }

  saveCart(cartItems);
  displayCartItems();
  updateCartCount();
}


// ---------- CALCULATE SUBTOTAL / DELIVERY / GRAND TOTAL ----------

function getCartSubtotal() {
  var cartItems = getCart();
  var subtotal = 0;

  for (var i = 0; i < cartItems.length; i++) {
    subtotal = subtotal + (cartItems[i].price * cartItems[i].quantity);
  }

  return subtotal;
}

function getDeliveryFee() {
  var subtotal = getCartSubtotal();

  // Free delivery once the order is big enough
  if (subtotal === 0 || subtotal >= FREE_DELIVERY_MIN) {
    return 0;
  }

  return DELIVERY_FEE;
}

function getCartTotal() {
  return getCartSubtotal() + getDeliveryFee();
}


// ---------- DISPLAY CART ITEMS ON CART PAGE ----------
// This function only runs if the cart page elements exist

function displayCartItems() {

  var cartContainer = document.getElementById("cartItemsContainer");

  // If we are not on the cart page, stop here
  if (cartContainer === null) {
    return;
  }

  var cartItems = getCart();
  var checkoutBtn = document.getElementById("checkoutBtn");

  // Clear the container first
  cartContainer.innerHTML = "";

  // If cart is empty, show a friendly message and stop
  if (cartItems.length === 0) {
    cartContainer.innerHTML =
      "<div class='empty-cart-msg'>" +
      "<p>Your cart is feeling lonely \uD83C\uDF31</p>" +
      "<a class='btn-primary' href='products.html'>Browse Products</a>" +
      "</div>";

    document.getElementById("subtotalValue").textContent = "0";
    document.getElementById("deliveryValue").textContent = "0";
    document.getElementById("grandTotal").textContent = "0";

    if (checkoutBtn !== null) {
      checkoutBtn.classList.add("btn-disabled");
      checkoutBtn.disabled = true;
    }
    return;
  }

  // Loop through each item and create HTML for it
  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var itemTotal = item.price * item.quantity;

    var itemHTML = "<div class='cart-item'>" +
      "<img src='" + item.image + "' alt='" + item.name + "'>" +
      "<div class='cart-item-info'>" +
      "<h3>" + item.name + "</h3>" +
      "<p>Price: \u20B9" + item.price + " / " + item.unit + "</p>" +
      "</div>" +
      "<div class='qty-controls'>" +
      "<button onclick='changeQuantity(" + item.id + ", -1)'>-</button>" +
      "<span>" + item.quantity + "</span>" +
      "<button onclick='changeQuantity(" + item.id + ", 1)'>+</button>" +
      "</div>" +
      "<p class='item-total'>\u20B9" + itemTotal + "</p>" +
      "<button class='remove-btn' onclick='removeFromCart(" + item.id + ")'>Remove</button>" +
      "</div>";

    cartContainer.innerHTML = cartContainer.innerHTML + itemHTML;
  }

  // Update the subtotal / delivery / grand total text
  document.getElementById("subtotalValue").textContent = getCartSubtotal();
  document.getElementById("deliveryValue").textContent = getDeliveryFee();
  document.getElementById("grandTotal").textContent = getCartTotal();

  if (checkoutBtn !== null) {
    checkoutBtn.classList.remove("btn-disabled");
    checkoutBtn.disabled = false;
  }
}


// ---------- CHECKOUT BUTTON ----------
// The cart page no longer places the order itself - it just sends
// the shopper on to the payment page, where the real order flow happens.

function checkout() {
  var cartItems = getCart();

  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  window.location.href = "payment.html";
}


// Run this when the cart page loads (safe to call on every page,
// it just does nothing if cart elements are not found)
displayCartItems();
