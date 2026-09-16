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