// 国际化中文语言包
export const zh = {
    // 全局
    global:{
        title               : 'BDC钱包',
        next                : '下一步',
        success             : '成功',
        error               : '失败',
        entry               : '请输入',
        num                 : '数量',
        price               : '价格',
        exchange            : '兑换率',
        Uncertified         : '未认证',
        back                : '返回',
        copy                : '复制',
        article             : '文章',
        close               : '关闭',
        submit              : '提交',
        ok                  : '确认',
        cancel              : '取消',
        notice              : '系统公告',
        msg                 : '短信登录',
        unopened            : '暂未开放',
        wait                : '等待确认',
        authentication      : '该操作需要先通过实名认证',
        off                 : '限时优惠',
    },
    input:{ 
        mobile              :   '手机号',
        coname              :   '公司名称',
        oilcard             :   '油卡号码',
        recharge            :   '充值金额',
        bdc                 :   'BDC数额',
        tips:{
            mobile          :   '请输入手机号',
            coname          :   '请输入公司名称',
            oilcard         :   '请输入油卡号码',
            recharge        :   '请输入充值金额',
        }
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
            repassword      : '请再输入一次密码',
            phone           : '请输入手机号',
            forget          : '忘记密码?',
            success         : '登录成功',
            verification    : '验证码',
            mobileerror     : '请输入正确的手机号',
            vcode           : '验证码',
            verification    : '请输入6位数字验证码',
            setvcode        : '发送验证码',
            send            : '后重新发送',
            error           : '请填写正确的用户名与密码'
        },
        login           : '登 录',
        regist          : '注 册',
        logout          : '退出登录',
        password        : '登录密码',
        repassword      : '重复密码',
        securitypsw     : '安全密码',
        invitationcode  : '邀请码',
        forget          : '忘记密码',
        area            : '矿区',
        register: {
            username    :   '登录账号',
            nickname    :   '用户昵称',
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
            credit      :   '办信用卡',
            extract     :   '提币',
        },
        expectinfo:{
            title       :   '兑换BDC',
            hot         :   '正在抢购',
            issue       :   '本期发行量',
            b2b         :   '币币兑换',
            cash        :   '现金购买',
            notbuy      :   '未开启',
            success     :   '已完成',
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
            buy         :   '立即充值'
        },
        recharge:{
            title       :   '充值',
            price       :   '售价',
            discount    :   '优惠价',
            group       :   '充值类型',
            money       :   '金额',
            petrochina  :   '中国石油',
            sinopec     :   '中国石化',
            type:{ 
                phone   :   '话费',
                gprs    :   '流量',
                oilcard :   '油卡',
                oilcards:   '油卡充值',
            },
            error:{
                num     :   '充值金额不能小于1',
                full    :   '请填写完整的信息',
                mobile  :   '手机号不能为空'
            },
        },
        extract:{
            title       :   '提币',
            address     :   '提币地址',
            bdc         :   'BDC数量',
            safetycode  :   '安全码',
            bdcnum      :   '请输入提币数量',
            addresstip  :   '请输入提币地址',
            tips:{
                safetycode  :   '安全码不能为空',
                num         :   '提币数量不能为空',
                address     :   '提币地址不能为空',
                tip         :   '请仔细核对您的提币地址无误，提币地址错误提币失败将无法退还您的BDC',
            }
        },
        bill:{
            title       :   '账本',
            type1       :   '支出',
            type2       :   '收入',
            type3       :   'POS',
            type4       :   '消费',
            type5       :   '提币',
            type6       :   '购币',
            type7       :   '业绩',
            begin       :   '开始时间',
            end         :   '结束时间',
            people      :   '人数',
            money       :   '持币'
        },
        credit:{
            title       :   '信用卡办理',
            bank:{
                cmb     :   '招商银行',
                cmbc    :   '民生银行',
                spdb    :   '浦发银行',
                cib     :   '兴业银行',
                comm    :   '交通银行'
            },
            tips        :   '信用卡申请必须用实名认证'
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
            lock            :   '锁仓情况',
            lastdate        :   '最后存入时间',
            lockenddate     :   '锁仓结束时间',
            lockdays        :   '锁仓倒计时',
            assetsview      :   '固定资产详情',
            income          :   '收入',
            balance         :   '余额',
            date            :   '时间',
            release         :   '正在释放'            
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
            copy            :   '复制',
            tips:{
                success     :   '复制成功',
                error       :   '复制失败，请手动选择复制',
            }
        },
        // 发送
        send:{
            title           :   '发送',
            dfaddress       :   '对方地址',
            num             :   '发送数额',
            class           :   '类别',
            auth            :   '立即认证',
            tips:{
                input       :   '输入/长按粘贴BDC地址',
                min         :   '最小发送数量0.0001'
            }
        }
    },
    // 应用
    application:{
        title:{
            buy             :   '商城',
            shop            :   '商家'
        },
        btn                 :   '进入商城',
        tips:{
            error           :   '商家准备中'
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
        },
        area:{
            title           :   '矿区',
            levelup         :   '上一级',
            enter           :   '输入矿区成员',
            nickname        :   '用户名',
            invitecode      :   '邀请码',
            v1count         :   'V1矿区人数',
            v1bdc           :   'V1矿区BDC',
            v2count         :   'V2矿区人数',
            v2bdc           :   'V2矿区BDC',
            groupcount      :   '团队总人数',
            groupbdc        :   '团队BDC',
            edit            :   '操作',
            area            :   '矿区',
        },
        setting:{
            settile         :   '设置',
            editpsw         :   '修改登录密码',
            safepsw         :   '修改安全密码',
            language        :   '语言选择',
            price           :   '货币选择',
            oldpsw          :   '旧密码',
            newpsw          :   '新密码',
            confirmpsw      :   '确认密码',
            english         :   'english',
            chinaese        :   '中文',
            rmb             :   '人民币',
            usd             :   '美元',
            tips:{
                oldpsw          :   '请输入旧密码',
                newpsw          :   '请输入新密码',
                confirmpsw      :   '请再输入一次密码',
                repsw           :   '新密码与旧密码必须填写',
                notpsw          :   '两次输入的密码不一致'
            }
        },
        feedback:{
            title       :   '意见反馈',
            msg         :   '感谢您的宝贵建议...',
            tip         :   '意见反馈不能为空',
        },
        extension:{
            tg          :       '推广',
            invitecode  :       '我的邀请码',
        },
        auth:{
            idcard      :   '身份证',
            passport    :   '护照',
            front       :   '选择正面',
            back        :   '选择反面',
            realname    :   '真实姓名',
            tips:{
                realname    :   '请输入真实姓名',
                front       :   '请上传正面',
                back        :   '请上传反面',
                auth        :   '认证成功',
                sub         :   '已提交，请等待审核',
                pic         :   '图片大小不能超过5M',
                picerror    :   '图片类型不符合',
                success     :   '您已经通过认证'
            }
        }
    }
};