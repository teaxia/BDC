<template>
	<div class="index" v-cloak>
        <img src="/static/images/index.png">
    </div>
</template>

<script>
	export default {
        name:'index',
		data() {
			return {
                 loop        :   '',                                                         // 定时器
			}
        },
		methods: {
			 
            
		},
		mounted() {
            this.$vux.loading.show({
                text: 'Loading'
            })
            this.loop = setInterval(()=>{
                this.$router.push({
                    path:"/user/login",
                });
            },3000)
        },
        beforeDestroy(){
            // 清除计时器
            clearInterval(this.loop);
        }
	}

</script>

<style scoped lang="scss">
.index{
    img{
        width: 100%;
    }
}
</style>