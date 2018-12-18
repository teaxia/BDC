<template>
	<div class="btob padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.btob.title')"></x-header>
        <div class="main-container">
            <div class="title">
                {{$t('discovery.btob.changtype')}}：
                <Select v-model="act" class="select">
                    <Option v-for="(item,index) in blist" :value="index" :key="index">{{ item.Name }}</Option>
                </Select>
            </div>
            <div class="mr50">
                <v-grid>
                    <div class="pd-lb20">
                        <flexbox class="vux-1px-b pb">
                            <flexbox-item :span="4">
                                <svg class="sicon" aria-hidden="true">
                                    <use :xlink:href="`#icon-`+actBB"></use>
                                </svg>
                                <span class="bdc">{{actBB}}</span>
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
                        {{$t('discovery.btob.address')}}:
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
                act         :   0,
                blist       :   [],
                actBB       :   'BTC',
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
                this.num        =   '';
                this.price      =   '';
                let i           =   this.act
                this.address    =   this.blist[i].RechargeAddress
                this.proportion =   this.blist[i].Proportion
                this.actBB      =   this.blist[i].Name
            },
            num(){
                let i           =   this.act
                this.num = (this.num<0)?0:this.num;
                this.price = (this.num*this.blist[i].Proportion).toFixed(8);
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
                    return
                }
                if(this.num==''){
                    this.$vux.toast.show({
                        text: this.$t('discovery.btob.null'),
                        type: 'warn'
                    })
                    return
                }
                this.isok = true;
                this.$server.post(
                'AddRechargeByBB',
                {
                    guid 	        :   this.$storage.get('guid'),
                    CurrencyNum     :   this.price,                          // 价格
                    OutCurrencyNum  :   this.num,
                    CurrencyName    :   this.blist[this.act].Name,
                    RechargeAddress :   this.address
                }).then(data => {
                    if(data){
                        this.$vux.toast.show({
                            text: this.$t('global.wait'), 
                            type: 'success'
                        })
                        this.isok = false;
                    }
                })
            },
            GetList(){
                this.$server.post(
                'GetBBInfoNew',
                {
                    guid 	        :   this.$storage.get('guid'),
                }).then(data => {
                    if(data){
                        this.blist = data;
                        this.btobinfo = data;
                        this.address  = data[0].RechargeAddress;            // 兑换地址
                        this.proportion = data[0].Proportion;               // 兑换比例 
                    }
                })
            }
		},
		mounted() {
            // 获取详情
            this.GetList();

        },
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/btob";
</style>