// 截取字符串的第一个字母，中英文适用
const strcut = function(str,n){
    var r=/[^\x00-\xff]/g
    if(str.replace(r,"mm").length<=n){return str;}
    var m=Math.floor(n/2)
    for(var i=m;i<str.length;i++){
        if(str.substr(0,i).replace(r,"mm").length>=n){
            return str.substr(0,i)
        }
    }
    return str;
}
export default strcut;