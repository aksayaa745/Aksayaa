import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// Initialize Particles
const loadParticles = async () => {
    await loadSlim(tsParticles);

    await tsParticles.load({
        id: "particles-js",
        options: {
            background: {
                color: {
                    value: "#050509",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: ["#ffffff", "#f5a623"], // White and Yellowish-Orange
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.1, // Very subtle links
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 1, // Slow movement
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80, // Moderate density
                },
                opacity: {
                    value: 0.3,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        },
    });
};

loadParticles();

// Typing Effect
const typingText = document.querySelector('.typing-text');
const words = ["UI/UX Designer", "Full Stack Developer", "Creative Thinker"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500); // Pause before typing next word
    } else {
        setTimeout(typeEffect, isDeleting ? 100 : 200);
    }
};

// Start typing effect
typeEffect();

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Hero Profile Parallax
    const heroProfile = document.querySelector('.profile-frame');
    if (heroProfile) {
        heroProfile.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Enhanced Scroll Reveal Animation
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

// Target elements for reveal
document.querySelectorAll('.reveal-text, .reveal-card, .section-header, .skill-category, .project-card, .contact-item, .contact-form-card').forEach((el, index) => {
    el.classList.add('reveal');
    // Add staggered delay for grid items
    if (el.classList.contains('skill-category') || el.classList.contains('project-card')) {
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
    }
    revealObserver.observe(el);
});

// Refined 3D Tilt Effect for Project Cards
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // More subtle and realistic rotation
        const rotateX = ((y - centerY) / centerY) * -10; // Increased max rotation slightly
        const rotateY = ((x - centerX) / centerX) * 10;  // Increased max rotation slightly

        // Add translateZ for "pop" effect
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    card.addEventListener('mouseleave', () => {
        // Smooth reset
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none'; // Remove transition for instant response on enter
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active Navigation Highlight (Scroll Spy)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const scrollSpyOptions = {
    threshold: 0.5 // Trigger when 50% of section is visible
};

const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, scrollSpyOptions);

sections.forEach(section => {
    scrollSpyObserver.observe(section);
});
