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
        copyaddress         : '复制地址',
        article             : '文章',
        close               : '关闭',
        submit              : '提交',
        ok                  : '确认',
        cancel              : '取消', 
        notice              : '系统公告',
        msg                 : '短信登录',
        unopened            : '暂未开放',
        wait                : '等待确认',
        authentication      : '该操作需要先通过[安全中心]->[实名认证]',
        bindbank            : '该操作需要先绑定银行卡',
        off                 : '限时优惠',
        message             : '消息中心',
        ver                 : '版本号',
        stargame            : '开始游戏',
        authority           : '账户未授权',
        paste               : '粘贴',
        selectArea          : '您选择的矿区为',
        confirm             : '单击“确定”继续注册。单击“取消”重新选择',
        regist              : '注册',
        enter               : '立即进入',
        input               : '请输入',
        clickinput          : '点击输入',
    },
    message:{
        Aread               :   '已读',
        Unread              :   '未读',
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
            mobileerror     : '请输入正确的手机号',
            vcode           : '验证码',
            verification    : '请输入6位数字验证码',
            setvcode        : '发送验证码',
            send            : '重新发送',
            error           : '请填写正确的用户名与密码',
            nameerror       : '用户名必须为5-20位的英文或者数字',
            nickname        : '请输入用户昵称',
            security        : '请输入安全码',
            invitationcode  : '请输入邀请码',
            notecode        : '请输入节点码',
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
            notecode: '节点码不能为空',
        }
    },
    // 发现
    discovery:{
        topmenu:{ 
            bdc         :   '兑换BDC',
            OTC         :   'OTC',
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
            issued      :   '本期已发行',
            b2b         :   '在线兑换',
            cash        :   '现金购买',
            self        :   '自助购买',
            notbuy      :   '未开启',
            success     :   '已完成',
            fixedPos    :   '固定算力',
            totalPos    :   '总算力剩余',
            managePos   :   '管理算力',
            spreadPos   :   '推广算力',
        },
        btob:{
            title       :   '在线兑换',
            changtype   :   '兑换类型',
            proportion  :   '兑换比例',
            num         :   '请输入兑换数量',
            InputNum    :   '兑换数量',
            address     :   '兑换地址',
            submit      :   '立即兑换',
            null        :   '兑换数量不能为空',
            week        :   '周',
            month       :   '月',
            season      :   '季',
            year        :   '年',
            dataNull    :   '没有数据',
            history     :   '最新提交记录', 
            confirm     :   '请确认兑换信息',
            AssetType   :   '资产类型',
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
        self:{
            title       :   '自助购买',
            num         :   'BDC数量',
            CNYNum      :   '转账金额',
            BankCardNo  :   '银行卡号',
            name        :   '转账人姓名',
            remarks     :   '备注',
            tips:{
                num         :   '请输入BDC数量',
                CNYNum      :   '请输入转账金额',
                BankCardNo  :   '银行卡号后四位',
                name        :   '请输入转账人姓名',
            }
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
                mobile  :   '请输入正确的手机号'
            },
        },
        extract:{
            title       :   '提币', 
            address     :   '提币地址',
            bdc         :   '提币数量',
            safetycode  :   '安全码',
            bdcnum      :   '请输入提币数量',
            addresstip  :   '请输入提币地址',
            tax         :   '手续费',
            fee         :   '扣除BDC',
            tip         :   "Tip:请输入Im'token地址或交易所地址",
            min         :   '最低提币数量为200',
            auto        :   '自动填写',
            extractType :   '提币类型',
            tips:{
                safetycode  :   '安全码不能为空',
                num         :   '提币数量不能为空',
                address     :   '提币地址不能为空',
                tip         :   '请仔细核对您的提币地址无误，提币地址错误提币失败将无法退还您的',
            }
        },
        bill:{
            title       :   '账本',
            type1       :   '支出',
            type2       :   '收入',
            type3       :   'POS',
            type4       :   '消费',
            type5       :   '提币',
            type6       :   '兑换',
            type7       :   '业绩',
            type8       :   '游戏',
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
        },
        games:{
            relax           :   '休闲游戏',
            gambling        :   '棋牌游戏',           
            gamebalance     :   '游戏余额',
            assetsbalance   :   '通证资产',
            gamesbalance    :   '游戏钱包',
            tranIn          :   '转入',
            tranOut         :   '转出',
            refresh         :   '刷新',
            taccounts       :   '余额转账',
            num             :   '请输入正整数'
        },
        withdrawal:{
            title           :   '收益提现',
            week            :   '本周收益',
            month           :   '本月收益',
            total           :   '总计收益',
            myEarnings      :   '收益余额',
            money           :   '提币数量',
            bank            :   '提现银行',
            submit          :   '立即提现',
            querywtih       :   '提现查询',
            queryProfit     :   '收益查询',
            datewith        :   '查询时间段收益总计',
            dateProfit      :   '查询时间段提现总计',
            moneyBefore     :   '原有数量',
            moneychange     :   '数量变动',
            moneyAfter      :   '现有数量',
            createTime      :   '时间',
            remarks         :   '备注',
            confirm         :   '提交',
            tips:{
                money       :   '请检查数量是否正确。小数点只能保留2位',
                input       :   '请输入提币数量',
                bind        :   '该操作请先绑定银行卡',
                thisTime    :   '本次提现数量',
                bank        :   '提现银行卡',
                min         :   '最低提币',
                reduce      :   '实际到账',
                address     :   '提币地址不能为空',
                wawal       :   '您的收益额度不足',
            }
        },
        OTC:{
            Selltitle       :   '发布售币',
            ranking         :   '排行榜',
            sell:{
                reference       :   '参考发布价格',
                selectCurreny   :   '选择币种',
                num             :   '发布数量',
                price           :   '单价',
                minNum          :   '最低限额',
                security        :   '安全码',
                sale            :   '立即上架',
                up              :   '上架',
                down            :   '下架',
                close           :   '关闭',
                payment         :   '支付方式',
                bindalipay      :   '点击马上绑定支付宝',
                bindwechart     :   '点击马上绑定微信支付',
                bindcard        :   '点击马上绑定银行卡',
                deduction       :   '卖家实际扣除',
                odeduction      :   '实际扣除',
                tax             :   '卖家手续费',
                total           :   '求购总额',
                Range           :   '发布范围',
                all             :   '全部',
                cn              :   '场内',
                cw              :   '场外',
                tips:{
                    num         :   '发布数量必须填写',
                    price       :   '单价必须填写',
                    minNum      :   '最低限额必须填写',
                    cName       :   '请选择您要发布的币种',
                    payment     :   '必须选择一种支付方式',
                    security    :   '安全码必须填写',
                    openalipay  :   '开启支付宝收款',
                    openwechart :   '开启微信收款',
                    opencard    :   '开启银行卡收款',
                    offalipay   :   '关闭支付宝收款',
                    offwechart  :   '关闭微信收款',
                    offcard     :   '关闭银行卡收款',
                    selectbank  :   '请选择绑定账号',
                    hightprice  :   '发布价格不能高于系统参考发布价',
                },
                input:{
                    num         :   '数量',
                    num2        :   '最多输入2位小数',
                    price       :   '售卖单价',
                    minNum      :   '不能低于100',
                }
            },
            index:{
                record      :   '记录',
                buy         :   '我要买',
                bybuy       :   '我要卖',
                send        :   '发布',
                curreny     :   '币种',
                time        :   '时间',
                price       :   '价格',
                min         :   '限额',
                num         :   '数量',
                add         :   '发布',
            },
            buy:{
                price       :   '单价',
                num         :   '数量',
                full        :   '全部购买',
                min         :   '最少购买',
                close       :   '关闭订单',
                remark      :   '备注留言',
                goods:{
                    bybuy   :   '我要卖',
                    sell    :   '售币',
                    sellBuy :   '售卖',
                    Isell   :   '确定出售',
                }
            },
            order:{
                title       :   '支付订单',
                orderId     :   '订单号',
                your        :   '您向',
                tome        :   '向您出售',
                tomebuy     :   '向您购买',
                buy         :   '购买',
                sell        :   '出售',
                price       :   '单价',
                total       :   '总价',
                payment     :   '点击查看付款方式',
                cancel      :   '取消订单',
                paymentok   :   '完成支付',
                alipay      :   '支付宝账号',
                name        :   '姓名',
                nickname    :   '卖家昵称',
                bank        :   '开户银行',
                cardNumber  :   '银行账号',
                picSaveS    :   '图片保存成功',
                picSaveE    :   '图片保存失败，请检查APP权限',
                cancelS     :   '订单已取消',
                saveErcode  :   '保存付款码',
                copyCard    :   '复制卡号',
                copyName    :   '复制姓名',
                thisPay     :   '当前付款方式',
                selectpay   :   '以此方式付款',
                LookPay     :   '请查看付款方式后选择支付方式',
                ConfirmCancel:  '是否确认取消该笔订单？',
                up          :   '上架',
                down        :   '下架',
            },
            complaiont:{
                title       :   '申诉',
                describe    :   '请详细描写您的申诉内容',
                remarks     :   '请填写您的申诉内容',
                error       :   '最多只能上传3张图片',
                record      :   '申诉记录',
                order       :   '申诉订单',
                status      :   '审核状态',
                status0     :   '待审核',
                status1     :   '审核成功',
                status3     :   '拒绝',
                details     :   '申诉详情',
                orderId     :   '申诉订单号',
                ctime       :   '申诉时间',
                atime       :   '审核时间',
                commont     :   '申诉内容',
                recommont   :   '审核回复内容',
                minutes     :   '请于支付30分钟后再提交申诉',
            },
            demand:{
                title       :   '发布求购',
                num         :   '货币数量',
                price       :   '求购价格',
            },
            edit:{
                title       :   '编辑',
                numed       :   '已售数量',
                islock      :   '目前为锁定状态，不可修改。锁定倒计时',
                sellout     :   '当前订单已经售罄，不可编辑',
                downdel     :   '只有下架后才可删除',
                edit        :   '保存修改',
                del         :   '删除',
                delconfirm  :   '是否确认删除？',
                ok          :   '操作确认',
            },
            orderlist:{
                title       :   '订单记录',
                orderId     :   '订单ID',
                orderType0  :   '售币',
                orderType1  :   '求购',
                orderType2  :   '已购',
                orderType3  :   '已售',
                orderType4  :   '收益',
                SorderId    :   '订单号搜索',
                price       :   '单价',
                oprice      :   '单价',
                totalprice  :   '总价',
                total       :   '出售数量',
                sellnum     :   '已售数量',
                neednum     :   '求购数量',
                num         :   '数量',
                Profit      :   '总收益',
            },
            myorder:{
                title       :   '订单详情',
                ctime       :   '订单创建时间',
                ptime       :   '订单付款时间',
                dtime       :   '订单完成时间',
                cantime     :   '订单取消时间',
                remark      :   '留言',
                confirm     :   '确认收款',
                cancalorder :   '交易已取消',
                doneorder   :   '交易已完成',
                tips        :   '确认后系统将自动发币至买家账户，是否确认？',
                payment     :   '收款方式',
                nickname    :   '收款昵称',
                name        :   '收款姓名',
                bank        :   '收款银行',
                cardid      :   '收款卡号',
                access      :   '收款账号',
                wait        :   '还需等待',
                minute      :   '分',
                second      :   '秒后才可申述'
            },
            type:{
                type01      :   '下架',
                type0       :   '上架',
                type2       :   '锁定',
                type_2      :   '售罄',
                GoodsType0  :   '售币',
                GoodsType1  :   '求购',
            },
            status:{
                status2     :   '待支付',
                status3     :   '待发币',
                status4     :   '已发币',
                status5     :   '交易完成',
                status6     :   '取消订单',
                status7     :   '申诉完成',
                status8     :   '系统撤销',
            },
            tips:{
                salipay     :   '支持支付宝付款',
                oalipay     :   '关闭支付宝付款支持',
                swechart    :   '支持微信付款',
                owechart    :   '关闭微信付款支持',
                scard       :   '支持银行卡付款',
                ocard       :   '关闭银行卡付款支持',
            },
            rank:{
                title       :   '排行榜',
                nickname    :   '昵称（等级）',
                num         :   '接单数'
            }
        },
    },
    // OTC的部分语言包
    OTC:{
        sellBuy:{
            pricebuy        :   '按价格购买',
            pricesell       :   '按价格出售',
            numbuy          :   '按数量购买',
            numsell         :   '按数量出售',
            full            :   '全部出售',
            ordernum        :   '交易数量',
            total           :   '交易总额',
            InputBuyNum     :   '请输入欲购买法币总额',
            InputsellNum    :   '请输入欲出售法币总额',
            InputsellBDC    :   '请输入欲购买数量',
            tips:{
                isBuyNull   :   '购买数量不能为空',
                isSellNull  :   '出售数量不能为空',
            }
        },
        buy:{
            limit           :   '限额',
            num             :   '出售数量',
            tips:{
                bdcnum      :   '购买数量不能为空',
                sellnum     :   '出售数量不能为空',
            }
        },
        order:{
            ok              :   '确认支付',
            other           :   '查看其他方式',
            tel             :   '联系电话',
            type:{
                WaitPrice   :   '待收款',
                WaitSend    :   '待发币'
            },
        },
        rank:{
            num             :   '交易数量'
        }
    },
    // 钱包
    wallet:{
        title           :   'BDC Wallet',
        tips:{
            change          :   '资产转换',
            count           :   '资产总和',
            capitalassets   :   '固定资产',
            actassets       :   '通证资产',
            gameassets      :   '游戏钱包',
            changetype      :   '转换方式',
            safetycode      :   '安全码',
            transfor        :   '转换',
            inputcode       :   '请输入安全码',
            btntransfor     :   '立即转换',
            lock            :   '锁仓情况',
            lastdate        :   '最初存入时间',
            lockenddate     :   '锁仓结束时间',
            lockdays        :   '锁仓倒计时',
            assetsview      :   '固定资产详情',
            income          :   '收入',
            balance         :   '余额',
            date            :   '时间',
            release         :   '正在释放',
            orderId         :   '订单号',
            price           :   '充值金额',
            BDCnum          :   '支付BDC数量',
            confirm         :   '确认付款',
            ok              :   '立即支付',
            cancel          :   '取消支付',
            success         :   '支付成功',
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
            num             :   '接收数量',
            setnum          :   '设置数量',
            save            :   '保存到相册',
            tips:{
                success     :   '复制成功',
                error       :   '复制失败，请手动选择复制',
                num         :   '请输入接收数量',
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
                min         :   '最小发送数量0.0001',
                warn        :   '保存失败，请重试',
                scan        :   '对准二维码，即可自动扫描',
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
            server          :   '在线客服',
            setting         :   '设置',
            withdrawal      :   '我的收益',
            cash            :   '提币',
            security        :   '安全中心',
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
            mychild         :   '我的直推',
            achievement     :   '新增业绩',
            num             :   '购币量',
            date            :   '注册时间',
            note            :   '节点码',
            viewLink        :   '查看链接',
            tips:{
                error       :   '查无此信息'
            },
        },
        setting:{
            settile         :   '设置',
            editpsw         :   '修改登录密码',
            safepsw         :   '修改安全密码',
            language        :   '语言选择',
            price           :   '货币选择',
            mycard          :   '绑定银行卡',
            bindalipay      :   '绑定支付宝',
            bindwechart     :   '绑定微信支付',
            alipay          :   '支付宝',
            wechart         :   '微信支付',
            alipayAccess    :   '支付宝账号',
            oldpsw          :   '旧密码',
            newpsw          :   '新密码',
            confirmpsw      :   '确认密码',
            english         :   'English',
            chinaese        :   '中文',
            rmb             :   '人民币',
            usd             :   '美元',
            card            :   '银行卡号',
            bank            :   '开户行',
            name            :   '姓名',
            delete          :   '删除',
            editPhone       :   '修改手机号',
            oldPhone        :   '旧手机号',
            newPhone        :   '新手机号',
            bindPhone       :   '绑定新手机号',
            vierPhone       :   '验证手机号',
            nickname        :   '昵称',
            google          :   '谷歌认证',
            tips:{
                oldpsw          :   '请输入旧密码',
                newpsw          :   '请输入新密码',
                confirmpsw      :   '请再输入一次密码',
                repsw           :   '新密码与旧密码必须填写',
                notpsw          :   '两次输入的密码不一致',
                card            :   '请输入银行卡号',
                bank            :   '请输入开户行',
                name            :   '请输入真实姓名',
                upAlipayErcode  :   '上传支付宝收款码',
                upWechartErcode :   '上传微信收款码',
                inputalipay     :   '请输入支付宝账号',
                confirmDel      :   '是否确认删除该数据',
                alipayEnter     :   '支付宝账号必须填写',
                nickname        :   '请输入昵称',
            }
        },
        feedback:{
            title       :   '意见反馈',
            msg         :   '感谢您的宝贵建议...',
            imgerror    :   '最多只能上传5张图片',
            tip         :   '意见反馈不能为空',
            upimg       :   '上传截图',
        },
        extension:{
            tg          :       '推广',
            invitecode  :       '我的邀请码',
            parentname  :       '推荐人',
        },
        auth:{
            idcard      :   '身份证',
            idno        :   '身份证号',
            passport    :   '护照号',
            front       :   '选择正面',
            back        :   '选择反面',
            realname    :   '真实姓名',
            tips:{
                realname    :   '请输入真实姓名',
                idno        :   '请输入身份证号',
                front       :   '请上传正面',
                back        :   '请上传反面',
                auth        :   '认证成功',
                sub         :   '已提交，请等待审核',
                pic         :   '图片大小不能超过5M',
                picerror    :   '图片类型不符合',
                success     :   '您已经通过认证',
                passport    :   '请输入护照号码',
                tips        :   'Tip:同一实名信息只能绑定一个用户',
                number      :   '请输入有效证件号码'
            }
        },
        mycard:{
            tip         :   '温馨提示',
            No          :   '序号',
            bank        :   '银行名称',
            cardnumber  :   '卡号',
            time        :   '绑定时间',
            tips:{
                p1          :   '1、每个游戏账户最多绑定',
                p2          :   '张银行卡，您已经成功绑定',
                p3          :   '张',
                p4          :   '2、银行卡锁定以后，不能增加新的银行卡绑定，同时也不能解绑已绑定的银行卡',
                p5          :   '3、新绑定的提款银行卡需要绑定时间超过6小时才能正常取款',
                p6          :   '4、一个账户只能帮顶同一个开户人姓名的银行卡',
                bankerror   :   '请输入正确的银行卡',
            }
        },
        ahtuenticator:{
            username        :   '用户名',
            key             :   '密钥',
            veri            :   '验证绑定',
            cancel          :   '取消绑定',
            google          :   '请输入谷歌安全码',
            security        :   '安全码',
            googlesecurity  :   '请输入身份验证器的安全码',
            success         :   '验证成功',
            error           :   '验证失败',
            openAuth        :   '开启谷歌认证',
            open            :   '开',
            close           :   '关',
            tips            :   '提示：扫码或手动绑定后请点击验证绑定来与该账号保持绑定状态，否则绑定无效',
            cancelAuth      :   '取消谷歌验证',
            cancelsuccess   :   '取消绑定成功',
            cancelerror     :   '取消绑定失败',
        }
    }
};