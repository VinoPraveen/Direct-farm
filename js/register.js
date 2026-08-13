// ============================================
// register.js
// This file handles the registration form:
// - Shows/hides the Farm Name field based on user type
// - Shows/hides password text
// - Shows a simple password strength meter
// - Validates all the fields
// - Saves the new user into localStorage
// ============================================


// ---------- SHOW/HIDE FARM NAME FIELD ----------

var userTypeRadios = document.querySelectorAll("input[name='userType']");
var farmNameGroup = document.getElementById("farmNameGroup");

for (var i = 0; i < userTypeRadios.length; i++) {
  userTypeRadios[i].addEventListener("change", function () {

    var selectedType = document.querySelector("input[name='userType']:checked").value;

    if (selectedType === "farmer") {
      farmNameGroup.style.display = "block";
    } else {
      farmNameGroup.style.display = "none";
    }
  });
}


// ---------- SHOW / HIDE PASSWORD FIELDS ----------

function setupPasswordToggle(toggleBtnId, inputId) {
  var toggleBtn = document.getElementById(toggleBtnId);
  var input = document.getElementById(inputId);

  toggleBtn.addEventListener("click", function () {
    if (input.type === "password") {
      input.type = "text";
      toggleBtn.textContent = "Hide";
    } else {
      input.type = "password";
      toggleBtn.textContent = "Show";
    }
  });
}

setupPasswordToggle("togglePassword", "password");
setupPasswordToggle("toggleConfirmPassword", "confirmPassword");


// ---------- PASSWORD STRENGTH METER ----------
// Simple scoring: length + variety of characters used

function getPasswordStrength(password) {

  var score = 0;

  if (password.length >= 6) {
    score = score + 1;
  }
  if (password.length >= 10) {
    score = score + 1;
  }
  if (/[0-9]/.test(password)) {
    score = score + 1;
  }
  if (/[A-Z]/.test(password)) {
    score = score + 1;
  }
  if (/[^A-Za-z0-9]/.test(password)) {
    score = score + 1;
  }

  if (score <= 1) {
    return "weak";
  } else if (score <= 3) {
    return "medium";
  } else {
    return "strong";
  }
}

var passwordInput = document.getElementById("password");
var strengthWrap = document.getElementById("strengthWrap");
var strengthLabel = document.getElementById("strengthLabel");

passwordInput.addEventListener("keyup", function () {

  var password = passwordInput.value;

  if (password === "") {
    strengthWrap.className = "strength-meter";
    strengthLabel.textContent = "";
    return;
  }

  var strength = getPasswordStrength(password);

  strengthWrap.className = "strength-meter strength-" + strength;
  strengthLabel.textContent = "Password strength: " + strength.charAt(0).toUpperCase() + strength.slice(1);
});


// ---------- FORM VALIDATION + SUBMIT ----------

var registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {

  // Stop the form from refreshing the page
  event.preventDefault();

  var isFormValid = true;

  // Get all the values from the form
  var fullName = document.getElementById("fullName").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var userType = document.querySelector("input[name='userType']:checked").value;
  var farmName = document.getElementById("farmName").value.trim();

  // ---------- VALIDATE FULL NAME ----------
  if (fullName === "") {
    document.getElementById("fullName").classList.add("input-error");
    document.getElementById("fullNameError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("fullName").classList.remove("input-error");
    document.getElementById("fullNameError").style.display = "none";
  }

  // ---------- VALIDATE FARM NAME (only if user is a farmer) ----------
  if (userType === "farmer" && farmName === "") {
    document.getElementById("farmName").classList.add("input-error");
    document.getElementById("farmNameError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("farmName").classList.remove("input-error");
    document.getElementById("farmNameError").style.display = "none";
  }

  // ---------- VALIDATE EMAIL ----------
  // Simple check: must contain "@" and "."
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    document.getElementById("email").classList.add("input-error");
    document.getElementById("emailError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("email").classList.remove("input-error");
    document.getElementById("emailError").style.display = "none";
  }

  // ---------- VALIDATE PHONE ----------
  // Must be exactly 10 digits
  var phonePattern = /^[0-9]{10}$/;
  if (phonePattern.test(phone) === false) {
    document.getElementById("phone").classList.add("input-error");
    document.getElementById("phoneError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("phone").classList.remove("input-error");
    document.getElementById("phoneError").style.display = "none";
  }

  // ---------- VALIDATE PASSWORD ----------
  if (password.length < 6) {
    document.getElementById("password").classList.add("input-error");
    document.getElementById("passwordError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("password").classList.remove("input-error");
    document.getElementById("passwordError").style.display = "none";
  }

  // ---------- VALIDATE CONFIRM PASSWORD ----------
  if (confirmPassword !== password || confirmPassword === "") {
    document.getElementById("confirmPassword").classList.add("input-error");
    document.getElementById("confirmPasswordError").style.display = "block";
    isFormValid = false;
  } else {
    document.getElementById("confirmPassword").classList.remove("input-error");
    document.getElementById("confirmPasswordError").style.display = "none";
  }

  // ---------- IF FORM IS VALID, SAVE USER ----------
  if (isFormValid === true) {

    // Get existing users from localStorage (or start with an empty array)
    var usersData = localStorage.getItem("users");
    var users = [];

    if (usersData !== null) {
      users = JSON.parse(usersData);
    }

    // Check if this email is already registered
    var emailAlreadyUsed = false;
    for (var j = 0; j < users.length; j++) {
      if (users[j].email === email) {
        emailAlreadyUsed = true;
      }
    }

    if (emailAlreadyUsed === true) {
      alert("This email is already registered. Please login instead.");
      return;
    }

    // Create the new user object
    var newUser = {
      fullName: fullName,
      email: email,
      phone: phone,
      password: password,
      userType: userType,
      farmName: userType === "farmer" ? farmName : ""
    };

    // Add the new user to the array and save it back
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Show success message and reset the form
    document.getElementById("successMsg").style.display = "block";
    registerForm.reset();
    farmNameGroup.style.display = "none";
    strengthWrap.className = "strength-meter";
    strengthLabel.textContent = "";

    // Redirect to login page after a short delay
    setTimeout(function () {
      window.location.href = "login.html";
    }, 1500);
  }
});
