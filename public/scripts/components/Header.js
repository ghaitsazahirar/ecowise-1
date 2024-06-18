import { app, auth } from "../firebase-config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

class EcoHeader extends HTMLElement {
    connectedCallback() {
        const auth = getAuth(app);

        // Ensure Firebase is initialized and available
        if (!auth) {
            console.error("Firebase not initialized!");
            return;
        }

        // Handle authentication state changes
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Display user profile information
                this.renderLoggedInHeader(user);
            } else {
                // Render header for logged-out state
                this.renderLoggedOutHeader();
            }
        });
    }

    renderLoggedInHeader(user) {
        this.innerHTML = `
            <header class="header-homepage">
                <div class="header-content">
                    <button class="hamburger-menu" onclick="toggleMenu()">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </button>
                    <a href="homepage.html">
                        <div class="logo-header">
                            <img src="assets/svg/logo-ecowise.svg" alt="Website Logo">
                        </div>
                    </a>
                    <div class="profile-container">
                        <button class="profile-button" id="profileButton">
                            <i class="fas fa-user"></i>
                        </button>
                        <div class="user-profile" id="userProfile" style="display: none;">
                            <span class="user-name">${user.displayName}</span>
                            <span class="user-email">${user.email}</span>
                            <button id="signOutButton">Sign Out</button>
                        </div>
                    </div>
                </div>
                <nav class="nav-menu">
                    <div class="logo-navbar">
                        <img src="assets/img/eco_logo-2.png" alt="Website Logo">
                        <i class="fa-solid fa-xmark" onclick="closeMenu()"></i>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-house"></i>
                        <a href="homepage.html">Beranda</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-book"></i>
                        <a href="edukasi.html">Edukasi</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-seedling"></i>
                        <a href="kategoritantangan.html">Tantangan</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-gift"></i>
                        <a href="reward.html">Reward</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-comments"></i>
                        <a href="faq.html">FAQ</a>
                    </div>
                </nav>
            </header>
        `;

        const profileButton = this.querySelector("#profileButton");
        const userProfile = this.querySelector("#userProfile");
        profileButton.addEventListener("click", () => {
            userProfile.style.display = userProfile.style.display === "none" ? "block" : "none";
        });

        const signOutButton = this.querySelector("#signOutButton");
        signOutButton.addEventListener("click", async () => {
            try {
                await signOut(auth);
                window.location.href = "index.html"; // Redirect after sign out
            } catch (error) {
                console.error("Error signing out:", error);
                alert("Failed to sign out. Please try again later.");
            }
        });
    }

    renderLoggedOutHeader() {
        this.innerHTML = `
            <header class="header-homepage">
                <div class="header-content">
                    <button class="hamburger-menu" onclick="toggleMenu()">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </button>
                    <a href="homepage.html">
                        <div class="logo-header">
                            <img src="assets/svg/logo-ecowise.svg" alt="Website Logo">
                        </div>
                    </a>
                    <div class="profile-container">
                        <button class="profile-button" id="profileButton">
                            <i class="fas fa-user"></i>
                        </button>
                    </div>
                </div>
                <nav class="nav-menu">
                    <div class="logo-navbar">
                        <img src="assets/img/eco_logo-2.png" alt="Website Logo">
                        <i class="fa-solid fa-xmark" onclick="closeMenu()"></i>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-house"></i>
                        <a href="homepage.html">Beranda</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-book"></i>
                        <a href="edukasi.html">Edukasi</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-seedling"></i>
                        <a href="kategoritantangan.html">Tantangan</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-gift"></i>
                        <a href="reward.html">Reward</a>
                    </div>
                    <div class="logo-navbar">
                        <i class="fa-solid fa-comments"></i>
                        <a href="faq.html">FAQ</a>
                    </div>
                </nav>
            </header>
        `;

        const profileButton = this.querySelector("#profileButton");
        profileButton.addEventListener("click", () => {
            alert("Anda harus login terlebih dahulu!");
            // Redirect to login page or handle as needed
        });
    }
}

customElements.define('eco-header', EcoHeader);
