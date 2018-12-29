<template>
	<div class="games" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="PT游戏"></x-header>
        <div class="main-container">
            <!-- 赌博游戏 -->
            <div class="model">
                <div class="wd line-b">
                    <div class="gameimg">
                        <!-- 游戏图标 -->
                        <img :src="imgSrc">
                        <div class="assets">
                            <div class="lable">
                                {{$t('discovery.games.gamebalance')}}
                            </div>
                            <div class="num">
                                {{Balance}}(CNY)
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input line-b mr20">
                    <div class="assets">
                        <div class="lable">
                            {{$t('wallet.tips.gameassets')}}
                        </div>
                        <div class="num">
                            {{gameAssets}}(CNY)
                        </div>
                    </div>
                </div>
                <group>
                    <x-input type="text" :title="$t('discovery.games.taccounts')" v-model="bdcNum" :placeholder="$t('discovery.games.num')">
                        <span class="right" slot="right">CNY</span>
                    </x-input>
                </group>
                <div class="input mr30">
                    <button class="btn btn-xs btn-round" @click="TranIn()">{{$t('discovery.games.tranIn')}}</button>
                    <button class="btn btn-xs btn-round" @click="TranOut()">{{$t('discovery.games.tranOut')}}</button>
                    <button class="btn btn-xs btn-round" @click="Refresh()">{{$t('discovery.games.refresh')}}</button>
                </div>
            </div>
            <div class="fixed mr30">
                <v-grid v-for="(v,index) in gambling" :key="index" class="20">
                    <div class="pd-lb20" @click="Gambling(v.Name)">
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
    </div>
</template>

