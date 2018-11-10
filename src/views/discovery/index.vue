<template>
	<div class="discovery padding-footer">
		<div class="main-container">
			<h1>{{$t("menu.discovery")}}</h1>
			<div class="topmenu">
				<v-grid>
					<div :class="['grid-4',index<4?'line-b':'']" v-for="(list,index) in dataList" :key="index">
						<i :class="[{'iconfont':true},list.icon]"></i>
						<span class="top-menu">{{list.value}}</span>
					</div>
				</v-grid>
			</div>
			<div class="panel">
				<div class="dis-grid" v-for="(v,index) in news">
					<flexbox>
						<flexbox-item :span="3">
							<div class="dis-grid-img">
								<img v-if="v.ImgUrl" :src="v.ImgUrl" />
								<img v-else src="../../assets/nopic.png" />
							</div>
						</flexbox-item>
						<flexbox-item>
							<div class="dis-grid-content line-b">
								<div class="title ellipsis1">{{v.Title}}</div>
								<div class="content ellipsis2">{{v.Content}}</div>
							</div>
						</flexbox-item>
					</flexbox>
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
			let jm     = this.$md5(this.$jm.jmCode+'0').toUpperCase();						// 这里只调用新闻，所以只加密类型1
			this.$server.post(
			'GetNewsbulletinList',
			{
				jm 	 : jm,
				Type : 0,				
				lv   : this.lang
			},
			).then(data => {
				if(data){
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
@import "../../scss/views/discovery/index";
</style>