<template>
	<div class="feedback padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.feedback.title')"></x-header>
        <div class="main-container">
			<group>
                <x-textarea class="textarea" v-model="value" max="200" :show-counter="true" :placeholder="$t('mine.feedback.msg')"></x-textarea>
            </group>
            <button class="btn btn-block btn-round mr50" @click="submit()">{{$t('global.submit')}}</button>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			}
		},
		methods: {
			submit(){
                if(this.value==''){
                    this.$vux.toast.show({
                        text: this.$t('mine.feedback.tip'),
                        type: 'warn'
                    })
                    return  ;
                }
                this.$server.post(
                'SaveProposeInfo',
                {
                    guid 	    : this.$storage.get('guid'),
                    remarks    	: this.value,
                },
                ).then(data => {
                    if(data){
                        this.$vux.toast.show({
                            text: this.$t("global.success"),
                            type: 'success'
                        })
                        this.value = '';
                    }
                })
            }
		},
		mounted() {

		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/feedback";
</style>