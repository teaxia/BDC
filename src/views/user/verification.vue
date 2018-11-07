<template>
	<div class="regist" v-cloak>
		<x-header title="用户注册"></x-header>
        <div class="pd50">
            <div>
                <h2>{{ $t("user.verification.title") }}</h2>
            </div>
			<div class="enterfrom">
                <group>
                    <x-input class="test" :title="$t('user.tips.vcode')" v-model="code" required mask="999999" :max="max" :placeholder="$t('user.tips.verification')"></x-input>
                </group>
            </div>
			<button class="button" @click="countDown">
				{{content}}
			</button>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.next") }}</button>
        </div>
    </div>
</template>

<script>
import pattern from '../../common/utils/pattern'
export default {
	name: 'Login',
	data() {
		return {
			mobile   : '',
            lang	 : '',
			code     : '',
			max		 : 6,
			content: '发送验证码',  // 按钮里显示的内容
			totalTime: 10,      //记录具体倒计时时间
			canClick: true //添加canClick
		}
	},
	watch:{
		
	},
	methods: {
		doSubmit(){
			// 空值判断
			if(!pattern["Pattern.Verification"].test(this.mobile)){
				this.$vux.toast.show({
					text: this.$t("user.tips.verification"),
					type: 'warn'
				})
				return false;
			}
			this.$server.post(
			'ValidatePhoneNo',
			{
				jm 	 		: this.$md5(this.$jm.jmCode+this.code).toUpperCase(),					// 加密方法jmcode+Phone_No加密									                    // 注册传空
                Phone_No	: this.mobile,
                phoneCode   : this.code,		
				lv   		: this.lang
			},
			).then(data => {
				// 成功，跳转到注册填写信息页面
				if(data){
					this.$router.push({
						path:"/user/registinfo",
						query:{
							code    :  this.code,
							mobile  :  this.mobile
						}
					});
				}
			})
		},
		countDown() {
			if (!this.canClick){return}   						// 禁止多次点击 
				this.canClick = false
				this.content = this.totalTime + 's后重新发送'
			let clock = window.setInterval(() => {
				this.totalTime--
				this.content = this.totalTime + 's后重新发送'
				if (this.totalTime < 0) {
					window.clearInterval(clock)
					this.content = '重新发送验证码'
					this.totalTime = 10
					this.canClick = true  //这里重新开启
					
					// 发送短信接口
					this.$server.post(
					'PwdBack_SendCode',
					{
						jm 	 		: this.$md5(this.$jm.jmCode+this.mobile).toUpperCase(),			// 加密方法Key+Phone_No加密
						Key  		: '',															// 注册传空
						Phone_No	: this.mobile,														// 去除格式化手机号产生的空格
						lv   		: this.lang
					},
					).then(data => {
						if(data){
							this.$vux.toast.show({
								text: this.$t("user.tips.success"),
								type: 'success'
							})
						}
					})
				}
			},1000)
		}
	},
	mounted() {
        this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
		this.mobile = this.$route.query.mobile;
		this.countDown();
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
@import "../../scss/base/main";
</style>