import "../styles/style.css"; // Mengimpor CSS global
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu } from "../scripts/function-nav";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/data/articles.json");
    const articles = await response.json();

    // Pilih artikel pertama sebagai contoh, Anda dapat menyesuaikan ini sesuai kebutuhan
    const articleData = articles[0]; // Misalnya, ambil artikel pertama

    // Ambil elemen-elemen dari HTML
    const heroImg = document.getElementById("hero-img");
    const heroTitle = document.getElementById("hero-title");
    const articleContent = document.getElementById("article-content");

    // Set gambar hero
    heroImg.src = articleData.img;
    heroImg.alt = articleData.title;

    // Set judul artikel
    heroTitle.textContent = articleData.title;

    // Buat elemen deskripsi dan konten
    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("description");
    descriptionElement.textContent = articleData.description;

    const contentElement = document.createElement("div");
    contentElement.classList.add("content");
    contentElement.textContent = articleData.content;

    // Bersihkan konten sebelumnya jika ada
    articleContent.innerHTML = "";

    // Tambahkan deskripsi dan konten ke dalam kontainer artikel
    articleContent.appendChild(descriptionElement);
    articleContent.appendChild(contentElement);
  } catch (error) {
    console.error("Error fetching or processing articles:", error);
    // Handle error, for example redirect to another page or display error message
  }
});

// Set functions to the global window object
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;