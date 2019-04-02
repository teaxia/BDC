<template>
	<div class="regist margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.setting.editPhone')"></x-header>
        <div class="pd50">
            <div class="enterfrom">
                <group>
                    <x-input class="test" :title="$t('mine.setting.newPhone')" mask="999 9999 9999" :show-clear='false' :max="13" :placeholder="$t('user.tips.phone')" v-model="mobile">
                        <button slot="right" class="btn btn-min btn-round" @click="countDown">{{content}}</button>
                    </x-input> 
                </group>
                <group>
                    <x-input class="test" :title="$t('user.tips.vcode')" v-model="code" required mask="999999" :max="6" :placeholder="$t('user.tips.verification')"></x-input>
                </group>
                <group v-if="type==3">
                    <x-input class="test" :type="Psw?'text':'password'" :show-clear='false' :title="$t('discovery.extract.safetycode')"  v-model="security" required :placeholder="$t('wallet.tips.inputcode')">
                        <div slot="right" ><i @click="changPsw()" :class="['iconfont',Psw?'icon-17yanjing':'icon-Close']"></i></div>
                    </x-input>
                </group>
            </div>
            <flexbox>
                <flexbox-item>
                    <button @click="confirm()" class="btn btn-block btn-default btn-round mr50">{{$t('mine.setting.bindPhone')}}</button>
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
import pattern from '../../common/utils/pattern'
export default {
	name: 'EditPhoneOld',
	data() {
		return {
            mobile      :   '',
            code        :   '',
            content	    :   this.$t("user.tips.setvcode"),      // 倒计时
            totalTime   :   60,                  // 记录具体倒计时时间
			canClick    :   true,	             // 添加canClick
            clock	    :   '',
            oldGuid     :   '',                  // 验证通过手机的GUID跟登陆GUID没有关系
            guid        :   '',                  // 登陆的GUID
            type        :   3,                   // 2验证手机号，3绑定新手机号
            security    :   '',                  // 安全码
            Psw 	    : false,		// 切换密码状态
		}
	},
	methods: {
		confirm(){
            let phoneNo = this.mobile.replace(/\s+/g,"")
            this.$server.post(
            'EditAccountInfo_PhoneAct',
            {
                guid 	 		:   this.$storage.get('guid'),
                Phone_No	    :   phoneNo, 
                Code            :   this.code,
                Type            :   this.type,                          // 验证新手机
                OldPhoneGuid    :   (this.oldGuid)?this.oldGuid:'',                       // 旧手机验证通过值,仅类型2使用，其余类型为空
                lv   		    :   (this.$storage.get('lang'))?this.$storage.get('lang'):'',
                moneyPwd        :   this.security
            }).then(data => {
                if(data){
                    this.$storage.set('Mobile',phoneNo)
                    this.$vux.toast.show({
                        text: this.$t("global.success"),
                        type: 'success'
                    })
                    this.$router.push({
                        path:"/mine/setting",
                    });
                }
            })
        },
		countDown() {
            if (!this.canClick){return}   														// 禁止多次点击 
            // 发送短信接口
            let phoneNo = this.mobile.replace(/\s+/g,"")
            this.$server.post(
            'PwdBack_SendCode',
            {
                jm 	 		: this.$md5(this.$jm.jmCode+phoneNo).toUpperCase(),			// 加密方法Key+Phone_No加密
                Key  		: (this.type==3)?this.guid:'',              							        // 旧手机号验证时传登陆GUID，绑新手机传空
                Phone_No	: phoneNo,
                lv   		: (this.$storage.get('lang'))?this.$storage.get('lang'):'',
            }).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t("global.success"),
                        type: 'success'
                    })
                    this.canClick = false                                               // 禁止多次点击
                    this.content = this.totalTime + 's'+this.$t("user.tips.send")       // 改变按钮
                    this.clock = window.setInterval(() => {                             // 增加计时器  
                        this.totalTime--
                        this.content = this.totalTime + 's'+this.$t("user.tips.send")
                        if (this.totalTime < 0) {
                            window.clearInterval(this.clock)
                            this.content = this.$t("user.tips.setvcode");
                            this.totalTime = 60
                            this.canClick = true  //这里重新开启
                        }
                    },1000)
                }
            })
        },
        changPsw(){
			this.Psw = !this.Psw
		}
	},
	mounted() {
        this.oldGuid = this.$route.query.code           // 获取验证码的GUID
        // 判断是否绑定旧手机号
        if(this.$storage.get('Mobile')){
            this.guid   =   this.$storage.get('guid')
            this.type   =   2
        }
    },
    beforeDestroy(){
        // 清除计时器
        window.clearInterval(this.clock);
    }
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
</style>