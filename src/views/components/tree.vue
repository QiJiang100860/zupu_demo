<template>
  <div class="tree-wrapper" id="treeWrapper">
    <div id="echarts"></div>
  </div>
</template>

<script>
import * as Util from "../../utils";
import { debug } from "util";
export default {
  props: ["treeData"],
  data() {
    return {
      chartsObj: null
    };
  },

  mounted() {
    
    this.draw(this.treeData, () => {
      this.chartsObj.on("click", nodes => {
        const id = nodes.data._ID;
        alert(id);
      });

      // this.chartsObj.on('mouseDown',nodes=>{
      //   const id = nodes.data._ID;
      //   console.log('按下')
      // })

      // this.chartsObj.on('mouseMove',nodes=>{
      //   const id = nodes.data._ID;
      //   console.log('拖动')
      // })

      // this.chartsObj.on('mouseUp',nodes=>{
      //   const id = nodes.data._ID;
      //   console.log('拖动结束')
      // })
    });
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
            this.canvasDrawIcon(itemData, url => {
              let item = {
                _ID: itemData.id,
                name: itemData.name,
                symbol: "image://" + url,
                symbolKeepAspect: true,

                itemStyle: {
                  // shadowColor: itemData.seniorityColor,
                  // shadowBlur: 20,
                  // shadowOffsetX: "0",
                  // shadowOffsetY: "0"
                  // borderType: "solid",
                  // borderColor:itemData.seniorityColor,
                  // borderWidth: 4
                },

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
            const nodeData = arr;
            const linkData = d.links;
            this.initEcharts(() => {
              this.renderEcharts({
                animationDurationUpdate: 1500,
                animationEasingUpdate: "quinticInOut",
                lineStyle: {
                  type: "dashed",
                  color: "#bbb"
                },
                series: [
                  {
                    type: "graph",
                    layout: "force",
                    symbolSize: 66,
                    roam: true,
                    draggable: true,
                    force: {
                      repulsion: 900
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
      this.chartsObj.showLoading();
      cb ? cb() : "";
    },
    renderEcharts(data) {
      this.chartsObj.setOption(data);
      this.chartsObj.hideLoading();
    },

    // 用canvas生成图片（边框：同辈同色，是否有纪念堂图标）

    canvasDrawIcon(data, cb) {
      let imgCanvas = document.createElement("canvas");
      imgCanvas.width = 70;
      imgCanvas.height = 70;
      let ctx = imgCanvas.getContext("2d");

      let imgEle = document.createElement("img");
      imgEle.src = data.headerUrl;
      imgEle.onload = () => {
        ctx.drawImage(imgEle, 2, 2, 66, 66);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = data.seniorityColor;
        ctx.arc(35, 35, 33, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath()
        if (data.isDeath) {
          // imgCanvas.style.position = "fixed";
          // imgCanvas.style.top = "10px";
          // imgCanvas.style.left = "10px";
          // document.body.appendChild(imgCanvas);
          console.log(data.name + "死掉了，要画纪念堂");
          ctx.beginPath();
          ctx.arc(56,56,10,0, 2 * Math.PI)
          ctx.fillStyle=data.seniorityColor
          ctx.fill()
          ctx.stroke();
          ctx.closePath()
          const drawImgUrl = imgCanvas.toDataURL();
          ctx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
          cb(drawImgUrl);
        } else {
          const drawImgUrl = imgCanvas.toDataURL();
          ctx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
          cb(drawImgUrl);
        }
      };
    },

    // 响应拖拽事件，charts样式修改
    responseDrapFun(cb) {},

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


