/* 剪切板使用类：需要配合API打包后才能使用，无法在网页端直接使用 */
/*方法

// 复制内容到剪切板
var clipBoard = api.require('clipBoard');
clipBoard.set({
    value: 'test'
}, function(ret, err) {
    if (ret) {
        alert(JSON.stringify(ret));
    } else {
        alert(JSON.stringify(err));
    }
});


// 获取剪切板内容
var clipBoard = api.require('clipBoard');
clipBoard.get(function(ret, err) {
    if (ret) {
        alert(JSON.stringify(ret));
    } else {
        alert(JSON.stringify(err));
    }
});
*/

export const clipBoard = {
    methods: {
        CopyClip(text){
            // 粘贴
            var clipBoard = api.require('clipBoard');
            var that = this
            clipBoard.set({
                value: text
            },function(ret, err) {
                if (ret) {
                    that.$vux.toast.show({
                        text: that.$t('wallet.receive.tips.success'),
                        type: 'success'
                    })
                }else{
                    that.$vux.toast.show({
                        text: that.$t('wallet.receive.tips.error'),
                        type: 'warn'
                    })
                }
            });
        },
    },
}