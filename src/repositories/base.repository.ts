type TypeOptionsFormatterParams = {
    fieldName?: string;
    newFieldName?: string;
};

export class BaseRepository {
    constructor() {}

    protected formatterObjectId(object: Object, options?: TypeOptionsFormatterParams) {
        if (!options) options = {};
        return structuredClone(object).renameKey(options.fieldName || 'id', options.newFieldName || '_id');
    }

    protected formatterArrayIds<T extends Object>(array: Array<T>, options?: TypeOptionsFormatterParams) {
        if (!options) options = {};
        return structuredClone(array).map((item) =>
            this.formatterObjectId(item, { fieldName: options.fieldName, newFieldName: options.newFieldName }),
        );
    }
}
