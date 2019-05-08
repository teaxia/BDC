<template>
	<div class="area margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.area.title')">
        </x-header>
        <div class="main-container">
            <flexbox class="line-b earning">
                <flexbox-item>
                    <div class="center">
                        <div>{{$t('mine.area.all')}}</div>
                        <div class="myearnings">{{$numberComma(allCount)}}</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="center">
                        <div>{{$t('mine.area.mychild')}}</div>
                        <div class="myearnings">{{$numberComma(ztCount)}}</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="center">
                        <div>{{$t('mine.area.tfix')}}</div>
                        <div class="myearnings">{{$numberComma(tfix)}}</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="center">
                        <div>{{$t('mine.area.tAct')}}</div>
                        <div class="myearnings">{{$numberComma(tAct)}}</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="center">
                        <div>{{$t('mine.area.tGame')}}</div>
                        <div class="myearnings">{{$numberComma(tGame)}}</div>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox class="mr20">
                <flexbox-item>
                    <Input search @on-search="query(keyword)" v-model="keyword" enter-button :placeholder="$t('mine.area.enter')" />
                </flexbox-item>
                <flexbox-item>
                    <flexbox>
                        <flexbox-item><button @click="query('',1)" class="btn btn-query btn-round">{{$t('mine.area.vall')}}</button></flexbox-item>
                        <flexbox-item><button @click="query('',0)" class="btn btn-query btn-round">{{$t('mine.area.vchild')}}</button></flexbox-item>
                    </flexbox>
                </flexbox-item>
            </flexbox>
            <div class="mr20">
                <flexbox class="time">
                    <flexbox-item>
                        <DatePicker @on-change="startime" type="date" v-model="stardate" format="yyyy/MM/dd" placement="bottom-start" :placeholder="$t('discovery.bill.begin')"></DatePicker>
                    </flexbox-item>
                    <flexbox-item>
                        <DatePicker @on-change="endtime" type="date"  v-model="enddate" format="yyyy/MM/dd" placement="bottom-end" :placeholder="$t('discovery.bill.end')"></DatePicker>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="mr20">
                <table class="table">
                    <thead>
                        <tr>
                            <th v-for="(v,index) in th" :key="index" :class="`w-`+index">{{v.title}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(v,index) in dataList" :key="index">
                            <td class="w-0">{{v.Name}}</td>
                            <td class="w-1">{{v.InviteName}}</td>
                            <td class="w-2">{{v.CreateTime}}</td>
                            <td class="edit w-3">
                                <button class="btn btn-auto btn-round" @click="GetMyGroup_MX(v.Id,2)">详细</button>
                                <button class="btn btn-auto btn-round" @click="GetMyGroup_MX(v.Id,0)">流水</button>
                                <button class="btn btn-auto btn-round" @click="GetMyGroup_MX(v.Id,1)">盈亏</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 三个按钮 -->
            <!-- <div class="foot-botton mr10">
                <router-link :to="{ path: '/discovery/bill', query: { type: '7' }}"><button class="btn  btn-block btn-round">{{$t("mine.area.achievement")}}</button></router-link> -->
                <!-- <router-link to="/discovery/withdrawal"><button class="btn  btn-block btn-round">{{$t("mine.menus.withdrawal")}}</button></router-link> -->
                <!-- <div><button @click="GetMyChildList" class="btn  btn-block btn-round">{{$t("mine.area.mychild")}}</button></div> -->
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
    import { clipBoard } from '../../common/mixins/clipBoard'
	export default {
		mixins:[clipBoard],
		data() {
			return {
                th: [{
                        title: this.$t('mine.area.nickname'),
                    },
                    {
                        title: '推荐人',
                    },
                    {
                        title: this.$t('mine.area.date'),
                    },
                    {
                        title: '操作',
                    },
                ],
                dataList    :   [],
                NickName    :   '',         // 昵称
                keyword     :   '',         // 查询用户名
                tGame       :   '',         // 总游戏资产
                tAct        :   '',         // 总通证资产
                tfix        :   '',         // 总固定资产
                ztCount     :   '',         // 直推人数
                allCount    :   '',         // 团队人数
                stardate    :   '',         // 开始时间
                enddate     :   '',         // 结束时间
			}
		},
		methods: {
            query(Info,type=1){
                this.$server.post(
                'GetMyGroup',
                {
                    guid 	      :  this.$storage.get('guid'),
                    accountInfo   :  (Info)?Info:'',
                    dtStart       :  this.stardate,
                    dtEnd         :  this.enddate,
                    type          :  type,                            //(类型：直推0，全部1)
                }).then(data => {
                    if(data){
                        this.tGame      =       data.tGame
                        this.tAct       =       data.tAct
                        this.tfix       =       data.tfix
                        this.ztCount    =       data.ztCount
                        this.allCount   =       data.allCount
                        this.dataList   =       data.accList
                    }
                })
            },
            startime(e){
                if(this.stardate==''||this.enddate==''){
                    return;
                }
                this.stardate = e;
                this.query();
            },
            endtime(e){
                if(this.stardate==''||this.enddate==''){
                    return;
                }
                this.enddate = e;
                this.query();
            },
            GetMyGroup_MX(accountId,type){
                // 跳转到明细页面 /mine/area/group
                // type 2 详细 0明细 1盈亏
                if(type==2){
                    this.$router.push({
                        path:"/mine/area/group",
                        query:{
                            aid      :   accountId,
                        }
                    });
                }else{
                    this.$router.push({
                        path:"/mine/area/GroupCount",
                        query:{
                            aid      :   accountId,
                            type     :   type
                        }
                    });
                }
            }
		},
		mounted() {
            // 获取今天日期
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            this.stardate = (year+'/'+month+'/'+day);
            this.enddate = (year+'/'+month+'/'+day);
            // 获取数据
            this.query();
        }
	}

</script>
<style scoped lang="scss">
@import "../../scss/views/mine/area";
</style>