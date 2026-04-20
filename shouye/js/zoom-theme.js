/* =================  主题对象  ================= */
const blueTheme = {
    color: ['#00f6ff', '#ff4d94', '#00ff9d', '#f9c80e'],
    backgroundColor: 'transparent',
    textStyle: { color: '#fff' },
    title: { textStyle: { color: '#00f6ff' } },
    legend: { textStyle: { color: '#fff' } },
    tooltip: { backgroundColor: 'rgba(11,15,24,.9)', borderColor: '#00f6ff' }
};
const cyberTheme = {
    color: ['#ff00c8', '#00f6ff', '#ff8c00', '#f9c80e'],
    backgroundColor: 'transparent',
    textStyle: { color: '#ffe6f7' },
    title: { textStyle: { color: '#ff00c8' } },
    legend: { textStyle: { color: '#ffe6f7' } },
    tooltip: { backgroundColor: 'rgba(16,8,24,.9)', borderColor: '#ff00c8' }
};

/* =================  当前主题  ================= */
let curTheme = localStorage.getItem('theme') || 'default';
function applyTheme() {
    document.documentElement.setAttribute('data-theme', curTheme === 'cyber' ? 'cyber' : '');
    return curTheme === 'cyber' ? cyberTheme : blueTheme;
}

/* =================  统一初始化：缩放+主题  ================= */
function initZoomChart(domId, optionFn) {
    const dom = document.getElementById(domId);
    if (!dom) { console.warn(`节点 #${domId} 不存在`); return null; }
    const myChart = echarts.init(dom);
    const option = optionFn(applyTheme());
    option.textStyle = { fontSize: 10 };
    /* 强制加上 dataZoom（内外双控） */
    option.dataZoom = [
        { type: 'inside', xAxisIndex: 0, start: 0, end: 100 },
        { type: 'inside', yAxisIndex: 0, start: 0, end: 100 }
    ];
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
    return myChart;
}

/* =================  6 张图配置工厂（直接搬你 charts.js 里的）  ================= */
/* ① 各省登记量 */
const provinceOpt = t => ({
    ...t, grid: { left: 70, right: 20, top: 40, bottom: 40, containLabel: true },
    tooltip: { trigger: 'axis', formatter: ({ name, value }) => `${name}: ${value} 处` },
    xAxis: { type: 'value', axisLine: { lineStyle: { color: 'rgba(255,255,255,.2)' } } },
    yAxis: { type: 'category', data: ['山西', '河南', '河北', '陕西', '山东', '江苏', '浙江', '福建', '广东', '四川'] },
    series: [{
        type: 'bar', data: [1286, 958, 876, 723, 654, 589, 521, 478, 423, 389],
        itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: t.color[0] }, { offset: 1, color: '#45b7d1' }]) },
        label: { show: true, position: 'right' }
    }]
});
/* ② 古建筑功能分布 */
const rankOpt = t => ({
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
        roseType: 'radius',
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
            { name: '宗教建筑', value: 2856, itemStyle: { color: t.color[1] } },
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
/* ③ 类型占比 */
const typeOpt = t => ({
    ...t,
    tooltip: { trigger: 'item', formatter: '{b}: {c} 处 ({d}%)' },
    series: [{
        type: 'pie',
        radius: ['36%', '58%'],          // ① 再缩小 2%，给外部留空
        center: ['40%', '50%'],          // ② 整体左移，右侧完全给标签
        label: {
            show: true,
            position: 'outside',          // ③ 全部外引
            formatter: '{b}\n{d}%',
            fontSize: 10,                 // ④ 11px 仍可读
            lineHeight: 16,
            distanceToLabelLine: 8
        },
        labelLine: { length: 12, length2: 24 }, // ⑤ 引线更长
        data: [
            { name: '寺庙', value: 2356 },
            { name: '民居', value: 1892 },
            { name: '宫殿', value: 823 },
            { name: '园林', value: 632 },
            { name: '塔', value: 402 },
            { name: '城墙', value: 198 },
            { name: '其他', value: 355 }
        ],
        color: ['#00f6ff', '#ff4d94', '#f9d976', '#45b7d1', '#00cdac', '#8378ff', '#ff8c66'],
        selectedMode: 'single',         // ⑥ 单选高亮，减少视觉噪点
        selectedOffset: 8
    }]
});
/* ④ 年代分布 */
const ageOpt = t => ({
    ...t, grid: { left: 50, right: 20, top: 40, bottom: 40 },
    tooltip: { trigger: 'axis', formatter: ({ name, value }) => `${name}: ${value} 处` },
    xAxis: { type: 'category', data: ['唐代', '宋代', '元代', '明代', '清代', '民国'] },
    yAxis: { type: 'value', max: 3000 },
    series: [{
        type: 'bar', data: [87, 235, 312, 1286, 2567, 432],
        itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: t.color[2] }, { offset: 1, color: '#00cdac' }]) }
    }]
});
/* ⑤ 修缮漏斗 */
const repairOpt = t => ({
    ...t,
    tooltip: { trigger: 'item', formatter: '{b}: {c} 处' },
    series: [{
        type: 'funnel',
        left: '8%',
        width: '65%',
        min: 0,
        max: 100,
        sort: 'descending',
        gap: 4,
        label: {
            show: true,
            position: 'left',             // ① 标签放左侧
            formatter: '{b}  {c}',
            fontSize: 11,
            color: t.textStyle.color
        },
        labelLine: { length: 20 },         // ② 引线 20px
        data: [
            { value: 100, name: '完好' },
            { value: 75, name: '轻微破损' },
            { value: 45, name: '中度破损' },
            { value: 25, name: '重度破损' },
            { value: 10, name: '急需修缮' }
        ],
        color: t.color
    }]
});
/* ⑥ 新增趋势 */
const trendOpt = t => ({
    ...t,
    grid: { left: 60, right: 40, top: 40, bottom: 48 }, // ① 底部留 48px 给 slider
    dataZoom: [
        { type: 'inside', xAxisIndex: 0, start: 0, end: 100 },
        { type: 'slider', xAxisIndex: 0, height: 8, left: 60, right: 40, borderColor: 'transparent', fillerColor: 'rgba(0,246,255,.2)', handleStyle: { color: t.color[0] } }
    ],
    tooltip: { trigger: 'axis', formatter: arr => `${arr[0].axisValue} 年新增: ${arr[0].value} 处` },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        axisLabel: {
            interval: 1,              // ② 隔年显示，立即不挤
            fontSize: 11
        }
    },
    yAxis: { type: 'value', name: '新增登录数', nameTextStyle: { fontSize: 11 } },
    series: [{
        type: 'line',
        data: [156, 189, 234, 287, 321, 365, 412, 478, 532, 589],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2.5, color: t.color[0] },
        areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: t.color[0] + '60' },
                { offset: 1, color: t.color[0] + '00' }
            ])
        }
    }]
});

/* =================  批量初始化  ================= */
const chartPool = [
    initZoomChart('arch-province-chart', provinceOpt),
    initZoomChart('arch-rank-chart', rankOpt),
    initZoomChart('arch-type-chart', typeOpt),
    initZoomChart('arch-age-chart', ageOpt),
    initZoomChart('arch-repair-chart', repairOpt),
    initZoomChart('arch-trend-chart', trendOpt)
].filter(Boolean);

// 主题切换逻辑已移至HTML文件中的toggleTheme函数