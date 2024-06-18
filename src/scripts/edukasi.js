import "../styles/style.css";
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu, navigateToChallenge, viewProfile } from "../scripts/function-nav";
// edukasi-script.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Daftarkan plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {
    // Animasi untuk elemen dengan class container-shape
    const uniqueShape = document.querySelector(".unique-shape");
    const uniqueShapeText = document.querySelector(".unique-shape-text");
    const uniqueShapeImage = document.querySelector(".unique-shape-image-education");

    gsap.from(uniqueShapeText, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        scrollTrigger: {
            trigger: uniqueShape,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(uniqueShapeImage, {
        opacity: 0,
        x: -50,
        duration: 1.5,
        scrollTrigger: {
            trigger: uniqueShape,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });

    // Animasi untuk elemen dengan class container-education
    gsap.from(".container-education", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".container-education",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });

    const educationContainers = document.querySelectorAll(".education-list-container");

    educationContainers.forEach((container, index) => {
        gsap.from(container, {
            duration: 1.5,
            opacity: 0,
            x: -100,
            ease: "power1.out",
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none",
                markers: true, // Untuk memudahkan pemecahan masalah, bisa dihapus saat sudah selesai
                onToggle: self => {
                    if (self.isActive) {
                        gsap.to(container, { opacity: 1, x: 0, duration: 1 });
                    }
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/data/articles.json');
        const articles = await response.json();

        if (document.querySelector('.education-container-2')) {
            const container = document.querySelector('.education-container-2');
            articles.forEach((article, index) => {
                const articleDiv = document.createElement('div');
                articleDiv.id = 'education-list-container';
                articleDiv.innerHTML = `
                    <img src="${article.img}" alt="image-article">
                    <h2 class="article-title">${article.title}</h2>
                    <p class="article-description">${article.description}</p>
                `;
                articleDiv.addEventListener('click', () => {
                    localStorage.setItem('selectedArticle', JSON.stringify(article));
                    window.location.href = 'detailartikel.html';
                });
                container.appendChild(articleDiv);
            });
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
});

// Function to add a new article
async function addArticle(article) {
    try {
        const response = await fetch('http://localhost:5000/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to add article');
        }
        const result = await response.json();
        console.log('Added article:', result.message);
    } catch (error) {
        console.error('Error adding article:', error);
    }
}

// Function to update an existing article by title
async function updateArticle(articleTitle, updatedArticle) {
    try {
        const response = await fetch(`http://localhost:5000/articles/${articleTitle}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedArticle)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update article');
        }
        const result = await response.json();
        console.log('Updated article:', result.message);
    } catch (error) {
        console.error('Error updating article:', error);
    }
}

// Function to delete an article by title
async function deleteArticle(articleTitle) {
    try {
        const response = await fetch(`http://localhost:5000/articles/${articleTitle}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete article');
        }
        const result = await response.json();
        console.log('Deleted article:', result.message);
    } catch (error) {
        console.error('Error deleting article:', error);
    }
}

// Set functions to the global window object
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.navigateToChallenge = navigateToChallenge;
window.viewProfile = viewProfile;