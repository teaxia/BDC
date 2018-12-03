<template>
	<div class="changeassets padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('wallet.tips.change')"></x-header>
		<div class="main-container">
            <v-grid>
                <div class="assets">
                    <ul>
                        <li><i class="iconfont icon-Passingassets"></i>{{$t("wallet.tips.capitalassets")}}：<span>{{fixedAssets}}</span><span class="fr">BDC</span></li>
                        <li><i class="iconfont icon-xiaohongqi01"></i>{{$t("wallet.tips.actassets")}}：<span>{{actAssets}}</span><span class="fr">BDC</span></li>
                        <li><i class="iconfont icon-Gameassets"></i>{{$t("wallet.tips.gameassets")}}：<span>{{gameAssets}}</span><span class="fr">CNY</span></li>   
                    </ul>
                </div>
            </v-grid>
            <v-grid class="mr20">
            <div class="assets">
                <flexbox class="changelist line-b">
                    <flexbox-item :span="3">
                        <div class="changename">
                            {{$t("wallet.tips.changetype")}}:
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="5">
                        <Select v-model="type">
                            <Option v-for="(v,index) in dlist" :key="index" :value="v.value">{{v.label}}</Option>
                        </Select>
                    </flexbox-item>
                </flexbox>
                <flexbox class="changelist line-b">
                    <flexbox-item :span="3">
                        <div class="changename">
                            {{$t("wallet.tips.transfor")}}{{feus[type]}}：
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="5">
                        <input type="number" v-model="num" :placeholder="$t('global.entry')+feus[type]+$t('global.num')" />
                    </flexbox-item>
                </flexbox>
                <flexbox class="changelist line-b">
                    <flexbox-item :span="3">
                        <div class="changename">
                            {{$t("wallet.tips.safetycode")}}：
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <input type="password" v-model="password" :placeholder="$t('wallet.tips.inputcode')" />
                    </flexbox-item>
                </flexbox>
                <div class="change-rate" v-if="type!=1">
                    <div class="rate line-b"><span>BDC{{$t('global.price')}}:</span>{{PriceBDC}}</div>
                    <div class="rate line-b"><span>{{$t('global.exchange')}}:</span>{{DHL}}</div>
                    <div class="rate">
                        <span v-if="type!=3">CNY:</span>
                        <span v-else>BDC:</span>{{matchprice}}
                    </div>
                </div>
            </div>
            </v-grid>
            <button @click="TransferAssets()" class="btn btn-block btn-round mr30">{{$t('wallet.tips.btntransfor')}}</button>
		</div>
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
            dlist       :   [
                {
                    value: '1',
                    label: this.$t("wallet.transfor.type1")
                },
                {
                    value: '2',
                    label: this.$t("wallet.transfor.type2")
                },
                {
                    value: '3',
                    label: this.$t("wallet.transfor.type3")
                }
            ],
            isHandling  :   false
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
        // num(){
        //     this.num = (this.num<0)?0:this.num;
        //     switch (this.type){
        //         case '1':
        //             //限制不能大于固定资产
        //              this.num = (this.num>this.fixedAssets)?this.fixedAssets:this.num;
        //             break;
        //         case '2':
        //             // 限制不能大于通证资产
        //             this.num = (this.num>this.actAssets)?this.actAssets:this.num;
        //             this.matchprice = (this.num*this.X).toFixed(8);
        //             break;
        //         case '3':
        //             // 限制不能大于游戏资产
        //             this.num = (this.num>this.gameAssets)?this.gameAssets:this.num;
        //             this.matchprice = (this.num/this.X).toFixed(8);
        //             break;
        //         default:
        //             this.matchprice = 0;
        //             break;
        //     }
        // }
    },
	methods: {
		GetAccount(){
			this.$server.post(
			'GetAccountById',
			{
				guid : this.$storage.get('guid')
			},
			).then(data => {
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
			},
			).then(data => {
				if(data){
                    this.traninfo = data;
                    this.PriceBDC = data[0].PriceBDC;
                    this.DHL      = data[0].DHL;
                    this.X        = data[0].X;
				}
			})
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
            if(this.isHandling){
                return;
            }
            this.isHandling = true;
            this.$server.post(
			'TransferAssets',
			{
                guid            :   this.$storage.get('guid'),
                Money           :   this.num,
                TransferType    :   this.type,
                MoneyPwd        :   this.password,
                dhl             :   this.DHL,
                currencyPrice   :   this.PriceBDC

			},
			).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
                    this.GetAccount();
                    this.isHandling = false;
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