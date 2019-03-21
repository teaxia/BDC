<template>
	<div class="mycard" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.setting.wechart')"></x-header>
        <div class="pd50">
            <div class="enterfrom">
                <div class="mr203">上传微信收款二维码：</div>
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
                <group>
                    <x-input class="test" type="text" :title="$t('mine.setting.name')" v-model="name" required :placeholder="$t('mine.setting.tips.name')">
                    </x-input>
                </group>
            </div>
            <button v-if="BindCount<AllowCount" @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
            <div class="mr50 cardlist">
                <div class="tips">
                    <p>{{$t("mine.mycard.tip")}}:</p>
                    <p>1、每个游戏账户最多绑定<span class="bindnum">{{AllowCount}}</span>微信账户，您已经成功绑定<span class="bindnum">{{BindCount}}</span>个</p>
                    <p>2、一个账户只能绑定同一个开户人姓名的微信账户</p>
                </div>
                <div class="mr20">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>{{$t("mine.mycard.No")}}</th>
                                <th>{{$t("mine.mycard.bank")}}</th>
                                <th>{{$t("mine.mycard.cardnumber")}}</th>
                                <th>{{$t("mine.mycard.time")}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v,index) in cardList" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{v.bankName}}</td>
                                <td>{{v.cardNo}}</td>
                                <td>{{v.CreateTime}}</td>
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
    </div>
</template>

<script>

import { GetAccount } from '../../common/mixins/getaccount'
export default {
    name: 'mycard',
    mixins:[GetAccount],
	data() {
		return {
            card      :  '',
            banks     :  [],                       // 请求的开户行数据
            bank      :  '',
            name      :  '',
            AllowCount:  0,                        // 允许绑卡的数据
            BindCount :  0,                        // 已绑卡数量
            cardList  :  [],                       // 已绑卡数据
            show      :	 false,         		   // 跳转至强制认证界面
            upUrl       :   '',                                 // 上传图片地址
            imgs        :   [],                                 // 图片
            localimgs   :   [],
		}
	},
	methods: {
		doSubmit(){
            // 解决问题的关键方法
            // 判断不为空
            if(this.card==''||this.card.length<10){
                // 判断银行卡
                this.$vux.toast.show({
                    text: this.$t('mine.mycard.tips.bankerror'),
                    type: 'warn'
                })
                return;
            }
            if(this.$refs.sect.value==''){
                // 判断开户行
                this.$vux.toast.show({
                    text: this.$t('mine.setting.tips.bank'),
                    type: 'warn'
                })
                return;
            }
            if(this.name==''){
                // 判断姓名
                this.$vux.toast.show({
                    text: this.$t('mine.setting.tips.name'),
                    type: 'warn'
                })
                return;
            }
            // 提交绑定
            this.$server.post(
            'BindBankCard',{
                guid 	    :   this.$storage.get('guid'),
                bankName    :   this.$refs.sect.value,
                cardNo      :   this.card,
                accountName :   this.name,
                pName       :   province[this.sProvince],
                cName       :   city[this.sProvince][this.sCity],
            }).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
                    // 清空数据
                    this.$refs.sect.value = ''
                    this.card = ''
                    this.name = ''
                    this.GetBindBankCardList();
                }
            })
            
        },
        GetBindBankCardList(){
            // 获取已绑卡数据
            this.$server.post(
            'GetBindBankCardList',{
                guid 	:   this.$storage.get('guid'),
            }).then(data => {
                if(data){
                    this.cardList       =   data.list
                    this.AllowCount     =   data.AllowCount
                    this.BindCount      =   data.BindCount
                }
            })
        },
        ok () {
            this.submit();
        },
        cancel () {
            this.modal = false;
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
            if(this.imgs.length>=1){
                this.$vux.toast.show({
                    text: '一次只能上传一张收款码',
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
                let myDate = new Date();
                let day = myDate.getDate();
                // 图片上传
                let jm     = that.$md5(that.$jm+day).toUpperCase();
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
                    that.localimgs.push(this.result)    // 把base64数据push到本地图片显示
                    that.imgs.push(data.Data)           // 把返回的图片名字push到待上传接口
                    window.app.$vux.loading.hide()
                })
            }
        },
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
    }
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
.cardlist{
    .tips{
        .bindnum{
            color:$font-red;
        }
        font-size:24px;
    }
    .table{
        width: 100%;
        border-collapse:collapse;
        border: 0.01rem solid $border-line;
        th{
            border:$border-line 0.01rem solid;
            background:$bg-border;
        }
        td{
            border-bottom: 0.01rem solid $border-line;
            padding:15px 0;
            text-align: center;
        }
    }
}
.upimg{
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    border-bottom: 0.01rem solid #eee;
    padding-bottom: 25px;
    .upload{
        width: 150px;
        height: 150px;
        position: relative;
        border:0.01rem solid $font-base;
        .label{
            position: relative;
            z-index:11;
            text-align: center;
            height: 100px;
            line-height: 100px;
        }
        .file{
            display: none;
            opacity: 0;
        }
        .zindex{
            position: absolute;
            z-index:1;
            left: 45px;
            top: 35px;
            i{
                font-size:50px;
            }
        }
    }
    .isimg{
        width:150px;
        height: 150px;
        margin-bottom: 20px;
        margin-left:20px;
    }
}
</style>