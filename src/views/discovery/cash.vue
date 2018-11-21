<template>
	<div class="btob padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.cash.title')"></x-header>
        <div class="main-container">
            <h3>
                {{$t('discovery.cash.rate')}}：1BDC={{bdc}}CNY
            </h3>
            <div class="mr50">
                <v-grid>
                    <div class="pd-lb20">
                        <flexbox class="vux-1px-b pb">
                            <flexbox-item :span="3">
                                {{$t('discovery.expectinfo.title')}}
                            </flexbox-item>
                            <flexbox-item :span="5">
                                <input type="number" v-model="num" :placeholder="$t('discovery.btob.num')"/>
                            </flexbox-item>
                            <flexbox-item :span="4">
                                <div class="text-right">
                                ={{pricecny}}CNY
                                </div>
                            </flexbox-item>
                        </flexbox>
                        <flexbox class="mr20 pb vux-1px-b">
                            <flexbox-item :span="3">
                                {{$t('discovery.cash.selectbank')}}：
                            </flexbox-item>
                            <flexbox-item>
                                <Select v-model="bank">
                                    <Option v-for="(v,index) in bankinfo" :key="index" :value="index">{{v.BankName}}</Option>
                                </Select>
                            </flexbox-item>
                        </flexbox>
                        <flexbox class="mr20 pb vux-1px-b">
                            <flexbox-item :span="3">
                                {{$t('discovery.cash.cardname')}}：
                            </flexbox-item>
                            <flexbox-item :span="6">
                                {{cardname}}
                            </flexbox-item>
                            <flexbox-item>
                                <button type="button" class="btn btn-xs btn-round" v-clipboard:copy="cardname" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('wallet.receive.copy')}}</button>
                            </flexbox-item>
                        </flexbox>
                        <flexbox class="mr20 pb vux-1px-b">
                            <flexbox-item :span="3">
                                {{$t('discovery.cash.cardnumber')}}：
                            </flexbox-item>
                            <flexbox-item :span="6">
                                {{cardnumber}}
                            </flexbox-item>
                            <flexbox-item>
                                <button type="button" class="btn btn-xs btn-round" v-clipboard:copy="cardnumber" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('wallet.receive.copy')}}</button>
                            </flexbox-item>
                        </flexbox>
                        <flexbox class="mr20 pb">
                            <flexbox-item :span="3">
                                {{$t('discovery.cash.buyname')}}：
                            </flexbox-item>
                            <flexbox-item>
                                <input type="text" v-model="name" :placeholder="$t('discovery.cash.tips.buyname')"/>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </v-grid>
            </div>
            <button @click="submit()" class="btn btn-block btn-round mr40">{{$t('discovery.cash.buy')}}</button>
        </div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
        name:'btob',
		data() {
			return {
                bankinfo    :   [],
                bank        :   '2',
                bankname    :   '',   
                name        :   '',
                num         :   '',
                cardname    :   '',
                cardnumber  :   '',
                bdc         :   '',
                pricecny    :   '',
                priceusd    :   '',
                isok        :   false
			}
        },
        watch:{
            bank(){
                this.cardname     = this.bankinfo[this.bank].OpenCardName;
                this.cardnumber   = this.bankinfo[this.bank].BankCardNo;
                this.bankname     = this.bankinfo[this.bank].BankName;
            },
            num(){
                this.pricecny = this.bdc*this.num;
                this.priceusd = ((this.bdc/6.8)*this.num).toFixed(2);
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
                if(this.num==''&&this.name==''){
                    this.$vux.toast.show({
                        text: '购买数量跟购买人不能为空',
                        type: 'warn'
                    })
                    return;
                }
                this.isok = true;
                this.$server.post(
                'AddRecharge',
                {
                    guid 	        :   this.$storage.get('guid'),
                    CurrencyNum     :   this.num,                           // 购买数量
                    RMB             :   this.pricecny,                      // RMB价格
                    BankName        :   this.bankname,
                    OpenCardName    :   this.cardname,
                    BankCardNo      :   this.cardnumber,
                    saverName       :   this.name
                },
                ).then(data => {
                    this.$vux.toast.show({
                        text: '兑换成功！',
                        type: 'success'
                    })
                    this.isok = false;
                })
            }
		},
		mounted() {
            // 获取详情
            this.$server.post(
			'GetBankInfoList',
			{
				guid 	:  this.$storage.get('guid'),
			},
			).then(data => {
				if(data){
                    this.bankinfo = data;
                    this.cardname     = data[this.bank].OpenCardName;
                    this.cardnumber   = data[this.bank].BankCardNo;
                    this.bankname     = data[this.bank].BankName;
				}
            })
            // 获取价格 GetCurrencyPrice
            this.$server.post(
			'GetCurrencyPrice',
			{
                guid 	:  this.$storage.get('guid'),
                Count   :  0
			},
			).then(data => {
				if(data){
                    this.bdc =  data[0].Money;
				}
            })
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/btob";
</style>