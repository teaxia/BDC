<template>
	<div class="mine padding-footer">
		<div class="main-container">
			<h1>我的</h1>
		</div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
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
@import "../../scss/views/mine/mine";
</style>