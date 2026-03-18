document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('introOverlay');
    const hero = document.getElementById('heroSplit');
    const subtitle = document.querySelector('.hero-right .subtitle');

    const fullText = "Technical Architect specializing in high-performance, scalable systems and developer productivity. Building AI-powered tools, interactive developer platforms, and workflow automation solutions.";

    // Logic: Only show intro once per session
    const introShown = sessionStorage.getItem('introShown');

    if (introShown) {
        // Skip intro if already shown
        if (overlay) overlay.style.display = 'none';
        if (hero) {
            hero.classList.add('visible');
            hero.style.transition = 'none'; // Instant show
            hero.style.opacity = '1';
            hero.style.transform = 'scale(1)';
        }
        if (subtitle) {
            subtitle.innerHTML = fullText;
            subtitle.style.opacity = '1';
        }
    } else {
        // First time loading - show full animation
        setTimeout(() => {
            if (overlay) overlay.classList.add('hidden');
            if (hero) hero.classList.add('visible');

            setTimeout(() => {
                if (subtitle) {
                    subtitle.style.opacity = '1';
                    typeEffect(subtitle, fullText, 35);
                }
                // Mark intro as shown for this session
                sessionStorage.setItem('introShown', 'true');
            }, 800);
        }, 2500);
    }

    function typeEffect(element, text, speed) {
        let i = 0;
        element.innerHTML = "";
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
});
