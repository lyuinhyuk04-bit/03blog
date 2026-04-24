document.addEventListener("DOMContentLoaded", function () {
    const blogMenu = document.getElementById("blog-menu");
    const mainView = document.getElementById("main-view");

    function createMenu() {
        posts.forEach(post => {
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = post.title;
            // 💡 CSS 스타일링을 위한 클래스 주입
            link.className = "blog-link";
            link.onclick = function (e) {
                e.preventDefault();
                showPost(post.id);
            };
            blogMenu.appendChild(link);
        });
    }

    function showHome() {
        let html = "<h2 class='page-title'>Home</h2>";
        html += "<p class='page-desc'>블로그에 오신 것을 환영합니다. 글을 클릭하여 읽어보세요!</p>";
        html += "<div class='post-list'>";

        posts.forEach(post => {
            html += `
            <div class="post-card" onclick="showPost(${post.id})">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-desc">${post.content}</p>
            </div>
            `;
        });
        
        html += "</div>";

        mainView.innerHTML = html;
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    function showAbout() {
        mainView.innerHTML = `
        <div class="about-card">
            <h2 class="page-title">About Me</h2>
            <div class="about-content">
                <p>안녕하세요! 컴퓨터소프트웨어학과 1학년 <strong>류인혁</strong>입니다.</p>
                <p style="margin-top: 1rem;">새로운 것을 배우고 만들어나가는 과정을 즐깁니다. 지금은 기초 전공과목을 수강하며 프로그래밍의 기본기를 다지고 있고, 개인적으로 프론트엔드 웹 개발(UI/UX, 모던 프레임워크)에 깊은 관심을 두고 있습니다.</p>

                <h3 style="margin-top: 2rem; color: #f1f5f9; font-weight: 700; font-size: 1.25rem;">🎯 Goals</h3>
                <ul style="margin-top: 0.5rem; padding-left: 1.5rem; list-style-type: disc; color: #cbd5e1;">
                    <li>매일매일 배운 것을 잊지 않기 위해 기록하기</li>
                    <li>의미 있는 사이드 프로젝트 스크래치부터 완성해보기</li>
                    <li>함께 성장할 개발자 동료 만들기</li>
                </ul>

                <h3 style="margin-top: 2rem; color: #f1f5f9; font-weight: 700; font-size: 1.25rem;">🛠 Skills (Learning)</h3>
                <ul style="margin-top: 0.5rem; padding-left: 1.5rem; list-style-type: disc; color: #cbd5e1;">
                    <li>C, Python, JavaScript</li>
                    <li>HTML/CSS</li>
                    <li>React.js (Upcoming)</li>
                </ul>

                <p style="margin-top: 2.5rem; font-weight: 600; color: #3b82f6; font-size: 1.15rem;">이 블로그에 방문해주셔서 감사합니다!</p>
            </div>
        </div>
        `;
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    function showPost(id) {
        const post = posts.find(p => p.id === id);

        mainView.innerHTML = `
        <div class="post-detail">
            <h2 class="detail-title">${post.title}</h2>
            <div class="detail-body">
                <p>${post.content}</p>
            </div>
        </div>
        `;
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    // 글로벌 네임스페이스(window)에 등록하여 HTML의 onclick 이벤트에서 접근 가능하게 처리
    window.showHome = function() { showHome(); };
    window.showAbout = function() { showAbout(); };
    window.showPost = showPost;

    createMenu();
    showHome();
});