<template>
  <div class="scan">
    <x-header :left-options="{backText:$t('global.back')}" :title="$t('wallet.send.title')"></x-header>
    <div id="bcid">
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
let scan = null
export default {
  data() {
    return {
    }
  },
  methods: {
    // 创建扫描控件
    startRecognize() {
      let that = this
      if (!window.plus) return
      // eslint-disable-next-line
      scan = new plus.barcode.Barcode('bcid')
      scan.onmarked = onmarked

      function onmarked(type, result, file) {
        switch (type) {
          // eslint-disable-next-line
          case plus.barcode.QR:
            type = 'QR'
            break
          // eslint-disable-next-line
          case plus.barcode.EAN13:
            type = 'EAN13'
            break
          // eslint-disable-next-line
          case plus.barcode.EAN8:
            type = 'EAN8'
            break
          default:
            type = '其它' + type
            break
        }
        // 获得code
        result = result.replace(/\n/g, '')
        if(result){
          // 成功，关闭控件，带参数跳转到正常页面去
          console.log(result);
          that.closeScan();
          that.$router.push({
            path:"/wallet/send",
            query:{addr:result}
          });
        }else{
          // 失败，关闭控件，重新扫描
          console.log('失败了？');
          that.closeScan();
          that.$router.push({
            path:"/wallet/send",
          });
        }
      }
    },
    // 开始扫描
    startScan() {
      if (!window.plus) return
      scan.start()
    },
    // 关闭扫描
    cancelScan() {
      if (!window.plus) return
      scan.cancel()
    },
    // 关闭条码识别控件
    closeScan() {
      if (!window.plus) return
      scan.close()
    }
  },
  mounted() {
    this.startRecognize();
  },
  beforeDestroy(){
      // 清除扫描
      this.closeScan();
  }
}
</script>
<style scoped lang="scss">
.scan {
    height: 100%;
    #bcid {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 100px;
        text-align: center;
        color: #fff;
        background: #ccc;
    }
    footer {
        position: absolute;
        left: 0;
        bottom: 1rem;
        height: 2rem;
        line-height: 2rem;
        z-index: 2;
    }
}
</style>