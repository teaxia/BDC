<template>
	<div class="regist margin-header" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('user.forget')"></x-header>
        <div class="pd50">
            <div class="v-flex v-flex-between">
				<div>
					<h2>
						{{$t("global.title")}}
					</h2>
				</div>
			</div>
            <div class="enterfrom">
				<group>
                    <x-input class="test" :title="$t('user.register.username')" required :placeholder="$t('user.tips.username')" v-model="username"></x-input>
                </group>
                <group>
                    <x-input class="test" title="+86" required mask="999 9999 9999" :max="max" :placeholder="$t('user.tips.phone')" v-model="mobile">
						<span slot="right" class="fr tips" @click="countDown">{{content}}</span>
					</x-input>
                </group>
                <group>
                    <x-input class="test" :title="$t('user.tips.vcode')" v-model="code" required mask="999999" :max="codemax" :placeholder="$t('user.tips.verification')"></x-input>
                </group>
				<group>
                    <x-input class="test" :title="$t('user.password')" v-model="password" required :placeholder="$t('user.tips.password')"></x-input>
                </group>
				<group>
                    <x-input class="test" :title="$t('user.repassword')" v-model="repassword" required :placeholder="$t('user.tips.repassword')"></x-input>
                </group>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
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
            max		 : 13,
            codemax  : 6,
            content	 : this.$t("user.tips.setvcode"),
			totalTime: 60,      //记录具体倒计时时间
			canClick : true,	//添加canClick
			clock	 : '',
			password : '',
			repassword : '',
			username	:	'',
		}
	},
	watch:{
		
	},
	methods: {
		doSubmit(){
			if(this.password!=this.repassword&&this.password==''){
				this.$vux.toast.show({
					text: '两次输入的密码不一致',
					type: 'warn'
				})
				return ;
			}
			if(this.code==''){
				this.$vux.toast.show({
					text: '验证码必须填写',
					type: 'warn'
				})
				return ;
			}
			let phone = this.mobile.replace(/\s+/g,"");
			this.$server.post(
            'EditPwdByPhoneCode',
            {
                jm 	 		: this.$md5(this.$jm+this.username+phone).toUpperCase(),			// 加密方法Key+Phone_No加密															// 注册传空
				Phone_No	: phone,
				AccountName : this.username,
                phoneCode   : this.code,
				lv   		: this.lang,
				type		: 'dlmm',
				newPwd		: this.password
            },
            ).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: '密码修改成功！',
                        type: 'success'
                    })
                    this.$router.push({
                        path:"/index",
                    });
                }
            })
        },
        countDown() {
			if (!this.canClick){return}   														// 禁止多次点击 
				this.canClick = false
				this.content = this.totalTime + 's'+this.$t("user.tips.send")
				// 发送短信接口
				this.$server.post(
				'PwdBack_SendCode',
				{
					jm 	 		: this.$md5(this.$jm+this.username+this.mobile.replace(/\s+/g,"")).toUpperCase(),			// 加密方法Key+Phone_No加密
					Key  		: this.username,																	// 忘记密码传用户名
					Phone_No	: this.mobile.replace(/\s+/g,""),
					lv   		: this.lang
				},
				).then(data => {
					if(data){
						this.$vux.toast.show({
							text: this.$t("global.success"),
							type: 'success'
						})
					}
				})
				this.clock = window.setInterval(() => {
				this.totalTime--
				this.content = this.totalTime + 's'+this.$t("user.tips.send")
				if (this.totalTime < 0) {
					window.clearInterval(this.clock)
					this.content = this.$t("user.tips.setvcode");
					this.totalTime = 60
					this.canClick = true  //这里重新开启
				}
			},1000)
		}
	},
	mounted() {
		this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
	},
    beforeDestroy(){
        // 清除计时器
        clearInterval(this.clock);
    }
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
</style>