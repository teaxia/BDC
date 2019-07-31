<template>
	<div class="changeassets padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('wallet.tips.change')"></x-header>
		<div class="main-container">
            <flexbox class="chagngeshow">
                <flexbox-item class="grid">
                    <!-- <div class="i">
                        <i class="iconfont icon-Passingassets"></i>
                    </div> -->
                    <div class="t">
                        {{$t("wallet.tips.capitalassets")}}
                    </div>
                    <div class="n">
                        {{$numberComma(fixedAssets)}}
                    </div>
                    <div>BDC</div>
                </flexbox-item>
                <flexbox-item :span="1" class="center">
                    <i class="iconfont icon-Conversion"></i>
                </flexbox-item>
                <flexbox-item class="grid">
                    <!-- <div class="i">
                        <i class="iconfont icon-xiaohongqi01"></i>
                    </div> -->
                    <div class="t">
                        {{$t("wallet.tips.actassets")}}
                    </div>
                    <div class="n">
                        {{$numberComma(actAssets)}}
                    </div>
                    <div>BDC</div>
                </flexbox-item>
            </flexbox>
            <v-grid class="mr20">
                <div class="title">等级说明</div>
                <flexbox class="vip">
                    <flexbox-item class="vip-icon">
                        <svg class="sicon" aria-hidden="true">
                            <use xlink:href="#icon-VIP1"></use>
                        </svg>
                        <span>(VIP3)：</span>
                    </flexbox-item>
                    <flexbox-item class="vip-access">
                        <span>固定资产>=10000</span>
                    </flexbox-item>
                </flexbox>
                <flexbox class="vip">
                    <flexbox-item class="vip-icon">
                        <svg class="sicon" aria-hidden="true">
                            <use xlink:href="#icon-VIP2"></use>
                        </svg>
                        <span>(VIP2)：</span>
                    </flexbox-item>
                    <flexbox-item class="vip-access">
                        <span>固定资产>=3000</span>
                    </flexbox-item>
                </flexbox>
                <flexbox class="vip">
                    <flexbox-item class="vip-icon">
                        <svg class="sicon" aria-hidden="true">
                            <use xlink:href="#icon-VIP"></use>
                        </svg>
                        <span>(VIP1)：</span>
                    </flexbox-item>
                    <flexbox-item class="vip-access">
                        <span>固定资产>=300</span>
                    </flexbox-item>
                </flexbox>
            </v-grid>
            <v-grid class="mr20">
            <div class="assets">
                <flexbox class="changelist">
                    <flexbox-item :span="3">
                        <div class="changename">
                            {{$t("wallet.tips.changetype")}}:
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="5">
                        <Select v-model="type" :disabled="true">
                            <Option v-for="(v,index) in dlist" :key="index" :value="v.value">{{v.label}}</Option>
                        </Select>
                    </flexbox-item>
                </flexbox>
                <flexbox class="changelist">
                    <flexbox-item :span="3">
                        <div class="changename">
                            {{$t("wallet.tips.transfor")}}{{feus[type]}}：
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="5">
                        <input type="text" v-model="num" :placeholder="$t('global.entry')+feus[type]+$t('global.num')" />
                    </flexbox-item>
                </flexbox>
                <!-- <flexbox class="changelist line-b">
                    <flexbox-item :span="3">
                        <div class="changename">
                            {{$t("wallet.tips.safetycode")}}：
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <input type="password" v-model="password" :placeholder="$t('wallet.tips.inputcode')" />
                    </flexbox-item>
                </flexbox> -->
                <div class="change-rate" v-if="type!=1">
                    <div class="rate line-b"><span>BDC{{$t('global.price')}}:</span>{{$numberComma(PriceBDC)}}</div>
                    <div class="rate line-b"><span>{{$t('global.exchange')}}:</span>{{DHL}}</div>
                    <div class="rate">
                        <span v-if="type!=3">CNY:</span>
                        <span v-else>BDC:</span>{{$numberComma(matchprice)}}
                    </div>
                </div>
            </div>
            </v-grid>
            <button @click="showPWD()" class="btn btn-block btn-round mr30">{{$t('wallet.tips.btntransfor')}}</button>
		</div>
        <Modal v-model="showPSwed" :mask-closable="false" @on-ok="TransferAssets()">
            <div slot="header">
                {{$t('wallet.tips.safetycode')}}
            </div>
            <div class="modal-body security">
                <group>
                    <x-input class="test" :type="pdtype?'text':'password'" :title="$t('discovery.OTC.sell.security')" v-model="password" :placeholder="$t('wallet.tips.inputcode')">
                        <i slot="right" @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group>
            </div>
        </Modal>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>

