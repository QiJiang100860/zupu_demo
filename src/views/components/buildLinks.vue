<template>
  <div class="sheet-wrapper" :class="{'active':show}">
    <div class="bg" @click="hideModel"></div>

    <div class="node center-node">
      <img :src="centerNodes._Image" alt>
      <div class="infro">{{centerNodes.name}}</div>
    </div>

    <div class="node f-node" @click="handleBuildLink('f')">
      <img :src="require('../../../static/images/empty_node.png')" alt>
      <div class="infro">父亲</div>
    </div>

    <div class="node m-node" @click="handleBuildLink('m')">
      <img :src="require('../../../static/images/empty_node.png')" alt>
      <div class="infro">母亲</div>
    </div>


    <div class="node po-node" @click="handleBuildLink('po')">
      <img :src="require('../../../static/images/empty_node.png')" alt>
      <div class="infro">配偶</div>
    </div>


    <div class="node s-node" @click="handleBuildLink('s')">
      <img :src="require('../../../static/images/empty_node.png')" alt>
      <div class="infro">儿子</div>
    </div>



    <div class="node d-node" @click="handleBuildLink('d')">
      <img :src="require('../../../static/images/empty_node.png')" alt>
      <div class="infro">女儿</div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      linkNode:null,
      centerNodes: {
        name: "",
        headerUrl: "",
        _Image:""
      },


    };
  },
  beforeMount() {},
  methods: {
    showModel(data) {
      this.centerNodes = data.data.testNode;
      this.linkNode = data.data.drapNode;
      this.show = true;
    },
    hideModel() {
      this.show = false;
    },

    handleBuildLink(linkType){
        const param = {
            cNodeId:this.centerNodes._ID,
            addNodeID:this.linkNode.id,
            type:linkType
        }
        this.$emit('emitBuildLink',param)
    }
  }
};
</script>


<style lang="less" scoped>
.sheet-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000001;
  display: none;
  .bg {
    width: 100%;
    height: 100%;
    background: rgba(#000, 0.6);
  }
  .node {
    position: absolute;
    width: 66px;
    height: 66px;
    left: 50%;
    top: 50%;
    img {
      display: block;
      width: 100%;
    }
    .infro {
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
  }
  .center-node {
    margin-left: -80px;
    margin-top: -33px;
  }

  .f-node{
    margin-left: -126px;
    margin-top: -128px;
  }

  .m-node{
    margin-left: -20px;
    margin-top: -128px;
  }

  .po-node{
    margin-left: 34px;
    margin-top: -33px;
  }

  .s-node{
    margin-left: -126px;
    margin-top: 64px;
  }

  .d-node{
    margin-left: -20px;
    margin-top: 64px;
  }

  &.active {
    display: block;
    // .bg{
    //     display: block
    // }
  }
}
</style>

