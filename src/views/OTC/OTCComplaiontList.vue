<template>
	<div class="complaiontlist padding-footer" v-cloak>
        <div class="main-container">
			<v-grid class="mr30" v-for="(v,index) in dataList" :key="index" v-if="dataList.length>0">
                <div class="systeammsg" @click="goto(v.Id)">
                    <div>{{$t('discovery.OTC.complaiont.record')}}：#{{v.OrderId}}</div>
                    <div>{{v.CreateTime}}</div>
					<div class="isread">
						<span v-if="v.AuditStauts==0" class="wait">{{$t('discovery.OTC.complaiont.status0')}}</span>
						<span v-if="v.AuditStauts==1" class="success">{{$t('discovery.OTC.complaiont.status1')}}</span>
						<span v-if="v.AuditStauts==3" class="wran">{{$t('discovery.OTC.complaiont.status3')}}</span>
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
                    path    :   '/OTC/Complaiont/view',
                    query   :   {'id':id}
				});
			},
			GetComplainList(){
				this.$server.post(
				'OTC_GetComplainList',
				{
					guid    : this.$storage.get('guid'),
				}).then(data => {
					if(data){
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
@import "../../scss/views/otc/otccomplaiont";
</style>