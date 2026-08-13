// ============================================
// sell.js
// This file handles the "Sell Products" page:
// - Only lets logged in farmers see the page
// - Saves new products into localStorage under "farmerProducts"
// - Shows the current farmer's own products with a Remove button
// ============================================


// ---------- CHECK THAT A FARMER IS LOGGED IN ----------
// getLoggedInUser() comes from main.js, which is loaded before this file

var currentUser = getLoggedInUser();

if (currentUser === null || currentUser.userType !== "farmer") {
  alert("You need to be logged in as a farmer to sell products.");
  window.location.href = "login.html";
}


// ---------- GET / SAVE FARMER PRODUCTS ----------

function getFarmerProducts() {
  var data = localStorage.getItem("farmerProducts");

  if (data === null) {
    return [];
  }

  return JSON.parse(data);
}

function saveFarmerProducts(productList) {
  localStorage.setItem("farmerProducts", JSON.stringify(productList));
}


// ---------- WORK OUT THE NEXT PRODUCT ID ----------
// The sample products already use ids 1-24, so farmer products
// start at 100 and count up from there so ids never clash.

function getNextProductId() {
  var farmerProducts = getFarmerProducts();
  var nextId = 100;

  for (var i = 0; i < farmerProducts.length; i++) {
    if (farmerProducts[i].id >= nextId) {
      nextId = farmerProducts[i].id + 1;
    }
  }

  return nextId;
}


// ---------- FORM SUBMIT ----------

var sellForm = document.getElementById("sellForm");

sellForm.addEventListener("submit", function (event) {

  event.preventDefault();

  var isFormValid = true;

  var name = document.getElementById("productName").value.trim();
  var category = document.getElementById("productCategory").value;
  var price = document.getElementById("productPrice").value.trim();
  var unit = document.getElementById("productUnit").value.trim();
  var image = document.getElementById("productImage").value.trim();
  var description = document.getElementById("productDescription").value.trim();

  // ---------- VALIDATE NAME ----------
  if (name === "") {
    document.getElementById("productName").classList.add("input-error");
    document.getElementById("productNameError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("productName").classList.remove("input-error");
    document.getElementById("productNameError").style.display = "none";
  }

  // ---------- VALIDATE PRICE ----------
  if (price === "" || isNaN(price) || Number(price) <= 0) {
    document.getElementById("productPrice").classList.add("input-error");
    document.getElementById("productPriceError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("productPrice").classList.remove("input-error");
    document.getElementById("productPriceError").style.display = "none";
  }

  // ---------- VALIDATE UNIT ----------
  if (unit === "") {
    document.getElementById("productUnit").classList.add("input-error");
    document.getElementById("productUnitError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("productUnit").classList.remove("input-error");
    document.getElementById("productUnitError").style.display = "none";
  }

  // ---------- VALIDATE IMAGE URL ----------
  if (image === "") {
    document.getElementById("productImage").classList.add("input-error");
    document.getElementById("productImageError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("productImage").classList.remove("input-error");
    document.getElementById("productImageError").style.display = "none";
  }

  if (isFormValid === false) {
    return;
  }

  // ---------- BUILD AND SAVE THE NEW PRODUCT ----------
  // New products start with a default rating and are not marked
  // organic by default - the farmer's name is used for the "farmer" field.

  var newProduct = {
    id: getNextProductId(),
    name: name,
    category: category,
    price: Number(price),
    unit: unit,
    image: image,
    description: description === "" ? "No description provided." : description,
    rating: 4.0,
    farmer: currentUser.farmName !== "" ? currentUser.farmName : currentUser.fullName,
    isOrganic: false,
    farmerEmail: currentUser.email // remembers which farmer added this product
  };

  var farmerProducts = getFarmerProducts();
  farmerProducts.push(newProduct);
  saveFarmerProducts(farmerProducts);

  document.getElementById("successMsg").style.display = "block";
  sellForm.reset();

  displayMyProducts();
});


// ---------- SHOW ONLY THIS FARMER'S PRODUCTS ----------

function displayMyProducts() {

  var container = document.getElementById("myProductsContainer");
  container.innerHTML = "";

  var farmerProducts = getFarmerProducts();

  var myProducts = [];
  for (var i = 0; i < farmerProducts.length; i++) {
    if (farmerProducts[i].farmerEmail === currentUser.email) {
      myProducts.push(farmerProducts[i]);
    }
  }

  if (myProducts.length === 0) {
    container.innerHTML = "<p class='empty-cart-msg'>You haven't added any products yet.</p>";
    return;
  }

  for (var j = 0; j < myProducts.length; j++) {
    var product = myProducts[j];

    var itemHTML = "<div class='my-product-item'>" +
      "<img src='" + product.image + "' alt='" + product.name + "'>" +
      "<div class='my-product-item-info'>" +
      "<h3>" + product.name + "</h3>" +
      "<p>\u20B9" + product.price + " / " + product.unit + "</p>" +
      "</div>" +
      "<button class='remove-btn' onclick='removeMyProduct(" + product.id + ")'>Remove</button>" +
      "</div>";

    container.innerHTML = container.innerHTML + itemHTML;
  }
}


// ---------- REMOVE ONE OF THIS FARMER'S PRODUCTS ----------

function removeMyProduct(productId) {
  var farmerProducts = getFarmerProducts();
  var updatedList = [];

  for (var i = 0; i < farmerProducts.length; i++) {
    if (farmerProducts[i].id !== productId) {
      updatedList.push(farmerProducts[i]);
    }
  }

  saveFarmerProducts(updatedList);
  displayMyProducts();
}


// Run this when the page loads
displayMyProducts();