<script>
	export default {
		data() {
			return {
                gameAssets   :   '',                                 // 固定资产
                Balance     :   '',                                 // 游戏资产
                bdcNum      :   '',                                 // 转入BDC数量
                upstatus    :   false,                              // 点击状态
                imgSrc      :   './static/images/pt.png',
                PName       :   'PT',
                GameName    :   '',                                 // 游戏名称
                gambling    :   [
                    {
                        'Name'  :   '爱尔兰运气',
                        'Img'   :   './static/images/ptimg/aelyq.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '白狮',
                        'Img'   :   './static/images/ptimg/bs.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '白狮王',
                        'Img'   :   './static/images/ptimg/bsw.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '宝石女王',
                        'Img'   :   './static/images/ptimg/bsnw.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '宝物箱中寻',
                        'Img'   :   './static/images/ptimg/bwxzx.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '布莱恩的一生',
                        'Img'   :   './static/images/ptimg/bledys.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '财富魔方',
                        'Img'   :   './static/images/ptimg/cfmf.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '超级888',
                        'Img'   :   './static/images/ptimg/cj888.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '超级高速公路之王',
                        'Img'   :   './static/images/ptimg/cjgsglzw.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '沉默的武士',
                        'Img'   :   './static/images/ptimg/cmdws.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '沉默的武士彩池游戏',
                        'Img'   :   './static/images/ptimg/cmdwsccyx.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '丛林之心',
                        'Img'   :   './static/images/ptimg/clzx.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '大草原现金',
                        'Img'   :   './static/images/ptimg/dcyxj.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '戴夫和荷鲁斯之眼',
                        'Img'   :   './static/images/ptimg/dfhhlszy.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '戴图理的神奇七大奖',
                        'Img'   :   './static/images/ptimg/dtldsqqdj.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '顶级王牌-明星',
                        'Img'   :   './static/images/ptimg/djwpmx.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '赌徒',
                        'Img'   :   './static/images/ptimg/dt.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '赌徒：北极探险',
                        'Img'   :   './static/images/ptimg/dtbjtx.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '非洲炙热',
                        'Img'   :   './static/images/ptimg/fzzr.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '翡翠公主',
                        'Img'   :   './static/images/ptimg/fcgz.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '粉红豹',
                        'Img'   :   './static/images/ptimg/fhb.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '疯狂麻将',
                        'Img'   :   './static/images/ptimg/fkmj.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '疯狂之七',
                        'Img'   :   './static/images/ptimg/fkzq.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '浮冰流',
                        'Img'   :   './static/images/ptimg/fbl.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '弓兵',
                        'Img'   :   './static/images/ptimg/gb.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '古怪猴子',
                        'Img'   :   './static/images/ptimg/gghz.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '鬼屋',
                        'Img'   :   './static/images/ptimg/gw.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '海豚焦',
                        'Img'   :   './static/images/ptimg/htj.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '豪华的开心假期',
                        'Img'   :   './static/images/ptimg/hhdkxjq.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '好运连胜',
                        'Img'   :   './static/images/ptimg/hyls.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '黄金游戏',
                        'Img'   :   './static/images/ptimg/hjyx.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '黄金之国',
                        'Img'   :   './static/images/ptimg/hjzg.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '诙谐财富',
                        'Img'   :   './static/images/ptimg/hxcf.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '火热KTV',
                        'Img'   :   './static/images/ptimg/hrKTV.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '激情桑巴',
                        'Img'   :   './static/images/ptimg/jqsb.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '吉祥8',
                        'Img'   :   './static/images/ptimg/jx8.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '角斗士彩池游戏',
                        'Img'   :   './static/images/ptimg/jdsccyx.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '金钱蛙',
                        'Img'   :   './static/images/ptimg/jqw.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '金字塔女王',
                        'Img'   :   './static/images/ptimg/jztnw.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '经典老虎机刮刮乐',
                        'Img'   :   './static/images/ptimg/jdlhjggl.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '警察与土匪',
                        'Img'   :   './static/images/ptimg/jcytf.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '爵士俱乐部',
                        'Img'   :   './static/images/ptimg/jsjlb.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '开心假期',
                        'Img'   :   './static/images/ptimg/kxjq.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '酷炫水果农场',
                        'Img'   :   './static/images/ptimg/kxsglc.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '烈焰钻石',
                        'Img'   :   './static/images/ptimg/lyzs.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '龙龙龙',
                        'Img'   :   './static/images/ptimg/lll.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '龙之王国',
                        'Img'   :   './static/images/ptimg/lzwg.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '罗马与荣耀',
                        'Img'   :   './static/images/ptimg/lmyry.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '洛基传奇',
                        'Img'   :   './static/images/ptimg/ljcq.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '玛丽莲梦露',
                        'Img'   :   './static/images/ptimg/mllml.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '满月财富',
                        'Img'   :   './static/images/ptimg/mycf.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '猫女王',
                        'Img'   :   './static/images/ptimg/mnw.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '魔豆的赏金',
                        'Img'   :   './static/images/ptimg/mddsj.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '木乃伊迷城',
                        'Img'   :   './static/images/ptimg/mnymc.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '年年有余',
                        'Img'   :   './static/images/ptimg/nnyy.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '牛仔和外星人',
                        'Img'   :   './static/images/ptimg/nzhwxr.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '欧莱礼的黄金作物',
                        'Img'   :   './static/images/ptimg/olldhjlw.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '欧洲轮盘',
                        'Img'   :   './static/images/ptimg/ozlp.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '青春之泉',
                        'Img'   :   './static/images/ptimg/qczq.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '趣味水果',
                        'Img'   :   './static/images/ptimg/qwsg.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '权杖女王',
                        'Img'   :   './static/images/ptimg/rlbs.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '热力宝石',
                        'Img'   :   './static/images/ptimg/rlbs.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '日日进财',
                        'Img'   :   './static/images/ptimg/rrjc.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '三倍猴子',
                        'Img'   :   './static/images/ptimg/sbhz.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '三个朋友',
                        'Img'   :   './static/images/ptimg/sgpy.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '三剑客和女王',
                        'Img'   :   './static/images/ptimg/sjkhnw.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '沙漠宝藏2',
                        'Img'   :   './static/images/ptimg/smbz2.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '神的时代：奥林匹斯',
                        'Img'   :   './static/images/ptimg/sdsdalps.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '水果狂',
                        'Img'   :   './static/images/ptimg/sgk.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '四象',
                        'Img'   :   './static/images/ptimg/sx.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '孙悟空',
                        'Img'   :   './static/images/ptimg/swk.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '泰国天堂',
                        'Img'   :   './static/images/ptimg/tgtt.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '堂吉诃德的财富',
                        'Img'   :   './static/images/ptimg/tjkddcf.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '甜蜜派对',
                        'Img'   :   './static/images/ptimg/tmpd.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '万圣节财富',
                        'Img'   :   './static/images/ptimg/wsjcf.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '万圣节财富2',
                        'Img'   :   './static/images/ptimg/wxky.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '无敌金刚',
                        'Img'   :   './static/images/ptimg/wdjg.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '舞龙',
                        'Img'   :   './static/images/ptimg/wl.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '小猪与狼',
                        'Img'   :   './static/images/ptimg/mfz.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '幸运女郎',
                        'Img'   :   './static/images/ptimg/xynl.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '亚马逊的秘密',
                        'Img'   :   './static/images/ptimg/ymxdmm.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '亚特兰蒂斯女王',
                        'Img'   :   './static/images/ptimg/ytldsnw.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '艺妓故事彩池游戏',
                        'Img'   :   './static/images/ptimg/yjgsccyx.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '樱桃之恋',
                        'Img'   :   './static/images/ptimg/ytzl.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '玉皇大帝',
                        'Img'   :   './static/images/ptimg/yhdd.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '约翰韦恩',
                        'Img'   :   './static/images/ptimg/yhwe.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '湛蓝深海',
                        'Img'   :   './static/images/ptimg/zlsh.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '招财进宝',
                        'Img'   :   './static/images/ptimg/zcjb.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '招财童子',
                        'Img'   :   './static/images/ptimg/zctz.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '真爱',
                        'Img'   :   './static/images/ptimg/za.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '中国厨房',
                        'Img'   :   './static/images/ptimg/zgcf.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '众神时代：狂怒4',
                        'Img'   :   './static/images/ptimg/zssdkn4.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '众神时代：轮盘',
                        'Img'   :   './static/images/ptimg/zssdlp.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '众神时代：命运女神',
                        'Img'   :   './static/images/ptimg/zssdmyns.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '众神时代：宙斯',
                        'Img'   :   './static/images/ptimg/zssdzs.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '壮志凌云',
                        'Img'   :   './static/images/ptimg/zzly.png',
                        'status':   true
                    },
                    {
                        'Name'  :   '足球狂欢节',
                        'Img'   :   './static/images/ptimg/zqkhj.png',
                        'status':   true
                    }
                    
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
            GetAccount(){
                // 获取固定资产
                this.$server.post(
                'GetAccountById',
                {
                    guid : this.$storage.get('guid')
                }).then(data => {
                    if(data){
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
                    platformName    :   this.PName,                      //  BD,AG,PT
                    gameName        :   this.GameName                    //  （游戏名称：传空即可，仅平台名为PT时，传中文游戏名,例：超级888）
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
                    platformName    :   this.PName,                             //  游戏平台
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
                    platformName    :   this.PName,                           //  BD,AG,PT
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
                //判断是否为正整数
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
            Gambling(name){
                // @code bd = bd棋牌
                // 赌博游戏接入
                this.GameName = name;
                this.GameRegister()
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
            this.GetBalance()                               // 重新查询游戏资产余额
            this.GetAccount()                               // 重新获取固定资产
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/games";
</style>