/**
 * animations.js
 * Orchestrates GSAP + ScrollTrigger driven motion: hero title reveal,
 * animated stat counters, 3D hover tilt on cards, and the horizontal
 * differentiators track. AOS (loaded separately) handles simple
 * fade/slide-up reveals via data-aos attributes.
 */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function ready(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    ready(() => {
        initHeroTitle();
        initCounters();
        initTilt();
        initHorizontalDiff();
    });

    // ---------- Hero title split-reveal ----------
    function initHeroTitle() {
        const title = document.querySelector('[data-split-title]');
        if (!title) return;
        requestAnimationFrame(() => title.classList.add('is-revealed'));
    }

    // ---------- Animated number counters ----------
    function initCounters() {
        const counters = document.querySelectorAll('[data-count-to]');
        if (!counters.length) return;

        counters.forEach((el) => {
            const target = parseFloat(el.getAttribute('data-count-to'));
            if (reduceMotion) {
                el.textContent = target;
                return;
            }

            const obs = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    animateCount(el, target);
                    obs.unobserve(el);
                });
            }, { threshold: 0.4 });

            obs.observe(el);
        });
    }

    function animateCount(el, target) {
        const duration = 1600;
        const start = performance.now();

        function frame(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(frame);
            else el.textContent = target;
        }
        requestAnimationFrame(frame);
    }

    // ---------- 3D hover tilt (cards + hologram) ----------
    function initTilt() {
        if (reduceMotion || window.matchMedia('(hover: none)').matches) return;

        const els = document.querySelectorAll('[data-tilt], [data-tilt-card]');
        els.forEach((el) => {
            const strength = el.hasAttribute('data-tilt') ? 14 : 6;

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width - 0.5;
                const py = (e.clientY - rect.top) / rect.height - 0.5;
                el.style.transform = `perspective(800px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg)`;

                // Drive glow position for service cards
                el.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
                el.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    // ---------- Horizontal-scroll differentiators track ----------
    function initHorizontalDiff() {
        const track = document.getElementById('diffTrack');
        if (!track || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        if (reduceMotion) return;

        gsap.registerPlugin(ScrollTrigger);

        // Let the user drag/wheel-scroll the track naturally; add a subtle
        // parallax nudge as the section enters view for a premium feel.
        gsap.fromTo(track, { x: 40 }, {
            x: 0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: track,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1
            }
        });

        // Wheel → horizontal scroll convenience on desktop
        const wrap = track.parentElement;
        wrap.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
            if (wrap.scrollWidth <= wrap.clientWidth) return;
            e.preventDefault();
            wrap.scrollLeft += e.deltaY;
        }, { passive: false });
    }
})();
