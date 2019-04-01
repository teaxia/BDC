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
			}
        },
		methods: {
            getAD(){
                let myDate = new Date();
                let day = myDate.getDate();
                var jm = this.$md5(this.$jm+day).toUpperCase();
                this.$server.post(
				'GetADList',
				{
					jm 	 : jm,
				}).then(data => {
					if(data){
                        if(data.Result.length>2){
                            let AD = JSON.parse(data.Result);
                            this.ADList = AD
                            this.$nextTick(() => {
                                this.Swiper();
                            });
                        }else{
                            this.ADList = ['static/images/index.png']
                        }
                        
					}
                })
            },
            Swiper(){
                new Swiper ('.swiper-container', {      // 绑定的dom名称，可以用#ID的方式以及.class的方式绑定
                    loop                :   true,       // 是否重复
                    autoplay            :   true,       // 自动播放
                    observer            :   true,       // 非常重要，启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
                    observeParents      :   true,       // 非常重要，将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
                    pagination:{                        
                        el: '.swiper-pagination',       // 分页标签
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
    background:rgba(60,68,81,0.5);
    color:#fff;
}
.cneter{
    width:200px;
    margin:0 auto;
    font-size:32px;
}
</style>