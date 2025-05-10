document.addEventListener('DOMContentLoaded', function() {
    // Viewer count functionality
    let viewerCount = localStorage.getItem('viewerCount');
    if (!viewerCount) {
        viewerCount = 425; // Starting count
    } else {
        viewerCount = parseInt(viewerCount) + 1;
    }
    localStorage.setItem('viewerCount', viewerCount);
    document.getElementById('viewerCount').textContent = viewerCount;
    
    // Send viewer count to server (for Discord bot)
    fetch('https://your-repl-url.your-repl-username.repl.co/viewercount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: viewerCount }),
    });

    // Updated updateGistCount function with Authorization header using environment variable
    async function updateGistCount(count) {
        const gistId = '82233ede0fe7c68e3109d163e35a8a62';
        const gistUrl = `https://api.github.com/gists/${gistId}`;
        
        try {
            const response = await fetch(gistUrl, {
                method: 'PATCH',
                headers: {
                    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    files: {
                        'viewcount.json': {
                            content: JSON.stringify({ count: count })
                        }
                    }
                })
            });
            
            if (!response.ok) {
                console.error('Failed to update Gist:', await response.text());
            }
        } catch (error) {
            console.error('Error updating count:', error);
        }
    }

    // Add hover effect to achievement items
    const achievements = document.querySelectorAll('.achievement-item');
    achievements.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.5)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.neon-button, .hexagon-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(0, 255, 255, 0.7)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            // Get button position and size
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Position the ripple
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
                // Follow link after animation if it's a link
                if (this.href) {
                    window.location.href = this.href;
                }
            }, 600);
        });
    });
    
    // Add animation to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(15deg)';
        });
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(0deg)';
        });
    });
    
    // Add style for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Background particles effect
    if (window.location.pathname.includes('githubmain.html') || window.location.pathname === '/') {
        createParticles();
    }
    
    function createParticles() {
        const particleCount = 30;
        const container = document.querySelector('body');
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}vw`;
            particle.style.top = `${posY}vh`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.opacity = opacity;
            particle.style.backgroundColor = '#0ff';
            particle.style.position = 'fixed';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '-1';
            particle.style.boxShadow = '0 0 10px #0ff, 0 0 20px #0ff';
            
            // Add animation
            particle.style.animationName = 'float';
            particle.style.animationIterationCount = 'infinite';
            particle.style.animationTimingFunction = 'ease-in-out';
            
            container.appendChild(particle);
        }
        
        // Add style for float animation
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0);
                }
                25% {
                    transform: translate(10px, 10px);
                }
                50% {
                    transform: translate(-5px, 15px);
                }
                75% {
                    transform: translate(5px, -5px);
                }
            }
        `;
        document.head.appendChild(floatStyle);
    }
});
