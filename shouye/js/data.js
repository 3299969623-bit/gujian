/**
 * 故宫结构数据
 * Forbidden City Structure Data
 */

const ForbiddenCityData = {
    // 基础统计数据
    basicStats: {
        area: 720000,           // 占地面积（平方米）
        buildingArea: 150000,   // 建筑面积（平方米）
        rooms: 8707,            // 房屋数量
        year: 1420,             // 始建年份
        treasures: 1860000,     // 馆藏文物数量
        length: 961,            // 南北长度（米）
        width: 753,             // 东西宽度（米）
        walls: 3,               // 城墙层数
        moatWidth: 52           // 护城河宽度（米）
    },

    // 宫殿建筑等级分布
    hierarchyData: {
        names: ['太和殿', '中和殿', '保和殿', '乾清宫', '交泰殿', '坤宁宫', '东西六宫', '其他建筑'],
        heights: [37.44, 27.0, 27.0, 29.0, 26.0, 26.0, 16.0, 12.0],
        counts: [3, 1, 1, 1, 1, 1, 12, 8700]
    },

    // 功能区域占比
    functionAreas: [
        { name: '外朝区', value: 35, color: '#C91F37' },
        { name: '内廷区', value: 40, color: '#FFD700' },
        { name: '御花园', value: 10, color: '#228B22' },
        { name: '服务设施', value: 10, color: '#4169E1' },
        { name: '其他区域', value: 5, color: '#8B8B8B' }
    ],

    // 建筑材料分布（雷达图）
    cultureRadar: {
        indicators: ['木材', '石材', '砖瓦', '彩绘', '金属', '琉璃'],
        values: [45, 25, 15, 8, 4, 3]
    },

    // 年度游客趋势
    visitorTrend: {
        years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        visitors: [1700, 1930, 600, 1200, 1500, 1850, 2100, 2200]
    },

    // 故宫地图数据
    mapData: {
        // 中轴线建筑（按重要性和高度递减）
        centralAxis: [
            { name: '午门', x: 50, y: 85, desc: '紫禁城正门', height: 37.4, year: '1420' },
            { name: '太和门', x: 50, y: 70, desc: '外朝正门', height: 24.7, year: '1420' },
            { name: '太和殿', x: 50, y: 55, desc: '金銮宝殿', height: 37.4, year: '1420' },
            { name: '中和殿', x: 50, y: 48, desc: '三大殿之中间殿', height: 27.0, year: '1420' },
            { name: '保和殿', x: 50, y: 41, desc: '三大殿之最后一殿', height: 27.0, year: '1420' },
            { name: '乾清门', x: 50, y: 34, desc: '内廷正门', height: 20.0, year: '1420' },
            { name: '乾清宫', x: 50, y: 25, desc: '皇帝处理政务处', height: 29.0, year: '1420' },
            { name: '交泰殿', x: 50, y: 18, desc: '皇后受贺之所', height: 26.0, year: '1420' },
            { name: '坤宁宫', x: 50, y: 11, desc: '皇后正宫', height: 26.0, year: '1420' },
            { name: '神武门', x: 50, y: 5, desc: '紫禁城北门', height: 31.0, year: '1420' }
        ],
        // 外朝区域（左翼）
        outerCourtLeft: [
            { name: '体仁阁', x: 25, y: 65, type: 'storage' },
            { name: '弘义阁', x: 25, y: 57, type: 'storage' },
            { name: '太和门', x: 50, y: 70, type: 'gate' }
        ],
        // 外朝区域（右翼）
        outerCourtRight: [
            { name: '仁寿殿', x: 75, y: 65, type: 'storage' },
            { name: '太和宫', x: 75, y: 57, type: 'storage' }
        ],
        // 内廷区域（左翼）
        innerCourtLeft: [
            { name: '承乾宫', x: 25, y: 28, type: 'residential' },
            { name: '景仁宫', x: 25, y: 22, type: 'residential' },
            { name: '钟粹宫', x: 25, y: 16, type: 'residential' }
        ],
        // 内廷区域（右翼）
        innerCourtRight: [
            { name: '永寿宫', x: 75, y: 28, type: 'residential' },
            { name: '翊坤宫', x: 75, y: 22, type: 'residential' },
            { name: '储秀宫', x: 75, y: 16, type: 'residential' }
        ],
        // 御花园
        imperialGarden: [
            { name: '钦安殿', x: 50, y: 3, type: 'garden' },
            { name: '堆秀山', x: 40, y: 2, type: 'garden' },
            { name: '延晖阁', x: 60, y: 2, type: 'garden' }
        ]
    },

    // 建筑奇观详情
    architecturalWonders: [
        {
            rank: 1,
            name: '太和殿',
            fullName: '皇极殿（太和殿）',
            description: '金銮殿，明清两代举行大典之地',
            details: '太和殿是中国现存最大的木结构大殿，面阔11间，进深5间，建筑面积2377平方米，高26.92米，是故宫的核心建筑。',
            year: '1420',
            dynasty: '明永乐'
        },
        {
            rank: 2,
            name: '乾清宫',
            fullName: '乾清宫',
            description: '皇帝处理日常政务之处',
            details: '乾清宫是内廷正殿，面阔9间，进深5间，是皇帝召见大臣、处理日常政务的场所。',
            year: '1420',
            dynasty: '明永乐'
        },
        {
            rank: 3,
            name: '坤宁宫',
            fullName: '坤宁宫',
            description: '皇后居住的正宫',
            details: '坤宁宫是内廷后三宫之一，面阔9间，进深5间，是皇后的居住和处理事务的场所。',
            year: '1420',
            dynasty: '明永乐'
        },
        {
            rank: 4,
            name: '御花园',
            fullName: '御花园',
            description: '皇室休憩游玩之所',
            details: '御花园位于紫禁城北端，占地面积约11700平方米，是明清两代皇室成员休憩游玩的地方。',
            year: '1420',
            dynasty: '明永乐'
        },
        {
            rank: 5,
            name: '九龙壁',
            fullName: '宁寿宫九龙壁',
            description: '中国三大名壁之一',
            details: '九龙壁位于宁寿宫前，高3.5米，长29.86米，是中国现存最大、最精美的琉璃九龙壁。',
            year: '1771',
            dynasty: '清乾隆'
        }
    ],

    // 历史事件时间线
    timeline: [
        { year: 1406, event: '明成祖下令营建北京宫殿' },
        { year: 1420, event: '紫禁城建成' },
        { year: 1644, event: '李自成攻入北京' },
        { year: 1644, event: '清军入关' },
        { year: 1912, event: '溥仪退位' },
        { year: 1925, event: '故宫博物院成立' },
        { year: 1961, event: '列入全国重点文物保护单位' },
        { year: 1987, event: '列入世界遗产名录' },
        { year: 2004, event: '扩建新馆' },
        { year: 2020, event: '数字故宫建设' }
    ]
};

// 导出数据（用于模块化环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ForbiddenCityData;
}
