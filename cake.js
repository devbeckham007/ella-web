// Start at the first slide
let currentSlide = 0;

// Get all the slide elements
const slides = document.querySelectorAll(".carousel-slide");

// Get the left and right buttons
const leftBtn = document.querySelector(".btn-left");
const rightBtn = document.querySelector(".btn-right");

// Function to show the slide at a specific index
function showSlide(index) {
  // Hide all slides
  slides.forEach(slide => {
    // slide.style.display = "none";
  });

  // Show the one at the current index
  slides[index].style.display = "block";
}

// Show the first slide when the page loads
showSlide(currentSlide);

// When right button is clicked (Next)
rightBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// When left button is clicked (Previous)
leftBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});