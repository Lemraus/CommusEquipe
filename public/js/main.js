function toggleNav() {
    var navbar = document.getElementById("navbar");

    if (navbar.classList.contains("expanded")) {
        navbar.classList.remove("expanded");
    } else {
        navbar.classList.add("expanded");
    }
}