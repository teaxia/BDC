<template>
	<div class="regist" v-cloak>
        <vtopbar title="注册用户"></vtopbar>
        <div class="pd50">
            <el-row>
                <el-col :span="24">
                    <h2>BDC钱包</h2>
                </el-col>
            </el-row>
            <div class="enterfrom">
                <el-select v-model="select" slot="prepend" class="input-select" placeholder="+86">
                    <el-option v-for="(item,index) in options" :key="index" :label="item.value" :value="item.value"></el-option>
                </el-select>
                <el-input placeholder="请输入手机号" v-model="mobile" class="input-with-select"></el-input>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("user.login") }}</button>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			UserName : '',
			PassWord : '',
            lang	 : 'zh',		//默认语言
            select   : '+86',
            mobile   : '',
            options: [{
               value: '+86',
            },{
               value: '+51',
            },{
               value: '+52',
            }],
		}
	},
	watch:{
		lang(){
			this.$storage.set('lang',this.lang);
			this.$i18n.locale = this.lang;
		}
	},
	methods: {
		doSubmit(){
			this.$server.post(
			'Login',
			{
				jm 	 : 'F993B1E731FF133F8156408CDE648249',//this.$md5('test1'),						// 加密方法name+pwd加密
				name : 'test1',											// 用户名
				pwd	 : '2F2ADE889CD0B18C2F2AD788E6F46585',//this.$md5('b2.@A%3dwa123456'),					// 加密方法  b2.@A%3dwa+pwd
				lv   : 'en'
			},
			).then(data => {
				if(data.d!='true'){
					this.$message.error({
						message: 'jm error',
						center:true,
					})
				}
				console.log(data.d);
			})
		}
	},
	mounted() {
		
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/user/regist";
@import "../../scss/base/main";
</style>