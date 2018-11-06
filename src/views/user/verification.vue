<template>
	<div class="regist" v-cloak>
        <div class="pd50">
            <div>
                <h2>{{ $t("user.verification.title") }}</h2>
            </div>
            <div class="enterfrom">
                <input :placeholder="$t('user.tips.verification')" v-model="code" class="input-with-select" />
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.next") }}</button>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			mobile   : '',
            lang	 : '',
            code     : '',
		}
	},
	watch:{
		
	},
	methods: {
		doSubmit(){
			this.$server.post(
			'ValidatePhoneNo',
			{
				jm 	 		: this.$md5(this.$jm.jmCode+this.code).toUpperCase(),					// 加密方法jmcode+Phone_No加密									                    // 注册传空
                Phone_No	: this.mobile,
                phoneCode   : this.code,		
				lv   		: this.lang
			},
			).then(data => {
				if(data.Code<0){
					this.$vux.toast.show({
						text: data.Msg,
						type: 'warn'
					})
				}else{
					// 成功，跳转到注册填写信息页面！
					this.$router.push({
						path:"/user/registinfo",
						query:{
                            code    :  this.code,
                            mobile  :  this.mobile
						}
					});
				}
			})
		}
	},
	mounted() {
        this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
        this.mobile = this.$route.query.mobile;
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
@import "../../scss/base/main";
</style>