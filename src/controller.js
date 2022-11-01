const { parseQueryString } = require("./util");

function mean(req, res, next) {
  try {
    let nums = parseQueryString(req.query.nums);
    let answer = nums.reduce((sum, num) => sum + num) / nums.length;
    return res.json({ operation: "mean", value: answer });
  } catch (err) {
    next(err);
  }
}

function median(req, res, next) {
  try {
    let nums = parseQueryString(req.query.nums);
    nums.sort((a, b) => a - b);
    let midpoint = nums.length / 2;
    let answer;
    if (nums.length % 2 === 0) {
      answer = (nums[midpoint] + nums[midpoint - 1]) / 2;
    } else {
      answer = nums[Math.floor(midpoint)];
    }
    return res.json({ operation: "median", value: answer });
  } catch (err) {
    next(err);
  }
}

function mode(req, res, next) {
  try {
    let nums = parseQueryString(req.query.nums);
    let modeObj = {};
    let maxCount = 0;
    nums.forEach((num) => {
      modeObj[num] = (modeObj[num] || 0) + 1;
      if (modeObj[num] > maxCount) {
        maxCount = modeObj[num];
      }
    });
    let modes = [];
    for (let key in modeObj) {
      if (modeObj[key] === maxCount) {
        modes.push(key);
      }
    }
    return res.json({ operation: "median", value: modes });
  } catch (err) {
    next(err);
  }
}

module.exports = { mean, median, mode };
