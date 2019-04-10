/* 绑定支付方式的弹窗层 */

export const BindPayment = {
	data(){
		return{
			wechartId               :   '',                         // 微信支付ID
            alipayId                :   '',                         // 支付宝支付ID
            bankId                  :   '',                         // 银联支付ID
            alipay                  :  false,                     // 支付宝
            cardpay                 :  false,                     // 银行卡
            wechart                 :  false,                     // 微信支付
            bankinfo                :   [],                         // 支付方式的信息
            cardinfo                :   [],                       // 绑定的银行卡信息
            showPupop               :   false,                      // 弹出层
            PayType                 :   0,                          // 0微信/1支付宝/2银联
            PayNum                  :   '',                       // 有多少绑定数据
		}
	},
    methods: {
        sbankd(val){
            // 开启弹窗选择
            this.showPupop = true
            // 给该支付方式赋值
            this.PayType   = val
            // 判断是否绑定该支付方式
            let _that = this
            switch (val) {
                case 0:
                    //  微信支付
                    this.bankinfo.forEach(function(item,i,arr){
                        let p = false
                        if(item.thirdName=='微信'){
                            _that.PayNum = true
                        }
                    });
                break;
                case 1:
                    // 支付宝
                    this.bankinfo.forEach(function(item,i,arr){
                        let p = false
                        if(item.thirdName=='支付宝'){
                            _that.PayNum = true
                        }
                    });
                break;
            }
        },
        select(val,type,hide=true){
            // 接受的支付方式'
            var _this = this
            switch (val) {
                case 'alipay':
                    (type)?this.alipay = true:this.alipay = false
                    if(hide){
                        this.$vux.toast.show({
                            text        :   (_this.alipay)?this.$t('discovery.OTC.sell.tips.openalipay'):this.$t('discovery.OTC.sell.tips.offalipay'),
                            position    :   'default',
                            type        :   'text'
                        })
                    }
                break;
                case 'cardpay':
                    (type)?this.cardpay = true:this.cardpay = false
                    if(hide){
                        this.$vux.toast.show({
                            text        :   (_this.cardpay)?this.$t('discovery.OTC.sell.tips.opencard'):this.$t('discovery.OTC.sell.tips.offcard'),
                            position    :   'default',
                            type        :   'text'
                        })
                    }
                break;
                case 'wechart':
                    (type)?this.wechart = true:this.wechart = false
                    if(hide){
                        this.$vux.toast.show({
                            text        :   (_this.wechart)?this.$t('discovery.OTC.sell.tips.openwechart'):this.$t('discovery.OTC.sell.tips.offwechart'),
                            position    :   'default',
                            type        :   'text'
                        })
                    }
                break;
            }
        },
        cancelPupop(val){
            // 取消选择 0微信/1支付宝/2银联
            this.showPupop = false
            switch (val) {
                case 0:
                    this.wechartId  =   ''
                    this.select('wechart')
                break;
                case 1:
                    this.alipayId   =  ''
                    this.select('alipay')
                break;
                case 2:
                    this.bankId     =   ''
                    this.select('cardpay')
                break;
            }
        },
        okPupop(val){
            // 确定选择 0微信/1支付宝/2银联
            switch (val) {
                case 0:
                    if(this.wechartId==''){
                        this.$vux.toast.show({
                            text        :   this.$t('discovery.OTC.sell.tips.selectbank'),
                            position    :   'default',
                            type        :   'warn'
                        })
                        return;
                    }
                    this.select('wechart',true)
                break;
                case 1:
                    if(this.alipayId==''){
                        this.$vux.toast.show({
                            text        :   this.$t('discovery.OTC.sell.tips.selectbank'),
                            position    :   'default',
                            type        :   'warn'
                        })
                        return;
                    }
                    this.select('alipay',true)
                break;
                case 2:
                    if(this.bankId==''){
                        this.$vux.toast.show({
                            text        :   this.$t('discovery.OTC.sell.tips.selectbank'),
                            position    :   'default',
                            type        :   'warn'
                        })
                        return;
                    }
                    this.select('cardpay',true)
                break;
            }
            this.showPupop = false
        },
        pierce(val,id){
            // 选择银行卡等的事件穿透
            switch (val) {
                case 'alipay':
                    this.alipayID = id
                break;
                case 'cardpay':
                    this.bankId   = id
                break;
                case 'wechart':
                    this.wechartId = id
                break;
            }
        },
        GetBindBankInfo(){
            // 请求开户银行
            this.$server.post(
            'GetBindBankCardList',{
                guid 	:   this.$storage.get('guid'),
            }).then(data => {
                if(data){
                    this.cardinfo = data.list
                }
            })
        },
        GetBind(){
            // 请求绑定的银行卡信息
            this.$server.post(
            'GetThirdInfo',
            {
                guid : this.$storage.get('guid')
            }).then(data => {
                if(data){
                    this.bankinfo = data
                }
            })
        },
    },
    mounted(){
        // 获取绑定的收款方式
        this.GetBind()
        this.GetBindBankInfo()
    }
}