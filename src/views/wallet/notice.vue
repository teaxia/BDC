<template>
	<div class="notice padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('global.notice')"></x-header>
        <div class="main-container">
			<v-grid class="mr30" v-for="(v,index) in dataList" :key="index">
                <div class="systeamgg" @click="goto(v.Id)">
                    <div>{{v.Title}}</div>
                    <div>{{(v.Sendtime).substring(0,10)}}</div>
                </div>
			</v-grid>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				dataList	:	[],
			}
		},
		methods: {
			goto(id){
                this.$router.push({
                    path    :   '/article/view',
                    query   :   {'id':id,'index':this.$route.meta.isIndex,type:0}
                });
            }
		},
		mounted() {
			this.$server.post(
			'GetSystemGG',
			{
                guid    : this.$storage.get('guid'),
                Count   : 0
			},
			).then(data => {
				if(data){
                    this.dataList = data;
				}
			})
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/notice";
</style>