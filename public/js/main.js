/**
 * main.js
 * Boots Lenis smooth scroll + AOS, and wires up small, self-contained
 * behaviors: navbar state on scroll, mobile menu, magnetic buttons,
 * button ripple, in-page smooth anchor scrolling, and the scroll
 * progress bar. Kept dependency-light and modular.
 */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;

    function ready(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    ready(() => {
        initLenis();
        initAOS();
        initNavbarScroll();
        initMobileMenu();
        initMagneticButtons();
        initRipple();
        initAnchorScroll();
        initScrollProgress();
        initFooterYear();
    });

    // ---------- Lenis smooth scroll ----------
    function initLenis() {
        if (reduceMotion || typeof Lenis === 'undefined') return;

        lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
            smoothWheel: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
        }

        window.__hydraLenis = lenis;
    }

    // ---------- AOS (scroll reveal) ----------
    function initAOS() {
        if (typeof AOS === 'undefined') return;
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
            disable: reduceMotion
        });
    }

    // ---------- Navbar background on scroll ----------
    function initNavbarScroll() {
        const nav = document.getElementById('navbar');
        if (!nav) return;

        function update() {
            nav.classList.toggle('is-scrolled', window.scrollY > 40);
        }
        update();
        window.addEventListener('scroll', update, { passive: true });
    }

    // ---------- Mobile menu ----------
    function initMobileMenu() {
        const toggle = document.getElementById('navToggle');
        const menu = document.getElementById('navMenu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // ---------- Magnetic buttons ----------
    function initMagneticButtons() {
        if (reduceMotion || window.matchMedia('(hover: none)').matches) return;

        document.querySelectorAll('[data-magnetic]').forEach((btn) => {
            const strength = 0.35;

            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const mx = (e.clientX - rect.left - rect.width / 2) * strength;
                const my = (e.clientY - rect.top - rect.height / 2) * strength;
                btn.style.setProperty('--mx', `${mx}px`);
                btn.style.setProperty('--my', `${my}px`);
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.setProperty('--mx', '0px');
                btn.style.setProperty('--my', '0px');
            });
        });
    }

    // ---------- Button ripple ----------
    function initRipple() {
        document.querySelectorAll('.btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const rect = btn.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height);
                ripple.className = 'ripple';
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                btn.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove());
            });
        });
    }

    // ---------- Smooth in-page anchor scrolling ----------
    function initAnchorScroll() {
        document.querySelectorAll('a[href^="#"], [data-scroll-to]').forEach((el) => {
            el.addEventListener('click', (e) => {
                const targetSelector = el.getAttribute('data-scroll-to') || el.getAttribute('href');
                if (!targetSelector || targetSelector === '#') return;
                const target = document.querySelector(targetSelector);
                if (!target) return;

                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo(target, { offset: -84, duration: 1.2 });
                } else {
                    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
                }
            });
        });
    }

    // ---------- Scroll progress bar ----------
    function initScrollProgress() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;

        function update() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = `${pct}%`;
        }
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
    }

    // ---------- Footer year ----------
    function initFooterYear() {
        const el = document.getElementById('footerYear');
        if (el) el.textContent = new Date().getFullYear();
    }
})();
