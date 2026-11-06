
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

// Project Image Slideshow
document.querySelectorAll(".project-slider").forEach(slider => {
    const slides = slider.querySelector(".slides");
    const images = slides.querySelectorAll("img");
    const dotsContainer = slider.querySelector(".slider-dots");

    let currentIndex = 0;
    let autoSlide;

    if (images.length <= 1) return;

    function showSlide(index) {
        currentIndex = (index + images.length) % images.length;

        slides.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        dotsContainer.querySelectorAll(".slider-dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function startAutoSlide() {
        stopAutoSlide();

        autoSlide = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    // Create navigation dots
    images.forEach((_, index) => {
        const dot = document.createElement("span");

        dot.className = "slider-dot";
        dot.addEventListener("click", () => {
            showSlide(index);
            startAutoSlide();
        });

        dotsContainer.appendChild(dot);
    });

    // Previous button
    slider.querySelector(".prev").addEventListener("click", () => {
        showSlide(currentIndex - 1);
        startAutoSlide();
    });

    // Next button
    slider.querySelector(".next").addEventListener("click", () => {
        showSlide(currentIndex + 1);
        startAutoSlide();
    });

    // Pause when mouse enters
    slider.addEventListener("mouseenter", stopAutoSlide);

    // Resume when mouse leaves
    slider.addEventListener("mouseleave", startAutoSlide);

    showSlide(0);
    startAutoSlide();
});