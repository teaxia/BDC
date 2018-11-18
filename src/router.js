// 用户中心，注册登陆
import user from './views/user.vue'
    import regist from './views/user/regist.vue'                            //  注册
    import login from './views/user/login.vue'                              //  登陆
    import verification from './views/user/verification.vue'                //  验证码验证
    import registinfo from './views/user/registinfo.vue'                    //  注册信息填写
    import smglogin from './views/user/smglogin.vue'                        //  短信登陆
    import forget from './views/user/forget.vue'                            //  忘记密码

// 发现
import discovery from './views/discovery.vue'
    import discoveryindex from './views/discovery/index.vue'                // 发现首页
    import expectinfo from  './views/discovery/expectinfo.vue'              // 兑换BDC
        import btob from  './views/discovery/btob.vue'                      // 币币兑换
        import cash from  './views/discovery/cash.vue'                      // 现金购买
        import recharge from  './views/discovery/recharge.vue'              // 充值
    import bill from  './views/discovery/bill.vue'                          // 兑换BDC
    import credit from  './views/discovery/credit.vue'                      // 办理信用卡
        
// 钱包
import wallet from './views/wallet.vue'
    import walletindex from './views/wallet/wallet.vue'
    import changeassets from './views/wallet/changeassets.vue'
    import send from './views/wallet/send.vue'
        import scan from './views/wallet/scan.vue'                          // 扫码
    import receive from './views/wallet/receive.vue'
    import notice from './views/wallet/notice.vue'                          // 公告列表

// 应用
import application from './views/application.vue'
    import appindex from './views/application/appindex.vue'
// 我的
import myhome from './views/mine'
    import mine from './views/mine/mine.vue'
    import center from './views/mine/center.vue'
    import extension from './views/mine/extension.vue'
    import area from './views/mine/area.vue'                            // 矿区成员
    import question from './views/mine/question.vue'                    // 常见问题
    import setting from './views/mine/setting.vue'                      // 设置
        import editpsw from './views/mine/editpsw.vue'                  // 密码
        import safepsw from './views/mine/safepsw.vue'                  // 安全密码
        import language from './views/mine/language.vue'                // 语言
        import price from './views/mine/price.vue'                      // 货币
    
// 404
import NotFound from './views/404.vue'
// 文章详情
import article from './views/article.vue'
    import articleview from './views/article/article.vue'
let routes = [
    {
        path: '/index',
        component: user,
        redirect: '/user/login',
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
        redirect: '/user/login',
        children: [
            { path: '/user/regist', component: regist, name: 'regist' },
            { path: '/user/login', component: login, name: 'login' },
            { path: '/user/verification', component: verification, name: 'verification' },
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
            { path: '/discovery/expectinfo/cash', component: cash, name: 'cash',meta:{isIndex: 2}},
            { path: '/discovery/recharge', component: recharge, name: 'recharge',meta:{isIndex: 2}},
            { path: '/discovery/bill', component: bill, name: 'bill',meta:{isIndex: 2}},
            { path: '/discovery/credit', component: credit, name: 'credit',meta:{isIndex: 2}},
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
            { path: '/wallet/scan', component: scan, name: 'scan',meta:{isIndex: 0}},
            { path: '/wallet/receive', component: receive, name: 'receive',meta:{isIndex: 0}},
            { path: '/wallet/notice', component: notice, name: 'notice',meta:{isIndex: 0}},
        ]
    },
    // 应用
    {
        path: '/app',
        redirect: '/app/index',
        component: appindex,
        name: 'app',
        meta:{
            isIndex: 1                                      //  底部导航图标索引0 1 2 3
        },
        children: [
            { path: '/app/index', component: appindex, name: 'appindex',meta:{isIndex: 1}}
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
            { path: '/mine/setting', component: setting, name: 'setting',meta:{isIndex: 3}},
                { path: '/mine/editpsw', component: editpsw, name: 'editpsw',meta:{isIndex: 3}},
                { path: '/mine/safepsw', component: safepsw, name: 'safepsw',meta:{isIndex: 3}},
                { path: '/mine/language', component: language, name: 'language',meta:{isIndex: 3}},
                { path: '/mine/price', component: price, name: 'price',meta:{isIndex: 3}},
                
            
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