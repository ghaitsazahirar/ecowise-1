import "../styles/style.css";
import { goBack } from "../scripts/function-nav";
import { toggleMenu, closeMenu } from "../scripts/function-nav";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    // Animation for login container
    gsap.from(".login-container", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: "power1.out"
    });

    // Animation for elements inside login container
    gsap.from(".login-container > *", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: "power1.out",
        stagger: 0.2,
        delay: 0.5
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(".login-container");

    const auth = getAuth(app);
    const db = getFirestore(app);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = "homepage.html"; // Redirect to homepage if user is already logged in
        } else {
            renderLogin(); // Render login form if user is not logged in
        }
    });

    const renderLogin = () => {
        const element = document.createElement('div');
        element.classList.add('renderLogin');
        element.innerHTML = `
            <a href="index.html" class="icon-back-1" id="backButton">
                <i class="fa-solid fa-arrow-left"></i>
            </a>
            <h1>Masuk</h1>
            <p>Masukkan Email dan Password yang telah kamu daftarkan!</p>
            <img src="assets/svg/sign in-svg.svg" alt="login">
            <form id="loginForm">
                <div class="form-group">
                    <label for="email">Email</label>
                    <div class="form-group-login">
                        <input type="email" id="email" name="email" placeholder="Masukkan Email" required>
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="form-group-login">
                        <input type="password" id="password" name="password" placeholder="Masukkan Password" required>
                        <i class="fa-solid fa-lock"></i>
                    </div>
                </div>
                <p class="forget-password-i"><a href="lupapassword.html">Lupa password?</a></p>
                <div class="btn-login">
                    <button id="loginButton" type="submit">Login</button>
                </div>
                <div class="separator">atau</div>
                <div class="btn-register">
                    <button class="register-button" type="button" id="registerButton">Daftar</button>
                </div>
            </form>
        `;

        container.innerHTML = "";
        container.appendChild(element);

        const backButton = element.querySelector("#backButton");
        backButton.addEventListener("click", function(event) {
            event.preventDefault();
            goBack();
        });

        const loginBtn = element.querySelector("#loginButton");
        loginBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const email = element.querySelector("#email").value;
            const password = element.querySelector("#password").value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("User signed in successfully:", user);

                const dt = new Date();
                const userRef = doc(db, "user", user.uid);

                await updateDoc(userRef, {
                    last_login: dt.toString(),
                });

                const idToken = await user.getIdToken();
                console.log("ID Token:", idToken);

                console.log("Last login updated successfully");
                alert("Successfully logged in");

                window.location.href = "homepage.html"; // Redirect to homepage after successful login
            } catch (error) {
                console.error("Error during sign in or update:", error);
                alert("Failed to login. Please check your email and password.");
            }
        });

        const registerButton = element.querySelector("#registerButton");
        registerButton.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
    };

    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;
});
