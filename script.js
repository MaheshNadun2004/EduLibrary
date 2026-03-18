// Toggle accordion function
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.accordion-icon i');
    
    // Close all other accordions
    document.querySelectorAll('.accordion-content').forEach(c => {
        if (c !== content) {
            c.classList.remove('open');
        }
    });
    
    document.querySelectorAll('.accordion-header').forEach(h => {
        if (h !== header) {
            h.classList.remove('active');
            const otherIcon = h.querySelector('.accordion-icon i');
            if (otherIcon) {
                otherIcon.classList.remove('fa-chevron-up');
                otherIcon.classList.add('fa-chevron-down');
            }
        }
    });
    
    // Toggle current accordion
    content.classList.toggle('open');
    header.classList.toggle('active');
    
    // Change icon
    if (icon) {
        if (icon.classList.contains('fa-chevron-down')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    }
    
    // Trigger animations for book cards
    if (content.classList.contains('open')) {
        setTimeout(() => {
            content.querySelectorAll('.book-card').forEach((card, index) => {
                card.style.animation = 'none';
                card.offsetHeight; // Force reflow
                card.style.animation = `swipeIn 0.5s ease forwards ${index * 0.1}s`;
            });
        }, 100);
    }
}

// Set active navigation
function setActiveNav(element, page) {
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });
    element.classList.add('active');
    
    // Create particles effect
    createParticles(event);
}

// Create particles on click
function createParticles(event) {
    if (!event) return;
    
    const particles = 8;
    const colors = ['#4f46e5', '#10b981', '#ec4899'];
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (i / particles) * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        particle.style.cssText = `
            position: fixed;
            pointer-events: none;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            z-index: 10000;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            animation: particleMove 0.8s ease-out forwards;
            --x: ${x}px;
            --y: ${y}px;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

// Custom animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes particleMove {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--x, 50px), var(--y, -50px)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Show notification
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.vena-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'vena-notification';
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--vena-surface, white);
        color: var(--vena-text, #1e293b);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        border-left: 4px solid var(--vena-primary, #4f46e5);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'JetBrains Mono', monospace;
        max-width: 300px;
        backdrop-filter: blur(10px);
        border: 1px solid var(--vena-border, #e2e8f0);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Handle image errors
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            if (this.classList.contains('book-thumbnail')) {
                this.style.display = 'none';
                const parent = this.parentElement;
                const title = parent.querySelector('.card-title')?.textContent || '';
                
                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                    width: 100%;
                    height: 180px;
                    background: linear-gradient(135deg, #f1f5f9, #ffffff);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                    border: 1px solid #e2e8f0;
                `;
                
                let icon = '📚';
                if (title.includes('Sherlock')) icon = '🕵️';
                if (title.includes('Percy')) icon = '⚡';
                if (title.includes('Python')) icon = '🐍';
                if (title.includes('JavaScript')) icon = '📜';
                if (title.includes('Java')) icon = '☕';
                if (title.includes('React')) icon = '⚛️';
                
                placeholder.innerHTML = `<span style="font-size: 3rem;">${icon}</span>`;
                
                this.parentElement.insertBefore(placeholder, this);
            }
        });
    });
    
    // Welcome notification
    setTimeout(() => {
        showNotification('📚 Welcome to EduLibrary!');
    }, 1000);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        showNotification('Search coming soon...');
    }
    if (e.key === 'Escape') {
        document.querySelectorAll('.accordion-content').forEach(c => {
            c.classList.remove('open');
        });
        document.querySelectorAll('.accordion-header').forEach(h => {
            h.classList.remove('active');
            const icon = h.querySelector('.accordion-icon i');
            if (icon) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    }
});

// Touch optimizations
document.querySelectorAll('.accordion-header, .book-card, .nav-item').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.opacity = '0.8';
    });
    
    element.addEventListener('touchend', function() {
        this.style.opacity = '1';
    });
});

// Prevent double-tap zoom
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Open first accordion by default
window.addEventListener('load', function() {
    const firstAccordion = document.querySelector('.accordion-header');
    if (firstAccordion) {
        // Uncomment if you want first accordion open by default
        // toggleAccordion(firstAccordion);
    }
});

