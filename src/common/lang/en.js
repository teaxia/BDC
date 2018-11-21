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
        back        : 'back',
        copy        : 'Copy',
        article     : 'Article',
        close       : 'close',
        submit      : 'Submit',
        ok          : 'OK',
        notice      : 'Notice',
        msg         : 'Msg login',
        unopened    : 'Unopened',
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
            error           : 'Please fill in the correct username and password'
        },
        login               :   'login',
        regist              :   'regist',
        logout              :   'Logout',
        password            :   'Password',
        repassword          :   'Repassword',
        securitypsw         :   'Security password',
        invitationcode      :   'Invitation Code',
        forget              :   'Forget password',
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
            success     :   'Success'
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
        },
        credit:{
            title       :   'Credit card',
            bank:{
                cmb     :   'CMB bank',
                cmbc    :   'CMBC bank',
                spdb    :   'SPDB bank',
                cib     :   'CIB  bank',
                comm    :   'COMM bank'
            },
            tips        :   'Tips：Application for credit card must be authenticated by real name.'
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
            lock            :   'Lock',
            lastdate        :   'Last Date',
            lockenddate     :   'Lock end date',
            lockdays        :   'Lock days',
            assetsview      :   'Assets',
            income          :   'Income',
            balance         :   'Balance',
            date            :   'Date', 
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
            dfaddress       :   'address',
            num             :   'num',
            class           :   'category',
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
        },
        area:{
            title           :   'Area',
            levelup         :   'Up',
            enter           :   'Search....',
            nickname        :   'User name',
            invitecode      :   'Invite Code',
            v1count         :   'V1 Count',
            v1bdc           :   'V1 BDC',
            v2count         :   'V2 Count',
            v2bdc           :   'V2 BDC',
            groupcount      :   'Group count',
            groupbdc        :   'Group BDC',
            edit            :   'Operation',
            area            :   'Area',
        },
        setting:{
            settile         :   'Setting',
            editpsw         :   'Modify login password',
            safepsw         :   'Modify security password',
            language        :   'language',
            price           :   'currency',
            oldpsw          :   'Old password',
            newpsw          :   'New password',
            confirmpsw      :   'Confirm the password',
            english         :   'english',
            chinaese        :   '中文',
            rmb             :   'RMB',
            usd             :   'USD',
            tips:{
                oldpsw          :   'Please input the old password',
                newpsw          :   'Please enter a new password',
                confirmpsw      :   'Please enter the password again',
                repsw           :   'New password and old password must be filled in',
                notpsw          :   'The password entered two times is inconsistent'
            }
        },
        extension:{
            tg          :       'Extension',
            invitecode  :       'InviteCode',
        }
    }
}