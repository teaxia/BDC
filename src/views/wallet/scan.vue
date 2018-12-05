<template>
  <div class="scan">
    <x-header :left-options="{backText:$t('global.back')}" :title="$t('wallet.send.title')"></x-header>
    
  </div>
</template>

<script type='text/javascript'>
let scan = null
export default {
  data() {
    return {
    }
  },
  methods: {
    // 创建扫描控件
    startRecognize() {
      var FNScanner = api.require('FNScanner');
      FNScanner.open({
          autorotation: true
      }, function(ret, err) {
          if (ret) {
              let content = ret.content;
              alert(content);
          } else {
              alert(JSON.stringify(err));
          }
      });
    }
    
  },
  mounted() {
    this.startRecognize();
  },
  beforeDestroy(){
      // 清除扫描
      
  }
}


</script>
<style scoped lang="scss">


</style>