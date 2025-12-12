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
        heroTitle.style.background = `linear-gradient(135deg, #ffffff 0%, ${theme.accent} 50%, #ffffff 100%)`;
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
    const cycleTime = 4000;
    
    themeChangeInterval = setInterval(changeTheme, cycleTime);
    
    let scrollCount = 0;
    const scrollThreshold = 500;
    
    window.addEventListener('scroll', function() {
        scrollCount += Math.abs(window.scrollY - (window.lastScrollY || 0));
        window.lastScrollY = window.scrollY;
        
        if (scrollCount >= scrollThreshold) {
            changeTheme();
            scrollCount = 0;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    applyTheme(colorThemes[0]);
    startThemeCycle();
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', function() {
            const randomTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
            applyTheme(randomTheme);
        });
    }
});
