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
                cardbg      :   './static/images/card.jpg',
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
                    this.$vux.toast.show({
                        text: this.$t('mine.auth.tips.realname'),
                        type: 'warn'
                    })
                    return
                }
                if(this.filea==''){
                    this.$vux.toast.show({
                        text: this.$t('mine.auth.tips.realname'),
                        type: 'warn'
                    })
                    return
                }
                if(this.fileb==''){
                    this.$vux.toast.show({
                        text: this.$t('mine.auth.tips.back'),
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
                    back   	    :   this.datab
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
                    that.$server.post('http://107.150.127.54:50004/Handler1.ashx',idcard,{upload:true}).then(data => {
                        if(data){
                            if(file=="a"){
                                that.filea = this.result
                                that.dataa = data.Data;
                            }else{
                                that.fileb = this.result
                                that.datab = data.Data;
                            }
                            window.app.$vux.loading.hide()
                        }
                    })
                }
            },
            // GetAccount(){
            //     this.$server.post(
            //     'GetAccountById',
            //     {
            //         guid : this.$storage.get('guid')
            //     }).then(data => {
            //         if(data){
            //             this.$storage.set('NickName',data.NickName);                        // 昵称
            //             this.$storage.set('Name',data.Name);                                // 用户名
            //             this.$storage.set('RealName',data.RealName); 
            //             this.$storage.set('HeadImg',data.HeadImg);                          // 头像
            //             this.$storage.set('RechargeCode',data.RechargeCode);                // 充值地址
            //             this.$storage.set('Mobile',data.PhoneNo);                           // 手机号
            //             this.$storage.set('Sex',data.Sex);                                  // 性别
            //             this.$storage.set('ParentName',data.ParentName);                    // 推荐人
            //             this.$storage.set('InviteCode',data.InviteCode);                    // 邀请码
            //             this.$router.push({
            //                 path:'/mine/myhome',
            //             });
            //         }
            //     })
            // },
            change(){
                this.active = !this.active;
            }
		},
		mounted() {
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