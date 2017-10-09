const headerEl = document.getElementById("header");

var loginFlag = document.getElementById("loginflag").innerHTML;

if(loginFlag === "true"){
  headerEl.innerHTML = `<p>Logged In!</p>`;
} else {
  headerEl.innerHTML = `<p>Logged Out</p>`;
}
