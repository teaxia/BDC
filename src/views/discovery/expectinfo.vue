<template>
	<div class="expectinfo" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="兑换BDC"></x-header>
        <div class="main-container">
            <div class="mr30">
                <v-grid v-for="(v,index) in expectinfo" :key="index" class="mr20">
                    <div class="pd-lb20">
                        <flexbox>
                            <flexbox-item :span="9">
                                <div class="exp-grid-center">
                                    <div class="bd title">{{v.ExpectNo}}<span v-if="v.IsCanBuy" class="hot">正在热购</span></div>
                                    <div class="bd">
                                        <div class="bar_jd fl">
                                            <div class="bar_jds" v-if="v.IsCanBuy"  :style="`width:`+v.Percent+`%`"></div>
                                            <div class="bar_jds" v-else style="width:100%"></div>
                                        </div>
                                        <div class="fr">
                                            <span v-if="v.IsCanBuy">{{v.Percent}}%</span>
                                            <span v-else>100%</span>
                                        </div>
                                    </div>
                                    <div class="bd hl">本期发行量：{{v.TotalCurrencyNum}}</div>
                                </div>
                            </flexbox-item>
                            <flexbox-item>
                                <div class="exp-grid-center">
                                    <button v-if="!v.IsCanBuy" class="btn btn-xs btn-round btn-disabled">未开启</button>
                                    <button @click="onTourl('/discovery/expectinfo/btob')" v-if="v.IsCanBuy" class="btn btn-xs btn-round">币币兑换</button>
                                    <button @click="onTourl('/discovery/expectinfo/cash')" v-if="v.IsCanBuy" class="btn btn-xs btn-round mr10">现金兑换</button>
                                </div>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </v-grid>
            </div>
        </div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
        name:'expectinfo',
		data() {
			return {
				expectinfo:[],
			}
        },
        watch:{
            
        },
		methods: {
            onTourl(url){
                this.$router.push({
                    path:url,
                });
            }
		},
		mounted() {
            // 获取详情
            this.$server.post(
			'GetBuyExpectInfo',
			{
				guid 	:  this.$storage.get('guid'),
			},
			).then(data => {
				if(data){
                    this.expectinfo = data;
				}
			})
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/expectinfo";
</style>