<template>
  <div class="tree-wrapper" id="treeWrapper">
    <div id="echarts"></div>
  </div>
</template>

<script>
import * as Util from "../../utils";
import { debug } from "util";
import { Toast } from "vant";
export default {
  props: ["treeData"],
  components: {},
  data() {
    return {
      chartsObj: null,
      nodeSize: 66,

      drapNodeData: null
    };
  },

  mounted() {
    this.draw(this.treeData, () => {});
  },

  methods: {
    draw(data, cb) {
      // 根据接口数据组装 echarts的数据
      const resizeParam = d => {
        let data = d.nodes;
        let arr = [];
        let i = 0;
        const loopData = i => {
          if (i < data.length) {
            const itemData = data[i];
            this.canvasDrawIcon(itemData, (url, dataUrl) => {
              let item = {
                _ID: itemData.id,
                _IsDeath: itemData.isDeath,
                _Image: dataUrl,
                headerUrl: url,
                x: itemData.x,
                y: itemData.y,
                name: itemData.name,
                symbol: "circle",
                // symbol: "image://" + dataUrl,
                fixed: true,
                label: {
                  show: true,
                  position: "bottom",
                  distance: 5,
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#333",
                  align: "center",
                  formatter: () => {
                    return [
                      `{a|${itemData.appellation}}`,
                      `{b|${itemData.name}}`
                    ].join("\n");
                  },
                  rich: {
                    a: {
                      color: "#333",
                      fontWeight: "bold",
                      fontSize: 14
                      // width:"100%",
                    },
                    b: {
                      color: "#666",
                      fontSize: 12,
                      padding: [0, 0, 0, 0]
                      // width:"100%",
                    }

                    // c:{
                    //   color:itemData.seniorityColor,
                    //   width:30,
                    //   height:30,
                    //   borderType: "solid",
                    //   borderColor:itemData.seniorityColor,
                    //   borderWidth: 4,
                    //   borderRadius:15,
                    // }
                  }
                }
              };
              arr.push(item);
              i++;
              loopData(i);
            });
          } else {
            // const nodeData = data.nodes;
            const nodeData = arr.map((item, idx) => {
              item.x = item.x || Math.random() * 500;
              item.y = item.y || Math.random() * 500;
              return item;
            });
            const linkData = d.links;
            this.initEcharts(() => {
              this.renderEcharts({
                // animationDurationUpdate: 1500,
                // animationEasingUpdate: "quinticInOut",
                lineStyle: {
                  type: "dashed",
                  color: "#bbb"
                },
                itemStyle: {
                  // borderType: "solid",
                  color: "#fff"
                  // borderWidth: 2,
                  // borderColor:"#dedede"
                },
                series: [
                  {
                    type: "graph",
                    layout: "none",
                    symbolSize: 66,
                    draggable: false,
                    roam: true,
                    // draggable: true,
                    force: {
                      // repulsion: 1000
                    },
                    data: nodeData,
                    // links: [],
                    links: linkData,
                    lineStyle: {
                      normal: {
                        opacity: 0.9,
                        width: 1,
                        curveness: 0
                      }
                    }
                  }
                ]
              });
            });

            cb ? cb() : "";
            return;
          }
        };

        loopData(i);
      };

      resizeParam(data);
    },

    initEcharts(cb) {
      const wrapper = document.getElementById("treeWrapper");
      const infro = wrapper.getBoundingClientRect();
      const dom = document.getElementById("echarts");
      dom.style.width = infro.width + "px";
      dom.style.height = infro.height + "px";
      this.chartsObj = this.$echarts.init(dom);
      cb ? cb() : "";
    },

    renderEcharts(data) {
      const that = this;
      that.chartsObj.setOption(data);
      that.drapNodeData = data.series[0].data;
      that.chartsObj.off("click");
      that.chartsObj.setOption({
        graphic: that.$echarts.util.map(
          that.drapNodeData,
          (dataItem, dataIndex) => {
            return {
              // type: "circle",
              // shape: {
              //   r: 33
              // },
              // style: {
              //   fill: "#fff",
              //   stroke: "#dedede"
              // },
              type: "image",
              style: {
                image: dataItem._Image,
                width: that.nodeSize,
                height: that.nodeSize,
                // x: -that.nodeSize / 2,
                // y: -that.nodeSize / 2
                x: -33,
                y: -33
              },
              position: that.chartsObj.convertToPixel({ seriesIndex: 0 }, [
                dataItem.x,
                dataItem.y
              ]),

              // invisible: true,
              draggable: true,
              z: 100,

              // 点击节点
              onclick: that.$echarts.util.curry(function(idx) {
                const emitParam = data.series[0].data[idx];
                that.$emit("emitHandleSheet", emitParam);
              }, dataIndex),

              // 拖拽节点
              ondrag: that.$echarts.util.curry(onPointDragging, dataIndex),

              // 拖拽结束
              ondragend: that.$echarts.util.curry(onDrapEnd, dataIndex)
            };
          }
        )
      });

      // 画布移动或者方法

      that.chartsObj.on("graphRoam", function(data) {
        updatePosition({ zoom: data.zoom });
      });

      Toast.clear();
      // this.chartsObj.hideLoading();

      function onPointDragging(dataIndex) {
        // const _XYPOINT = [nodes[dataIndex].x,nodes[dataIndex].y]
        // let tmpPos = _XYPOINT
        let tmpPos = that.chartsObj.convertFromPixel(
          { seriesIndex: 0 },
          this.position
        );
        that.drapNodeData[dataIndex].x = tmpPos[0];
        that.drapNodeData[dataIndex].y = tmpPos[1];
        that.drapNodeData[dataIndex].z = 1001;
        that.chartsObj.setOption({
          series: [
            {
              data: that.drapNodeData
            }
          ]
        });
        // 当节点位置改变时，就要更新拖拽节点的位置
        updatePosition({ drapIdx: dataIndex, drapPoint: tmpPos });
      }

      function updatePosition(option) {
        // let _zoom = option.zoom || 1;
        // that.nodeSize = _zoom * that.nodeSize;

        // 根据位置比例计算每个节点的位置（echarts位置关系）
        that.chartsObj.setOption({
          graphic: that.$echarts.util.map(that.drapNodeData, function(
            item,
            dataIndex
          ) {
            let tmpPos = that.chartsObj.convertToPixel({ seriesIndex: 0 }, [
              item.x,
              item.y
            ]);
            return {
              position: tmpPos,
              style: {
                width: that.nodeSize,
                height: that.nodeSize,
                // x: -that.nodeSize / 2,
                // y: -that.nodeSize / 2
                x: -33,
                y: -33
              }
            };
          })
        });
      }

      function onDrapEnd(idx) {
        let position = this.position;
        let param = {
          idx: idx,
          position: position,
          drapType: 1
        };
        that.handleEndDrap(param);
      }
    },

    handleEndDrap(opt) {
      let drapPoint = this.chartsObj.convertFromPixel(
        { seriesIndex: 0 },
        opt.position
      );
      this.$echarts.util.map(this.drapNodeData, (item, dataIndex) => {
        // 像素坐标
        let testPoint = this.chartsObj.convertToPixel({ seriesIndex: 0 }, [
          item.x,
          item.y
        ]);

        // 文档坐标
        let _testPoint = this.chartsObj.convertFromPixel(
          { seriesIndex: 0 },
          testPoint
        );
        if (opt.drapType == 1) {
          if (dataIndex != opt.idx) {
            this.handleImpact({
              drapPoint: drapPoint,
              testPoint: _testPoint,
              drapType: opt.drapType,
              drapIdx: opt.idx,
              testIdx: dataIndex,
              success: () => {
                const param = {
                  drapNode: this.drapNodeData[opt.idx],
                  testNode: this.drapNodeData[dataIndex]
                };
                this.$emit("emitDrapSheet", param);
              }
            });
          }
        } else {
          this.handleImpact({
            drapPoint: drapPoint,
            testPoint: _testPoint,
            drapType: opt.drapType,
            success: () => {
              const param = {
                drapNode: opt.data,
                testNode: item
              };

              this.$emit("emitDrapELESheet", param);
            }
          });
        }
      });
    },

    // 检测碰撞
    handleImpact(opt) {
      const _MPoint = opt.drapPoint;
      const _TPoint = opt.testPoint;

      // 此处的偏移调整估计有点问题，需要后来去定位下问题，是什么产生的偏移，怀疑：绘制头像的时候的偏移量
      const _x = Math.abs(_MPoint[0] - _TPoint[0]);
      const _y = Math.abs(_MPoint[1] - _TPoint[1]);
      const dis = Math.sqrt(_x * _x + _y * _y);

      const isEvelDis = opt.drapType == 1 ? 66 : 66;
      if (dis <= isEvelDis) {
        opt.success();
      }
    },

    // 用canvas生成图片（边框：同辈同色，是否有纪念堂图标）

    canvasDrawIcon(data, cb) {
      let imgCanvas = document.createElement("canvas");
      imgCanvas.width = 700;
      imgCanvas.height = 700;
      let ctx = imgCanvas.getContext("2d");

      // 头像
      let imgEle = document.createElement("img");
      imgEle.setAttribute("crossOrigin", "Anonymous");
      imgEle.src = data.headerUrl;

      // 纪念堂图标
      let jntIcon = document.createElement("img");
      jntIcon.width = 100;
      jntIcon.height = 100;

      let iconSrc = require("../../../static/images/jnt_icon.png");
      jntIcon.setAttribute("crossOrigin", "Anonymous");
      jntIcon.src = iconSrc;

      imgEle.onload = () => {
        if (data.isDeath == 2) {
          ctx.drawImage(imgEle, 20, 20, 660, 660);
          let myImageData = ctx.getImageData(20, 20, 660, 660);
          this.colorToGray(myImageData,grayImgData=>{
            ctx.putImageData(grayImgData, 20, 20);
          })
        } else {
          ctx.drawImage(imgEle, 20, 20, 660, 660);
        }

        ctx.beginPath();
        ctx.lineWidth = 20;
        ctx.strokeStyle = data.seniorityColor;
        ctx.arc(350, 350, 330, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        if (data.isDeath == 2) {
          // imgCanvas.style.position = "fixed";
          // imgCanvas.style.top = "10px";
          // imgCanvas.style.left = "10px";
          // document.body.appendChild(imgCanvas);
          // console.log(data.name + "死掉了，要画纪念堂");
          ctx.beginPath();
          ctx.arc(560, 560, 100, 0, 2 * Math.PI);
          ctx.fillStyle = data.seniorityColor;
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
          ctx.drawImage(jntIcon, 472, 460, 180, 180);
          const dataUrl = imgCanvas.toDataURL();
          ctx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
          cb(data.headerUrl, dataUrl);
        } else {
          const dataUrl = imgCanvas.toDataURL();
          ctx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
          cb(data.headerUrl, dataUrl);
        }
      };
    },

    //  把彩色图片转化成黑白图片
    colorToGray(imgData, cb) {
      let _data = imgData;
      for (let i = 0; i < 660 * 660 * 4; i += 4) {
        let myRed = _data.data[i];
        let myGreen = _data.data[i + 1];
        let myBlue = _data.data[i + 2];
        let myGray = parseInt((myRed + myGreen + myBlue) / 3);

        _data.data[i] = myGray;
        _data.data[i + 1] = myGray;
        _data.data[i + 2] = myGray;
      }
      cb(_data);
    },
    // 响应拖拽事件，charts样式修改
    responseDrapFun(data) {
      let param = {
        data: data.data,
        position: [data.point.x, data.point.y],
        drapType: 2
      };
      this.handleEndDrap(param);
    },

    // 重新渲染
    reDraw() {}
  }
};
</script>


<style lang="less" scoped>
.tree-wrapper {
  width: 100%;
  height: 100%;
  //   background: #dedede;
}
</style>


