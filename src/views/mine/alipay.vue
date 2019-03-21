<template>
	<div class="mycard" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.setting.alipay')"></x-header>
        <div class="pd50">
            <div class="enterfrom">
                <group>
                    <x-input class="test" type="text" title="支付宝" required placeholder="请输入支付宝账号" v-model="card">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="text" :title="$t('mine.setting.name')" v-model="name" required :placeholder="$t('mine.setting.tips.name')">
                    </x-input>
                </group>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
            <div class="mr50 cardlist">
                <div class="tips">
                    <p>{{$t("mine.mycard.tip")}}:</p>
                    <p>1、每个游戏账户最多绑定<span class="bindnum">{{AllowCount}}</span>个支付宝账号，您已经成功绑定<span class="bindnum">{{BindCount}}</span>个</p>
                    <p>2、一个账户只能绑定同一个开户人姓名的支付宝</p>
                </div>
                <div class="mr20">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>{{$t("mine.mycard.No")}}</th>
                                <!-- <th>{{$t("mine.mycard.bank")}}</th> -->
                                <th>支付宝账号</th>
                                <th>{{$t("mine.mycard.time")}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v,index) in cardList" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{v.cardNo}}</td>
                                <td>{{v.CreateTime}}</td>
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
    </div>
</template>

<script>
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
            AllowCount:  0,                        // 允许绑卡的数据
            BindCount :  0,                        // 已绑卡数量
            cardList  :  [],                       // 已绑卡数据
            orderbank :  '',                       // 其他银行
            show      :	 false,         		   // 跳转至强制认证界面
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
        goauth () { 
            this.$router.push({
                path:"/mine/myhome",
            });
        },
    },
    watch:{
    },
	mounted() {
        // 更新个人中心资料
        this.GetAccount();
        this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
        if(this.realname==this.$t('global.Uncertified')){
            this.show = true;
        }
        // this.GetBindBankInfo()
        // this.GetBindBankCardList()
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
.select{
    border: 0.02rem solid #dcdee2;
    background:#fff;
    border-radius: 5px;
    height: 1rem;
    font-size:30px;
}
</style>