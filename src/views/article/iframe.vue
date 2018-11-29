<template>
	<div class="iframe" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}"></x-header>
        <div>
            <iframe :src="url" :width="w" :height="h" class="iframe_p" :scrolling="this.isscro" frameborder="0"></iframe>
        </div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
        name:'iframe',
		data() {
			return {
                url     :   '',
                w       :   '',
                h       :   '',
                isscro  :   'no',
			}
        },
		mounted() {
            // 解决宽度兼容问题
            if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){  //判断是苹果设备还是其他设备 
                this.isscro = 'no';
                this.h = '100%';
            }else{
                //安卓设备允许滚动
                this.isscro = 'yes';
                this.h = window.screen.height-180
            }
            
            this.w = window.screen.width
            this.url = this.$route.params.url
		}
	}

</script>

<style scoped lang="scss">
.iframe_p{
    margin-bottom: 150px;
}
</style>