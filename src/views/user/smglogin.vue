<template>
	<div class="regist" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" title="短信登陆"></x-header>
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
                    <x-input class="test" title="+86" required mask="999 9999 9999" :max="max" :placeholder="$t('user.tips.phone')" v-model="mobile"></x-input>
                </group>
                <div class="mr20 v-div">
                    <span class="fr tips" @click="countDown">{{content}}</span>
                </div>
                <group>
                    <x-input class="test" :title="$t('user.tips.vcode')" v-model="code" required mask="999999" :max="codemax" :placeholder="$t('user.tips.verification')"></x-input>
                </group>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("user.login") }}</button>
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
			clock	 : ''
		}
	},
	watch:{
		
	},
	methods: {
		doSubmit(){
			this.$server.post(
            'LoginByPhoneCode',
            {
                jm 	 		: this.$md5(this.$jm.jmCode+this.code).toUpperCase(),			// 加密方法Key+Phone_No加密															// 注册传空
                Phone_No	: this.mobile.replace(/\s+/g,""),
                phoneCode   : this.code,
                lv   		: this.lang
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
        },
        countDown() {
			if (!this.canClick){return}   														// 禁止多次点击 
				this.canClick = false
				this.content = this.totalTime + 's'+this.$t("user.tips.send")
				// 发送短信接口
				this.$server.post(
				'PwdBack_SendCode',
				{
					jm 	 		: this.$md5(this.$jm.jmCode+this.mobile.replace(/\s+/g,"")).toUpperCase(),			// 加密方法Key+Phone_No加密
					Key  		: '',															// 注册传空
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
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
</style>