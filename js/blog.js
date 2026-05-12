const Blog = {
    posts: [],
    postsPerPage: 5,
    currentPage: 1,
    currentCategory: null,
    currentTag: null,
    searchTerm: '',

    async loadPosts() {
        try {
            const resp = await fetch('posts/posts.json');
            this.posts = await resp.json();
            this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (e) {
            this.posts = [];
        }
    },

    getFilteredPosts() {
        let filtered = [...this.posts];

        if (this.currentCategory) {
            filtered = filtered.filter(p => p.category === this.currentCategory);
        }

        if (this.currentTag) {
            filtered = filtered.filter(p => p.tags && p.tags.includes(this.currentTag));
        }

        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(term) ||
                p.excerpt.toLowerCase().includes(term) ||
                (p.tags && p.tags.some(t => t.toLowerCase().includes(term)))
            );
        }

        return filtered;
    },

    getCategories() {
        const cats = {};
        this.posts.forEach(p => {
            cats[p.category] = (cats[p.category] || 0) + 1;
        });
        return cats;
    },

    getAllTags() {
        const tags = {};
        this.posts.forEach(p => {
            if (p.tags) p.tags.forEach(t => { tags[t] = (tags[t] || 0) + 1; });
        });
        return tags;
    },

    renderPostsList() {
        const filtered = this.getFilteredPosts();
        const totalPages = Math.ceil(filtered.length / this.postsPerPage);
        const start = (this.currentPage - 1) * this.postsPerPage;
        const pagePosts = filtered.slice(start, start + this.postsPerPage);

        if (pagePosts.length === 0) {
            return `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                    <h3>No se encontraron posts</h3>
                    <p>${this.searchTerm ? 'Prueba con otro término de búsqueda.' : 'Todavía no hay posts en esta categoría.'}</p>
                </div>
            `;
        }

        const postsHTML = pagePosts.map(post => `
            <article class="post-card">
                <div class="post-card-meta">
                    <span class="post-category-badge">${post.category}</span>
                    <span class="post-date">${this.formatDate(post.date)}</span>
                </div>
                <h3 class="post-card-title">
                    <a href="#/post/${post.slug}">${post.title}</a>
                </h3>
                <p class="post-card-excerpt">${post.excerpt}</p>
                <div class="post-card-footer">
                    <div class="post-tags">
                        ${(post.tags || []).map(t =>
                            `<span class="tag-item" onclick="Blog.filterByTag('${t}')">${t}</span>`
                        ).join('')}
                    </div>
                    <a href="#/post/${post.slug}" class="post-read-more">
                        Leer más <span class="arrow">&rarr;</span>
                    </a>
                </div>
            </article>
        `).join('');

        const paginationHTML = totalPages > 1 ? this.renderPagination(totalPages) : '';

        const filterInfo = this.currentCategory || this.currentTag || this.searchTerm
            ? `<div style="margin-bottom:16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                <span style="font-size:0.85rem;color:var(--text-tertiary)">
                    ${this.currentCategory ? `Categoría: <strong style="color:var(--accent)">${this.currentCategory}</strong>` : ''}
                    ${this.currentTag ? `Tag: <strong style="color:var(--accent)">${this.currentTag}</strong>` : ''}
                    ${this.searchTerm ? `Búsqueda: <strong style="color:var(--accent)">"${this.searchTerm}"</strong>` : ''}
                    (${filtered.length} post${filtered.length !== 1 ? 's' : ''})
                </span>
                <button onclick="Blog.clearFilters()" style="font-size:0.8rem;color:var(--text-tertiary);text-decoration:underline;cursor:pointer;background:none;border:none">Limpiar filtros</button>
               </div>`
            : '';

        return filterInfo + `<div class="posts-list">${postsHTML}</div>` + paginationHTML;
    },

    renderPagination(totalPages) {
        let buttons = '';
        if (this.currentPage > 1) {
            buttons += `<button class="page-btn" onclick="Blog.goToPage(${this.currentPage - 1})">&laquo;</button>`;
        }
        for (let i = 1; i <= totalPages; i++) {
            buttons += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}" onclick="Blog.goToPage(${i})">${i}</button>`;
        }
        if (this.currentPage < totalPages) {
            buttons += `<button class="page-btn" onclick="Blog.goToPage(${this.currentPage + 1})">&raquo;</button>`;
        }
        return `<div class="pagination">${buttons}</div>`;
    },

    async renderPost(slug) {
        const post = this.posts.find(p => p.slug === slug);
        if (!post) {
            return `<div class="empty-state"><h3>Post no encontrado</h3><p><a href="#/">Volver al blog</a></p></div>`;
        }

        let content = '';
        try {
            const resp = await fetch(`posts/${post.file}`);
            content = await resp.text();
        } catch (e) {
            content = '<p>Error al cargar el contenido del post.</p>';
        }

        return `
            <article class="post-full">
                <div class="post-full-header">
                    <a href="#/" class="post-back-link">&larr; Volver al blog</a>
                    <h1 class="post-full-title">${post.title}</h1>
                    <div class="post-full-meta">
                        <span class="post-category-badge">${post.category}</span>
                        <span class="post-date">${this.formatDate(post.date)}</span>
                        <div class="post-tags">
                            ${(post.tags || []).map(t =>
                                `<span class="tag-item">${t}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
                <div class="post-full-body">
                    ${content}
                </div>
            </article>
        `;
    },

    renderSidebar() {
        const categories = this.getCategories();
        const catList = document.getElementById('categoryList');
        if (catList) {
            catList.innerHTML = Object.entries(categories)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, count]) => `
                    <li>
                        <a class="category-item ${this.currentCategory === cat ? 'active' : ''}" onclick="Blog.filterByCategory('${cat}')">
                            <span>${cat}</span>
                            <span class="category-count">${count}</span>
                        </a>
                    </li>
                `).join('');
        }

        const recentList = document.getElementById('recentPosts');
        if (recentList) {
            recentList.innerHTML = this.posts.slice(0, 5).map(p => `
                <li>
                    <a href="#/post/${p.slug}" class="recent-post-item">
                        ${p.title}
                        <span class="recent-post-date">${this.formatDate(p.date)}</span>
                    </a>
                </li>
            `).join('');
        }

        const tagCloud = document.getElementById('tagCloud');
        if (tagCloud) {
            const tags = this.getAllTags();
            tagCloud.innerHTML = Object.keys(tags)
                .sort()
                .map(t => `<span class="tag-item" onclick="Blog.filterByTag('${t}')">${t}</span>`)
                .join('');
        }
    },

    filterByCategory(cat) {
        this.currentCategory = this.currentCategory === cat ? null : cat;
        this.currentTag = null;
        this.searchTerm = '';
        this.currentPage = 1;
        if (window.location.hash !== '#/') window.location.hash = '#/';
        else this.refresh();
    },

    filterByTag(tag) {
        this.currentTag = this.currentTag === tag ? null : tag;
        this.currentCategory = null;
        this.searchTerm = '';
        this.currentPage = 1;
        if (window.location.hash !== '#/') window.location.hash = '#/';
        else this.refresh();
    },

    clearFilters() {
        this.currentCategory = null;
        this.currentTag = null;
        this.searchTerm = '';
        this.currentPage = 1;
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        this.refresh();
    },

    goToPage(page) {
        this.currentPage = page;
        this.refresh();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    refresh() {
        const main = document.getElementById('mainContent');
        if (main && window.location.hash.match(/^#\/?$/)) {
            main.innerHTML = this.renderPostsList();
        }
        this.renderSidebar();
    },

    formatDate(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }
};
