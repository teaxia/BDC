<template>
	<div class="regist" v-cloak>
        <div class="pd50">
            <div>
                <h2>{{ $t("global.title") }}</h2>
            </div>
            <div class="enterfrom">
                <select v-model="select" slot="prepend" class="input-select" placeholder="+86">
                    <option v-for="(item,index) in options" :key="index" :label="item.value" :value="item.value"></option>
                </select>
                <input :placeholder="$t('user.tips.phone')" v-model="mobile" class="input-with-select" />
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
            select   : '+86',
			mobile   : '',
			lang	 : '',
            options: [{
               value: '+86',
            }],
		}
	},
	watch:{
		
	},
	methods: {
		doSubmit(){
			let jmcode = "b2.@A%3dwa";
			this.$server.post(
			'PwdBack_SendCode',
			{
				jm 	 		: this.$md5(jmcode+this.mobile).toUpperCase(),					// 加密方法Key+Phone_No加密
				Key  		: '',															// 注册传空
				Phone_No	: this.mobile,
				lv   		: this.lang
			},
			).then(data => {
				if(data.Code<0){
					this.$vux.toast.show({
						text: data.Msg,
						type: 'warn'
					})
				}else{
					// 成功，跳转到输入验证码页面！
					this.$router.push({
						path:"/user/verification",
						query:{
							mobile:this.mobile,
						}
					});
				}
			})
		}
	},
	mounted() {
		this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
@import "../../scss/base/main";
</style>