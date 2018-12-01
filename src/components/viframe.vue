<template>
    <div class="fram" v-if="show">
        <iframe :src="src" :width="w" :height="h" :scrolling="this.isscro" frameborder="0"></iframe>
        <button @click="close()" class="btn btn-close btn-round">{{$t('global.close')}}</button>
    </div>
</template>

<script>
export default {
  name:'viframe',
  props: ["src"],
  data () {
    return {
        show		:	false,
		w			:	'',
		h			:	''
    }
  },
  methods: {
      show(show){
          if(show){
              console.log('显示');
          }
      }
  },
  mounted(){
    // 解决宽度兼容问题
    if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){  //判断是苹果设备还是其他设备 
        this.isscro = 'no';
        this.h = '100%';
    }else{
        //安卓设备允许滚动
        this.isscro = 'yes';
        this.h = window.screen.height
    }
  }
}
</script>

<style scoped lang="scss">
.fram{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    background:rgba(0,0,0,.8);
    z-index:99;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
}
</style>
