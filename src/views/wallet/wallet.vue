<template>
	<div class="wallet padding-footer" v-cloak>
		<div class="main-container">
			<h1>{{$t("wallet.title")}}</h1>
            <div class="assets">
                <v-grid>
                    <div class="wallet-change pd-lb20">
                        <i class="iconfont icon-Conversion"></i>
                        <span>{{$t("wallet.tips.change")}}</span>
                    </div>
                    <div class="wallet-band">
                        <div class="wallet-band-l fl">
                            <div class="wallet-band-tit">{{$t("wallet.tips.count")}}</div>
                            <div class="wallet-band-bdc">
                                <span class="num">{{sum}}</span>
                                <span class="bdc">BDC</span>
                            </div>
                            <div class="wallet-band-rmb">
                                ≈¥<span>{{cny}}</span>
                            </div>
                        </div>
                        <div class="wallet-band-r fr">
                            <div class="wallet-assets">
                                {{$t("wallet.tips.capitalassets")}}<br/>{{fixedAssets}}（BDC）
                            </div>
                            <div class="wallet-assets">
                                {{$t("wallet.tips.actassets")}}<br/>{{actAssets}}（BDC）
                            </div>
                            <div class="wallet-assets">
                                {{$t("wallet.tips.gameassets")}}<br/>{{gameAssets}}（CNY）
                            </div>
                        </div>
                    </div>
                </v-grid>
            </div>
            <div class="send">
                <div class="bts">
                    <button class="btn btn-block btn-round"><i class="iconfont icon-send"></i>{{$t("wallet.btn.send")}}</button>
                </div>
                <div class="bts">
                    <button class="btn btn-block btn-round"><i class="iconfont icon-icon"></i>{{$t("wallet.btn.receive")}}</button>
                </div>
            </div>
            <div class="mr30">
                <v-grid>
                    <flexbox>
                        <flexbox-item :span="11">
                            <ul class="pd-lb20">
                                <li v-for="v in news" class="ellipsis1">
                                    {{v.Title}}
                                </li>
                            </ul>
                        </flexbox-item>
                        <flexbox-item>
                            <i class="iconfont icon-search"></i>
                        </flexbox-item>
                    </flexbox>
                </v-grid>
            </div>
            <div v-for="(v,index) in currency" class="mr30">
                <v-grid>
                    <div class="pd-lb20 btc-grid">
                        <div class="btc-grid-l">
                            <svg class="sicon" aria-hidden="true">
                                <use :xlink:href="`#icon-`+v.CurrencyName"></use>
                            </svg>
                            <span>{{v.CurrencyName}}</span>
                        </div>
                        <div class="btc-grid-r">
                            <span>≈{{v.Money}}CNY</span>
                            <span v-if="v.CurrencyName!='BDC'">≈{{(v.Money/BDC).toFixed(4)}}BDC</span>
                            <span>≈{{(v.Money/6.8).toFixed(4)}}USD</span>
                        </div>
                    </div>
                </v-grid>
            </div>
		</div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>

export default {
	data() {
		return {
            fixedAssets :   '',                                                         // 固定资产
            actAssets   :   '',                                                         // 通证资产
            gameAssets  :   '',                                                         // 游戏资产 
            sum         :   '0',                                                        // 资产总和
            cny         :   '0',                                                        // CNY
            currency    :   [],
            BDC         :   '0',                                                        // BDC的计算价格
            loop        :   '',                                                         // 定时器
            news        :   []                                                          // 系统公告
		}
	},
	methods: {
		GetAccount(){
			this.$server.post(
			'GetAccountById',
			{
				guid : this.$storage.get('guid')
			},
			).then(data => {
				if(data){
                    // 判断是否本地缓存了数据，如果有缓存则不更新本地缓存
                    this.fixedAssets = data.FixedAssets;
                    this.actAssets   = data.ActAssets;
                    this.gameAssets  = data.GameAssets;
                    if(!this.$storage.get('NickName')){
                        this.$storage.set('NickName',data.NickName);                        // 昵称
                        this.$storage.set('NickName',data.Name);                            // 用户名
                        this.$storage.set('HeadImg',data.HeadImg);                          // 昵称
                        this.$storage.set('RechargeCode',data.RechargeCode);                // 充值地址
                        this.$storage.set('Mobile',data.PhoneNo);                           // 手机号
                        this.$storage.set('Sex',data.Sex);                                  // 性别
                        this.$storage.set('ParentName',data.ParentName);                    // 推荐人
                        (data.RealName)?this.$storage.set('RealName',data.RealName):'';     // 判断是否进行了实名认证
                    }
                    // 进行资产计算请求
                    this.GetCurrencyPrice()
				}
			})
        },
        GetCurrencyPrice(){
            this.$server.post(
			'GetCurrencyPrice',
			{
                guid : this.$storage.get('guid'),
                Count: 0
			},{
                showLoading:false
            }
			).then(data => {
				if(data){
                    // 总资产折合算法 X=固定+通证+（游戏/BDC价格）(单位：BDC)
                    let t = this.gameAssets/data[0].Money;
                    let x = t+this.fixedAssets+this.actAssets;
                    this.sum = x.toFixed(8);
                    this.cny = (x*data[0].Money).toFixed(8)
                    this.BDC = data[0].Money;
                    this.currency = data;
				}
			})
        },
        GetSystemGG(){
            this.$server.post(
			'GetSystemGG',
			{
                guid : this.$storage.get('guid'),
                Count: 2
			},{
                showLoading:false
            }
			).then(data => {
				if(data){
                    // 总资产折合算法 X=固定+通证+（游戏/BDC价格）(单位：BDC)
                    this.news = data;
				}
			})
        }
	},
	mounted() {
		this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
        this.GetAccount();                                                          // 获取账户数据
        this.GetSystemGG();                                                         // 获取公告数据
        // 每隔1分钟请求一次数据
        this.loop = setInterval(()=>{
            this.GetCurrencyPrice()
        },60000)
    },
    beforeDestroy(){
        // 删除数据
        clearInterval(this.loop);
    }
}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/walletindex";
</style>