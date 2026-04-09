document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // STICKY NAV — Scroll Logic
    // ============================================
    const siteNav = document.getElementById('siteNav');
    
    if (siteNav) {
        let lastScroll = 0;
        const scrollThreshold = 80;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > scrollThreshold) {
                siteNav.classList.add('scrolled');
            } else {
                siteNav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ============================================
    // MOBILE MENU & DROPDOWN LOGIC
    // ============================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a standard link
        document.querySelectorAll('.nav-links > li > a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking items inside dropdown on mobile
        document.querySelectorAll('.dropdown-list a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 800) {
                    hamburgerBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Mobile Dropdown Toggle
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const navDropdown = document.querySelector('.nav-dropdown');
    
    if (dropdownToggle && navDropdown) {
        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 800) {
                e.preventDefault(); // Prevent jump to #full-color-led
                navDropdown.classList.toggle('active');
            }
        });
    }

    // ============================================
    // IMAGE DATABASES — Keynote Catalogs
    // ============================================
    const kandanImages = [
        { src: '01Yellow 歓談-17559-thumb.jpeg', highres: '01Yellow 歓談-17559.jpeg', name: '01 Yellow' },
        { src: '02Yellow green 歓談-17564-thumb.jpeg', highres: '02Yellow green 歓談-17564.jpeg', name: '02 Yellow green' },
        { src: '03White 歓談-17562-thumb.jpeg', highres: '03White 歓談-17562.jpeg', name: '03 White' },
        { src: '04Shian 歓談-17558-thumb.jpeg', highres: '04Shian 歓談-17558.jpeg', name: '04 Cyan' },
        { src: '05Red 歓談-17557-thumb.jpeg', highres: '05Red 歓談-17557.jpeg', name: '05 Red' },
        { src: '06Purple 歓談-17556-thumb.jpeg', highres: '06Purple 歓談-17556.jpeg', name: '06 Purple' },
        { src: '07pink 歓談-17563-thumb.jpeg', highres: '07pink 歓談-17563.jpeg', name: '07 Pink' },
        { src: '08Magenta 歓談-17575-thumb.jpeg', highres: '08Magenta 歓談-17575.jpeg', name: '08 Magenta' },
        { src: '09Pastel purple 歓談-17560-thumb.jpeg', highres: '09Pastel purple 歓談-17560.jpeg', name: '09 Pastel purple' },
        { src: '10Pastel pink 歓談-17578-thumb.jpeg', highres: '10Pastel pink 歓談-17578.jpeg', name: '10 Pastel pink' },
        { src: '11Pastel green 歓談-17555-thumb.jpeg', highres: '11Pastel green 歓談-17555.jpeg', name: '11 Pastel green' },
        { src: '12Pastel blue 歓談-17576-thumb.jpeg', highres: '12Pastel blue 歓談-17576.jpeg', name: '12 Pastel blue' },
        { src: '13pastel amber 歓談-17579-thumb.jpeg', highres: '13pastel amber 歓談-17579.jpeg', name: '13 Pastel amber' },
        { src: '14Green 歓談-17582-thumb.jpeg', highres: '14Green 歓談-17582.jpeg', name: '14 Green' },
        { src: '15Blue 歓談-17577-thumb.jpeg', highres: '15Blue 歓談-17577.jpeg', name: '15 Blue' },
        { src: '16Blue green 歓談-17580-thumb.jpeg', highres: '16Blue green 歓談-17580.jpeg', name: '16 Blue green' },
        { src: '17Amber 歓談-17561-thumb.jpeg', highres: '17Amber 歓談-17561.jpeg', name: '17 Amber' }
    ];

    const chandelierImages = [
        { src: '01Yellow シャンデリア-16439-thumb.jpeg', highres: '01Yellow シャンデリア-16439.jpeg', name: '01 Yellow' },
        { src: '02Yellow Green シャンデリア-16442-thumb.jpeg', highres: '02Yellow Green シャンデリア-16442.jpeg', name: '02 Yellow Green' },
        { src: '03White シャンデリア-16450-thumb.jpeg', highres: '03White シャンデリア-16450.jpeg', name: '03 White' },
        { src: '04Shian シャンデリア-16440-thumb.jpeg', highres: '04Shian シャンデリア-16440.jpeg', name: '04 Cyan' },
        { src: '05Red シャンデリア-16441-thumb.jpeg', highres: '05Red シャンデリア-16441.jpeg', name: '05 Red' },
        { src: '06Purple シャンデリア-16443-thumb.jpeg', highres: '06Purple シャンデリア-16443.jpeg', name: '06 Purple' },
        { src: '07Pink シャンデリア-16436-thumb.jpeg', highres: '07Pink シャンデリア-16436.jpeg', name: '07 Pink' },
        { src: '08Magenta シャンデリア-16447-thumb.jpeg', highres: '08Magenta シャンデリア-16447.jpeg', name: '08 Magenta' },
        { src: '09Lite Purple-16457-thumb.jpeg', highres: '09Lite Purple-16457.jpeg', name: '09 Lite Purple' },
        { src: '10Lite Pink-16456-thumb.jpeg', highres: '10Lite Pink-16456.jpeg', name: '10 Lite Pink' },
        { src: '11Lite Green-16437-thumb.jpeg', highres: '11Lite Green-16437.jpeg', name: '11 Lite Green' },
        { src: '12Lite Blue-16460-thumb.jpeg', highres: '12Lite Blue-16460.jpeg', name: '12 Lite Blue' },
        { src: '13Lite Amber-16467-thumb.jpeg', highres: '13Lite Amber-16467.jpeg', name: '13 Lite Amber' },
        { src: '14Green シャンデリア-16458-thumb.jpeg', highres: '14Green シャンデリア-16458.jpeg', name: '14 Green' },
        { src: '15Blue シャンデリア-16461-thumb.jpeg', highres: '15Blue シャンデリア-16461.jpeg', name: '15 Blue' },
        { src: '16Blue Green シャンデリア-16459-thumb.jpeg', highres: '16Blue Green シャンデリア-16459.jpeg', name: '16 Blue Green' },
        { src: '17Amber シャンデリア-16444-thumb.jpeg', highres: '17Amber シャンデリア-16444.jpeg', name: '17 Amber' }
    ];

    const beamImages = [
        { src: '01Yellow Beam-17354-thumb.jpeg', highres: '01Yellow Beam-17354.jpeg', name: '01 Yellow Beam' },
        { src: '02White Beam-17345-thumb.jpeg', highres: '02White Beam-17345.jpeg', name: '02 White Beam' },
        { src: '03Shian Beam-17352-thumb.jpeg', highres: '03Shian Beam-17352.jpeg', name: '03 Cyan Beam' },
        { src: '04Red Beam-17365-thumb.jpeg', highres: '04Red Beam-17365.jpeg', name: '04 Red Beam' },
        { src: '05Purple Beam-17350-thumb.jpeg', highres: '05Purple Beam-17350.jpeg', name: '05 Purple Beam' },
        { src: '06Pink Beam-17351-thumb.jpeg', highres: '06Pink Beam-17351.jpeg', name: '06 Pink Beam' },
        { src: '07Lite Purple Beam-17349-thumb.jpeg', highres: '07Lite Purple Beam-17349.jpeg', name: '07 Lite Purple Beam' },
        { src: '08Lite Pink Beam-17346-thumb.jpeg', highres: '08Lite Pink Beam-17346.jpeg', name: '08 Lite Pink Beam' },
        { src: '09Lite Green Beam-17356-thumb.jpeg', highres: '09Lite Green Beam-17356.jpeg', name: '09 Lite Green Beam' },
        { src: '10Green Beam-17344-thumb.jpeg', highres: '10Green Beam-17344.jpeg', name: '10 Green Beam' },
        { src: '11Blue Beam-17364-thumb.jpeg', highres: '11Blue Beam-17364.jpeg', name: '11 Blue Beam' },
        { src: '12Blue White Beam-17366-thumb.jpeg', highres: '12Blue White Beam-17366.jpeg', name: '12 Blue White Beam' },
        { src: '13OfWhite Beam-17363-thumb.jpeg', highres: '13OfWhite Beam-17363.jpeg', name: '13 OffWhite Beam' },
        { src: '14Orange Beam-17343-thumb.jpeg', highres: '14Orange Beam-17343.jpeg', name: '14 Orange Beam' }
    ];

    // ============================================
    // RENDER CATALOG GRIDS
    // ============================================
    function renderGrid(containerId, images) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = images.map(img => {
            return `
                <div class="color-card fade-in">
                    <div class="color-image">
                        <img src="${encodeURIComponent(img.src)}" data-highres="${encodeURIComponent(img.highres || img.src)}" alt="${img.name}" loading="lazy">
                    </div>
                    <h4>${img.name}</h4>
                </div>
            `;
        }).join('');
    }

    renderGrid('kandanGrid', kandanImages);
    renderGrid('chandelierGrid', chandelierImages);
    renderGrid('beamGrid', beamImages);

    // ============================================
    // INTERSECTION OBSERVER — Fade-in Animation
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Re-query after dynamic elements are rendered
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }, 100);

    // ============================================
    // LIGHTBOX
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG' && (e.target.closest('.color-card') || e.target.closest('.lightbox-trigger') || e.target.classList.contains('lightbox-trigger'))) {
            const imgSrc = e.target.getAttribute('data-highres') || e.target.getAttribute('src');
            const imgAlt = e.target.getAttribute('alt');

            // Reset lightbox state
            lightboxImage.style.opacity = '0';
            lightboxImage.setAttribute('src', '');
            lightboxCaption.textContent = imgAlt || '';
            
            // Show lightbox and start loading animation
            lightbox.classList.add('active');
            lightbox.classList.add('loading');
            document.body.style.overflow = 'hidden';

            // Load new image
            const newImg = new Image();
            newImg.onload = () => {
                lightboxImage.setAttribute('src', imgSrc);
                lightboxImage.style.opacity = '1';
                lightbox.classList.remove('loading');
            };
            newImg.onerror = () => {
                lightbox.classList.remove('loading');
                console.error('Failed to load image:', imgSrc);
            };
            newImg.src = imgSrc;
        }
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
