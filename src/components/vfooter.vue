<template>
  <div class="vfooter">
    <grid :show-vertical-dividers="false">
      <grid-item :key="key" v-for="(list,key) in dataList">
          <i @click="onUrl(list.url)" :class="[{'iconfont':true},list.index==isIndex?list.acicon+' active':list.icon]"></i>
          <span @click="onUrl(list.url)" :class="['tab-foot',{'active':list.index==isIndex}]">{{list.value}}</span>
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
          value   : this.$t("discovery.topmenu.OTC"),
          icon    : 'icon-otc',                                    
          acicon  : 'icon-otc1',
          url     : false, 
          // url     : '/OTC/index', 
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
          icon    : 'icon-gerenzhongxinxianxing',
          acicon  : 'icon-gerenzhongxinmianxing',
          url     : '/mine/myhome',
          index : 3
        },
      ]
    }
  },
  methods:{
    onUrl(url){
      if(!url){
        this.getrouter()
				// this.$vux.toast.show({
				// 	text: this.$t('global.unopened'),
				// 	type: 'warn'
				// })
			}else{
				this.$router.push({
					path    :   url,
				});
			}
    },
    getrouter(){
      this.$server.post(
      'GetBlackShow_OTC',
      {
        guid 	 : this.$storage.get('guid'),
      },{showLoading:false}).then(data => {
        if(data){
          this.$router.push({
            path    :   '/OTC/OTCSellBuy',
          });
        }
      })
    },
  }
}
</script>

<style lang="scss">
.vfooter {
  position:fixed;
  bottom: 0;
  width: 100%;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
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
