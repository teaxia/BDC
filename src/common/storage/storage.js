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

export default Storage