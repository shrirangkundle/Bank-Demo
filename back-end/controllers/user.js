const User = require("../models/userModel");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/customError");

const createUser = asyncWrapper(async (req, res) => {
  const task = await User.create(req.body);
  res.status(201).json({ task });
});

const loginVarify = asyncWrapper(async (req, res) => {
  var responseBody = {};
  const task = await User.findOne({ username: req.body.username });
  if (task == null) {
    responseBody["usernameFlag"] = false;
    res.status(200).json({ responseBody });
    return;
  }

  if (req.body.password === task.password) {
    responseBody["loginFlag"] = true;
    responseBody["usernameFlag"] = true;
    responseBody["userId"] = task._id;
  } else {
    responseBody["usernameFlag"] = false;
    responseBody["loginFlag"] = false;
  }
  res.status(200).json({ responseBody });
});

const getUser = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await User.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No User with id : ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const transactionUpdate = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const individualUser = await User.findOne({ _id: taskID });
  if (req.body.transactionType == "credit") {
    var totalBalAmt =
      (await individualUser.balanceAmt) + Number(req.body.amount);
  } else if (req.body.transactionType == "debit") {
    var totalBalAmt =
      (await individualUser.balanceAmt) - Number(req.body.amount);
  }

  individualUser.balanceAmt = totalBalAmt;
  individualUser.userTransAction.push(req.body);

  const task = await User.findOneAndUpdate({ _id: taskID }, individualUser, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ individualUser });
});

const transactionList = asyncWrapper(async (req, res, next) => {
  const { id: taskID, page: pageNum } = req.params;
  const userDetail = await User.findOne({ _id: taskID });
  var arrSize = userDetail.userTransAction.length;

  var upperLim = 0;
  var lowerLim = 10;
  var newPageNum = Number(pageNum);
  var sampleArr = [];

  if (newPageNum == 1) {
    upperLim = 0;
    lowerLim = 10;
    sampleArr.push(upperLim);
    sampleArr.push(lowerLim);
  } else {
    lowerLim = (newPageNum - 1) * 10;
    upperLim = newPageNum * 10;
    if (upperLim >= arrSize) {
      upperLim = arrSize - 1;
    }
    sampleArr.push(lowerLim);
    sampleArr.push(upperLim);
  }

  const transactionList = await User.findOne(
    { _id: taskID },
    { userTransAction: { $slice: sampleArr } }
  );

  var transactionArr = transactionList.userTransAction;
  var maxLength = arrSize;

  if (!transactionList) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ transactionArr, maxLength });
});

module.exports = {
  createUser,
  getUser,
  loginVarify,
  transactionUpdate,
  transactionList,
};
