<template>
  <div>
    <ul class="drap-wrapper">
      <li class="drap-item" v-if="chooseItem" @click="openModel">
        <h5>
          <span>收起</span>
        </h5>
      </li>

      <li class="drap-item" v-if="!chooseItem" @click="openModel">
        <h5>
          <span>{{data.length}}</span>人
        </h5>
      </li>

      <div class="drap-node-content" v-if="chooseItem">
        <div>
          <div
            class="drap-node"
            v-drap="{cb:drapFun,itemData:emptyNode}"
            :style="{'background-image':'url('+emptyNode.headerUrl+')'}"
          ></div>
          <h4>{{emptyNode.name}}</h4>
        </div>

        <div v-for="(item,idx) in data" :key="idx">
          <div
            :data-nodeid="item.id"
            class="drap-node"
            v-drap="{cb:drapFun,itemData:item}"
            :style="{'background-image':'url('+item.headerUrl+')'}"
          ></div>
          <h4>{{item.name}}</h4>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import drap from "../../directive/drap";
export default {
  props: ["data"],
  directives: {
    drap
  },
  data() {
    return {
      chooseItem: null,
      emptyNode: {
        id: "empty_node",
        name: "空节点",
        appellation: "未知",
        status: 1,
        headerUrl: require("../../../static/images/empty_node.png")
      }
    };
  },
  beforeMount() {
    this.chooseItem = this.data.length <= 2;
  },
  methods: {
    openModel() {
      this.chooseItem = !this.chooseItem;
    },
    drapFun(data) {
      this.$emit("emitDrap", data);
    }
  }
};
</script>



<style lang="less" scoped>
.null-drap-wrapper {
  width: 50px;
  height: 50px;
  // border: dashed 2px rgb(23, 151, 243);
  background: rgb(23, 151, 243);
  border-radius: 25px;
  position: fixed;
  // top: 50%;
  // margin-top: -25px;
  bottom: 10px;
  right: 10px;
  line-height: 50px;
  font-size: 14px;
  text-align: center;
  li {
    h5 {
      color: #fff;
      font-weight: normal;
      span {
        font-weight: 700;
        color: fff;
      }
    }
  }
}

.drap-wrapper {
  position: fixed;
  // top: 50%;
  // margin-top: -25px;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  li {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
    // border: dashed 2px rgb(23, 151, 243);
    background: rgb(23, 151, 243);
    border-radius: 25px;
    line-height: 50px;
    font-size: 14px;
    text-align: center;
    z-index: 10001;
    h5 {
      color: #fff;
      font-weight: normal;
      span {
        font-weight: 700;
        color: fff;
      }
    }
  }
  .drap-node-content {
    box-sizing: border-box;
    position: absolute;
    width: 50px;
    left: 0;
    // height: 200px;
    background: #ddedee;
    bottom: 25px;
    z-index: 10000;
    padding-bottom: 28px;
    border-radius: 25px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    .drap-node {
      width: 42px;
      height: 42px;
      line-height: 42px;
      border-radius: 50%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      margin: 5px auto;
      margin-bottom: 0;
      text-align: center;
      box-shadow: 0px 0px 8px rgba(#000, 0.6);
      
    }

    h4 {
        font-size: 12px;
        color: #333;
        text-shadow: 1px 1px 1px rgba(#000, 0.2);
        text-align: center;
      }
  }
}
</style>

