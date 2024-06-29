document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for internal links
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });

    // Highlight active section in the nav
    window.addEventListener('scroll', function () {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 60;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Reveal sections on scroll
    const sections = document.querySelectorAll('section');

    const revealSection = function (entries, observer) {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
        section.classList.add('section--hidden');
    });
});
