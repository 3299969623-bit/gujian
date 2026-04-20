/**
 * 故宫数据可视化 - 主程序
 * Forbidden City Data Visualization - Main Application
 */
/* ===== 2D 散点图数据：x/y 均 0-100，symbol 同 echarts ===== */

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    // 初始化应用
    initApp();
});

/**
 * 初始化应用程序
 */
function initApp() {
    // 添加页面加载动画
    addEntranceAnimation();

    // 初始化时间显示
    initTimeDisplay();

    // 初始化数字动画
    initNumberAnimations();

    // 初始化粒子效果
    initParticles();

    // 初始化悬浮装饰
    initFloatingElements();

    // 初始化高亮列表交互
    initHighlightInteractions();

    // 初始化中轴线建筑交互
    initAxisInteractions();

    // 延迟初始化图表
    setTimeout(() => {
        if (typeof initAllCharts === 'function') {
            initAllCharts();
        }
    }, 500);
    // 初始化 2D 平面散点图（替代 3D）
    setTimeout(() => initForbiddenCity2D(), 600);
    // 设置定时更新
    setInterval(updateTime, 1000);
}

/**
 * 添加页面入场动画
 */
function addEntranceAnimation() {
    const elements = document.querySelectorAll('.header, .left-panel, .center-section, .right-panel, .footer');

    elements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.2}s`;
    });

    // 标题特殊动画
    const title = document.querySelector('.main-title');
    if (title) {
        title.classList.add('scale-in');
    }
}

/**
 * 初始化时间显示
 */
function initTimeDisplay() {
    updateTime();
}

function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        timeElement.textContent = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
    }
}

/**
 * 初始化数字动画
 */
function initNumberAnimations() {
    const metricValues = document.querySelectorAll('.metric-value[data-value]');

    metricValues.forEach(element => {
        const targetValue = parseInt(element.getAttribute('data-value'));
        const duration = 2000;
        const startTime = performance.now();

        function animateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 使用缓动函数
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(targetValue * easeOutQuart);

            element.textContent = formatNumber(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animateNumber);
            } else {
                element.textContent = formatNumber(targetValue);
            }
        }

        // 延迟启动动画
        setTimeout(() => {
            requestAnimationFrame(animateNumber);
        }, 300);
    });
}

/**
 * 格式化数字（添加千分位）
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 初始化粒子效果
 */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

/**
 * 创建单个粒子
 */
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // 随机位置
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    // 随机动画参数
    const duration = 10 + Math.random() * 20;
    const delay = Math.random() * 10;
    const size = 2 + Math.random() * 3;

    particle.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        background: ${Math.random() > 0.5 ? '#FFD700' : '#C91F37'};
    `;

    container.appendChild(particle);

    // 定期更新粒子位置
    setInterval(() => {
        updateParticlePosition(particle);
    }, 15000);
}

/**
 * 更新粒子位置
 */
function updateParticlePosition(particle) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    particle.style.transition = 'all 10s ease-in-out';
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
}

/**
 * 初始化悬浮装饰元素
 */
function initFloatingElements() {
    const clouds = document.querySelectorAll('.floating-cloud');

    clouds.forEach((cloud, index) => {
        // 添加随机动画延迟
        cloud.style.animationDelay = `${index * 3}s`;

        // 添加鼠标悬停效果
        cloud.addEventListener('mouseenter', () => {
            cloud.style.animationPlayState = 'paused';
            cloud.style.transform = 'scale(1.2)';
        });

        cloud.addEventListener('mouseleave', () => {
            cloud.style.animationPlayState = 'running';
            cloud.style.transform = 'scale(1)';
        });
    });
}

/**
 * 初始化高亮列表交互
 */
function initHighlightInteractions() {
    const highlights = document.querySelectorAll('.highlight-item');

    highlights.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // 添加悬停高亮效果
            item.style.transform = 'translateX(10px)';
            item.style.boxShadow = '0 5px 20px rgba(201, 31, 55, 0.3)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.boxShadow = 'none';
        });

        item.addEventListener('click', () => {
            showBuildingDetailPopup(item);
        });
    });
}

/**
 * 初始化中轴线建筑交互
 */
function initAxisInteractions() {
    const axisBuildings = document.querySelectorAll('.axis-building');

    axisBuildings.forEach(building => {
        building.addEventListener('mouseenter', () => {
            building.style.transform = 'translateY(-5px) scale(1.05)';
            building.style.boxShadow = '0 10px 30px rgba(201, 31, 55, 0.4)';
        });

        building.addEventListener('mouseleave', () => {
            building.style.transform = 'translateY(0) scale(1)';
            building.style.boxShadow = 'none';
        });

        building.addEventListener('click', () => {
            const name = building.querySelector('.building-name').textContent;
            highlightMapBuilding(name);
        });
    });
}

/**
 * 高亮地图中的建筑
 */
