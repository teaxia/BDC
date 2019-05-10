<template>
	<div class="withdrawal padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back'),preventGoBack:true}" @on-click-back="back()" :title="$t('mine.area.lsyk')"></x-header>
        <div class="main-container">
            <div class="mr20">
                <flexbox class="time">
                    <flexbox-item>
                        <DatePicker type="date" v-model="dtStart" format="yyyy/MM/dd" placement="bottom-start" :placeholder="$t('discovery.bill.begin')"></DatePicker>
                    </flexbox-item>
                    <flexbox-item>
                        <DatePicker type="date" v-model="dtEnd" format="yyyy/MM/dd" placement="bottom-end" :placeholder="$t('discovery.bill.end')"></DatePicker>
                    </flexbox-item>
                    <flexbox-item :span="1">
                        <div class="search" @click="GetMyGroupLSYK()"><i class="ivu-icon ivu-icon-ios-search"></i></div>
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="mr30">
                <divider class="tj">{{$t('mine.area.personal')}}：{{self}}</divider>
            </div>
            <div class="mr20">
                <table class="table">
                    <thead>
                        <tr>
                            <th>{{$t('mine.area.datea')}}</th>
                            <th>{{$t('mine.area.chain')}}</th>
                            <th>{{$t('mine.area.game')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(v,index) in personalList" :key="index">
                            <td class="w-0">{{v.CreateTime}}</td>
                            <td class="w-1">{{v.QKLGame}}</td>
                            <td class="w-2">{{v.QPGame}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mr30">
                <divider class="tj">{{$t('mine.area.groupcount')}}：{{group}}</divider>
            </div>
            <div class="mr20">
                <table class="table">
                    <thead>
                        <tr>
                            <th>{{$t('mine.area.datea')}}</th>
                            <th>{{$t('mine.area.chain')}}</th>
                            <th>{{$t('mine.area.game')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(v,index) in GroupList" :key="index">
                            <td class="w-0">{{v.CreateTime}}</td>
                            <td class="w-1">{{v.QKLGame}}</td>
                            <td class="w-2">{{v.QPGame}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
        name:'myGroupInfo',
		data() {
			return {
                aid         :   '',                 // 传值过来的用户ID
                adtStart    :   '',                 // 传过来的开始时间
                adtEnd      :   '',                 // 传过来的结束时间
                accountInfo :   '',                 // 传过来的用户名
                atype       :   '',                 // 传过来的(类型：直推0，全部1)
                type        :   '',                 // 1流水 2盈亏
                dtStart     :   '',                 // 开始时间
                dtEnd       :   '',                 // 结束时间
                personalList:   [],                 // 个人
                GroupList   :   [],                 // 团队
                group       :   [],                 // 个人统计
                self        :   [],                 // 团队统计
			}
        },
        watch:{

        },
		methods: {
            GetMyGroupLSYK(){
                // 查询收益账目信息
                this.$server.post(
                'GetMyGroup_LSYK',
                {
                    guid        :   this.$storage.get('guid'),
                    accountId   :   this.aid,
                    type        :   this.type,
                    dtStart     :   this.dtStart,
                    dtEnd       :   this.dtEnd
                }).then(data => {
                    if(data){
                        this.personalList   =   data.listSelf
                        this.GroupList      =   data.listGroup
                        this.self           =   data.self
                        this.group          =   data.group
                    }
                })
            },
            back(){
                this.$router.push({
                    path:"/mine/area",
                    query:{
                        aid           :   this.aid,
                        accountInfo   :   this.accountInfo,            // 用户名
                        dtStart       :   this.adtStart,                // 开始时间
                        dtEnd         :   this.adtEnd,                  // 结束时间
                        atype         :   this.atype
                    }
                });
            }
		},
		mounted() {
            // 初始化数据
            this.aid            =   this.$route.query.aid
            this.type           =   this.$route.query.type
            this.atype          =   this.$route.query.atype           // (类型：直推0，全部1)
            this.accountInfo    =   this.$route.query.keyword         // 用户名
            this.adtStart       =   this.$route.query.dtStart         // 开始时间
            this.adtEnd         =   this.$route.query.dtEnd           // 结束时间
            // 获取今天日期
            let date = new Date();
            this.dtEnd  =   date                    // 今天默认日期
            if(this.type==0){
                // 流水默认查昨天的时间
                this.dtStart = new Date(date.getTime() - 24*60*60*1000) 
            }else{
                // 盈亏查1号或者16号 默认1
                let year = date.getFullYear();          // 当前年
                let month = date.getMonth() + 1;        // 当前月
                let day = date.getDate();               // 当前日
                this.dtStart    =   (day<16)?(year+'/'+month+'/'+1):(year+'/'+month+'/'+16)
            }
            this.GetMyGroupLSYK()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/myGroupCount";
</style>