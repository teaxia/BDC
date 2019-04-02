<template>
	<div>
		<transition name="fade" mode="out-in">
        	<router-view></router-view>
		</transition>
  </div>
</template>

<script>
	export default {
        name:'application',
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
	
</style>