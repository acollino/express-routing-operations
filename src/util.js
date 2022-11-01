function parseQueryString(queryStr) {
  // throw non-int errors
  let nums = queryStr.split(",");
  return nums.map((num) => parseInt(num));
}

module.exports = { parseQueryString };
