const Storage =  {}

Storage.get = function (name) {
    return localStorage.getItem(name)
}

Storage.set = function (name, val) {
    localStorage.setItem(name, val)
}

Storage.add = function (name, addVal) {
    let oldVal = Storage.get(name)
    let newVal = oldVal.concat(addVal)
    Storage.set(name, newVal)
}

Storage.logout = function (){
    //清除所有本地缓存
    // localStorage.clear();
    localStorage.removeItem('Name');
    localStorage.removeItem('NickName');
    localStorage.removeItem('RechargeCode');
    localStorage.removeItem('guid');
    localStorage.removeItem('InviteCode');
    localStorage.removeItem('RealName');
    localStorage.removeItem('HeadImg');
    localStorage.removeItem('Mobile');
    localStorage.removeItem('Sex');
    localStorage.removeItem('ParentName');
}
export default Storage