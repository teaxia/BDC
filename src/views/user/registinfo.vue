<template>
	<div class="regist" v-cloak>
        <div class="pd50">
            <div>
                <h2>{{ $t("global.title") }}</h2>
            </div>
            <div class="enterfrom">
                <group>
                    <x-input :title="this.$t('user.register.username')" v-model="mobile"></x-input>
                </group>
                <group>
                    <x-input :title="this.$t('user.register.nickname')" v-model="nickName"></x-input>
                </group>
                <group>
                    <div class="label">{{$t('user.type.sex')}}：</div>
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
                </group>
                <group>
                    <x-input title="登陆密码：" v-model="password"></x-input>
                </group>
                <group>
                    <x-input title="安全密码：" v-model="safetycode"></x-input>
                </group>
                <group>
                    <x-input title="邀请码：" v-model="invitation"></x-input>
                </group>
                <group>
                    <div class="label">矿区：</div>
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
                </group>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("user.regist") }}</button>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
            mobile      : '',
            code        : '',
            gender      : '0',                 // 性别
            nickName    : '',                  // 昵称
            password    : '',                  // 密码
            safetycode  : '',                  // 安全码
            invitation  : '',                  // 邀请码
            area        : 'A',                 // 矿区
			lang	    : '',
		}
	},
	watch:{
		
	},
	methods: {
		doSubmit(){
            let straccount = {
                    Name    : this.mobile,
                    NickName: this.nickName,
                    Pwd     : this.password,
                    MoneyPwd: this.safetycode,
                    Sex     : this.gender,
                    PhoneNo : this.mobile
                }

			this.$server.post(
			'RegistAccount',
			{
				jm 	 		: this.$md5(this.$jm.jmCode+this.invitation).toUpperCase(),					// 加密方法invitation加密
				InviteCode  : this.invitation,                                          		        // 邀请码
				account 	: JSON.stringify(straccount),
                phoneCode   : this.code,
                area        : this.area,
				lv   		: this.lang
			},
			).then(data => {
				if(data){
                    // 成功，跳转首页！
                    console.log(data);
				}
			})
		}
	},
	mounted() {
        this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
        this.code = this.$route.query.code;
        this.mobile = this.$route.query.mobile;
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
@import "../../scss/base/main";
</style>