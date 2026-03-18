// Shared logic for the entire site
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    highlightActiveLink();
});

function initDarkMode() {
    const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);

    // Listen for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Handle root / and index.html
        if (currentPath === '/' || currentPath.endsWith('index.html')) {
            if (href === 'index.html' || href === '/') {
                link.classList.add('active');
            }
        } else if (href.includes(currentPath)) {
            link.classList.add('active');
        }
    });
}

// Global Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + Enter -> Run Tool (This will be handled by individual tool scripts)
    // Ctrl + C -> Copy Output (Handled by tools)
});
