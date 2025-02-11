/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let resultString = '';

  if (size === 0) {
    return resultString;
  }

  if (!size || string.length == 1) {
    return string;
  }

  let counter = 0;

  for (let i = 0; i < string.length; i++) {
    let lastResultString = resultString[resultString.length - 1];

    if (string[i] === lastResultString) {
      if (counter < size) {
        resultString += string[i];
        counter++;
      }
    }
    else {
      resultString += string[i];
      counter = 1;
    }
  }

  return resultString;
}