/* 获取选择货币列表及汇率 */

export const GetCurrency = {
    data() {
        return {
            CurrencyCode : '',
            PriceToBDC   : '',
            PriceToCNY   : ''
        }
    },
    methods: {
        getcurren(){
            // 首先，判断本地是否有缓存
            let currency = (this.$storage.get('currency'))?this.$storage.get('currency'):'';
            if(!currency){
                let lang = (this.$storage.get('lang'))?this.$storage.get('lang'):'zh';
                if(lang=="zh"){
                    //并且设置缓存为设置货币
                    var cy = 'CNY'
                    this.$storage.set('currency','CNY');
                }else if(lang=="en"){
                    var cy = "USD"
                    this.$storage.set('currency','USD');
                }
            }else{
                cy = currency
            }
            this.$server.post(
            'GetCountyCurrency',
            {
                guid            : this.$storage.get('guid'),
                currencyCode    : (cy)?cy:'',
            }).then(data => {
                if(data){
                    this.CurrencyCode = data[0].CurrencyCode;
                    this.PriceToBDC   = data[0].PriceToBDC;
                    this.PriceToCNY   = data[0].PriceToCNY;
                }
            })
        }
    }
}