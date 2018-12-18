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
                url         :    '',
                shop        :    [],
                mall        :    [
                    {
                        img     :   './static/images/mall-1.png',
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
                // 调用第三方浏览器打开网页
                if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){  
                    //苹果设备 
                    api.openApp({
                        iosUrl: url, //打开微信的，其中weixin为微信的URL Scheme
                    });
                }else{
                    //安卓设备
                    api.openApp({
                        androidPkg: 'android.intent.action.VIEW',
                        mimeType: 'text/html',
                        uri: url
                    });
                }
            },
            GetShopList(){
                // 获取商家界面信息
                this.$server.post(
                'GetShopList',
                {
                    guid 	:  this.$storage.get('guid'),
                }).then(data => {
                    if(data){
                        this.shop = data
                    }else{
                        this.GetShopList();
                    }
                })
            }
		},
		mounted() {
            this.GetShopList();
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/application/appindex";
</style>