// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const loader = document.getElementById('loader');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');
const downloadCVBtn = document.getElementById('downloadCV');

// Initialize particles background
function initParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles-js');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesContainer.appendChild(canvas);

    const particles = [];
    const particleCount = 80;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.3 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Connect nearby particles
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 120)})`;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Loading screen
function hideLoader() {
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
}

// Mobile menu toggle
function toggleMobileMenu() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar scroll effect
function handleNavbarScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Active navigation link
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function smoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .timeline-card, .skill-card, .project-card, .certificate-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Skill progress bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                progressBar.style.width = percentage;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Scroll to top button
function handleScrollToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact form handling
function handleContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simple form validation
        if (!name || !email || !message) {
            alert('Mohon isi semua field yang diperlukan.');
            return;
        }

        // Simulate form submission
        alert('Terima kasih! Pesan Anda telah dikirim.');
        contactForm.reset();
    });
}

// CV Download functionality
function handleCVDownload() {
    if (!downloadCVBtn) return;
    
    downloadCVBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create a temporary link element
        const link = document.createElement('a');
        
        // You can replace this with your actual CV file URL
        const cvContent = `...`; // Your CV content here
        
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        
        link.href = url;
        link.download = 'CV_WebDeveloper.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        // Show success message
        alert('CV berhasil didownload!');
    });
}

// Enhanced Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) {
        console.warn('Typing element not found');
        return;
    }

    // Backup original text if needed
    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.style.visibility = 'visible'; // Ensure it's visible

    const words = JSON.parse(typingElement.getAttribute('data-words')) || ['Informatic', 'Cyber Security'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start animation after short delay to allow other elements to load
    setTimeout(type, 1000);
}

// Parallax effect for home section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-cube');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 * (index + 1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        const bgShapes = document.querySelectorAll('.shape');
        bgShapes.forEach((shape, index) => {
            const speed = 0.1 * (index + 1);
            shape.style.transform += ` translateY(${scrolled * speed}px)`;
        });
    });
}

// 3D card tilt effect
function init3DCardTilt() {
    const cards = document.querySelectorAll('.about-card, .timeline-card, .skill-card, .project-card, .certificate-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// Initialize all functions
function init() {
    hideLoader();
    initParticles();
    toggleMobileMenu();
    handleNavbarScroll();
    setActiveNavLink();
    smoothScrolling();
    initScrollAnimations();
    animateSkillBars();
    handleScrollToTop();
    handleContactForm();
    handleCVDownload();
    
    // Start typing animation after everything else is ready
    setTimeout(initTypingAnimation, 500);
    
    initParallax();
    init3DCardTilt();
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Handle window resize
window.addEventListener('resize', () => {
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        initParticles();
    }
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// CV Download functionality
function handleCVDownload() {
    if (!downloadCVBtn) return;
    
    downloadCVBtn.addEventListener('click', (e) => {
        // Optional: Track download event
        console.log('CV downloaded');
        // The download will happen automatically via HTML attribute
    });
}