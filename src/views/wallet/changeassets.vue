<template>
	<div class="changeassets padding-footer" v-cloak>
        <x-header :title="$t('wallet.tips.change')"></x-header>
		<div class="main-container">
            <div class="assets">
                <ul>
                    <li><i class="iconfont icon-Passingassets"></i>固定资产：<span>{{fixedAssets}}</span><span class="fr">BDC</span></li>
                    <li><i class="iconfont icon-xiaohongqi01"></i>通证资产：<span>{{actAssets}}</span><span class="fr">BDC</span></li>
                    <li><i class="iconfont icon-Gameassets"></i>游戏资产：<span>{{gameAssets}}</span><span class="fr">BDC</span></li>   
                </ul>
            </div>
            <div class="assets">
                <flexbox class="changelist">
                    <flexbox-item :span="3">
                        <div class="changename">
                            转换方式：
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="5">
                        <select v-model="type">
                            <option value="1">通证转游戏</option>
                            <option value="2">游戏转通证</option>
                            <option value="3">通证转固定</option>
                        </select>
                    </flexbox-item>
                </flexbox>
                <flexbox class="changelist">
                    <flexbox-item :span="3">
                        <div class="changename">
                            转换{{meus[type]}}：
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="5">
                        <input type="num" v-model.number="num" :placeholder="'请输入'+meus[type]+'数额'" />
                    </flexbox-item>
                </flexbox>
                <flexbox class="changelist">
                    <flexbox-item :span="3">
                        <div class="changename">
                            安全密码：
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <input type="num" placeholder="请输入安全码" />
                    </flexbox-item>
                </flexbox>
                <div class="change-rate" v-if="type!=3">
                    <div class="rate"><span>BDC价格:</span>{{PriceBDC}}</div>
                    <div class="rate"><span>兑换率:</span>{{DHL}}</div>
                    <div class="rate"><span>{{meus[type]}}:</span>{{matchprice}}</div>
                </div>
            </div>
            <button class="btn btn-block btn-round mr30">立即转换</button>
		</div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>

export default {
    name:'changeassets',
	data() {
		return {
            fixedAssets :   '',                                                         // 固定资产
            actAssets   :   '',                                                         // 通证资产
            gameAssets  :   '',                                                         // 游戏资产 
            type        :   '1',                                                        // 转换类型
            num         :   '',                                                         // 兑换的数量
            matchprice  :   '0',                                                        // 计算的结果
            meus        :   ['','BDC','CNY','BDC'],
            traninfo    :   [],                                                         // 接收到的行情数据
            PriceBDC    :   '',
            DHL         :   '',
            X           :   '',
		}
    },
    watch:{
        type(){
            switch (this.type){
                case '1':
                    this.PriceBDC = this.traninfo[0].PriceBDC;
                    this.DHL      = this.traninfo[0].DHL;
                    this.X        = this.traninfo[0].X;
                    break;
                case '2':
                    this.PriceBDC = this.traninfo[1].PriceBDC;
                    this.DHL      = this.traninfo[1].DHL;
                    this.X        = this.traninfo[1].X;
                    break;
                default:
                    this.PriceBDC = 0;
                    this.DHL      = 0;
                    this.X        = 0;
                    break;
            }
        },
        num(){
            switch (this.type){
                case '1':
                    //限制不能大于通证资产
                    this.matchprice = (this.num*this.X).toFixed(8);
                    break;
                case '2':
                    //限制不能大于游戏资产
                    this.matchprice = (this.num/this.X).toFixed(8);
                    break;
                case '2':
                    //限制不能大于固定资产
                    break;
                default:
                    this.matchprice = 0;
                    break;
            }
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
				}
			})
        },
        GetActGameTranInfo(){
            this.$server.post(
			'GetActGameTranInfo',
			{
				guid : this.$storage.get('guid')
			},
			).then(data => {
				if(data){
                    this.traninfo = data;
                    this.PriceBDC = data[0].PriceBDC;
                    this.DHL      = data[0].DHL;
                    this.X        = data[0].X;
				}
			})
        }
	},
	mounted() {
        this.GetActGameTranInfo();
		this.GetAccount();
    },
}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/changeassets";
</style>