export default {
    name:'changeassets',
	data() {
		return {
            fixedAssets :   '',                                                         // 固定资产
            actAssets   :   '',                                                         // 通证资产
            gameAssets  :   '',                                                         // 游戏资产 
            type        :   '1',                                                        // 转换类型
            num         :   '',                                                         // 兑换的数量
            matchprice  :   '0',                                                        // 计算的结果
            meus        :   ['','BDC','CNY','BDC'],
            feus        :   ['','BDC','BDC','CNY'],
            traninfo    :   [],                                                         // 接收到的行情数据
            PriceBDC    :   '',
            DHL         :   '',
            X           :   '',
            password    :   '',
            key         :   '',
            showPSwed   :   false,
            pdtype      :   false,
            dlist       :   [
                {
                    value: '1',
                    label: this.$t("wallet.transfor.type1")
                },
                // {
                //     value: '2',
                //     label: this.$t("wallet.transfor.type2")
                // },
                // {
                //     value: '3',
                //     label: this.$t("wallet.transfor.type3")
                // }
            ],
		}
    },
    watch:{
        type(){
            switch (this.type){
                case '2':
                    this.PriceBDC = this.traninfo[0].PriceBDC;
                    this.DHL      = this.traninfo[0].DHL;
                    this.X        = this.traninfo[0].X;
                    this.matchprice = (this.num*this.X).toFixed(8);
                    break;
                case '3':
                    this.PriceBDC = this.traninfo[1].PriceBDC;
                    this.DHL      = this.traninfo[1].DHL;
                    this.X        = this.traninfo[1].X;
                    this.matchprice = (this.num/this.X).toFixed(8);
                    break;
                default:
                    this.PriceBDC = 0;
                    this.DHL      = 0;
                    this.X        = 0;
                    break;
            }
        },
        num(){
            this.num = (this.num<0)?0:this.num;
            switch (this.type){
                case '1':
                    //限制不能大于固定资产
                     //this.num = (this.num>this.fixedAssets)?this.fixedAssets:this.num;
                    break;
                case '2':
                    // 限制不能大于通证资产
                    //this.num = (this.num>this.actAssets)?this.actAssets:this.num;
                    this.matchprice = (this.num*this.X).toFixed(8);
                    break;
                case '3':
                    // 限制不能大于游戏资产
                    //this.num = (this.num>this.gameAssets)?this.gameAssets:this.num;
                    this.matchprice = (this.num/this.X).toFixed(8);
                    break;
                default:
                    this.matchprice = 0;
                    break;
            }
        }
    },
	methods: {
		GetAccount(){
			this.$server.post(
			'GetAccountById',
			{
				guid : this.$storage.get('guid')
			}).then(data => {
				if(data){
                    this.fixedAssets = data.FixedAssets;
                    this.actAssets   = data.ActAssets;
                    this.gameAssets  = data.GameAssets;
				}
			})
        },
        GetActGameTranInfo(){
            this.$server.post(
			'GetActGameTranInfo',
			{
				guid : this.$storage.get('guid')
			}).then(data => {
				if(data){
                    this.traninfo = data.list;
                    this.PriceBDC = data.list[0].PriceBDC;
                    this.DHL      = data.list[0].DHL;
                    this.X        = data.list[0].X;
                    this.key      = data.key
				}
			})
        },
        showPWD(){
            // 表单限制
            if(this.num==''&&this.num <= 0){
                // 数量不能为空
                this.$vux.toast.show({
                    text: this.$t('wallet.transfor.error1'),
                    type: 'warn'
                })
                return;
            }
            this.showPSwed = true
        },
        changType(){
			this.pdtype = !this.pdtype
        },
        TransferAssets(){
            // 表单限制
            if(this.num==''&&this.num <= 0){
                // 数量不能为空
                this.$vux.toast.show({
                    text: this.$t('wallet.transfor.error1'),
                    type: 'warn'
                })
                return;
            }
            if(this.password==''){
                // 安全码不能为空
                this.$vux.toast.show({
                    text: this.$t('wallet.transfor.error2'),
                    type: 'warn'
                })
                return;
            }
            this.$server.post(
			'TransferAssets',
			{
                guid            :   this.$storage.get('guid'),
                Money           :   this.num,
                TransferType    :   this.type,
                MoneyPwd        :   this.password,
                // @接口删除兑换率跟价格 直接传入key代替
                // dhl             :   this.DHL,
                // currencyPrice   :   this.PriceBDC
                key             :   this.key

			}).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
                    this.num        =   ''
                    this.password   =   ''
                    this.GetAccount();
                }
			})
        }
	},
	mounted() {
        this.GetActGameTranInfo();
		this.GetAccount();
    },
}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/changeassets";
</style>