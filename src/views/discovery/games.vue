<template>
	<div class="games padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.topmenu.ent')"></x-header>
        <div class="main-container">
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/4"  v-for="(v,index) in dataList" :key="index">
                    <div class="flex-div" @click="go(v.Url)">
                        <img :src="v.Img">
                        <div>{{v.Name}}</div>
                    </div>
                </flexbox-item>
            </flexbox>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
                dataList	:	[]
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
                        androidPkg: 'android.intent.action.VIEW',
                        mimeType: 'text/html',
                        uri: link
                    });
                }
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
            }
        },
		mounted() {
            this.GetGameList();
		}
	}

</script>

<style scoped lang="scss">
.flex-div{
    display: flex;
    align-items: center;
    flex-wrap:wrap;
    justify-content: center;
    margin-bottom: 20px;
}
</style>