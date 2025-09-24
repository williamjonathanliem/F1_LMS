// Email validation
document.getElementById("email").addEventListener("input", function () {
  const msg = document.getElementById("emailMsg");
  if (this.value.includes("@")) {
    msg.innerText = "✅ Valid email";
    msg.className = "text-success";
  } else {
    msg.innerText = "❌ Invalid email";
    msg.className = "text-danger";
  }
});

// Dynamic input update
document.getElementById("name").addEventListener("input", function () {
  document.getElementById("nameMsg").innerText = `Hello, ${this.value || "stranger"} 👋`;
});

// Password strength checker
document.getElementById("password").addEventListener("input", function () {
  const msg = document.getElementById("passMsg");
  const val = this.value;
  if (val.length >= 8 && /\d/.test(val)) {
    msg.innerText = "✅ Strong password";
    msg.className = "text-success";
  } else {
    msg.innerText = "⚠️ Weak password (min 8 chars & number required)";
    msg.className = "text-warning";
  }
});

// Submit button
function submitForm() {
  alert("Form submitted!");
}
