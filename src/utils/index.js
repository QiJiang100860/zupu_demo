// 深度copy一个对象
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = source[keys].constructor === Array ? [] : {}
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

/**
* @description 判断手机是安卓还是ios
* @returns 1：安卓；2：ios
*/

export function androidOrIos() {
    const u = navigator.userAgent,
        app = navigator.appVersion;
    const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return 1
    }
    if (isIOS) {
        return 2
    }
}
