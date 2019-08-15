// 用户中心，注册登陆
import user from './views/user.vue'
    import index from  './views/user/index.vue'                             // 引导页
    // import regist from './views/user/regist.vue'                            //  注册
    import login from './views/user/login.vue'                              //  登陆
    // import verification from './views/user/verification.vue'                //  验证码验证
    import registinfo from './views/user/registinfo.vue'                    //  注册信息填写
    import smglogin from './views/user/smglogin.vue'                        //  短信登陆
    import forget from './views/user/forget.vue'                            //  忘记密码
// 发现
import discovery from './views/discovery.vue'
    import discoveryindex from './views/discovery/index.vue'                // 发现首页
    import expectinfo from  './views/discovery/expectinfo.vue'              // 兑换BDC
        import btob from  './views/discovery/btob.vue'                      // 币币兑换
        // import cash from  './views/discovery/cash.vue'                      // 现金购买
        // import self from  './views/discovery/self.vue'                      // 现金购买
        // import recharge from  './views/discovery/recharge.vue'              // 充值
    import bill from  './views/discovery/bill.vue'                          // 兑换BDC
    // import credit from  './views/discovery/credit.vue'                      // 办理信用卡
    import extract from  './views/discovery/extract.vue'                    // 提币
    // import games from  './views/discovery/games.vue'                        // 游戏
    // import gamesPt from  './views/discovery/gamesPt.vue'                    // PT平台单独页面
    import withdrawal from './views/discovery/withdrawal.vue'               // 收益提现
// 钱包
import wallet from './views/wallet.vue' 
    import walletindex from './views/wallet/wallet.vue'
    import changeassets from './views/wallet/changeassets.vue'
    import send from './views/wallet/send.vue'
    import receive from './views/wallet/receive.vue'
    import notice from './views/wallet/notice.vue'                          // 公告列表

// 应用
// import application from './views/application.vue'
//     import appindex from './views/application/appindex.vue'
// OTC
    import OTC from './views/OTC.vue'
        import OTCindex from './views/OTC/OTCindex.vue'               // OTC首页框架
        import OTCSellBuy from './views/OTC/OTCSellBuy.vue'           // OTC售卖列表
        import OTCsell from './views/OTC/OTCsell.vue'                 // OTC发布售卖
        import OTCbuy from './views/OTC/OTCbuy.vue'                   // 购买OTC
        import OTCorder from './views/OTC/OTCorder.vue'               // 支付订单
        import OTCMyGoods from './views/OTC/OTCMyGoods.vue'           // 我的发布
        import OTCMyOrderByNow from './views/OTC/OTCMyOrderByNow.vue'           // 当前订单
        import OTCMyOrderByHistory from './views/OTC/OTCMyOrderByHistory.vue'   // 历史订单
        import OTCmyOrder from './views/OTC/OTCmyOrder.vue'              // 订单详情
        import OTCMyProfit from './views/OTC/OTCMyProfit.vue'              // 收益订单
        import OTCcomplaiont from './views/OTC/OTCcomplaiont.vue'              // 投诉
        import OTCedit from './views/OTC/OTCedit.vue'                 // 编辑售币
        import OTCdemand from './views/OTC/OTCdemand.vue'                 // 发布求购
        import OTCeditDemand from './views/OTC/OTCeditDemand.vue'                 // 编辑求购
        import OTCbuyOrder from './views/OTC/OTCbuyOrder.vue'                 // 供币界面
        import OTCcomplaiontList from './views/OTC/OTCComplaiontList.vue'                 // 投诉界面列表
        import OTCcomplaiontView from './views/OTC/OTCcomplaiontView.vue'                 // 投诉详情页
        import OTCRank from './views/OTC/OTCRank.vue'                         // 排行榜
        import OTCReport from './views/OTC/OTCReport.vue'                         // 排行榜
        import OTCStatistics from './views/OTC/OTCStatistics.vue'                         // 排行榜
        

// 我的
import myhome from './views/mine'
    import mine from './views/mine/mine.vue'
    import center from './views/mine/center.vue'
    import extension from './views/mine/extension.vue'
    import area from './views/mine/area.vue'                            // 矿区成员
    import question from './views/mine/question.vue'                    // 常见问题
    import security from './views/mine/security.vue'                      // 安全中心
        import editpsw from './views/mine/editpsw.vue'                  // 密码
        import safepsw from './views/mine/safepsw.vue'                  // 安全密码
        import auth from './views/mine/auth.vue'                        // 实名认证
        import mycard from './views/mine/mycard.vue'                    // 绑定银行卡
        import alipay from './views/mine/alipay.vue'                    // 绑定支付宝
        import wechart from './views/mine/wechart.vue'                    // 绑定微信支付
        import editPhoneOld from './views/mine/editPhoneOld.vue'           // 修改手机号，验证旧手机
        import editPhoneNew from './views/mine/editPhoneNew.vue'           // 修改手机号，绑定新手机
        import ahtuenticator from './views/mine/ahtuenticator.vue'           // 谷歌认证
    import setting from './views/mine/setting.vue'                      // 设置
        import language from './views/mine/language.vue'                // 语言
        import price from './views/mine/price.vue'                      // 货币
    import feedback from './views/mine/feedback.vue'                // 意见反馈
    
