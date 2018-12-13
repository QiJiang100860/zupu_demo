
/**
 * @param appellation  @type string
 * @description（谁用的APP）与根节点的关系  
 * @var 值后台根据称谓计算器计算
 * 
 * 
 * @param nodeType @type number
 * @description 与数据项根节点的关系
 * @var  f:父,m:母,h:夫,w:妻,s:子,d:女
 * 
 * 
 * @param hierarchy @type string
 * @description  辈分标识
 * @var +9：鼻祖
 *      +8：元祖
 *      +7：太祖
 *      +6：烈祖
 *      +5：天祖
 *      +4：高祖
 *      +3：曾祖
 *      +2：祖父
 *      +1：父亲
 *      0：自己所处的辈分
 *      -1：儿子
 *      -2：孙子
 *      -3：曾孙
 *      -4：玄孙
 *      -5：来孙
 *      -6：晜孙
 *      -7：仍孙
 *      -8：云孙
 *      -9：耳孙
 * 
 * 
 * @param headerUrl @type string
 * @description 节点头像
 * 
 * 
 * 
 * @param type @type number
 * @description 是否为纪念堂
 * @var 1、活着；2、死了
 * 
 * 
 * 
 * @param linealKins @type array
 * @description 节点的直接亲属
 * 
 * 
 * @param status 
 * @description 是不是空节点
 * @var 0正常 1空节点 2已失效
 * 
 * 
 * 
 * 
 * 移动端需要
 * 
 * memorialHall:checkNodeInfro
 * memorialHall:sendMessage
 * memorialHall:commonFriend
 * 
 * 
 * window.location.href = "memorialHall://sendMessage?a=1&b=2";
 * 
 * 
 * */


module.exports = {
    data: [
        {
            id: '1515236156156#root',
            name: "张三",
            appellation: "我",
            status: 1,
            headerUrl: require("../../static/images/ziji.png"),
            hierarchy: '0',
            type: 1,
            linkNodes: [
                {
                    id: '2',
                    name: "张来德",
                    appellation: "父亲",
                    status: 1,
                    nodeType: 'f',
                    headerUrl: require("../../static/images/fuqin.png"),
                    hierarchy: '+1',
                    type: 1,
                },
                {
                    id: '3',
                    name: "李春兰",
                    appellation: "母亲",
                    status: 1,
                    nodeType: 'm',
                    headerUrl: require("../../static/images/muqin.png"),
                    hierarchy: '+1',
                    type: 2,
                },
                {
                    id: '4',
                    name: "张毅然",
                    appellation: "儿子",
                    status: 1,
                    nodeType: 's',
                    headerUrl: require("../../static/images/erzi.png"),
                    hierarchy: '-1',
                    type: 1,
                },
                {
                    id: '5',
                    name: "张语嫣",
                    appellation: "女儿",
                    status: 1,
                    nodeType: 'd',
                    headerUrl: require("../../static/images/nver.png"),
                    hierarchy: '-1',
                    type: 1,
                },

                {
                    id: '6',
                    name: "妻子",
                    appellation: "妻子",
                    status: 1,
                    nodeType: 'w',
                    headerUrl: require("../../static/images/nver.png"),
                    hierarchy: '0',
                    type: 1,
                }
            ]
        },

        {
            id: '6',
            name: "妻子",
            appellation: "妻子",
            status: 1,
            headerUrl: require("../../static/images/nver.png"),
            hierarchy: '0',
            type: 1,
            linkNodes:[
                {
                    id:'61',
                    name:'妻子的爸爸',
                    appellation:'岳父',
                    status: 1,
                    nodeType: 'f',
                    headerUrl: require("../../static/images/fuqin.png"),
                    hierarchy: '+1',
                    type: 2,
                },
                {
                    id:'62',
                    name:'妻子的妈妈',
                    appellation:'岳母',
                    status: 1,
                    nodeType: 'm',
                    headerUrl: require("../../static/images/muqin.png"),
                    hierarchy: '+1',
                    type: 1,
                },
                {
                    id: '1515236156156#root',
                    name: "张三",
                    appellation: "我",
                    status: 1,
                    nodeType: 'h',
                    headerUrl: require("../../static/images/ziji.png"),
                    hierarchy: '0',
                    type: 1,
                },

                {
                    id: '63',
                    name: "张小鱼",
                    appellation: "儿子",
                    status: 1,
                    nodeType: 's',
                    headerUrl: require("../../static/images/erzi.png"),
                    hierarchy: '-1',
                    type: 1,
                }
            ]
        },


        {
            id: '5',
            name: "张语嫣",
            appellation: "女儿",
            status: 1,
            headerUrl: require("../../static/images/nver.png"),
            hierarchy: '-1',
            type: 1,
            linkNodes:[
                {
                    id: '51',
                    name: "欧阳娜娜",
                    appellation: "孙女",
                    status: 1,
                    headerUrl: require("../../static/images/nver.png"),
                    nodeType: 'd',
                    hierarchy: '-2',
                    type: 1,
                },
                {
                    id: '52',
                    name: "欧阳大叔",
                    appellation: "女婿",
                    status: 1,
                    headerUrl: require("../../static/images/erzi.png"),
                    nodeType: 'h',
                    hierarchy: '-1',
                    type: 1,
                }
            ]
        },

    ]
}