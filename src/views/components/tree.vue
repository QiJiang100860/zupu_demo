<template>
  <div class="tree-wrapper" id="treeWrapper">
    <div id="echarts"></div>
  </div>
</template>

<script>
import * as Util from "../../utils";
export default {
  props: ["treeData"],
  data() {
    return {
      chartsObj: null
    };
  },

  mounted() {
    this.draw(this.treeData);
  },

  methods: {
    draw(data, cb) {
      const nodeData = data.nodes;
      const linkData = data.links;

      this.initEcharts(() => {
        this.renderEcharts({
          animationDurationUpdate: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              type: "graph",
              layout: "force",
              symbolSize: 50,
              roam: true,
              draggable: true,
              label: {
                normal: {
                  show: true
                }
              },
              edgeSymbol: ["circle"],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                normal: {
                  textStyle: {
                    fontSize: 20
                  }
                }
              },
              force: {
                repulsion: 400
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
      this.chartsObj.showLoading();
      this.chartsObj.setOption(data);
      this.chartsObj.hideLoading();
    },

    // 响应拖拽事件，charts样式修改
    responseDrapFun(cb) {
      let data = Util.deepClone(this.treeData);
      for (let idx in data.nodes) {
        data.nodes[idx].itemStyle.borderWidth = 2;
        data.nodes[idx].itemStyle.borderType = "deshed";
        data.nodes[idx].itemStyle.borderColor = "#1797f3";
      }
      this.draw(data)
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


