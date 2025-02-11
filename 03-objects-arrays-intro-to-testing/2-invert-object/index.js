/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  let resultObj = {};

  if (!obj) {
    return obj;
  }

  for (let key in obj) {
    resultObj[obj[key]] = key;
  }

  return resultObj;
}
