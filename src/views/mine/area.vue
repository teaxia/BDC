<template>
	<div class="area padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="矿区">
            <div @click="uplevel()" class="up" slot="right">上一级</div>
        </x-header>
        <div class="main-container">
            <div>
                <Input search enter-button placeholder="输入矿区成员" />
            </div>
            <div class="mr20">
                <v-grid class="pb">
                    <flexbox>
                        <flexbox-item class="text-left">
                            <div>昵称：</div>
                            <div>邀请码：</div>
                            <div>V1矿区人数：</div>
                            <div>V1矿区BDC：</div>
                        </flexbox-item>
                        <flexbox-item class="text-right">
                            <div>团队人数：</div>
                            <div>团队BDC：</div>
                            <div>V2矿区人数：</div>
                            <div>V2矿区BDC：</div>
                        </flexbox-item>
                    </flexbox>
                </v-grid>
            </div>
            <div class="mr20">
                <table class="table">
                    <thead>
                        <tr>
                            <th v-for="(v,index) in th" :key="index">{{v.title}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(v,index) in dataList" :key="index">
                            <td>{{v.Area}}</td>
                            <td>{{v.NickName}}</td>
                            <td>{{v.InviteCode}}</td>
                            <td>{{v.TotalAssets}}</td>
                            <td><span v-clipboard:copy="v.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
                th: [
                    {
                        title: '矿区',
                    },
                    {
                        title: '昵称',
                    },
                    {
                        title: '邀请码',
                    },
                    {
                        title: 'BDC',
                    },
                    {
                        title: '操作',
                    }
                ],
                dataList: [],
			}
		},
		methods: {
			uplevel(){
                console.log('上一级');
            },
            query(){
                this.$server.post(
                'GetAccountTree',
                {
                    guid 	      :  this.$storage.get('guid'),
                    accountInfo   :  ''
                },
                ).then(data => {
                    if(data){
                        this.dataList = data;
                    }
                })
            },
            onCopy: function (e) {
				this.$vux.toast.show({
					text: this.$t('wallet.receive.tips.success'),
					type: 'success'
				})
			},
			onError: function (e) {
				this.$vux.toast.show({
					text: this.$t('wallet.receive.tips.error'),
					type: 'warn'
				})
            },
		},
		mounted() {
            this.query();
		}
	}

</script>
<style lang="scss">
.area{
    .thtitle{
        .ivu-table-cell{
            padding:0 5px !important;
            text-align: center;
            display: flex;
            justify-content: center;
        }
    }
}
</style>
<style scoped lang="scss">
@import "../../scss/views/mine/area";
</style>