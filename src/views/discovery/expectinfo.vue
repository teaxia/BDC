<template>
	<div class="expectinfo padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.expectinfo.title')"></x-header>
        <div class="main-container">
            <div class="mr30">
                <v-grid v-for="(v,index) in expectinfo" :key="index" class="mr20">
                    <div class="pd-lb20">
                        <flexbox>
                            <flexbox-item :span="9">
                                <div class="exp-grid-center">
                                    <div class="bd title">{{v.ExpectNo}}<span v-if="v.IsCanBuy" class="hot">{{$t('discovery.expectinfo.hot')}}</span></div>
                                    <div class="bd">
                                        <div class="bar_jd fl">
                                            <div class="bar_jds" :style="`width:`+v.Percent+`%`"></div>
                                        </div>
                                        <div class="fr">
                                            <span>{{v.Percent}}%</span>
                                        </div>
                                    </div>
                                    <div class="bd hl">{{$t('discovery.expectinfo.issue')}}：{{v.TotalCurrencyNum}}</div>
                                </div> 
                            </flexbox-item>
                            <flexbox-item>
                                <div class="exp-grid-center">
                                    <button v-if="!v.IsCanBuy&&v.Percent!='100'" class="btn btn-min btn-round btn-disabled">{{$t('discovery.expectinfo.notbuy')}}</button>
                                    <button v-else-if="v.Percent=='100'" class="btn btn-min btn-round btn-disabled">{{$t('discovery.expectinfo.success')}}</button>
                                    <button @click="onTourl('/discovery/expectinfo/btob')" v-if="v.IsCanBuy" class="btn btn-min btn-round">{{$t('discovery.expectinfo.b2b')}}</button>
                                    <!-- <button @click="onTourl('/discovery/expectinfo/cash')" v-if="v.IsCanBuy" class="btn btn-min btn-round mr10">{{$t('discovery.expectinfo.cash')}}</button> -->
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