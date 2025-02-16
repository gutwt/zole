function revealContent() {
    document.getElementById('overlay').style.display = 'none';
    document.querySelector('.app-container').style.display = 'block';
}

function handleTouchStart(event) {
    this.touchStartY = event.touches[0].clientY;
    this.touchStartTime = new Date().getTime();
}

function handleTouchEnd(event) {
    const touchEndY = event.changedTouches[0].clientY;
    const touchEndTime = new Date().getTime();
    
    const yDiff = this.touchStartY - touchEndY;
    const timeDiff = touchEndTime - this.touchStartTime;
    
    if (Math.abs(yDiff) > 50 && timeDiff < 300) {
        if (yDiff > 0) {
            this.nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
        } else {
            this.previousElementSibling?.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (Math.abs(yDiff) < 10 && timeDiff < 300) {
        likeVideo();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const videoContainers = document.querySelectorAll('.video-container');
    const likeBtn = document.querySelector('.like-btn');
    const followBtn = document.querySelector('.follow-btn');
    const likeCount = document.querySelector('.like-count');
    let likes = 0;

    videoContainers.forEach(container => {
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);
    });

    function likeVideo() {
        likes++;
        likeCount.textContent = likes;
        likeBtn.classList.add('active');
        likeBtn.style.color = '#ff4081';
    }

    likeBtn.addEventListener('click', likeVideo);

    followBtn.addEventListener('click', () => {
        followBtn.textContent = followBtn.textContent === 'Follow' ? 'Following' : 'Follow';
        followBtn.classList.toggle('following');
    });
});

document.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });
