<template>
  <div class="prdigree">
    <div class="btn-wrapper">
      <!-- <div class="h5-btn" @click="handleContect">联系人</div> -->
      <!-- <div class="h5-btn" @click="handleJNTFun">纪念堂</div> -->
    </div>

    <template v-if="loading">
      <tree
        ref="treeComponent"
        :treeData="treeData"
        @emitHandleSheet="handleSheet"
        @emitDrapSheet="drapSheet"
        @emitDrapELESheet="drapELESheet"
      ></tree>

      <drap-node :data="drapNodeData" @emitDrap="drapEnd"></drap-node>

      <van-actionsheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
        :close-on-click-overlay="false"
        cancel-text="取消"
      />

      <build-links ref="buildLinks" @emitBuildLink="handleBuildLink"></build-links>
    </template>
  </div>
</template>


<script>
import Tree from "./components/tree";
import DrapNode from "./components/drapNode";
import BuildLinks from "./components/buildLinks";
import { Toast } from "vant";
import { Actionsheet } from "vant";
import { Dialog } from "vant";
import { calcRelation } from "./calcRelation.js";

import relationData from "./data.js";

import * as home from "../api/home.js";
import { setTimeout } from "timers";

export default {
  components: {
    Tree,
    DrapNode,
    Actionsheet,
    Dialog,

    BuildLinks
  },
  data() {
    return {
      telType: new Number(),

      treeData: null,
      drapNodeData: [],

      show: false,
      actions: null,

      loading: false
    };
  },
  beforeMount() {
    Toast.loading({
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner",
      duration: 0
    });


    this.getPrdigree(() => {
      const data = calcRelation(relationData.data);
      this.drapNodeData = relationData.drapData || [];
      this.treeData = {
        nodes: data.nodes,
        links: data.links
      };
    });
  },

  mounted() {},

  methods: {
    // 点击的sheet弹框
    handleSheet(data) {
      if (data._ID.indexOf("#root") > 0) {
        this.actions = [
          {
            name: "查看节点信息",
            id: data._ID,
            handle: "check"
          }
        ];
      } else {
        if (data._IsDeath == 2) {
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

    // 拖拽发生碰撞之后的sheet
    drapSheet(data) {
      const ids = data.drapNode._ID + "#-#" + data.testNode._ID;
      this.actions = [
        {
          name: "删除关系",
          id: ids,
          data: data,
          handle: "delLink"
        },
        {
          name: "合并信息",
          id: ids,
          data: data,
          handle: "mergeInfro"
        }
      ];

      this.show = true;
    },

    drapELESheet(data) {
      this.actions = [
        {
          name: "替换节点信息",
          data: data,
          handle: "combindInfro"
        },
        {
          name: "建立关系",
          data: data,
          handle: "buildLink"
        }
      ];
      this.show = true;
    },

    onSelect(item) {
      this.show = false;
      this.actions = null;
      this[item.handle](item);
    },

    del(item) {
      Dialog.confirm({
        title: "删除节点信息",
        closeOnClickOverlay: true,
        message: "确定要删除这个节点信息吗？"
      })
        .then(() => {
          // on confirm
          Toast("删除成功了");
          // window.location.reload()
        })
        .catch(() => {
          // on cancel
          Toast("操作取消了");
        });
    },
    check(item) {
      Toast("查看节点信息" + JSON.stringify(item));
      window.location.href = `memorialHall://?handleName=checkNodeInfro&nodeId=${
        item.id
      }`;
    },

    change(item) {
      Dialog.confirm({
        title: "请选择联系人转化纪念堂方式",
        message:
          "方式1：逝者短信验证死亡后，手动创建纪念堂；<div></div>方式2：直接转为纪念堂，系统将为共同好友推送去世通知",
        cancelButtonText: "逝者短信验证死亡",
        confirmButtonText: "直接转为纪念堂",
        overlay: true,
        closeOnClickOverlay: true
      })
        .then(() => {
          // Toast("方式一");
          // window.location.href = `memorialHall://?handleName=commonFriend&nodeId=${
          //   item.id
          // }`;
          Toast("直接转为纪念堂" + JSON.stringify(item));
        })
        .catch(() => {
          // Toast("方式二");
          window.location.href = `memorialHall://?handleName=sendMessage&nodeId=${
            item.id
          }`;
        });
    },

    delLink(item) {
      const paramIds = {
        drapId: item.data.drapNode._ID,
        testId: item.data.testNode._ID
      };

      const tipStr = `确定要删除【${item.data.drapNode.name}】和【${
        item.data.testNode.name
      }】的关系吗？`;

      Dialog.confirm({
        title: "删除节点关系",
        message: tipStr,
        closeOnClickOverlay: true
      })
        .then(() => {
          // on confirm
          Toast("删除成功了" + JSON.stringify(paramIds));
          // window.location.reload()
        })
        .catch(() => {
          // on cancel
          Toast("操作取消了");
          // window.location.reload()
        });
    },

    // 合并信息
    mergeInfro(item) {
      const paramIds = {
        drapId: item.data.drapNode._ID,
        testId: item.data.testNode._ID
      };

      const tipStr = `确定把【${item.data.drapNode.name}】的信息合并入【${
        item.data.testNode.name
      }】的信息中吗？`;

      Dialog.confirm({
        title: "合并节点信息",
        message: tipStr,
        closeOnClickOverlay: true
      })
        .then(() => {
          // on confirm
          Toast("合并成功了" + JSON.stringify(paramIds));
          // window.location.reload()
        })
        .catch(() => {
          // on cancel
          Toast("操作取消了");
          // window.location.reload()
        });
    },

    // 拖拽节点后合并---(替换信息??)
    combindInfro(item) {
      const paramIds = {
        drapId: item.data.drapNode.id,
        testId: item.data.testNode._ID
      };

      const tipStr = `确定把【${item.data.testNode.name}】的信息替换为【${
        item.data.drapNode.name
      }】的信息吗？`;

      Dialog.confirm({
        title: "替换节点信息",
        message: tipStr,
        closeOnClickOverlay: true
      })
        .then(() => {
          // on confirm
          Toast("替换成功了" + JSON.stringify(paramIds));
          // window.location.reload()
        })
        .catch(() => {
          // on cancel
          Toast("操作取消了");
          // window.location.reload()
        });
    },

    // 拖拽节点后建立关系
    buildLink(item) {
      // Toast("建立关系"+item.data.drapNode.id);
      this.$refs.buildLinks.showModel(item);
    },

    // 选择完了添加人员信息结束之后
    handleBuildLink(data) {
      this.$refs.buildLinks.hideModel();
      Toast("添加成功" + JSON.stringify(data));
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
      home.getAdverts().then(res => {
        this.loading = true;
        
        cb ? cb() : "";
      });
    },
    // 拖拽添加关系
    drapEnd(data) {
      this.$refs.treeComponent.responseDrapFun(data);
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
