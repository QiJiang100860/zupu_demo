/**
 * 配置同辈同色的颜色
 * */

module.exports = {
    // 每一个辈分对应的颜色
    color: {
        '+9': '#00ff00',//鼻祖
        '+8': '#00ff00',//元祖
        '+7': '#00ff00',//太祖      
        '+6': '#00ff00',//烈祖
        '+5': '#00ff00',//天祖
        '+4': '#00ff00',//高祖
        '+3': '#00ff00',//曾祖
        '+2': '#d03535',//祖父
        '+1': '#4077db',//父亲
        '0': '#28aedc',//自己所处的辈分
        '-1': '#43b853',//儿子
        '-2': '#00ff00',//孙子
        '-3': '#00ff00',//曾孙
        '-4': '#00ff00',//玄孙
        '-5': '#00ff00',//来孙
        '-6': '#00ff00',//晜孙
        '-7': '#00ff00',//仍孙
        '-8': '#00ff00',//云孙
        '-9': '#00ff00'//耳孙
    },
    // 计算规则
    //f:父,m:母,h:夫,w:妻,s:子,d:女
    // 规定计算规则,
    calRule: {
        f: {
            x: '-',
            y: '+',
            cy: '-',
            rotate: [210, 270]
        },
        m: {
            x: '+',
            y: '+',
            cy: '-',
            rotate: [270, 330]
        },
        h: {
            x: '-',
            y: 0,
            cy: 0,
            rotate: [150, 210]
        },
        w: {
            x: '+',
            y: 0,
            cy: 0,
            rotate: [-30, 30]
        },
        s: {
            x: "-",
            y: '-',
            cy: '+',
            rotate: [90, 150]
        },
        d: {
            x: "+",
            y: '-',
            cy: '+',
            rotate: [30, 90]
        }

    },
    // 节点连接线的长度
    lineLong: 100,
}
