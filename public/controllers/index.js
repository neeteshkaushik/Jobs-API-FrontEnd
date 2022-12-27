console.log("index js");

var token = sessionStorage.getItem("token");
const userHomeLink = document.getElementById("user-home-link");
const loginLink = document.getElementById("login");
const registerLink = document.getElementById("register");
// console.log(token);
if (!token) {
  userHomeLink.style.display = "none";
  loginLink.style.display = "block";
  registerLink.style.display = "block";
} else {
  userHomeLink.style.display = "block";
  loginLink.style.display = "none";
  registerLink.style.display = "none";
}
