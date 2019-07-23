// 截取字符串的第一个字母，中英文适用
const preDate = function(str){
    let datetmp     =   str.replace(/-/g, '/');     // 转换年月日的格式
    // 创建日期对象
    let date = new Date(datetmp);
    // 减一天
    date.setDate(date.getDate() - 1);
    let y = date.getFullYear()
    let m = parseInt(date.getMonth()+1)
    let d = date.getDate()
    str = y+'-'+m+'-'+d
    return str;
}
export default preDate;