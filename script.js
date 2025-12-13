document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
    });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', !isActive);
            document.body.style.overflow = !isActive ? 'hidden' : '';
        });

        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                portfolioItems.forEach((item, index) => {
                    const card = item.querySelector('.portfolio-card');
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        setTimeout(() => {
                            item.style.display = 'block';
                            card.classList.remove('visible');
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, 50);
                        }, index * 100);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        function validateName(name) {
            if (!name.trim()) {
                return 'Name is required';
            }
            if (name.trim().length < 2) {
                return 'Name must be at least 2 characters';
            }
            return '';
        }

        function validateEmail(email) {
            if (!email.trim()) {
                return 'Email is required';
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return 'Please enter a valid email address';
            }
            return '';
        }

        function validateSubject(subject) {
            if (!subject.trim()) {
                return 'Subject is required';
            }
            if (subject.trim().length < 3) {
                return 'Subject must be at least 3 characters';
            }
            return '';
        }

        function validateMessage(message) {
            if (!message.trim()) {
                return 'Message is required';
            }
            if (message.trim().length < 10) {
                return 'Message must be at least 10 characters';
            }
            return '';
        }

        function showError(input, errorId, message) {
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = message ? 'block' : 'none';
            }
            if (message) {
                input.setAttribute('aria-invalid', 'true');
                input.style.borderColor = '#ff6b6b';
            } else {
                input.setAttribute('aria-invalid', 'false');
                input.style.borderColor = '';
            }
        }

        function clearErrors() {
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => {
                error.textContent = '';
                error.style.display = 'none';
            });
            [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                if (input) {
                    input.setAttribute('aria-invalid', 'false');
                    input.style.borderColor = '';
                }
            });
        }

        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                const error = validateName(this.value);
                showError(this, 'name-error', error);
            });
        }

        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const error = validateEmail(this.value);
                showError(this, 'email-error', error);
            });
        }

        if (subjectInput) {
            subjectInput.addEventListener('blur', function() {
                const error = validateSubject(this.value);
                showError(this, 'subject-error', error);
            });
        }

        if (messageInput) {
            messageInput.addEventListener('blur', function() {
                const error = validateMessage(this.value);
                showError(this, 'message-error', error);
            });
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();
            
            const name = nameInput ? nameInput.value : '';
            const email = emailInput ? emailInput.value : '';
            const subject = subjectInput ? subjectInput.value : '';
            const message = messageInput ? messageInput.value : '';

            const nameError = validateName(name);
            const emailError = validateEmail(email);
            const subjectError = validateSubject(subject);
            const messageError = validateMessage(message);

            let hasErrors = false;

            if (nameError) {
                showError(nameInput, 'name-error', nameError);
                hasErrors = true;
            }
            if (emailError) {
                showError(emailInput, 'email-error', emailError);
                hasErrors = true;
            }
            if (subjectError) {
                showError(subjectInput, 'subject-error', subjectError);
                hasErrors = true;
            }
            if (messageError) {
                showError(messageInput, 'message-error', messageError);
                hasErrors = true;
            }

            if (!hasErrors) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.style.opacity = '0.7';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent! ✓';
                    submitBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
                    
                    setTimeout(() => {
                        contactForm.reset();
                        clearErrors();
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.opacity = '1';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            } else {
                contactForm.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    contactForm.style.animation = '';
                }, 500);
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        observer.observe(card);
    });

    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        observer.observe(card);
    });

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });

    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        });
    }

    const pageHeaders = document.querySelectorAll('.page-header');
    pageHeaders.forEach(header => {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rect = header.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const parallaxSpeed = 0.3;
                header.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    });

    const cards = document.querySelectorAll('.feature-card, .portfolio-card, .skill-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;
            
            card.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(btn => {
            const rect = btn.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const distance = Math.abs(rect.top - window.innerHeight / 2);
                const intensity = Math.max(0, 1 - distance / (window.innerHeight / 2));
                btn.style.boxShadow = `0 10px ${30 + intensity * 20}px rgba(255, 107, 107, ${0.3 + intensity * 0.2})`;
            }
        });
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    .feature-card,
    .portfolio-card,
    .skill-item {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style);

