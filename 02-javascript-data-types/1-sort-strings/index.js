/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const copiedArray = arr.slice();

    if (param === 'asc') {
        return copiedArray.sort((a, b) => comperer(a, b));
    }
    else {
        return copiedArray.sort((a, b) => comperer(b, a));
    }
}

function comperer(a, b) {
    let result = a.localeCompare(b, undefined, { sensitivity: 'base' });

    if (result == 0) {
        result = -1 * a.localeCompare(b, undefined, { sensitivity: 'case' });
    }

    return result;
}