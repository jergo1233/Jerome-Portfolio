document.addEventListener('DOMContentLoaded', () => {
    const paragraphs = document.querySelectorAll('.project-desc');

    paragraphs.forEach(p => {
        let hideTimer = null;
        const tooltip = p.querySelector('.github-tooltip');

        if (!tooltip) return;

        const showTooltip = () => {
            // I-clear ang umiiral na timer para hindi agad mawala kung tinapatan/klinik ulit
            if (hideTimer) clearTimeout(hideTimer);
            
            tooltip.classList.add('show');

            // Mag-set ng 5-second (5000ms) timer para kusa itong mawala
            hideTimer = setTimeout(() => {
                tooltip.classList.remove('show');
            }, 3000);
        };

        // Desktop: Triggers when hovered
        p.addEventListener('mouseenter', showTooltip);

        // Mobile / Touch: Triggers on click/tap
        p.addEventListener('click', (e) => {
            // Huwag i-trigger kung ang mismong GitHub link ang klinik ng user
            if (e.target.tagName.toLowerCase() === 'a') return;
            showTooltip();
        });
    });
});

document.querySelectorAll('.project-info.has-popup').forEach(card => {
    let timer;
    const popup = card.querySelector('.popup-viewer');

    card.addEventListener('click', (e) => {
        // Kung ang pinindot ay mismong popup link na, hayaang mag-navigate sa URL
        if (e.target.classList.contains('popup-viewer')) return;

        // I-check kung mobile view (screen width <= 768px)
        if (window.innerWidth <= 768) {
            clearTimeout(timer);

            // I-toggle o ipakita ang popup
            popup.classList.add('show-popup');

            // Timer: Mawawala ang popup pagkalipas ng 2.5 seconds (2500ms)
            timer = setTimeout(() => {
                popup.classList.remove('show-popup');
            }, 2500);
        }
    });
});
