var express = require("express");
var router = express.Router();
var { getRequestedUsers } = require("../../request/controller");
const auth = require("../../auth-services");

router.get("/", auth.verifyUser, getRequestedUsers);
// router.get("/", auth.verifyUser , getAllGeofences);
// router.get("/:id", auth.verifyUser, getGeofence);
// router.put("/:id", auth.verifyUser, auth.isAdmin,  updateGeofence);
// router.delete("/:id", auth.verifyUser,auth.isAdmin, deleteGeofence);

module.exports = router;
