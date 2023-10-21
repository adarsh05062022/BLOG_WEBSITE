const { verify } = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    res.json({
      success: 0,
      messege: "access denied! unauthorised user",
    });
  } else {
    const token = authHeader.split(' ')[1];

                    // Split the header value to separate "Bearer" and the token

    
    verify(token, "anmol", (err, userInfo) => {
      if (err) {
        res.json({
          success: 0,
          messege: "invalid token",
        });
      }

      req.accessToken = token;

      next();
    });
  }
};

module.exports = { checkToken };
