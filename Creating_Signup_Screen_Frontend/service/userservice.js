const getExpnese = (req, where) => {
  return req.user.getExpnese(where);
};

module.exports = {
  getExpnese,
};
