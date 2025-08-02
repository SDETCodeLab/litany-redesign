// McDermott-style JavaScript for Litany Energy Redesign

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMegaMenuNavigation();
    initMobileNavigation();
    initHeroEffects();
    initScrollEffects();
    initAnimations();
    initSmoothScrolling();
    initBootstrapComponents();
});

// McDermott-style Mega Menu Navigation
function initMegaMenuNavigation() {
    const header = document.querySelector('.header');
    
    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
            header.querySelector('.header-nav-top').style.background = 'rgba(16, 6, 159, 0.95)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
            header.querySelector('.header-nav-top').style.background = '#10069F';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Mega menu hover functionality
    const megaMenuItems = document.querySelectorAll('.we-mega-menu-li');
    megaMenuItems.forEach(item => {
        const submenu = item.querySelector('.we-mega-menu-submenu');
        
        if (submenu) {
            let hoverTimeout;
            
            item.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimeout);
                submenu.style.display = 'block';
                setTimeout(() => {
                    submenu.style.opacity = '1';
                    submenu.style.visibility = 'visible';
                    submenu.style.transform = 'translateX(-50%) translateY(0)';
                }, 50);
            });
            
            item.addEventListener('mouseleave', function() {
                hoverTimeout = setTimeout(() => {
                    submenu.style.opacity = '0';
                    submenu.style.visibility = 'hidden';
                    submenu.style.transform = 'translateX(-50%) translateY(-10px)';
                    setTimeout(() => {
                        submenu.style.display = 'none';
                    }, 300);
                }, 100);
            });
        }
    });
}

// Mobile Navigation
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.navbar-toggler');
    const mobileMenu = document.querySelector('.mobile-navigation');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function() {
            const isCollapsed = mobileMenu.classList.contains('show');
            
            if (isCollapsed) {
                mobileMenu.classList.remove('show');
                mobileToggle.classList.add('collapsed');
            } else {
                mobileMenu.classList.add('show');
                mobileToggle.classList.remove('collapsed');
            }
            
            // Animate hamburger bars
            const bars = mobileToggle.querySelectorAll('.icon-bar');
            if (!isCollapsed) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-item a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                mobileToggle.classList.add('collapsed');
                
                // Reset hamburger bars
                const bars = mobileToggle.querySelectorAll('.icon-bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });
}

// Hero Effects
function initHeroEffects() {
    // Hero video autoplay fallback
    const heroVideo = document.querySelector('.hero-video video');
    if (heroVideo) {
        // Ensure video plays on mobile devices
        heroVideo.play().catch(error => {
            console.log('Video autoplay failed:', error);
        });
        
        // Pause video when not in viewport (performance optimization)
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        });
        
        videoObserver.observe(heroVideo);
    }
    
    // Hero carousel effects
    const carouselItems = document.querySelectorAll('.energy-carousel .item');
    carouselItems.forEach((item, index) => {
        // Stagger animation delay
        item.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// McDermott-style Scroll Effects
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.cards-field-item, .contact-card, .project-spotlight-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Solutions hover section effects
    const solutionItems = document.querySelectorAll('.field__item');
    solutionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Expand this item and shrink others
            solutionItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.style.flex = '0 0 15%';
                }
            });
            this.style.flex = '1';
        });
    });
    
    // Reset on mouse leave from container
    const solutionsContainer = document.querySelector('.field__items');
    if (solutionsContainer) {
        solutionsContainer.addEventListener('mouseleave', function() {
            solutionItems.forEach(item => {
                item.style.flex = '';
            });
        });
    }
    
    // Service cards hover effects
    const serviceCards = document.querySelectorAll('.cards-field-item-desktop');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const description = this.querySelector('.cards-field-description');
            if (description) {
                description.style.opacity = '1';
                description.style.maxHeight = '300px';
                description.style.padding = '1.5rem';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const description = this.querySelector('.cards-field-description');
            if (description) {
                description.style.opacity = '0';
                description.style.maxHeight = '0';
                description.style.padding = '0 1.5rem';
            }
        });
    });
}

// Initialize McDermott-style animations
function initAnimations() {
    // Stagger animation for service cards
    const serviceCards = document.querySelectorAll('.cards-field-item-desktop');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Button hover effects with McDermott styling
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Contact card animations
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.borderColor = 'var(--primary-blue)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = 'transparent';
        });
    });
    
    // Image lazy loading with fade-in effect
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                
                img.onload = function() {
                    this.style.transition = 'opacity 0.5s ease';
                    this.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Scroll-triggered counter animations
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let hasAnimated = false;
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateCounter(counter, 0, target, 2000);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
}

