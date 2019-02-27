/* 获取选择货币列表及汇率 */

export const GetCurrency = {
    data() {
        return {
            CurrencyCode : '',
            PriceToBDC   : '',
            PriceToCNY   : '',
            CurrencyList : ''
        }
    },
    methods: {
        getcurren(full='false'){
            // 判断是否获取所有数据
            if(full=='false'){
                // 首先，判断本地是否有缓存
                let currency = (this.$storage.get('currency_new'))?this.$storage.get('currency_new'):'';
                // 根据语言来设置默认货币
                if(!currency){
                    // let lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
                    // if(lang=="zh"){
                    //     //并且设置缓存为设置货币
                    //     var cy = 'CNY'
                    //     this.$storage.set('currency','CNY');
                    // }else if(lang=="en"){
                    //     var cy = "USD"
                    //     this.$storage.set('currency','USD');
                    // }
                    // 修改为默认USD货币，不根据语言默认货币
                    var cy = "USD"
                    this.$storage.set('currency_new','USD');
                }else{
                    cy = currency
                }

            }
            this.$server.post(
            'GetCountyCurrency',
            {
                guid            : this.$storage.get('guid'),
                currencyCode    : (cy)?cy:'',                         // 默认传值
            }).then(data => {
                if(data){
                    this.CurrencyList = data;
                    this.CurrencyCode = data[0].CurrencyCode;
                    this.PriceToBDC   = data[0].PriceToBDC;
                    this.PriceToCNY   = data[0].PriceToCNY;
                }
            })
        }
    }
}