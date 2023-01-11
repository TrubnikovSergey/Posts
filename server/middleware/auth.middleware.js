const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ");
    const [, tokenAccess, tokenRefresh] = token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorazed" });
    }

    const dataAccess = tokenService.validateAccess(tokenAccess);
    const dataRefresh = tokenService.validateRefresh(tokenRefresh);

    if (!dataAccess && !dataRefresh) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      req.user = dataAccess ? dataAccess : dataRefresh;
      req.userError = null;
    }

    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorazed" });
  }
};
