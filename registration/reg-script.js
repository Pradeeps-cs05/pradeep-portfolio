// Simple demo registration + login using localStorage
function $(selector) {
  return document.querySelector(selector);
}

function showError(id, message) {
  const el = document.querySelector(`small.error[data-for="${id}"]`);
  if (el) el.textContent = message || "";
}

function clearErrors() {
  document.querySelectorAll("small.error").forEach((el) => (el.textContent = ""));
}

function saveUser(user) {
  localStorage.setItem("demo-user", JSON.stringify(user));
}

function getUser() {
  const raw = localStorage.getItem("demo-user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      const name = $("#name").value.trim();
      const email = $("#email").value.trim();
      const phone = $("#phone").value.trim();
      const password = $("#password").value;
      const confirm = $("#confirm").value;

      let hasError = false;

      if (!name) {
        showError("name", "Name is required");
        hasError = true;
      }
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        showError("email", "Enter a valid email");
        hasError = true;
      }
      if (phone && phone.length < 8) {
        showError("phone", "Enter a valid phone number");
        hasError = true;
      }
      if (!password || password.length < 6) {
        showError("password", "Minimum 6 characters");
        hasError = true;
      }
      if (confirm !== password) {
        showError("confirm", "Passwords do not match");
        hasError = true;
      }

      if (hasError) return;

      saveUser({ name, email, phone, password });
      const banner = document.getElementById("register-success");
      if (banner) banner.hidden = false;

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1200);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      const email = $("#login-email").value.trim();
      const password = $("#login-password").value;
      const user = getUser();

      const success = document.getElementById("login-success");
      const error = document.getElementById("login-error");
      if (success) success.hidden = true;
      if (error) error.hidden = true;

      if (!user) {
        if (error) {
          error.textContent = "No user found. Please register first.";
          error.hidden = false;
        }
        return;
      }

      if (user.email === email && user.password === password) {
        if (success) {
          success.textContent = `✅ Welcome back, ${user.name}! (Demo only)`;
          success.hidden = false;
        }
      } else {
        if (error) {
          error.textContent = "Invalid email or password. Please try again.";
          error.hidden = false;
        }
      }
    });
  }
});
