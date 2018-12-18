<template>
	<div class="auth padding-footer" v-cloak>
        <x-header title="slot:overwrite-title">
            <div class="overwrite-title" slot="overwrite-title">
                <div @click="change()" :class="{'overwrite-title-btn':true,'overwrite-title-first':true,'overwrite-title-act':active}">
                    {{$t('mine.auth.idcard')}}
                </div>
                <div @click="change()" :class="{'overwrite-title-btn':true,'overwrite-title-last':true,'overwrite-title-act':!active}">
                    {{$t('mine.auth.passport')}}
                </div>
            </div>
        </x-header>
        <img class="card_info" :src="cardbg"/>
        <div class="main-container pic">
			<div class="upload">
                <input type="file" @change="selectimg($event,'a')" class="file" ref="front" value="" id="filea" accept="image/gif,image/jpeg,image/jpg,image/png" />
                <label for="filea" class="label">
                </label>
                <div class="zindex">
                    <i class="iconfont icon-weimingming-"></i>
                    <span>{{$t('mine.auth.front')}}</span> 
                </div>
                <img v-if="filea" :src="filea" class="card" />
            </div>
            <div class="upload">
                <input type="file" @change="selectimg($event,'b')" class="file" ref="back" value="" id="fileb" accept="image/gif,image/jpeg,image/jpg,image/png" />
                <label for="fileb" class="label">
                </label>
                <div class="zindex">
                    <i class="iconfont icon-weimingming-"></i>
                    <span>{{$t('mine.auth.back')}}</span>
                </div>
                <img v-if="fileb" :src="fileb" class="card" />
            </div>
            
		</div>
        <div class="main-container">
            <group>
                <x-input class="test" :title="$t('mine.auth.realname')" required :placeholder="$t('mine.auth.tips.realname')" v-model="realname"></x-input>
            </group>
            <group v-if="active">
                <x-input class="test" :title="$t('mine.auth.idno')" required :placeholder="$t('mine.auth.tips.idno')" v-model="idNo"></x-input>
            </group>
            <group v-else>
                <x-input class="test" :title="$t('mine.auth.passport')" required :placeholder="$t('mine.auth.tips.passport')" v-model="idNo"></x-input>
            </group>
            <div class="tips">{{$t('mine.auth.tips.tips')}}</div>
            <button class="btn btn-block btn-round mr50" @click="submit()">{{$t('global.submit')}}</button>
        </div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
                filea       :   '',
                fileb       :   '',
                dataa       :   '',
                datab       :   '',
                realname    :   '',
                active      :   true,
                idNo        :   '',
                cardbg      :   './static/images/card.jpg',
                upUrl       :   '',                                 // 上传图片地址
			}
        },
        watch:{
            active(){
                if(this.active){
                    this.cardbg = './static/images/card.jpg'
                }else{
                    this.cardbg = './static/images/vist.jpg'
                }
            }
        },
		methods: {
			submit(){
                if(this.realname==''){
                    // 验证是否填写姓名
                    this.$vux.toast.show({
                        text: this.$t('mine.auth.tips.realname'),
                        type: 'warn'
                    })
                    return
                }
                if(this.filea==''){
                    // 验证是否上传正面
                    this.$vux.toast.show({
                        text: this.$t('mine.auth.tips.front'),
                        type: 'warn'
                    })
                    return
                }
                if(this.fileb==''){
                    // 验证是否上传背面
                    this.$vux.toast.show({
                        text: this.$t('mine.auth.tips.back'),
                        type: 'warn'
                    })
                    return
                }
                if(this.idno==''){
                    // 验证身份证号
                    this.$vux.toast.show({
                        text: this.$t('mine.auth.tips.number'),
                        type: 'warn'
                    })
                    return
                }
                this.$server.post(
                'SetRealName',
                {
                    guid 	    :   this.$storage.get('guid'),
                    name        :   this.realname,
                    front       :   this.dataa,
                    back   	    :   this.datab,
                    IdNo        :   this.idNo
                }).then(data => {
                    if(data){
                        this.$vux.toast.show({
                            text: this.$t('mine.auth.tips.sub'),
                            type: 'success'
                        })
                        this.realname = '';
                        this.$router.push({
                            path:'/mine/myhome',
                        });
                    }
                })
            },
            selectimg(e,file){
                if(e==''){
                    return;
                }
                var that = this
                var files = e.target.files[0]
                if(files.type!='image/jpeg'&&files.type!='image/gif'&&files.type!='image/png'){
                    this.$vux.toast.show({
                        text: this.$t('mine.auth.tips.picerror'),
                        type: 'warn'
                    })
                    return
                }
                if(files.size/1024>5120){
                    this.$vux.toast.show({
                        text: this.$t('mine.auth.tips.pic'),
                        type: 'warn'
                    })
                    return
                }
                // 模拟表单图片上传
                let reader = new FileReader()
                reader.readAsDataURL(files)
                reader.onloadend = function () {
                    let myDate = new Date();
                    let day = myDate.getDate();
                    // 图片上传
                    let jm     = that.$md5(that.$jm.jmCode+day).toUpperCase();
                    var idcard = new FormData()
                    idcard.append('img', e.target.files[0])
                    idcard.append('jm', jm)
                    window.app.$vux.loading.show({
                        text: 'Loading'
                    })
                    let upUrl = that.upUrl
                    that.$server.post(upUrl,idcard,{upload:true}).then(data => {
                        // 拦截器
                        if(data.Code == '-1'){
                            window.app.$vux.toast.show({
                                text: data.Msg,
                                type: 'warn'
                            })
                            window.app.$vux.loading.hide()
                            return
                        }
                        if(file=="a"){
                            that.filea = this.result
                            that.dataa = data.Data;
                        }else{
                            that.fileb = this.result
                            that.datab = data.Data;
                        }
                        window.app.$vux.loading.hide()
                        
                    })
                }
            },
            GetImgUpLoadUrl(){
                this.$server.post(
                'GetImgUpLoadUrl',
                {
                    guid : this.$storage.get('guid')
                }).then(data => {
                    if(data){
                        this.upUrl = data.Result;
                    }else{
                        this.GetImgUpLoadUrl()
                    }
                })
            },
            change(){
                this.active = !this.active;
            }
		},
		mounted() {
            this.GetImgUpLoadUrl();
            if(this.$storage.get('RealName')!=''){
                this.$vux.toast.show({
                    text: this.$t('mine.auth.tips.success'),
                    type: 'warn'
                })
                this.$router.push({
                    path:'/mine/myhome',
                });
            }
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/auth";
</style>