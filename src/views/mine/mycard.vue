<template>
	<div class="mycard" v-cloak>
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
                    <Select v-model="bank" filterable>
                        <Option v-for="(item,index) in banks" :value="item" :key="index">{{ item }}</Option>
                    </Select>
                </div>
                <group>
                    <x-input class="test" type="text" :title="$t('mine.setting.name')" v-model="name" required :placeholder="$t('mine.setting.tips.name')">
                    </x-input>
                </group>
                <div class="province mr30">
                    <Select v-model="sProvince" class="wd">
                        <Option v-for="(item,index) in province" :value="index" :key="index">{{ item }}</Option>
                    </Select>
                    <Select v-model="sCity" class="wd">
                        <Option v-for="(item,index) in city" :value="index" :key="index">{{ item }}</Option>
                    </Select>
                </div>
            </div>
            <button v-if="BindCount<AllowCount" @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
            <div class="mr50 cardlist">
                <div class="tips">
                    <p>{{$t("mine.mycard.tip")}}:</p>
                    <p>1、每个游戏账户最多绑定<span class="bindnum">{{AllowCount}}</span>张银行卡，您已经成功绑定<span class="bindnum">{{BindCount}}</span>张</p>
                    <p>2、银行卡锁定以后，不能增加新的银行卡绑定，同时也不能解绑已绑定的银行卡</p>
                    <p>3、新绑定的提款银行卡需要绑定时间超过6小时才能正常取款</p>
                    <p>4、一个账户只能帮顶同一个开户人姓名的银行卡</p>
                </div>
                <div class="mr20">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>{{$t("mine.mycard.No")}}</th>
                                <th>{{$t("mine.mycard.bank")}}</th>
                                <th>{{$t("mine.mycard.cardnumber")}}</th>
                                <th>{{$t("mine.mycard.time")}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v,index) in cardList" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{v.bankName}}</td>
                                <td>{{v.cardNo}}</td>
                                <td>{{v.CreateTime}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {province,city} from '../../common/utils/city'
export default {
	name: 'mycard',
	data() {
		return {
            card      :  '',
            banks     :  [],                        // 请求的开户行数据
            bank      :  '',
            name      :  '',
            province  :  '',                       // 省
            city      :  '',                       // 市
            sProvince :  0,                        // 选择的省
            sCity     :  0,                        // 选择的市
            AllowCount:  0,                        // 允许绑卡的数据
            BindCount :  0,                        // 已绑卡数量
            cardList  :  [],                       // 已绑卡数据

		}
	},
	methods: {
		doSubmit(){
            // 判断不为空
            if(this.card==''){
                // 判断银行卡
                this.$vux.toast.show({
                    text: this.$t('mine.setting.tips.card'),
                    type: 'warn'
                })
                return;
            }
            if(this.bank==''){
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
                bankName    :   this.bank,
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
        }
    },
    watch:{
        sProvince(){
            // 省市联动
            this.city = city[this.sProvince]
            this.sCity = 0
        }
    },
	mounted() {
        this.province = province
        this.city     = city[0]
        this.GetBindBankInfo()
        this.GetBindBankCardList()
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
.province{
    display: flex;
    justify-content: space-between;
    .wd{
        width: 300px;
    }
}
.sbank{
    padding: 0.133333rem 0.2rem;
    display: flex;
    .title{
        width: 3rem;
        font-size:0.45rem;
    }
}
.cardlist{
    .tips{
        .bindnum{
            color:$font-red;
        }
        font-size:24px;
    }
    .table{
        width: 100%;
        border-collapse:collapse;
        border: 0.01rem solid $border-line;
        th{
            border:$border-line 0.01rem solid;
            background:$bg-border;
        }
        td{
            border-bottom: 0.01rem solid $border-line;
            padding:15px 0;
            text-align: center;
        }
    }
}
</style>