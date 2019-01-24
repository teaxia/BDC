/* 获取选择货币列表及汇率 */

export const GetAccount = {
	data(){
		return{
			MyEarnings 		:	'',			// 我的收益
		}
	},
    methods: {
        GetAccount(){
			this.$server.post(
			'GetAccountById',
			{
				guid : this.$storage.get('guid')
			}).then(data => {
				if(data){
					this.$storage.set('NickName',data.NickName)                        // 昵称
					this.$storage.set('Name',data.Name);                                // 用户名
					(data.RealName)?this.$storage.set('RealName',data.RealName):this.$storage.set('RealName','')
					this.$storage.set('HeadImg',data.HeadImg)                          // 昵称
					this.$storage.set('RechargeCode',data.RechargeCode)                // 充值地址
					this.$storage.set('Mobile',data.PhoneNo)                           // 手机号
					this.$storage.set('Sex',data.Sex)                                  // 性别
					this.$storage.set('ParentName',data.ParentName)                    // 推荐人
					this.$storage.set('InviteCode',data.InviteCode)                    // 邀请码
					this.MyEarnings = data.MyEarnings									// 我的收益
				}
			})
        }
    }
}