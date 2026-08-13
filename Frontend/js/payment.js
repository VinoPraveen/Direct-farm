// ============================================
// payment.js
// This file runs the demo checkout flow on payment.html:
// - Shows an order summary built from the cart
// - Lets the shopper pick a payment method (only COD actually works)
// - Validates the delivery address form
// - "Places" the order: generates an order ID, clears the cart,
//   and shows an order confirmation message
// ============================================


// ---------- IF THE CART IS EMPTY, THERE IS NOTHING TO PAY FOR ----------

var cartItemsForPayment = getCart();

if (cartItemsForPayment.length === 0) {
  alert("Your cart is empty. Add some products before checking out.");
  window.location.href = "products.html";
}


// ---------- DISPLAY THE ORDER SUMMARY ----------

function displayOrderSummary() {

  var summaryContainer = document.getElementById("orderSummaryItems");
  summaryContainer.innerHTML = "";

  for (var i = 0; i < cartItemsForPayment.length; i++) {
    var item = cartItemsForPayment[i];
    var itemTotal = item.price * item.quantity;

    var rowHTML = "<div class='order-item-row'>" +
      "<span>" + item.name + " x " + item.quantity + "</span>" +
      "<span>\u20B9" + itemTotal + "</span>" +
      "</div>";

    summaryContainer.innerHTML = summaryContainer.innerHTML + rowHTML;
  }

  document.getElementById("paySubtotal").textContent = getCartSubtotal();
  document.getElementById("payDelivery").textContent = getDeliveryFee();
  document.getElementById("payTotal").textContent = getCartTotal();
}

displayOrderSummary();


// ---------- PAYMENT METHOD SELECTION ----------
// Only "Cash on Delivery" is a real, clickable option.
// UPI and Card are shown but marked "Coming Soon" and cannot be selected.

var codOption = document.getElementById("methodCOD");
var addressForm = document.getElementById("addressForm");

codOption.addEventListener("click", function () {
  codOption.classList.add("selected");
  addressForm.style.display = "block";
});

// Cash on Delivery is selected by default since it's the only working method
codOption.classList.add("selected");
addressForm.style.display = "block";


// ---------- VALIDATE + PLACE THE ORDER ----------

var placeOrderForm = document.getElementById("placeOrderForm");

placeOrderForm.addEventListener("submit", function (event) {

  event.preventDefault();

  var isFormValid = true;

  var name = document.getElementById("deliveryName").value.trim();
  var phone = document.getElementById("deliveryPhone").value.trim();
  var address = document.getElementById("deliveryAddress").value.trim();
  var city = document.getElementById("deliveryCity").value.trim();
  var state = document.getElementById("deliveryState").value.trim();
  var pincode = document.getElementById("deliveryPincode").value.trim();

  // ---------- FULL NAME ----------
  if (name === "") {
    document.getElementById("deliveryName").classList.add("input-error");
    document.getElementById("deliveryNameError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("deliveryName").classList.remove("input-error");
    document.getElementById("deliveryNameError").style.display = "none";
  }

  // ---------- PHONE (10 digits) ----------
  var phonePattern = /^[0-9]{10}$/;
  if (phonePattern.test(phone) === false) {
    document.getElementById("deliveryPhone").classList.add("input-error");
    document.getElementById("deliveryPhoneError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("deliveryPhone").classList.remove("input-error");
    document.getElementById("deliveryPhoneError").style.display = "none";
  }

  // ---------- ADDRESS ----------
  if (address === "") {
    document.getElementById("deliveryAddress").classList.add("input-error");
    document.getElementById("deliveryAddressError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("deliveryAddress").classList.remove("input-error");
    document.getElementById("deliveryAddressError").style.display = "none";
  }

  // ---------- CITY ----------
  if (city === "") {
    document.getElementById("deliveryCity").classList.add("input-error");
    document.getElementById("deliveryCityError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("deliveryCity").classList.remove("input-error");
    document.getElementById("deliveryCityError").style.display = "none";
  }

  // ---------- STATE ----------
  if (state === "") {
    document.getElementById("deliveryState").classList.add("input-error");
    document.getElementById("deliveryStateError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("deliveryState").classList.remove("input-error");
    document.getElementById("deliveryStateError").style.display = "none";
  }

  // ---------- PINCODE (6 digits) ----------
  var pincodePattern = /^[0-9]{6}$/;
  if (pincodePattern.test(pincode) === false) {
    document.getElementById("deliveryPincode").classList.add("input-error");
    document.getElementById("deliveryPincodeError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("deliveryPincode").classList.remove("input-error");
    document.getElementById("deliveryPincodeError").style.display = "none";
  }

  if (isFormValid === false) {
    return;
  }

  placeOrder();
});


// ---------- GENERATE A SIMPLE ORDER ID ----------
// Example: FD202600123 (FD + current year + a random 5 digit number)

function generateOrderId() {
  var year = new Date().getFullYear();
  var randomPart = Math.floor(10000 + Math.random() * 90000);
  return "FD" + year + randomPart;
}


// ---------- PLACE THE ORDER ----------

function placeOrder() {

  var orderId = generateOrderId();
  var orderTotal = getCartTotal();

  // Fill in the confirmation screen before we clear the cart
  document.getElementById("confirmOrderId").textContent = orderId;
  document.getElementById("confirmOrderTotal").textContent = orderTotal;

  // Hide the payment form, show the confirmation
  document.getElementById("paymentFormView").style.display = "none";
  document.getElementById("orderConfirmationView").style.display = "block";

  // Clear the cart now that the order has been "placed"
  saveCart([]);
  updateCartCount();
}
