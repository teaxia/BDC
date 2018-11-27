<template>
  <div class="scan">
    <!-- <x-header :left-options="{backText:$t('global.back')}" :title="$t('wallet.send.title')"></x-header>
    <div id="bcid">
    </div> -->
    <div id="bcid">
			<div style="height:40%"></div>
			<p class="tip">...载入中...</p>
		</div>
		<footer>
			<div class="fbt" onclick="back()">取　 消</div>
			<div class="fbt" onclick="scanPicture()">从相册选择二维码</div>
		</footer>
  </div>
</template>

<script type='text/javascript'>
// let scan = null
// export default {
//   data() {
//     return {
//     }
//   },
//   methods: {
//     // 创建扫描控件
//     startRecognize() {
//       let that = this
//       if (!window.plus) return
//       // eslint-disable-next-line
//       scan = new plus.barcode.Barcode('bcid')
//       scan.onmarked = onmarked

//       function onmarked(type, result, file) {
//         switch (type) {
//           // eslint-disable-next-line
//           case plus.barcode.QR:
//             type = 'QR'
//             break
//           // eslint-disable-next-line
//           case plus.barcode.EAN13:
//             type = 'EAN13'
//             break
//           // eslint-disable-next-line
//           case plus.barcode.EAN8:
//             type = 'EAN8'
//             break
//           default:
//             type = '其它' + type
//             break
//         }
//         // 获得code
//         result = result.replace(/\n/g, '')
//         if(result){
//           // 成功，关闭控件，带参数跳转到正常页面去
//           alert(result);
//           that.closeScan();
//           that.$router.push({
//             path:"/wallet/send",
//             query:{addr:result}
//           });
//         }else{
//           // 失败，关闭控件，重新扫描
//           alert('失败了？');
//           that.closeScan();
//           that.$router.push({
//             path:"/wallet/send",
//           });
//         }
//       }
//     },
//     // 开始扫描
//     startScan() {
//       if (!window.plus) return
//       scan.start()
//     },
//     // 关闭扫描
//     cancelScan() {
//       if (!window.plus) return
//       scan.cancel()
//     },
//     // 关闭条码识别控件
//     closeScan() {
//       if (!window.plus) return
//       scan.close()
//     }
//   },
//   mounted() {
//     this.startRecognize();
//   },
//   beforeDestroy(){
//       // 清除扫描
//       this.closeScan();
//   }
// }

var ws=null,wo=null;
var scan=null,domready=false;
// H5 plus事件处理
function plusReady(){
	if(ws||!window.plus||!domready){
		return;
	}
	// 获取窗口对象
	ws=plus.webview.currentWebview();
	wo=ws.opener();
	// 开始扫描
	ws.addEventListener('show', function(){
		scan=new plus.barcode.Barcode('bcid');
	    scan.onmarked=onmarked;
	    scan.start({conserve:true,filename:'_doc/barcode/'});
	}, false);
	// 显示页面并关闭等待框
    ws.show('pop-in');
    wo.evalJS('closeWaiting()');
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener('plusready', plusReady, false);
}
// 监听DOMContentLoaded事件
document.addEventListener('DOMContentLoaded', function(){
	domready=true;
	plusReady();
}, false);
// 二维码扫描成功
function onmarked(type, result, file){
    switch(type){
    	case plus.barcode.QR:
    	type = 'QR';
    	break;
    	case plus.barcode.EAN13:
    	type = 'EAN13';
    	break;
    	case plus.barcode.EAN8:
    	type = 'EAN8';
    	break;
    	default:
    	type = '其它'+type;
    	break;
    }
    result = result.replace(/\r\n/g, '');
    wo.evalJS("scaned('"+ type +"','"+ result +"','"+ file +"');");
    back();
}
// 从相册中选择二维码图片 
function scanPicture(){
    plus.gallery.pick(function(path){
	    plus.barcode.scan(path,onmarked,function(error){
			plus.nativeUI.alert('无法识别此图片');
		});
    }, function(err){
        console.log('Failed: '+err.message);
    });
}
</script>
<style scoped lang="scss">
// .scan {
//     height: 100%;
//     #bcid {
//         width: 100%;
//         height: 100%;
//         position: absolute;
//         left: 0;
//         right: 0;
//         top: 100px;
//         text-align: center;
//         color: #fff;
//         background: #ccc;
//     }
//     footer {
//         position: absolute;
//         left: 0;
//         bottom: 1rem;
//         height: 2rem;
//         line-height: 2rem;
//         z-index: 2;
//     }
// }
#bcid {
	width: 100%;
	position: absolute;
	top: 0px;
	bottom: 44px;
	text-align: center;
}
.tip {
	color: #FFFFFF;
	font-weight: bold;
	text-shadow: 0px -1px #103E5C;
}
footer {
	width: 100%;
	height: 44px;
	position: absolute;
	bottom: 0px;
	line-height: 44px;
	text-align: center;
	color: #FFF;
}
.fbt {
	width: 50%;
	height: 100%;
	background-color: #FFCC33;
	float: left;
}
.fbt:active {
  	-webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
	box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
}
</style>