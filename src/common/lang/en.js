// 国际化英文语言包
export const en = {
    // 全局
    global:{
        title       : 'BDC',
        next        : 'Next',
        success     : 'Success!',
        error       : 'Error!',
        entry       : 'Entry',
        num         : 'Number',
        price       : 'Price',
        exchange    : 'Exchange Rate',
        Uncertified : 'Uncertified',
        back        : 'back'
    },
    input:{
        mobile              :   'Phone number',
        coname              :   'Corporate',
        oilcard             :   'Fuel card',
        recharge            :   'Recharge',
        bdc                 :   'BDC',
        tips:{
            mobile          :   'Please enter your phone number',
            coname          :   'Please enter your corporate number',
            oilcard         :   'Please enter your Fuel card',
            recharge        :   'Please enter recharge',
        }
    },
    // 全局底部菜单
    menu:{
        wallet       : 'Wallet',
        application  : 'App',
        discovery    : 'Find',
        mine         : 'Mine'
    },
    //注册登陆
    user: {
        tips    :   {
            username        : 'Please enter your account',
            password        : 'Please enter your password',
            phone           : 'Please enter your phone number',
            forget          : 'Forget password?',
            success         : 'Login success',
            verification    : 'Verification code',
            mobileerror     : 'Please input the correct cell phone number.',
            vcode           : 'Code',
            verification    : 'Please enter 6 digit verification code',
            setvcode        : 'Get verification code',
            send            : 'Recapture',
        },
        login               :   'login',
        regist              :   'regist',
        logout              :   'Logout',
        password            :   'Password',
        securitypsw         :   'Security password',
        invitationcode      :   'Invitation Code',
        area                :   'Area',
        register: {
            username    :   'User name：',
            nickname    :   'Nick name：',
        },
        type    :   {
            msg     : 'SMS login',
            account : 'Account login',
            sex     : 'Sex',
            man     : 'Male',
            woman   : 'Female',
        },
        verification:   {
            title   : 'Please enter verification code',
        }
    },
    // 发现
    discovery:{
        topmenu:{
            bdc         :   'BDC',
            ctc         :   'CTC',
            market      :   'Market',
            bill        :   'Bill',
            calculator  :   'Calculator',
            ent         :   'ENT',
            recharge    :   'Recharge',
            credit      :   'Credit card'
        },
        expectinfo:{
            title       :   'Exchange BDC',
            hot         :   'HOT',
            issue       :   'Circulation',
            b2b         :   'Exchange',
            cash        :   'Buy',
            notbuy      :   'Unopened',
        },
        btob:{
            title       :   'Exchange',
            changtype   :   'Exchange Type',
            proportion  :   'Proportion',
            num         :   'Please entry quantity',
            address     :   'Exchange Address',
            submit      :   'Exchange now',
            null        :   'Quantity can not be null'    
        },
        cash:{
            title       :   'Cash',
            rate        :   'Proportion',
            selectbank  :   'Bank',
            cardname    :   'Card name',
            cardnumber  :   'Card number',
            buyname     :   'Your name',
            tips:{
                buyname :   'Please entry Your name',
            },
            buy         :   'Buy Now'
        },
        recharge:{
            title       :   'Recharge',
            price       :   'price',
            type:{
                phone   :   'Telephone rate',
                gprs    :   'data',
                oilcard :   'oilcard'
            },
            error:{
                num     :   'Recharge not less than 1',
                full    :   'Please fill in the complete',
                mobile  :   'Phone number do not null'
            }
        },
        bill:{
            title       :   'Bill',
            type1       :   'Expenditure',
            type2       :   'Income',
            type3       :   'POS',
            type4       :   'Consumption',
            type5       :   'Withdraw money',
            type6       :   'Pay',
            type7       :   'Achievement',
            begin       :   'Start time',
            end         :   'End time',
            people      :   'People',
            money       :   'Money'
        }
    },
    // 钱包
    wallet:{
        title           :   'BDC wallet',
        tips:{
            change          :   'Asset conversion',
            count           :   'Asset count',
            capitalassets   :   'Capital assets',
            actassets       :   'Act assets',
            gameassets      :   'Game assets',
            changetype      :   'Transformation type',
            safetycode      :   'Safety code',
            transfor        :   'Transformation',
            inputcode       :   'Plase entry Safety code',
            btntransfor     :   'Transformation',
        },
        transfor:{
            type1           :   'Capital To Act',
            type2           :   'Act To Game',
            type3           :   'Game To assets',
            error1          :   'Transformation number can not be null',
            error2          :   'Safety code can not be null',
        },
        btn:{
            send            :   'Send',
            receive         :   'Receive'
        },
        // 接收
        receive:{
            title           :   'Receive BDC',
            copy            :   'Copy',
            tips:{
                success     :   'Success',
                error       :   'Copy failed. Please manually select copy',
            }
        },
        // 发送
        send:{
            title           :   'Send',
        }
    },
    // 应用
    application:{
        title:{
            buy             :   'Buy',
            shop            :   'Shop'
        }
    },
    // 我的
    mine:{
        menus:{
            spread          :   'Spread APP',
            website         :   'Website',
            members         :   'Block members',
            question        :   'Question',
            feedback        :   'Feedback',
            realname        :   'Authentication',
            setting         :   'Setting'
        }
    }
}