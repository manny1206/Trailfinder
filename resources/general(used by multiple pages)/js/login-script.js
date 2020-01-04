function loginfunction() {
    var x = document.getElementById("login");
    if (x.className === "login") {
        x.className += " active";
    }
    else {
        x.className = "login";
    }
};