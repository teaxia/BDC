// 用户中心，注册登陆
import user from './views/user.vue'
    import regist from './views/user/regist.vue'                            //  注册
    import login from './views/user/login.vue'                              //  登陆
    import verification from './views/user/verification.vue'                //  验证码验证
    import registinfo from './views/user/registinfo.vue'                    //  注册信息填写
// 发现
import Home from './views/home.vue'
    import discovery from './views/home/index.vue'
import NotFound from './views/404.vue'
let routes = [
    {
        path: '/index',
        component: user,
        redirect: '/user/login',
        name: '',
        hidden: true,
        meta:{
            isIndex: 0                                      //  底部导航图标索引0 1 2 3
        },
    },
    {
        path: "/",
        component: user,
        name: "login",
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
            { path: '/home/discovery', component: discovery, name: 'discovery',meta:{isIndex: 2}}
        ]
    },
    {
        path: '*',
        hidden: true,
        component: NotFound,
    }
];

export default routes;