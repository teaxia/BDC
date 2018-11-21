<template>
  <div class="vfooter">
    <grid :show-vertical-dividers="false">
      <grid-item :link="list.url" :key="key" v-for="(list,key) in dataList">
          <i :class="[{'iconfont':true},list.index==isIndex?list.acicon+' active':list.icon]"></i>
          <span :class="['tab-foot',{'active':list.index==isIndex}]">{{list.value}}</span>
      </grid-item>
    </grid>
  </div>
</template>

<script>
export default {
  name:'vfooter',
  props: ["isIndex"],
  data () {
    return {
      dataList:[
        {
          value   : this.$t("menu.wallet"),
          icon    : 'icon-qianbao_xianxing',
          acicon  : 'icon-qianbao_mianxing',
          url     : '/wallet/wallet',
          index   : 0
        },
        {
          value   : this.$t("menu.application"),
          icon    : 'icon-yingyongxianxing',
          acicon  : 'icon-yingyongmianxing',
          //url     : '/app/index',
          url     : '',
          index : 1
        },
        {
          value   : this.$t("menu.discovery"),
          icon    : 'icon-faxianxianxing',
          acicon  : 'icon-faxianmianxing',
          url     : '/discovery/index',
          index : 2
        },
        {
          value   : this.$t("menu.mine"),
          icon    : 'icon-tianjiakuangquchengyuan',
          acicon  : 'icon-gerenzhongxinmianxing',
          url     : '/mine/myhome',
          index : 3
        },
      ]
    }
  },
  mounted(){
    
  }
}
</script>

<style lang="scss">
.vfooter {
  position:fixed;
  bottom: 0;
  width: 100%;
  .iconfont{
    color:#b6b6b6;
    font-size:52px;
    display: block;
    text-align: center;
  }
  .tab-foot{
    font-size:24px;
    display: block;
    color:#b6b6b6;
    text-align: center;
  }
  .active{
    color:#4b5361;
  }
}
.vux-grid{
  color:#9399a5;
}
.grid-center {
  display: block;
  text-align: center;
  color: #9399a5;
}
.weui-grids {
  background-color: #f8f8f8;
}
</style>
