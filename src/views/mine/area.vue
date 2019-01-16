<template>
	<div class="area padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.area.title')">
            <div @click="query(level)" class="up" slot="right">{{$t('mine.area.levelup')}}</div>
        </x-header>
        <div class="main-container">
            <div>
                <Input search @on-search="query(keyword)" v-model="keyword" enter-button :placeholder="$t('mine.area.enter')" />
            </div>
            <div class="mr20">
                <v-grid class="pb">
                    <flexbox>
                        <flexbox-item class="text-left">
                            <div>{{$t('mine.area.nickname')}}：{{NickName}}</div>
                            <div>{{$t('mine.area.invitecode')}}：{{InviteCode}}</div>
                            <div>{{$t('mine.area.v1count')}}：{{V1_Count}}</div>
                            <div>{{$t('mine.area.v1bdc')}}：{{V1_BDC}}</div>
                        </flexbox-item>
                        <flexbox-item class="text-right">
                            <div>{{$t('mine.area.groupcount')}}：{{GroupCount}}</div>
                            <div>{{$t('mine.area.groupbdc')}}：{{GroupBDC}}</div>
                            <div>{{$t('mine.area.v2count')}}：{{V2_Count}}</div>
                            <div>{{$t('mine.area.v2bdc')}}：{{V2_BDC}}</div>
                        </flexbox-item>
                    </flexbox>
                </v-grid>
            </div>
            <div class="mr20">
                <!-- <table class="table">
                    <thead>
                        <tr>
                            <th v-for="(v,index) in th" :key="index">{{v.title}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(v,index) in dataList" :key="index">
                            <td @click="query(v.AccountId)">{{v.Area}}</td>
                            <td @click="query(v.AccountId)">{{v.NickName}}</td>
                            <td @click="query(v.AccountId)">{{v.TotalAssets}}</td>
                            <td @click="query(v.AccountId)">{{v.InviteCode}}</td>
                            <td><span v-clipboard:copy="v.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</span></td>
                        </tr>
                    </tbody>
                </table> -->
                <div class="family">
                    <div class="root">
                        <div class="childBlock border">
                            <div v-if="f1.InviteCode">
                                <div @click="query(f1.AccountId)">{{f1.Area}}</div>
                                <div @click="query(f1.AccountId)" class="ellipsis1">{{f1.NickName}}</div>
                                <div @click="query(f1.AccountId)" class="ellipsis1">{{f1.TotalAssets}}</div>
                                <div class="copy">
                                    <div>{{f1.InviteCode}}</div>
                                    <div><button class="btn btn-xs btn-round" v-clipboard:copy="f1.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="father childRow">
                        <div class="mr">
                            <!-- 循环二级层 -->
                            <div class="childBlock">
                                <div v-if="f2.InviteCode">
                                    <div @click="query(f2.AccountId)">{{f2.Area}}</div>
                                    <div @click="query(f2.AccountId)" class="ellipsis1">{{f2.NickName}}</div>
                                    <div @click="query(f2.AccountId)" class="ellipsis1">{{f2.TotalAssets}}</div>
                                    <div class="copy">
                                        <div>{{f2.InviteCode}}</div>
                                        <div><button class="btn btn-xs btn-round" v-clipboard:copy="f2.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                    </div>
                                </div>
                            </div>
                            <div class="blank">
                                <!-- 占位 -->
                            </div>
                            <div class="childBlock">
                                <div v-if="f3.InviteCode">
                                    <div @click="query(f3.AccountId)">{{f3.Area}}</div>
                                    <div @click="query(f3.AccountId)" class="ellipsis1">{{f3.NickName}}</div>
                                    <div @click="query(f3.AccountId)" class="ellipsis1">{{f3.TotalAssets}}</div>
                                    <div class="copy">
                                        <div>{{f3.InviteCode}}</div>
                                        <div><button class="btn btn-xs btn-round" v-clipboard:copy="f3.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="child childRow">
                        <div class="childBlock">
                            <div v-if="f4.InviteCode">
                                <div @click="query(f4.AccountId)">{{f4.Area}}</div>
                                <div @click="query(f4.AccountId)" class="ellipsis1">{{f4.NickName}}</div>
                                <div @click="query(f4.AccountId)" class="ellipsis1">{{f4.TotalAssets}}</div>
                                <div class="copy">
                                    <div>{{f4.InviteCode}}</div>
                                    <div><button class="btn btn-xs btn-round" v-clipboard:copy="f4.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                </div>
                            </div>
                        </div>
                        <div class="childBlock">
                            <div v-if="f5.InviteCode">
                                <div @click="query(f5.AccountId)">{{f5.Area}}</div>
                                <div @click="query(f5.AccountId)" class="ellipsis1">{{f5.NickName}}</div>
                                <div @click="query(f5.AccountId)" class="ellipsis1">{{f5.TotalAssets}}</div>
                                <div class="copy">
                                    <div>{{f5.InviteCode}}</div>
                                    <div><button class="btn btn-xs btn-round" v-clipboard:copy="f5.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                </div>
                            </div>
                        </div>
                        <div class="childBlock">
                            <div v-if="f6.InviteCode">
                                <div @click="query(f6.AccountId)">{{f6.Area}}</div>
                                <div @click="query(f6.AccountId)" class="ellipsis1">{{f6.NickName}}</div>
                                <div @click="query(f6.AccountId)" class="ellipsis1">{{f6.TotalAssets}}</div>
                                <div class="copy">
                                    <div>{{f6.InviteCode}}</div>
                                    <div><button class="btn btn-xs btn-round" v-clipboard:copy="f6.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                </div>
                            </div>
                        </div>
                        <div class="childBlock">
                            <div v-if="f7.InviteCode">
                                <div @click="query(f7.AccountId)">{{f7.Area}}</div>
                                <div @click="query(f7.AccountId)" class="ellipsis1">{{f7.NickName}}</div>
                                <div @click="query(f7.AccountId)" class="ellipsis1">{{f7.TotalAssets}}</div>
                                <div class="copy">
                                    <div>{{f7.InviteCode}}</div>
                                    <div><button class="btn btn-xs btn-round" v-clipboard:copy="f7.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                        title: this.$t('mine.area.area'),
                    },
                    {
                        title: this.$t('mine.area.nickname'),
                    },
                    {
                        title: 'BDC',
                    },
                    {
                        title: this.$t('mine.area.invitecode'),
                    },
                    {
                        title: this.$t('mine.area.edit'),
                    }
                ],
                dataList    :   [],
                NickName    :   '',         // 昵称
                InviteCode  :   '',         // 邀请码
                Area        :   '',         // 根节点的矿区
                V1_Count    :   '',
                V1_BDC      :   '',
                V2_Count    :   '',
                V2_BDC      :   '',         
                GroupCount  :   '',         // 团队人数
                GroupBDC    :   '',         // 团队资产
                level       :   '',         // 上一级ID
                keyword     :   '',
                f1          :   [],
                f2          :   [],
                f3          :   [],
                f4          :   [],
                f5          :   [],
                f6          :   [],
                f7          :   [],
			}
		},
		methods: {
            query(Info){
                this.$server.post(
                'GetAccountTreeNew',
                {
                    guid 	      :  this.$storage.get('guid'),
                    accountInfo   :  (Info)?Info:'',
                }).then(data => {
                    if(data){
                        this.NickName    =   data.NickName;           // 昵称
                        this.InviteCode  =   data.InviteCode;         // 邀请码
                        this.V1_Count    =   data.V1_Count;
                        this.V1_BDC      =   data.V1_BDC;
                        this.V2_Count    =   data.V2_Count;
                        this.V2_BDC      =   data.V2_BDC;        
                        this.GroupCount  =   data.GroupCount;         // 团队人数
                        this.GroupBDC    =   data.GroupBDC;
                        this.level       =   data.ParentId;
                        let tree         =   data.TreeList;
                        this.f1 = ''
                        this.f2 = ''
                        this.f3 = ''
                        this.f4 = ''
                        this.f5 = ''
                        this.f6 = ''
                        this.f7 = ''
                        tree.forEach((ele,index) => {
                            // 循环给层级赋值（以后慢慢换吧）
                            if(ele.Level==1){
                                this.f1 = ele
                            }
                            if(ele.Level==2&&ele.Area=='V1'){
                                this.f2 = ele
                            }
                            if(ele.Level==2&&ele.Area=='V2'){
                                this.f3 = ele
                            }
                            if(ele.Level==3&&ele.Area=='V1'&&this.f2.AccountId==ele.ParentId){
                                this.f4 = ele
                            }
                            if(ele.Level==3&&ele.Area=='V2'&&this.f2.AccountId==ele.ParentId){
                                this.f5 = ele
                            }
                            if(ele.Level==3&&ele.Area=='V1'&&this.f3.AccountId==ele.ParentId){
                                this.f6 = ele
                            }
                            if(ele.Level==3&&ele.Area=='V2'&&this.f3.AccountId==ele.ParentId){
                                this.f7 = ele
                            }
                        })
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