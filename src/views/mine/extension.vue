<template>
	<div class="extension padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.extension.tg')"></x-header>
        <div class="main-container">
            <div class="w-cont" id="extension">
                <div class="center-avatar">
                    <img v-if="avatar&&avatar!='null'" class="avatar" :src="avatar" />
                    <i v-else class="avatar iconfont icon-touxiang"></i>
                </div>
                <div class="invitecode">
                    <p><i class="iconfont icon-feiji"></i>{{$t('mine.extension.invitecode')}}</p>
                    <p>{{InviteCode}}</p>
                </div>
                <div class="ercode">
                    <qriously class="ercode" :value="`http://belden-bdc.net/register/index.html?InviteCode=`+InviteCode" :size="138"/>
                </div>
                <div class="InviteCode">
                    <span v-text="`http://belden-bdc.net/register/index.html?InviteCode=`+InviteCode"></span>
                    <button type="button" class="btn btn-xs btn-round" @click="CopyClip('http://belden-bdc.net/register/index.html?InviteCode='+InviteCode)">{{$t('wallet.receive.copy')}}</button>
                </div>
            </div>
			<div class="center mr20">
				<button @click="save()" class="btn btn-block btn-round">{{$t('wallet.receive.save')}}</button>
			</div>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	import { clipBoard } from '../../common/mixins/clipBoard'
	export default {
	mixins:[clipBoard],
		data() {
			return {
                avatar      :   '',
                InviteCode  :   '',
			}
		},
		methods: {
			save(){
				//首先先截取base64图片
				let ref = document.getElementById('extension') // 截图区域				
				let that = this;
				this.$html2canvas(ref, {
					backgroundColor: '#ffffff'
				}).then((canvas) => {
					var image = new Image();
					image.src = canvas.toDataURL("image/webp", 1);
					var base64Str = image.src.split('base64,')[1];
					var imgPath = "fs://extension/";
					var imgName = Math.floor((Math.random() * 100) + 1) + "share.jpg";
					var trans = api.require('trans');
					trans.saveImage({
						base64Str: base64Str, //base64字符串不能包含data:image/png;base64,前缀
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
		},
		mounted() {
		    this.avatar     = this.$storage.get('HeadImg');
		    this.InviteCode = this.$storage.get('InviteCode'); 
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/extension";
</style>