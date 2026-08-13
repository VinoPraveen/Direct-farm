// ============================================
// login.js
// This file handles login form validation and
// checks the entered details against users saved in localStorage.
// ============================================


// ---------- CREATE SAMPLE USERS IF NONE EXIST YET ----------
// This runs once so there is always at least one account to test with

function createSampleUsers() {

  var usersData = localStorage.getItem("users");

  // Only add sample users if localStorage is empty
  if (usersData === null) {

    var sampleUsers = [
      {
        fullName: "Test Customer",
        email: "customer@test.com",
        phone: "9876543210",
        password: "123456",
        userType: "customer",
        farmName: ""
      },
      {
        fullName: "Test Farmer",
        email: "farmer@test.com",
        phone: "9876543211",
        password: "123456",
        userType: "farmer",
        farmName: "Green Valley Farm"
      }
    ];

    localStorage.setItem("users", JSON.stringify(sampleUsers));
  }
}

// Run this when the page loads
createSampleUsers();


// ---------- SHOW / HIDE PASSWORD ----------

var togglePasswordBtn = document.getElementById("toggleLoginPassword");
var loginPasswordInput = document.getElementById("loginPassword");

togglePasswordBtn.addEventListener("click", function () {
  if (loginPasswordInput.type === "password") {
    loginPasswordInput.type = "text";
    togglePasswordBtn.textContent = "Hide";
  } else {
    loginPasswordInput.type = "password";
    togglePasswordBtn.textContent = "Show";
  }
});


// ---------- REMEMBER ME ----------
// If the user checked "remember me" last time, pre-fill their email

var rememberedEmail = localStorage.getItem("rememberedEmail");
if (rememberedEmail !== null) {
  document.getElementById("loginEmail").value = rememberedEmail;
  document.getElementById("rememberMe").checked = true;
}


// ---------- LOGIN FORM VALIDATION + SUBMIT ----------

var loginForm = document.getElementById("loginForm");
var loginSubmitBtn = document.getElementById("loginSubmitBtn");

loginForm.addEventListener("submit", function (event) {

  event.preventDefault();

  var isFormValid = true;

  var email = document.getElementById("loginEmail").value.trim();
  var password = document.getElementById("loginPassword").value;
  var rememberMe = document.getElementById("rememberMe").checked;

  // Hide the "incorrect login" message from any previous attempt
  document.getElementById("loginFailError").style.display = "none";

  // ---------- VALIDATE EMAIL ----------
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    document.getElementById("loginEmail").classList.add("input-error");
    document.getElementById("loginEmailError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("loginEmail").classList.remove("input-error");
    document.getElementById("loginEmailError").style.display = "none";
  }

  // ---------- VALIDATE PASSWORD ----------
  if (password === "") {
    document.getElementById("loginPassword").classList.add("input-error");
    document.getElementById("loginPasswordError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("loginPassword").classList.remove("input-error");
    document.getElementById("loginPasswordError").style.display = "none";
  }

  // Stop here if basic validation failed
  if (isFormValid === false) {
    return;
  }

  // ---------- SHOW A QUICK "LOADING" STATE ON THE BUTTON ----------
  loginSubmitBtn.disabled = true;
  loginSubmitBtn.textContent = "Logging in...";

  // ---------- CHECK EMAIL + PASSWORD AGAINST SAVED USERS ----------
  var usersData = localStorage.getItem("users");
  var users = [];

  if (usersData !== null) {
    users = JSON.parse(usersData);
  }

  var matchedUser = null;

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      matchedUser = users[i];
    }
  }

  // ---------- LOGIN RESULT ----------
  if (matchedUser === null) {
    // No matching user found
    document.getElementById("loginFailError").style.display = "block";
    loginSubmitBtn.disabled = false;
    loginSubmitBtn.textContent = "Login";
  } else {

    // Remember (or forget) the email for next time
    if (rememberMe === true) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    // Save the logged in user so other pages can know who is logged in
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

    document.getElementById("successMsg").style.display = "block";

    // Redirect to home page after a short delay
    setTimeout(function () {
      window.location.href = "index.html";
    }, 1000);
  }
});
