<template>
	<div class="wallet padding-footer" v-cloak>
		<div class="main-container">
			<h1>{{$t("wallet.title")}}</h1>
            <div class="assets">
                <v-grid>
                    <div class="wallet-change pd-lb20">
                        <i class="iconfont icon-laiyuanqingkuang"></i>
                        <span @click="showclock()" class="lock fr">{{$t("wallet.tips.lock")}}</span>
                    </div>
                    <div class="wallet-band">
                        <div class="wallet-band-l fl">
                            <div class="wallet-band-tit">{{$t("wallet.tips.count")}}</div>
                            <div class="wallet-band-bdc">
                                <span class="num">{{sum}}</span>
                                <span class="bdc">BDC</span>
                            </div>
                            <div class="wallet-band-rmb">
                                ≈<span>{{cny}}{{CurrencyCode}}</span>
                            </div>
                            <div class="changeassets">
                                <router-link to="/wallet/changeassets">
                                    <i class="iconfont icon-Conversion"></i>
                                    <span>{{$t("wallet.tips.change")}}</span>
                                </router-link>
                            </div>
                        </div>
                        <div class="wallet-band-r fr">
                            <div class="wallet-assets">
                                <span class="assets-h1">{{$t("wallet.tips.capitalassets")}}</span><br/><span class="wallet_bdc">{{fixedAssets}}</span>（BDC）<br/>{{(fixedAssets/PriceToBDC).toFixed(8)}}（{{CurrencyCode}}）
                            </div>
                            <div class="wallet-assets">
                                <span class="assets-h1">{{$t("wallet.tips.actassets")}}</span><br/><span class="wallet_bdc">{{actAssets}}</span>（BDC）<br/>{{(actAssets/PriceToBDC).toFixed(8)}}（{{CurrencyCode}}）
                            </div>
                            <div class="wallet-assets">
                               <span class="assets-h1"> {{$t("wallet.tips.gameassets")}}</span><br/><span class="wallet_bdc">{{gameAssets}}</span>（BDC）<br/>{{(gameAssets/PriceToBDC).toFixed(8)}}（{{CurrencyCode}}）
                            </div>
                        </div>
                    </div>
                </v-grid>
            </div>
            <div class="send">
                <div class="bts">
                    <router-link to="/wallet/send">
                        <button class="btn btn-block btn-round"><i class="iconfont icon-send"></i>{{$t("wallet.btn.send")}}</button>
                    </router-link>
                </div>
                <div class="bts">
                    <router-link to="/wallet/receive">
                        <button class="btn btn-block btn-round"><i class="iconfont icon-icon"></i>{{$t("wallet.btn.receive")}}</button>
                    </router-link>
                </div>
            </div>
            <div class="mr30">
                <v-grid>
                    <flexbox>
                        <flexbox-item :span="11">
                            <ul class="pd-lb20">
                                <li v-for="(v,index) in news" class="ellipsis1" @click="onTourl('/wallet/notice')" :key="index">
                                    <span class="ellipsis1 title fl">{{v.Title}}</span>
                                    <span class="ellipsis1 time fr">{{(v.Sendtime).substring(0,10)}}</span>
                                </li>
                            </ul>
                        </flexbox-item>
                        <flexbox-item>
                            <i class="iconfont icon-search"></i>
                        </flexbox-item>
                    </flexbox>
                </v-grid>
            </div>
            <div v-for="(v,index) in currency" class="mr30" :key="index">
                <v-grid>
                    <div class="pd-lb20 btc-grid">
                        <div class="btc-grid-l">
                            <svg class="sicon" aria-hidden="true">
                                <use :xlink:href="`#icon-`+v.Name"></use>
                            </svg>
                            <span class="btc-grid-bdc">{{v.Name}}</span>
                        </div>
                        <div class="btc-grid-r">
                            <span class="btc-grid-bdc">{{v.BDCPrice}}</span>
                            <span>≈{{v.CurrencyPrice}}</span>
                        </div>
                    </div>
                </v-grid>
            </div>
		</div>
        <Modal v-model="showbox" cancel-text="" class-name="vertical-center-modal" :ok-text="$t('global.ok')" title="">
            <h2>{{$t("wallet.tips.lock")}}</h2>
            <div>{{$t("wallet.tips.lastdate")}}：<span class="fr">{{clockdata.LastDate}}</span></div>
            <div>{{$t("wallet.tips.lockenddate")}}：<span class="fr">{{clockdata.LockEndDate}}</span></div>
            <div>{{$t("wallet.tips.lockdays")}}：
                <span class="fr" v-if="clockdata.LockDays>1">{{clockdata.LockDays}}</span>
                <span class="fr" v-if="clockdata.LockDays<1">{{$t(release)}}</span>
            </div>
            <h2>{{$t("wallet.tips.assetsview")}}</h2>
            <table class="table">
                <tr>
                    <td>{{$t("wallet.tips.income")}}</td>
                    <td>{{$t("wallet.tips.balance")}}</td>
                    <td>{{$t("wallet.tips.date")}}</td>
                </tr>   
                <tr v-for="(v,index) in clockdata.List" :key="index">
                    <td>+{{v.Money}}</td>
                    <td>{{v.MoneyAfter}}</td>
                    <td>{{(v.CreateTime).substring(0,10)}}</td>
                </tr>
            </table>
        </Modal>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
