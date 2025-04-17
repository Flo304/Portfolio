let images = ['Assets/render15.png']; // Array of image filenames
let currentIndex = 0; // Start with the first image
let slideInterval;

function createImageSlider() {
    const container = document.getElementById('animation-container');
    
    // Create an image element
    const img = document.createElement('img');
    img.src = images[currentIndex];
    img.classList.add('slider-image'); // Add a class for styling
    container.innerHTML = ''; // Clear previous images
    container.appendChild(img);

    // Set the image to fade in/out
    img.style.opacity = 0;
    setTimeout(() => img.style.opacity = 1, 100); // Fade-in effect

    // After 3 seconds, move to the next image
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length; // Loop through images
        createImageSlider(); // Call the function again to change image
    }, 3000);
}

// Initialize the image slider
createImageSlider();
