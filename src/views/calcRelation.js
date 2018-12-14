import * as config from './config.js';

export function calcRelation(data) {

    // 已经渲染的节点并且记录节点位置
    let recordPosition = {

    }


    // 组装节点信息
    let _saveNodes_ = [];

    // 组装关系信息
    let _saveLinks_ = [];


    // 判断该节点是不是中心节点
    const isCenterNode = (data, id) => {
        for (let idx in data) {
            if (data[idx].id == id) {
                return 1
            }
        }
        return 0
    }


    for (let idx in data) {
        let itemData = data[idx]
        if (itemData.id.indexOf('#root') > 0) {
            const w = document.documentElement.clientWidth || document.body.clientWidth;
            const h = document.documentElement.clientHeight || document.body.clientHeight;
            let centerItem = {
                id: itemData.id,
                name: itemData.name,
                appellation: itemData.appellation,
                headerUrl: itemData.headerUrl,
                seniorityColor: getColor(itemData.hierarchy),
                isDeath: itemData.type,
                status: itemData.status,
                x: w / 2,
                y: h / 2
            }

            recordPosition[centerItem.id] = { x: centerItem.x, y: centerItem.y }

            let itemLinkData = itemData.linkNodes
            let _itemLinkData = itemLinkData.map(item => {

                let itemPotion = _offset_({
                    centerPoint: { x: centerItem.x, y: centerItem.y },
                    dis: isCenterNode(data, item.id) ? 220 : 100,
                    type: item.nodeType
                })



                // 存储下 位置信息
                recordPosition[item.id] = {
                    x: itemPotion.x,
                    y: itemPotion.y
                }

                let _linkItem = {
                    id: item.id,
                    name: item.name,
                    appellation: item.appellation,
                    headerUrl: item.headerUrl,
                    seniorityColor: getColor(item.hierarchy),
                    isDeath: item.type,
                    status: item.status,
                    x: itemPotion.x,
                    y: itemPotion.y
                }
                return _linkItem
            })

            _itemLinkData.unshift(centerItem)
            _saveNodes_ = _saveNodes_.concat(_itemLinkData)
        } else {
            //根据节点id去 该组中心节点的位置
            let nodeId = itemData.id
            let itemLinkData = itemData.linkNodes
            let _itemLinkData = itemLinkData.map(item => {
                
                if (!recordPosition.hasOwnProperty(item.id)) {
                    let itemPotion = _offset_({
                        centerPoint: { x: recordPosition[nodeId].x, y: recordPosition[nodeId].y },
                        dis: isCenterNode(data, item.id) ? 220 : 100,
                        type: item.nodeType
                    })
                    // 存储下 位置信息
                    recordPosition[item.id] = {
                        x: itemPotion.x,
                        y: itemPotion.y
                    }

                    let _linkItem = {
                        id: item.id,
                        name: item.name,
                        appellation: item.appellation,
                        headerUrl: item.headerUrl,
                        seniorityColor: getColor(item.hierarchy),
                        isDeath: item.type,
                        status: item.status,
                        x: itemPotion.x,
                        y: itemPotion.y
                    }
                    return _linkItem
                } else {
                    return null
                }

            })

            let arr = []
            for (let idx in _itemLinkData) {
                if (_itemLinkData[idx]) {
                    arr.push(_itemLinkData[idx])
                }
            }
            _saveNodes_ = _saveNodes_.concat(arr)

        }
    }




    for (let idx in data) {
        let itemDataId = data[idx].id;
        let i = getIndex(_saveNodes_, itemDataId)
        let arr = []


        let linkData = data[idx].linkNodes;
        for (let lIdx in linkData) {
            let obj = {
                target: Number(i),
                source: new Number()
            }
            let id = linkData[lIdx].id
            let _i = getIndex(_saveNodes_, id)
            obj.source = Number(_i)
            arr.push(obj)
        }
        _saveLinks_ = _saveLinks_.concat(arr)
    }



    return {

        nodes: _saveNodes_,
        links: _saveLinks_.length ? _saveLinks_ : [
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
                target: 3
            },
            {
                source: 0,
                target: 4
            },
            {
                source: 0,
                target: 5
            }
        ]
    }

}

function getColor(key) {
    return config.color[key]
}

// 计算太阳图了连接节点的偏移量
function _offset_(option) {
    /** 
     * option = {
     *      centerPoint:{x:1,y:1}, 中心点
     *      dis:10,                距离中心点的距离
     *      **type:'f'             当前连接点的类型
     * }
     * */
    const w = document.documentElement.clientWidth || document.body.clientWidth;
    const h = document.documentElement.clientHeight || document.body.clientHeight;
    let x = option.hasOwnProperty('centerPoint') ? option.centerPoint.x : w / 2;
    let y = option.hasOwnProperty('centerPoint') ? option.centerPoint.y : h / 2;
    let dis = option.dis || 100;
    let calRule = config.calRule;
    let rotate = getRandomRotate(calRule[option.type].rotate)
    return {
        x: x += dis * Math.cos(2 * Math.PI / 360 * rotate),
        y: y += dis * Math.sin(2 * Math.PI / 360 * rotate),
    }
}


// 获取随机角度

function getRandomRotate(data) {
    const m = data[0]
    const n = data[1]
    const random = Math.random() * (m - n + 1) + n
    return random
}


// 从数组中获取某一项的索引
function getIndex(arr, id) {
    for (let i in arr) {
        if (arr[i].id == id) {
            return i
        }
    }
}


