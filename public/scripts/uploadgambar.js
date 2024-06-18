import "../styles/style.css";
import "../scripts/components/Header";
import "../scripts/components/Footer";
import { toggleMenu, closeMenu } from "../scripts/function-nav";
import { auth, onAuthStateChanged } from "./firebase-config";

// Get elements
const fileInput = document.getElementById('upload');
const imagePreview = document.getElementById('imagePreview');
const completeButton = document.getElementById('complete');

// Function to get current user's ID
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      if (user) {
        resolve(user.uid);
      } else {
        reject(new Error('User is not authenticated'));
      }
    });
  });
};

// Handle file input change
fileInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/heic'];
    if (!validTypes.includes(file.type)) {
      alert('File type not supported. Please upload a JPG, JPEG, or PNG image.');
      fileInput.value = ''; // Reset the input
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
      completeButton.style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
  }
});

// Handle complete button click
completeButton.addEventListener('click', async function() {
  const file = fileInput.files[0];
  const selectedChallenge = JSON.parse(localStorage.getItem('selectedChallenge'));

  if (!file ||!selectedChallenge) {
    console.error('File or selected challenge is missing');
    return;
  }

  try {
    const userID = await getCurrentUser();

    const formData = new FormData();
    formData.append('image', file); // Append file to FormData
    formData.append('name', selectedChallenge.name); // Append name to FormData
    formData.append('userID', userID); // Append userID to FormData

    // Log the FormData content for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    console.log('Upload response:', result);

    if (response.ok) {
      console.log('File available at', result.url);
      window.location.href = "waitverif-client.html";
    } else {
      console.error('Error from server:', result.error);
      alert('Failed to upload image. Please try again later.');
    }
  } catch (error) {
    console.error('Error stack:', error.stack); // Tambahkan logging untuk error stack
  }
});

// Expose menu functions to global scope
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;