<template>
	<div class="regist" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.setting.editpsw')"></x-header>
        <div class="pd50">
            <div class="enterfrom">
                <group>
                    <x-input class="test" :type="type?'text':'password'" :title="$t('mine.setting.oldpsw')" required :placeholder="$t('mine.setting.tips.oldpsw')" v-model="oldpsw">
                        <i slot="right" @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group>
                <group>
                    <x-input class="test" :type="type?'text':'password'" :title="$t('mine.setting.newpsw')" v-model="newpsw" required :placeholder="$t('mine.setting.tips.newpsw')">
                        <i slot="right" @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group>
                <group>
                    <x-input class="test" :type="type?'text':'password'" :title="$t('mine.setting.confirmpsw')" v-model="confirmpsw" required :placeholder="$t('mine.setting.tips.confirmpsw')">
                        <i slot="right" @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Editpsw',
	data() {
		return {
			oldpsw      :  '',
            newpsw	    :  '',
            confirmpsw  :  '',
            type	    : false,		// 切换密码状态
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
                    this.oldpsw = '';
                    this.newpsw = '';
                    this.confirmpsw = '';
                }
            })
        },
        changType(){
			this.type = !this.type
		}
	},
	mounted() {
		
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
</style>