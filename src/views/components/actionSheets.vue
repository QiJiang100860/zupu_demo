<template>
    <div class="sheet-wrapper">
        <div class="bg"></div>

        <div class="item-wrapper">
            
        </div>
    </div>
</template>


<style lang="less" scoped>
.sheet-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000001;
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(#000,.5)
    }

    .item-wrapper{
        position: absolute;
        width: 100%;
        bottom: 0;
        min-height: 100px;
        background: #fff;
    }
}
</style>

