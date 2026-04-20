/* ================= 通用：节点不存在直接跳过 ================= */
function initChart(id, option) {
    const el = document.getElementById(id);
    if (!el) { console.warn(`[ECharts] 未找到节点 #${id}，已跳过`); return null; }
    const ins = echarts.init(el);
    ins.setOption(option);
    window.addEventListener('resize', () => ins.resize());
    return ins;
}

/* ================= 通用：下载图表 ================= */
window.downloadChart = function (domId) {
    const chart = echarts.getInstanceByDom(document.getElementById(domId + '-chart'));
    if (!chart) return;
    const url = chart.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#0b0f18' });
    const a = document.createElement('a');
    a.href = url;
    a.download = domId + '.png';
    a.click();
};

/* =================================================================
   ① 各省数量条形图（带缩放+Tooltip 格式化）
================================================================= */
initChart('arch-province-chart', {
    backgroundColor: 'transparent',
    textStyle: { color: '#fff', fontFamily: 'inherit' },
    grid: { left: 70, right: 20, top: 40, bottom: 40, containLabel: true },
    tooltip: {
        trigger: 'axis',
        // 修正后的 formatter
        formatter: function (params) {
            // params 是一个数组，我们取第一个元素
            const dataPoint = params[0];
            // dataPoint.name 对应 yAxis 的类别名（省份）
            // dataPoint.data 对应 series 的数值（数量）
            return `${dataPoint.name}: ${dataPoint.data} 处`;
        }
    },
    /* ① X 轴是数值（数量） */
    xAxis: { type: 'value', axisLine: { lineStyle: { color: 'rgba(255,255,255,.2)' } }, splitLine: { show: false } },
    /* ② Y 轴是类别（省份） */
    yAxis: { type: 'category', data: ['山西', '河南', '河北', '陕西', '山东', '江苏', '浙江', '福建', '广东', '四川'], axisLine: { show: false }, axisTick: { show: false }, axisLabel: { align: 'right' } },
    series: [{
        type: 'bar',
        data: [1286, 958, 876, 723, 654, 589, 521, 478, 423, 389],
        itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: '#00f6ff' }, { offset: 1, color: '#45b7d1' }])
        },
        label: { show: true, position: 'right', formatter: '{c}' },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,246,255,.6)' } }
    }]
});
/* =================================================================
   ② 古建筑功能分布
================================================================= */
initChart('arch-rank-chart', {
    backgroundColor: 'transparent',
    textStyle: { color: '#fff', fontFamily: 'inherit' },
    tooltip: {
        trigger: 'item',
        formatter: ({ name, value, percent }) => `${name}: ${value} 处 (${percent.toFixed(1)}%)`
    },
    legend: {
        orient: 'vertical',
        right: '5%',
        top: 'center',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 8,
        textStyle: { color: 'rgba(255,255,255,0.85)', fontSize: 11 }
    },
    series: [{
        type: 'pie',
        radius: ['35%', '70%'],
        center: ['40%', '50%'],
        itemStyle: {
            borderRadius: 6,
            borderColor: 'rgba(11,15,24,0.9)',
            borderWidth: 2
        },
        label: {
            show: true,
            color: '#fff',
            fontSize: 10,
            formatter: '{b}\n{c}'
        },
        emphasis: {
            label: {
                show: true,
                fontSize: 12,
                fontWeight: 'bold',
                color: '#FFD700'
            }
        },
        data: [
            { name: '宗教建筑', value: 2856, itemStyle: { color: '#ff4d94' } },
            { name: '居住建筑', value: 1987, itemStyle: { color: '#f9d976' } },
            { name: '行政建筑', value: 1024, itemStyle: { color: '#00f6ff' } },
            { name: '园林建筑', value: 876, itemStyle: { color: '#45b7d1' } },
            { name: '祭祀建筑', value: 543, itemStyle: { color: '#8378ff' } },
            { name: '其他功能', value: 372, itemStyle: { color: '#00cdac' } }
        ],
        animationType: 'scale',
        animationDuration: 1200,
        animationEasing: 'elasticOut'
    }]
});

/* =================================================================
   ③ 类型占比饼图（选中高亮+下载）
================================================================= */
initChart('arch-type-chart', {
    backgroundColor: 'transparent', textStyle: { color: '#fff' },
    tooltip: { trigger: 'item', formatter: '{b}: {c} 处 ({d}%)' },
    series: [{
        type: 'pie', radius: ['40%', '70%'], center: ['50%', '50%'],
        data: [{ name: '寺庙', value: 2356 }, { name: '民居', value: 1892 }, { name: '宫殿', value: 823 }, { name: '园林', value: 632 }, { name: '塔', value: 402 }, { name: '城墙', value: 198 }, { name: '其他', value: 355 }],
        color: ['#00f6ff', '#ff4d94', '#f9d976', '#45b7d1', '#00cdac', '#8378ff', '#ff8c66'],
        label: { show: true, formatter: '{b}\n{d}%' },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,246,255,.6)' } },
        selectedMode: 'single', // 单选高亮
        selectedOffset: 8
    }]
});

