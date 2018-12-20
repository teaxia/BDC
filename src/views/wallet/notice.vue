<template>
	<div class="notice padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="title"></x-header>
        <div class="main-container">
			<v-grid class="mr30" v-for="(v,index) in dataList" v-if="type==0" :key="index">
                <div class="systeamgg" @click="goto(v.Id)">
                    <div>{{v.Title}}</div>
                    <div>{{v.Sendtime}}</div>
                </div>
			</v-grid>
			<v-grid class="mr30" v-for="(v,index) in dataList" v-if="type==1" :key="index">
                <div class="systeammsg" @click="goto(v.Id,3,3)">
                    <div>{{v.Subject}}</div>
                    <div>{{v.SentTime}}</div>
					<div class="isread">
						<span v-if="v.IsRead" class="read">{{$t('message.Aread')}}</span>
						<span v-if="!v.IsRead" class="noread">{{$t('message.Unread')}}</span>
					</div>
                </div>
			</v-grid>
		</div>
		<v-footer :isIndex="$route.query.index"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				dataList	:	[],
				title		:	'',
				type		:	''
			}
		},
		methods: {
			goto(id,index=0,type=0){
                this.$router.push({
                    path    :   '/article/view',
                    query   :   {'id':id,'index':index,'type':type}
                });
			},
			GetSystemGG(){
				this.$server.post(
				'GetSystemGG',
				{
					guid    : this.$storage.get('guid'),
					Count   : 0
				}).then(data => {
					if(data){
						this.dataList = data;
					}else{
						this.GetSystemGG()	
					}
				})
			},
			GetLetterMessageList(){
				this.$server.post(
				'GetLetterMessageList',
				{
					guid    : this.$storage.get('guid'),
				}).then(data => {
					if(data){
						this.dataList = data;
					}else{
						this.GetLetterMessageList()	
					}
				})
			}
		},
		mounted() {
			this.type       = 	(this.$route.query.type)?this.$route.query.type:0					// 类型0系统公告1站内信
			// 判断类型
			if(this.type==0){
				// 公告
				this.title	=	this.$t('global.notice')
				this.GetSystemGG()
			}else{
				// 站内信
				this.title	=	this.$t('global.message')
				this.GetLetterMessageList()
			}
			
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/notice";
</style>