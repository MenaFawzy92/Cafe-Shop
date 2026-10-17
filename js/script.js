document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const headerList = document.getElementById("header-list");

    if (mobileMenuBtn && headerList) {
        mobileMenuBtn.addEventListener("click", function() {
            headerList.classList.toggle("active");
        });
    }

    // 2. Mobile Submenu Toggle (for Blog)
    const blogList = document.querySelector(".blog-list");
    const blogLink = document.querySelector(".blog-list > a");

    if (blogLink) {
        blogLink.addEventListener("click", function(e) {
            // Only prevent default and toggle on mobile screens
            if (window.innerWidth <= 767) {
                e.preventDefault();
                blogList.classList.toggle("active");
            }
        });
    }

    // 3. Missing Image Fallback (Specifically for john cena.webp)
    // The HTML already has onerror attributes, but this adds a JS safety net
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Prevent infinite loop if placeholder also fails
            if (this.src !== 'https://via.placeholder.com/150?text=Image+Not+Found') {
                this.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
            }
        });
    });

    // 4. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.header-list a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 55, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                    // Close mobile menu after clicking a link
                    if (window.innerWidth <= 767) {
                        headerList.classList.remove('active');
                    }
                }
            }
        });
    });
});