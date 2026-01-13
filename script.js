function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const isOpen = content.classList.contains("open");
    

    document.querySelectorAll('.accordion-content').forEach(c => {
        c.style.maxHeight = null;
        c.classList.remove("open");
    });
    
    document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove("active");
    });
    

    if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
        header.classList.add("active");
        
    
        setTimeout(() => {
            content.querySelectorAll('.book-card').forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.style.animation = 'swipeIn 0.5s ease forwards';
            });
        }, 100);
    }
}

function setActiveNav(navItem, page) {
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove("active");
    });
    navItem.classList.add("active");
    
    createParticles(event);
}

function createParticles(event) {
    const particles = 8;
    const colors = ['#4f46e5', '#10b981', '#ec4899'];
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        
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
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleMove {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'vena-notification';
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--vena-surface);
        color: var(--vena-text);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        border-left: 4px solid var(--vena-primary);
        box-shadow: var(--vena-card-glow);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'JetBrains Mono', monospace;
        max-width: 300px;
        backdrop-filter: blur(10px);
        border: 1px solid var(--vena-border);
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


document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        if (this.classList.contains('book-thumbnail')) {
            this.style.display = 'none';
            const parent = this.parentElement;
            const title = parent.querySelector('.card-title').textContent;
            
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 180px;
                background: linear-gradient(135deg, var(--vena-card), var(--vena-surface));
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1rem;
                border: 1px solid var(--vena-border);
            `;
            
            let icon = '📚';
            if (title.includes('Sherlock')) icon = '🕵️';
            if (title.includes('Percy')) icon = '⚡';
            if (title.includes('Code')) icon = '💻';
            
            placeholder.innerHTML = `<span style="font-size: 3rem;">${icon}</span>`;
            
            this.parentElement.insertBefore(placeholder, this);
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.book-card, .accordion-header, .nav-item').forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
    

    setTimeout(() => {
        showNotification('🚀Welcome to EduLibrary!');
    }, 1000);
    
    
    
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        showNotification('Search coming soon...');
    }
    if (e.key === 'Escape') {
        document.querySelectorAll('.accordion-content').forEach(c => {
            c.style.maxHeight = null;
            c.classList.remove("open");
        });
        document.querySelectorAll('.accordion-header').forEach(h => {
            h.classList.remove("active");
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

document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);


