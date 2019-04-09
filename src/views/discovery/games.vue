<template>
	<div class="games padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.topmenu.ent')"></x-header>
        <div class="main-container">
            <div class="select">
                <div @click="change()" :class="{'select-title':true}">
                    <span :class="{'select-act':active}">{{$t('discovery.games.gambling')}}</span>
                </div>
                <div @click="change()" :class="{'select-title':true}">
                    <span :class="{'select-act':!active}">{{$t('discovery.games.relax')}}</span>
                </div>
            </div>
            <div v-if="active">
                <!-- 赌博游戏 -->
                <div v-for="(v,index) in gambling" :key="index" class="mr20">
                    <img width="100%" :src="v.Img" @click="Gambling(v.code,index)">
                </div>
                <!-- <v-grid v-for="(v,index) in gambling" :key="index" class="mr20">
                    <div class="pd-lb20" @click="Gambling(v.code,index)">
                        <flexbox>
                            <flexbox-item :span="3">
                                <div class="dis-grid-img">
                                    <img :src="v.Img">
                                </div>
                            </flexbox-item>
                            <flexbox-item :span="6">
                                <div class="dis-grid-content">
                                    <div :class="{title:true,ellipsis1:true,link:v.Url}">{{v.Name}}</div>
                                </div>
                            </flexbox-item>
                            <flexbox-item>
                                <button class="btn btn-xs btn-round btn-success">{{$t('global.stargame')}}</button>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </v-grid> -->
            </div>
            <div v-if="!active">
                <!-- 休闲游戏 -->
                <v-grid v-for="(v,index) in dataList" :key="index" class="mr20">
                    <div class="pd-lb20" @click="go(v.Url)">
                        <flexbox>
                            <flexbox-item :span="3">
                                <div class="dis-grid-img">
                                    <img :src="v.Img">
                                </div>
                            </flexbox-item>
                            <flexbox-item :span="6">
                                <div class="dis-grid-content">
                                    <div :class="{title:true,ellipsis1:true,link:v.Url}">{{v.Name}}</div>
                                </div>
                            </flexbox-item>
                            <flexbox-item>
                                <button class="btn btn-xs btn-round btn-success">{{$t('global.stargame')}}</button>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </v-grid>
            </div>
		</div>
        <Modal v-model="modal" class="model" @on-ok="ok" :title="GameName" :ok-text="$t('global.stargame')" cancel-text="" @on-cancel="cancel">
            <div class="wd line-b">
                <div class="gameimg">
                    <!-- 游戏图标 -->
                    <img :src="imgSrc">
                    <div class="assets">
                        <div class="lable">
                            {{$t('discovery.games.gamebalance')}}
                        </div>
                        <div class="num">
                            {{Balance}}({{bdctype}})
                        </div>
                    </div>
                </div>
            </div>
            <div class="input line-b mr20">
                <div class="assets">
                    <div class="lable">
                        <span v-if="bdctype=='BDC'">
                            {{$t('discovery.games.assetsbalance')}}
                        </span>
                        <span v-if="bdctype=='CNY'">
                            {{$t('discovery.games.gamesbalance')}}
                        </span>
                    </div>
                    <div class="num">
                        <span v-if="bdctype=='BDC'">{{actAssets}}</span>
                        <span v-if="bdctype=='CNY'">{{gameAssets}}</span>({{bdctype}})
                    </div>
                </div>
            </div>
            <group>
                <x-input type="text" :title="$t('discovery.games.taccounts')" v-model="bdcNum" :placeholder="$t('discovery.games.num')">
                    <span class="right" slot="right">{{bdctype}}</span>
                </x-input>
            </group>
            <div class="input mr30">
                <button class="btn btn-xs btn-round" @click="TranIn()">{{$t('discovery.games.tranIn')}}</button>
                <button class="btn btn-xs btn-round" @click="TranOut()">{{$t('discovery.games.tranOut')}}</button>
                <button class="btn btn-xs btn-round" @click="Refresh()">{{$t('discovery.games.refresh')}}</button>
            </div>
        </Modal>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
                active      :   true,                               // 头部切换索引
                dataList	:	[],
                modal       :   false,                              // 弹出框
                GameName    :   '',                                 // 弹出框游戏名字
                imgSrc      :   '',                                 // 弹出框游戏图标
                actAssets   :   '',                                 // 固定资产
                Balance     :   '',                                 // 游戏余额
                gameAssets  :   '',                                 // 游戏资产
                bdctype     :   '',                                 // 资金类型 BDC OR CNY
                bdcNum      :   '',                                 // 转入BDC数量
                upstatus    :   false,                              // 点击状态
                PName       :   '',                                 // 游戏平台 PT AG BD IBC
                gambling    :   [
                    {
                        'Name'  :   'BD棋牌',
                        'code'  :   'BD',
                        'Img'   :   './static/images/bd.png',
                        'Icon'  :   './static/images/icon_BD.jpg',
                        'Url'   :   true
                    },
                    {
                        'Name'  :   '真人娱乐',
                        'code'  :   'AG',
                        'Img'   :   './static/images/ag.png',
                        'Icon'  :   './static/images/icon_AG.jpg',
                        'Url'   :   true
                    },
                    {
                        'Name'  :   '电子游艺',
                        'code'  :   'PT',
                        'Img'   :   './static/images/pt.png',
                        'Icon'  :   './static/images/icon_PT.jpg',
                        'Url'   :   true
                    },
                    {
                        'Name'  :   '体育赛事',
                        'code'  :   'IBC',
                        'Img'   :   './static/images/sb1.png',
                        'Icon'  :   './static/images/icon_SB.jpg',
                        'Url'   :   true
                    },
                ]
			}
		},
		methods: {
			go(link){
                // 调用第三方浏览器打开网页
                if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){  
                    //苹果设备 
                    api.openApp({
                        iosUrl: link,
                    });
                }else{
                    //安卓设备
                    api.openApp({
                        uri: link
                    });
                }
            },
            change(){
                // 切换游戏类型
                this.active = !this.active;
            },
            GetGameList(){
                // 获取休闲游戏列表
                this.$server.post(
                'GetGameList',
                {
                    guid 	:  this.$storage.get('guid'),
                }).then(data => {
                    if(data){
                        this.dataList = data
                    }else{
                        this.GetGameList()
                    }
                })
            },
            GetAccount(){
                // 获取固定资产
                this.$server.post(
                'GetAccountById',
                {
                    guid : this.$storage.get('guid')
                }).then(data => {
                    if(data){
                        this.actAssets   = data.ActAssets;
                        this.gameAssets   = data.GameAssets;
                    }
                })
            },
            GameRegister(){
                // 棋牌游戏注册&登录
                this.$server.post(
                'WJGame_Register',
                {
                    guid 	        :   this.$storage.get('guid'),
                    ip              :   '',                              //  ip地址
                    platformName    :   this.PName,                      //  BD,AG,PT,IBC
                    gameName        :   ''                               //  （游戏名称：传空即可，仅平台名为PT时，传中文游戏名,例：超级888）
                }).then(data => {
                    if(data){
                        // 调用第三方浏览器打开网页
                        if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){  
                            //苹果设备 
                            api.openApp({
                                iosUrl: data.Result, //打开微信的，其中weixin为微信的URL Scheme
                            });
                        }else{
                            //安卓设备
                            api.openApp({
                                uri: data.Result
                            });
                        }
                        
                    }else{
                        this.GameRegister()
                    }
                })
            },
            GetBalance(){
                // 游戏余额查询
                this.$server.post(
                'WJGame_GetBalance',
                {
                    guid 	        :   this.$storage.get('guid'),
                    ip              :   '',                             //  ip地址
                    platformName    :   this.PName,                     //  游戏平台
                }).then(data => {
                    if(data){
                        this.Balance = data.Result
                    }else{
                        this.GetBalance()
                    }
                })
            },
            TranIn(){
                //判断是否为正整数
                if(!this.checkRate(this.bdcNum)){
                    return
                }
                // 判断是否点击
                if(this.upstatus){
                    return
                }
                this.upstatus = true         
                // 转入资产到游戏平台 限制小数
                this.$server.post(
                'WJGame_TranIn',
                {
                    guid 	        :   this.$storage.get('guid'),
                    num             :   this.bdcNum,                            //  BDC数量
                    platformName    :   this.PName,                             //  游戏平台
                }).then(data => {
                    if(data){
                        this.$vux.toast.show({
							text: this.$t('global.success'),
							type: 'success'
						})
                        this.GetBalance()                               // 重新查询余额
                        this.GetAccount()                               // 重新获取固定资产
                        this.upstatus = false
                        this.bdcNum = ''
                    }else{
                        this.TranIn()
                        this.upstatus = false
                    }
                })
            },
            TranOut(){
                // 判断是否为正整数
                if(!this.checkRate(this.bdcNum)){
                    return
                }
                // 判断是否点击
                if(this.upstatus){
                    return
                }
                this.upstatus = true    
                // 转出资产到钱包 限制小数
                this.$server.post(
                'WJGame_TranOut',
                {
                    guid 	        :   this.$storage.get('guid'),
                    num             :   this.bdcNum,                            //  BDC数量
                    platformName    :   this.PName,                             //  游戏平台
                }).then(data => {
                    if(data){
                        this.$vux.toast.show({
							text: this.$t('global.success'),
							type: 'success'
						})
                        this.GetBalance()                               // 重新查询游戏资产余额
                        this.GetAccount()                               // 重新获取固定资产
                        this.upstatus = false
                        this.bdcNum = ''
                    }else{
                        this.TranOut()
                        this.upstatus = false
                    }
                })
            },
            Gambling(code,index){
                // @code bd = bd棋牌
                // 赌博游戏接入
                this.GameName = this.gambling[index].Name           // 游戏名
                this.imgSrc   = this.gambling[index].Icon            // 游戏图标
                switch (code) {
                    case 'BD':
                        this.PName   = 'BD'
                        this.bdctype = 'BDC'
                        this.GetBalance()
                        break;
                    case 'AG':
                        this.PName = 'AG'
                        this.bdctype = 'CNY'
                        this.GetBalance()
                    break;
                    case 'IBC':
                        this.PName = 'IBC'
                        this.bdctype = 'CNY'
                        this.GetBalance()
                    break;
                    case 'PT':
                        this.$router.push({
							path:"/discovery/gamespt",
						});
                    break;
                    
                    default:
                        break;
                }
                this.modal = true
            },
            ok () {
                // 模态框开始游戏按钮
                this.GameRegister();
            },
            cancel () {
                this.modal = false
            },
            Refresh(){
                // 刷新资产信息
                this.GetBalance()                               // 重新查询游戏资产余额
                this.GetAccount()                               // 重新获取固定资产
            },
            checkRate(value){
                let re = /^[1-9]+[0-9]*]*$/
                if (!re.test(value)){
                    this.$vux.toast.show({
                        text: this.$t('discovery.games.num'),
                        type: 'warn'
                    })
                    return false;
                }else{
                    return true;
                }
            }
        },
		mounted() {
            this.GetGameList()
            this.GetAccount()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/games";
</style>