const { parseQueryString } = require("./util");

function index(req, res, next) {
  try {
    res.send("Ready to perform mean, median, or mode!");
  } catch (err) {
    next(err);
  }
}

function mean(req, res, next) {
  try {
    const nums = parseQueryString(req.query.nums);
    let answer = nums.reduce((sum, num) => sum + num) / nums.length;
    answer = Math.round(answer * 100) / 100;
    return res.json({ operation: "mean", value: answer });
  } catch (err) {
    next(err);
  }
}

function median(req, res, next) {
  try {
    const nums = parseQueryString(req.query.nums);
    nums.sort((a, b) => a - b);
    const midpoint = nums.length / 2;
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
    const nums = parseQueryString(req.query.nums);
    const modeObj = {};
    let maxCount = 0;
    nums.forEach((num) => {
      modeObj[num] = (modeObj[num] || 0) + 1;
      if (modeObj[num] > maxCount) {
        maxCount = modeObj[num];
      }
    });
    const modes = [];
    for (let key in modeObj) {
      if (modeObj[key] === maxCount) {
        modes.push(parseFloat(key));
      }
    }
    return res.json({ operation: "mode", value: modes });
  } catch (err) {
    next(err);
  }
}

module.exports = { index, mean, median, mode };
