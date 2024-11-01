// 数据配置
const categories = [
    {
        id: 'chat',
        titleZh: '对话',
        titleEn: 'Chat',
        color: 'text-blue-600',
        items: [
            { name: 'ChatGPT', url: 'https://chat.openai.com/' },
            { name: 'Claude', url: 'https://www.anthropic.com/' },
        ],
    },
    // ... 其他类别数据 ...
];

// 状态管理
let isDark = false;
let language = 'zh';

// 初始化函数
function init() {
    // 检查系统主题
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleTheme();
    }
    
    // 渲染分类
    renderCategories();
    
    // 事件监听
    setupEventListeners();
}

// 渲染分类
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = categories.map(category => `
        <div class="w-full max-w-[160px] group hover:scale-105 transition-transform duration-300 flex items-center">
            <div class="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-2.5 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between flex-1">
                <h2 class="text-base font-semibold ${category.color} text-center mb-2">
                    ${language === 'zh' ? category.titleZh : category.titleEn}
                </h2>
                <ul class="space-y-1.5">
                    ${category.items.map(item => `
                        <li class="text-center">
                            <a href="${item.url}" target="_blank" rel="noopener noreferrer"
                               class="inline-block text-gray-700 hover:text-gray-900 transition-all duration-200 hover:scale-105 text-sm">
                                ${item.name}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// 设置事件监听
function setupEventListeners() {
    // 主题切换
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // 语言切换
    document.getElementById('languageToggle').addEventListener('click', toggleLanguage);
    
    // 反馈表单提交
    document.getElementById('feedbackForm').addEventListener('submit', handleFeedback);
    
    // 滚动效果
    window.addEventListener('scroll', handleScroll);
}

// 主题切换
function toggleTheme() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark');
    document.getElementById('moonIcon').classList.toggle('hidden');
    document.getElementById('sunIcon').classList.toggle('hidden');
}

// 语言切换
function toggleLanguage() {
    language = language === 'zh' ? 'en' : 'zh';
    document.getElementById('subtitle').textContent = 
        language === 'zh' ? '最快的ai导航' : 'Fastest AI Navigation';
    document.getElementById('feedbackInput').placeholder = 
        language === 'zh' ? '有什么想说的吗？随便聊聊吧 :)' : "What's on your mind? Let's chat :)";
    renderCategories();
}

// 处理反馈
function handleFeedback(e) {
    e.preventDefault();
    const feedback = document.getElementById('feedbackInput').value;
    console.log('Feedback submitted:', feedback);
    document.getElementById('feedbackInput').value = '';
}

// 处理滚动
function handleScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('bg-white/80', 'dark:bg-neutral-900/80', 'backdrop-blur-md', 'shadow-sm');
    } else {
        navbar.classList.remove('bg-white/80', 'dark:bg-neutral-900/80', 'backdrop-blur-md', 'shadow-sm');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', init); 