// Counter animation helper
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (range * progress));
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Bootstrap Components Integration
function initBootstrapComponents() {
    // Initialize Bootstrap collapse components for mobile accordions
    const accordionButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-bs-target'));
            if (target) {
                if (target.classList.contains('show')) {
                    target.classList.remove('show');
                    this.classList.add('collapsed');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    // Close other accordion items in the same parent
                    const parent = target.getAttribute('data-bs-parent');
                    if (parent) {
                        const parentElement = document.querySelector(parent);
                        const otherTargets = parentElement.querySelectorAll('.accordion-collapse.show');
                        otherTargets.forEach(otherTarget => {
                            otherTarget.classList.remove('show');
                            const otherButton = document.querySelector(`[data-bs-target="#${otherTarget.id}"]`);
                            if (otherButton) {
                                otherButton.classList.add('collapsed');
                                otherButton.setAttribute('aria-expanded', 'false');
                            }
                        });
                    }
                    
                    target.classList.add('show');
                    this.classList.remove('collapsed');
                    this.setAttribute('aria-expanded', 'true');
                }
            }
        });
    });
}

// Form handling for contact forms
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // McDermott-style form validation
            const formData = new FormData(form);
            const submitBtn = form.querySelector('[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state with McDermott colors
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = 'var(--primary-blue)';
            submitBtn.style.opacity = '0.7';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#28a745';
                submitBtn.style.opacity = '1';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.opacity = '';
                    form.reset();
                }, 2000);
            }, 1000);
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Page load optimizations
window.addEventListener('load', function() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Initialize any remaining components that require full page load
    initLazyLoading();
    
    // Performance monitoring (McDermott style)
    if (window.performance && window.performance.mark) {
        window.performance.mark('litany-page-loaded');
    }
});

// Lazy loading for better performance
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Background images lazy loading
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');
    const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.backgroundImage = `url('${element.getAttribute('data-bg')}')`;
                element.removeAttribute('data-bg');
                bgObserver.unobserve(element);
            }
        });
    });
    
    lazyBackgrounds.forEach(el => bgObserver.observe(el));
}

// Enhanced error handling for McDermott-style components
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        // Replace with placeholder or hide gracefully
        e.target.style.opacity = '0.5';
        e.target.alt = 'Image unavailable';
        console.warn('Image failed to load:', e.target.src);
        
        // Try to load a fallback image
        if (e.target.dataset.fallback) {
            e.target.src = e.target.dataset.fallback;
        }
    }
    
    if (e.target.tagName === 'VIDEO') {
        console.warn('Video failed to load:', e.target.src);
        // Hide video container and show fallback image
        const heroVideo = e.target.closest('.hero-video');
        if (heroVideo) {
            heroVideo.style.display = 'none';
        }
    }
}, true);

// Resize event listener for McDermott responsive adjustments
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments
    const mobileMenu = document.querySelector('.mobile-navigation');
    const mobileToggle = document.querySelector('.navbar-toggler');
    
    if (window.innerWidth > 767) {
        // Desktop view - hide mobile menu
        if (mobileMenu && mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            if (mobileToggle) {
                mobileToggle.classList.add('collapsed');
                // Reset hamburger bars
                const bars = mobileToggle.querySelectorAll('.icon-bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        }
        
        // Reset solution items flex on desktop
        const solutionItems = document.querySelectorAll('.field__item');
        solutionItems.forEach(item => {
            item.style.flex = '';
        });
    }
}, 250));

// McDermott-specific utility functions
function initMcDermottEffects() {
    // Add any McDermott-specific effects here
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', throttle(() => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16)); // 60fps
    }
}

// Initialize McDermott effects after DOM is ready  
document.addEventListener('DOMContentLoaded', initMcDermottEffects);

// Accessibility enhancements
function initAccessibility() {
    // Skip link functionality
    const skipLinks = document.querySelectorAll('a[href^="#"]');
    skipLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Keyboard navigation for mega menu
    const menuItems = document.querySelectorAll('.we-mega-menu-li > a, .we-megamenu-nolink');
    menuItems.forEach(item => {
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Simulate hover for keyboard users
                const submenu = this.parentElement.querySelector('.we-mega-menu-submenu');
                if (submenu) {
                    submenu.style.opacity = submenu.style.opacity === '1' ? '0' : '1';
                    submenu.style.visibility = submenu.style.visibility === 'visible' ? 'hidden' : 'visible';
                }
            }
        });
    });
}

// Initialize accessibility on DOM ready
document.addEventListener('DOMContentLoaded', initAccessibility);

// Performance optimization for mobile devices
if ('ontouchstart' in window) {
    // Add touch-specific optimizations
    document.body.classList.add('touch-device');
    
    // Reduce animations on touch devices for better performance
    const style = document.createElement('style');
    style.textContent = `
        .touch-device * {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
        .touch-device .hero-video video {
            transform: translate3d(0, 0, 0);
        }
    `;
    document.head.appendChild(style);
}

// Export functions for potential external use
if (typeof window !== 'undefined') {
    window.LitanyEnergyMcDermott = {
        initMegaMenuNavigation,
        initMobileNavigation,
        initHeroEffects,
        initScrollEffects,
        initAnimations,
        initBootstrapComponents
    };
}