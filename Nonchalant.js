document.addEventListener('DOMContentLoaded', function() {
    // Loader timeout
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('intro-container').style.display = 'block';
    }, 3000); // Adjust time based on your GIF duration
    
    // Viewer count functionality
    let viewerCount = localStorage.getItem('viewerCount');
    if (!viewerCount) {
        viewerCount = 425; // Starting count
    } else {
        viewerCount = parseInt(viewerCount) + 1;
    }
    localStorage.setItem('viewerCount', viewerCount);
    document.getElementById('viewerCount').textContent = viewerCount;
    
    // Likes functionality
    let likesCount = localStorage.getItem('likesCount') || 203;
    document.getElementById('likesCount').textContent = likesCount;
    
    const likeBtn = document.getElementById('likeBtn');
    likeBtn.addEventListener('click', function() {
        if (!localStorage.getItem('hasLiked')) {
            likesCount++;
            localStorage.setItem('likesCount', likesCount);
            localStorage.setItem('hasLiked', 'true');
            document.getElementById('likesCount').textContent = likesCount;
            likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
            likeBtn.classList.add('liked');
            likeBtn.style.animation = 'heartBeat 0.5s';
            setTimeout(() => {
                likeBtn.style.animation = '';
            }, 500);
        }
    });
    
    // About Me button functionality
    const aboutMeBtn = document.getElementById('aboutMeBtn');
    if (aboutMeBtn) {
        aboutMeBtn.addEventListener('click', function() {
            // Create flash effect
            const flash = document.createElement('div');
            flash.className = 'flash-effect';
            document.body.appendChild(flash);
            
            // Animate flash
            flash.style.animation = 'flash 1s';
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1000);
        });
    }
    
    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'translateY(-3px)';
        });
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'translateY(0)';
        });
    });
    
    // Smooth transitions
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.transition = 'all 0.3s ease';
    });
});
