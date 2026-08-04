/**
 * cursor.js
 * Custom cursor: a small dot that follows the mouse instantly, and a
 * ring that trails with easing. The ring grows when hovering an
 * interactive element (links, buttons, cards).
 */
(function () {
    'use strict';

    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function raf() {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const interactiveSelector = 'a, button, [data-magnetic], [data-tilt], [data-tilt-card], input, textarea';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) ring.classList.add('is-active');
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector)) ring.classList.remove('is-active');
    });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });
})();
