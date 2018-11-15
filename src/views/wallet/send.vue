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
                    <x-input class="test" title="对方地址" :show-clear="false" placeholder="输入/长按粘贴BDC账户" v-model="bdcaddress">
						<div slot="right" class="scan" @click="startScan()"><i class="iconfont icon-scanning"></i></div>
					</x-input>
                </group>
                <group>
                    <x-input class="test" title="发送数额" :show-clear="false" v-model="num" placeholder="最小发送数量0.0001">
						<div slot="right" class="math">≈{{mathnum}}{{CurrencyCode}}</div>
					</x-input>
                </group>
				<group>
                    <div class="label">类别</div>
                    <div class="radio">
                        <RadioGroup v-model="type">
                            <Radio label="A">
                                <span>固定资产</span>
                            </Radio>
                            <Radio label="B">
                                <span>通证资产</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </group>
				<button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">发送</button>
            </div>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
	</div>
</template>

<script>
import { GetCurrency } from '../../common/mixins/getcurrency';
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
				type		:	'',
			}
		},
		watch:{
			num(){
				this.mathnum = (this.num*this.PriceToBDC).toFixed(4)
			},
			bdcaddress(){
				
			}
		},
		methods: {
			doSubmit(){

			},
			scan(){
				// 创建扫描控件
				let that = this
      			if (!window.plus) return
				// eslint-disable-next-line
				scan = new plus.barcode.Barcode('bcid')
				scan.onmarked = onmarked
				function onmarked(type, result, file) {
					switch (type) {
					// eslint-disable-next-line
					case plus.barcode.QR:
						type = 'QR'
						break
					// eslint-disable-next-line
					case plus.barcode.EAN13:
						type = 'EAN13'
						break
					// eslint-disable-next-line
					case plus.barcode.EAN8:
						type = 'EAN8'
						break
					default:
						type = '其它' + type
						break
					}
					// 获得code
					result = result.replace(/\n/g, '')
					that.bdcaddress = result
				}
			},
			// 开始扫描
			startScan() {
				if (!window.plus) return
				scan.start()
			},
			// 关闭扫描
			cancelScan() {
				if (!window.plus) return
				scan.cancel()
			},
			// 关闭条码识别控件
			closeScan() {
				if (!window.plus) return
				scan.close()
			}
		},
		mounted() {
            this.nickname = this.$storage.get('NickName');
            this.avatar   = this.$storage.get('HeadImg');
			this.realname = (this.$storage.get('Realname'))?this.$storage.get('Realname'):this.$t('global.Uncertified');
			this.getcurren();
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/main";
@import "../../scss/views/wallet/send";
</style>