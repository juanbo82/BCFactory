(function () {
    'use strict';

    // ========================================
    // Theme Management
    // ========================================
    const ThemeManager = {
        init() {
            const saved = localStorage.getItem('bc-theme');
            const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
            this.set(saved || preferred);

            document.getElementById('themeToggle').addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                this.set(current === 'dark' ? 'light' : 'dark');
            });
        },

        set(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('bc-theme', theme);
        }
    };

    // ========================================
    // Navigation
    // ========================================
    const Navigation = {
        init() {
            this.navbar = document.getElementById('navbar');
            this.links = document.querySelectorAll('.nav-link');
            this.hamburger = document.getElementById('navHamburger');
            this.navLinks = document.getElementById('navLinks');
            this.sections = document.querySelectorAll('section[id]');

            window.addEventListener('scroll', () => this.onScroll(), { passive: true });
            this.hamburger.addEventListener('click', () => this.toggleMobile());

            this.links.forEach(link => {
                link.addEventListener('click', () => this.closeMobile());
            });

            document.addEventListener('click', (e) => {
                if (!this.navLinks.contains(e.target) && !this.hamburger.contains(e.target)) {
                    this.closeMobile();
                }
            });
        },

        onScroll() {
            const scrollY = window.scrollY;

            if (scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            let current = '';
            this.sections.forEach(section => {
                const top = section.offsetTop - 100;
                if (scrollY >= top) {
                    current = section.getAttribute('id');
                }
            });

            this.links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        },

        toggleMobile() {
            this.hamburger.classList.toggle('active');
            this.navLinks.classList.toggle('active');
        },

        closeMobile() {
            this.hamburger.classList.remove('active');
            this.navLinks.classList.remove('active');
        }
    };

    // ========================================
    // Scroll Animations
    // ========================================
    const ScrollAnimations = {
        init() {
            const targets = document.querySelectorAll(
                '.tool-card, .skill-category, .contact-card, .highlight, .about-content, .experience-card, .section-header'
            );
            targets.forEach(el => el.classList.add('fade-in'));

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

                targets.forEach(el => observer.observe(el));
            } else {
                targets.forEach(el => el.classList.add('visible'));
            }
        }
    };

    // ========================================
    // Stat Counter Animation
    // ========================================
    const StatCounter = {
        init() {
            const stats = document.querySelectorAll('.stat-number[data-target]');
            if (!stats.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            stats.forEach(stat => observer.observe(stat));
        },

        animate(el) {
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            const text = el.dataset.text;

            if (text) {
                el.textContent = text;
                return;
            }

            if (target === 0) {
                el.textContent = '0' + suffix;
                return;
            }

            let current = 0;
            const step = Math.ceil(target / 40);
            const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                el.textContent = current + suffix;
            }, 30);
        }
    };

    // ========================================
    // Tool Modal System
    // ========================================
    const ToolModal = {
        tools: {
            'snippet-generator': { title: 'AL Snippet Generator', module: typeof SnippetGenerator !== 'undefined' ? SnippetGenerator : null },
            'table-builder': { title: 'Table Extension Builder', module: typeof TableBuilder !== 'undefined' ? TableBuilder : null },
            'event-generator': { title: 'Event Subscriber Generator', module: typeof EventGenerator !== 'undefined' ? EventGenerator : null },
            'permission-generator': { title: 'Permission Set Generator', module: typeof PermissionGenerator !== 'undefined' ? PermissionGenerator : null },
            'object-reference': { title: 'Referencia de Objetos BC', module: typeof ObjectReference !== 'undefined' ? ObjectReference : null },
        },

        init() {
            this.modal = document.getElementById('toolModal');
            this.title = document.getElementById('toolModalTitle');
            this.body = document.getElementById('toolModalBody');
            this.closeBtn = document.getElementById('toolModalClose');

            this.tools = {
                'snippet-generator': { title: 'AL Snippet Generator', module: SnippetGenerator },
                'table-builder': { title: 'Table Extension Builder', module: TableBuilder },
                'event-generator': { title: 'Event Subscriber Generator', module: EventGenerator },
                'permission-generator': { title: 'Permission Set Generator', module: PermissionGenerator },
                'object-reference': { title: 'Referencia de Objetos BC', module: ObjectReference },
            };

            document.querySelectorAll('.tool-open-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open(btn.dataset.tool);
                });
            });

            this.closeBtn.addEventListener('click', () => this.close());
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.close();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.close();
            });
        },

        open(toolId) {
            const tool = this.tools[toolId];
            if (!tool || !tool.module) return;

            this.title.textContent = tool.title;
            this.body.innerHTML = tool.module.render();
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            if (tool.module.init) {
                setTimeout(() => tool.module.init(), 50);
            }

            if (toolId === 'snippet-generator') {
                SnippetGenerator.updateForm();
            }
        },

        close() {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // ========================================
    // Initialize
    // ========================================
    document.addEventListener('DOMContentLoaded', () => {
        ThemeManager.init();
        Navigation.init();
        ScrollAnimations.init();
        StatCounter.init();
        ToolModal.init();
    });

})();
