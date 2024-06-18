import "../styles/style.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from './firebase-config'; // Pastikan firebase-config.js mengimpor konfigurasi Firebase dengan benar

// Inisialisasi Firebase
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Mencegah submit form default

        const email = emailInput.value;

        try {
            const response = await fetch('http://localhost:5000/api/emailreward', { // Pastikan URL benar
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                window.location.href = 'confirmEmailSuccess.html'; // Redirect to success page
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error submitting email:', error);
            alert('Gagal mengirim email. Coba lagi nanti.');
        }
    });
});
