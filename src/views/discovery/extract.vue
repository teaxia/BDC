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
                <!-- <group>
                    <x-input class="test" :type="type?'text':'password'" :title="$t('discovery.extract.safetycode')" v-model="safecode" required :placeholder="$t('discovery.extract.safetycode')">
                        <i slot="right" @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group> -->
                <div class="line-b sbank">
                    <div class="title-psw wd">
                        {{$t('discovery.OTC.sell.security')}}
                    </div>
                    <div class="psw">
                        <div @click="ShowPSW()">
                            <span>{{$t('global.input')}}{{$t('discovery.OTC.sell.security')}}</span>
                        </div> 
                        <!-- <i @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i> -->
                    </div>
                    <!-- <x-input class="test" :type="type?'text':'password'" :title="$t('discovery.OTC.sell.security')" v-model="password" :placeholder="$t('discovery.OTC.sell.security')">
                        <i slot="right" @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
                    </x-input> -->
                </div>
                <div class="line-b sbank">
                    <div class="wd" style="width:3rem;font-size:0.45rem">
                        {{$t('discovery.extract.extractType')}}
                    </div>
                    <Select v-model="curreny">
                        <Option v-for="(v,index) in BDClist" :value="v" :key="index">{{ v }}</Option>
                    </Select>
                </div>
                <group>
                    <x-input class="test" :title="$t('discovery.extract.bdc')" v-model="bdcnum" required :placeholder="$t('discovery.extract.bdcnum')">
                    </x-input>
                </group>
                <!-- <div class="tips"><span>{{$t('discovery.extract.min')}}</span></div> -->
                <div class="tips"><span>{{$t('discovery.extract.tax')}}：{{tax*100}}%</span></div>
                <div class="tips"><span>{{$t('wallet.tips.actassets')}}：{{$numberComma(this.actAssets)}}</span></div>
                <div class="tips"><span>{{$t('discovery.extract.fee')}}：{{(bdcnum*Proportion*(1+tax)).toFixed(8)}}</span></div>
                <div class="tips">
                    <span>{{$t('discovery.withdrawal.money')}}：{{this.bdcnum}}</span>
                </div>
                <div class="tips">
                    <span>{{$t('discovery.withdrawal.tips.reduce')}}：{{amount}}</span>
                </div>
            </div>
            <button @click="subconfirm()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
            <div class="get-last-dt" v-if="GetDTList.OutCurrency">
                <div class="title">{{$t('discovery.btob.history')}}</div>
                <flexbox class="div">
                    <flexbox-item class="div-left">
                        {{$numberComma(GetDTList.OutCurrency)}}
                    </flexbox-item>
                    <flexbox-item class="div-right">
                        {{GetDTList.CreateTime}}
                    </flexbox-item>
                </flexbox>
                <flexbox class="div">
                    <flexbox-item class="div-left">
                        {{$numberComma(GetDTList.BDCNum)}}
                    </flexbox-item>
                    <flexbox-item class="div-right">
                        {{GetDTList.Status}}
                    </flexbox-item>
                </flexbox>
                <flexbox class="div">
                    <flexbox-item class="div-left">
                        {{GetDTList.Address}}
                    </flexbox-item>
                    <flexbox-item class="div-right">
                        <button @click="path()" class="btn btn-xs btn-round">{{$t('discovery.extract.auto')}}</button>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <Modal v-model="modal" @on-ok="ok" :ok-text="$t('global.ok')" :cancel-text="$t('global.cancel')" @on-cancel="cancel">
            <div>
                <!-- 二次确认 -->
                <div>
                    {{$t('discovery.extract.tips.tip')}}<span class="currency">{{curreny}}</span>
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
        <Modal v-model="showPSwed" :mask-closable="false">
			<div slot="header">
                {{$t('wallet.tips.inputcode')}}
            </div>
			<div class="modal-body security">
                <group>
                    <x-input class="test" :type="type?'text':'password'" :title="$t('discovery.OTC.sell.security')" v-model="safecode" :placeholder="$t('global.input')+$t('discovery.OTC.sell.security')">
                        <i slot="right" @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group>
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
			safecode    :   '',         // 安全码
            bdcnum	    :   '',
            addrs       :   '',
            type	    :   false,		// 切换密码状态'
            modal       :   false,      // 模态框
            tax         :   '',          // 手续费
            fee         :   '',         // 实际到账
            //Poundage    :   '',         // 提币手续费
            Proportion  :   '',   // USDT:BDC价格兑换比
            amount      :   '',
            GetDTList   :  [],
            showPSwed   :   false,
            curreny     :   'USDT',
            BDClist     :   ['USDT','BDC']
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
                currenyName     : this.curreny,
                key             : this.key
            }).then(data => {
                if(data){
                    this.GetLastDT()
                    this.GetAccount()
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
            // 去除空格
            this.addrs   =   this.addrs.replace(/\s+/g,"");
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
            if(this.addrs==''){
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
                guid 	        :   this.$storage.get('guid'),
                currenyName     :   this.curreny
            }).then(data => {
                if(data){
                    this.key        =   data.key            // 加密串
                    this.tax        =   data.Poundage       // 提币手续费
                    this.Proportion =   data.Proportion     // USDT:BDC价格兑换比
                }
            })
        },
        GetLastDT(){
            // 查询最后兑提记录
            this.$server.post(
            'GetLastDT',
            {
                guid 	:   this.$storage.get('guid'),
                type    :   'T'   
            }).then(data => {
                if(data.Result!='null'){
                    this.GetDTList = data
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
        },
        path(){
            this.addrs = this.GetDTList.Address
        },
        ShowPSW(){
            this.showPSwed = true
        }
    },
    watch:{
        bdcnum(){
            if(this.bdcnum>5){
                this.amount = (this.$math.subtract(this.bdcnum,5)).toFixed(8)
            }else{
                this.amount = 0
            }
        },
        curreny(){
            this.GetPoundage()
        }
    },
	mounted() {
        this.GetPoundage()
        this.GetAccount()
        this.GetLastDT()
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
.currency{
    color:$font-red;
    font-weight: bold;
}
.get-last-dt{
    margin-top:20px;
    border-top:0.01rem solid $border-line;
    .title{
        font-size:32px;
        font-weight: bold;
        color:$font-orange;
    }
    .div{
        font-size:28px;
        height: 60px;
        .div-left{

        }
        .div-right{
            text-align: right;
            .btn{
                float: right;
            }
        }
    }
}
</style>