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
                    <x-input class="test" :title="$t('wallet.send.dfaddress')" :show-clear="false" placeholder="输入/长按粘贴BDC账户" v-model="bdcaddress">
						<div slot="right" class="scan" @click="startRecognize()"><i class="iconfont icon-scanning"></i></div>
					</x-input>
                </group>
                <group>
                    <x-input class="test" :title="$t('wallet.send.num')" :show-clear="false" v-model="num" placeholder="最小发送数量0.0001">
						<div slot="right" class="math">≈{{mathnum}}{{CurrencyCode}}</div>
					</x-input>
                </group>
				<group>
                    <x-input class="test" type="password" :title="$t('wallet.tips.safetycode')" :show-clear="false" v-model="psw" placeholder="请输入安全密码">
						<div slot="right" class="math">≈{{mathnum}}{{CurrencyCode}}</div>
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
				<button @click="startRecognize()" class="btn btn-block btn-default btn-round mr50">开始扫描</button>
				<button @click="startScan()" class="btn btn-block btn-default btn-round mr50">开2描</button>
            </div>
		</div>
		<div id="bcid" v-if="showscan">
			<div style="height:100%"></div>
			<p class="tip">...载入中...</p>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
	</div>
</template>

<script type='text/ecmascript-6'>
import { GetCurrency } from '../../common/mixins/getcurrency';
let scan = null;
	export default {
		mixins:[GetCurrency],
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
				showscan	:	false,
			}
		},
		watch:{
			num(){
				this.mathnum = (this.num*this.PriceToBDC).toFixed(4)
			},
		},
		methods: {
			doSubmit(){
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
						console.log(data);
					}
				})
			},
			//创建扫描控件
			startRecognize() {
				this.showscan = true;
				let that = this;
				if (!window.plus) return;
				scan = new plus.barcode.Barcode('bcid');
				scan.onmarked = onmarked;
				function onmarked(type, result, file) {
					switch (type) {
						case plus.barcode.QR:
						type = 'QR';
						break;
						case plus.barcode.EAN13:
						type = 'EAN13';
						break;
						case plus.barcode.EAN8:
						type = 'EAN8';
						break;
						default:
						type = '其它' + type;
						break;
					}
					result = result.replace(/\n/g, '');
					that.bdcaddress = result;
					that.closeScan();
					that.showscan = false;
				}
			},
			//开始扫描
			startScan() {
				if (!window.plus) return;
				scan.start();
			},
			//关闭扫描
			cancelScan() {
				if (!window.plus) return;
				scan.cancel();
			},
			//关闭条码识别控件
			closeScan() {
				if (!window.plus) return;
				scan.close();
			}
		},
		mounted() {
            this.nickname = this.$storage.get('NickName');
            this.avatar   = this.$storage.get('HeadImg');
			this.realname = (this.$storage.get('Realname'))?this.$storage.get('Realname'):this.$t('global.Uncertified');
			this.getcurren();
			this.startRecognize();
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/main";
@import "../../scss/views/wallet/send";
</style>