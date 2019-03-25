<template>
	<div class="setting" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.setting.settile')"></x-header>
        <div class="main-container">
            <div class="enterfrom">
                <v-grid class="mr10">
                    <group>
                        <cell link="/mine/editpsw" is-link class="cell-hei">
                            <span slot="title">
                                <span>{{$t('mine.setting.editpsw')}}</span>
                            </span>
                        </cell>
                        <cell link="/mine/safepsw" is-link class="cell-hei">
                            <span slot="title">
                                <span>{{$t('mine.setting.safepsw')}}</span>
                            </span>
                        </cell>
                        <cell link="/mine/language" is-link class="cell-hei">
                            <span slot="title">
                                <span>{{$t('mine.setting.language')}}</span>
                            </span>
                        </cell>
                        <cell link="/mine/price" is-link class="cell-hei">
                            <span slot="title">
                                <span>{{$t('mine.setting.price')}}</span>
                            </span>
                        </cell>
                        <cell link="/mine/mycard" is-link class="cell-hei">
                            <span slot="title">
                                <span>{{$t('mine.setting.mycard')}}</span>
                            </span>
                        </cell>
                        <div @click="isPhone()" class="weui-cell cell-hei vux-tap-active weui-cell_access">
                            <div class="weui-cell__hd"></div> 
                            <div class="vux-cell-bd vux-cell-primary">
                                <p>
                                   <label class="vux-label"><span><span>{{$t('mine.setting.editPhone')}}</span></span></label> 
                                </p>
                                <span class="vux-label-desc"></span>
                            </div> 
                            <div class="weui-cell__ft">
                            </div>
                        </div>
                        <!-- <cell @click="isPhone()" is-link class="cell-hei">
                            <span slot="title">
                                <span>{{$t('mine.setting.editPhone')}}</span>
                            </span>
                        </cell> -->
                    </group>
                </v-grid>
            </div>
        </div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
export default {
	name: 'setting',
	data() {
		return {
           
		}
	},
	watch:{
		
	},
	methods: {
		isPhone(){
            if(this.$storage.get('Mobile')){
                this.$router.push({
                    path:"/mine/editPhoneOld",
                });
            }else{
                this.$router.push({
                    path:"/mine/editPhoneNew",
                });
            }
        }
	},
	mounted() {
       
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/setting";
</style>