import "../styles/style.css";
import { viewProfile } from "./function-nav";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from './firebase-config'; // Pastikan firebase-config.js mengimpor konfigurasi Firebase dengan benar

// Inisialisasi Firebase
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const rewardType = urlParams.get('reward');
    const confirmationMessageElement = document.getElementById('confirmationMessage');
    
    if (rewardType === 'shopee') {
        confirmationMessageElement.innerHTML = '<div class="reward-message">500 Poin = 50.000 Voucher Shopee</div>';
    } else if (rewardType === 'tokopedia') {
        confirmationMessageElement.innerHTML = '<div class="reward-message"><p> 500 Poin = 50.000 Tokopeida Gift Card</p></div>';
    } else {
        confirmationMessageElement.innerHTML = '<div class="reward-message">Reward tidak diketahui!</div>';
    }
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log('User is logged in:', user);
            viewProfile(user); // Tampilkan profil pengguna
            displayUserProfile(user); // Tampilkan informasi profil pengguna
        } else {
            console.log("No user logged in.");
        }
    });
    // Tambahkan event listener untuk tombol konfirmasi
    const confirmButton = document.getElementById('confirmButton');
    if (confirmButton) {
        confirmButton.addEventListener('click', confirmReward);
    }
});

// Function untuk menampilkan informasi profil pengguna
async function displayUserProfile(user) {
    const welcomeUserElement = document.querySelector('.profile');
    if (user) {
        console.log('User is logged in:', user); // Logging tambahan
        welcomeUserElement.innerHTML = `
            <div class="welcome-user">
            <div class="container-homepage-img">
                <img src="assets/svg/environment-3.svg" alt="environtment-3">
            </div>
            <div class="welcome-text">
            <p>Selamat Datang</p>
                <h1 id="username">${user.displayName}</h1>
            </div>
            </div>
            <div class="welcome-user">
        <div class="container-homepage-img">
            <div class="text-point">
                <p id="points"><i class="fa-solid fa-star"> </i><span id="userPoints">Loading...</span></p>
        </div>
        <img src="assets/svg/environment-4.svg" alt="environtment-4">
        </div>
        </div>
            <button class="profile-button" onclick="toggleProfile()">View Profile</button>
        `;

        const userPointsElement = welcomeUserElement.querySelector('#userPoints');
        displayUserPoints(userPointsElement, user.uid); // Tampilkan poin pengguna
    } else {
        console.log('No user logged in.');
    }
}

async function displayUserPoints(element, uid) {
    try {
        // Dapatkan data pengguna dari Firestore
        const userDoc = await getDoc(doc(db, 'users', uid));

        if (userDoc.exists()) {
            console.log('User data found:', userDoc.data()); // Logging tambahan
            const userData = userDoc.data();
            const userPoints = userData.points || 0; // Dapatkan poin pengguna, default 0 jika tidak ada
            
            element.textContent = `${userPoints} Points`; // Tampilkan poin pengguna di elemen
        } else {
            console.log('No user data found for UID:', uid);
        }
    } catch (error) {
        console.error('Error fetching user points:', error);
    }
}

function confirmReward() {
    window.location.href = "confirm-email.html";
}