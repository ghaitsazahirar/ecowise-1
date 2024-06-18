import "../styles/style.css";
import { goBack } from "../scripts/function-nav";
import { toggleMenu, closeMenu } from "../scripts/function-nav";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { app, auth } from './firebase-config';
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { updateDoc } from "firebase/firestore";

const db = getFirestore(app);

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    // Animasi untuk login container
    gsap.from(".login-container", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: "power1.out"
    });

    gsap.from(".login-container > *", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: "power1.out",
        stagger: 0.2,
        delay: 0.5
    });

    const container = document.querySelector(".login-container");

    if (!container) {
        console.error("Elemen dengan kelas '.login-container' tidak ditemukan.");
        return;
    }

    const renderRegisterForm = () => {
        const element = document.createElement("div");
        element.classList.add("Landing");
        element.innerHTML = `
            <a href="index.html" class="icon-back">
                <i class="fa-solid fa-arrow-left" id="backButton"></i>
            </a>
            <h1>Daftar</h1>
            <p>Daftarkan dirimu untuk pengalaman menarik lainnya!</p>
            <img src="assets/svg/register-svg.svg" alt="login">
            <div class="form-group">
                <label for="name">Nama</label>
                <div class="form-group-login">
                    <input type="text" id="name" name="name" placeholder="Masukkan Nama" required>
                    <i class="fa-solid fa-user"></i>
                </div>
            </div>
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
                    <i class="fa-solid fa-unlock"></i>
                </div>
            </div>
            <div class="form-group">
                <label for="konfirm-password">Konfirmasi Password</label>
                <div class="form-group-login">
                    <input type="password" id="konfirm-password" name="konfirm-password" placeholder="Masukkan Password Konfirmasi" required>
                    <i class="fa-solid fa-unlock"></i>
                </div>
            </div>
            <div class="btn-register">
                <button id="registerButton">Register</button>
                <button id="googleLoginButton">Google Login</button>
            </div>
        `;

        container.innerHTML = "";
        container.appendChild(element);

        const nameInput = element.querySelector("#name");
        const emailInput = element.querySelector("#email");
        const passwordInput = element.querySelector("#password");
        const confirmPasswordInput = element.querySelector("#konfirm-password");

        const registerBtn = element.querySelector("#registerButton");
        registerBtn.addEventListener("click", async () => {
            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const passwordValue = passwordInput.value.trim();
            const confirmPasswordValue = confirmPasswordInput.value.trim();
            
            if (!nameValue || !emailValue || !passwordValue || !confirmPasswordValue) {
                alert("Mohon lengkapi semua kolom!");
                return;
            }
            
            if (passwordValue !== confirmPasswordValue) {
                alert("Konfirmasi password tidak sesuai!");
                return;
            }
            
            try {
                // Register user with Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
                const user = userCredential.user;
                console.log("User registered successfully:", user);
            
                // Set displayName after registration
                await updateProfile(user, { displayName: nameValue });
            
                // Save additional user data to Firestore
                const dt = new Date();
                const userRef = doc(db, "users", user.uid);
            
                await setDoc(userRef, {
                    name: nameValue,
                    email: emailValue,
                    created_at: dt.toString(),
                    points: 0,
                });
            
                console.log("User data saved to Firestore successfully");
            
                alert("Successfully registered and logged in");
            
                // Redirect to homepage
                window.location.href = "homepage.html";
            } catch (error) {
                console.error("Error during registration:", error);
                alert("Failed to register. Please check your information and try again.");
            }
        });        


        const googleLoginBtn = element.querySelector("#googleLoginButton");
        googleLoginBtn.addEventListener("click", async () => {
            try {
                // Implement Google Login here if needed
            } catch (error) {
                console.error("Error during Google login:", error);
                alert("Gagal login dengan Google. Coba lagi nanti.");
            }
        });

        const backButton = document.getElementById("backButton");
        if (backButton) {
            backButton.addEventListener("click", function(event) {
                event.preventDefault();
                goBack();
            });
        } else {
            console.error("Elemen dengan ID 'backButton' tidak ditemukan.");
        }
    };

    // Render registration form on DOMContentLoaded
    renderRegisterForm();
});

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;