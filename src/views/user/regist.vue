<template>
	<div class="regist" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('user.regist')"></x-header>
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
            </div>
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
            max		 : 13
		}
	},
	watch:{
		
	},
	methods: {
		doSubmit(){
			if(pattern["Pattern.Cellphone"].test(this.mobile)){
				let mobile = this.mobile.replace(/\s+/g,"");
				// 成功，跳转到输入验证码页面！
				this.$router.push({
					path:"/user/verification",
					query:{
						mobile:this.mobile.replace(/\s+/g,""),
					}
				});
			}else{
				this.$vux.toast.show({
					text: this.$t("user.tips.mobileerror"),
					type: 'warn'
				})
			}
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