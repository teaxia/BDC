<template>
	<div class="regist" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.setting.editpsw')"></x-header>
        <div class="pd50">
            <div class="enterfrom">
                <group>
                    <x-input class="test" :title="$t('mine.setting.oldpsw')" required :placeholder="$t('mine.setting.tips.oldpsw')" v-model="oldpsw"></x-input>
                </group>
                <group>
                    <x-input class="test" :title="$t('mine.setting.newpsw')" v-model="newpsw" required :placeholder="$t('mine.setting.tips.newpsw')"></x-input>
                </group>
                <group>
                    <x-input class="test" :title="$t('mine.setting.confirmpsw')" v-model="confirmpsw" required :placeholder="$t('mine.setting.tips.confirmpsw')"></x-input>
                </group>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			oldpsw      :  '',
            newpsw	    :  '',
            confirmpsw  :  '',
		}
	},
	methods: {
		doSubmit(){
            // 判断密码不为空
            if(this.oldpsw==''||this.newpsw==''){
                this.$vux.toast.show({
                    text: this.$t('mine.setting.tips.repsw'),
                    type: 'warn'
                })
                return;
            }
            if(this.confirmpsw!=this.newpsw){
                this.$vux.toast.show({
                    text: this.$t('mine.setting.tips.notpsw'),
                    type: 'warn'
                })
                return;
            }
			this.$server.post(
            'EditPwd',
            {
                guid 	    : this.$storage.get('guid'),
                type    	: 'dlmm',
                oldPwd      : this.oldpsw,
                newPwd   	: this.newpsw
            },
            ).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t("global.success"),
                        type: 'success'
                    })
                    this.oldPwd = '';
                    this.newpsw = '';
                    this.confirmpsw = '';
                }
            })
        },
	},
	mounted() {
		
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
</style>