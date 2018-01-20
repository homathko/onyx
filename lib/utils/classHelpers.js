Object.prototype.className = function () {
    return Object.getPrototypeOf(this).constructor.name;
};