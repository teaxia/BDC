<template>
	<div class="regist" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.setting.price')"></x-header>
        <div class="pd50">
            <div class="enterfrom">
                <group>
                    <div class="label">{{$t('mine.setting.price')}}：</div>
                    <div class="radio">
                        <RadioGroup v-model="cy">
                            <Radio label="CNY">
                                <span>{{$t('mine.setting.rmb')}}</span>
                            </Radio>
                            <Radio label="USD">
                                <span>{{$t('mine.setting.usd')}}</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </group>
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
			cy	    : '',
		}
	},
	methods: {
		doSubmit(){
            this.$vux.toast.show({
                text: this.$t("global.success"),
                type: 'success'
            })
			this.$storage.set('currency',this.cy);
		}
	},
	mounted() {
        let currency = (this.$storage.get('currency'))?this.$storage.get('currency'):'';
        if(!currency){
            let lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
            if(lang=="zh"){
                this.cy = 'CNY'
            }else if(lang=="en"){
                this.cy = "USD"
            }
        }else{
            this.cy = currency;
        }
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
        font-size: 18px;
        width: 200px;
        padding-left: 0.2rem;
    }
}
</style>