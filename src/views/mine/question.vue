<template>
	<div class="notice padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="OTC操作指南"></x-header>
        <div class="main-container">
			<Collapse v-model="value" accordion>
                <Panel name="1" class="pd0">
                    OTC操作指南手册
                    <div slot="content" class="content">
                        <img :src="`./static/images/OTC-1.jpg`" />
                    </div>
                </Panel>
                <Panel name="2">
                    OTC场内外交易指南
                    <div slot="content" class="content">
                        <img :src="`./static/images/OTC-2.jpg`" />
                    </div>
                </Panel>
                <Panel name="3">
                    信誉分的增减
                    <div slot="content" class="content">
                        <img :src="`./static/images/OTC-3.jpg`" />
                    </div>
                </Panel>
            </Collapse>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				value: '1'
			}
		},
		methods: {
			
		},
		mounted() {

		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/notice";
.content{
    img{
        max-width: 100%;
    }
}
</style>