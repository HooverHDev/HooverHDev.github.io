
document.getElementById('year').textContent = new Date().getFullYear();

// ========================= CAROUSEL =========================
document.querySelectorAll('.carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let current = 0;
    let autoPlayTimer;

    function goTo(index) {
        // Envolver índices
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides[current].classList.remove('active');
        dots[current].classList.remove('active');

        current = index;

        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    // Eventos
    nextBtn.addEventListener('click', () => {
        next();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prev();
        resetAutoPlay();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goTo(parseInt(dot.dataset.index));
            resetAutoPlay();
        });
    });

    // Navegación con teclado (accesibilidad)
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });

    // Autoplay cada 5 segundos
    function startAutoPlay() {
        autoPlayTimer = setInterval(next, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // Pausar autoplay al pasar el mouse
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    carousel.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
});
