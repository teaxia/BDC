<template>
	<div class="OTCSell" v-cloak>
        <div class="pb">
            <div class="title-tool">
                <Dropdown trigger="click" @on-click="change" class="OTCSellBuy-drop">
                    <div class="btn btn-min-x btn-round btn-buy">
                        {{$t('discovery.OTC.demand.title')}}
                        <i class="iconfont icon-sanjiao_xia"></i>
                    </div>
                    <DropdownMenu slot="list">
                        <DropdownItem :name="'/OTC/sell'">{{$t('discovery.OTC.Selltitle')}}</DropdownItem>
                        <DropdownItem :name="'/OTC/demand'">{{$t('discovery.OTC.demand.title')}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div class="price">
                    {{$t('discovery.OTC.sell.reference')}}：{{ConsultPirce}}
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
                    <x-input class="test" type="text" :title="$t('discovery.OTC.demand.num')"  :placeholder="$t('discovery.OTC.demand.num')" v-model="Num">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="text" :title="$t('discovery.OTC.sell.price')"  :placeholder="$t('discovery.OTC.demand.price')" v-model="price">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="text" :title="$t('discovery.OTC.sell.minNum')" :show-clear="false" v-model="minBuy">
                        <div slot="right" style="font-size:0.35rem;">CNY</div>
                    </x-input>
                </group>
                <div class="line-b sbank">
                    <div class="title-psw wd">
                        {{$t('discovery.OTC.sell.Range')}}
                    </div>
                    <div class="psw">
                        <RadioGroup v-model="animal">
                            <Radio label="all"><span class="label-info">{{$t('discovery.OTC.sell.all')}}</span></Radio>
                            <Radio label="cn"><span class="label-info">{{$t('discovery.OTC.sell.cn')}}</span></Radio>
                            <Radio label="cw"><span class="label-info">{{$t('discovery.OTC.sell.cw')}}</span></Radio>
                        </RadioGroup>
                    </div>
                </div>
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
            <Modal v-model="showPSwed" :mask-closable="false" @on-ok="doSubmit()">
                <div slot="header">
                    {{$t('wallet.tips.inputcode')}}
                </div>
                <div class="modal-body security">
                    <group>
                        <x-input class="test" :type="type?'text':'password'" :title="$t('discovery.OTC.sell.security')" v-model="password" :placeholder="$t('discovery.OTC.sell.security')">
                            <i slot="right" @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
                        </x-input>
                    </group>
                </div>
            </Modal>
            <div class="select-pay">
                <i @click="sbankd(1)" :class="{'iconfont':true,'icon-zhifubao':true,'alipay':alipay}"></i>
                <i @click="sbankd(2)" :class="{'iconfont':true,'icon-yinhangqia':true,'cardpay':cardpay}"></i>
                <i @click="sbankd(0)" :class="{'iconfont':true,'icon-weixinzhifu':true,'wechart':wechart}"></i>
            </div>
            <button @click="ShowPSW()" class="btn btn-block btn-default btn-round">{{ $t("global.submit") }}</button>
        </div>
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
            Num         :  '',                        // 发布数量
            password    :  '',                        // 安全码
            currency    :  0,                         // 选择的币种
            show        :  false,         		      // 跳转至强制认证界面
            alipay      :  false,                     // 支付宝
            cardpay     :  false,                     // 银行卡
            wechart     :  false,                     // 微信支付
            price       :  '',                        // 单价
            ConsultPirce:   '',
            BDClist     :    [],                      // 币种以及参考价
            cName       :  '',                        // 币种名称
            isSellOn    :   true,                     // 是否立即上架
            showPSwed   :   false,                    // 显示安全密码弹窗
            type        :   false,
            animal      :   'all',
            showVersion :   '',
            minBuy      :   100,                         // 最低购买额
		}
	},
	methods: {
		doSubmit(){
            if(this.password==''){
                // 判断安全码
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.security'),
                    type: 'warn'
                })
                return;
            }
            if(this.minBuy==''){
                // 判断最低限额
                this.$vux.toast.show({
                    text: '最低限额不能为空',
                    type: 'warn'
                })
                return;
            }
            if(this.animal=='all'){
                this.showVersion    =   ''
            }else{
                this.showVersion    =   this.animal
            }
            this.$server.post(
            'OTC_BuyGoods',{
                guid 	    :   this.$storage.get('guid'),
                currenyName :   this.cName,
                currenyNum  :   this.Num,
                price       :   this.price,
                isSellOn    :   this.isSellOn,
                supportZFB  :   this.alipay,
                supportWX   :   this.wechart,
                supportCard :   this.cardpay,
                moneyPwd    :   this.password,
                showVersion :   this.showVersion,
                minBuy      :   this.minBuy
            }).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
                    // 成功返回列表
                    this.$router.push({
                        path:"/OTC/OTCSellBuy",
                        query:{
                            active : true,
                        }
                    });
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
        change(name){
            // 发布售币、发布求购切换
            this.$router.push({
                path:name,
            });
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
        sbankd(type){
            let _this = this
            switch (type) {
                case 1:
                    this.alipay = !this.alipay
                    this.$vux.toast.show({
                        text        :   (_this.alipay)?_this.$t('discovery.OTC.tips.salipay'):_this.$t('discovery.OTC.tips.oalipay'),
                        position    :   'default',
                        type        :   'text'
                    })
                break;
                case 0:
                    this.wechart = !this.wechart
                    this.$vux.toast.show({
                        text        :   (_this.wechart)?_this.$t('discovery.OTC.tips.swechart'):_this.$t('discovery.OTC.tips.owechart'),
                        position    :   'default',
                        type        :   'text'
                    })
                break;
                case 2:
                    this.cardpay = !this.cardpay    
                    this.$vux.toast.show({
                        text        :   (_this.cardpay)?_this.$t('discovery.OTC.tips.scard'):_this.$t('discovery.OTC.tips.ocard'),
                        position    :   'default',
                        type        :   'text'
                    })
                break;
                
            }
        },
        ShowPSW(){
            // 判断不为空
            if(this.Num==''){
                // 判断数量
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.num'),
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
            if(!this.alipay&&!this.cardpay&&!this.wechart){
                // 判断是否有支付方式
                this.$vux.toast.show({
                    text: '必须选择一种付款方式',
                    type: 'warn'
                })
                return;
            }
            this.showPSwed = true
        }
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
        // 默认币种参考价
        this.OTCGetCurrenyPrice()
    }
}
</script>

<style scoped lang="scss">
@import "../../scss/views/otc/otcsell";
</style>