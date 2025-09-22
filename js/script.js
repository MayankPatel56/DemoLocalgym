// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // FAQ Toggles
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('svg');
            
            // Toggle content visibility
            content.classList.toggle('hidden');
            
            // Rotate icon
            if (content.classList.contains('hidden')) {
                icon.classList.remove('rotate-180');
            } else {
                icon.classList.add('rotate-180');
            }
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            const consent = document.getElementById('consent').checked;
            
            // Validation flags
            let isValid = true;
            let errorMessage = '';
            
            // Validate first name
            if (firstName === '') {
                isValid = false;
                errorMessage += 'First name is required.\n';
            }
            
            // Validate last name
            if (lastName === '') {
                isValid = false;
                errorMessage += 'Last name is required.\n';
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            // Validate phone
            const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (!phoneRegex.test(phone)) {
                isValid = false;
                errorMessage += 'Please enter a valid phone number.\n';
            }
            
            // Validate subject
            if (subject === '') {
                isValid = false;
                errorMessage += 'Please select a subject.\n';
            }
            
            // Validate message
            if (message === '') {
                isValid = false;
                errorMessage += 'Message is required.\n';
            } else if (message.length < 10) {
                isValid = false;
                errorMessage += 'Message must be at least 10 characters long.\n';
            }
            
            // Validate consent
            if (!consent) {
                isValid = false;
                errorMessage += 'You must agree to the Privacy Policy.\n';
            }
            
            // Display validation results
            if (isValid) {
                // Form is valid, show success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                // Form is invalid, show error message
                alert('Please correct the following errors:\n\n' + errorMessage);
            }
        });
    }

    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.gallery-filter button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-red-600', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-800');
                });
                
                // Add active class to clicked button
                this.classList.remove('bg-gray-200', 'text-gray-800');
                this.classList.add('bg-red-600', 'text-white');
                
                // Get filter value
                const filterValue = this.textContent.toLowerCase();
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.dataset.category === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Testimonial Slider (if exists)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;
        const nextButton = document.querySelector('.testimonial-next');
        const prevButton = document.querySelector('.testimonial-prev');
        
        // Function to show slide
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            // Show current slide
            slides[index].style.display = 'block';
        }
        
        // Initialize slider
        if (totalSlides > 0) {
            showSlide(currentSlide);
            
            // Next button click
            if (nextButton) {
                nextButton.addEventListener('click', function() {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    showSlide(currentSlide);
                });
            }
            
            // Previous button click
            if (prevButton) {
                prevButton.addEventListener('click', function() {
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                    showSlide(currentSlide);
                });
            }
            
            // Auto slide every 5 seconds
            setInterval(function() {
                currentSlide = (currentSlide + 1) % totalSlides;
                showSlide(currentSlide);
            }, 5000);
        }
    }
});

// Back to top button functionality
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    }
});