import { GetCurrency } from '../../common/mixins/getcurrency';
import { islogin } from '../../common/mixins/islogin';
export default {
    mixins:[GetCurrency,islogin],
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
            news        :   [],                                                         // 系统公告
            showbox     :   false,
            clockdata   :   '',
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
                    if(!this.$storage.get('NickName')&&this.$storage.get('NickName')!='undefined'){
                        this.$storage.set('NickName',data.NickName);                        // 昵称
                        this.$storage.set('Name',data.Name);                                // 用户名
                        (data.RealName)?this.$storage.set('RealName',data.RealName):this.$storage.set('RealName','');
                        this.$storage.set('HeadImg',data.HeadImg);                          // 昵称
                        this.$storage.set('RechargeCode',data.RechargeCode);                // 充值地址
                        this.$storage.set('Mobile',data.PhoneNo);                           // 手机号
                        this.$storage.set('Sex',data.Sex);                                  // 性别
                        this.$storage.set('ParentName',data.ParentName);                    // 推荐人
                        this.$storage.set('InviteCode',data.InviteCode);                    // 邀请码
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
                    //let t = this.gameAssets/data[0].Money;
                    //let x = this.$math.add(t,this.fixedAssets,this.actAssets);
                    let x = this.$math.add(this.gameAssets,this.fixedAssets,this.actAssets);
                    this.sum = x.toFixed(8);
                    this.cny = (this.$math.eval(x/this.PriceToBDC)).toFixed(8)
                    this.BDC = data[0].Money;
				}
			})
        },
        GetPriceByCurrency(){
            this.$server.post(
			'GetPriceByCurrency',
			{
                guid            : this.$storage.get('guid'),
                currencyCode    : this.$storage.get('currency')
			},{
                showLoading:false
            }
			).then(data => {
				if(data){
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
                    this.news = data;
				}
			})
        },
        onTourl(url){
            this.$router.push({
                path:url,
            });
        },
        showclock(){
            this.$server.post(
			'GetFixedAssetsInfo',
			{
                guid : this.$storage.get('guid'),
                Count: 2
			}
			).then(data => {
				if(data){
                    this.clockdata = data;
                    this.showbox = true;
				}
			})
        },
        ok(){
            this.$Message.info('Clicked ok');
        },
	},
	mounted() {
        // 判断是否登录
        this.islogin();
		this.lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
        this.GetAccount();                                                          // 获取账户数据
        this.GetSystemGG();                                                         // 获取公告数据
        this.GetPriceByCurrency();                                                  // 获取信息
        // 每隔1分钟请求一次数据
        this.loop = setInterval(()=>{
            this.GetSystemGG();
            this.GetAccount();
            this.GetCurrencyPrice();
            this.GetPriceByCurrency();
        },60000)
        this.getcurren();
    },
    beforeDestroy(){
        // 清除计时器
        clearInterval(this.loop);
    }
}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/walletindex";
</style>