<template>
	<div class="complaiontlist padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="投诉记录"></x-header>
        <div class="main-container">
			<v-grid class="mr30" v-for="(v,index) in dataList" :key="index">
                <div class="systeammsg" @click="goto(v.Id)">
                    <div>投诉订单：#{{v.OrderId}}</div>
                    <div>{{v.CreateTime}}</div>
					<div class="isread">
						<span v-if="v.AuditStauts==0" class="wait">待审核</span>
						<span v-if="v.AuditStauts==1" class="success">投诉完成</span>
						<span v-if="v.AuditStauts==3" class="wran">拒绝</span>
					</div>
                </div>
			</v-grid>
		</div>
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
			goto(id){
                this.$router.push({
                    path    :   '/discovery/OTC/Complaiont/view',
                    query   :   {'id':id}
				});
				// '/discovery/OTC/complaiont/view',
			},
			GetComplainList(){
				this.$server.post(
				'OTC_GetComplainList',
				{
					guid    : this.$storage.get('guid'),
				}).then(data => {
					if(data){
						console.log(data)
						this.dataList = data;
					}
				})
			}
		},
		mounted() {
			this.GetComplainList()	
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otccomplaiont";
</style>