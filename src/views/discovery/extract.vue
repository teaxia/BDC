<template>
	<div class="regist margin-header" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.extract.title')"></x-header>
        <div class="pd50">
            <div class="enterfrom">
                <group>
                    <x-input class="test" :title="$t('discovery.extract.address')" :show-clear='false' :placeholder="$t('discovery.extract.addresstip')" v-model="addrs">
                        <button slot="right" @click="getCli()" class="btn btn-xs btn-round">{{$t('global.paste')}}</button>
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
                <!-- <div class="tips"><span>{{$t('discovery.extract.min')}}</span></div> -->
                <div class="tips"><span>{{$t('discovery.extract.tax')}}：{{tax*100}}%</span></div>
                <div class="tips"><span>{{$t('wallet.tips.actassets')}}：{{this.actAssets}}</span></div>
                <div class="tips"><span>{{$t('discovery.extract.fee')}}：{{(bdcnum*Proportion*(1+tax)).toFixed(8)}}</span></div>
                <div class="tips">
                    <span>{{$t('discovery.withdrawal.money')}}：{{this.bdcnum}}</span>
                </div>
                <div class="tips">
                    <span>{{$t('discovery.withdrawal.tips.reduce')}}：{{amount}}</span>
                </div>
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
                    {{$t('discovery.extract.address')}}：{{addrs}}
                </div>
                <div>
                    {{$t('discovery.withdrawal.money')}}：{{this.bdcnum}}
                </div>
                <div>
                    {{$t('discovery.withdrawal.tips.reduce')}}：{{this.amount}}
                </div>
                <div>
                    {{$t('discovery.extract.fee')}}：{{(bdcnum*Proportion*(1+tax)).toFixed(8)}}
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { GetAccount } from '../../common/mixins/getaccount'; 
export default {
    mixins :[GetAccount],
	name: 'extract',
	data() {
		return {
			safecode    :   '',
            bdcnum	    :   '',
            addrs       :   '',
            type	    :   false,		// 切换密码状态'
            modal       :   false,      // 模态框
            tax         :   '',          // 手续费
            fee         :   '',         // 实际到账
            //Poundage    :   '',         // 提币手续费
            Proportion  :   '',   // USDT:BDC价格兑换比
            amount      :   ''
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
                //Poundage        : this.tax
                key             : this.key
            }).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t('global.wait'),
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
            if(this.bdcnum==''){
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
                    this.key        =   data.key            // 加密串
                    this.tax        =   data.Poundage       // 提币手续费
                    this.Proportion =   data.Proportion     // USDT:BDC价格兑换比
                }
            })
        },
        getCli(){
            var clipBoard = api.require('clipBoard');
            var that = this
            clipBoard.get(function(ret, err) {
                if (ret) {
                    let addresss = ret
                    that.addrs = addresss.value
                }
            });
        }
    },
    watch:{
        bdcnum(){
            if(this.bdcnum>5){
                this.amount = (this.$math.subtract(this.bdcnum,5)).toFixed(8)
            }else{
                this.amount = 0
            }
        }
    },
	mounted() {
        this.GetPoundage()
        this.GetAccount();
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