(() => {
    Object.prototype.renameKey = function (fieldName: string, newFieldName: string) {
        if (fieldName === newFieldName || !this.hasOwnProperty(fieldName)) return this;
        const _this: any = this;
        _this[newFieldName] = _this[fieldName];
        delete _this[fieldName];
        return _this;
    };
})();
