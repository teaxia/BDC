<template>
	<div class="mycard margin-header" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.OTC.Selltitle')"></x-header>
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
                <div v-if="Poundage>0">
                    <div class="price">
                        {{$t('discovery.OTC.sell.reference')}}：{{ConsultPirce}}
                    </div>
                    <div class="fax">
                        {{$t('discovery.extract.tax')}}：{{Poundage}}% 
                    </div>
                    <div class="fax">
                    {{$t('discovery.OTC.sell.odeduction')}} ：{{$numberComma(amount)}}
                    </div>
                </div>
            </div>
            <div class="enterfrom">
                <div class="line-b sbank">
                    <div class="title wd">
                        {{$t('discovery.OTC.sell.selectCurreny')}}
                    </div>
                    <Select v-model="currency">
                        <Option v-for="(v,index) in BDClist" :value="index" :key="v.Key">{{ v.Key }}</Option>
                    </Select>
                </div>
                <group>
                    <x-input class="test" type="text" :title="$t('discovery.OTC.sell.num')"  :placeholder="$t('discovery.OTC.sell.input.num2')" v-model="num">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="text" :title="$t('discovery.OTC.sell.price')"  :placeholder="$t('discovery.OTC.sell.input.price')" v-model="price">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="text" :title="$t('discovery.OTC.sell.minNum')"  :placeholder="$t('discovery.OTC.sell.input.minNum')" v-model="minNum">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" :type="type?'text':'password'" :title="$t('discovery.OTC.sell.security')" v-model="password"  :placeholder="$t('discovery.OTC.sell.security')">
                        <i slot="right" @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group>
                <group>
                    <div class="weui-cells vux-no-group-title">
                        <div class="vux-x-input weui-cell test">
                            <div class="weui-cell__hd">
                                <label for="vux-x-input-48lhl" class="weui-label" style="width: 4em;">{{$t('discovery.OTC.sell.sale')}}</label>
                            </div>
                            <div class="weui-cell__bd weui-cell__primary">
                                <i-switch size="large" v-model="isSellOn">
                                    <span slot="open">{{$t('discovery.OTC.sell.up')}}</span>
                                    <span slot="close">{{$t('discovery.OTC.sell.down')}}</span>
                                </i-switch>
                            </div>
                        </div>
                    </div>
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
            <vpopup :leftText="$t('discovery.OTC.sell.close')" :titleText="$t('discovery.OTC.sell.payment')" :rightText="$t('global.ok')" @onLeftText="cancelPupop(PayType)" @onRightText="okPupop(PayType)" v-model="showPupop">
                <div slot="list">
                    <div v-if="PayType==0" class="selectbox">
                        <!-- 微信二维码-昵称-时间 -->
                        <RadioGroup v-model="wechartId" vertical class="radio">
                            <Radio :label="v.Id" v-for="(v,index) in bankinfo" :key="index" v-if="v.thirdName=='微信'" class="radio-lable">
                                <div class="cell" @click="pierce('wechart',v.Id)">
                                    <div>{{v.thirdNickName}}</div>
                                    <div>{{v.CreateTime}}</div>
                                </div>
                            </Radio>
                            <div v-if="!PayNum" class="bind">
                                <router-link to="/mine/wechart">
                                    {{$t('discovery.OTC.sell.bindwechart')}}
                                </router-link>
                            </div>
                        </RadioGroup>
                    </div>
                    <div v-if="PayType==1" class="selectbox">
                        <!-- 支付宝-昵称-时间 -->
                        <RadioGroup v-model="alipayId" vertical class="radio">
                            <Radio :label="v.Id" v-for="(v,index) in bankinfo" :key="index" v-if="v.thirdName=='支付宝'" class="radio-lable">
                                <div class="cell" @click="pierce('alipay',v.Id)">
                                    <div>{{v.thirdAccountName}}</div>
                                    <div>{{v.thirdNickName}}</div>
                                </div>
                            </Radio>
                            <div v-if="!PayNum" class="bind">
                                <router-link to="/mine/alipay">
                                    {{$t('discovery.OTC.sell.bindalipay')}}
                                </router-link>
                            </div>
                        </RadioGroup>
                    </div>
                    <div v-if="PayType==2" class="selectbox">
                        <!-- 银联 -->
                        <RadioGroup v-model="bankId" vertical class="radio">
                            <Radio :label="v.Id" v-for="(v,index) in cardinfo" v-if="v.bankName" :key="index" class="radio-lable">
                                <div class="cell" @click="pierce('cardpay',v.Id)">
                                    <div class="text">{{v.bankName}}</div>
                                    <div class="text">{{v.cardNo}}</div>
                                </div>
                            </Radio>
                            <div v-if="!cardinfo" class="bind">
                                <router-link to="/mine/mycard">
                                    {{$t('discovery.OTC.sell.bindcard')}}
                                </router-link>
                            </div>
                        </RadioGroup>
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
            num         :  '',                        // 发布数量
            password    :  '',                        // 安全码
            currency    :  0,                         // 选择的币种
            show        :	 false,         		  // 跳转至强制认证界面
            alipay      :  false,                     // 支付宝
            cardpay     :  false,                     // 银行卡
            wechart     :  false,                     // 微信支付
            price       :  '',                        // 单价
            ConsultPirce:   '',
            BDClist     :    [],                      // 币种以及参考价
            cName       :  '',                        // 币种名称
            bankinfo    : [],                         // 支付方式的信息
            cardinfo    :   [],                       // 绑定的银行卡信息
            showPupop   : false,                      // 支付选择弹窗
            PayType     : 0,                          // 0微信/1支付宝/2银联
            wechartId   : '',                         // 微信支付ID
            alipayId    : '',                         // 支付宝支付ID
            bankId      : '',                         // 银联支付ID
            isSellOn    :   true,                     // 是否立即上架
            PayNum      :   '',                       // 有多少绑定数据
            minNum      :   '',                       // 最低限额
            type	    :   false,		              // 切换密码状态'
            Poundage    :   '',                       // 手续费
            Key         :   '',
            amount      :   0,                       // 实际到账
		}
	},
	methods: {
		doSubmit(){
            // 判断不为空
            if(this.num==''||!pattern["Pattern.RealNo"].test(this.num)){
                // 判断数量
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.num'),
                    type: 'warn'
                })
                return;
            }
            if(!pattern["Pattern.Positive.Integer.Two.Point"].test(this.num)){
                // 判断小数
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.input.num2'),
                    type: 'warn'
                })
                return;
            }
            if(!pattern["Pattern.Positive.Integer.Two.Point"].test(this.minNum)){
                // 判断小数
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.input.num2'),
                    type: 'warn'
                })
                return;
            }
            
            if(this.cName==''){
                // 判断选择币种
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.cName'),
                    type: 'warn'
                })
                return;
            }
            if(this.price==''){
                // 判断单价
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.price'),
                    type: 'warn'
                })
                return;
            }
            if(this.minNum==''){
                // 判断单价
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.minNum'),
                    type: 'warn'
                })
                return;
            }
            
            if(this.alipayId==''&&this.bankId==''&&this.wechartId==''){
                // 判断是否有支付方式
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.payment'),
                    type: 'warn'
                })
                return;
            }
            if(this.password==''){
                // 判断单价
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.security'),
                    type: 'warn'
                })
                return;
            }
            // 提交发布信息
            this.$server.post(
            'OTC_SellGoods',{
                guid 	    :   this.$storage.get('guid'),
                currenyName :   this.cName,
                currenyNum  :   this.num,
                price       :   this.price,
                minBuy      :   this.minNum,
                zfbInfoId   :   (this.alipayId)?this.alipayId:0,
                wxInfoId    :   (this.wechartId)?this.wechartId:0,
                cardInfoId  :   (this.bankId)?this.bankId:0,
                isSellOn    :   this.isSellOn,
                key         :   this.Key
            }).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
                    // 清空数据
                    // this.cName = ''
                    this.num = ''
                    this.price = ''
                    this.minNum = ''
                    // this.bankId = ''
                    // this.alipayId = ''
                    // this.wechartId = ''
                }
            })
        },
        GetBindBankInfo(){
            // 请求开户银行
            this.$server.post(
            'GetBindBankCardList',{
                guid 	:   this.$storage.get('guid'),
            }).then(data => {
                if(data){
                    this.cardinfo = data.list
                }
            })
        },
        GetBind(){
            // 请求绑定的银行卡信息
            this.$server.post(
            'GetThirdInfo',
            {
                guid : this.$storage.get('guid')
            }).then(data => {
                if(data){
                    this.bankinfo = data
                }
            })
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
            // 开启弹窗选择
            this.showPupop = true
            // 给该支付方式赋值
            this.PayType   = val
            // 判断是否绑定该支付方式
            let _that = this
            switch (val) {
                case 0:
                    //  微信支付
                    this.bankinfo.forEach(function(item,i,arr){
                        let p = false
                        if(item.thirdName=='微信'){
                            _that.PayNum = true
                        }
                    });
                break;
                case 1:
                    // 支付宝
                    this.bankinfo.forEach(function(item,i,arr){
                        let p = false
                        if(item.thirdName=='支付宝'){
                            _that.PayNum = true
                        }
                    });
                break;
            }
        },
        select(val,type,hide=true){
            // 接受的支付方式'
            var _this = this
            switch (val) {
                case 'alipay':
                    (type)?this.alipay = true:this.alipay = false
                    if(hide){
                        this.$vux.toast.show({
                            text        :   (_this.alipay)?this.$t('discovery.OTC.sell.tips.openalipay'):this.$t('discovery.OTC.sell.tips.offalipay'),
                            position    :   'default',
                            type        :   'text'
                        })
                    }
                break;
                case 'cardpay':
                    (type)?this.cardpay = true:this.cardpay = false
                    if(hide){
                        this.$vux.toast.show({
                            text        :   (_this.cardpay)?this.$t('discovery.OTC.sell.tips.opencard'):this.$t('discovery.OTC.sell.tips.offcard'),
                            position    :   'default',
                            type        :   'text'
                        })
                    }
                break;
                case 'wechart':
                    (type)?this.wechart = true:this.wechart = false
                    if(hide){
                        this.$vux.toast.show({
                            text        :   (_this.wechart)?this.$t('discovery.OTC.sell.tips.openwechart'):this.$t('discovery.OTC.sell.tips.offwechart'),
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
                    this.price          =   this.ConsultPirce
                }
            })
        },
        cancelPupop(val){
            // 取消选择 0微信/1支付宝/2银联
            this.showPupop = false
            switch (val) {
                case 0:
                    this.wechartId  =   ''
                    this.select('wechart')
                break;
                case 1:
                    this.alipayId   =  ''
                    this.select('alipay')
                break;
                case 2:
                    this.bankId     =   ''
                    this.select('cardpay')
                break;
            }
        },
        okPupop(val){
            // 确定选择 0微信/1支付宝/2银联
            switch (val) {
                case 0:
                    if(this.wechartId==''){
                        this.$vux.toast.show({
                            text        :   this.$t('discovery.OTC.sell.tips.selectbank'),
                            position    :   'default',
                            type        :   'warn'
                        })
                        return;
                    }
                    this.select('wechart',true)
                break;
                case 1:
                    if(this.alipayId==''){
                        this.$vux.toast.show({
                            text        :   this.$t('discovery.OTC.sell.tips.selectbank'),
                            position    :   'default',
                            type        :   'warn'
                        })
                        return;
                    }
                    this.select('alipay',true)
                break;
                case 2:
                    if(this.bankId==''){
                        this.$vux.toast.show({
                            text        :   this.$t('discovery.OTC.sell.tips.selectbank'),
                            position    :   'default',
                            type        :   'warn'
                        })
                        return;
                    }
                    this.select('cardpay',true)
                break;
            }
            this.showPupop = false
        },
        pierce(val,id){
            // 选择银行卡等的事件穿透
            switch (val) {
                case 'alipay':
                    this.alipayID = id
                break;
                case 'cardpay':
                    this.bankId   = id
                break;
                case 'wechart':
                    this.wechartId = id
                break;
            }
        },
        changType(){
			this.type = !this.type
        },
        GetPoundage(){
            this.$server.post(
            'OTC_GetPoundage_OTC',
            {
                guid : this.$storage.get('guid')
            }).then(data => {
                if(data){
                    this.Poundage   =   (data.Poundage*100).toFixed(2)
                    this.Key        =   data.key
                }
            })
        }
    },
    watch:{
        currency(){
            this.ConsultPirce =     this.BDClist[this.currency].Value
            this.cName        =     this.BDClist[this.currency].Key
        },
        num(){
            // 计算手续费
            let i    =   this.$math.add(1,(this.Poundage/100).toFixed(2))
            this.amount     =   (this.num*i).toFixed(8)
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
        this.GetBindBankInfo()
        // 
        // 默认币种参考价
        this.OTCGetCurrenyPrice()
        this.GetPoundage()
    }
}
</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otcsell";
</style>