const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const response = require("../responses");
const models = require("../../models");

const verifyUser = (req, res, next) => {
  try {
    const token =
      req?.cookies?.jwt ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;

    if (!token) return response.unauthenticated(res);
    // verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      console.log(decoded, "decodedddddd");
      // return an error if there was an issue verifying the token
      if (err) {
        return response.unauthorized(res);
      } else {
        // set the user data to the req obj using the decoded token payload
        req.user = decoded;
        const id = req.user.id;
        let user = await models.User.findOne({
          where: {
            id: id,
          },
        });
        console.log(user.isActive, "userrrrrrrrrrrrrr");

        if (user.isActive == 0) {
          return response.failedWithMessage("you are not active", res);
        }

        // call the next middleware
        return next();
      }
    });
  } catch (err) {
    console.error(err);
    return response.serverError(res);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////

const hashPassword = (plainTextPassword) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(plainTextPassword, salt);
  return hash;
};

/////////////////////////////////////////////////////////////////////////////////////////////////

const comparePasswords = (plainTextPassword, hashedPassword) => {
  return bcrypt.compareSync(plainTextPassword, hashedPassword);
};

/////////////////////////////////////////////////////////////////////////////////////////////////

const signUser = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      isActive: user.isActive,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const isAdmin = async (req, res, next) => {
  const roleId = req.user.roleId;
  if (roleId == "ADMIN") {
    return next();
  } else {
    response.serverError(res);
  }
};

const isAdminOrManager = async (req, res, next) => {
  const roleId = req.user.roleId;
  if (roleId == "ADMIN" || roleId == "MANAGER") {
    return next();
  } else {
    response.serverError(res);
  }
};
module.exports = {
  signUser,
  verifyUser,
  hashPassword,
  comparePasswords,
  isAdmin,
  isAdminOrManager,
};
