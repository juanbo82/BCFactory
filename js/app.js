(function () {
    'use strict';

    // ========================================
    // Theme
    // ========================================
    const Theme = {
        init() {
            const saved = localStorage.getItem('bcf-theme');
            const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
            this.set(saved || preferred);
            document.getElementById('themeToggle').addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                this.set(current === 'dark' ? 'light' : 'dark');
            });
        },
        set(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('bcf-theme', theme);
        }
    };

    // ========================================
    // Mobile Nav
    // ========================================
    const MobileNav = {
        init() {
            this.btn = document.getElementById('mobileMenuBtn');
            this.menu = document.getElementById('navMenu');
            this.btn.addEventListener('click', () => this.toggle());
            document.addEventListener('click', (e) => {
                if (!this.menu.contains(e.target) && !this.btn.contains(e.target)) this.close();
            });
        },
        toggle() { this.btn.classList.toggle('active'); this.menu.classList.toggle('active'); },
        close() { this.btn.classList.remove('active'); this.menu.classList.remove('active'); }
    };

    // ========================================
    // Repos Page Data
    // ========================================
    const repos = [
        {
            name: 'BCFactory',
            desc: 'Este sitio web: blog, herramientas interactivas y recursos para desarrolladores de Business Central.',
            url: 'https://github.com/juanbo82/BCFactory',
            lang: 'HTML/CSS/JS',
            langColor: '#e34c26',
            tags: ['portfolio', 'blog', 'tools']
        },
        {
            name: 'BC-AL-Snippets',
            desc: 'Colección de snippets de código AL para Visual Studio Code. Tablas, páginas, codeunits, reports y más.',
            url: 'https://github.com/juanbo82/BC-AL-Snippets',
            lang: 'AL',
            langColor: '#3B82F6',
            tags: ['AL', 'snippets', 'vscode']
        },
        {
            name: 'BC-API-Examples',
            desc: 'Ejemplos de consumo de APIs REST de Business Central con Postman, Power Automate y C#.',
            url: 'https://github.com/juanbo82/BC-API-Examples',
            lang: 'AL / JSON',
            langColor: '#c3e88d',
            tags: ['API', 'REST', 'integrations']
        },
        {
            name: 'BC-Docker-Dev',
            desc: 'Scripts y configuración para levantar entornos de desarrollo de Business Central con Docker.',
            url: 'https://github.com/juanbo82/BC-Docker-Dev',
            lang: 'PowerShell',
            langColor: '#012456',
            tags: ['Docker', 'DevOps', 'setup']
        },
        {
            name: 'AL-Clean-Code',
            desc: 'Guía y ejemplos de buenas prácticas de código limpio aplicadas al lenguaje AL de Business Central.',
            url: 'https://github.com/juanbo82/AL-Clean-Code',
            lang: 'AL',
            langColor: '#3B82F6',
            tags: ['best-practices', 'clean-code']
        }
    ];

    // ========================================
    // Page Renderers
    // ========================================
    function renderToolsPage() {
        return `
            <div class="tools-page-header">
                <h2>Herramientas <span class="gradient-text">Interactivas</span></h2>
                <p>Generadores de código AL y utilidades para acelerar tu desarrollo en Business Central.</p>
            </div>
            <div class="tools-grid">
                <div class="tool-card">
                    <div class="tool-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>
                    </div>
                    <h3 class="tool-card-title">AL Snippet Generator</h3>
                    <p class="tool-card-desc">Genera snippets de código AL para los patrones más comunes: tablas, páginas, codeunits, reports y más.</p>
                    <button class="btn btn-sm btn-primary tool-open-btn" data-tool="snippet-generator">Abrir Herramienta &rarr;</button>
                </div>
                <div class="tool-card">
                    <div class="tool-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>
                    </div>
                    <h3 class="tool-card-title">Table Extension Builder</h3>
                    <p class="tool-card-desc">Construye visualmente extensiones de tabla con campos personalizados, keys y triggers.</p>
                    <button class="btn btn-sm btn-primary tool-open-btn" data-tool="table-builder">Abrir Herramienta &rarr;</button>
                </div>
                <div class="tool-card">
                    <div class="tool-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </div>
                    <h3 class="tool-card-title">Event Subscriber Generator</h3>
                    <p class="tool-card-desc">Genera suscripciones a eventos de Business Central con la firma correcta automáticamente.</p>
                    <button class="btn btn-sm btn-primary tool-open-btn" data-tool="event-generator">Abrir Herramienta &rarr;</button>
                </div>
                <div class="tool-card">
                    <div class="tool-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h3 class="tool-card-title">Permission Set Generator</h3>
                    <p class="tool-card-desc">Crea conjuntos de permisos AL para tus extensiones de forma rápida y sin errores.</p>
                    <button class="btn btn-sm btn-primary tool-open-btn" data-tool="permission-generator">Abrir Herramienta &rarr;</button>
                </div>
                <div class="tool-card">
                    <div class="tool-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                    </div>
                    <h3 class="tool-card-title">Referencia de Objetos</h3>
                    <p class="tool-card-desc">Consulta rápida de rangos de objetos, tipos de datos, propiedades y buenas prácticas AL.</p>
                    <button class="btn btn-sm btn-primary tool-open-btn" data-tool="object-reference">Abrir Herramienta &rarr;</button>
                </div>
            </div>
        `;
    }

    function renderReposPage() {
        const repoCards = repos.map(r => `
            <div class="repo-card">
                <div class="repo-info">
                    <div class="repo-name">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                        ${r.name}
                    </div>
                    <p class="repo-desc">${r.desc}</p>
                    <div class="repo-meta">
                        <span class="repo-meta-item">
                            <span class="repo-lang-dot" style="background:${r.langColor}"></span>
                            ${r.lang}
                        </span>
                        ${r.tags.map(t => `<span class="repo-meta-item">#${t}</span>`).join('')}
                    </div>
                </div>
                <div class="repo-actions">
                    <a href="${r.url}" target="_blank" rel="noopener" class="repo-link">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        Ver en GitHub
                    </a>
                </div>
            </div>
        `).join('');

        return `
            <div class="repos-page-header">
                <h2>Repositorios <span class="gradient-text">GitHub</span></h2>
                <p>Código abierto, extensiones y recursos que puedes descargar y utilizar libremente.</p>
            </div>
            <div class="repos-grid">${repoCards}</div>
        `;
    }

    // ========================================
    // Tool Modal
    // ========================================
    const ToolModal = {
        toolModules: {
            'snippet-generator': { title: 'AL Snippet Generator', module: null },
            'table-builder': { title: 'Table Extension Builder', module: null },
            'event-generator': { title: 'Event Subscriber Generator', module: null },
            'permission-generator': { title: 'Permission Set Generator', module: null },
            'object-reference': { title: 'Referencia de Objetos BC', module: null },
        },

        init() {
            this.modal = document.getElementById('toolModal');
            this.title = document.getElementById('toolModalTitle');
            this.body = document.getElementById('toolModalBody');

            this.toolModules['snippet-generator'].module = SnippetGenerator;
            this.toolModules['table-builder'].module = TableBuilder;
            this.toolModules['event-generator'].module = EventGenerator;
            this.toolModules['permission-generator'].module = PermissionGenerator;
            this.toolModules['object-reference'].module = ObjectReference;

            document.getElementById('toolModalClose').addEventListener('click', () => this.close());
            this.modal.addEventListener('click', (e) => { if (e.target === this.modal) this.close(); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.close(); });
        },

        open(toolId) {
            const tool = this.toolModules[toolId];
            if (!tool || !tool.module) return;
            this.title.textContent = tool.title;
            this.body.innerHTML = tool.module.render();
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (tool.module.init) setTimeout(() => tool.module.init(), 50);
            if (toolId === 'snippet-generator') SnippetGenerator.updateForm();
        },

        close() {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // ========================================
    // Router
    // ========================================
    const Router = {
        async navigate() {
            const hash = window.location.hash || '#/';
            const main = document.getElementById('mainContent');
            const sidebar = document.getElementById('sidebar');

            // Update nav active state
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
                if (hash.startsWith('#/post')) {
                    if (item.dataset.page === 'blog') item.classList.add('active');
                } else if (hash === '#/' || hash === '#') {
                    if (item.dataset.page === 'blog') item.classList.add('active');
                } else if (hash === '#/tools') {
                    if (item.dataset.page === 'tools') item.classList.add('active');
                } else if (hash === '#/repos') {
                    if (item.dataset.page === 'repos') item.classList.add('active');
                }
            });

            MobileNav.close();

            if (hash === '#/' || hash === '#' || hash === '') {
                sidebar.style.display = '';
                main.innerHTML = Blog.renderPostsList();
                Blog.renderSidebar();
                this.bindToolButtons();
            } else if (hash.startsWith('#/post/')) {
                const slug = hash.replace('#/post/', '');
                sidebar.style.display = '';
                main.innerHTML = await Blog.renderPost(slug);
                Blog.renderSidebar();
            } else if (hash === '#/tools') {
                sidebar.style.display = 'none';
                main.innerHTML = renderToolsPage();
                this.bindToolButtons();
            } else if (hash === '#/repos') {
                sidebar.style.display = 'none';
                main.innerHTML = renderReposPage();
            } else {
                sidebar.style.display = '';
                main.innerHTML = Blog.renderPostsList();
                Blog.renderSidebar();
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        bindToolButtons() {
            document.querySelectorAll('.tool-open-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    ToolModal.open(btn.dataset.tool);
                });
            });
        }
    };

    // ========================================
    // Search
    // ========================================
    function initSearch() {
        const input = document.getElementById('searchInput');
        if (!input) return;
        let debounce;
        input.addEventListener('input', () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                Blog.searchTerm = input.value.trim();
                Blog.currentPage = 1;
                Blog.currentCategory = null;
                Blog.currentTag = null;
                if (window.location.hash !== '#/' && window.location.hash !== '#' && window.location.hash !== '') {
                    window.location.hash = '#/';
                } else {
                    Blog.refresh();
                }
            }, 300);
        });
    }

    // ========================================
    // Init
    // ========================================
    document.addEventListener('DOMContentLoaded', async () => {
        Theme.init();
        MobileNav.init();
        ToolModal.init();

        await Blog.loadPosts();

        window.addEventListener('hashchange', () => Router.navigate());
        await Router.navigate();

        initSearch();
    });

})();
