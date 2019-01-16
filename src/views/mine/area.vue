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
                            <div>{{Area}}</div>
                            <div>{{NickName}}</div>
                            <div>{{GroupBDC}}</div>
                            <div class="copy">
                                <div>{{InviteCode}}</div>
                                <div><button class="btn btn-xs btn-round" v-clipboard:copy="InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                            </div>
                        </div>
                    </div>
                    <div class="father childRow">
                        <div class="mr">
                            <!-- 循环二级层 -->
                            <div class="childBlock">
                                <div v-for="(v,index) in dataList" :key="index" v-if="v.Area=='V1'&&v.Level==2" :id="v.Area" class="border">
                                    <div @click="query(v.AccountId)">{{v.Area}}</div>
                                    <div @click="query(v.AccountId)">{{v.NickName}}</div>
                                    <div @click="query(v.AccountId)">{{v.TotalAssets}}</div>
                                    <div class="copy">
                                        <div>{{v.InviteCode}}</div>
                                        <div><button class="btn btn-xs btn-round" v-clipboard:copy="v.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                    </div>
                                </div>
                            </div>
                            <div class="blank">
                                <!-- 占位 -->
                            </div>
                            <div class="childBlock">
                                <div v-for="(v,index) in dataList" :key="index" v-if="v.Area=='V2'&&v.Level==2" :id="v.Area" class="border">
                                    <div @click="query(v.AccountId)">{{v.Area}}</div>
                                    <div @click="query(v.AccountId)">{{v.NickName}}</div>
                                    <div @click="query(v.AccountId)">{{v.TotalAssets}}</div>
                                    <div class="copy">
                                        <div>{{v.InviteCode}}</div>
                                        <div><button class="btn btn-xs btn-round" v-clipboard:copy="v.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="child childRow">
                        <template v-for="v in dataList">
                            <div class="childBlock">
                                <div v-for="n in v.child" :key="n.AccountId" v-if="n.Area=='V1'&&n.Level==3" :id="n.Area" class="border">
                                    <div @click="query(n.AccountId)">{{n.Area}}</div>
                                    <div @click="query(n.AccountId)">{{n.NickName}}</div>
                                    <div @click="query(n.AccountId)">{{n.TotalAssets}}</div>
                                    <div class="copy">
                                        <div>{{n.InviteCode}}</div>
                                        <div><button class="btn btn-xs btn-round" v-clipboard:copy="n.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                    </div>
                                </div>
                            </div>
                            <div class="childBlock">
                                <div v-for="n in v.child" :key="n.AccountId" v-if="n.Area=='V2'&&n.Level==3" :id="n.Area" class="border">
                                    <div @click="query(n.AccountId)">{{n.Area}}</div>
                                    <div @click="query(n.AccountId)">{{n.NickName}}</div>
                                    <div @click="query(n.AccountId)">{{n.TotalAssets}}</div>
                                    <div class="copy">
                                        <div>{{n.InviteCode}}</div>
                                        <div><button class="btn btn-xs btn-round" v-clipboard:copy="n.InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('global.copy')}}</button></div>
                                    </div>
                                </div>
                            </div>
                        </template>
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
                dataList: [],
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
                keyword     :   ''
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
                        
                        // 平行数组根据Level映射成有父子关系的数组
                        let tree        =    data.TreeList
                        this.Area       =    data.TreeList[0].Area
                        tree.forEach(ele => { 
                            let ParentId = ele.ParentId;
                            if (ParentId != 0) {
                                //如果ele是子元素的话 ,把ele扔到他的父亲的child数组中.
                                tree.forEach(d => {
                                    if (d.AccountId === ParentId) {
                                        let childArray = d.child;
                                        if (!childArray) {
                                            childArray = []
                                        }
                                        childArray.push(ele); 
                                        d.child = childArray;
                                    }
                                })
                            }
                        });
                        //去除重复元素
                        let newData = tree.filter(ele => ele.ParentId === 0);
                        this.dataList    =   newData;
                        console.log(data)
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