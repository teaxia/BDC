<template>
	<div class="ahtuenticator padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.setting.google')"></x-header>
        <div class="main-container">
            <div class="isopen">
                <div class="label">{{$t('mine.ahtuenticator.openAuth')}}:</div>
                <div class="radio">
                    <i-switch v-model="IsOpen" @on-change="change()">
                        <span slot="open">{{$t('mine.ahtuenticator.open')}}</span>
                        <span slot="close">{{$t('mine.ahtuenticator.close')}}</span>
                    </i-switch>
                </div>
            </div>
            <div class="tips">
                <i>{{$t('mine.ahtuenticator.tips')}}</i>
            </div>
            <div class="w-cont" v-if="IsOpen">
                <div class="ercode">
                    <qriously class="ercode" :value="url" :size="138"/>
                </div>
                <div class="auth-cell">
                    <div>{{$t('mine.ahtuenticator.username')}}：{{name}}</div>
                    <button type="button" class="btn btn-xs btn-round" @click="CopyClip(name)">{{$t('wallet.receive.copy')}}</button>
                </div>
                <div class="auth-cell">
                    <div>{{$t('mine.ahtuenticator.key')}}<br/>{{key}}</div>
                    <button type="button" class="btn btn-xs btn-round" @click="CopyClip(key)">{{$t('wallet.receive.copy')}}</button>
                </div>
            </div>
            <div class="footer" v-if="IsOpen">
                <div class="auth">
                    <button type="button" class="btn btn-success btn-round btn-block" @click="AuthCode">{{$t('mine.ahtuenticator.veri')}}</button>
                </div>
                <div class="auth">
                    <button type="button" class="btn btn-cancel btn-round btn-block" @click="Cancelchange()">{{$t('mine.ahtuenticator.cancel')}}</button>
                </div>
            </div>
		</div>
        <Modal v-model="show" :mask-closable="false" @on-cancel="cancel()" @on-ok="ChangeBind()">
			<div slot="header">
                <span v-if="hp">{{$t('mine.ahtuenticator.google')}}</span>
                <span v-else>{{$t('mine.ahtuenticator.cancelAuth')}}</span>
            </div>
			<div class="modal-body">
                <x-input class="test" :title="$t('mine.ahtuenticator.security')" v-model="safecode" :placeholder="$t('mine.ahtuenticator.googlesecurity')">
                </x-input>
            </div>
		</Modal>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	import { clipBoard } from '../../common/mixins/clipBoard'
	export default {
	mixins:[clipBoard],
		data() {
			return {
                name        :   '',
                url         :   '',
                key         :   '',
                show        :   false,
                safecode    :   '',
                IsOpen      :   false,                 // 是否开启认证
                hp          :   false,
			}
        },
		methods: {
			GetGoogleAuthUrl(){
                this.$server.post(
                'GetGoogleAuthUrl',
                {
                    guid 	      :  this.$storage.get('guid'),
                }).then(data => {
                    if(data){
                        this.name   =   data.Name
                        this.key    =   data.key
                        this.url    =   data.url
                        this.IsOpen =   eval(data.IsGoogleAuthOpen.toLowerCase())
                        this.hp     =   eval(data.IsGoogleAuthOpen.toLowerCase())
                    }
                })
            },
            AuthCode(){
                this.show = true
            },
            ChangeBind(){
                // 判断是取消认证还是绑定认证
                if(!this.IsOpen){
                    // 取消认证
                    this.GoogleValidateClose()
                }else{
                    // 绑定认证
                    this.GoogleValidate()
                }
            },
            GoogleValidate(){
                // 判断是否输入安全码
                if(this.safecode==''){
                    this.$vux.toast.show({
                        text: this.$t('mine.ahtuenticator.googlesecurity'),
                        type: 'warn'
                    })
                    return;
                }
                this.$server.post(
                'GoogleValidate',
                {
                    guid 	      :  this.$storage.get('guid'),
                    vCode         :  this.safecode
                }).then(data => {
                    if(data){
                        if(data.Result=='true'){
                            this.$vux.toast.show({
                                text: this.$t('mine.ahtuenticator.success'),
                                type: 'success'
                            })
                        }else{
                            this.$vux.toast.show({
                                text: this.$t('mine.ahtuenticator.error'),
                                type: 'warn'
                            })
                        }
                    }
                })
            },
            GoogleValidateClose(){
                // 判断是否输入安全码
                if(this.safecode==''){
                    this.$vux.toast.show({
                        text: this.$t('mine.ahtuenticator.googlesecurity'),
                        type: 'warn'
                    })
                    return;
                }
                this.$server.post(
                'GoogleValidateClose',
                {
                    guid 	      :  this.$storage.get('guid'),
                    vCode         :  this.safecode
                }).then(data => {
                    if(data){
                        if(data.Result=='true'){
                            this.$vux.toast.show({
                                text: this.$t('mine.ahtuenticator.cancelsuccess'),
                                type: 'success'
                            })
                            this.IsOpen     =   false
                            this.hp         =   false
                        }else{
                            this.$vux.toast.show({
                                text: this.$t('mine.ahtuenticator.cancelerror'),
                                type: 'warn'
                            })
                        }
                    }else{
                        // 取消绑定失败
                        this.hp     =   true
                        this.IsOpen =   true
                    }
                })
            },
            cancel(){
                // 取消验证
                if(!this.IsOpen){
                    this.hp     =   true
                    this.IsOpen =   true
                }
            },
            Cancelchange(){
                // 取消绑定按钮
                this.hp         =   !this.hp
                this.IsOpen     =   false
                this.show       =   true
                
            },
            change(){
                this.hp         =   !this.hp
                if(!this.hp){
                    this.show = true
                    return
                }
            }
		},
		mounted() {
            this.GetGoogleAuthUrl();
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/ahtuenticator";
</style>