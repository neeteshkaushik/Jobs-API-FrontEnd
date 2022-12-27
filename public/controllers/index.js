console.log("index js");

var token = sessionStorage.getItem("token");
var userHomeLink = document.getElementById("user-home-link");
var loginLink = document.getElementById("login");
var registerLink = document.getElementById("register");
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
