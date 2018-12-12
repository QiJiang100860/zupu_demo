import * as config from './config.js';

export function calcRelation(data) {


    const nodes = [], links = [];
    const w = document.documentElement.clientWidth || document.body.clientWidth;
    const h = document.documentElement.clientHeight || document.body.clientHeight;

    return {
        nodes: [
            {
                name: "张三丰",
                appellation: "自己",
                headerUrl: require("../../static/images/ziji.png"),
                seniorityColor: getColor('0'),
                isDeath: 0,
                id: 1,
                x: w / 2,
                h: h / 2
            },
            {
                name: "张来德",
                appellation: "父亲",
                headerUrl: require("../../static/images/fuqin.png"),
                seniorityColor: getColor('+1'),
                isDeath: 0,
                id: 2,
                
            },
            {
                name: "李秀珍",
                appellation: "母亲",
                headerUrl: require("../../static/images/muqin.png"),
                seniorityColor: getColor('+1'),
                isDeath: 1,
                id: 3
            },
            {
                name: "李秀春",
                appellation: "姨妈",
                headerUrl: require("../../static/images/muqin.png"),
                seniorityColor: getColor('+1'),
                isDeath: 0,
                id: 4
            },
            {
                name: "张毅然",
                appellation: "儿子",
                headerUrl: require("../../static/images/erzi.png"),
                seniorityColor: getColor('-1'),
                isDeath: 0,
                id: 5
            },
            {
                name: "张狗剩",
                appellation: "爷爷",
                headerUrl: require("../../static/images/yeye.png"),
                seniorityColor: getColor('+2'),
                isDeath: 0,
                id: 6
            },
            {
                name: "王春锡",
                appellation: "表弟",
                headerUrl: require("../../static/images/erzi.png"),
                seniorityColor: getColor('0'),
                isDeath: 0,
                id: 7
            }
        ],
        links: [
            {
                source: 0,
                target: 1
            },
            {
                source: 0,
                target: 2
            },
            {
                source: 0,
                target: 4
            },
            {
                source: 2,
                target: 3
            },
            {
                source: 1,
                target: 5
            },
            {
                source: 3,
                target: 6
            }
        ]
    }

}



function getColor(key){
    return config.color[key]
}