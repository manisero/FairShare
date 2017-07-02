let mapObject = (source, mapper) => {
    let result = {};

    Object.keys(source).forEach(fieldName => result[fieldName] = mapper(source[fieldName], fieldName));

    return result;
};

let copyDeep = source => JSON.parse(JSON.stringify(source));

let ifNull = (object, valueGetter) => object != null ? object : valueGetter();

export { mapObject, copyDeep, ifNull };
