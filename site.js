(function () {
    const FADE_MS = 150;

    function initNav() {
        const hamburger = document.getElementById('hamburger-menu');
        const navbar = document.getElementById('navbar');
        const hamburgerIcon = document.getElementById('hamburger-icon');
        const closeIcon = document.getElementById('close-icon');
        if (!hamburger || !navbar) return;

        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('open');
            const isOpen = navbar.classList.contains('open');
            if (hamburgerIcon) hamburgerIcon.style.display = isOpen ? 'none' : 'block';
            if (closeIcon) closeIcon.style.display = isOpen ? 'block' : 'none';
        });
    }

    function shouldFadeNavigate(anchor) {
        const href = anchor.getAttribute('href');
        if (!href) return false;
        if (anchor.target) return false;
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
        if (href.startsWith('#') || href.startsWith('/#')) return false;
        if (href.includes('.pdf') || href.startsWith('javascript:')) return false;
        if (anchor.hasAttribute('download')) return false;
        return true;
    }

    function initFadeLinks() {
        document.querySelectorAll('a[href]').forEach((anchor) => {
            if (!shouldFadeNavigate(anchor)) return;
            anchor.addEventListener('click', (e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                document.body.classList.remove('fade-in');
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location = anchor.href;
                }, FADE_MS);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('fade-in');
        initNav();
        initFadeLinks();
    });
})();
