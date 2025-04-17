let images = ['Assets/A1.png', 'Assets/A2.png', 'Assets/A3.png' ]; // Array of image filenames
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

    // Set the size and placement of the image here
    img.style.maxWidth = '80%'; // Control size (80% of the container width)
    img.style.maxHeight = '80%'; // Control size (80% of the container height)
    img.style.objectFit = 'contain'; // Ensures the image scales without distortion
    img.style.position = 'absolute'; // Positioning within the container
    img.style.top = '50%'; // Center vertically
    img.style.left = '50%'; // Center horizontally
    img.style.transform = 'translate(-50%, -50%)'; // Adjust to truly center the image

    // After 3 seconds, move to the next image
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length; // Loop through images
        createImageSlider(); // Call the function again to change image
    }, 6000);
}

// Initialize the image slider
createImageSlider();
