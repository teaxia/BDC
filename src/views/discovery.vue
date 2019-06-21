<template>
	<div class="nfull">
		<transition name="fade" mode="out-in">
        	<router-view></router-view>
		</transition>
  	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted() {
			
		}
	}

</script>

<style scoped lang="scss">
.nfull{
    height: 100%;
}
</style>