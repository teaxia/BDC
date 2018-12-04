<template>
	<div class="walletmain send padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('wallet.send.title')"></x-header>
        <div class="walletmain-top">
			<v-grid class="walletmain-top-menu">
				<flexbox>
					<flexbox-item :span="3">
						<img v-if="avatar&&avatar!='null'" class="avatar" :src="avatar" /> 
						<i v-else class="avatar iconfont icon-touxiang"></i>
					</flexbox-item>
					<flexbox-item :span="9">
						<div class="user_info">
							<div class="nickname">
								{{nickname}}<br>
								<div class="userid">{{realname}}</div>
							</div>
							
						</div>
					</flexbox-item>
				</flexbox>
			</v-grid>
			<div class="enterfrom mr100">
                <group>
                    <x-input class="test" :title="$t('wallet.send.dfaddress')" :show-clear="false" :placeholder="$t('wallet.send.tips.input')" v-model="bdcaddress">
						<div slot="right" class="scan"><router-link to="/wallet/scan"><i class="iconfont icon-scanning"></i></router-link></div>
					</x-input>
                </group>
                <group>
                    <x-input class="test" :title="$t('wallet.send.num')" :show-clear="false" v-model="num" :placeholder="$t('wallet.send.tips.min')">
					</x-input>
                </group>
				<group>
                    <x-input class="test" type="password" :title="$t('wallet.tips.safetycode')" :show-clear="false" v-model="psw" :placeholder="$t('user.securitypsw')">
					</x-input>
                </group>
				<div class="send_label">
                    <div class="label">{{$t('wallet.send.class')}}</div>
                    <div class="radio">
                        <RadioGroup v-model="type">
                            <Radio label="2" class="sedn-radio">
                                <span>{{$t('wallet.tips.capitalassets')}}</span>
                            </Radio>
                            <Radio label="4" class="sedn-radio">
                                <span>{{$t('wallet.tips.actassets')}}</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>
				<button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{$t('wallet.btn.send')}}</button>
            </div>
		</div>
		<Modal v-model="show" :closable="false" :mask-closable="false">
			<div slot="header"></div>
			<div class="modal-body">{{$t('global.authentication')}}</div>
			<div slot="footer">
				<button class="btn btn-block btn-round" @click="ok()">{{$t('wallet.send.auth')}}</button>
			</div>
		</Modal>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
	</div>
</template>

<script type='text/ecmascript-6'>
	export default {
		data() {
			return {
				nickname	:	'',
                avatar		:	'',
				realname    :   '',
				bdcaddress  :   '',
				num			:	'',
				mathnum		:	'',
				type		:	'2',
				psw			:	'',
				show		:	false,				// 跳转至强制认证界面
			}
		},
		methods: {
			doSubmit(){
				//
				if(this.num<0.0001){
					this.$vux.toast.show({
                        text: this.$t('wallet.send.tips.min'),
                        type: 'warn'
					})
					return;
				}
				if(this.bdcaddress==''||this.num==''||this.psw==''){
					this.$vux.toast.show({
						text: this.$t('discovery.recharge.error.full'),
						type: 'warn'
					})
					return ;
				}
				this.$server.post(
				'TransferAccount',
				{
					guid 				:	this.$storage.get('guid'),
					RechargeCode		:	this.bdcaddress,
					Money				:	this.num,
					BusinessType		:	this.type,
					MoneyPwd			:	this.psw,
					Remakes				:	'',
				},
				).then(data => {
					if(data){
						this.$vux.toast.show({
							text: this.$t('global.success'),
							type: 'success'
						})
					}
				})
			},
			startscan(){
				this.$router.push({
					path:"/wallet/scan",
				});
			},
			ok () { 
                this.$router.push({
					path:"/mine/myhome",
				});
            },
		},
		mounted() {
            this.nickname = this.$storage.get('NickName');
            this.avatar   = this.$storage.get('HeadImg');
			this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
			this.bdcaddress = (this.$route.query.addr)?this.$route.query.addr:'';
			if(this.realname==this.$t('global.Uncertified')){
				this.show = true;
			}
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/main";
@import "../../scss/views/wallet/send";
</style>