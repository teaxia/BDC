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
			<span class="fr tips">{{ $t("user.tips.forget") }}</span>
		</div>
		<button @click="doSubmit()" class="btn btn-block btn-default btn-round mr10">{{ $t("user.login") }}</button>
		<router-link to='/user/regist'>
			<button class="btn btn-block btn-default btn-round mr20">
				{{ $t("user.regist") }}
			</button>
		</router-link>
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
		}
	},
	watch:{
		lang(){
			this.$storage.set('lang',this.lang);
			this.$i18n.locale = this.lang;
			// this.$server.post(
			// 'SetLanguage',
			// {
			// 	guid : this.$storage.get('guid'),
			// 	lv   : this.lang
			// },
			// ).then(data => {
			// 	if(data){
					
			// 	}
			// })
		}
	},
	methods: {
		doSubmit(){
			let pwd    = this.$md5(this.$jm.jmCode+this.PassWord).toUpperCase()  ;							// 加密方法 jmcode+pwd
			let jm     = this.$md5(this.$jm.jmCode+this.UserName+pwd).toUpperCase();						// 加密方法 jmcode+username+md5(psw)加密
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
				},
				).then(data => {
					if(data){
						this.$vux.toast.show({
							text: this.$t("user.tips.success"),
							type: 'success'
						})
						this.$storage.set('guid',data.Result);
						this.$router.push({
							path:"/wallet/wallet",
						});
					}
				})
			}
		},
		changType(){
			this.type = !this.type
		}
	},
	mounted() {
		this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
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