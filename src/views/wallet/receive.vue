<template>
	<div class="walletmain receive padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('wallet.receive.title')"></x-header>
        <div class="walletmain-top">
			<v-grid class="walletmain-top-menu">
				<div id="screenshot">
					<flexbox>
						<flexbox-item :span="12">
							<div class="midel" @click="onTourl('/mine/center')">
								<img v-if="avatar&&avatar!='null'" class="avatar" :src="avatar" />
								<i v-else class="avatar iconfont icon-touxiang"></i>
								<div class="nickname">{{nickname}}</div>
								<div class="userid">{{realname}}</div>
							</div>
						</flexbox-item>
					</flexbox>
					<qriously class="ercode" :value="ercode" :size="138"/>
					<div class="center">
						<span>{{code}}</span>
					</div>
					<div class="center">
						<div>{{$t('wallet.receive.num')}}：{{$numberComma(num)}}</div>
					</div>
				</div>
				<div class="center mr20">
    				<div class="copy" v-clipboard:copy="code" v-clipboard:success="onCopy" v-clipboard:error="onError"><i class="iconfont icon-fuzhi"></i>&nbsp;{{$t('wallet.receive.copy')}}</div>
				</div>
				<div class="center mr20">
					<input v-model="num" type="number" :placeholder="$t('wallet.receive.tips.num')">
				</div>
				<div class="send">
					<div class="bts">
						<button class="btn btn-block btn-round" @click="save()">{{$t('wallet.receive.save')}}</button>
					</div>
					<div class="bts">
						<button class="btn btn-block btn-round" @click="setNum()">{{$t('wallet.receive.setnum')}}</button>
					</div>
				</div>
			</v-grid>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				nickname	:	'',
                avatar		:	'',
				realname    :   '',
				code		:	'',					// 转换地址
				num			:	'',					// 发送数量
				ercode		:	'',					// 二维码地址
			}
		},
		methods: {
			onCopy: function (e) {
				this.$vux.toast.show({
					text: this.$t('wallet.receive.tips.success'),
					type: 'success'
				})
			},
			onError: function (e) {
				this.$vux.toast.show({
					text: this.$t('wallet.receive.tips.error'),
					type: 'warn'
				})
			},
			save(){
				//首先先截取base64图片
				let ref = document.getElementById('screenshot') // 截图区域				
				let that = this;
				this.$html2canvas(ref, {
					backgroundColor: '#ffffff'
				}).then((canvas) => {
					var image = new Image();
					image.src = canvas.toDataURL("image/webp", 1);
					var base64Str = image.src.split('base64,')[1];
					var imgPath = "fs://qrcode/";
					var imgName = Math.floor((Math.random() * 100) + 1) + "share.jpg";
					var trans = api.require('trans');
					trans.saveImage({
						base64Str: base64Str, 					//base64字符串不能包含data:image/png;base64,前缀
						album: false,
						imgPath: imgPath,
						imgName: imgName
					}, function(ret, err) {
						if (ret.status) {
							api.saveMediaToAlbum({
								path: imgPath+imgName
							}, function(ret, err) {
								if (ret && ret.status) {
									
									that.$vux.toast.show({
										text: that.$t('global.success'),
										type: 'success'
									})
								} else {
									that.$vux.toast.show({
										text: that.$t('wallet.receive.tips.warn'),
										type: 'warn'
									})
								}
							});
						} else {
							that.$vux.toast.show({
								text: that.$t('wallet.receive.tips.warn'),
								type: 'warn'
							})
						}
					});
				})
			},
			setNum(){
				if(this.num<0){
					//不允许小于0
					this.num = 0
				}
				var patrn = /^(-)?\d+(\.\d+)?$/;
				if (patrn.exec(this.num) == null || this.num == "") {
					this.num = 0
				}
				this.ercode = this.code+'.'+this.num;
				
			}
		},
		mounted() {
			this.nickname = this.$storage.get('NickName');
			this.avatar   = this.$storage.get('HeadImg');
			this.code     = this.$storage.get('RechargeCode');
			this.ercode	  = this.$storage.get('RechargeCode')+'.'+0;
            this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/main";
@import "../../scss/views/wallet/receive"; 
</style>