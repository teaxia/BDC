<template>
	<div class="regist" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.setting.language')"></x-header>
        <div class="pd50">
            <div class="enterfrom">
                <div class="label">{{$t('mine.setting.language')}}:</div>
                <div class="radio">
                    <RadioGroup v-model="lang">
                        <Radio label="en">
                            <span>{{$t('mine.setting.english')}}</span>
                        </Radio>
                        <Radio label="zh">
                            <span>{{$t('mine.setting.chinaese')}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			lang	    : '',
		}
	},
	methods: {
		doSubmit(){
			this.$server.post(
			'SetLanguage',
			{
				guid : this.$storage.get('guid'),
				lv   : this.lang
			}).then(data => {
				if(data){
					this.$storage.set('lang',this.lang);
                    this.$i18n.locale = this.lang;
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
				}
			})
		}
	},
	mounted() {
        this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/base/main";
.regist{
    .label{
        float: left;
        height: 50px;
        line-height: 50px;;
        font-size: 0.45rem;
        width: 180px;
        margin-top:20px;
        padding-left: 0.2rem;
    }
}
</style>