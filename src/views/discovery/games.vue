<template>
	<div class="games padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.topmenu.ent')"></x-header>
        <div class="main-container">
            <div class="select">
                <div @click="change()" :class="{'select-title':true}">
                    <span :class="{'select-act':active}">棋牌游戏</span>
                </div>
                <div @click="change()" :class="{'select-title':true}">
                    <span :class="{'select-act':!active}">休闲游戏</span>
                </div>
            </div>
            <div v-if="active">
                <!-- 赌博游戏 -->
                <v-grid v-for="(v,index) in gambling" :key="index" class="mr20">
                    <div class="pd-lb20" @click="gambling(v.code)">
                        <flexbox>
                            <flexbox-item :span="3">
                                <div class="dis-grid-img">
                                    <img :src="v.Img">
                                </div>
                            </flexbox-item>
                            <flexbox-item :span="6">
                                <div class="dis-grid-content">
                                    <div :class="{title:true,ellipsis1:true,link:v.Url}">{{v.Name}}</div>
                                </div>
                            </flexbox-item>
                            <flexbox-item>
                                <button class="btn btn-xs btn-round btn-success">{{$t('global.stargame')}}</button>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </v-grid>
            </div>
            <div v-if="!active">
                <!-- 休闲游戏 -->
                <v-grid v-for="(v,index) in dataList" :key="index" class="mr20">
                    <div class="pd-lb20" @click="go(v.Url)">
                        <flexbox>
                            <flexbox-item :span="3">
                                <div class="dis-grid-img">
                                    <img :src="v.Img">
                                </div>
                            </flexbox-item>
                            <flexbox-item :span="6">
                                <div class="dis-grid-content">
                                    <div :class="{title:true,ellipsis1:true,link:v.Url}">{{v.Name}}</div>
                                </div>
                            </flexbox-item>
                            <flexbox-item>
                                <button class="btn btn-xs btn-round btn-success">{{$t('global.stargame')}}</button>
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
		data() {
			return {
                active      :    true,                             //头部切换索引
                dataList	:	[],
                gambling    :   [
                    {
                        'Name'  :   'BD棋牌',
                        'code'  :   'bd',
                        'Img'   :   './static/images/bd.png',
                        'Url'   :   true
                    }
                ]
			}
		},
		methods: {
			go(link){
                // 调用第三方浏览器打开网页
                if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){  
                    //苹果设备 
                    api.openApp({
                        iosUrl: link,
                    });
                }else{
                    //安卓设备
                    api.openApp({
                        uri: link
                    });
                }
            },
            change(){
                // 切换游戏类型
                this.active = !this.active;
            },
            GetGameList(){
                // 获取商家界面信息
                this.$server.post(
                'GetGameList',
                {
                    guid 	:  this.$storage.get('guid'),
                }).then(data => {
                    if(data){
                        this.dataList = data
                    }else{
                        this.GetGameList()
                    }
                })
            },
            GameRegister(){
                // 棋牌游戏注册&登录
                this.$server.post(
                'WJGame_Register',
                {
                    guid 	:   this.$storage.get('guid'),
                    ip      :   ''//ip 地址
                }).then(data => {
                    if(data){
                        this.dataList = data
                    }else{
                        this.GetGameList()
                    }
                })
            },
            GetBalance(){
                // 游戏余额查询
                this.$server.post(
                'WJGame_GetBalance',
                {
                    guid 	:   this.$storage.get('guid'),
                    ip      :   ''//ip 地址
                }).then(data => {
                    if(data){
                        this.dataList = data
                    }else{
                        this.GetGameList()
                    }
                })
            },
            gambling(code){
                // @code bd = bd棋牌
                // 赌博游戏接入
            }
        },
		mounted() {
            this.GetGameList();
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/games";
</style>