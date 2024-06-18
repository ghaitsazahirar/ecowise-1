import "../styles/style.css";
import { goBack } from "../scripts/function-nav";
import { toggleMenu, closeMenu } from "../scripts/function-nav";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { app } from './firebase-config'; // Pastikan firebase-config.js mengimpor konfigurasi Firebase dengan benar

// Inisialisasi Firebase
const auth = getAuth(app);

// Container untuk halaman
const container = document.querySelector(".forget-password-container");

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = "homepage.html";
        } else {
            // Menampilkan halaman lupa password jika pengguna belum masuk
            Landing();
        }
    });
});

// Fungsi untuk menampilkan halaman lupa password
const Landing = () => {
    const element = document.createElement("div");
    element.classList.add('Landing');
    element.innerHTML = `
        <a href="login.html" class="icon-back-1" id="backButton">
            <i class="fa-solid fa-arrow-left"></i>
        </a>
        <h1>Lupa Password</h1>
        <p>Masukkan Email yang telah kamu daftarkan!</p>
        <img src="assets/svg/forgot-password-svg.svg" alt="login">
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <div class="form-group-login">
                    <input type="email" id="email" name="email" placeholder="Masukkan Email" required>
                    <i class="fa-solid fa-envelope"></i>
                </div>
            </div>
            <div class="btn-login">
                <button type="button" id="submit-email" data-button="forgot-pass">Kirim</button>
            </div>
        </form>
    `;
    container.innerHTML = "";
    container.appendChild(element);

    // Tambahkan event listener untuk tombol kembali
    document.getElementById("backButton").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default link behavior
        goBack(); // Call the goBack function
    });

    // Tambahkan event listener untuk tombol kirim email reset password
    const forgotBtn = element.querySelector(`[data-button="forgot-pass"]`);
    forgotBtn.onclick = async () => {
        const email = document.getElementById("email").value;

        try {
            // Kirim email reset password
            await sendPasswordResetEmail(auth, email);
            alert("Email untuk reset password telah dikirim. Silakan cek kotak masuk Anda.");
        } catch (error) {
            console.error("Error during password reset:", error);
            alert("Terjadi kesalahan saat melakukan reset password. Pastikan email yang Anda masukkan benar.");
        }
    };
};

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