/* =================================================================
   ④ 年代分布柱状（缩放+Tooltip）
================================================================= */
initChart('arch-age-chart', {
    backgroundColor: 'transparent',
    grid: { left: 50, right: 20, top: 40, bottom: 40 },
    dataZoom: [/* 略 */],
    tooltip: { trigger: 'axis', formatter: ({ name, value }) => `${name}: ${value} 处` },
    xAxis: { type: 'category', data: ['唐代', '宋代', '元代', '明代', '清代', '民国'], axisLine: { lineStyle: { color: 'rgba(255,255,255,.2)' } } },
    yAxis: { type: 'value', max: 2500, axisLine: { lineStyle: { color: 'rgba(255,255,255,.2)' } }, splitLine: { lineStyle: { color: 'rgba(255,255,255,.05)' } } },
    series: [{
        type: 'bar',
        data: [87, 235, 312, 1286, 2567, 432],
        itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#8378ff' }, { offset: 1, color: '#00cdac' }]) },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(131,120,255,.6)' } }
    }]
});
/* =================================================================
   ⑤ 修缮漏斗（Tooltip+选中偏移）
================================================================= */
initChart('arch-repair-chart', {
    backgroundColor: 'transparent', textStyle: { color: '#fff' },
    tooltip: { trigger: 'item', formatter: '{b}: {c} 处' },
    series: [{
        type: 'funnel', left: '10%', width: '80%', min: 0, max: 100, minSize: '0%', maxSize: '100%', sort: 'descending', gap: 2,
        label: { show: true, position: 'inside', formatter: '{b}\n{c}' },  // 不再硬写 %
        data: [{ value: 100, name: '完好' }, { value: 75, name: '轻微破损' }, { value: 45, name: '中度破损' }, { value: 25, name: '重度破损' }, { value: 10, name: '急需修缮' }],
        color: ['#00f6ff', '#45b7d1', '#f9d976', '#ff4d94', '#8378ff'],
        emphasis: { label: { fontSize: 16 } }
    }]
});

/* =================================================================
   ⑥ 趋势折线（缩放+Tooltip+面积渐变）
================================================================= */
initChart('arch-trend-chart', {
    backgroundColor: 'transparent',
    grid: { left: 60, right: 40, top: 40, bottom: 40 },
    dataZoom: [{ type: 'inside', xAxisIndex: 0 }, { type: 'slider', xAxisIndex: 0, height: 6, left: 4, right: 4, borderColor: 'transparent', fillerColor: 'rgba(0,246,255,.2)', handleStyle: { color: '#00f6ff' } }],
    tooltip: { trigger: 'axis', formatter: arr => `${arr[0].axisValue} 年新增: ${arr[0].value} 处` },
    xAxis: { type: 'category', boundaryGap: false, data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'], axisLine: { lineStyle: { color: 'rgba(255,255,255,.2)' } } },
    yAxis: { type: 'value', name: '新增登录数', nameTextStyle: { color: '#fff' }, axisLine: { lineStyle: { color: 'rgba(255,255,255,.2)' } }, splitLine: { lineStyle: { color: 'rgba(255,255,255,.05)' } } },
    series: [{
        type: 'line',
        data: [156, 189, 234, 287, 321, 365, 412, 478, 532, 589],
        smooth: true, symbol: 'circle',
        lineStyle: { width: 3, color: '#00f6ff' },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,246,255,.4)' }, { offset: 1, color: 'rgba(0,246,255,0)' }]) },
        emphasis: { focus: 'series' }
    }]
});





/*数据屏幕故宫*/
/**
 * 故宫数据可视化 - 图表配置
 * Forbidden City Data Visualization - Chart Configurations
 */

// 图表主题颜色

// 初始化所有图表
function initAllCharts() {
    initHierarchyChart();
    initFunctionChart();
    initCultureRadar();
    initVisitorChart();
    initMapChart();
}

