/* 判断是否登录，如果没有登录则跳转至登录界面 */

export const islogin = {
    methods: {
        islogin(){
            if(this.$storage.get('guid')==''||this.$storage.get('guid')==null||this.$storage.get('guid')==undefined){
                this.$storage.logout();
                this.$router.push({
                    path:"/user/login",
                });
            }
        }
    }
}