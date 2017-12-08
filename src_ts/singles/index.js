var Base = (function () {
    function Base() {
        this.name = "没有初始化";
        this.name = "基类";
    }
    Base.prototype.getName = function () {
        return this.name;
    };
    Base.extend = function (params) {
    };
    return Base;
}());
function P() {
    return new Promise(function (resolve, reject) {
    });
}
//# sourceMappingURL=index.js.map