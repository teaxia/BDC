<template>
	<div class="feedback padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.feedback.title')"></x-header>
        <div class="main-container"> 
			<group>
                <x-textarea class="textarea" v-model="value" :max="200" :show-counter="true" :placeholder="$t('mine.feedback.msg')"></x-textarea>
            </group>
            <div class="mr203">{{$t('mine.feedback.upimg')}}：</div>
            <div class="upimg">
                <div class="upload">
                    <input type="file" @change="selectimg($event)" class="file" ref="back" value="" id="add" accept="image/gif,image/jpeg,image/jpg,image/png" />
                    <label for="add" class="label">
                    </label>
                    <div class="zindex">
                        <i class="iconfont icon-tianjia"></i>
                    </div>
                </div>
                <img v-for="(item,index) in localimgs" :key="index" :src="item" class="isimg" />
            </div>
            <button class="btn btn-block btn-round mr50" @click="submit()">{{$t('global.submit')}}</button>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
                value       :   '',
                upUrl       :   '',                                 // 上传图片地址
                imgs        :   [],                                 // 图片
                localimgs   :   [],
                jmday       :   '',                                 // 加密时间
			}
		},
		methods: {
			submit(){
                // 提交意见
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
                    fileNames   : this.imgs
                }).then(data => {
                    if(data){
                        this.$vux.toast.show({
                            text: this.$t("global.success"),
                            type: 'success'
                        })
                        this.value      =   ''
                        this.imgs       =   []
                        this.localimgs  =   []
                    }
                    this.$refs.back.value = null;

                })
            },
            GetImgUpLoadUrl(){
                // 获取图片上传接口地址
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
            selectimg(e,file){
                // 判断是否有5张图片
                if(this.imgs.length>=5){
                    this.$vux.toast.show({
                        text: this.$t('mine.feedback.imgerror'),
                        type: 'warn'
                    })
                    return
                }
                // 选择图片并且上传
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
                    // 图片上传
                    let jm     = that.$md5(that.$jm+that.jmday).toUpperCase();
                    var idcard = new FormData()
                    idcard.append('img', e.target.files[0])
                    idcard.append('jm', jm)
                    idcard.append('type','ProposeInfo')
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
                        if(data.Data){
                            that.localimgs.push(this.result)    // 把base64数据push到本地图片显示
                            that.imgs.push(data.Data)           // 把返回的图片名字push到待上传接口
                        }else{
                            // 清空表单上传内容
                            that.$refs.back.value = null
                        }
                        window.app.$vux.loading.hide()
                    })
                }
            },
            getDateServer(){
                // 获取jm的日期
                this.$vux.loading.show({
                        text: 'Loading'
                })
                let upUrl = 'http://107.150.127.10:50004/webservice1.asmx/GetDateDay'
                this.$server.post(upUrl,{upload:false}).then(data => {
                    // 拦截器
                    if(data.Code == '-1'){
                        this.$vux.toast.show({
                            text: data.Msg,
                            type: 'warn'
                        })
                        this.$vux.loading.hide()
                        return
                    }
                    this.jmday = data
                    this.$vux.loading.hide()
                })
            }
		},
		mounted() {
            this.GetImgUpLoadUrl()
            this.getDateServer()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/feedback";
</style>