<template>
	<div class="discovery padding-footer">
		<div class="main-container">
			<h1>{{$t("menu.discovery")}}</h1>
			<div class="topmenu">
				<v-grid>
					<div :class="['grid-4',index<4?'line-b':'',list.url=='false'?'close':'',list.status?'':'close']" v-for="(list,index) in dataList" :key="index">
						<div @click="onTorul(list.url)" v-if="list.status">
							<i :class="[{'iconfont':true},list.icon]"></i>
							<span class="top-menu">{{list.value}}</span>
						</div>
						<div @click="statusFalse()" v-if="!list.status">
							<i :class="[{'iconfont':true},list.icon]"></i>
							<span class="top-menu">{{list.value}}</span>
						</div>
					</div>
				</v-grid>
			</div>
			<div class="panel">
				<div @click="goto(v.Id)" class="dis-grid" v-for="(v,index) in news" :key="index" v-if="v.Title">
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
								<div class="content ellipsis2">{{(v.Sendtime).substring(0,10)}}</div>
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
					value   : this.$t("discovery.topmenu.bdc"),				// 兑换BDC
					icon    : 'icon-duihuanBDC',	
					url     : '/discovery/expectinfo',
					status	: true,
				},
				// {
				// 	value   : this.$t("discovery.topmenu.OTC"),				// OTC
				// 	icon    : 'icon-CTC1',
				// 	url     : '/discovery/otc',
				// 	status	: true,
				// },
				
				{
					value   : this.$t("discovery.topmenu.bill"),			// 账本
					icon    : 'icon-zhangben2',
					url     : '/discovery/bill',
					status	: true,
				},
				// {
				// 	value   : this.$t("discovery.topmenu.ent"),				// 休闲娱乐
				// 	icon    : 'icon-xiuxianyule',
				// 	url     : '/discovery/games',
				// 	status	: true,
				// },
				// 2019-02-25 移动至应用界面
				// {
				// 	value   : this.$t("discovery.topmenu.recharge"),		// 充值
				// 	icon    : 'icon-chongzhi',
				// 	url     : '/discovery/recharge',
				// 	status	: false,
				// },
				// {
				// 	value   : this.$t("discovery.topmenu.credit"),			// 信用卡
				// 	icon    : 'icon-banxinyongqia',
				// 	url     : '/discovery/credit',
				// 	status	: true,
				// },
				{
					value   : this.$t("discovery.topmenu.extract"),			// 提币
					icon    : 'icon-Fixedassets',
					url     : '/discovery/extract',
					status	: false,
				}
			],
			news	:	[],
		}
	},
	methods: {
		getNews(){
			let jm     = this.$md5(this.$jm+'0').toUpperCase();						// 这里只调用新闻，所以只加密类型1
			this.$server.post(
			'GetNewsbulletinList',
			{
				jm 	 : jm,
				Type : 0,				
				lv   : this.lang
			}).then(data => {
				if(data){
					this.news = data;
				}
			})
		},
		goto(id){
			this.$router.push({
				path    :   '/article/view',
				query   :   {'id':id,'index':this.$route.meta.isIndex}
			});
		},
		onTorul(url){
			// 如果没有开放，则提示未开放
			if(url=='false'){
				this.$vux.toast.show({
					text: this.$t('global.unopened'),
					type: 'warn'
				})
			}else{
				this.$router.push({
					path    :   url,
				});
			}
		},
		GetBlackShow(){
			// 黑名单权限管控
			this.$server.post(
			'GetBlackShow',
			{
				guid 	    :   this.$storage.get('guid'),
			}).then(data => {
				if(data){
					// this.dataList[2].status = data.isShow_CZ		//	充值
					this.dataList[2].status = data.isShow_TB		//	提币
				}
			})
		},
		statusFalse(){
			this.$vux.toast.show({
				text: this.$t('global.authority'),
				type: 'warn'
			})
		}
	},
	mounted() {
		this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
		this.getNews();
		this.GetBlackShow();
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/index";
</style>