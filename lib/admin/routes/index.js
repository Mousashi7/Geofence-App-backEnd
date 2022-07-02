var express = require("express");
var router = express.Router();
var {
  admninSignIn,
  adminSignOut,
  activate,
  deactivate,
  getUsers,
  changeStatus,
} = require("../../admin/controller");
const auth = require("../../auth-services");

router.post("/signin", admninSignIn);

router.post("/signout", adminSignOut);

router.get("/getusers", auth.verifyUser, auth.isAdmin, getUsers);

router.patch("/activate/:id", auth.verifyUser, auth.isAdmin, activate);

router.patch("/deactivate/:id", auth.verifyUser, auth.isAdmin, deactivate);

router.patch("/changeStatus/:id", auth.verifyUser, auth.isAdmin, changeStatus);

module.exports = router;