// 404
import NotFound from './views/404.vue'
// 文章详情
import article from './views/article.vue'
    import articleview from './views/article/article.vue'
import iframe from './views/article/iframe.vue'
let routes = [
    {
        path: '/index',
        component: user,
        redirect: '/user/index',
        name: 'user',
        hidden: true,
        meta:{
            isIndex: 0                                      //  底部导航图标索引0 1 2 3
        },
    },
    // 登录
    {
        path: "/",
        component: user,
        name: "loginin",
        redirect: '/user/index',
        children: [
            { path: '/user/index', component: index, name: 'index' },
            //{ path: '/user/regist', component: regist, name: 'regist' },
            { path: '/user/login', component: login, name: 'login' },
            //{ path: '/user/verification', component: verification, name: 'verification' },
            { path: '/user/registinfo', component: registinfo, name: 'registinfo' },
            { path: '/user/smglogin', component: smglogin, name: 'smglogin' },
            { path: '/user/forget', component: forget, name: 'forget' },
            
        ]
    },
    // 发现
    {
        path: '/discovery',
        redirect: '/discovery/index',
        component: discovery,
        name: 'discovery',
        meta:{
            isIndex: 2                                      //  底部导航图标索引0 1 2 3
        },
        children: [
            { path: '/discovery/index', component: discoveryindex, name: 'discoveryindex',meta:{isIndex: 2}},
            { path: '/discovery/expectinfo', component: expectinfo, name: 'expectinfo',meta:{isIndex: 2}},
                { path: '/discovery/expectinfo/btob', component: btob, name: 'btob',meta:{isIndex: 2}},
                // { path: '/discovery/expectinfo/cash', component: cash, name: 'cash',meta:{isIndex: 2}},
                // { path: '/discovery/expectinfo/self', component: self, name: 'self',meta:{isIndex: 2}},
            // { path: '/discovery/recharge', component: recharge, name: 'recharge',meta:{isIndex: 2}},
            { path: '/discovery/bill', component: bill, name: 'bill',meta:{isIndex: 2}},
            // { path: '/discovery/credit', component: credit, name: 'credit',meta:{isIndex: 2}},
            { path: '/discovery/extract', component: extract, name: 'extract',meta:{isIndex: 2}},
            // { path: '/discovery/games', component: games, name: 'games',meta:{isIndex: 1}},
            // { path: '/discovery/gamespt', component: gamesPt, name: 'gamesPt',meta:{isIndex: 1}},
            { path: '/discovery/withdrawal', component: withdrawal, name: 'withdrawal',meta:{isIndex: 2}},
        ]
    },
    // 钱包
    {
        path: '/wallet',
        redirect: '/wallet/wallet',
        component: wallet,
        name: 'wallet',
        meta:{
            isIndex: 0                                      //  底部导航图标索引0 1 2 3
        },
        children: [
            { path: '/wallet/wallet', component: walletindex, name: 'walletindex',meta:{isIndex: 0}},
            { path: '/wallet/changeassets', component: changeassets, name: 'changeassets',meta:{isIndex: 0}},
            { path: '/wallet/send', component: send, name: 'send',meta:{isIndex: 0}},
            { path: '/wallet/receive', component: receive, name: 'receive',meta:{isIndex: 0}},
            { path: '/wallet/notice', component: notice, name: 'notice',meta:{isIndex: 0}},
        ]
    },
    // 应用
    // {
    //     path: '/app',
    //     redirect: '/app/index',
    //     component: appindex,
    //     name: 'app',
    //     meta:{
    //         isIndex: 1                                      //  底部导航图标索引0 1 2 3
    //     },
    //     children: [
    //         { path: '/app/index', component: appindex, name: 'appindex',meta:{isIndex: 1}}
    //     ]
    // },
    // OTC
    {
        path: '/OTC/index',
        redirect: '/OTC/OTCindex',
        component: OTC,
        name: 'OTCindex',
        meta:{
            isIndex: 1                                      //  底部导航图标索引0 1 2 3
        },
        children: [
            { 
                path: '/OTC/OTCindex', 
                component: OTCindex, 
                name: 'OTCSellBuy',
                meta:{isIndex: 1},
                children: [                                 // bindex 是OTC首页的交易菜单导航使用的
                    { path: '/OTC/OTCSellBuy', component: OTCSellBuy, name: 'OTCSellBuy',meta:{isIndex: 1,bindex:0}},
                    { path: '/OTC/sell', component: OTCsell, name: 'OTCsell',meta:{isIndex: 1,bindex:1}},
                    { path: '/OTC/demand', component: OTCdemand, name: 'OTCdemand',meta:{isIndex: 1,bindex:1}},
                    { path: '/OTC/MyGoods', component: OTCMyGoods, name: 'OTCMyGoods',meta:{isIndex: 1,bindex:2}},
                    { path: '/OTC/MyOrderNow', component: OTCMyOrderByNow, name: 'OTCMyOrderByNow',meta:{isIndex: 1,bindex:3}},
                    { path: '/OTC/MyOrderHistory', component: OTCMyOrderByHistory, name: 'OTCMyOrderByHistory',meta:{isIndex: 1,bindex:4}},
                    { path: '/OTC/ComplaiontList', component: OTCcomplaiontList, name: 'OTCcomplaiontList',meta:{isIndex: 1,bindex:5}},
                    { path: '/OTC/Profit', component: OTCMyProfit, name: 'OTCMyProfit',meta:{isIndex: 1,bindex:6}},
                    { path: '/OTC/Report', component: OTCReport, name: 'OTCReport',meta:{isIndex: 1,bindex:7}},
                    { path: '/OTC/Statistics', component: OTCStatistics, name: 'OTCStatistics',meta:{isIndex: 1,bindex:8}},
                ]
            },
            { path: '/OTC/buy', component: OTCbuy, name: 'OTCbuy',meta:{isIndex: 1}},
            { path: '/OTC/order', component: OTCorder, name: 'OTCorder',meta:{isIndex: 1}},
            { path: '/OTC/myOrder', component: OTCmyOrder, name: 'OTCmyOrder',meta:{isIndex: 1}},
            { path: '/OTC/complaiont', component: OTCcomplaiont, name: 'OTCcomplaiont',meta:{isIndex: 1}},
            { path: '/OTC/edit', component: OTCedit, name: 'OTCedit',meta:{isIndex: 1}},
            { path: '/OTC/editDemand', component: OTCeditDemand, name: 'OTCeditDemand',meta:{isIndex: 1}},
            { path: '/OTC/buyOrder', component: OTCbuyOrder, name: 'OTCbuyOrder',meta:{isIndex: 1}},
            { path: '/OTC/Complaiont/view', component: OTCcomplaiontView, name: 'OTCcomplaiontView',meta:{isIndex: 1}},
            { path: '/OTC/OTCRank', component: OTCRank, name: 'OTCRank',meta:{isIndex: 1}},
        ]
    },
    // 我的
    {
        path: '/mine',
        redirect: '/mine/myhome',
        component: myhome,
        name: 'mine',
        meta:{
            isIndex: 3                                      //  底部导航图标索引0 1 2 3
        },
        children: [
            { path: '/mine/myhome', component: mine, name: 'mineindex',meta:{isIndex: 3}},
            { path: '/mine/center', component: center, name: 'center',meta:{isIndex: 3}},
            { path: '/mine/area', component: area, name: 'area',meta:{isIndex: 3}},
            { path: '/mine/extension', component: extension, name: 'extension',meta:{isIndex: 3}},
            { path: '/mine/question', component: question, name: 'question',meta:{isIndex: 3}},
            { path: '/mine/feedback', component: feedback, name: 'feedback',meta:{isIndex: 3}},
            { path: '/mine/setting', component: setting, name: 'setting',meta:{isIndex: 3}},
            { path: '/mine/auth', component: auth, name: 'auth',meta:{isIndex: 3}},
            { path: '/mine/security', component: security, name: 'security',meta:{isIndex: 3}},
                { path: '/mine/editpsw', component: editpsw, name: 'editpsw',meta:{isIndex: 3}},
                { path: '/mine/safepsw', component: safepsw, name: 'safepsw',meta:{isIndex: 3}},
                { path: '/mine/language', component: language, name: 'language',meta:{isIndex: 3}},
                { path: '/mine/price', component: price, name: 'price',meta:{isIndex: 3}},
                { path: '/mine/mycard', component: mycard, name: 'mycard',meta:{isIndex: 3}},
                { path: '/mine/alipay', component: alipay, name: 'alipay',meta:{isIndex: 3}},
                { path: '/mine/wechart', component: wechart, name: 'wechart',meta:{isIndex: 3}},
                { path: '/mine/editPhoneOld', component: editPhoneOld, name: 'editPhoneOld',meta:{isIndex: 3}},
                { path: '/mine/editPhoneNew', component: editPhoneNew, name: 'editPhoneNew',meta:{isIndex: 3}},
                { path: '/mine/ahtuenticator', component: ahtuenticator, name: 'ahtuenticator',meta:{isIndex: 3}},
        ]
    },
    // 文章
    {
        path: '/article',
        redirect: '/article/view',
        component: article,
        name: 'article',
        children: [
            { path: '/article/view', component: articleview, name: 'view'},
            { path: '/iframe', component: iframe, name: 'iframe'},
        ]
    },
    // 404
    {
        path: '*',
        hidden: true,
        component: NotFound,
    }
];

export default routes;