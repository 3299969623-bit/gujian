window.DS = {
    // 主题色对应 ECharts
    color: ['#00f6ff', '#ff4d94', '#f9d976', '#45b7d1', '#00cdac'],
    // 模拟异步数据
    mapData: [{ name: '北京', value: 372 }, { name: '山西', value: 289 }, { name: '江苏', value: 205 }],
    rankData: [
        { name: '故宫', value: 98 }, { name: '颐和园', value: 96 }, { name: '天坛', value: 94 },
        { name: '承德避暑山庄', value: 92 }, { name: '平遥古城', value: 90 }
    ],
    typeData: [
        { name: '宫殿', value: 823 }, { name: '寺庙', value: 1456 }, { name: '园林', value: 632 },
        { name: '塔', value: 402 }, { name: '城墙', value: 198 }
    ],
    timeData: (function () {
        let base = 2014, arr = [];
        for (let i = 0; i < 10; i++) arr.push([base + i, Math.round(200 + Math.random() * 150)]);
        return arr;
    })()
};