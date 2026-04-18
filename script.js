// script.js - SPA Router and Content Renderer

const app = document.getElementById('router-view');

// 1. Initialize Profile Card on Sidebar
function initSidebar() {
    const { user } = blogData;
    const profileContainer = document.getElementById('profile-container');
    const githubLink = document.getElementById('github-link');
    
    if (user.socials && user.socials.github) {
        githubLink.href = user.socials.github;
    }

    profileContainer.innerHTML = `
        <div class="profile-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
        <h2 class="profile-name">${user.name}</h2>
        <div class="profile-role">${user.role}</div>
        <p class="profile-bio">${user.bio}</p>
        <div class="skill-tags">
            ${user.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
    `;
}

// 2. Render Functions
function renderHome() {
    const recentPosts = blogData.posts;

    let html = `
        <h2 class="section-title"><i data-lucide="layout-grid"></i> All Posts <span style="font-size: 1rem; font-weight: normal; color: var(--text-secondary);">(${recentPosts.length})</span></h2>
        <div class="posts-list">
            ${recentPosts.map(post => `
                <div class="post-card" onclick="location.hash='#post-${post.id}'">
                    <div class="post-meta">
                        <span class="post-tag">#${post.category}</span>
                        <span><i data-lucide="calendar" style="width:14px;height:14px;display:inline-block;vertical-align:text-bottom;"></i> ${post.date}</span>
                    </div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-summary">${post.summary}</p>
                </div>
            `).join('')}
        </div>
    `;
    app.innerHTML = html;
    lucide.createIcons();
}

function renderAbout() {
    const { user } = blogData;
    let html = `
        <h2 class="section-title"><i data-lucide="user"></i> About Me</h2>
        <div class="about-section">
            <div style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.8;">
                <h3 style="color: var(--text-primary); margin-bottom: 1rem; font-size: 1.6rem;">${user.nickname}</h3>
                <p>안녕하세요! <strong>${user.role}</strong> ${user.name}입니다.</p>
                <p style="margin-top: 1rem;">${user.bio} 주말에는 항상 프리미어리그 등 유럽 축구를 챙겨보며, 축구 전술과 프로그래밍 패턴의 공통점을 찾는 것을 좋아합니다.</p>
                
                <h4 style="color: var(--accent); margin: 2rem 0 0.8rem; font-size: 1.2rem;">Tech Stack</h4>
                <div class="skill-tags" style="justify-content: flex-start; gap: 0.8rem;">
                    ${user.skills.map(skill => `<span class="skill-tag" style="font-size:0.9rem; padding:0.4rem 0.9rem;">${skill}</span>`).join('')}
                </div>
            </div>
            
            <h3 style="color: var(--text-primary); margin: 3.5rem 0 1.5rem; font-size: 1.4rem;">Projects</h3>
            <div class="projects-grid">
                ${blogData.projects.map(project => `
                    <div class="post-card" style="cursor: default; padding: 1.5rem;">
                        <h4 style="color:var(--text-primary); font-size:1.15rem; margin-bottom: 0.4rem;">${project.title}</h4>
                        <p style="color:var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">${project.description}</p>
                        <div class="project-tech">
                            ${project.tech.map(t => `<span>${t}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    app.innerHTML = html;
    lucide.createIcons();
}

function renderPostDetail(id) {
    const post = blogData.posts.find(p => p.id === parseInt(id));
    if (!post) {
        app.innerHTML = `<h2 class="section-title">Post Not Found</h2>`;
        return;
    }
    
    let html = `
        <a href="#home" class="back-btn"><i data-lucide="arrow-left"></i> 목록으로 돌아가기</a>
        <article class="post-detail-view">
            <header class="detail-header">
                <h1 class="detail-title">${post.title}</h1>
                <div class="post-meta" style="margin-top: 1.2rem;">
                    <span class="post-tag">#${post.category}</span>
                    <span><i data-lucide="calendar" style="width:14px;height:14px;display:inline-block;vertical-align:text-bottom;"></i> ${post.date}</span>
                </div>
            </header>
            <div class="detail-content">
                ${post.content}
            </div>
        </article>
    `;
    app.innerHTML = html;
    lucide.createIcons();
    window.scrollTo(0, 0);
}

// 3. Router Logic
function router() {
    const hash = window.location.hash || '#home';
    
    // Update active nav link
    document.querySelectorAll('.nav-item').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash || (hash.startsWith('#post-') && link.getAttribute('href') === '#home')) {
            link.classList.add('active');
        }
    });

    if (hash === '#home') {
        renderHome();
    } else if (hash === '#about') {
        renderAbout();
    } else if (hash.startsWith('#post-')) {
        const id = hash.split('-')[1];
        renderPostDetail(id);
    } else {
        renderHome();
    }
}

// 4. Initialize
window.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    router();
});
window.addEventListener('hashchange', router);