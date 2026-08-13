// ============================================
// main.js
// This file handles things that are shared across every page:
// 1. Mobile menu toggle (hamburger icon)
// 2. Cart count in the navbar
// 3. Login state / navbar (Login/Register vs Logout/Sell Products)
// 4. The "please login" modal used by Add to Cart buttons
// ============================================


// ---------- MOBILE MENU TOGGLE ----------

// Get the hamburger button and the nav links list
var hamburgerBtn = document.getElementById("hamburgerBtn");
var navLinks = document.getElementById("navLinks");

// When hamburger is clicked, show/hide the menu
hamburgerBtn.addEventListener("click", function () {
  navLinks.classList.toggle("show");
});


// ---------- UPDATE CART COUNT ON PAGE LOAD ----------

// This function reads the cart from localStorage and shows how many items are in it
function updateCartCount() {

  // Get cart data from localStorage (it is saved as text, so we convert it back to an array)
  var cartData = localStorage.getItem("cart");
  var cartItems = [];

  if (cartData !== null) {
    cartItems = JSON.parse(cartData);
  }

  // Count total quantity of items in the cart
  var totalCount = 0;
  for (var i = 0; i < cartItems.length; i++) {
    totalCount = totalCount + cartItems[i].quantity;
  }

  // Show the count in the navbar
  var cartCountElement = document.getElementById("cartCount");
  if (cartCountElement !== null) {
    cartCountElement.textContent = totalCount;
  }
}

// Run this function when the page loads
updateCartCount();


// ---------- LOGIN STATE / NAVBAR ----------
// Farmers can add products to sell, so the navbar needs to change
// depending on whether someone is logged in, and whether they are
// a farmer or a regular customer.

// Get the currently logged in user (or null if nobody is logged in)
function getLoggedInUser() {
  var userData = localStorage.getItem("loggedInUser");

  if (userData === null) {
    return null;
  }

  return JSON.parse(userData);
}

// Log the user out and send them back to the home page
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// Show/hide the Login, Register, Sell Products and Logout links,
// and show a small "Hi, Name" greeting when someone is logged in
function updateNavbar() {

  var currentUser = getLoggedInUser();

  var loginLink = document.getElementById("navLoginLink");
  var registerLink = document.getElementById("navRegisterLink");
  var sellLink = document.getElementById("navSellLink");
  var logoutLink = document.getElementById("navLogoutLink");
  var greeting = document.getElementById("navGreeting");

  // Safety check in case one of these is missing on a page
  if (loginLink === null || registerLink === null || sellLink === null || logoutLink === null) {
    return;
  }

  if (currentUser === null) {
    // Nobody is logged in
    loginLink.classList.remove("nav-hidden");
    registerLink.classList.remove("nav-hidden");
    sellLink.classList.add("nav-hidden");
    logoutLink.classList.add("nav-hidden");

    if (greeting !== null) {
      greeting.classList.add("nav-hidden");
    }
  } else {
    // Someone is logged in
    loginLink.classList.add("nav-hidden");
    registerLink.classList.add("nav-hidden");
    logoutLink.classList.remove("nav-hidden");

    // Only farmers get the "Sell Products" link
    if (currentUser.userType === "farmer") {
      sellLink.classList.remove("nav-hidden");
    } else {
      sellLink.classList.add("nav-hidden");
    }

    // Show a friendly "Hi, Name" greeting in the navbar
    if (greeting !== null) {
      greeting.textContent = "Hi, " + currentUser.fullName.split(" ")[0] + " \uD83D\uDC4B";
      greeting.classList.remove("nav-hidden");
    }
  }
}

// Run this when the page loads
updateNavbar();


// ---------- SHARED PRODUCT CARD BUILDERS ----------
// These build the HTML for a single product card, used by both
// the home page (featured products) and the products page.

// Turns a number like 4.5 into "★★★★☆ 4.5"
function buildRatingHTML(rating) {
  var fullStars = Math.round(rating);
  var starsText = "";

  for (var i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsText = starsText + "\u2605"; // filled star
    } else {
      starsText = starsText + "\u2606"; // empty star
    }
  }

  return "<div class='rating'>" + starsText + "<span class='rating-number'>" + rating + "</span></div>";
}

// Builds one product card, with a "Farm Fresh" badge and an
// "Organic" badge when the product is marked organic
function buildProductCardHTML(product) {

  var badgeHTML = "<span class='badge'>Farm Fresh</span>";
  if (product.isOrganic === true) {
    badgeHTML = badgeHTML + "<span class='badge badge-organic'>Organic</span>";
  }

  return "<div class='product-card'>" +
    "<div class='product-image-wrap'>" +
    badgeHTML +
    "<img src='" + product.image + "' alt='" + product.name + "'>" +
    "</div>" +
    "<p class='card-category'>" + product.category + "</p>" +
    "<h3>" + product.name + "</h3>" +
    buildRatingHTML(product.rating) +
    "<p class='price'>\u20B9" + product.price + " / " + product.unit + "</p>" +
    "<div class='card-actions'>" +
    "<button class='btn-secondary view-btn' data-id='" + product.id + "'>View Product</button>" +
    "<button class='btn-primary add-cart-btn' data-id='" + product.id + "'>Add to Cart</button>" +
    "</div>" +
    "</div>";
}

// Wires up the View Product / Add to Cart buttons inside a container.
// Used by the home page and the products page after they insert cards.
function attachProductCardEvents(containerElement) {

  var viewButtons = containerElement.querySelectorAll(".view-btn");
  for (var j = 0; j < viewButtons.length; j++) {
    viewButtons[j].addEventListener("click", function () {
      var productId = this.getAttribute("data-id");
      window.location.href = "product.html?id=" + productId;
    });
  }

  var addButtons = containerElement.querySelectorAll(".add-cart-btn");
  for (var k = 0; k < addButtons.length; k++) {
    addButtons[k].addEventListener("click", function () {
      var productId = Number(this.getAttribute("data-id"));
      var matchedProduct = products.find(function (p) {
        return p.id === productId;
      });

      if (matchedProduct !== undefined) {
        handleAddToCart(matchedProduct, 1);
      }
    });
  }
}


// ---------- "PLEASE LOGIN" MODAL ----------
// Add to Cart buttons across the site call requireLogin() first.
// If nobody is logged in, a small modal explains why and offers
// a quick link to the login page instead of just disabling the button.

// Build the modal HTML once and attach it to the page
function createLoginModal() {

  // Don't create it twice
  if (document.getElementById("loginModal") !== null) {
    return;
  }

  var modalHTML =
    "<div class='modal-overlay' id='loginModal'>" +
    "<div class='modal-box'>" +
    "<h3>Login Required</h3>" +
    "<p>Please login to add products to your cart.</p>" +
    "<div class='modal-actions'>" +
    "<button class='btn-primary' onclick=\"window.location.href='login.html'\">Login</button>" +
    "<button class='btn-secondary' onclick='hideLoginModal()'>Cancel</button>" +
    "</div>" +
    "</div>" +
    "</div>";

  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function showLoginModal() {
  createLoginModal();
  document.getElementById("loginModal").classList.add("show");
}

function hideLoginModal() {
  var modal = document.getElementById("loginModal");
  if (modal !== null) {
    modal.classList.remove("show");
  }
}

// Call this before adding anything to the cart.
// Returns true if the user is logged in and it is safe to continue.
// Returns false (and shows the login modal) if nobody is logged in.
function requireLogin() {
  if (getLoggedInUser() === null) {
    showLoginModal();
    return false;
  }
  return true;
}
