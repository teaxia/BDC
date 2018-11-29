<template>
	<div class="btob padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.btob.title')"></x-header>
        <div class="main-container">
            <div class="title">
                {{$t('discovery.btob.changtype')}}：
                <Select v-model="act" class="select">
                    <Option v-for="item in blist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="mr50">
                <v-grid>
                    <div class="pd-lb20">
                        <flexbox class="vux-1px-b pb">
                            <flexbox-item :span="4">
                                <svg class="sicon" aria-hidden="true">
                                    <use :xlink:href="`#icon-`+act"></use>
                                </svg>
                                <span class="bdc">{{act}}</span>
                            </flexbox-item>
                            <flexbox-item class="bdc">
                                {{$t('discovery.btob.proportion')}}：1:{{proportion}}
                            </flexbox-item>
                        </flexbox>
                        <flexbox class="mr20 pb">
                            <flexbox-item :span="6">
                                <input type="number" v-model="num" :placeholder="$t('discovery.btob.num')"/>
                            </flexbox-item>
                            <flexbox-item>
                                <div class="price">{{price}}(BDC)</div>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </v-grid>
            </div>
            <div class="mr20">
                <flexbox class="vux-1px-b pb">
                    <flexbox-item :span="2">
                        {{$t('discovery.btob.address')}}：
                    </flexbox-item>
                    <flexbox-item :span="8">
                        <div class="text">{{this.address}}</div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="copy" v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('wallet.receive.copy')}}</div>
                    </flexbox-item>
                </flexbox>
            </div>
            <button @click="submit()" class="btn btn-block btn-round mr40">{{$t('discovery.btob.submit')}}</button>
        </div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
        name:'btob',
		data() {
			return {
                act         :   'BTC',
                blist       :   [
                    {
                        value: 'BTC',
                        label: 'BTC'
                    },
                    {
                        value: 'DASH',
                        label: 'DASH'
                    },
                    {
                        value: 'ETH',
                        label: 'ETH'
                    },
                ],
                btobinfo    :   [],
                num         :   '',
                address     :   '',
                proportion  :   '',
                price       :   '',
                isok        :   false,
                currency    :   [],
			}
        },
        watch:{
            act(){
                this.num    =   '';
                this.price  =   '';
                switch(this.act){
                    case "BTC":
                        this.address = this.btobinfo.RechargeAddressBTC;            // 兑换地址
                        this.proportion = this.btobinfo.PriceBTC/this.btobinfo.PriceBDC;
                    break;
                    case "DASH":
                        this.address = this.btobinfo.RechargeAddressDASH;            // 兑换地址
                        this.proportion = this.btobinfo.PriceDASH/this.btobinfo.PriceBDC;
                    break;
                    case "ETH":
                        this.address = this.btobinfo.RechargeAddressETH;            // 兑换地址
                        this.proportion = this.btobinfo.PriceETH/this.btobinfo.PriceBDC; 
                    break;
                }
            },
            num(){
                this.num = (this.num<0)?0:this.num;
                switch(this.act){
                    case "BTC":
                        this.price = (this.num*(this.btobinfo.PriceBTC/this.btobinfo.PriceBDC)).toFixed(8);
                    break;
                    case "DASH":
                        this.price = (this.num*(this.btobinfo.PriceDASH/this.btobinfo.PriceBDC)).toFixed(8);
                    break;
                    case "ETH":
                        this.price = (this.num*(this.btobinfo.PriceETH/this.btobinfo.PriceBDC)).toFixed(8);
                    break;
                }
            }
        },
		methods: {
            onCopy: function (e) {
				this.$vux.toast.show({
					text: this.$t('wallet.receive.tips.success'),
					type: 'success'
				})
			},
			onError: function (e) {
				this.$vux.toast.show({
					text: this.$t('wallet.receive.tips.error'),
					type: 'warn'
				})
            },
            submit(){
                // 获取详情
                if(this.isok){
                    return;
                }
                if(this.num==''){
                    this.$vux.toast.show({
                        text: this.$t('discovery.btob.null'),
                        type: 'warn'
                    })
                }
                this.isok = true;
                this.$server.post(
                'AddRechargeByBB',
                {
                    guid 	        :   this.$storage.get('guid'),
                    CurrencyNum     :   this.price,                          // 价格
                    OutCurrencyNum  :   this.num,
                    CurrencyName    :   this.act,
                    RechargeAddress :   this.address
                },
                ).then(data => {
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
                    this.isok = false;
                })
            }
		},
		mounted() {
            // 获取详情
            this.$server.post(
			'GetBBInfo',
			{
				guid 	:  this.$storage.get('guid'),
			},
			).then(data => {
				if(data){
                    this.btobinfo = data;
                    this.address  = data.RechargeAddressBTC;                                    // 兑换地址
                    this.proportion = this.btobinfo.PriceBTC/this.btobinfo.PriceBDC;            // 兑换比例 
				}
            })


        },
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/btob";
</style>