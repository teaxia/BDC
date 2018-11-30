<template>
	<div class="appindex padding-footer" v-cloak>
        <div class="main-container">
            <h1>{{$t("menu.application")}}</h1>
            <div class="select">
                <div @click="change()" :class="{'select-title':true}">
                    <span :class="{'select-act':active}">{{$t("application.title.buy")}}</span>
                </div>
                <div @click="change()" :class="{'select-title':true}">
                    <span :class="{'select-act':!active}">{{$t("application.title.shop")}}</span>
                </div>
            </div>
            <div class="mr30" v-if="!active">
                <v-grid v-for="(v,index) in shop" :key="index" class="mr20">
                    <div class="pd-lb20" @click="onTourl(v.url)">
                        <flexbox class="line-b">
                            <flexbox-item :span="3">
                                <div class="dis-grid-img">
                                    <img :src="v.img">
                                </div>
                            </flexbox-item>
                            <flexbox-item>
                                <div class="dis-grid-content">
                                    <div class="title ellipsis1">{{v.title}}</div>
                                    <div class="content ellipsis1">{{v.desc}}</div>
                                </div>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </v-grid>
            </div>
            <div class="mr30" v-if="active">
                <v-grid v-for="(v,index) in mall" :key="index" class="mr20">
                    <div class="pd-lb20" @click="onTourl(v.url)">
                        <flexbox class="line-b">
                            <flexbox-item :span="3">
                                <div class="dis-grid-img">
                                    <img :src="v.img">
                                </div>
                            </flexbox-item>
                            <flexbox-item :span="6">
                                <div class="dis-grid-content">
                                    <div class="title ellipsis1">{{v.title}}</div>
                                    <div class="url">{{v.url}}</div>
                                    <div class="content ellipsis1">{{v.desc}}</div>
                                </div>
                            </flexbox-item>
                            <flexbox-item>
                                <button class="btn btn-block btn-xs">{{$t("application.btn")}}</button>
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
        name:'application',
		data() {
			return {
                active      :    true,                             //头部切换索引
                shop        :    [
                    {
                        img     :   '/static/images/shop-1.png',
                        title   :   '奥克斯厨房电器旗舰店',
                        desc    :   '主营：绞肉机 破壁料理机 榨汁机 电热水壶 电热水瓶',
                        url     :   false
                    },
                    {
                        img     :   '/static/images/shop-2.png',
                        title   :   '美的厨房电器旗舰店',
                        desc    :   '主营：烟灶套装 燃气灶 油烟机 消毒柜 洗碗机',
                        url     :   false
                    },
                    {
                        img     :   '/static/images/shop-3.png',
                        title   :   '小浣熊优萌专卖店',
                        desc    :   '主营：养生壶 电煮锅 电热饭盒 煮粥锅',
                        url     :   false
                    },
                    {
                        img     :   '/static/images/shop-4.png',
                        title   :   '康佳生活电器旗舰店',
                        desc    :   '主营：电烤箱 电饭煲 电磁炉 榨汁机 料理机',
                        url     :   false
                    },
                    {
                        img     :   '/static/images/shop-5.png',
                        title   :   '艾美特电器旗舰店',
                        desc    :   '主营：电风扇 塔扇 空调扇 转页扇 干衣机 除湿机',
                        url     :   false
                    },
                ],
                mall       :    [
                    {
                        img     :   '/static/images/mall-1.png',
                        title   :   'BDC商城',
                        desc    :   '支持BDC支付的跨境电商',
                        url     :   'http://bdcmalls.com'
                    },
                ],
			}
        },
        watch:{

        },
		methods: {
			change(){
                this.active = !this.active;
            },
            onTourl(url){
                if(!url){
                    this.$vux.toast.show({
                        text: this.$t("application.tips.error"),
                        type: 'warn'
                    })
                    return
                }
                this.$router.push({
                    name:"iframe",
                    params:{
                        url:url,
                    }
                });
            }
		},
		mounted() {
            
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/application/appindex";
</style>