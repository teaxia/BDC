<template>
	<div class="login" v-cloak>
		<div class="v-flex v-flex-between">
			<div>
				<h2>
					{{$t("global.title")}}
				</h2>
			</div>
			<div class="change">
				<selector :options="langType" v-model="lang"></selector>
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
			<span class="fl tips">{{ $t("user.type.msg") }}</span>
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
import { Selector } from 'vux'
export default {
	name: 'Login',
	data() {
		return {
			langType : [{ key: 'zh', value: 'English' },{ key: 'en', value: '中文' }],
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
		}
	},
	methods: {
		doSubmit(){
			let jmcode = "b2.@A%3dwa";
			let pwd    = this.$md5(jmcode+this.PassWord).toUpperCase()  ;							// 加密方法 jmcode+pwd
			let jm     = this.$md5(jmcode+this.UserName+pwd).toUpperCase();						// 加密方法 jmcode+username+md5(psw)加密
			this.$server.post(
			'Login',
			{
				jm 	 : jm,
				name : this.UserName,											// 用户名
				pwd	 : pwd,					
				lv   : 'en'
			},
			).then(data => {
				if(data.d!='true'){
					this.$message.error({
						message: 'jm error',
						center:true,
					})
				}
				console.log(data.d);
			})
		},
		changType(){
			this.type = !this.type
		}
	},
	mounted() {
		this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
	},
	components: {
    	Selector
  	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/login";
</style>