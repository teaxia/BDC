<template>
	<div class="login" v-cloak>
		<div class="v-flex v-flex-between">
			<div>
				<h2>
					{{$t("global.title")}}
				</h2>
			</div>
			<div class="change">
				<Select v-model="lang">
					<Option v-for="(v,index) in langType" :value="v.key" :key="index">{{v.value}}</Option>
				</Select>
			</div>
		</div>
		<center>
			<img src="static/images/logo.png" style="width:3rem;height:3rem;margin-top:1rem">
		</center>
		<div class="enterfrom">
			<div class="v-input v-cell">
				<input class="input" v-model="UserName" :placeholder="$t('user.tips.username')">
			</div>
			<div class="v-input v-cell">
				<input class="input" :type="type?'text':'password'" v-model="PassWord" :placeholder="$t('user.tips.password')">
				<i @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
			</div>
		</div>
		<div class="mr20 v-div">
		 	<router-link to="/user/smglogin"><span class="fl tips">{{ $t("user.type.msg") }}</span></router-link>
			<router-link to="/user/forget"><span class="fr tips">{{ $t("user.tips.forget") }}</span></router-link>
		</div>
		<button @click="doSubmit()" class="btn btn-block btn-default btn-round mr10">{{ $t("user.login") }}</button>
		<router-link to='/user/registinfo'>
			<button class="btn btn-block btn-default btn-round mr20">
				{{ $t("user.regist") }}
			</button>
		</router-link>
		<Modal v-model="show" :mask-closable="false" @on-ok="GoogleValidate">
			<div slot="header">
					{{$t('mine.ahtuenticator.google')}}
			</div>
			<div class="modal-body">
					<x-input class="test" :title="$t('mine.ahtuenticator.security')" v-model="safecode" :placeholder="$t('mine.ahtuenticator.googlesecurity')">
					</x-input>
			</div>
		</Modal>
	</div>
</template>

<script>

export default {
	name: 'Login',
	data() {
		return {
			langType : [{ key: 'zh', value: '中文' },{ key: 'en', value: 'english' }],
			UserName : '',
			PassWord : '',
			lang	 : 'zh',		// 默认语言
			type	 : false,		// 切换密码状态
			show	 :	false,		// 是否显示谷歌认证
			safecode	:	'',	  // 谷歌验证码
			token		:	'',			// 临时用的token
		}
	},
	watch:{
		lang(){
			this.$storage.set('lang',this.lang);
			this.$i18n.locale = this.lang;
		}
	},
	methods: {
		doSubmit(){
			let pwd    = this.$md5(this.$jm+this.PassWord).toUpperCase()  ;							// 加密方法 jmcode+pwd
			let jm     = this.$md5(this.$jm+this.UserName+pwd).toUpperCase();						// 加密方法 jmcode+username+md5(psw)加密
			// 空值判断
			if(!this.PassWord&&!this.UserName){
				this.$vux.toast.show({
					text: this.$t('user.tips.error'),
					type: 'warn'
				})
			}else{
				this.$server.post(
				'Login',
				{
					jm 	 : jm,
					name : this.UserName,											// 用户名
					pwd	 : pwd,					
					lv   : this.lang
				}).then(data => {
					if(data){
						// console.log(data.Result.split("|"))
						let res = data.Result.split("|")
						this.token  = res[0]
						// 判断是否开启谷歌验证
						if(res[1]=='true'){
							// 开启
							this.show = true
						}else if(res[1]=='false'){
							// 未开启
							this.$vux.toast.show({
								text: this.$t("user.tips.success"),
								type: 'success'
							})
							this.$storage.set('guid',res[0]);
							this.$router.push({
								path:"/wallet/wallet",
							});
						}
					}
				})
			}
		},
		changType(){
			this.type = !this.type
		},
		GoogleValidate(){
				// 判断是否输入安全码
				if(this.safecode==''){
						this.$vux.toast.show({
								text: this.$t('mine.ahtuenticator.googlesecurity'),
								type: 'warn'
						})
						return;
				}
				this.$server.post(
				'GoogleValidate',
				{
						guid 	      :  this.token,
						vCode       :  this.safecode
				}).then(data => {
						if(data){
								if(data.Result=='true'){
										this.$vux.toast.show({
											text: this.$t("user.tips.success"),
											type: 'success'
										})
										this.$storage.set('guid',this.token);
										this.$router.push({
											path:"/wallet/wallet",
										});
								}else{
										this.$vux.toast.show({
												text: this.$t('mine.ahtuenticator.error'),
												type: 'warn'
										})
								}
						}
				})
		}
	},
	mounted() {
		this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
		if(this.$i18n.locale == 'en'){
			this.lang = 'en'
		}
		//判断是否自动登陆
		let guid = this.$storage.get('guid')
		if(guid&&guid!='undefined'){
			//如果有的话，自动登陆
			this.$router.push({
				path:"/wallet/wallet",
			});
		}
	},
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/login";
</style>