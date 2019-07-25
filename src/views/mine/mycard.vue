<template>
	<div class="mycard margin-header" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.setting.mycard')"></x-header>
        <div class="pd50">
            <div class="enterfrom" v-if="BindCount<AllowCount">
                <group>
                    <x-input class="test" type="text" :title="$t('mine.setting.card')" required :placeholder="$t('mine.setting.tips.card')" v-model="card">
                    </x-input>
                </group>
                <div class="line-b sbank">
                    <div class="title wd">
                        {{$t('mine.setting.bank')}}
                    </div>
                    <vselect v-model='bank' ref="sect" :Arr="banks" :placeholder="$t('mine.setting.tips.bank')"></vselect>
                    <!-- <Select v-model="bank" filterable remote :remote-method="fixquery" clearSingleSelect ref="setQuery"> 
                        <Option v-for="(item,index) in banks" :value="item" :key="index">{{ item }}</Option>
                    </Select> -->
                </div>
                <group>
                    <x-input class="test" type="text" :title="$t('mine.setting.name')" v-model="name" required :placeholder="$t('mine.setting.tips.name')">
                    </x-input>
                </group>
                <div class="province mr30">
                    <select v-model="sProvince" class="wd select">
                        <option v-for="(item,index) in province" :value="index" :key="index">{{ item }}</option>
                    </select>
                    <select v-model="sCity" class="wd select">
                        <option v-for="(item,index) in city" :value="index" :key="index">{{ item }}</option>
                    </select>
                </div>
            </div>
            <button v-if="BindCount<AllowCount" @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
            <div class="mr50 cardlist">
                <div class="tips">
                    <p>{{$t("mine.mycard.tip")}}:</p>
                    <p>1、每个游戏账户最多绑定<span class="bindnum">{{AllowCount}}</span>张银行卡，您已经成功绑定<span class="bindnum">{{BindCount}}</span>张</p>
                    <p>2、一个账户只能绑定同一个开户人姓名的银行卡</p>
                </div>
                <div class="mr20">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>{{$t("mine.mycard.No")}}</th>
                                <th>{{$t("mine.mycard.bank")}}</th>
                                <th>{{$t("mine.mycard.cardnumber")}}</th>
                                <th>{{$t("mine.mycard.time")}}</th>
                                <th>{{$t("mine.area.edit")}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v,index) in cardList" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{v.bankName}}</td>
                                <td>{{v.cardNo}}</td>
                                <td>{{v.CreateTime}}</td>
                                <td><span @click="confirmdel(index)">{{$t("mine.setting.delete")}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Modal v-model="show" :closable="false" :mask-closable="false">
			<div slot="header"></div>
			<div class="modal-body">{{$t('global.authentication')}}</div>
			<div slot="footer">
				<button class="btn btn-block btn-round" @click="goauth()">{{$t('wallet.send.auth')}}</button>
			</div>
		</Modal>

        <Modal v-model="cofirmdel" :closable="false" :mask-closable="false" @on-ok='deleteCard()'>
			<div slot="header">是否确认删除？</div>
			<div class="modal-body text-left">
                <div>银行名称：{{delbankname}}</div>
                <div>银行卡号：{{delbankNo}}</div>
                <div>绑定时间：{{delbankTime}}</div>
            </div>
		</Modal>
    </div>
</template>

<script>
import {province,city} from '../../common/utils/city'
import { GetAccount } from '../../common/mixins/getaccount'
export default {
    name: 'mycard',
    mixins:[GetAccount],
	data() {
		return {
            card      :  '',
            banks     :  [],                       // 请求的开户行数据
            bank      :  '',
            name      :  '',
            province  :  '',                       // 省
            city      :  '',                       // 市
            sProvince :  0,                        // 选择的省
            sCity     :  0,                        // 选择的市
            AllowCount:  0,                        // 允许绑卡的数据
            BindCount :  0,                        // 已绑卡数量
            cardList  :  [],                       // 已绑卡数据
            orderbank :  '',                       // 其他银行
            show      :	 false,         		   // 跳转至强制认证界面
            cofirmdel : false,                     // 确认是否删除
            delbankname  :  '',                    // 删除的银行名称
            delbankNo    :  '',                    // 删除的银行卡号
            delbankTime  :  '',                    // 删除的银行卡绑定时间
            delID       :   '',                    // 删除的卡号ID
		}
	},
	methods: {
		doSubmit(){
            // 解决问题的关键方法
            // 判断不为空
            if(this.card==''||this.card.length<10){
                // 判断银行卡
                this.$vux.toast.show({
                    text: this.$t('mine.mycard.tips.bankerror'),
                    type: 'warn'
                })
                return;
            }
            if(this.$refs.sect.value==''){
                // 判断开户行
                this.$vux.toast.show({
                    text: this.$t('mine.setting.tips.bank'),
                    type: 'warn'
                })
                return;
            }
            if(this.name==''){
                // 判断姓名
                this.$vux.toast.show({
                    text: this.$t('mine.setting.tips.name'),
                    type: 'warn'
                })
                return;
            }
            // 提交绑定
            this.$server.post(
            'BindBankCard',{
                guid 	    :   this.$storage.get('guid'),
                bankName    :   this.$refs.sect.value,
                cardNo      :   this.card,
                accountName :   this.name,
                pName       :   province[this.sProvince],
                cName       :   city[this.sProvince][this.sCity],
            }).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
                    // 清空数据
                    this.$refs.sect.value = ''
                    this.card = ''
                    this.name = ''
                    this.GetBindBankCardList();
                }
            })
            
        },
        GetBindBankInfo(){
            // 请求开户银行
            this.$server.post(
            'GetBindBankInfo',{
                guid 	:   this.$storage.get('guid'),
            }).then(data => {
                if(data){
                    this.banks = JSON.parse(data.Result)
                }
            })
        },
        GetBindBankCardList(){
            // 获取已绑卡数据
            this.$server.post(
            'GetBindBankCardList',{
                guid 	:   this.$storage.get('guid'),
            }).then(data => {
                if(data){
                    this.cardList       =   data.list
                    this.AllowCount     =   data.AllowCount
                    this.BindCount      =   data.BindCount
                }
            })
        },
        ok () {
            this.submit();
        },
        cancel () {
            this.modal = false;
        },
        confirmdel(index){
            // 确认是否删除
            this.cofirmdel      =   true
            this.delbankname    =   this.cardList[index].bankName
            this.delbankNo      =   this.cardList[index].cardNo
            this.delbankTime    =   this.cardList[index].CreateTime
            this.delID          =   this.cardList[index].Id
        },
        goauth () { 
            this.$router.push({
                path:"/mine/myhome",
            });
        },
        deleteCard(){
            this.$server.post(
            'DelBankCard',{
                guid 	:   this.$storage.get('guid'),
                cardId  :   this.delID
            }).then(data => {
                if(data.Result=="true"){
                    this.$vux.toast.show({
                        text: '删除成功！',
                        type: 'success'
                    })
                    this.GetBindBankCardList()
                }
            })
        }
    },
    watch:{
        sProvince(){
            // 省市联动
            this.city   =   city[this.sProvince]
            this.sCity  =   0
        }
    },
	mounted() {
        // 更新个人中心资料
        // this.GetAccount();
        this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
        if(this.realname==this.$t('global.Uncertified')){
            this.show = true;
        }
        this.province = province
        this.city     = city[0]
        this.GetBindBankInfo()
        this.GetBindBankCardList()
    }
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
@import "../../scss/views/mine/BindPay";
</style>