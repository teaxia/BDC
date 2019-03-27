<template>
	<div class="expectinfo padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.expectinfo.title')"></x-header>
        <div class="main-container">
            <div class="mr30">
                <v-grid v-for="(v,index) in expectinfo" :key="index" class="mr20">
                    <div class="pd-lb20">
                        <flexbox>
                            <flexbox-item :span="7">
                                <div class="exp-grid-center">
                                    <div class="bd title">{{v.ExpectNo}}<span v-if="v.IsCanBuy" class="hot">{{$t('discovery.expectinfo.hot')}}</span><span class="fr">{{v.Percent}}%</span></div>
                                    <!-- 隐藏进度条与百分比 -->
                                    <div class="bd">
                                        <div class="bar_jd fl">
                                            <div class="bar_jds" :style="`width:`+v.Percent+`%`"></div>
                                        </div>
                                    </div>
                                    <div class="bd hl" v-if="v.IsCanBuy">{{$t('discovery.expectinfo.issued')}}：{{v.BuyCurrencyNum}}</div>
                                    <div class="bd hl">{{$t('discovery.expectinfo.issue')}}：{{v.TotalCurrencyNum}}</div>
                                </div> 
                            </flexbox-item>
                            <flexbox-item>
                                <div class="exp-grid-center">
                                    <!-- <button @click="onTourl('/discovery/expectinfo/self')" v-if="v.IsCanBuy" class="btn btn-min btn-round">{{$t('discovery.expectinfo.self')}}</button> -->
                                    <button v-if="!v.IsCanBuy&&v.Percent!='100'" class="btn btn-min btn-round btn-disabled">{{$t('discovery.expectinfo.notbuy')}}</button>
                                    <button v-else-if="v.Percent=='100'" class="btn btn-min btn-round btn-disabled">{{$t('discovery.expectinfo.success')}}</button>
                                    <button @click="onTourl('/discovery/expectinfo/btob')" v-if="v.IsCanBuy" class="btn btn-min btn-round">{{$t('discovery.expectinfo.b2b')}}</button>
                                    <!-- <button @click="onTourl('/discovery/expectinfo/cash')" v-if="v.IsCanBuy" class="btn btn-min btn-round mr10">{{$t('discovery.expectinfo.cash')}}</button> -->
                                </div>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </v-grid>
<<<<<<< HEAD
                <div>
                    <img src="http://wx3.sinaimg.cn/large/0061GFAely1g19dxl9k8lg306007r4qp.gif">
                </div>
=======
                <div class="pos">
                    <img :src="bgTop">
                    <div class="posg pos-2">
                        <!-- 固定算力 -->
                        <div>{{$t('discovery.expectinfo.fixedPos')}}</div>
                        <div>{{Pos[0]}}</div>
                    </div>
                    <div class="posg pos-4">
                        <!-- 管理算力 -->
                        <div>{{$t('discovery.expectinfo.managePos')}}</div>
                        <div>{{Pos[1]}}</div>
                    </div>
                    <div class="posg pos-3">
                        <!-- 推广算力 -->
                        <div>{{$t('discovery.expectinfo.spreadPos')}}</div>
                        <div>{{Pos[2]}}</div>
                    </div>
                    <div class="posg pos-1">
                        <!-- 总算力剩余 -->
                        <div>{{$t('discovery.expectinfo.totalPos')}}</div>
                        <div>{{Pos[3]}}</div>
                    </div>
                </div>
                <!-- <video id="video1"  width="270" autoplay src=""></video> -->
>>>>>>> 767b600... 增加了echarts组件用于显示曲线图 增加了GIF图片
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
                expectinfo  :   [],
                Pos         :   [],             // 算力信息0:固定算力1:管理算力2:推广算力3:总算力剩余
                bgTop       :   './static/images/BG.gif'
			}
        },
        watch:{
            
        },
		methods: {
            onTourl(url){
                this.$router.push({
                    path:url,
                });
            },
            getPOS(){
                // 获取算力
                this.$server.post(
                'GetTotalPOS',
                {
                    guid 	:  this.$storage.get('guid'),
                }).then(data => {
                    if(data){
                        this.Pos = JSON.parse(data.Result);
                    }
                })
            }
		},
		mounted() {
            // 获取详情
            this.$server.post(
			'GetBuyExpectInfo',
			{
				guid 	:  this.$storage.get('guid'),
			}).then(data => {
				if(data){
                    this.expectinfo = data;
				}
            })
            this.getPOS()
            // 播放视频
            // this.videoPlay()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/expectinfo";
</style>