function highlightMapBuilding(name) {
    const mapChart = echarts.getInstanceByDom(document.getElementById('forbidden-city-map'));
    if (mapChart) {
        mapChart.dispatchAction({
            type: 'highlight',
            name: name
        });

        // 显示tooltip
        mapChart.dispatchAction({
            type: 'showTip',
            name: name
        });

        // 3秒后取消高亮
        setTimeout(() => {
            mapChart.dispatchAction({
                type: 'downplay',
                name: name
            });
            mapChart.dispatchAction({
                type: 'hideTip'
            });
        }, 3000);
    }
}

/**
 * 显示建筑详情弹出框
 */
function showBuildingDetailPopup(item) {
    const rank = item.getAttribute('data-rank');
    const buildingData = ForbiddenCityData.architecturalWonders.find(w => w.rank === parseInt(rank));

    if (!buildingData) return;

    // 创建弹出框
    const popup = document.createElement('div');
    popup.className = 'building-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <button class="popup-close">&times;</button>
            <div class="popup-header">
                <span class="popup-rank">#${buildingData.rank}</span>
                <h3 class="popup-title">${buildingData.name}</h3>
                <span class="popup-dynasty">${buildingData.dynasty} · ${buildingData.year}年</span>
            </div>
            <div class="popup-body">
                <p class="popup-description">${buildingData.description}</p>
                <p class="popup-details">${buildingData.details}</p>
            </div>
        </div>
    `;

    // 添加样式
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;

    const content = popup.querySelector('.popup-content');
    content.style.cssText = `
        background: linear-gradient(135deg, rgba(10, 22, 40, 0.98) 0%, rgba(5, 11, 20, 0.98) 100%);
        border: 2px solid #C91F37;
        border-radius: 15px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        position: relative;
        animation: scaleIn 0.3s ease-out;
    `;

    // 添加弹出框样式
    addPopupStyles();

    document.body.appendChild(popup);

    // 关闭按钮事件
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => {
        popup.remove();
    });

    // 点击背景关闭
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.remove();
        }
    });
}

/**
 * 添加弹出框样式
 */
function addPopupStyles() {
    const styleId = 'popup-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        .popup-close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            color: #A0A0A0;
            background: none;
            border: none;
            cursor: pointer;
            transition: color 0.3s;
        }
        .popup-close:hover {
            color: #C91F37;
        }
        .popup-header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(201, 31, 55, 0.3);
        }
        .popup-rank {
            display: inline-block;
            background: linear-gradient(135deg, #C91F37, #8B0000);
            color: #FFD700;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .popup-title {
            font-family: 'Ma Shan Zheng', serif;
            font-size: 28px;
            color: #FFD700;
            margin: 10px 0;
        }
        .popup-dynasty {
            font-size: 14px;
            color: #A0A0A0;
        }
        .popup-description {
            font-size: 16px;
            color: #E8E8E8;
            text-align: center;
            margin-bottom: 15px;
            font-weight: 500;
        }
        .popup-details {
            font-size: 14px;
            color: #A0A0A0;
            line-height: 1.8;
        }
        @keyframes popupIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;

    document.head.appendChild(style);
}

/**
 * 窗口大小变化处理
 */
window.addEventListener('resize', function () {
    // 重新调整所有图表大小
    const charts = document.querySelectorAll('.chart');
    charts.forEach(chart => {
        const chartInstance = echarts.getInstanceByDom(chart);
        if (chartInstance) {
            chartInstance.resize();
        }
    });
});

/**
 * 键盘事件处理
 */
document.addEventListener('keydown', function (e) {
    // ESC键关闭弹出框
    if (e.key === 'Escape') {
        const popups = document.querySelectorAll('.building-popup');
        popups.forEach(popup => popup.remove());
    }
});

/**
 * 添加滚动动画（视差效果）
 */
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-cloud');

    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
/* =============== 2D 平面散点图 =============== */
function initForbiddenCity2D() {
    const dom = document.getElementById('forbidden-city-map');
    if (!dom) return;
    const myChart = echarts.init(dom);

    const option = {
        backgroundColor: 'transparent',
        grid: { left: 0, top: 0, right: 0, bottom: 0 },
        xAxis: { min: 0, max: 100, show: false },
        yAxis: { min: 0, max: 100, show: false },
        series: [{
            type: 'scatter',
            coordinateSystem: 'cartesian2d',
            symbolSize: 14,
            label: { show: true, position: 'top', color: '#eee', fontSize: 12 },
            data: palaceScatter2D.map(p => ({
                name: p.name,
                value: p.value,
                symbol: p.symbol,
                symbolSize: p.symbol === 'rect' ? [20, 10] : 16,
                itemStyle: p.itemStyle,
                label: { formatter: p.name }
            }))
        }],
        tooltip: { formatter: '{b}' }
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}
// 导出公共函数
window.highlightMapBuilding = highlightMapBuilding;
window.showBuildingDetailPopup = showBuildingDetailPopup;
