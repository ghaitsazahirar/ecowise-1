import "../styles/style.css";
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu, navigateToChallenge, viewProfile, navigateToDetail } from "../scripts/function-nav";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from './firebase-config';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
    const elementsToAnimate = [
        ".welcome-user",
        ".lets-change-point",
        ".lets-do-challenge",
        ".challenge-recommendation",
        ".kind-challenge-2"
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            gsap.from(element, {
                opacity: 0,
                y: 50,
                duration: 1,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
                }
            });
        });
    });

    onAuthStateChanged(auth, async user => {
        if (user) {
            console.log('User is logged in:', user);
            try {
                viewProfile(user);
                await displayUserProfile(user);
                initializeHomepage();
            } catch (error) {
                console.error('Error displaying user profile:', error);
                alert('An error occurred while displaying the user profile. Please try again later.');
            }
        } else {
            console.log("No user logged in.");
            window.location.href = "register.html"; // Redirect to register page if no user logged in
        }
    });
});

async function initializeHomepage() {
    try {
        const response = await fetch('/data/challenges.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Expected JSON response from server');
        }

        const data = await response.json();

        const dailyChallenge = getRandomChallenge(data.daily);
        const baseChallenge = getRandomChallenge(data.base);
        const weeklyChallenge = getRandomChallenge(data.weekly);

        if (dailyChallenge) displayChallenge(dailyChallenge, 'daily');
        if (baseChallenge) displayChallenge(baseChallenge, 'base');
        if (weeklyChallenge) displayChallenge(weeklyChallenge, 'weekly');

    } catch (error) {
        console.error('Error loading challenges:', error);
    }
}

async function displayUserProfile(user) {
    const welcomeUserElement = document.querySelector('.profile');
    if (user) {
        console.log('User is logged in:', user);
        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const displayName = userData.name || 'Nama Pengguna';
                welcomeUserElement.innerHTML = `
                    <div class="welcome-user">
                        <div class="container-homepage-img">
                            <img src="assets/svg/environment-3.svg" alt="environtment-3">
                        </div>
                        <div class="welcome-text">
                            <p>Selamat Datang</p>
                            <h1 id="username">${displayName}</h1>
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
                    <button class="profile-button" onclick="viewProfile()">View Profile</button>
                `;
                const userPointsElement = welcomeUserElement.querySelector('#userPoints');
                await displayUserPoints(userPointsElement, user.uid); // Tampilkan poin pengguna
            } else {
                console.log('No user data found for UID:', user.uid);
                // Handle case where user data is missing
            }
        } catch (error) {
            console.error('Error fetching user document:', error);
            alert('Failed to fetch user data. Please try again later.');
        }
    } else {
        console.log('No user logged in.');
        // Handle case where no user is logged in
    }
}

async function displayUserPoints(element, uid) {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const userPoints = userData.points || 0;
            
            element.textContent = `${userPoints} Points`;
        } else {
            console.log('No user data found for UID:', uid);
        }
    } catch (error) {
        console.error('Error fetching user points:', error);
    }
}

function displayChallenge(challenge, type) {
    const recommendationContainer = document.getElementById('challenge-recommendations');
    if (!recommendationContainer) {
        console.error('Element with ID "challenge-recommendations" not found.');
        return;
    }

    const challengeDiv = document.createElement('div');
    challengeDiv.classList.add('recommendation-challenge');

    challengeDiv.innerHTML = `
        <div class="recommendation-challenge-text">
            <h3 class="kind-of-challenge-${type}">${challenge.kind}</h3>
            <h2>${challenge.name}</h2>
            <p>${challenge.description}</p>
        </div>
        <div class="recommendation-challenge-images">
            <img src="${challenge.image}" alt="${challenge.name}">
        </div>
    `;

    recommendationContainer.appendChild(challengeDiv);
}

function getRandomChallenge(challenges) {
    if (!challenges || challenges.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * challenges.length);
    return challenges[randomIndex];
}

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.navigateToChallenge = navigateToChallenge;
window.viewProfile = viewProfile;
window.navigateToDetail = navigateToDetail;
