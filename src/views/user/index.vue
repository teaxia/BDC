<template>
	<div class="index" v-cloak>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(v,index) in ADList" :key="index">
                    <div class="bg" :style="{'background': 'url('+v+') no-repeat center center','background-size':'100% 100%'}">
                    </div>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <router-link to="/user/login">
            <div class="enter">
                <div class="cneter">
                    <img src="static/images/logo.png" style="width:0.5rem;height:0.5rem;float:left">{{$t('global.enter')}}
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import Swiper from 'swiper';
	export default {
        name:'index',
		data() {
			return {
                ADList     :    [],
                w          :    '',          //  图片宽度
                h          :    ''           //  图片高度
			}
        },
		methods: {
            getAD(){
                let myDate = new Date();
                let day = myDate.getDate();
                var jm = this.$md5(this.$jm.jmCode+day).toUpperCase();
                this.$server.post(
				'GetADList',
				{
					jm 	 : jm,
				}).then(data => {
					if(data){
                        let AD = JSON.parse(data.Result);
                        this.ADList = AD
                        this.Swiper();
					}
                })
            },
            Swiper(){
                this.w  =   window.screen.width
                this.h  =   window.screen.height
                new Swiper ('.swiper-container', {
                    loop                :   true,
                    autoplay            :   true,
                    observer            :   true,
                    observeParents      :   true,
                    pagination:{
                        el: '.swiper-pagination',
                    },
                })
            },
            full(){
                document.getElementsByTagName('body')[0].className = 'full'
            }
		},
		mounted() {
            this.getAD();
            this.full()
        },
        beforeDestroy(){
            // 清除计时器
            // clearInterval(this.loop);
        }
	}

</script>
<style scoped lang="scss">
.bg{
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #000;
}
.index{
    height: 100%;
}
.swiper-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.swiper-slide{
    overflow: hidden;
}
.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
    bottom:100px !important;
}
.enter{
    padding: 24px;
    //border-radius: 12px;
    position: fixed;
    bottom: 0;
    //left:40%;
    width: 100%;
    line-height: 0.5rem;
    text-align: center;
    z-index: 9999999;
    background:#3c4451;
    color:#fff;
}
.cneter{
    width:200px;
    margin:0 auto;
    font-size:32px;
}
</style>