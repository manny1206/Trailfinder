function loginfunction() {
    var x = document.getElementById("login");
    if (x.className === "login") {
        x.className += " active";
    }
    else {
        x.className = "login";
    }
};
function logoutfunction() {
    var x = document.getElementById("login");
    if (x.className === "login active") {
        var y = document.getElementById("logout");
        y.className += " active";
    }
    else {
        x.className = "plink logout";
    }
}