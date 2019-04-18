<template>
	<div v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="在线客服"></x-header>
        <iframe class="ifraem" :src="url" :scrolling="this.isscro" frameborder="0"></iframe>        
        <!-- <v-footer :isIndex="$route.meta.isIndex"></v-footer> -->
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
                // this.h = '100%';
            }else{
                //安卓设备允许滚动
                this.isscro = 'yes';
            }
            this.h = window.screen.height
            this.w = window.screen.width
            this.url = this.$route.query.url
		}
	}

</script>

<style scoped lang="scss">
.ifraem{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
}
</style>