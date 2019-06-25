<template>
	<div class="h100">
		<transition name="fade" mode="out-in">
        	<router-view></router-view>
		</transition>
    </div>
</template>

<script>
	export default {
        name:'OTC',
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
.h100{
	height: 100%;
	overflow: hidden;
}
</style>