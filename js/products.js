// ============================================
// products.js
// This file displays all products on the Products page,
// and handles the search bar, category filter, price range,
// sorting and the "organic only" checkbox.
//
// The actual card HTML is built by buildProductCardHTML(),
// which lives in main.js so the home page can reuse it too.
// ============================================


// ---------- DISPLAY PRODUCTS ON THE PAGE ----------
// This function takes an array of products and shows them as cards

function displayProducts(productList) {

  var productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";

  // If no products match, show a message
  if (productList.length === 0) {
    productGrid.innerHTML = "<p class='no-results'>No products found. Try changing your filters.</p>";
    updateResultsCount(0);
    return;
  }

  // Loop through each product and build a card for it
  for (var i = 0; i < productList.length; i++) {
    productGrid.innerHTML = productGrid.innerHTML + buildProductCardHTML(productList[i]);
  }

  updateResultsCount(productList.length);

  // Wire up the View Product / Add to Cart buttons we just added
  attachProductCardEvents(productGrid);
}


// ---------- SHOW HOW MANY PRODUCTS MATCHED ----------

function updateResultsCount(count) {
  var resultsCountElement = document.getElementById("resultsCount");
  if (resultsCountElement !== null) {
    resultsCountElement.textContent = count + " product" + (count === 1 ? "" : "s") + " found";
  }
}


// ---------- FILTER + SEARCH + SORT LOGIC ----------
// This function looks at the search box, category dropdown, price
// range and organic checkbox, then shows only the products that match.

function filterProducts() {

  var searchText = document.getElementById("searchInput").value.toLowerCase();
  var selectedCategory = document.getElementById("categoryFilter").value;
  var sortOption = document.getElementById("sortSelect").value;
  var organicOnly = document.getElementById("organicOnly").checked;

  var minPriceValue = document.getElementById("minPrice").value;
  var maxPriceValue = document.getElementById("maxPrice").value;

  // Use sensible defaults if the price boxes are left empty
  var minPrice = minPriceValue === "" ? 0 : Number(minPriceValue);
  var maxPrice = maxPriceValue === "" ? Infinity : Number(maxPriceValue);

  // ---------- FILTER ----------
  var filteredList = products.filter(function (product) {

    var searchableText = (
      product.name + " " +
      product.category + " " +
      product.farmer + " " +
      product.description
    ).toLowerCase();

    var matchesSearch = searchableText.includes(searchText);
    var matchesCategory = (selectedCategory === "all") || (product.category === selectedCategory);
    var matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    var matchesOrganic = (organicOnly === false) || (product.isOrganic === true);

    return matchesSearch && matchesCategory && matchesPrice && matchesOrganic;
  });

  // ---------- SORT ----------
  if (sortOption === "priceLowHigh") {
    filteredList.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (sortOption === "priceHighLow") {
    filteredList.sort(function (a, b) {
      return b.price - a.price;
    });
  } else if (sortOption === "nameAZ") {
    filteredList.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  } else if (sortOption === "ratingHighLow") {
    filteredList.sort(function (a, b) {
      return b.rating - a.rating;
    });
  }
  // "default" leaves the list in its original order

  displayProducts(filteredList);
}


// ---------- SET UP EVENT LISTENERS ----------

// Show all products when the page first loads
displayProducts(products);

// Re-filter whenever any of the toolbar controls change
document.getElementById("searchInput").addEventListener("keyup", filterProducts);
document.getElementById("categoryFilter").addEventListener("change", filterProducts);
document.getElementById("sortSelect").addEventListener("change", filterProducts);
document.getElementById("organicOnly").addEventListener("change", filterProducts);
document.getElementById("minPrice").addEventListener("input", filterProducts);
document.getElementById("maxPrice").addEventListener("input", filterProducts);
