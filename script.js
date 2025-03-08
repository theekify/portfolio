// Optimize particles configuration
const particlesConfig = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#333333"
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.5,
            random: false,
        },
        size: {
            value: 2,
            random: true,
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#333333",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
    },
    retina_detect: true
};

// Initialize particles.js
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', particlesConfig);
    }
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .social-icon, .project-card, .skill-category');

document.addEventListener('mousemove', (e) => {
    if (cursor && cursorFollower) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add a slight delay to the follower for a smoother effect
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    }
});

// Add hover effect to links
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        document.body.classList.add('link-hover');
    });
    
    link.addEventListener('mouseleave', () => {
        document.body.classList.remove('link-hover');
    });
});

// Scroll progress bar
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
window.addEventListener('scroll', () => {
    if (scrollProgressBar) {
        const totalScroll = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalScroll) * 100;
        scrollProgressBar.style.width = progress + '%';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Reveal animations on scroll
function revealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-item');
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

// Fix skill progress bars initialization
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Confetti effect
function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const confettiCount = 100;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
        { front: '#4285F4', back: '#3372C2' }, // Blue
        { front: '#EA4335', back: '#C23332' }, // Red
        { front: '#FBBC05', back: '#C29E22' }, // Yellow
        { front: '#34A853', back: '#2A8743' }  // Green
    ];
    
    // Confetti particle
    class Confetti {
        constructor(context) {
            this.context = context;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.dimensions = {
                x: Math.random() * 10 + 5,
                y: Math.random() * 10 + 5
            };
            this.position = {
                x: Math.random() * canvas.width,
                y: -this.dimensions.y
            };
            this.rotation = Math.random() * 2 * Math.PI;
            this.scale = { x: 1, y: 1 };
            this.velocity = {
                x: Math.random() * 25 - 12.5,
                y: Math.random() * 10 + 3
            };
        }
        
        update() {
            this.velocity.x -= this.velocity.x * drag;
            this.velocity.y = Math.min(this.velocity.y + gravity, terminalVelocity);
            this.velocity.y -= this.velocity.y * drag;
            
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            
            this.rotation += 0.01;
            
            if (this.position.y >= canvas.height) {
                this.position.y = -this.dimensions.y;
                this.position.x = Math.random() * canvas.width;
                this.velocity.y = Math.random() * 10 + 3;
            }
        }
        
        draw() {
            this.context.save();
            this.context.translate(this.position.x, this.position.y);
            this.context.rotate(this.rotation);
            this.context.scale(this.scale.x, this.scale.y);
            
            this.context.fillStyle = this.color.front;
            this.context.fillRect(-this.dimensions.x / 2, -this.dimensions.y / 2, this.dimensions.x, this.dimensions.y);
            
            this.context.restore();
        }
    }
    
    // Initialize confetti
    for (let i = 0; i < confettiCount; i++) {
        confetti.push(new Confetti(ctx));
    }
    
    // Animation loop
    let animationFrame = null;
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(confetto => {
            confetto.update();
            confetto.draw();
        });
        
        animationFrame = requestAnimationFrame(render);
        
        // Stop after 3 seconds
        setTimeout(() => {
            cancelAnimationFrame(animationFrame);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 3000);
    }
    
    render();
}

// Magnetic button effect
const magneticButtons = document.querySelectorAll('.magnetic-button');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = 15; // Adjust the magnetic strength
        
        button.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Initialize vanilla-tilt for tilt effect
document.addEventListener('DOMContentLoaded', function() {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
            max: 10,
            speed: 300,
            glare: true,
            'max-glare': 0.1,
            scale: 1.05
        });
    }
});

// Modal functionality
const projectButtons = document.querySelectorAll('.project-btn');
const modalContainers = document.querySelectorAll('.modal-container');
const modalCloseButtons = document.querySelectorAll('.modal-close');

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const modal = document.getElementById(`${projectId}Modal`);
        
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
    });
});

modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal-container');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
});

// Close modal when clicking outside
modalContainers.forEach(container => {
    container.addEventListener('click', (e) => {
        if (e.target === container) {
            container.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalContainers.forEach(container => {
            container.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// Add a small parallax effect to the home image
window.addEventListener('mousemove', (e) => {
    const homeImage = document.querySelector('.home-image img');
    if (homeImage) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
        
        homeImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Easter egg - Konami code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiCodePosition = 0;

document.addEventListener('keydown', (e) => {
    // Check if the key matches the next key in the Konami code
    if (e.key === konamiCode[konamiCodePosition]) {
        konamiCodePosition++;
        
        // If the entire code is entered correctly
        if (konamiCodePosition === konamiCode.length) {
            triggerConfetti();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

// Ensure the confetti canvas is present in the HTML
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);
});

// Initialize
window.addEventListener('load', () => {
    revealOnScroll();
    initSkillBars();
});

window.addEventListener('scroll', () => {
    revealOnScroll();
});

// Resize event for canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

