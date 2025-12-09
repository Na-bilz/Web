document.addEventListener('DOMContentLoaded', () => {

    // Tab Switching Logic
    const controls = document.querySelectorAll('.control-btn');
    const displays = document.querySelectorAll('.display-item');

    controls.forEach(control => {
        control.addEventListener('click', () => {
            // Remove active class from all controls
            controls.forEach(c => c.classList.remove('active'));

            // Add active class to clicked control
            control.classList.add('active');

            // Get target display id
            const targetId = control.getAttribute('data-target');

            // Hide all displays
            displays.forEach(display => {
                display.classList.remove('active');
            });

            // Show target display
            const targetDisplay = document.getElementById(targetId);
            if (targetDisplay) {
                targetDisplay.classList.add('active');
            }

            // Dynamic Background Switching
            const workBg = document.getElementById('bg-work');
            if (workBg) {
                if (targetId === 'display-1') {
                    // Game Projects
                    workBg.style.backgroundImage = `
                        linear-gradient(to bottom, rgba(11, 12, 16, 0.9), rgba(11, 12, 16, 0.95)), 
                        url('assets/bg-work.png')`;
                } else if (targetId === 'display-2') {
                    // 2D Illustrations (Artworks)
                    workBg.style.backgroundImage = `
                        linear-gradient(to bottom, rgba(11, 12, 16, 0.9), rgba(11, 12, 16, 0.95)), 
                        url('assets/bg-illustration.png')`;
                } else if (targetId === 'display-3') {
                    // Animations
                    workBg.style.backgroundImage = `
                        linear-gradient(to bottom, rgba(11, 12, 16, 0.9), rgba(11, 12, 16, 0.95)), 
                        url('assets/bg-animation.png')`;
                }
            }
        });
    });

    // Parallax Logic
    const parallaxBgs = document.querySelectorAll('.parallax-bg');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxBgs.forEach(bg => {
            // Get parent section offset to calculate relative position
            const section = bg.parentElement;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Check if section is in view
            if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                // Calculate speed (0.3 is the speed factor, adjust as needed)
                const yPos = (scrolled - sectionTop) * 0.3;
                bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Lightbox Functionality ---
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content-wrapper">
            <button class="lightbox-close"><i class="fa-solid fa-xmark"></i></button>
            <img src="" alt="Full view" class="lightbox-img">
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    let currentLink = '';

    // Delegate click event for dynamically added gallery items
    // Delegate click event for dynamically added gallery items
    document.addEventListener('click', (e) => {
        // Check for gallery item with either full img or link
        const galleryItem = e.target.closest('.gallery-item');

        if (galleryItem) {
            const fullImgSrc = galleryItem.getAttribute('data-full-img');
            const linkUrl = galleryItem.getAttribute('data-link');

            if (fullImgSrc) {
                e.preventDefault();
                lightboxImg.src = fullImgSrc;
                currentLink = linkUrl;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Disable scroll
            } else if (linkUrl) {
                // Direct link without lightbox
                // e.preventDefault(); // Optional: if we want to stop default anchor behavior (though these are divs)
                window.open(linkUrl, '_blank');
            }
        }
    });

    // Close Lightbox Function
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Enable scroll
        // Clear src after transition to prevent flicker
        setTimeout(() => {
            if (!lightbox.classList.contains('active')) lightboxImg.src = '';
        }, 300);
    }

    // Close button click
    lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
            closeLightbox();
        }
    });

    // Click Image to Visit Link
    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentLink) {
            window.open(currentLink, '_blank');
        }
    });

});