window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
});

window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
    
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const colorThemes = [
    {
        name: 'orange',
        accent: '#ff6b6b',
        accentAlt: '#ff5252',
        glow: 'rgba(255, 107, 107, 0.5)',
        shadow: 'rgba(255, 107, 107, 0.3)'
    },
    {
        name: 'green',
        accent: '#4caf50',
        accentAlt: '#45a049',
        glow: 'rgba(76, 175, 80, 0.5)',
        shadow: 'rgba(76, 175, 80, 0.3)'
    },
    {
        name: 'blue',
        accent: '#2196f3',
        accentAlt: '#1976d2',
        glow: 'rgba(33, 150, 243, 0.5)',
        shadow: 'rgba(33, 150, 243, 0.3)'
    },
    {
        name: 'purple',
        accent: '#9c27b0',
        accentAlt: '#7b1fa2',
        glow: 'rgba(156, 39, 176, 0.5)',
        shadow: 'rgba(156, 39, 176, 0.3)'
    },
    {
        name: 'cyan',
        accent: '#00bcd4',
        accentAlt: '#0097a7',
        glow: 'rgba(0, 188, 212, 0.5)',
        shadow: 'rgba(0, 188, 212, 0.3)'
    },
    {
        name: 'pink',
        accent: '#e91e63',
        accentAlt: '#c2185b',
        glow: 'rgba(233, 30, 99, 0.5)',
        shadow: 'rgba(233, 30, 99, 0.3)'
    },
    {
        name: 'amber',
        accent: '#ffc107',
        accentAlt: '#ffa000',
        glow: 'rgba(255, 193, 7, 0.5)',
        shadow: 'rgba(255, 193, 7, 0.3)'
    }
];

let currentThemeIndex = 0;
let themeChangeInterval;

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function applyTheme(theme) {
    const root = document.documentElement;
    root.style.setProperty('--accent-color', theme.accent);
    root.style.setProperty('--accent-glow', theme.accent);
    root.style.setProperty('--accent-color-alt', theme.accentAlt);
    root.style.setProperty('--glow', `0 0 20px ${theme.glow}`);
    root.style.setProperty('--shadow-hover', `0 20px 60px ${theme.shadow}`);
    
    const accentRgba = hexToRgba(theme.accent, 0.1);
    root.style.setProperty('--accent-bg', accentRgba);
    
    const beforeBg = `radial-gradient(circle at 20% 50%, ${accentRgba} 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(106, 90, 205, 0.1) 0%, transparent 50%), linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)`;
    const afterBg = `radial-gradient(2px 2px at 20% 30%, rgba(255, 255, 255, 0.1), transparent), radial-gradient(2px 2px at 60% 70%, ${accentRgba}, transparent), radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.1), transparent)`;
    
    root.style.setProperty('--bg-before', beforeBg);
    root.style.setProperty('--bg-after', afterBg);
    
    const buttons = document.querySelectorAll('.btn-primary, .back-to-top');
    buttons.forEach(btn => {
        btn.style.background = `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentAlt} 100%)`;
        btn.style.boxShadow = `0 10px 30px ${theme.shadow}`;
    });
    
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.style.textShadow = `0 0 20px ${theme.glow}`;
    });
    
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.textShadow = `0 0 10px ${theme.glow}`;
    });
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.background = 'none';
        heroTitle.style.backgroundImage = 'none';
        heroTitle.style.color = '#ffffff';
        heroTitle.style.webkitTextFillColor = '#ffffff';
        heroTitle.style.backgroundClip = 'unset';
        heroTitle.style.webkitBackgroundClip = 'unset';
    }
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.background = 'none';
        heroContent.style.backgroundImage = 'none';
        heroContent.style.boxShadow = 'none';
    }
    
    const navLinks = document.querySelectorAll('.nav-menu a:hover, .nav-menu a.active');
    navLinks.forEach(link => {
        link.style.textShadow = `0 0 10px ${theme.glow}`;
    });
}

function changeTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % colorThemes.length;
    applyTheme(colorThemes[currentThemeIndex]);
}

function startThemeCycle() {
    // Color cycling disabled - keeping original orange theme
    // themeChangeInterval = setInterval(changeTheme, cycleTime);
}

// Interactive Cursor System
let cursor = document.getElementById('cursor');
let cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

if (cursor && cursorTrail) {
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    const hoverElements = document.querySelectorAll('a, button, .btn, .feature-card, .portfolio-card, .link-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Particle System
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const isMobile = window.innerWidth <= 768;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = isMobile ? 10 : 30;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
            ctx.fillStyle = accentColor;
            ctx.globalAlpha = this.opacity * 0.5;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let animationFrameId;
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    function animateParticles(currentTime) {
        if (currentTime - lastTime >= frameInterval) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Disable particle connections on mobile for better performance
            if (!isMobile) {
                particles.forEach((particle, i) => {
                    particles.slice(i + 1).forEach(otherParticle => {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 80) {
                            const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
                            ctx.strokeStyle = accentColor;
                            ctx.globalAlpha = (80 - distance) / 80 * 0.1;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            ctx.stroke();
                            ctx.globalAlpha = 1;
                        }
                    });
                });
            }

            lastTime = currentTime;
        }

        animationFrameId = requestAnimationFrame(animateParticles);
    }

    animateParticles(0);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Magnetic Buttons (disabled on mobile)
function initMagneticButtons() {
    if (window.innerWidth <= 768) return; // Disable on mobile
    
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .link-card, .feature-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.3;
            const moveY = y * 0.3;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// 3D Card Tilt Effect (disabled on mobile)
function init3DCards() {
    if (window.innerWidth <= 768) return; // Disable on mobile
    
    const cards = document.querySelectorAll('.feature-card, .portfolio-card, .skill-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Advanced Text Animation
function initTextAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px)';
            span.style.transition = `all 0.6s ease ${index * 0.03}s`;
            heroTitle.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100);
        });
    }
}

// Scroll-triggered 3D effects (disabled on mobile)
function initScroll3DEffects() {
    if (window.innerWidth <= 768) return; // Disable on mobile
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                
                if (hero) {
                    const heroContent = hero.querySelector('.hero-content');
                    if (heroContent) {
                        const rotateY = scrolled * 0.1;
                        const rotateX = scrolled * 0.05;
                        heroContent.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${scrolled * 0.5}px)`;
                    }
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Floating elements animation (simplified on mobile)
function initFloatingElements() {
    const isMobile = window.innerWidth <= 768;
    const floatingElements = document.querySelectorAll('.feature-card, .portfolio-card');
    
    if (isMobile) {
        // Disable floating on mobile for better performance
        return;
    }
    
    floatingElements.forEach((element, index) => {
        const delay = index * 0.2;
        const duration = 3 + Math.random() * 2;
        const amplitude = 10 + Math.random() * 10;
        
        element.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                }
                25% {
                    transform: translateY(-${amplitude}px) rotate(1deg);
                }
                50% {
                    transform: translateY(-${amplitude * 0.5}px) rotate(0deg);
                }
                75% {
                    transform: translateY(-${amplitude}px) rotate(-1deg);
                }
            }
        `;
        document.head.appendChild(style);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Apply only the original orange theme
    applyTheme(colorThemes[0]);
    startThemeCycle();
    initMagneticButtons();
    init3DCards();
    initTextAnimations();
    initScroll3DEffects();
    initFloatingElements();
    
    // Disable cursor on mobile
    if (window.innerWidth <= 768) {
        document.documentElement.style.cursor = 'auto';
        document.body.style.cursor = 'auto';
        if (cursor) cursor.style.display = 'none';
        if (cursorTrail) cursorTrail.style.display = 'none';
    }
});
