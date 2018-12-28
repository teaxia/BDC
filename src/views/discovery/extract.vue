<template>
	<div class="regist" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.extract.title')"></x-header>
        <div class="pd50">
            <div class="enterfrom">
                <group>
                    <x-input class="test" :title="$t('discovery.extract.address')" required :placeholder="$t('discovery.extract.addresstip')" v-model="addrs">
                    </x-input>
                </group>
                <div class="tips">{{$t('discovery.extract.tip')}}</div>
                <group>
                    <x-input class="test" :type="type?'text':'password'" :title="$t('discovery.extract.safetycode')" v-model="safecode" required :placeholder="$t('discovery.extract.safetycode')">
                        <i slot="right" @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group>
                <group>
                    <x-input class="test" :title="$t('discovery.extract.bdc')" v-model="bdcnum" required :placeholder="$t('discovery.extract.bdcnum')">
                    </x-input>
                </group>
                <div class="tips"><span>{{$t('discovery.extract.tax')}}：{{(bdcnum*tax).toFixed(2)}}</span><span>{{$t('discovery.extract.fee')}}：{{bdcnum-(bdcnum*tax).toFixed(2)}}</span></div>
            </div>
            <button @click="subconfirm()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
        </div>
        <Modal v-model="modal" @on-ok="ok" :ok-text="$t('global.ok')" :cancel-text="$t('global.cancel')" @on-cancel="cancel">
            <div>
                <!-- 二次确认 -->
                <div>
                    {{$t('discovery.extract.tips.tip')}}
                </div>
                <div>
                    {{$t('discovery.extract.address')}}:{{addrs}}
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
	name: 'extract',
	data() {
		return {
			safecode    :  '',
            bdcnum	    :  '',
            addrs       :  '',
            type	    :   false,		// 切换密码状态'
            modal       :   false,      // 模态框
            tax         :  '',          // 手续费
            fee         :   '',         // 实际到账
            
		}
	},
	methods: {
		doSubmit(){
			this.$server.post(
            'WithdrawActAssets',
            {
                guid 	        : this.$storage.get('guid'),
                Money    	    : this.bdcnum,
                MoneyPwd        : this.safecode,
                RechargeCode   	: this.addrs,
            }).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t("global.success"),
                        type: 'success'
                    })
                }
            })
        },
        changType(){
			this.type = !this.type
        },
        subconfirm(){
            // 判断密码不为空
            if(this.safecode==''){
                this.$vux.toast.show({
                    text: this.$t('discovery.extract.tips.safetycode'),
                    type: 'warn'
                })
                return;
            }
            if(this.num=''){
                this.$vux.toast.show({
                    text: this.$t('discovery.extract.tips.num'),
                    type: 'warn'
                })
                return;
            }
            if(this.address=''){
                this.$vux.toast.show({
                    text: this.$t('discovery.extract.tips.address'),
                    type: 'warn'
                })
                return;
            }
            this.modal = true;
        },
        ok () {
            this.doSubmit();
        },
        cancel () {
            this.modal = false;
        },
        GetPoundage(){
            // 获取手续费
            this.$server.post(
            'GetPoundage_TB',
            {
                guid 	        : this.$storage.get('guid'),
            }).then(data => {
                if(data){
                    this.tax = data.Result
                }
            })
        }
	},
	mounted() {
        this.GetPoundage()
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
.tips{
    margin-left: 15px;
    font-style: italic;
    color:$font-red!important;
    font-size:20px;
    line-height: 40px;
}
</style>