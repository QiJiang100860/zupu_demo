import "./drap.less"


// 记录节点信息
let nodesEle,
  startX,
  startY,

  drapEleSize=66

export default {
  bind(el, binding) {
    // 页面传过来的回调函数
    const cbFun = binding.value.cb
    // 页面传过来的拖拽id
    const data = binding.value.itemData

    el.addEventListener('touchstart', e => {
      createDrapEle(e, data)
    }, false)


    el.addEventListener('touchmove', e => {
      updateDrapEle(e)
    }, false)

    el.addEventListener('touchend', e => {
      endDrapEle(e, point => {
        let param = {
          point:point,
          data:data
        }
        cbFun(param)
      })
    }, false)

  },

  unbind(el) {
    // console.log('指令解绑了')
  }
}
// 创建一个可以移动的节点
function createDrapEle(e, data) {
  const ele = e.targetTouches[0].target;
  const eleInfro = ele.getBoundingClientRect();
  nodesEle = new Image();
  nodesEle.src = data.headerUrl;
  nodesEle.setAttribute('class', 'header-shadow')
  nodesEle.style.position = 'fixed';
  nodesEle.style.display = 'block';
  nodesEle.style.width = drapEleSize + 'px';
  nodesEle.style.height = drapEleSize + 'px';
  nodesEle.style.borderRadius = '50%';

  // 记录下开始的位置
  startX = eleInfro.left
  startY = eleInfro.top


  nodesEle.style.left = eleInfro.left-drapEleSize/4 + 'px';
  nodesEle.style.top = eleInfro.top-drapEleSize/4 + 'px';
  document.body.appendChild(nodesEle);
}

// 更新下移动节点的位置
function updateDrapEle(e) {
  const ele = e.targetTouches[0].target;
  const _MLeft = e.targetTouches[0].pageX
  const _MTop = e.targetTouches[0].pageY
  const W_width = document.body.clientWidth;
  const W_heiht = document.body.clientHeight;

  const eleLeft = _MLeft - drapEleSize / 2;
  const eleTop = _MTop - drapEleSize / 2

  // 边界处理（记录下结束的位置）
  const _M_ELE_left = startX = eleLeft < 0 ? 0 : (eleLeft > (W_width - drapEleSize) ? (W_width - drapEleSize) : eleLeft)
  const _M_ELE_top = startY = eleTop < 0 ? 0 : (eleTop > (W_heiht - drapEleSize) ? (W_heiht - drapEleSize) : eleTop)


  nodesEle.style.left = _M_ELE_left + 'px';
  nodesEle.style.top = _M_ELE_top + 'px';
}


// 拖拽结束
function endDrapEle(e, cb) {
  // 圆心的位置
  let point = {x:startX+drapEleSize/2,y:startY+drapEleSize/2}
  document.body.removeChild(nodesEle);
  cb ? cb(point) : ''
}


