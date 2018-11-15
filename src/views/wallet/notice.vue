<template>
	<div class="notice padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="系统公告"></x-header>
        <div class="main-container">
			<v-grid class="mr30">
				
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
                    console.log(data);
				}
			})
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/notice";
</style>