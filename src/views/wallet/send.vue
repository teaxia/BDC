<template>
	<div class="walletmain send padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('wallet.send.title')"></x-header>
        <div class="walletmain-top">
			<v-grid class="walletmain-top-menu">
				<flexbox>
					<flexbox-item :span="12">
						<div class="midel" @click="onTourl('/mine/center')">
							<img v-if="avatar&&avatar!='null'" class="avatar" :src="avatar" />
							<i v-else class="avatar iconfont icon-touxiang"></i>
							<div class="nickname">{{nickname}}</div>
							<div class="userid">{{realname}}</div>
						</div>
					</flexbox-item>
				</flexbox>
			</v-grid>
			<div class="enterfrom mr100">
                <group>
                    <x-input class="test" :title="$t('wallet.send.dfaddress')" :show-clear="false" placeholder="输入/长按粘贴BDC地址" v-model="bdcaddress">
						<div slot="right" class="scan"><router-link to="/wallet/scan"><i class="iconfont icon-scanning"></i></router-link></div>
					</x-input>
                </group>
                <group>
                    <x-input class="test" :title="$t('wallet.send.num')" :show-clear="false" v-model="num" placeholder="最小发送数量0.0001">
					</x-input>
                </group>
				<group>
                    <x-input class="test" type="password" :title="$t('wallet.tips.safetycode')" :show-clear="false" v-model="psw" placeholder="请输入安全密码">
					</x-input>
                </group>
				<group>
                    <div class="label">{{$t('wallet.send.class')}}</div>
                    <div class="radio">
                        <RadioGroup v-model="type">
                            <Radio label="2">
                                <span>{{$t('wallet.tips.capitalassets')}}</span>
                            </Radio>
                            <Radio label="4">
                                <span>{{$t('wallet.tips.actassets')}}</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </group>
				<button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{$t('wallet.btn.send')}}</button>
            </div>
		</div>
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
			}
		},
		methods: {
			doSubmit(){
				//
				if(this.num<0.0001){
					this.$vux.toast.show({
                        text: '最小发送数量不能少于0.0001',
                        type: 'warn'
					})
					return;
				}
				if(this.bdcaddress==''||this.num==''||this.psw==''){
					this.$vux.toast.show({
						text: '请填写完整信息',
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
							text: '成功！',
							type: 'success'
						})
					}
				})
			},
			startscan(){
				this.$router.push({
					path:"/wallet/scan",
				});
			}
		},
		mounted() {
            this.nickname = this.$storage.get('NickName');
            this.avatar   = this.$storage.get('HeadImg');
			this.realname = (this.$storage.get('Realname'))?this.$storage.get('Realname'):this.$t('global.Uncertified');
			this.bdcaddress = (this.$route.query.addr)?this.$route.query.addr:'';
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/main";
@import "../../scss/views/wallet/send";
</style>