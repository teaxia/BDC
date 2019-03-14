<template>
    <div :value="value" :class="[ showPupop ? 'show' : 'hidden','mask' ]">
        <div class="close" @click="close">

        </div>
        <div :class="[ showPupop ? 'bottom-in-active' : 'bottom-out-active','margin-top' ]">
            <div class="title">
                <div @click="$emit('onLeftText')" class="flex text left">{{leftText}}</div>
                <div class="fx3 text">
                    {{titleText}}
                    <slot name='title'></slot>
                </div>
                <div @click="$emit('onRightText')" class="flex text right">{{rightText}}</div>
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
        leftText           :    String,              //  标题左边文字 
        rightText          :    String,              //  标题右边文字
        titleText          :    String,              //  标题文字
        value: {
            type: Boolean,
            default:false
        },
  },
  data () {
    return {
        showPupop            :       false,
    }
  },
  methods:{
        close(){
            // 关闭遮罩
            this.showPupop = false
        },
  },
  watch:{
      value(val) {
        this.showPupop = val;
      },
      showPupop(val){
        this.$emit("input",val);
      }
  },
  mounted(){
    if (this.value) {
        this.showPupop = true;
    }
      //this.w = document.getElementById("sel").offsetWidth
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
    .close{
        height: 450px;
    }
    .margin-top{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #eee;
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
        max-height: 50%;
//        padding: 20px;
        .title{
            background: #ffffff;
            display: flex;
            padding:10px 5px;
            border-bottom: 0.01rem solid #e7e7e7;
            .text{
                text-align: center;
                //padding-bottom: 10px;
                font-size: 28px;
            }
            .left{
                color: #828282;
            }
            .right{
                color: #FF9900;
            }
            .flex{
                flex: 1;
            }
            .fx3{
                flex: 3;
            }
        }
        .content{
            overflow: hidden;
            position: relative;
            // overflow-y: scroll;
            // -webkit-overflow-scrolling: touch;
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