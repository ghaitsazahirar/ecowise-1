import { auth } from './firebase-config';

export function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const headerContent = document.querySelector('.header-content');
    const mainContent = document.querySelector('main');

    if (navMenu && headerContent && mainContent) {
        navMenu.classList.toggle('active');
        headerContent.classList.toggle('blur');
        mainContent.classList.toggle('blur');
    } else {
        console.error('Salah satu elemen tidak ditemukan di DOM.');
    }
}

export function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const headerContent = document.querySelector('.header-content');
    const mainContent = document.querySelector('main');

    if (navMenu && headerContent && mainContent) {
        navMenu.classList.remove('active');
        headerContent.classList.remove('blur');
        mainContent.classList.remove('blur');
    } else {
        console.error('Salah satu elemen tidak ditemukan di DOM.');
    }
}

export function navigateToChallenge(type) {
    window.location.href = 'kategoritantangan.html?type=' + type;
}


export function viewProfile(user) {
    // Fungsi untuk melihat profil
    if (user && user.displayName) {
        console.log('Memanggil viewProfile dengan user:', user);

        const profileContainer = document.createElement('div');
        profileContainer.classList.add('profile-button');

        const profileHtml = `
            <button class="profile-button" onclick="toggleProfile()">
                <i class="fas fa-user"></i>
                <div class="user-profile">
                    <span class="user-name">${user.displayName}</span>
                    <span class="user-email">${user.email}</span>
                </div>
            </button>
            <button id="signOutButton">Sign Out</button>
        `;

        profileContainer.innerHTML = profileHtml;

        const signOutButton = profileContainer.querySelector("#signOutButton");
        signOutButton.addEventListener("click", async () => {
            try {
                await auth.signOut();
                window.location.href = "index.html"; // Redirect setelah sign out
            } catch (error) {
                console.error("Error signing out:", error);
                alert("Gagal sign out. Silakan coba lagi nanti.");
            }
        });

        const profileElement = document.getElementById('profile'); // Perbarui selektor di sini
        if (profileElement) {
            console.log('Elemen #profile ditemukan, menambahkan profil pengguna.');
            profileElement.appendChild(profileContainer);
        } else {
            console.error('Elemen #profile tidak ditemukan di DOM.');
        }
    } else {
        console.error('Tidak dapat menampilkan profil: objek pengguna tidak valid atau displayName kosong.');
    }
}


// navigation.js
export function goBack() {
    window.history.back();
}

export function navigateToDetail(challengeName) {
    window.location.href = `detailtantangan.html?name=${encodeURIComponent(challengeName)}`;
}