// 宫殿建筑等级分布图表（柱状图）
function initHierarchyChart() {
    const chartDom = document.getElementById('hierarchy-chart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                const data = params[0];
                return `<div style="padding: 8px;">
                    <div style="font-weight: bold; color: #FFD700; margin-bottom: 5px;">${data.name}</div>
                    <div>高度: <span style="color: #00F0FF;">${data.value}米</span></div>
                    <div>数量: <span style="color: #C91F37;">${ForbiddenCityData.hierarchyData.counts[data.dataIndex]}座</span></div>
                </div>`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ForbiddenCityData.hierarchyData.names,
            axisLabel: {
                rotate: 45,
                interval: 0,
                fontSize: 10,
                color: '#A0A0A0',
                formatter: function (value) {
                    return value.length > 4 ? value.substring(0, 4) + '...' : value;
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(201, 31, 55, 0.5)'
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: '高度(米)',
            nameTextStyle: {
                color: '#A0A0A0',
                fontSize: 10
            },
            axisLabel: {
                color: '#A0A0A0',
                fontSize: 10
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(201, 31, 55, 0.1)'
                }
            }
        },
        series: [{
            name: '建筑高度',
            type: 'bar',
            barWidth: '60%',
            data: ForbiddenCityData.hierarchyData.heights.map((value, index) => {
                return {
                    value: value,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: index < 3 ? '#C91F37' : '#4169E1' },
                            { offset: 1, color: index < 3 ? '#8B0000' : '#1E90FF' }
                        ]),
                        borderRadius: [4, 4, 0, 0]
                    }
                };
            }),
            animationDuration: 1500,
            animationEasing: 'elasticOut'
        }]
    };

    myChart.setOption(option);

    // 响应式调整
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 功能区域占比图表（饼图）
function initFunctionChart() {
    const chartDom = document.getElementById('function-chart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return `<div style="padding: 8px;">
                    <div style="font-weight: bold; color: ${params.color}; margin-bottom: 5px;">${params.name}</div>
                    <div>占比: <span style="color: #FFD700;">${params.value}%</span></div>
                </div>`;
            }
        },
        legend: {
            orient: 'vertical',
            right: '5%',
            top: 'center',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 8,
            textStyle: {
                color: '#A0A0A0',
                fontSize: 11
            }
        },
        series: [{
            name: '功能区域',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: true,
            itemStyle: {
                borderRadius: 6,
                borderColor: 'rgba(10, 22, 40, 0.8)',
                borderWidth: 2
            },
            label: {
                show: false
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#FFD700'
                },
                itemStyle: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            labelLine: {
                show: false
            },
            data: ForbiddenCityData.functionAreas.map((item, index) => {
                return {
                    value: item.value,
                    name: item.name,
                    itemStyle: {
                        color: item.color
                    }
                };
            }),
            animationType: 'scale',
            animationDuration: 1000,
            animationEasing: 'elasticOut'
        }]
    };

    myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 文化价值评估图表（雷达图）
function initCultureRadar() {
    const chartDom = document.getElementById('culture-radar');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item'
        },
        radar: {
            indicator: ForbiddenCityData.cultureRadar.indicators.map((item, index) => {
                return {
                    name: item,
                    max: 100,
                    axisName: {
                        color: '#A0A0A0',
                        fontSize: 11
                    }
                };
            }),
            center: ['50%', '50%'],
            radius: '65%',
            startAngle: 90,
            shape: 'polygon',
            splitNumber: 5,
            axisName: {
                color: '#A0A0A0'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(201, 31, 55, 0.2)'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(201, 31, 55, 0.05)', 'rgba(201, 31, 55, 0.1)']
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(201, 31, 55, 0.3)'
                }
            }
        },
        series: [{
            name: '文化价值',
            type: 'radar',
            data: [{
                value: ForbiddenCityData.cultureRadar.values,
                name: '故宫文化价值',
                areaStyle: {
                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [
                        { offset: 0, color: 'rgba(201, 31, 55, 0.6)' },
                        { offset: 1, color: 'rgba(201, 31, 55, 0.1)' }
                    ])
                },
                lineStyle: {
                    color: '#C91F37',
                    width: 2
                },
                itemStyle: {
                    color: '#FFD700'
                }
            }]
        }],
        animationDuration: 1500
    };

    myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 年度游客趋势图表（折线图）
function initVisitorChart() {
    const chartDom = document.getElementById('visitor-chart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            formatter: function (params) {
                const data = params[0];
                return `<div style="padding: 8px;">
                    <div style="font-weight: bold; color: #FFD700; margin-bottom: 5px;">${data.name}年</div>
                    <div>游客量: <span style="color: #C91F37;">${data.value}万人次</span></div>
                </div>`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ForbiddenCityData.visitorTrend.years,
            axisLabel: {
                color: '#A0A0A0',
                fontSize: 10
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(201, 31, 55, 0.5)'
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: '万人次',
            nameTextStyle: {
                color: '#A0A0A0',
                fontSize: 10
            },
            axisLabel: {
                color: '#A0A0A0',
                fontSize: 10
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(201, 31, 55, 0.1)'
                }
            }
        },
        series: [{
            name: '游客量',
            type: 'line',
            data: ForbiddenCityData.visitorTrend.visitors,
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#C91F37' },
                    { offset: 0.5, color: '#FFD700' },
                    { offset: 1, color: '#C91F37' }
                ]),
                width: 3
            },
            itemStyle: {
                color: '#FFD700',
                borderColor: '#C91F37',
                borderWidth: 2
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(201, 31, 55, 0.4)' },
                    { offset: 1, color: 'rgba(201, 31, 55, 0)' }
                ])
            },
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };

    myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize();
    });
}
function initMapChart() {
    initScreenshot2DMap();   // 永远只跑 2D
}
// 故宫地图可视化（升级版3D效果）
/*function initMapChart() {

    console.log('Initializing 3D map chart...');

    const chartDom = document.getElementById('forbidden-city-map');
    if (!chartDom) {
        console.error('Map container not found');
        return;
    }

    // 检查浏览器是否支持 WebGL（若不支持，ECharts-GL 无法工作）
    function isWebGLAvailable() {
        try {
            var canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2')));
        } catch (e) {
            return false;
        }
    }
    if (!isWebGLAvailable()) {
        console.warn('WebGL not available in this browser — 3D rendering not supported. Falling back to 2D.');
        fallbackTo2DMap();
        return;
    }

    // 检查ECharts是否加载
    if (typeof echarts === 'undefined') {
        console.error('ECharts library not loaded');
        fallbackTo2DMap();
        return;
    }

    // 如果 ECharts 存在但 ECharts-GL（graphic3D）不可用，尝试动态加载本地 echarts-gl 并重试一次
    if (typeof echarts !== 'undefined' && !echarts.graphic3D && !window.__echarts_gl_loading) {
        window.__echarts_gl_loading = true;
        console.warn('echarts.graphic3D missing — attempting to load local echarts-gl and retry');
        var s = document.createElement('script');
        s.src = 'js/vendor/echarts-gl.min.js';
        s.onload = function () {
            console.log('Local echarts-gl script loaded (charts.js)');
            setTimeout(function () {
                try {
                    if (typeof initMapChart === 'function') initMapChart();
                } catch (e) {
                    console.error('Retry initMapChart failed:', e);
                    fallbackTo2DMap();
                }
            }, 200);
        };
        s.onerror = function () {
            console.error('Failed to load local echarts-gl from js/vendor/echarts-gl.min.js');
            fallbackTo2DMap();
        };
        document.head.appendChild(s);
        return;
    }

    // 尝试使用 ECharts-GL；不再通过 `echarts.graphic3D` 做硬性检测
    // 改为在调用 setOption 时捕获异常并回退到 2D 模式，避免错误的缺省检测导致不可见
    console.log('Attempting to initialize 3D map (will fallback on error if needed)');
    const myChart = echarts.init(chartDom);

    // 准备地图数据 - 添加3D效果信息
    const allBuildings = [
        ...ForbiddenCityData.mapData.centralAxis.map((item, index) => ({
            ...item,
            type: 'central',
            symbolSize: 25 - index * 1, // 适中的大小
            height: Math.min((item.height || 30), 60), // 限制在合理范围内
            itemStyle: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [
                    { offset: 0, color: '#4169E1' },
                    { offset: 1, color: '#1E90FF' }
                ])
            },
            label: {
                show: index < 5, // 只显示前5个建筑的标签
                formatter: item.name,
                position: 'top',
                fontSize: 10,
                color: '#FFD700',
                fontWeight: 'bold'
            }
        })),
        ...ForbiddenCityData.mapData.outerCourtLeft.map(item => ({
            ...item,
            type: 'outer',
            symbolSize: 22,
            height: 30,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    { offset: 0, color: '#C91F37' },
                    { offset: 1, color: '#8B0000' }
                ])
            }
        })),
        ...ForbiddenCityData.mapData.outerCourtRight.map(item => ({
            ...item,
            type: 'outer',
            symbolSize: 22,
            height: 30,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    { offset: 0, color: '#C91F37' },
                    { offset: 1, color: '#8B0000' }
                ])
            }
        })),
        ...ForbiddenCityData.mapData.innerCourtLeft.map(item => ({
            ...item,
            type: 'inner',
            symbolSize: 20,
            height: 25,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    { offset: 0, color: '#FFD700' },
                    { offset: 1, color: '#B8860B' }
                ])
            }
        })),
        ...ForbiddenCityData.mapData.innerCourtRight.map(item => ({
            ...item,
            type: 'inner',
            symbolSize: 20,
            height: 25,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    { offset: 0, color: '#FFD700' },
                    { offset: 1, color: '#B8860B' }
                ])
            }
        })),
        ...ForbiddenCityData.mapData.imperialGarden.map(item => ({
            ...item,
            type: 'garden',
            symbolSize: 25,
            height: 20,
            itemStyle: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [
                    { offset: 0, color: '#228B22' },
                    { offset: 1, color: '#006400' }
                ])
            }
        }))
    ];

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                const data = params.data;
                if (data) {
                    return `<div style="padding: 12px; min-width: 160px; background: rgba(10, 22, 40, 0.95); border: 2px solid ${data.itemStyle.color}; border-radius: 10px;">
                        <div style="font-weight: bold; color: #FFD700; font-size: 15px; margin-bottom: 8px; text-align: center;">${data.name}</div>
                        <div style="font-size: 12px; color: #A0A0A0; margin-bottom: 8px;">${data.desc || data.type}</div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid rgba(201, 31, 55, 0.3);">
                            <span style="display: inline-block; width: 12px; height: 12px; background: ${data.itemStyle.color}; border-radius: 50%; margin-right: 8px; box-shadow: 0 0 10px ${data.itemStyle.color};"></span>
                            <span style="font-size: 11px; color: #E8E8E8;">${getTypeLabel(data.type)}</span>
                            ${data.height ? `<span style="font-size: 10px; color: #FFD700;">高度: ${data.height}m</span>` : ''}
                        </div>
                    </div>`;
                }
                return '';
            }
        },
        // 3D透视投影设置
        grid3D: {
            show: true,
            boxWidth: 120,
            boxDepth: 180,
            boxHeight: 60,
            viewControl: {
                alpha: 25,
                beta: 45,
                distance: 300,
                minDistance: 150,
                maxDistance: 600,
                autoRotate: true,
                autoRotateAfterStill: 2,
                rotateSensitivity: 0.8,
                zoomSensitivity: 0.8,
                panSensitivity: 1.0,
                animation: true,
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'cubicOut'
            },
            environment: '#0a0a0a',
            light: {
                main: {
                    intensity: 1.5,
                    shadow: false,
                    shadowQuality: 'medium'
                },
                ambient: {
                    intensity: 0.6
                }
            }
        },
        graphic: [
            {
                type: 'group',
                left: 'center',
                top: '3%',
                children: [
                    {
                        type: 'rect',
                        shape: {
                            x: -250,
                            y: 0,
                            width: 500,
                            height: 35,
                            r: 15
                        },
                        style: {
                            fill: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                { offset: 0, color: 'rgba(201, 31, 55, 0.3)' },
                                { offset: 0.5, color: 'rgba(255, 215, 0, 0.2)' },
                                { offset: 1, color: 'rgba(201, 31, 55, 0.3)' }
                            ]),
                            stroke: 'rgba(255, 215, 0, 0.6)',
                            lineWidth: 2,
                            shadowBlur: 20,
                            shadowColor: 'rgba(255, 215, 0, 0.4)'
                        }
                    },
                    {
                        type: 'text',
                        style: {
                            text: '🏛️ 紫禁城立体布局示意图',
                            x: 0,
                            y: 2,
                            textAlign: 'center',
                            fill: '#FFD700',
                            fontSize: 16,
                            fontFamily: 'Ma Shan Zheng',
                            fontWeight: 'bold',
                            textShadowColor: 'rgba(0, 0, 0, 0.8)',
                            textShadowBlur: 5
                        }
                    }
                ]
            }
        ],
        xAxis3D: {
            type: 'value',
            min: 0,
            max: 100,
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis3D: {
            type: 'value',
            min: 0,
            max: 100,
            inverse: true,
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        zAxis3D: {
            type: 'value',
            min: 0,
            max: 70,
            axisLabel: {
                show: true,
                color: '#A0A0A0',
                fontSize: 10
            },
            axisTick: {
                show: true
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(201, 31, 55, 0.3)'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(201, 31, 55, 0.1)'
                }
            }
        },
        series: [
            // 3D 区域边界（使用3D柱状图）
            {
                type: 'bar3D',
                coordinateSystem: 'grid3D',
                data: [
                    // 外朝区域
                    ...generate3DArea(20, 50, 50, 85, 5, 'rgba(201, 31, 55, 0.15)'),
                    // 内廷区域
                    ...generate3DArea(20, 50, 8, 42, 8, 'rgba(255, 215, 0, 0.12)'),
                    // 御花园
                    ...generate3DArea(35, 65, 0, 6, 10, 'rgba(34, 139, 34, 0.15)')
                ],
                itemStyle: {
                    opacity: 0.6
                },
                emphasis: {
                    itemStyle: {
                        opacity: 0.8
                    }
                },
                animation: true,
                animationDuration: 2000,
                animationEasing: 'cubicOut'
            },
            // 3D 建筑群（使用3D柱状图模拟建筑）
            {
                name: '主要建筑',
                type: 'bar3D',
                coordinateSystem: 'grid3D',
                data: allBuildings.map(building => ({
                    value: [building.x, building.y, Math.min(building.height || 30, 60)],
                    name: building.name,
                    desc: building.desc,
                    type: building.type,
                    itemStyle: building.itemStyle
                })),
                barSize: 6,
                itemStyle: {
                    opacity: 0.85,
                    shadowBlur: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1,
                        shadowBlur: 15,
                        shadowColor: 'rgba(255, 215, 0, 0.6)'
                    }
                },
                label: {
                    show: true,
                    formatter: function (params) {
                        return params.data.name;
                    },
                    distance: 2,
                    textStyle: {
                        color: '#FFD700',
                        fontSize: 9,
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        padding: [2, 4],
                        borderRadius: 3
                    }
                },
                animation: true,
                animationDuration: 2000,
                animationEasing: 'elasticOut'
            },
            // 3D 中轴线连接（使用3D线图）
            {
                name: '中轴线',
                type: 'line3D',
                coordinateSystem: 'grid3D',
                data: ForbiddenCityData.mapData.centralAxis.map((item, index) => [
                    item.x,
                    item.y,
                    Math.min((item.height || 30) + 5, 65)  // 略高于建筑
                ]),
                lineStyle: {
                    color: '#00F0FF',
                    width: 3,
                    opacity: 0.8
                },
                effect: {
                    show: true,
                    period: 4,
                    trailLength: 0.1,
                    color: '#FFD700'
                },
                zlevel: 10
            },
            // 3D 脉冲效果
            {
                name: '脉冲效果',
                type: 'effectScatter3D',
                coordinateSystem: 'grid3D',
                data: ForbiddenCityData.mapData.centralAxis.map((item, index) => ({
                    value: [item.x, item.y, Math.min((item.height || 30) + 2, 62)],
                    symbolSize: 5,
                    itemStyle: {
                        color: '#FFD700'
                    }
                })),
                rippleEffect: {
                    brushType: 'stroke',
                    scale: 3,
                    period: 3
                },
                zlevel: 15
            }
        ]
    };

    try {
        myChart.setOption(option);
    } catch (err) {
        console.error('Failed to set 3D option:', err);
        fallbackTo2DMap();
        return;
    }

    // 添加错误处理
    myChart.on('error', function (params) {
        console.error('ECharts error:', params);
        // 如果3D渲染失败，切换到2D模式
        fallbackTo2DMap();
    });

    // 添加点击事件
    myChart.on('click', function (params) {
        if (params.data && params.data.name) {
            showBuildingDetail(params.data);
        }
    });

    // 添加鼠标滚轮缩放事件
    myChart.on('mousewheel', function (params) {
        // 可以添加自定义缩放逻辑
    });

    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 3D回退到2D模式的函数
function fallbackTo2DMap() {
    console.warn('3D rendering failed, falling back to 2D mode');

    const chartDom = document.getElementById('forbidden-city-map');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    // 准备简化的2D数据
    const allBuildings = [
        ...ForbiddenCityData.mapData.centralAxis.map(item => ({
            ...item,
            type: 'central',
            symbolSize: 30,
            itemStyle: { color: '#4169E1' }
        })),
        ...ForbiddenCityData.mapData.outerCourtLeft.map(item => ({
            ...item,
            type: 'outer',
            symbolSize: 20,
            itemStyle: { color: '#C91F37' }
        })),
        ...ForbiddenCityData.mapData.outerCourtRight.map(item => ({
            ...item,
            type: 'outer',
            symbolSize: 20,
            itemStyle: { color: '#C91F37' }
        })),
        ...ForbiddenCityData.mapData.innerCourtLeft.map(item => ({
            ...item,
            type: 'inner',
            symbolSize: 18,
            itemStyle: { color: '#FFD700' }
        })),
        ...ForbiddenCityData.mapData.innerCourtRight.map(item => ({
            ...item,
            type: 'inner',
            symbolSize: 18,
            itemStyle: { color: '#FFD700' }
        })),
        ...ForbiddenCityData.mapData.imperialGarden.map(item => ({
            ...item,
            type: 'garden',
            symbolSize: 22,
            itemStyle: { color: '#228B22' }
        }))
    ];

    const option2D = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                const data = params.data;
                if (data) {
                    return `<div style="padding: 10px; min-width: 150px;">
                        <div style="font-weight: bold; color: #FFD700; font-size: 14px; margin-bottom: 8px;">${data.name}</div>
                        <div style="font-size: 12px; color: #A0A0A0;">${data.desc || data.type}</div>
                        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(201, 31, 55, 0.3);">
                            <span style="display: inline-block; width: 8px; height: 8px; background: ${data.itemStyle.color}; border-radius: 50%; margin-right: 5px;"></span>
                            <span style="font-size: 11px; color: #E8E8E8;">${getTypeLabel(data.type)}</span>
                        </div>
                    </div>`;
                }
                return '';
            }
        },
        graphic: [
            {
                type: 'group',
                left: 'center',
                top: '5%',
                children: [
                    {
                        type: 'rect',
                        shape: {
                            x: -300,
                            y: 0,
                            width: 600,
                            height: 30
                        },
                        style: {
                            fill: 'rgba(201, 31, 55, 0.1)',
                            stroke: 'rgba(201, 31, 55, 0.3)',
                            lineWidth: 1
                        }
                    },
                    {
                        type: 'text',
                        style: {
                            text: '🏛️ 紫禁城平面布局示意图（2D模式）',
                            x: 0,
                            y: 5,
                            textAlign: 'center',
                            fill: '#FFD700',
                            fontSize: 14,
                            fontFamily: 'Ma Shan Zheng'
                        }
                    }
                ]
            }
        ],
        xAxis: {
            show: false,
            min: 0,
            max: 100
        },
        yAxis: {
            show: false,
            min: 0,
            max: 100,
            inverse: true
        },
        series: [
            // 中轴线连接线
            {
                type: 'lines',
                coordinateSystem: 'cartesian2d',
                polyline: true,
                data: [{
                    coords: ForbiddenCityData.mapData.centralAxis.map(item => [item.x, item.y])
                }],
                lineStyle: {
                    color: '#4169E1',
                    width: 3,
                    opacity: 0.6,
                    type: 'dashed'
                },
                zlevel: 1
            },
            // 区域边界框
            {
                type: 'custom',
                renderItem: function (params, api) {
                    const categories = [
                        { name: '外朝区', color: 'rgba(201, 31, 55, 0.15)', coords: [[15, 45], [85, 80]] },
                        { name: '内廷区', color: 'rgba(255, 215, 0, 0.1)', coords: [[15, 8], [85, 42]] },
                        { name: '御花园', color: 'rgba(34, 139, 34, 0.15)', coords: [[35, 0], [65, 6]] }
                    ];

                    const category = categories[params.seriesIndex];
                    if (!category) return;

                    const start = api.coord(category.coords[0]);
                    const end = api.coord(category.coords[1]);

                    return {
                        type: 'rect',
                        shape: {
                            x: start[0],
                            y: end[1],
                            width: end[0] - start[0],
                            height: start[1] - end[1]
                        },
                        style: {
                            fill: category.color,
                            stroke: category.color,
                            lineWidth: 1
                        },
                        styleEmphasis: {
                            fill: category.color,
                            stroke: '#FFD700',
                            lineWidth: 2
                        }
                    };
                },
                data: [0, 1, 2],
                zlevel: 0
            },
            // 建筑点
            {
                name: '建筑',
                type: 'scatter',
                symbol: 'circle',
                data: allBuildings,
                label: {
                    show: true,
                    formatter: function (params) {
                        return params.data.name;
                    },
                    position: 'right',
                    fontSize: 9,
                    color: '#E8E8E8',
                    distance: 8
                },
                labelEmphasis: {
                    show: true,
                    position: 'top',
                    fontSize: 11,
                    color: '#FFD700'
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                animationDuration: 2000,
                animationEasing: 'elasticOut'
            },
            // 脉冲动画效果
            {
                name: '脉冲',
                type: 'effectScatter',
                rippleEffect: {
                    brushType: 'stroke',
                    scale: 3,
                    period: 3
                },
                data: ForbiddenCityData.mapData.centralAxis.map(item => ({
                    ...item,
                    symbolSize: 8,
                    itemStyle: { color: '#00F0FF' }
                })),
                zlevel: 2
            }
        ]
    };

    myChart.setOption(option2D);

    // 添加点击事件
    myChart.on('click', function (params) {
        if (params.data && params.data.name) {
            showBuildingDetail(params.data);
        }
    });

    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// 生成3D区域数据的辅助函数
function generate3DArea(x1, x2, y1, y2, height, color) {
    const data = [];
    const step = 10; // 网格密度

    for (let x = x1; x <= x2; x += step) {
        for (let y = y1; y <= y2; y += step) {
            data.push({
                value: [x, y, height],
                itemStyle: {
                    color: color,
                    opacity: 0.6
                }
            });
        }
    }

    return data;
}

// 获取建筑类型标签
function getTypeLabel(type) {
    const typeMap = {
        'central': '中轴线建筑',
        'outer': '外朝建筑',
        'inner': '内廷建筑',
        'garden': '园林建筑',
        'gate': '城门'
    };
    return typeMap[type] || '其他建筑';
}

// 显示建筑详情（模拟交互功能）
function showBuildingDetail(building) {
    console.log('点击建筑:', building.name);
    // 可以在这里添加更多交互逻辑
}

// 导出初始化函数
window.initAllCharts = initAllCharts;
/* ===== 故宫平面布局图：3D→2D 图标版 =====
   直接替换 js/charts.js 里“热力图/散点”那段即可 */
(function () {
    const dom = document.getElementById('forbidden-city-map');
    if (!dom) { console.warn('#forbidden-city-map 未找到'); return; }
    const chart = echarts.init(dom);
    const hasGL = !!echarts.graphic3D;

    /* 1. 数据：坐标 + 等级 + 区域 */
    const data = [
        /* 外朝 */
        { name: '午门', x: 50, y: 85, lvl: 5, area: '外朝' },
        { name: '太和殿', x: 50, y: 70, lvl: 5, area: '外朝' },
        { name: '中和殿', x: 50, y: 62, lvl: 4, area: '外朝' },
        { name: '保和殿', x: 50, y: 54, lvl: 4, area: '外朝' },
        { name: '文华殿', x: 30, y: 65, lvl: 3, area: '外朝' },
        { name: '武英殿', x: 70, y: 65, lvl: 3, area: '外朝' },
        /* 内廷 */
        { name: '乾清宫', x: 50, y: 40, lvl: 4, area: '内廷' },
        { name: '交泰殿', x: 50, y: 32, lvl: 3, area: '内廷' },
        { name: '坤宁宫', x: 50, y: 24, lvl: 3, area: '内廷' },
        { name: '延禧宫', x: 30, y: 30, lvl: 2, area: '内廷' },
        { name: '储秀宫', x: 70, y: 30, lvl: 2, area: '内廷' },
        /* 御花园 */
        { name: '御花园', x: 50, y: 12, lvl: 2, area: '御花园' },
        { name: '神武门', x: 50, y: 5, lvl: 2, area: '御花园' }
    ];

    const areaColor = { 外朝: '#C91F37', 内廷: '#FFD700', 御花园: '#228B22' };

    /* 2. 3D 模式 */
    if (hasGL) {
        const opt = {
            backgroundColor: 'transparent',
            tooltip: { formatter: d => d.data[3] },
            grid3D: {
                boxWidth: 100, boxDepth: 100, boxHeight: 60,
                viewControl: { distance: 130, alpha: 30, beta: 40, autoRotate: true }
            },
            xAxis3D: { type: 'value', min: 0, max: 100 },
            yAxis3D: { type: 'value', min: 0, max: 100 },
            zAxis3D: { type: 'value', min: 0, max: 6 },
            series: [{
                type: 'bar3D',
                coordinateSystem: 'grid3D',
                data: data.map(d => [d.x, d.y, d.lvl, d.name]),
                itemStyle: { color: d => areaColor[data[d.dataIndex].area] }
            }]
        };
        chart.setOption(opt);
    } else {
        /* 3. 2D 图标模式：用 path 画宫殿剪影 */
        const opt = {
            backgroundColor: 'transparent',
            tooltip: { formatter: d => d.data.name },
            xAxis: { type: 'value', min: 0, max: 100, show: false },
            yAxis: { type: 'value', min: 0, max: 100, show: false },
            series: [{
                type: 'scatter',
                symbol: 'path://M0,-4 L4,4 L0,2 L-4,4 Z', // 宫殿屋顶剪影
                symbolSize: d => 20 + d.lvl * 8,            // 等级越大图标越大
                itemStyle: { color: d => areaColor[d.area] },
                label: {
                    show: true,
                    position: 'bottom',
                    distance: 0,
                    color: '#fff',
                    fontSize: 11,
                    formatter: '{@name}'
                },
                data: data
            }]
        };
        chart.setOption(opt);
    }

    window.addEventListener('resize', () => chart.resize());
})();
/* ===== 带中轴线 + 下移 + 分区背景 的 2D 平面图 ===== */
function initScreenshot2DMap() {
    const dom = document.getElementById('forbidden-city-map');
    if (!dom) return;
    const myChart = echarts.init(dom);

    /* 1. 建筑散点（整体下移 8%） */
    const data = [
        /* 外朝 - 红色 */
        { name: '午门', value: [50, 77], symbol: 'rect', itemStyle: { color: '#c91f37' } },
        { name: '左阙门', value: [42, 77], symbol: 'rect', itemStyle: { color: '#c91f37' } },
        { name: '右阙门', value: [58, 77], symbol: 'rect', itemStyle: { color: '#c91f37' } },
        { name: '太和门', value: [50, 62], symbol: 'rect', itemStyle: { color: '#c91f37' } },
        { name: '协和门', value: [40, 62], symbol: 'rect', itemStyle: { color: '#c91f37' } },
        { name: '熙和门', value: [60, 62], symbol: 'rect', itemStyle: { color: '#c91f37' } },
        { name: '太和殿', value: [50, 47], symbol: 'circle', itemStyle: { color: '#c91f37' } },
        { name: '体仁阁', value: [38, 47], symbol: 'rect', itemStyle: { color: '#c91f37' } },
        { name: '弘义阁', value: [62, 47], symbol: 'rect', itemStyle: { color: '#c91f37' } },
        { name: '中和殿', value: [50, 40], symbol: 'circle', itemStyle: { color: '#c91f37' } },
        { name: '保和殿', value: [50, 33], symbol: 'circle', itemStyle: { color: '#c91f37' } },

        /* 内廷 - 金色 */
        { name: '乾清门', value: [50, 26], symbol: 'rect', itemStyle: { color: '#ffd700' } },
        { name: '乾清宫', value: [50, 17], symbol: 'circle', itemStyle: { color: '#ffd700' } },
        { name: '交泰殿', value: [50, 10], symbol: 'circle', itemStyle: { color: '#ffd700' } },
        { name: '坤宁宫', value: [50, 3], symbol: 'circle', itemStyle: { color: '#ffd700' } },
        { name: '东六宫', value: [35, 12], symbol: 'rect', itemStyle: { color: '#ffd700' } },
        { name: '西六宫', value: [65, 12], symbol: 'rect', itemStyle: { color: '#ffd700' } },

        /* 御花园 - 绿色 */
        { name: '御花园', value: [50, -2], symbol: 'diamond', itemStyle: { color: '#228b22' } },
        { name: '钦安殿', value: [50, -5], symbol: 'circle', itemStyle: { color: '#228b22' } },

        /* 中轴线终点 - 蓝色 */
        { name: '神武门', value: [50, -8], symbol: 'rect', itemStyle: { color: '#4169e1' } }
    ];

    /* 2. 分区背景矩形（y 同样下移 8%） */
    const bgRects = [
        { name: '外朝区', coords: [[30, 70], [70, 85]], color: 'rgba(201, 31, 55, 0.08)' },
        { name: '内廷区', coords: [[30, 0], [70, 70]], color: 'rgba(255, 215, 0, 0.06)' },
        { name: '御花园', coords: [[35, -8], [65, 0]], color: 'rgba(34, 139, 34, 0.08)' }
    ];

    /* 3. 中轴线线段（x=50，贯穿南北） */
    const centralAxis = [];
    for (let y = 85; y >= -8; y -= 2) centralAxis.push([50, y]);

    const option = {
        backgroundColor: 'transparent',
        grid: { left: 0, top: 0, right: 0, bottom: 0 },
        xAxis: { type: 'value', min: 25, max: 75, show: false },
        yAxis: { type: 'value', min: -10, max: 90, inverse: true, show: false },
        series: [
            /* 背景矩形 */
            ...bgRects.map(r => ({
                type: 'custom',
                renderItem: (params, api) => {
                    const start = api.coord(r.coords[0]);
                    const end = api.coord(r.coords[1]);
                    return {
                        type: 'rect',
                        shape: { x: start[0], y: end[1], width: end[0] - start[0], height: start[1] - end[1] },
                        style: { fill: r.color }
                    };
                },
                data: [0],
                z: 0
            })),

            /* 中轴线 */
            {
                type: 'line',
                coordinateSystem: 'cartesian2d',
                data: centralAxis,
                lineStyle: { color: '#00f0ff', width: 2, type: 'dashed' },
                symbol: 'none',
                z: 1
            },

            /* 建筑散点 */
            {
                type: 'scatter',
                coordinateSystem: 'cartesian2d',
                symbolSize: 16,
                label: { show: true, position: 'top', color: '#eee', fontSize: 11 },
                data: data.map(p => ({
                    name: p.name,
                    value: p.value,
                    symbol: p.symbol,
                    symbolSize: p.symbol === 'rect' ? 20 : (p.symbol === 'diamond' ? 18 : 16),
                    itemStyle: p.itemStyle,
                    label: { formatter: p.name }
                })),
                z: 2
            }
        ],
        tooltip: { formatter: '{b}' }
    };

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
}

/* ==========  强制使用新版 2D  ========== */
initMapChart = initScreenshot2DMap;