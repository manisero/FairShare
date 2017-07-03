let mapObject = (source, mapper) => {
    let result = {};

    Object.keys(source).forEach(
        fieldName => result[fieldName] = mapper(source[fieldName], fieldName)
    );

    return result;
};

let mapObjectFields = (source, mapper) =>
    Object.keys(source).map(
        fieldName => mapper(source[fieldName], fieldName)
    );

let mapToObject = (array, valueMapper) => {
    let result = {};

    array.forEach(
        (value, index) => result[value] = valueMapper(value, index)
    );

    return result;
};

let copyDeep = source => JSON.parse(JSON.stringify(source));

let ifNull = (object, valueGetter) => object != null ? object : valueGetter();

export { mapObject, mapObjectFields, mapToObject, copyDeep, ifNull };