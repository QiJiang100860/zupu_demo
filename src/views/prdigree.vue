<template>
  <div class="prdigree">
    <div class="btn-wrapper">
      <!-- <div class="h5-btn" @click="handleContect">联系人</div> -->
      <!-- <div class="h5-btn" @click="handleJNTFun">纪念堂</div> -->
    </div>
    <tree ref="treeComponent" :treeData="treeData" @emitHandleSheet="handleSheet"></tree>

    <drap-node :data="drapNodeData" @emitDrap="drapFun"></drap-node>

    <van-actionsheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      :close-on-click-overlay="false"
    />
  </div>
</template>


<script>
import Tree from "./components/tree";
import DrapNode from "./components/drapNode";
import { Toast } from "vant";
import { Actionsheet } from "vant";
import { Dialog } from "vant";
import {calcRelation} from "./calcRelation.js"

import relationData from "./data.js"


export default {
  components: {
    Tree,
    DrapNode,
    Actionsheet
  },
  data() {
    return {
      telType: new Number(),

      treeData: null,
      drapNodeData: [],
      
      show: false,
      actions: null
    };
  },
  beforeMount() {
      this.getPrdigree(() => {
        
        const data = calcRelation(relationData.data)

        this.drapNodeData = [];
        this.treeData = {
          nodes: data.nodes,
          links:data.links
        };

      });
  },

  mounted() {
    
  },

  methods: {
    handleSheet(data) {
      if (data._ID === 1) {
        this.actions = [
          {
            name: "查看节点信息",
            id: data._ID,
            handle: "check"
          }
        ];
      } else {
        if (data._IsDeath == 1) {
          this.actions = [
            {
              name: "删除节点信息",
              id: data._ID,
              handle: "del"
            },
            {
              name: "查看节点信息",
              id: data._ID,
              handle: "check"
            }
          ];
        } else {
          this.actions = [
            {
              name: "删除节点信息",
              id: data._ID,
              handle: "del"
            },
            {
              name: "转变为纪念堂",
              id: data._ID,
              handle: "change"
            },
            {
              name: "查看节点信息",
              id: data._ID,
              handle: "check"
            }
          ];
        }
      }

      this.show = true;
    },

    onSelect(item) {
      this.show = false;
      this.actions = null;
      this[item.handle](item);
    },

    del(item) {
      Dialog.confirm({
        title: "温馨提示",
        message: "确定要删除这个节点信息吗？"
      })
        .then(() => {
          // on confirm
          Toast("删除成功了");
        })
        .catch(() => {
          // on cancel
          Toast("操作取消了");
        });
    },
    check() {
      Toast("查看节点信息");
    },
    change() {
      Dialog.confirm({
        title: "温馨提示",
        message: "正在转变为纪念堂吗，该操作不可逆，确定继续吗？"
      })
        .then(() => {
          // on confirm
          Toast("操作成功");
        })
        .catch(() => {
          // on cancel
          Toast("操作取消了");
        });
    },

    // handleContect() {
    //   if (this.telType == 1) {
    //     alert("安卓：去联系人方法");
    //   } else {
    //     alert("ios：去联系人方法");
    //   }

    // },
    // handleJNTFun() {
    //   if (this.telType == 1) {
    //     alert("安卓：去纪念堂方法");
    //   } else {
    //     alert("ios：去纪念堂方法");
    //   }
    // },



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
