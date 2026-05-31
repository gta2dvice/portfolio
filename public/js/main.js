

// ============================================
// Preloader
// ============================================

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// ============================================
// Theme (Dark mode only)
// ============================================

document.documentElement.setAttribute('data-theme', 'dark');

// ============================================
// Navigation
// ============================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active section highlighting
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Particle Canvas Animation
// ============================================
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
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
            ctx.fillStyle = `rgba(74, 144, 226, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(74, 144, 226, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// Typing Animation
// ============================================

const typingText = document.getElementById('typing-text');
const roles = ['Front-End Developer', 'Data Analyst', 'Crafts', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentRole = roles[roleIndex];
    
    if (!isDeleting && charIndex < currentRole.length) {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, 100);
    } else if (isDeleting && charIndex > 0) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeText, 50);
    } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => {
            isDeleting = true;
            typeText();
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeText, 500);
    }
}

if (typingText) {
    setTimeout(typeText, 1000);
}

// ============================================
// Intersection Observer for Scroll Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe elements
const revealElements = document.querySelectorAll('.reveal-text, .timeline-item, .skill-card, .project-card, .creative-item');
revealElements.forEach(el => observer.observe(el));

// ============================================
// Animated Counters
// ============================================

const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => counterObserver.observe(stat));

// ============================================
// Skill Progress Circles
// ============================================

const progressCircles = document.querySelectorAll('.progress-circle');

function animateProgress(circle) {
    const percent = parseInt(circle.getAttribute('data-percent'));
    const circleElement = circle.querySelector('.progress-ring-circle');
    const radius = circleElement.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    
    circleElement.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        circleElement.style.transition = 'stroke-dashoffset 2s ease';
        circleElement.style.strokeDashoffset = offset;
    }, 100);
}

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animateProgress(entry.target);
        }
    });
}, { threshold: 0.5 });

progressCircles.forEach(circle => progressObserver.observe(circle));

// ============================================
// Skills Filter
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        skillCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ============================================
// 3D Tilt Effect on Project Cards
// ============================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// ============================================
// Custom Cursor
// ============================================

const customCursor = document.getElementById('custom-cursor');
const cursorFollower = document.getElementById('custom-cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (customCursor && cursorFollower) {
        customCursor.style.left = mouseX + 'px';
        customCursor.style.top = mouseY + 'px';
    }
});

// Smooth follower animation
function animateFollower() {
    if (cursorFollower) {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }
    
    requestAnimationFrame(animateFollower);
}

animateFollower();

// Hover effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .creative-item');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (customCursor) customCursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        if (customCursor) customCursor.classList.remove('hover');
    });
});

// ============================================
// Scroll to Top Button
// ============================================

const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

}

// ============================================
// Contact Form Handling
// ============================================

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        let isValid = true;
        
        if (!name) {
            showError('name', 'Name is required');
            isValid = false;
        }
        
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!message) {
            showError('message', 'Message is required');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Disable submit button
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                showFormMessage(data.message, 'success');
                contactForm.reset();
                
                // Reset floating labels
                const inputs = contactForm.querySelectorAll('.form-input');
                inputs.forEach(input => {
                    input.classList.remove('has-value');
                });
            } else {
                showFormMessage(data.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            showFormMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span>';
        }
    });
    
    // Real-time validation and floating label handling
    const inputs = contactForm.querySelectorAll('.form-input');
    inputs.forEach(input => {
        // Handle floating labels
        if (input.value.trim()) {
            input.classList.add('has-value');
        }
        
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.classList.add('has-value');
                clearError(input.id);
            } else {
                input.classList.remove('has-value');
            }
        });
        
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('focus', () => {
            input.classList.add('has-value');
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    clearError(fieldId);
    
    if (!value) {
        showError(fieldId, `${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)} is required`);
        return false;
    }
    
    if (fieldId === 'email' && !isValidEmail(value)) {
        showError(fieldId, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message show ${type}`;
    
    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 5000);
}

// ============================================
// Parallax Effect
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// Button Ripple Effect
// ============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ============================================
// Lazy Loading Images (for creative section)
// ============================================

const creativeImages = document.querySelectorAll('.creative-image');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // In a real scenario, you would load the actual image here
                // img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    creativeImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// Performance Optimization
// ============================================

// Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    highlightActiveSection();
}, 100));

// ============================================
// Cinematic Laser Background
// ============================================

