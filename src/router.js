// 用户中心，注册登陆
import user from './views/user.vue'
    import regist from './views/user/regist.vue'                            //  注册
    import login from './views/user/login.vue'                              //  登陆
    import verification from './views/user/verification.vue'                //  验证码验证
    import registinfo from './views/user/registinfo.vue'                    //  注册信息填写
// 发现
import Home from './views/home.vue'
    import discovery from './views/home/index.vue'

// 钱包
import wallet from './views/wallet.vue'
    import walletindex from './views/wallet/wallet.vue'
// 应用
import application from './views/application.vue'
    import appindex from './views/application/appindex.vue'

// 404
import NotFound from './views/404.vue'
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
        ]
    },
    {
        path: '/home',
        redirect: '/home/discovery',
        component: Home,
        name: 'discovery',
        meta:{
            isIndex: 2                                      //  底部导航图标索引0 1 2 3
        },
        children: [
            { path: '/home/discovery', component: discovery, name: 'discoveryindex',meta:{isIndex: 2}}
        ]
    },
    {
        path: '/wallet',
        redirect: '/wallet/wallet',
        component: wallet,
        name: 'wallet',
        meta:{
            isIndex: 0                                      //  底部导航图标索引0 1 2 3
        },
        children: [
            { path: '/wallet/wallet', component: walletindex, name: 'walletindex',meta:{isIndex: 0}}
        ]
    },
    {
        path: '/app',
        redirect: '/application/appindex',
        component: application,
        name: 'app',
        meta:{
            isIndex: 1                                      //  底部导航图标索引0 1 2 3
        },
        children: [
            { path: '/app/index', component: appindex, name: 'appindex',meta:{isIndex: 1}}
        ]
    },
    {
        path: '*',
        hidden: true,
        component: NotFound,
    }
];

export default routes;