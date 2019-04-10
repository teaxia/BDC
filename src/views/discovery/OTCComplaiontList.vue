<template>
	<div class="complaiontlist padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.OTC.complaiont.record')"></x-header>
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
                    path    :   '/discovery/OTC/Complaiont/view',
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
@import "../../scss/views/discovery/otccomplaiont";
</style>