const laserCanvas = document.getElementById("laser-canvas");

if (laserCanvas) {
    const ctx = laserCanvas.getContext("2d");

    function resizeCanvas() {
        laserCanvas.width = window.innerWidth;
        laserCanvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
            this.y = Math.random() * window.innerHeight;
            this.size = Math.random() * 2;
            this.speed = Math.random() * 1 + 0.5;
            this.opacity = Math.random() * 0.5;
        }

        update() {
            this.y -= this.speed;
            if (this.y < 0) this.reset();
        }

        draw() {
            ctx.fillStyle = `rgba(100,180,255,${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }

    function drawLaser() {
        const centerX = window.innerWidth / 2;

        const gradient = ctx.createLinearGradient(
            centerX - 50,
            0,
            centerX + 50,
            0
        );

        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(0.5, "rgba(120,200,255,0.8)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(centerX - 50, 0, 100, window.innerHeight);

        // Glow
        ctx.shadowBlur = 60;
        ctx.shadowColor = "rgba(120,200,255,0.9)";
        ctx.fillRect(centerX - 10, 0, 20, window.innerHeight);
        ctx.shadowBlur = 0;
    }

    function animate() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        drawLaser();

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}
// import { useEffect, useRef } from 'react';
// import { Renderer, Program, Mesh, Triangle } from 'ogl';
// import './Grainient.css';

// const hexToRgb = hex => {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   if (!result) return [1, 1, 1];
//   return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
// };

// const vertex = `#version 300 es
// in vec2 position;
// void main() {
//   gl_Position = vec4(position, 0.0, 1.0);
// }
// `;

// const fragment = `#version 300 es
// precision highp float;
// uniform vec2 iResolution;
// uniform float iTime;
// uniform float uTimeSpeed;
// uniform float uColorBalance;
// uniform float uWarpStrength;
// uniform float uWarpFrequency;
// uniform float uWarpSpeed;
// uniform float uWarpAmplitude;
// uniform float uBlendAngle;
// uniform float uBlendSoftness;
// uniform float uRotationAmount;
// uniform float uNoiseScale;
// uniform float uGrainAmount;
// uniform float uGrainScale;
// uniform float uGrainAnimated;
// uniform float uContrast;
// uniform float uGamma;
// uniform float uSaturation;
// uniform vec2 uCenterOffset;
// uniform float uZoom;
// uniform vec3 uColor1;
// uniform vec3 uColor2;
// uniform vec3 uColor3;
// out vec4 fragColor;
// #define S(a,b,t) smoothstep(a,b,t)
// mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
// vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
// float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
// void mainImage(out vec4 o, vec2 C){
//   float t=iTime*uTimeSpeed;
//   vec2 uv=C/iResolution.xy;
//   float ratio=iResolution.x/iResolution.y;
//   vec2 tuv=uv-0.5+uCenterOffset;
//   tuv/=max(uZoom,0.001);

//   float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
//   tuv.y*=1.0/ratio;
//   tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
//   tuv.y*=ratio;

//   float frequency=uWarpFrequency;
//   float ws=max(uWarpStrength,0.001);
//   float amplitude=uWarpAmplitude/ws;
//   float warpTime=t*uWarpSpeed;
//   tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
//   tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

//   vec3 colLav=uColor1;
//   vec3 colOrg=uColor2;
//   vec3 colDark=uColor3;
//   float b=uColorBalance;
//   float s=max(uBlendSoftness,0.0);
//   mat2 blendRot=Rot(radians(uBlendAngle));
//   float blendX=(tuv*blendRot).x;
//   float edge0=-0.3-b-s;
//   float edge1=0.2-b+s;
//   float v0=0.5-b+s;
//   float v1=-0.3-b-s;
//   vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
//   vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
//   vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

//   vec2 grainUv=uv*max(uGrainScale,0.001);
//   if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} 
//   float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
//   col+=(grain-0.5)*uGrainAmount;

//   col=(col-0.5)*uContrast+0.5;
//   float luma=dot(col,vec3(0.2126,0.7152,0.0722));
//   col=mix(vec3(luma),col,uSaturation);
//   col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
//   col=clamp(col,0.0,1.0);

//   o=vec4(col,1.0);
// }
// void main(){
//   vec4 o=vec4(0.0);
//   mainImage(o,gl_FragCoord.xy);
//   fragColor=o;
// }
// `;

// const Grainient = ({
//   timeSpeed = 0.25,
//   colorBalance = 0.0,
//   warpStrength = 1.0,
//   warpFrequency = 5.0,
//   warpSpeed = 2.0,
//   warpAmplitude = 50.0,
//   blendAngle = 0.0,
//   blendSoftness = 0.05,
//   rotationAmount = 500.0,
//   noiseScale = 2.0,
//   grainAmount = 0.1,
//   grainScale = 2.0,
//   grainAnimated = false,
//   contrast = 1.5,
//   gamma = 1.0,
//   saturation = 1.0,
//   centerX = 0.0,
//   centerY = 0.0,
//   zoom = 0.9,
//   color1 = '#FF9FFC',
//   color2 = '#5227FF',
//   color3 = '#B19EEF',
//   className = ''
// }) => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const renderer = new Renderer({
//       webgl: 2,
//       alpha: true,
//       antialias: false,
//       dpr: Math.min(window.devicePixelRatio || 1, 2)
//     });

//     const gl = renderer.gl;
//     const canvas = gl.canvas;
//     canvas.style.width = '100%';
//     canvas.style.height = '100%';
//     canvas.style.display = 'block';

//     const container = containerRef.current;
//     container.appendChild(canvas);

//     const geometry = new Triangle(gl);
//     const program = new Program(gl, {
//       vertex,
//       fragment,
//       uniforms: {
//         iTime: { value: 0 },
//         iResolution: { value: new Float32Array([1, 1]) },
//         uTimeSpeed: { value: timeSpeed },
//         uColorBalance: { value: colorBalance },
//         uWarpStrength: { value: warpStrength },
//         uWarpFrequency: { value: warpFrequency },
//         uWarpSpeed: { value: warpSpeed },
//         uWarpAmplitude: { value: warpAmplitude },
//         uBlendAngle: { value: blendAngle },
//         uBlendSoftness: { value: blendSoftness },
//         uRotationAmount: { value: rotationAmount },
//         uNoiseScale: { value: noiseScale },
//         uGrainAmount: { value: grainAmount },
//         uGrainScale: { value: grainScale },
//         uGrainAnimated: { value: grainAnimated ? 1.0 : 0.0 },
//         uContrast: { value: contrast },
//         uGamma: { value: gamma },
//         uSaturation: { value: saturation },
//         uCenterOffset: { value: new Float32Array([centerX, centerY]) },
//         uZoom: { value: zoom },
//         uColor1: { value: new Float32Array(hexToRgb(color1)) },
//         uColor2: { value: new Float32Array(hexToRgb(color2)) },
//         uColor3: { value: new Float32Array(hexToRgb(color3)) }
//       }
//     });

//     const mesh = new Mesh(gl, { geometry, program });

//     const setSize = () => {
//       const rect = container.getBoundingClientRect();
//       const width = Math.max(1, Math.floor(rect.width));
//       const height = Math.max(1, Math.floor(rect.height));
//       renderer.setSize(width, height);
//       const res = program.uniforms.iResolution.value;
//       res[0] = gl.drawingBufferWidth;
//       res[1] = gl.drawingBufferHeight;
//     };

//     const ro = new ResizeObserver(setSize);
//     ro.observe(container);
//     setSize();

//     let raf = 0;
//     const t0 = performance.now();
//     const loop = t => {
//       program.uniforms.iTime.value = (t - t0) * 0.001;
//       renderer.render({ scene: mesh });
//       raf = requestAnimationFrame(loop);
//     };
//     raf = requestAnimationFrame(loop);

//     return () => {
//       cancelAnimationFrame(raf);
//       ro.disconnect();
//       try {
//         container.removeChild(canvas);
//       } catch {
//         // Ignore
//       }
//     };
//   }, [
//     timeSpeed,
//     colorBalance,
//     warpStrength,
//     warpFrequency,
//     warpSpeed,
//     warpAmplitude,
//     blendAngle,
//     blendSoftness,
//     rotationAmount,
//     noiseScale,
//     grainAmount,
//     grainScale,
//     grainAnimated,
//     contrast,
//     gamma,
//     saturation,
//     centerX,
//     centerY,
//     zoom,
//     color1,
//     color2,
//     color3
//   ]);

//   return <div ref={containerRef} className={`grainient-container ${className}`.trim()} />;
// };

// export default Grainient;