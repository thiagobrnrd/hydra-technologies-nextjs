/**
 * particles.js
 * Minimal, dependency-free floating-particle field rendered on a
 * <canvas> inside the hero. Kept intentionally cheap: a few dozen
 * particles, no physics library, capped device-pixel-ratio.
 */
(function () {
    'use strict';

    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    let particles = [];

    const COLORS = ['rgba(0,184,255,', 'rgba(76,201,255,', 'rgba(122,92,255,'];
    const COUNT = window.innerWidth < 700 ? 26 : 55;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeParticle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.8 + 0.6,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            alpha: Math.random() * 0.5 + 0.15,
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        };
    }

    function init() {
        resize();
        particles = Array.from({ length: COUNT }, makeParticle);
        if (!reduceMotion) requestAnimationFrame(tick);
        else draw(); // static single frame
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => {
            ctx.beginPath();
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function tick() {
        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        });
        draw();
        requestAnimationFrame(tick);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { resize(); particles = Array.from({ length: COUNT }, makeParticle); }, 200);
    });

    init();
})();
