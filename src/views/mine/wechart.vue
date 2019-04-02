<template>
	<div class="mycard margin-header" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.setting.bindwechart')"></x-header>
        <div class="pd50">
            <div v-if="BindCount<AllowCount" class="enterfrom">
                <div class="mr203">{{$t('mine.setting.tips.upWechartErcode')}}：</div>
                <div class="upimg">
                    <div class="upload">
                        <input type="file" @change="selectimg($event)" class="file" ref="back" value="" id="add" accept="image/gif,image/jpeg,image/jpg,image/png" />
                        <label for="add" class="label">
                        </label>
                        <div class="zindex">
                            <i class="iconfont icon-tianjia"></i>
                        </div>
                    </div>
                    <img v-if="localimgs" :src="localimgs" class="isimg" />
                </div>
                <group>
                    <x-input class="test" type="text" :title="$t('mine.setting.name')" v-model="thirdNickName" required :placeholder="$t('mine.setting.tips.name')">
                    </x-input>
                </group>
            </div>
            <button v-if="BindCount<AllowCount" @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
            <div class="mr50 cardlist">
                <div class="tips">
                    <p>{{$t("mine.mycard.tip")}}:</p>
                    <p>每个账户最多绑定<span class="bindnum">{{AllowCount}}</span>个微信收款账号，您已经成功绑定<span class="bindnum">{{BindCount}}</span>个</p>
                    <!-- <p>2、一个账户只能绑定同一个开户人姓名的支付宝</p> -->
                </div>
                <div class="mr20">
                    <table class="table">
                        <thead>
                            <tr>
                                <!-- <th>{{$t("mine.mycard.No")}}</th> -->
                                <th>{{$t("mine.setting.name")}}</th>
                                <th>{{$t("mine.mycard.time")}}</th>
                                <th>{{$t("mine.area.edit")}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v,index) in PayList" :key="index" v-if="v.thirdName == '微信'">
                                <!-- <td>{{index+1}}</td> -->
                                <td>{{v.thirdNickName}}</td>
                                <td>{{v.CreateTime}}</td>
                                <td>
                                    <button @click ="delConfirm(v.Id,index)" class="btn btn-del btn-round">{{$t("mine.setting.delete")}}</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Modal v-model="show" :closable="false" :mask-closable="false">
			<div slot="header"></div>
			<div class="modal-body">{{$t('global.authentication')}}</div>
			<div slot="footer">
				<button class="btn btn-block btn-round" @click="goauth()">{{$t('wallet.send.auth')}}</button>
			</div>
		</Modal>
        <Modal v-model="show2" :closable="false" :mask-closable="false">
			<div slot="header">{{$t("mine.setting.tips.confirmDel")}}</div>
			<div class="modal-body" id="payConfirm">
                <div class="name"><span class="w">{{$t('mine.setting.name')}}：</span>{{confirmData.thirdNickName}}</div>
                <!-- <div class="pay"><span class="w">{{$t('mine.setting.alipayAccess')}}：</span>{{confirmData.thirdAccountName}}</div> -->
                <div class="ercode"><img :src="confirmData.ImgUrl"></div>
            </div>
			<div slot="footer">
                <button class="btn btn-round" @click="cancel()">{{$t('global.cancel')}}</button>
				<button class="btn btn-round" @click="ok(confirmData.Id)">{{$t('global.ok')}}</button>
			</div>
		</Modal>
    </div>
</template>

<script>
import { GetAccount } from '../../common/mixins/getaccount'
export default {
    name: 'alipay',
    mixins:[GetAccount],
	data() {
		return {
            thirdNickName           :  '',                     // 微信绑定姓名
            AllowCount              :  3,                      // 允许绑卡的数据
            BindCount               :  0,                      // 已绑卡数量
            show                    :  false,            	   // 跳转至强制认证界面
            show2                   :   false,                 // 删除二次确认
            upUrl                   :  '',                     // 上传图片地址
            imgs                    :  '',                     // 图片
            localimgs               :  '',
            PayList                 :  [],                     // 绑定数据列表
            confirmData             :  [],                     // 确认删除的数据
            picNum                  :  0,                      // 图片上传的计数器
		}
	},
	methods: {
		doSubmit(){
            if(this.thirdNickName==''){
                // 判断姓名
                this.$vux.toast.show({
                    text: this.$t("mine.setting.tips.name"),
                    type: 'warn'
                })
                return;
            }
            // 提交绑定
            this.$server.post(
            'SetThirdInfo',{
                guid 	                :   this.$storage.get('guid'),
                thirdName               :   '微信',
                thirdAccountName        :   '',                                 //  
                thirdNickName           :   this.thirdNickName,                 //  微信绑定姓名
                ImgUrl                  :   this.imgs
            }).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
                    // 清空数据
                    this.thirdNickName      = ''
                    this.imgs               = ''
                    this.localimgs          = ''
                    this.GetThirdInfo();
                }
            })
        },
        GetThirdInfo(){
            // 获取已微信/支付宝数据
            this.$server.post(
            'GetThirdInfo',{
                guid 	:   this.$storage.get('guid'),
            }).then(data => {
                if(data){
                    this.PayList = data
                    let i = 0
                    data.forEach(v => {
                        if(v.thirdName=='微信'){
                            i++;
                        }
                    });
                    this.BindCount = i
                }
            })
        },
        ok(id) {
            // 确认删除绑定账号
            this.$server.post(
            'DelThirdInfo',
            {
                guid : this.$storage.get('guid'),
                Id   : id
            }).then(data => {
                if(data){
                    // console.log(data)
                    this.GetThirdInfo()
                    this.show2 = false
                    this.confirmData = []
                }
            })
        },
        cancel () {
            this.show2 = false
        },
        goauth () { 
            this.$router.push({
                path:"/mine/myhome",
            });
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
            // 一次只能上传1张图片
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
                let myDate = new Date();
                let day = myDate.getDate();
                // 图片上传
                let jm     = that.$md5(that.$jm+day).toUpperCase();
                var idcard = new FormData()
                idcard.append('img', e.target.files[0])
                idcard.append('jm', jm)
                idcard.append('type','thirdPay')
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
                    that.localimgs = this.result        // 把base64数据push到本地图片显示
                    that.imgs   = data.Data             // 把返回的图片名字push到待上传接口
                    window.app.$vux.loading.hide()
                })
            }
        },
        delConfirm(id,index){
            this.show2 = true
            this.confirmData = this.PayList[index]
            // console.log(this.confirmData)
        }
    },
    watch:{
    },
	mounted() {
        // 更新个人中心资料
        this.GetAccount();
        this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
        if(this.realname==this.$t('global.Uncertified')){
            this.show = true;
        }
        this.GetImgUpLoadUrl()
        this.GetThirdInfo()
    }
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
@import "../../scss/views/mine/BindPay";
</style>