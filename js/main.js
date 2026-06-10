// Auto-update the footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Close the mobile navbar after clicking a nav link
document.querySelectorAll("#navItems .nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    var collapse = document.getElementById("navItems");
    if (collapse.classList.contains("show")) {
      new bootstrap.Collapse(collapse).hide();
    }
  });
});
