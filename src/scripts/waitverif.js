import "../styles/style.css"
import { goBack } from "../scripts/function-nav";
import { toggleMenu, closeMenu } from "../scripts/function-nav";

document.addEventListener("DOMContentLoaded", function() {
    // Attach click event to the back button
    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            window.location.href = "kategoritantangan.html";
        });
    } else {
        console.error('Element with ID "backButton" not found');
    }

    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;
});
