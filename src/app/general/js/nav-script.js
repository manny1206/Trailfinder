function navMenufunction() {
    var x = document.getElementById("topnav");
    if (x.className === "nav-main") {
        x.className += " responsive";
    } else {
        x.className = "nav-main";
    }
}