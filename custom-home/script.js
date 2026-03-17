// script.js

// 1. 实时时间显示
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', { hour12: false });
    document.getElementById('live-time').innerText = timeString;
}
setInterval(updateTime, 1000);
updateTime();

// 2. 简单日历生成（本月）
function generateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    let calendarHtml = '<div class="day">一</div><div class="day">二</div><div class="day">三</div><div class="day">四</div><div class="day">五</div><div class="day">六</div><div class="day">日</div>';
    
    // 填充空白
    let startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // 周一为一周第一天
    for (let i = 0; i < startDayOfWeek; i++) {
        calendarHtml += '<div class="day"></div>';
    }
    
    // 填充日期
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const dateStr = `${year}-${month+1}-${d}`;
        calendarHtml += `<div class="day" data-date="${dateStr}">${d}</div>`;
    }
    
    document.getElementById('calendar').innerHTML = calendarHtml;
    
    // 点击日期事件（跳转到当天文章，这里需要根据你的博客URL规则定制）
    document.querySelectorAll('#calendar .day[data-date]').forEach(day => {
        day.addEventListener('click', function() {
            const date = this.dataset.date;
            // 假设你的文章链接格式为 /YYYY/MM/DD/标题/，可以尝试跳转到归档日期页
            // 但简单起见，跳转到当天的归档搜索，如 /archives/2024/01/01/
            window.location.href = `/archives/${date.replace(/-/g, '/')}/`;
        });
    });
}
generateCalendar();

// 3. 深色模式切换（结合主题已有的切换按钮）
const darkModeToggle = document.getElementById('darkmode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    // 切换图标
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// 4. 音乐开关（假设你有一个背景音乐）
const musicToggle = document.getElementById('music-toggle');
let audio = null;
musicToggle.addEventListener('click', () => {
    if (!audio) {
        audio = new Audio('/music/白藏蜜雨 - 君色々移り（翻自 風男塾）.mp3'); // 替换为你的音乐URL
        audio.loop = true;
    }
    if (audio.paused) {
        audio.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i> 暂停音乐';
    } else {
        audio.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i> 背景音乐';
    }
});

// 5. 回到顶部按钮
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 6. 搜索框功能（简单跳转到主题的搜索页面）
const searchBtn = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = `/search/?q=${encodeURIComponent(query)}`; // 需要主题支持搜索
    }
});
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// 7. 最近博客动态获取（需要从Hexo生成的API获取，这里用静态示例，后续可优化）
// 由于我们无法在纯静态页面中动态获取Hexo的文章列表，一个简单的方法是：
// 在部署时，Hexo生成一个包含最近文章的JSON文件，然后通过fetch加载。
// 为了简化，这里暂时用静态数据，你可以手动更新。
// 后续我们可以写一个Hexo插件或使用模板来生成这个数据。
// 现在先用静态数据占位。
// 如果你希望动态获取，我们可以用下面注释掉的代码，但需要额外生成一个postlist.json文件。
/*
fetch('/postlist.json')
    .then(response => response.json())
    .then(posts => {
        if (posts.length > 0) {
            const recent = posts[0];
            document.querySelector('.recent-post-card img').src = recent.cover;
            document.querySelector('.recent-post-card .info h4 a').href = recent.link;
            document.querySelector('.recent-post-card .info h4 a').innerText = recent.title;
            document.querySelector('.recent-post-card .info p').innerText = recent.excerpt;
            document.querySelector('.recent-post-card .category').innerText = recent.categories[0];
            document.querySelector('.recent-post-card .tags').innerText = recent.tags.join(' ');
        }
    });
*/
// 由于暂时没有生成postlist.json，我们保留静态占位，你需要手动修改HTML里的内容。