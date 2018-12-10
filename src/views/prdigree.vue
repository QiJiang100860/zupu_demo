<template>
  <div class="prdigree">
    <!-- <div class="btn-wrapper">
      <div class="h5-btn" @click="handleContect">联系人</div>
      <div class="h5-btn" @click="handleJNTFun">纪念堂</div>
    </div>-->
    <tree ref="treeComponent" :treeData="treeData"></tree>

    <drap-node :data="drapNodeData" @emitDrap="drapFun"></drap-node>
  </div>
</template>


<script>
import Tree from "./components/tree";
import DrapNode from "./components/drapNode";
export default {
  components: {
    Tree,
    DrapNode
  },
  data() {
    return {
      telType: new Number(),

      treeData: null,

      drapNodeData: []
    };
  },
  beforeMount() {
    this.isEvelPhoneType(() => {
      this.getPrdigree(() => {
        this.drapNodeData = [];
        this.treeData = {
          nodes: [
            {
              name: "张三丰",
              appellation: "自己",
              headerUrl: "../../static/images/ziji.png",
              seniorityColor: "#28aedc",
              isDeath:0,
              id: 1
            },
            {
              name: "2",
              appellation: "父亲",
              headerUrl: "../../static/images/fuqin.png",
              seniorityColor: "#4077db",
              isDeath:0,
              id: 2
            },
            {
              name: "3",
              appellation: "母亲",
              headerUrl: "../../static/images/muqin.png",
              seniorityColor: "#4077db",
              isDeath:0,
              id: 3
            },
            {
              name: "4",
              appellation: "姨妈",
              headerUrl: "../../static/images/muqin.png",
              seniorityColor: "#4077db",
              isDeath:0,
              id: 4
            },
            {
              name: "5",
              appellation: "儿子",
              headerUrl: "../../static/images/erzi.png",
              seniorityColor: "#43b853",
              isDeath:0,
              id: 5
            },
            {
              name: "6",
              appellation: "爷爷",
              headerUrl: "../../static/images/yeye.png",
              seniorityColor: "#d03535",
              isDeath:1,
              id: 6
            },
            {
              name: "7",
              appellation: "表弟",
              headerUrl: "../../static/images/erzi.png",
              seniorityColor: "#28aedc",
              isDeath:0,
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
        };
      });
    });
  },

  mounted() {
    // const evt = "onorientationchange" in window ? "orientationchange" : "resize";
    // window.addEventListener(evt, ()=>{
    //   if (window.orientation == 0 || window.orientation == 180) {
    //     alert("竖屏");
    //   } else {
    //     alert("横屏");
    //   }
    // }, false);
  },

  methods: {
    handleContect() {
      if (this.telType == 1) {
        alert("安卓：去联系人方法");
      } else {
        alert("ios：去联系人方法");
      }
    },
    handleJNTFun() {
      if (this.telType == 1) {
        alert("安卓：去纪念堂方法");
      } else {
        alert("ios：去纪念堂方法");
      }
    },

    // 判断手机类型
    isEvelPhoneType(cb) {
      const u = navigator.userAgent,
        app = navigator.appVersion;
      const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        this.telType = 1;
        cb ? cb() : "";
      }
      if (isIOS) {
        this.telType = 2;
        cb ? cb() : "";
      }
    },

    // 获取纪念堂的列表的数据
    getPrdigree(cb) {
      cb ? cb() : "";
    },

    // 拖拽添加关系
    drapFun(id) {
      this.$refs.treeComponent.responseDrapFun();
    }
  }
};
</script>



<style lang="less" scoped>
.prdigree {
  position: relative;
  width: 100%;
  height: 100%;
  .btn-wrapper {
    position: absolute;
    top: 10px;
    left: 16px;
    z-index: 10000;
    .h5-btn {
      background: rgb(23, 151, 243);
      color: #fff;
      font-size: 12px;
      margin-top: 10px;
      padding: 6px 10px;
      border-radius: 6px;
    }
  }
}
</style>
