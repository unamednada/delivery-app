const res = {
  status: (code) => {
    res.statusCode = code;
    return res;
  },
  json: (data) => {
    res.data = data;
    return res;
  }
};

module.exports = {
  res,
};
