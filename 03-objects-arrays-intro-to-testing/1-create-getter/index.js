/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    return object => {
        var properties = path.split('.');

        properties.forEach(property => {
            if (!object) {
                return;
            }

            if (Object.hasOwn(object, property)) {
                object = object[property];
            } else {
                object = undefined;
                return;
            }
        });

        return object;
    }
}