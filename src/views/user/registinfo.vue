<template>
	<div class="regist" v-cloak>
        <div class="pd50">
            <div>
                <h2>{{ $t("global.title") }}</h2>
            </div>
            <div class="enterfrom">
                <group>
                    <x-input :title="this.$t('user.register.username')" :placeholder="$t('user.tips.username')" v-model="userName"></x-input>
                </group>
                <group>
                    <x-input class="test" title="手机号" mask="999 9999 9999" :show-clear='false' :max="13" :placeholder="$t('user.tips.phone')" v-model="mobile">
                        <button slot="right" class="btn btn-min btn-round" @click="countDown">{{content}}</button>
                    </x-input> 
                </group>
                <group>
                    <x-input class="test" :title="$t('user.tips.vcode')" v-model="code" required mask="999999" :max="6" :placeholder="$t('user.tips.verification')"></x-input>
                </group>
                <group>
                    <x-input :title="this.$t('user.register.nickname')" v-model="nickName"></x-input>
                </group>
                <div class="radioin line-b">
                    <div class="label">{{$t('user.type.sex')}}:</div>
                    <div class="radio">
                        <RadioGroup v-model="gender">
                            <Radio label="0">
                                <span>{{$t('user.type.man')}}</span>
                            </Radio>
                            <Radio label="1">
                                <span>{{$t('user.type.woman')}}</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>
                <group>
                    <x-input :title="$t('user.password')" v-model="password"></x-input>
                </group>
                <group>
                    <x-input :title="$t('user.securitypsw')" v-model="safetycode"></x-input>
                </group>
                <group>
                    <x-input :title="$t('user.invitationcode')" v-model="invitation"></x-input>
                </group>
                <div class="radioin line-b">
                    <div class="label">{{$t('user.area')}}:</div>
                    <div class="radio">
                        <RadioGroup v-model="area">
                            <Radio label="A">
                                <span>V1</span>
                            </Radio>
                            <Radio label="B">
                                <span>V2</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>
            </div>
            <flexbox>
                <flexbox-item>
                    <button @click="back()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.back") }}</button>
                </flexbox-item>
                <flexbox-item>
                    <button @click="confirm()" class="btn btn-block btn-default btn-round mr50">{{ $t("user.regist") }}</button>
                </flexbox-item>
            </flexbox>
        </div>
        <Modal v-model="show" :closable="false" :ok-text="$t('global.ok')" @on-ok="onOk" :mask-closable="false">
			<div slot="header"></div>
			<div class="modal-body">
                {{ $t("global.selectArea") }}<span v-if="area=='A'">V1</span><span v-else>V2</span><br/>
                {{ $t("global.confirm") }}
            </div>
		</Modal>
    </div>
</template>

<script>
// @2019-01-23合并为一步注册
import pattern from '../../common/utils/pattern'
export default {
	name: 'Login',
	data() {
		return {
            userName    :   '',                 // 用户名（6-20位英文）
            mobile      :   '',
            code        :   '',
            gender      :   '0',                 // 性别
            nickName    :   '',                  // 昵称
            password    :   '',                  // 密码
            safetycode  :   '',                  // 安全码
            invitation  :   '',                  // 邀请码
            area        :   'A',                 // 矿区
            pid         :   '0',                 // (上级ID，默认传0，矿区注册时传值传上级ID)
            lang	    :   '',
            show		:	false,			   // 确认页面
            content	    :   this.$t("user.tips.setvcode"),      // 倒计时
            totalTime   :   60,      //记录具体倒计时时间
			canClick    :   true,	//添加canClick
            clock	    :   '',	
            code        :   '',
		}
	},
	watch:{
		
	},
	methods: {
		doSubmit(){
            // 验证用户名是否有效
            if(!pattern["Pattern.UserName"].test(this.userName)){
				this.$vux.toast.show({
					text: this.$t("user.tips.nameerror"),
					type: 'warn'
				})
				return
			}
            let phoneNo = this.mobile.replace(/\s+/g,"")
            let straccount = {
                Name    : this.userName,
                NickName: this.nickName,
                Pwd     : this.password,
                MoneyPwd: this.safetycode,
                Sex     : this.gender,
                PhoneNo : phoneNo,
            }
			this.$server.post(
			'RegistAccountWithLoginNew',
			{
				jm 	 		: this.$md5(this.$jm.jmCode+this.invitation).toUpperCase(),					// 加密方法invitation加密
				InviteCode  : this.invitation,                                          		        // 邀请码
				account 	: JSON.stringify(straccount),
                phoneCode   : this.code,
                area        : this.area,
                lv   		: this.lang,
                pId         : this.pid
			}).then(data => {
				if(data){
                    this.$vux.toast.show({
                        text: this.$t("user.tips.success"),
                        type: 'success'
                    })
                    this.$storage.set('guid',data.Result);
                    this.$router.push({
                        path:"/wallet/wallet",
                    });
				}
			})
        },
        back(){
            this.$router.push({
                path:"/user/login",
            });
        },
        confirm(){
            // 二次确认
            this.show = true
        },
        onOk(){
            this.show = false
            this.doSubmit()
        },
        // verification(){
        //     // 发送短信验证码（提交时会验证，应该是不需要的）
		// 	// 空值判断
		// 	if(!pattern["Pattern.Verification"].test(this.code)){
		// 		this.$vux.toast.show({
		// 			text: this.$t("user.tips.verification"),
		// 			type: 'warn'
		// 		})
		// 		return
		// 	}
		// 	this.$server.post(
		// 	'ValidatePhoneNo',
		// 	{
		// 		jm 	 		: this.$md5(this.$jm.jmCode+this.code).toUpperCase(),					// 加密方法jmcode+Phone_No加密									                    // 注册传空
        //         Phone_No	: this.mobile,
        //         phoneCode   : this.code,		
		// 		lv   		: this.lang
		// 	}).then(data => {
		// 		// 验证成功
				
		// 	})
		// },
		countDown() {
			    if (!this.canClick){return}   														// 禁止多次点击 
                // 发送短信接口
                let phoneNo = this.mobile.replace(/\s+/g,"")
				this.$server.post(
				'PwdBack_SendCode',
				{
					jm 	 		: this.$md5(this.$jm.jmCode+phoneNo).toUpperCase(),			// 加密方法Key+Phone_No加密
					Key  		: '',															// 注册传空
					Phone_No	: phoneNo,
					lv   		: this.lang
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
		}
	},
	mounted() {
        this.lang           =   (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
        this.invitation     =   (this.$route.query.InviteCode)?this.$route.query.InviteCode:''                                   // 传过来的邀请码
        this.area           =   (this.$route.query.area)?this.$route.query.area:'A'                                              // 传过来的矿区选项
        this.pid           =   (this.$route.query.pId)?this.$route.query.pId:'0'
    },
    beforeDestroy(){
        // 清除计时器
        window.clearInterval(this.clock);
    }
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
@import "../../scss/base/main";
</style>