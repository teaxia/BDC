<template>
	<div class="withdrawal padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back'),preventGoBack:true}" @on-click-back="back()" title="明细"></x-header>
        <div class="main-container">
            <div>
                <divider class="tj">推荐人：{{InviteName}}</divider>
            </div>
            <div class="card mr50">
                <div class="card-head">
                    <span>用户名：{{name}}（邀请码：{{InviteCode}}）</span>
                </div>
                <div class="card-flex card-content">
                    <div class="card-border">
                        <span>{{$numberComma(FixedAssets)}}</span>
                        <br/>
                        <div>固定资产</div>
                        <div class="font"><i class="iconfont icon-Fixedassets"></i></div>
                    </div>
                    <div class="card-border">
                        <span>{{ActAssets}}</span>
                        <br/>
                        <div>通证资产</div>
                        <div class="font"><i class="iconfont icon-Passingassets"></i></div>
                    </div>
                    <div>
                        <span>{{$numberComma(ActAssets)}}</span>
                        <br/>
                        <div>游戏资产</div>
                        <div class="font"><i class="iconfont icon-Gameassets"></i></div>
                    </div>
                </div>
                <div class="card-footer">
                    <span>注册时间：{{CreateTime}}</span>
                </div>
            </div>
            
            <div class="card mr50">
                <div class="card-head">
                    <span class="fl">团队人数：{{$numberComma(allCount)}}</span>
                    <span class="fr">直推人数：{{$numberComma(ztCount)}}</span>
                </div>
                <div class="card-flex card-content border-none">
                    <div class="card-border">
                        <span>{{$numberComma(tfix)}}</span>
                        <br/>
                        <div>总固定资产</div>
                        <div class="font"><i class="iconfont icon-Fixedassets"></i></div>
                    </div>
                    <div class="card-border">
                        <span>{{$numberComma(tAct)}}</span>
                        <br/>
                        <div>总通证资产</div>
                        <div class="font"><i class="iconfont icon-Passingassets"></i></div>
                    </div>
                    <div>
                        <span>{{$numberComma(tGame)}}</span>
                        <br/>
                        <div>总游戏资产</div>
                        <div class="font"><i class="iconfont icon-Gameassets"></i></div>
                    </div>
                </div>
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
                dtStart     :   '',                 // 传过来的开始时间
                dtEnd       :   '',                 // 传过来的结束时间
                accountInfo :   '',                 // 传过来的用户名
                atype       :   '',                 // 传过来的(类型：直推0，全部1)
                // 团队数据
                allCount    :   '',                 // 团队人数
                ztCount     :   '',                 // 直推人数
                tfix        :   '',                 // 总固定资产
                tAct        :   '',                 // 总通证资产
                tGame       :   '',                 // 总游戏资产
                // 个人数据
                name        :   '',                 // 用户名
                CreateTime  :   '',                 // 注册时间
                FixedAssets :   '',                 // 固定资产
                ActAssets   :   '',                 // 通证资产
                GameAssets  :   '',                 // 游戏资产
                InviteName  :   '',                 // 推荐人
                InviteCode  :   '',                 // 邀请码
			}
        },
		methods: {
            GetMyGroupMX(){
                // 查询收益账目信息
                this.$server.post(
                'GetMyGroup_MX',
                {
                    guid        :   this.$storage.get('guid'),
                    accountId   :   this.aid
                }).then(data => {
                    if(data){
                        this.allCount   =   data.allCount
                        this.ztCount    =   data.ztCount
                        this.tfix       =   data.tfix
                        this.tAct       =   data.tAct
                        this.tGame      =   data.tGame
                        this.name       =   data.Name
                        this.CreateTime =   data.CreateTime
                        this.FixedAssets=   data.FixedAssets
                        this.ActAssets  =   data.ActAssets
                        this.GameAssets =   data.GameAssets
                        this.InviteName =   data.InviteName
                        this.InviteCode =   data.InviteCode
                    }
                })
            },
            back(){
                this.$router.push({
                    path:"/mine/area",
                    query:{
                        aid           :   this.aid,
                        accountInfo   :   this.accountInfo,            // 用户名
                        dtStart       :   this.dtStart,                // 开始时间
                        dtEnd         :   this.dtEnd,                  // 结束时间
                        atype         :   this.atype
                    }
                });
            }
            
		},
		mounted() {
            // 初始化数据
            this.aid            =   this.$route.query.aid
            this.atype          =   this.$route.query.atype           // (类型：直推0，全部1)
            this.accountInfo    =   this.$route.query.keyword         // 用户名
            this.dtStart        =   this.$route.query.dtStart         // 开始时间
            this.dtEnd          =   this.$route.query.dtEnd           // 结束时间
            this.GetMyGroupMX()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/myGroupInfo";
</style>