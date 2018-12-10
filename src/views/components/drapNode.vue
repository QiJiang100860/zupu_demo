<template>
  <ul class="drap-wrapper">
    <li class="drap-item" v-if="data.length" @click="openModel">
      <h5>
        <span>{{data.length}}</span>人
      </h5>
    </li>

    <li class="drap-item" v-else @click="drapFun">
      <h5>
        <span>空</span>
      </h5>
    </li>
  </ul>
</template>

<script>
import drap from "../../directive/drap";
export default {
  props: ["data"],
  directives: {
    drap
  },
  methods: {
    openModel() {
      alert("打开选人，进行拖拽");
    },
    drapFun(id) {
      this.$emit("emitDrap", id);
    }
  }
};
</script>



<style lang="less" scoped>
.drap-wrapper {
  width: 46px;
  height: 46px;
  border: dashed 2px rgb(23, 151, 243);
  background: #fff;
  border-radius: 25px;
  position: fixed;
  // top: 50%;
  // margin-top: -25px;
  bottom: 10px;
  right: 10px;
  line-height: 46px;
  font-size: 14px;
  text-align: center;
  li {
    h5 {
      color: #666;
      font-weight: normal;
      span {
        font-weight: 700;
        color: rgb(23, 151, 243);
      }
    }
  }
}
</style>

