<template>
	<div class="btob padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.self.title')"></x-header>
        <div class="main-container">
            <div class="mr10">
                <v-grid>
                    <div class="pd-lb20">
                        <flexbox class="vux-1px-b pb">
                            <flexbox-item :span="3" class="lable">
                                {{$t('discovery.self.num')}}:
                            </flexbox-item>
                            <flexbox-item :span="5">
                                <input type="text" v-model="num" :placeholder="$t('discovery.self.tips.num')"/>
                            </flexbox-item>
                        </flexbox>
                        <flexbox class="mr20 pb vux-1px-b">
                            <flexbox-item :span="3" class="lable">
                                {{$t('discovery.self.CNYNum')}}:
                            </flexbox-item>
                            <flexbox-item>
                                <input type="text" v-model="cnynum" :placeholder="$t('discovery.self.tips.CNYNum')"/>
                            </flexbox-item>
                        </flexbox>
                        <flexbox class="mr20 pb vux-1px-b">
                            <flexbox-item :span="3" class="lable">
                                {{$t('discovery.self.BankCardNo')}}:
                            </flexbox-item>
                            <flexbox-item :span="6">
                                <input type="text" v-model="BankCardNo" :placeholder="$t('discovery.self.tips.BankCardNo')"/>
                            </flexbox-item>
                        </flexbox>
                        <flexbox class="mr20 pb vux-1px-b">
                            <flexbox-item :span="3" class="lable">
                                {{$t('discovery.self.name')}}:
                            </flexbox-item>
                            <flexbox-item :span="6">
                                <input type="text" v-model="name" :placeholder="$t('discovery.self.tips.name')"/>
                            </flexbox-item>
                        </flexbox>
                        <flexbox class="mr20 pb"> 
                            <flexbox-item :span="3" class="lable">
                                {{$t('discovery.self.remarks')}}:
                            </flexbox-item>
                            <flexbox-item>
                                <textarea type="text" v-model="remarks">
                                </textarea>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </v-grid>
            </div>
            <button @click="submit()" class="btn btn-block btn-round mr40">{{$t('global.submit')}}</button>
        </div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
        name:'btob',
		data() {
			return {
                num         :   '',
                cnynum      :   '',         // 人民币价格
                BankCardNo  :   '',         // 银行卡号后四位
                name        :   '',         // 转账人姓名
                remarks     :   '',         // 备注
			}
        },
		methods: {
            submit(){
                if(this.num==''){
                    this.$vux.toast.show({
                        text: this.$t('discovery.self.tips.num'),
                        type: 'warn'
                    })
                    return;
                }
                if(this.cnynum==''){
                    this.$vux.toast.show({
                        text: this.$t('discovery.self.tips.CNYNum'),
                        type: 'warn'
                    })
                    return;
                }
                if(this.BankCardNo==''){
                    this.$vux.toast.show({
                        text: this.$t('discovery.self.tips.BankCardNo'),
                        type: 'warn'
                    })
                    return;
                }
                if(this.name==''){
                    this.$vux.toast.show({
                        text: this.$t('discovery.self.tips.name'),
                        type: 'warn'
                    })
                    return;
                }
                this.$server.post(
                'AddRechargeBySelf',
                {
                    guid 	        :   this.$storage.get('guid'),
                    BDCNum          :   this.num,                           // 购买数量
                    CNYNum          :   this.cnynum,                      // RMB价格
                    BankCardNo      :   this.BankCardNo,
                    SaverName       :   this.name,
                    Remarks         :   this.remarks
                }).then(data => {
                    if(data){
                        this.$vux.toast.show({
                            text: this.$t('global.wait'),
                            type: 'success'
                        })
                        this.num = ''
                        this.cnynum = ''
                        this.BankCardNo = ''
                        this.name = ''
                        this.remarks = ''
                    }
                    
                })
            }
		},
		mounted() {
            
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/btob";
</style>