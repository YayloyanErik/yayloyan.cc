document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
    const anchors = document.querySelectorAll('a[href]');
    anchors.forEach(anchor => {
        const href = anchor.getAttribute('href');
        const isInternalSection = href && (href.startsWith('#') || href.startsWith('/#'));
        const isExternal = href && (href.startsWith('http') || anchor.target);
        if (!isInternalSection && !isExternal) {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                document.body.classList.remove('fade-in');
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location = anchor.href;
                }, 300);
            });
        }
    });
});

const hamburger = document.getElementById('hamburger-menu');
if (hamburger) {
    const navbar = document.getElementById('navbar');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('open');
        const isOpen = navbar.classList.contains('open');
        if (hamburgerIcon) hamburgerIcon.style.display = isOpen ? 'none' : 'block';
        if (closeIcon) closeIcon.style.display = isOpen ? 'block' : 'none';
    });
}
