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
			<div class="panel">
				<div class="dis-grid" v-for="(v,index) in news">
					<div class="dis-grid-img">
						<img :src="v.imgurl">
					</div>
					<div class="dis-grid-content">
						<div class="title">{{v.Title}}</div>
						<div class="content">{{v.Content}}</div>
					</div>
				</div>
			</div>
		</div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>

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
					this.news = data;
				}
			})
		}
	},
	mounted() {
		this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
		this.getNews();
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/home/index";
</style>