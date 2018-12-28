// 国际化英文语言包
export const en = {
    // 全局
    global:{
        title           : 'BDC',
        next            : 'Next',
        success         : 'Success!',
        error           : 'Error!',
        entry           : 'Entry',
        num             : 'Number',
        price           : 'Price',
        exchange        : 'Exchange Rate',
        Uncertified     : 'Uncertified',
        back            : 'back',
        copy            : 'Copy',
        copyaddress     : 'Copy Address',
        article         : 'Article',
        close           : 'Close',
        submit          : 'Submit',
        ok              : 'OK',
        cancel          : 'Cancel',
        notice          : 'Notice',
        msg             : 'Msg login',
        unopened        : 'Unopened',
        wait            : 'Processing in progress, please wait a moment',
        authentication  : 'This operation needs to be authenticated by real name first',
        off             : 'Off',
        message         : 'Message',
        ver             : 'Ver',
        stargame        : 'Start',
        authority       : 'No authority',
    },
    messgae:{
        Aread               :   'Already read',
        Unread              :   'Unread',
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
            repassword      : 'Please enter your password again',
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
        login               :   'Login',
        regist              :   'Regist',
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
            credit      :   'Credit card',
            extract     :   'Extract',
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
            discount    :   'Discount',
            group       :   'Recharge type',
            money       :   'Money',
            petrochina  :   'PetroChina',
            sinopec     :   'SINOPEC',
            type:{
                phone   :   'Telephone rate',
                gprs    :   'Data',
                oilcard :   'Oilcard'
            },
            error:{
                num     :   'Recharge not less than 1',
                full    :   'Please fill in the complete',
                mobile  :   'Phone number do not null'
            }
        },
        extract:{
            title       :   'Extract',
            address     :   'Extract address',
            bdc         :   'BDC',
            safetycode  :   'Safety code',
            bdcnum      :   'Please enter BDC num',
            addresstip  :   'Please enter address',
            tip         :   "Tip:Please enter Im'token address or exchange address",
            tax         :   'Tax',
            fee         :   'Amount of actual balance',
            tips:{
                safetycode  :   'Safety code number can not be null',
                num         :   'BDC num can not be null',
                address     :   'Extract address can not be null',
                tips        :   'Please check your withdrawal address carefully. If the withdrawal address is incorrect, you will not be able to return your BDC if the withdrawal fails'
            }
        },
        bill:{
            title       :   'Bill',
            type1       :   'Exp',
            type2       :   'Income',
            type3       :   'POS',
            type4       :   'Consume',
            type5       :   'Withdraw BDC',
            type6       :   'Buy BDC',
            type7       :   'ACHV',
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
            release         :   'Release'
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
            num             :   'Receiving Num',
            setnum          :   'Set up',
            save            :   'Save to album',
            tips:{
                success     :   'Success',
                error       :   'Copy failed. Please manually select copy',
                num         :   'Please enter the number of receipts',
            }
        },
        // 发送
        send:{
            title           :   'Send',
            dfaddress       :   'Address',
            num             :   'Num',
            class           :   'Category',
            auth            :   'Authentication',
            tips:{
                input       :   'Input/Long Press Paste BDC Address',
                min         :   'Minimum number of transmissions 0.0001',
                warn        :   'Save failed, please try again', 
                scan        :   'Alignment of two-dimensional codes allows automatic scanning',
            }
        }
    },
    // 应用
    application:{
        title:{
            buy             :   'Mall',
            shop            :   'Shop'
        },
        btn                 :   'Entry',
        tips:{
            error           :   'In preparation'
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
            language        :   'Language',
            price           :   'Currency',
            mycard          :   'Bind Credit Card',
            oldpsw          :   'Old password',
            newpsw          :   'New password',
            confirmpsw      :   'Confirm the password',
            english         :   'English',
            chinaese        :   '中文',
            rmb             :   'RMB',
            usd             :   'USD',
            card            :   'Card No.',
            bank            :   'Opening bank',
            name            :   'Name',
            tips:{
                oldpsw          :   'Please enter the old password',
                newpsw          :   'Please enter a new password',
                confirmpsw      :   'Please enter the password again',
                repsw           :   'New password and old password must be filled in',
                notpsw          :   'The password entered two times is inconsistent',
                card            :   'Please enter the bank card number.',
                bank            :   'Please enter an account bank',
                name            :   'Please enter your name.',
            }
        },
        feedback:{
            title       :   'Feedback',
            msg         :   'Thank you for your valuable advice...',
            imgerror    :   'Up to 5 pictures',
            tip         :   'Feedback should not be empty',
        },
        extension:{
            tg          :       'Extension',
            invitecode  :       'InviteCode',
        },
        auth:{
            idcard      :   'ID',
            idno        :   'ID number',
            passport    :   'Passport No.',
            front       :   'Front',
            back        :   'Back',
            realname    :   'Realname',
            tips:{
                realname    :   'Please enter your real name.',
                idno        :   'Please enter your ID number.',
                front       :   'Please upload the front.',
                back        :   'Please upload the reverse side',
                auth        :   'Certification success',
                sub         :   'Please wait for the audit',
                pic         :   'Picture size should not exceed 5M',
                picerror    :   'Picture type does not match',
                success     :   'You have passed the certification.',
                passport    :   'Please enter your passport number.',
                tips        :   'Tip:Only one user can be bound to the same real name information',
                number      :   'Please enter a valid ID number'
            }
        },
        mycard:{
            tip         :   'Tips',
            No          :   'No.',
            bank        :   'Bank',
            cardnumber  :   'Card Number',
            time        :   'Time',
            tips:{
                p1      :   '1、每个游戏账户最多绑定',
                p2      :   '张银行卡，您已经成功绑定',
                p3      :   '张',
                p4      :   '2、银行卡锁定以后，不能增加新的银行卡绑定，同时也不能解绑已绑定的银行卡',
                p5      :   '3、新绑定的提款银行卡需要绑定时间超过6小时才能正常取款',
                p6      :   '4、一个账户只能帮顶同一个开户人姓名的银行卡',
                bankerror   :   'Please enter the correct bank card.',
            }
        }
    }
}