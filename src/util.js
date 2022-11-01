const statsError = require("./error");

function parseQueryString(queryStr) {
  if (!queryStr) {
    throw new statsError("Nums query must be included.", 400);
  }
  const nums = queryStr.split(",");
  return nums.map((num) => {
    let currentNum = parseFloat(num);
    if (isNaN(currentNum)) {
      throw new statsError(`${num} is not a number.`, 400);
    }
  });
}

module.exports = { parseQueryString };
