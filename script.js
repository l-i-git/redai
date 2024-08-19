const translations = {
    zh: {
        mainTitle: "AI工具导航",
        chatTitle: "对话",
        imageTitle: "图像",
        audioTitle: "音乐",
        videoTitle: "视频",
        developmentTitle: "开发",
        pptTitle: "PPT"
    },
    en: {
        mainTitle: "AI Tools Navigation",
        chatTitle: "Chat",
        imageTitle: "Image",
        audioTitle: "Audio",
        videoTitle: "Video",
        developmentTitle: "Development",
        pptTitle: "Presentation"
    }
};

function updateLanguage(lang) {
    const elements = {
        mainTitle: document.getElementById('mainTitle'),
        chatTitle: document.getElementById('chatTitle'),
        imageTitle: document.getElementById('imageTitle'),
        audioTitle: document.getElementById('audioTitle'),
        videoTitle: document.getElementById('videoTitle'),
        developmentTitle: document.getElementById('developmentTitle'),
        pptTitle: document.getElementById('pptTitle')
    };

    Object.keys(elements).forEach(key => {
        elements[key].textContent = translations[lang][key];
    });
}

// 检测用户浏览器语言
const userLang = navigator.language || navigator.userLanguage;
const defaultLang = userLang.startsWith('zh') ? 'zh' : 'en';

// 初始化语言
updateLanguage(defaultLang);
document.getElementById('languageSelect').value = defaultLang;

// 语言选择事件监听
document.getElementById('languageSelect').addEventListener('change', function() {
    updateLanguage(this.value);
});

function updateLayout() {
    const container = document.querySelector('.category-container');
    const categories = document.querySelectorAll('.category');
    const isPortrait = window.innerHeight > window.innerWidth;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile && isPortrait) {
        // 移动设备竖屏：两列布局
        categories.forEach(cat => cat.style.width = 'calc(50% - 10px)');
        container.style.flexDirection = 'row';
    } else {
        // 移动设备横屏或桌面：每个类别两行
        categories.forEach(cat => {
            cat.style.width = '100%';
            const ul = cat.querySelector('ul');
            ul.style.columnCount = '2';
            ul.style.columnGap = '20px';
        });
        container.style.flexDirection = 'column';
    }
}

// 初始加载时更新布局
updateLayout();

// 在窗口大小改变或设备方向变化时更新布局
window.addEventListener('resize', updateLayout);
window.addEventListener('orientationchange', updateLayout);
