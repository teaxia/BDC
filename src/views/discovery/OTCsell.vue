<template>
	<div class="mycard" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" title="发布"></x-header>
        <div class="pd50">
            <div class="currency">
                <svg class="sicon" aria-hidden="true" v-if="$currency.indexOf(cName)>=0">
                    <use :xlink:href="`#icon-`+cName"></use>
                </svg>
                <Avatar v-else class="sicon avatar" style="background:#f56a00;">
                    <span class="line-height">{{cName}}</span>
                </Avatar>
                <div class="font">
                    {{cName}}
                </div>
                <div class="price">
                    参考单价：{{ConsultPirce}}
                </div>
            </div>
            <div class="enterfrom">
                <div class="line-b sbank">
                    <div class="title wd">
                        选择币种
                    </div>
                    <!-- <vselect ref="sect" v-model="currency" :Arr="BDClist.key" placeholder="选择币种"></vselect> -->
                    <Select v-model="currency">
                        <Option v-for="(v,index) in BDClist" :value="index" :key="v.Key">{{ v.Key }}</Option>
                    </Select>
                </div>
                <group>
                    <x-input class="test" type="number" title="发布数量" required placeholder="数量" v-model="num">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="number" title="价格" required placeholder="售卖价格" v-model="price">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="number" title="最低限额" required placeholder="最低购买数量" v-model="price">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="text" title="安全码" v-model="password" required placeholder="安全码">
                    </x-input>
                </group>
            </div>
            <div class="select-pay">
                <i @click="sbankd(1)" :class="{'iconfont':true,'icon-zhifubao':true,'alipay':alipay}"></i>
                <i @click="sbankd(2)" :class="{'iconfont':true,'icon-yinhangqia':true,'cardpay':cardpay}"></i>
                <i @click="sbankd(0)" :class="{'iconfont':true,'icon-weixinzhifu':true,'wechart':wechart}"></i>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round">{{ $t("global.submit") }}</button>
        </div>
        <div>
            <vpopup leftText="取消" titleText="选择收款方式" rightText="确定" @onLeftText="cancelPupop()" @onRightText="okPupop()" v-model="showPupop">
                <div slot="list">
                    <div v-if="PayType==0">
                        <!-- 微信支付/微信二维码-昵称-时间 -->
                        <flexbox class="cell">
                            <flexbox-item>账户名</flexbox-item>
                            <flexbox-item>昵称</flexbox-item>
                            <flexbox-item>创建时间</flexbox-item>
                        </flexbox>
                        <flexbox class="cell" v-for="(v,index) in bankinfo" :key="index" v-if="v.thirdName=='微信'">
                            <flexbox-item>{{v.thirdAccountName}}</flexbox-item>
                            <flexbox-item>{{v.thirdNickName}}</flexbox-item>
                            <flexbox-item>{{v.CreateTime}}</flexbox-item>
                        </flexbox>
                        
                        
                    </div>
                    <div v-if="PayType==1">
                        <!-- 微信支付/微信二维码-昵称-时间 -->
                        
                    </div>
                    <div v-if="PayType==2">
                        <!-- 银联 -->
                    </div>
                </div>
            </vpopup>
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
import pattern from '../../common/utils/pattern'
export default {
    name: 'otcsell',
    mixins:[GetAccount],
	data() {
		return {
            num       :  '',                        // 发布数量
            password  :  '',                        // 安全码
            currency  :  0,                         // 选择的币种
            show      :	 false,         		    // 跳转至强制认证界面
            alipay    :  false,                     // 支付宝
            cardpay   :  false,                     // 银行卡
            wechart   :  false,                     // 微信支付
            price     :  '',                        // 单价
            ConsultPirce:   '',
            BDClist   :    [],                      // 币种以及参考价
            cName     :  '',                        // 币种名称
            bankinfo  : [],                         // 支付方式的信息
            showPupop : false,                      // 支付选择弹窗
            PayType   : 0,                          // 0微信/1支付宝/2银联
            wechartId : '',                         // 微信支付ID
            alipayId : '',                         // 支付宝支付ID
            bankId : '',                         // 银联支付ID
		}
	},
	methods: {
		doSubmit(){
            // 判断不为空
            if(this.num==''||!pattern["Pattern.RealNo"].test(this.num)){
                // 判断数量
                this.$vux.toast.show({
                    text: '数量必须填写',
                    type: 'warn'
                })
                return;
            }
            if(this.currency==''){
                // 判断选择币种
                this.$vux.toast.show({
                    text: '请选择您要发布的币种',
                    type: 'warn'
                })
                return;
            }
            if(this.price==''){
                // 判断单价
                this.$vux.toast.show({
                    text: '单价必须填写',
                    type: 'warn'
                })
                return;
            }
            if(this.password==''){
                // 判断单价
                this.$vux.toast.show({
                    text: '安全码必须填写',
                    type: 'warn'
                })
                return;
            }
            // 提交绑定
            // this.$server.post(
            // 'BindBankCard',{
            //     guid 	    :   this.$storage.get('guid'),
            //     bankName    :   this.$refs.sect.value,
            //     cardNo      :   this.card,
            //     accountName :   this.name,
            //     pName       :   province[this.sProvince],
            //     cName       :   city[this.sProvince][this.sCity],
            // }).then(data => {
            //     if(data){
            //         this.$vux.toast.show({
            //             text: this.$t('global.success'),
            //             type: 'success'
            //         })
            //         // 清空数据
            //         this.$refs.sect.value = ''
            //         this.card = ''
            //         this.name = ''
            //         this.GetBindBankCardList();
            //     }
            // })
            
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
        GetBind(){
            this.$server.post(
            'GetThirdInfo',
            {
                guid : this.$storage.get('guid')
            }).then(data => {
                if(data){
                    this.bankinfo = data
                    console.log(this.bankinfo)
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
        sbankd(val){
            this.showPupop = true
            this.PayType   = val
        },
        select(val,hide=true){
            // 接受的支付方式'
            var _this = this
            switch (val) {
                case 'alipay':
                    this.alipay = !this.alipay
                    if(hide){
                        this.$vux.toast.show({
                            text        :   (_this.alipay)?'开启支付宝收款':'关闭支付宝收款',
                            position    :   'default',
                            type        :   'text'
                        })
                    }
                break;
                case 'cardpay':
                    this.cardpay = !this.cardpay
                    if(hide){
                        this.$vux.toast.show({
                            text        :   (_this.cardpay)?'开启银行卡收款':'关闭银行卡收款',
                            position    :   'default',
                            type        :   'text'
                        })
                    }
                break;
                case 'wechart':
                    this.wechart = !this.wechart
                    if(hide){
                        this.$vux.toast.show({
                            text        :   (_this.wechart)?'开启微信收款':'关闭微信收款',
                            position    :   'default',
                            type        :   'text'
                        })
                    }
                break;
            }
        },
        OTCGetCurrenyPrice(){
            // 获取可交易货币名称及参考价格
            this.$server.post(
            'OTC_GetCurrenyPrice',
            {
                guid : this.$storage.get('guid')
            }).then(data => {
                if(data){
                    this.BDClist  = data
                    this.cName    = data[0].Key
                    this.ConsultPirce   =   data[0].Value
                    // console.log(data[0].Value)
                }
            })
        },
        OTCSellOrderOn(){
            //
        },
        cancelPupop(){
            // 取消选择
            this.showPupop = false
        },
        okPupop(){
            // 确定选择
            this.showPupop = false
        },
    },
    watch:{
        currency(){
            this.ConsultPirce =     this.BDClist[this.currency].Value
            this.cName        =     this.BDClist[this.currency].Key
        }
    },
	mounted() {
        // 更新个人中心资料
        this.GetAccount();
        this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
        if(this.realname==this.$t('global.Uncertified')){
            this.show = true;
        }
        // 获取绑定的收款方式
        this.GetBind()
        // 
        // 默认币种参考价
        this.OTCGetCurrenyPrice()
    }
}
</script>

<style scoped lang="scss">
.sbank{
    padding: 0.133333rem 0.2rem;
    display: flex;
    .title{
        width: 3rem;
        font-size:0.45rem;
    }
}
.select{
    border: 0.02rem solid #dcdee2;
    background:#fff;
    border-radius: 5px;
    height: 1rem;
    font-size:30px;
}
.select-pay{
    .iconfont {
        font-size:60px;
    }
    .alipay{
        color:#1296db;
    }
    .cardpay{
        color:#028BF4;
    }
    .wechart{
        color:#1eb1ad;
    }
}
.btn-block{
    height: 80px;
    font-size:38px;
}
.currency{
    width: 300px;
    margin:0 auto;
    text-align: center;
    .sicon{
        width:150px;
        height: 150px;
    }
    .avatar{
        border-radius: 50%;
    }
    .line-height{
        line-height: 150px;
    }
    .font{
        font-size:42px;
        font-weight: bold;
    }
    .price{
        font-size:30px;
    }
}
</style>