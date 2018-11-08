<template>
	<div class="discovery">
		<div class="main-pd">
			<h1>{{$t("menu.discovery")}}</h1>
			<div class="topmenu">
				<grid :cols="4" :show-lr-borders="true" :show-vertical-dividers="false">
					<grid-item v-for="(list,index) in dataList" :key="index">
						<i :class="[{'iconfont':true},list.icon]"></i>
						<span class="top-menu">{{list.value}}</span>
					</grid-item>
				</grid>
			</div>
			<div>
				<panel :list="news" type="1"></panel>
			</div>
		</div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
import { Panel } from 'vux'
export default {
	data() {
		return {
			lang	 : 'zh',		// 默认语言
			dataList:[
				{
				value   : this.$t("discovery.topmenu.bdc"),
				icon    : 'icon-duihuanBDC',
				url     : '/home/discovery',
				},
				{
				value   : this.$t("discovery.topmenu.ctc"),
				icon    : 'icon-CTC1',
				url     : '/home/discovery',
				},
				{
				value   : this.$t("discovery.topmenu.market"),
				icon    : 'icon-hangqing1',
				url     : '/home/discovery',
				},
				{
				value   : this.$t("discovery.topmenu.bill"),
				icon    : 'icon-zhangben2',
				url     : '/home/discovery',
				},
				{
				value   : this.$t("discovery.topmenu.calculator"),
				icon    : 'icon-jisuanqi',
				url     : '/home/discovery',
				},
				{
				value   : this.$t("discovery.topmenu.ent"),
				icon    : 'icon-xiuxianyule',
				url     : '/home/discovery',
				},
				{
				value   : this.$t("discovery.topmenu.recharge"),
				icon    : 'icon-chongzhi',
				url     : '/home/discovery',
				},
				{
				value   : this.$t("discovery.topmenu.credit"),
				icon    : 'icon-banxinyongqia',
				url     : '/home/discovery',
				}
			],
			news:[],
			// news: [{
			// 	src: 'http://somedomain.somdomain/x.jpg',
			// 	fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
			// 	title: '标题一',
			// 	desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
			// 	url: '/component/cell'
			// }, {
			// 	src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
			// 	title: '标题二',
			// 	desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
			// 	url: {
			// 		path: '/component/radio',
			// 		replace: false
			// 	},
			// }],
		}
	},
	methods: {
		getNews(){
			let jm     = this.$md5(this.$jm.jmCode+'1').toUpperCase();						// 这里只调用新闻，所以只加密类型1
			this.$server.post(
			'GetNewsbulletinList',
			{
				jm 	 : jm,
				Type : 1,				
				lv   : this.lang
			},
			).then(data => {
				if(data){
					console.log(data);
				}
			})
		}
	},
	mounted() {
		this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
		this.getNews();
	},
	components: {
    	Panel
  	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/home/index";
</style>