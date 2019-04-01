<template>
    <div :value="value" :class="[ showFPupop ? 'show' : 'hidden','mask' ]">
        <div class="close" @click="close"></div>
        <div :class="[ showFPupop ? 'bottom-in-active' : 'bottom-out-active','margin-top' ]">
            <div class="title">
                <i @click="close" class="iconfont icon-tianjia"></i>
            </div>
            <div class="content">
                <slot name='list'></slot>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
  name:'vselect',
  props: {
        value: {
            type: Boolean,
            default:false
        },
  },
  data () {
    return {
        showFPupop            :       false,
    }
  },
  methods:{
        close(){
            // 关闭遮罩
            this.showFPupop = false
        },
  },
  watch:{
      value(val) {
        this.showFPupop = val;
      },
      showFPupop(val){
        this.$emit("input",val);
      }
  },
  mounted(){
    if (this.value) {
        this.showFPupop = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.mask{
    transition-property: transform;
    transition-duration: 300ms;
    position: fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,0.5);
    overflow: hidden;
    .margin-top{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        border-radius: 15px 15px 0 0;
        z-index: 501;
        -webkit-transition-property: -webkit-transform;
        transition-property: -webkit-transform;
        transition-property: transform;
        transition-property: transform, -webkit-transform;
        -webkit-transition-duration: 300ms;
        transition-duration: 300ms;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        height: auto;
        .title{
            padding:10px 5px;
            border-bottom: 0.01rem solid #e7e7e7;
            text-align: right;
            .iconfont{
                display: inline-block;
                font-size:38px;
                transform:rotate(45deg);
                -ms-transform:rotate(45deg); 	/* IE 9 */
                -moz-transform:rotate(45deg); 	/* Firefox */
                -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
                -o-transform:rotate(45deg); 	/* Opera */
                margin-right: 10px;
            }
        }
    }
}
.show{
    opacity: 1;
    z-index:99999;
}
.hidden{
    opacity: 0;
    z-index: -1;
}
.bottom-out-active {
    transform: translate3d(0, 100%, 0);
}
.bottom-in-active {
    transform: translate3d(0, 0, 0);
}
</style>