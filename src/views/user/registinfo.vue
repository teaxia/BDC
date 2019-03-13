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
                    <x-input class="test" :title="this.$t('input.mobile')" mask="999 9999 9999" :show-clear='false' :max="13" :placeholder="$t('user.tips.phone')" v-model="mobile">
                        <button slot="right" class="btn btn-min btn-round" @click="countDown">{{content}}</button>
                    </x-input> 
                </group>
                <group>
                    <x-input class="test" :title="$t('user.tips.vcode')" v-model="code" required mask="999999" :max="6" :placeholder="$t('user.tips.verification')"></x-input>
                </group>
                <group>
                    <x-input :title="this.$t('user.register.nickname')" :placeholder="$t('user.tips.nickname')" v-model="nickName"></x-input>
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
                    <x-input :title="$t('user.password')" :placeholder="$t('user.tips.password')" v-model="password"></x-input>
                </group>
                <group>
                    <x-input :title="$t('user.securitypsw')" :placeholder="$t('user.tips.security')" v-model="safetycode"></x-input>
                </group>
                <group>
                    <x-input :title="$t('user.invitationcode')" :placeholder="$t('user.tips.invitationcode')" v-model="invitation"></x-input>
                </group>
                <div class="radioin line-b">
                    <div class="label">{{$t('user.area')}}:</div>
                    <div class="radio">
                        <RadioGroup v-model="area">
                            <Radio label="A" :disabled="NoteType">
                                <span>V1</span>
                            </Radio>
                            <Radio label="B" :disabled="NoteType">
                                <span>V2</span>
                            </Radio>
                            <Radio label="order">
                                <span><input :disabled="NoteType" class="notecode" :placeholder="$t('user.tips.notecode')" v-model="NoteCode" /></span>
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
                {{ $t("global.selectArea") }}<span v-if="area=='A'">V1</span><span v-if="area=='B'">V2</span><span v-if="area=='order'">{{NoteCode}}</span><br/>
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
            userName    :   '',                 // 用户名（5-20位英文）
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
            show		:	false,			     // 确认页面
            content	    :   this.$t("user.tips.setvcode"),      // 倒计时
            totalTime   :   60,                  // 记录具体倒计时时间
			canClick    :   true,	             // 添加canClick
            clock	    :   '',	
            code        :   '',
            NoteType    :   false,               // 是否可以选择注册项
            NoteCode    :   '',                  // 节点码
            field       :   '',                  // 矿区
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
            // 验证昵称是否为空
            if(this.nickName==''){
                this.$vux.toast.show({
					text: this.$t("user.tips.nickname"),
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
				jm 	 		: this.$md5(this.$jm+this.invitation).toUpperCase(),					// 加密方法invitation加密
				InviteCode  : this.invitation,                                          		        // 邀请码
				account 	: JSON.stringify(straccount),
                phoneCode   : this.code,
                area        : this.field,
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
            // 判断矿区所属并赋值
            if(this.area == 'order'){
                // 自定义节点矿区
                if(this.NoteCode==''){
                    this.$vux.toast.show({
                        text: this.$t("user.tips.notecode"),
                        type: 'warn'
                    })
                    return
                }
                this.field = this.NoteCode          // 节点码
            }else{
                this.field = this.area
            }
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
		// 		jm 	 		: this.$md5(this.$jm+this.code).toUpperCase(),					// 加密方法jmcode+Phone_No加密									                    // 注册传空
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
					jm 	 		: this.$md5(this.$jm+phoneNo).toUpperCase(),			// 加密方法Key+Phone_No加密
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
        // 矿区判断
        if(this.$route.query.NoteCode){
            // 有矿区节点
            this.NoteCode   =   (this.$route.query.NoteCode)?this.$route.query.NoteCode:''                                       // 传过来的节点码
            this.area       =   'order'                                                                                          // 选中自定义节点码
            this.NoteType   =   true                                                                                             // 不允许自定义选择
        }else{
            // 没有矿区节点
            this.area       =   (this.$route.query.area)?this.$route.query.area:'A'                                              // 传过来的矿区选项
        }
        
        this.pid            =   (this.$route.query.pId)?this.$route.query.pId:'0'
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