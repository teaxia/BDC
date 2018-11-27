<template>
	<div class="auth padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="实名认证"></x-header>
        <div class="main-container">
			<div class="upload">
                <input type="file" @change="selectimg($event,'a')" class="file" ref="front" value="" id="filea" accept="image/gif,image/jpeg,image/jpg,image/png" />
                <label for="filea" class="label">选择正面</label>
                <img :src="filea" class="card" />
            </div>
            <div class="upload mr50">
                <input type="file" @change="selectimg($event,'b')" class="file" ref="back" value="" id="fileb" accept="image/gif,image/jpeg,image/jpg,image/png" />
                <label for="fileb" class="label">选择反面</label>
                <img :src="fileb" class="card" />
            </div>
            <group>
                <x-input class="test" title="真实姓名" required placeholder="请输入真实姓名" v-model="realname">
                </x-input>
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
                filea : '',
                fileb : '',
                dataa   :'',
                datab   :'',
                realname:''
			}
		},
		methods: {
			submit(){
                if(this.realname==''){
                    this.$vux.toast.show({
                        text: '请输入您的真实姓名',
                        type: 'warn'
                    })
                    return
                }
                if(this.filea==''){
                    this.$vux.toast.show({
                        text: '请上传身份证正面',
                        type: 'warn'
                    })
                    return
                }
                if(this.fileb==''){
                    this.$vux.toast.show({
                        text: '请上传身份证反面',
                        type: 'warn'
                    })
                    return
                }
                // var idcard = new FormData()
                // idcard.append('guid',this.$storage.get('guid'))         // guid
                // idcard.append('front', this.dataa)                      // 身份证正面
                // idcard.append('back', this.datab)                       // 反面
                // idcard.append('name',this.realname)                     // 真实姓名
                // this.$server.post('SetRealName',idcard,{upload:true}).then(data => {
                //     if(data){
                //         this.$vux.toast.show({
                //             text: this.$t("global.success"),
                //             type: 'success'
                //         })
                //     }
                // })
                this.$server.post(
                'SetRealName',
                {
                    guid 	    :   this.$storage.get('guid'),
                    name        :   this.realname,
                    front       :   this.filea,
                    back   	    :   this.fileb
                }).then(data => {
                    if(data){
                        this.$vux.toast.show({
                            text: this.$t("global.success"),
                            type: 'success'
                        })
                    }
                })
            },
            selectimg(e,file){
                if(e==''){
                    return;
                }
                var that = this
                var files = e.target.files[0]
                if(files.size/1024>5120){
                    this.$vux.toast.show({
                        text: '图片大小不能超过5M',
                        type: 'warn'
                    })
                    return
                }
                let reader = new FileReader()
                reader.readAsDataURL(files)
                reader.onloadend = function () {
                    if(file=="a"){
                        that.filea = this.result
                        that.dataa = e.target.files[0]
                    }else{
                        that.fileb = this.result
                        that.datab = e.target.files[0]
                    }
                }
            }
		},
		mounted() {
            
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/auth";
</style>