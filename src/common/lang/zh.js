// 国际化中文语言包
export const zh = {
    // 全局
    global:{
        title               : 'BDC钱包',
        next                : '下一步',
        success             : '成功！',
        error               : '失败！',
        entry               : '请输入',
        num                 : '数量',
        price               : '价格',
        exchange            : '兑换率',
        Uncertified         : '未认证',
        back                : '返回'
    },
    // 全局底部菜单
    menu:{
        wallet       : '钱包',
        application  : '应用',
        discovery    : '发现',
        mine         : '我的'
    },
    //注册登录
    user: {
        tips    :   {
            username        : '请输入账号',
            password        : '请输入密码',
            phone           : '请输入手机号',
            forget          : '忘记密码？',
            success         : '登录成功！',
            verification    : '验证码',
            mobileerror     : '请输入正确的手机号',
            vcode           : '验证码',
            verification    : '请输入6位数字验证码',
            setvcode        : '发送验证码',
            send            : '后重新发送',
            error           : '请填写正确的用户名与密码'
        },
        login   : '登 录',
        regist  : '注 册',
        logout  : '退出登录',
        register: {
            username    :   '登录账号：',
            nickname    :   '用户昵称：',
        },
        type    :   {
            msg     : '短信登录',
            account : '账号登录',
            sex     : '性别',
            man     : '男',
            woman   : '女',
        },
        verification:   {
            title   : '请输入验证码',
        }
    },
    // 发现
    discovery:{
        topmenu:{
            bdc         :   '兑换BDC',
            ctc         :   'CTC',
            market      :   '行情',
            bill        :   '账本',
            calculator  :   '计算器',
            ent         :   '休闲娱乐',
            recharge    :   '充值',
            credit      :   '办信用卡'
        },
        expectinfo:{
            title       :   '兑换BDC',
            hot         :   '正在抢购',
            issue       :   '本期发行量',
            b2b         :   '币币对换',
            cash        :   '现金购买',
            notbuy      :   '未开启',
        },
        btob:{
            title       :   '币币兑换',
            changtype   :   '兑换类型',
            proportion  :   '兑换比例',
            num         :   '请输入兑换数量',
            address     :   '兑换地址',
            submit      :   '立即兑换',
            null        :   '兑换数量不能为空'    
        },
        cash:{
            title       :   '现金兑换',
            rate        :   '当前汇率',
            selectbank  :   '选择银行',
            cardname    :   '开户名',
            cardnumber  :   '银行卡号',
            buyname     :   '购买人姓名',
            tips:{
                buyname :   '请输入购买人姓名',
            },
            buy         :   '立即购买'
        }
        
    },
    // 钱包
    wallet:{
        title           :   'BDC wallet',
        tips:{
            change          :   '资产转换',
            count           :   '资产总和',
            capitalassets   :   '固定资产',
            actassets       :   '通证资产',
            gameassets      :   '游戏资产',
            changetype      :   '转换方式',
            safetycode      :   '安全码',
            transfor        :   '转换',
            inputcode       :   '请输入安全码',
            btntransfor     :   '立即转换',
        },
        transfor:{
            type1           :   '通证转固定',
            type2           :   '通证转游戏',
            type3           :   '游戏转通证',
            error1          :   '转换数量不能为0',
            error2          :   '安全码不能为空',
        },
        btn:{
            send            :   '发送',
            receive         :   '接收'
        },
        // 接收
        receive:{
            title           :   '接收BDC',
            copy            :   '复制地址',
            tips:{
                success     :   '复制成功',
                error       :   '复制失败，请手动选择复制',
            }
        },
        // 发送
        send:{
            title           :   '发送',
        }
    },
    // 应用
    application:{
        title:{
            buy             :   '购物',
            shop            :   '商家'
        }
    },
    // 我的
    mine:{
        menus:{
            spread          :   '推广APP',
            website         :   '进入官网',
            members         :   '矿区成员',
            question        :   '常见问题',
            feedback        :   '意见反馈',
            realname        :   '实名认证',
            setting         :   '设置'
        }
    }
};